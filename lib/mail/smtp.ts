import nodemailer, { type Transporter } from "nodemailer";
import {
  sanitizeHeaderValue,
  type Mailer,
  type MailMessage,
  type MailResult,
} from "./types";

/**
 * SMTP 발송 구현
 *
 * 보안 체크리스트 B-2 — 수신자 주소는 환경변수에서만 읽는다.
 * 요청 본문의 to/recipient 같은 값은 절대 참조하지 않는다.
 *
 * 보안 체크리스트 B-5 — 아래 환경변수에는 NEXT_PUBLIC_ 접두사를 붙이지 말 것.
 * 붙이는 순간 SMTP 비밀번호가 브라우저 번들에 그대로 들어간다.
 */
let cached: Transporter | null = null;

function getTransport(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  if (!cached) {
    cached = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      // 465 는 암묵적 TLS, 587 은 STARTTLS
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: { user, pass },
      // 서버리스 환경에서 함수가 응답을 오래 붙들지 않도록
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }

  return cached;
}

export const smtpMailer: Mailer = {
  name: "smtp",

  async send(message: MailMessage): Promise<MailResult> {
    const transport = getTransport();
    // 수신자 하드코딩 — 요청 값에서 받지 않는다 (B-2)
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.SMTP_FROM;

    if (!transport || !to || !from) {
      return { ok: false, reason: "not_configured" };
    }

    try {
      await transport.sendMail({
        from,
        to,
        subject: sanitizeHeaderValue(message.subject),
        // text 만 보낸다. html 필드를 의도적으로 쓰지 않는다 (B-2)
        text: message.text,
        replyTo: message.replyTo
          ? sanitizeHeaderValue(message.replyTo)
          : undefined,
      });
      return { ok: true };
    } catch (error) {
      // 보안 체크리스트 B-4 — 에러 로그에 개인정보(본문·이름·이메일)를 남기지 않는다.
      // 발송 실패 사실과 에러 메시지만 남긴다.
      console.error(
        "[mail] SMTP 발송 실패:",
        error instanceof Error ? error.message : "unknown error",
      );
      return { ok: false, reason: "send_failed" };
    }
  },
};
