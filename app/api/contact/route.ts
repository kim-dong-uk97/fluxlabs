import { NextResponse } from "next/server";
import { getMailer } from "@/lib/mail";
import { noopStore } from "@/lib/storage/types";
import { notifySlack } from "@/lib/slack";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  MIN_ELAPSED_MS,
  validateContact,
  hasErrors,
  type ContactInput,
} from "@/lib/contact-schema";
import { INQUIRY_TYPES, SITE } from "@/lib/site";

/**
 * 문의 접수 API — 기획서 5.5
 *
 * 보안 체크리스트 준수 항목:
 *  B-1 허니팟 · 시간 트랩 · rate limit · 서버 측 검증
 *  B-2 수신자 하드코딩(환경변수) · 텍스트 메일 · 헤더 인젝션 방지
 *  B-3 Slack 알림 이스케이프
 *  B-4 request body 를 로그로 출력하지 않음 · 에러 응답에 입력값 반환 금지
 */

// nodemailer 는 Node.js 런타임이 필요하다
export const runtime = "nodejs";

/** 요청 본문 크기 상한 — 과대 페이로드 차단 */
const MAX_BODY_BYTES = 16 * 1024;

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request): Promise<NextResponse> {
  // ---- 요청 크기 제한 -----------------------------------------------------
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "요청이 너무 큽니다." },
      { status: 413 },
    );
  }

  // ---- 본문 파싱 ----------------------------------------------------------
  let raw: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== "object" || parsed === null) throw new Error();
    raw = parsed as Record<string, unknown>;
  } catch {
    // B-4 — 파싱 실패한 본문을 로그에 남기지 않는다
    return NextResponse.json(
      { ok: false, error: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  // ---- B-1 허니팟 ---------------------------------------------------------
  // 사람 눈에 보이지 않는 필드다. 값이 있으면 봇이므로 조용히 성공으로 응답한다.
  // 실패를 알려주면 봇이 우회 방법을 학습한다.
  if (str(raw[HONEYPOT_FIELD]).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // ---- B-1 시간 트랩 ------------------------------------------------------
  // 사람은 폼을 3초 안에 채우지 못한다. 봇은 즉시 제출한다.
  const renderedAt = Number(raw.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    const elapsed = Date.now() - renderedAt;
    if (elapsed < MIN_ELAPSED_MS) {
      return NextResponse.json({ ok: true });
    }
  }

  // ---- B-1 Rate limit -----------------------------------------------------
  const ip = getClientIp(request.headers);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: `문의가 너무 자주 접수되었습니다. 잠시 후 다시 시도하시거나 ${SITE.email} 로 보내주세요.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // ---- B-1 서버 측 검증 ---------------------------------------------------
  const input: ContactInput = {
    type: str(raw.type).trim(),
    company: str(raw.company).trim(),
    name: str(raw.name).trim(),
    jobTitle: str(raw.jobTitle).trim(),
    email: str(raw.email).trim(),
    phone: str(raw.phone).trim(),
    message: str(raw.message).trim(),
    consent: raw.consent === true,
  };

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    // 필드별 오류 사유만 돌려준다. 입력값 자체는 되돌려주지 않는다 (B-4)
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const typeLabel =
    INQUIRY_TYPES.find((t) => t.value === input.type)?.label ?? input.type;
  const createdAt = new Date().toISOString();

  // ---- 메일 발송 (B-2) ----------------------------------------------------
  // 제목에 사용자 입력을 넣지 않는다. 유형 라벨은 우리가 정의한 고정 문자열이다.
  const mailer = getMailer();
  const mail = await mailer.send({
    subject: `[홈페이지 문의] ${typeLabel}`,
    replyTo: input.email,
    text: [
      `문의 유형: ${typeLabel}`,
      `회사명: ${input.company}`,
      `성함: ${input.name}`,
      `직함: ${input.jobTitle || "-"}`,
      `이메일: ${input.email}`,
      `연락처: ${input.phone || "-"}`,
      `접수 일시: ${createdAt}`,
      "",
      "문의 내용:",
      input.message,
    ].join("\n"),
  });

  if (!mail.ok) {
    // B-4 — 실패 사유만 남긴다. 입력값은 절대 로그에 남기지 않는다.
    console.error(`[contact] 메일 발송 실패 (reason=${mail.reason})`);

    return NextResponse.json(
      {
        ok: false,
        // 기획서 5.5 — 실패 시 대표 이메일 직접 안내
        error: `접수 중 문제가 발생했습니다. ${SITE.email} 로 직접 보내주시면 확인하겠습니다.`,
      },
      { status: 502 },
    );
  }

  // ---- 적재 (A-3) ---------------------------------------------------------
  // 현재는 noop — 수신 메일함이 공식 보관소다. lib/storage/types.ts 주석 참조.
  await noopStore.save({ ...input, createdAt });

  // ---- Slack 알림 (B-3) ---------------------------------------------------
  // 메일이 이미 나갔으므로 실패해도 접수는 성공이다.
  await notifySlack([
    `새 문의 (${typeLabel})`,
    `${input.company} · ${input.name}${input.jobTitle ? ` ${input.jobTitle}` : ""}`,
    input.email,
    input.message.slice(0, 300),
  ]);

  return NextResponse.json({ ok: true });
}
