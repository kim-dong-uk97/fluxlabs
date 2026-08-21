/**
 * 메일 발송 어댑터 인터페이스
 *
 * 발송 수단(SMTP / 이메일 API)을 이 인터페이스 뒤에 숨긴다.
 * 교체 시 구현 파일 하나를 추가하고 lib/mail/index.ts 의 분기만 바꾸면 된다.
 *
 * 보안 체크리스트 B-2 — 폼을 스팸 릴레이로 쓰지 못하게:
 *  - 수신자(to)를 이 인터페이스에 두지 않는다. 구현체가 환경변수에서 직접 읽는다.
 *    요청 값으로 수신자를 받는 순간 오픈 릴레이가 된다.
 *  - 본문은 text 만 받는다. HTML 발송을 아예 지원하지 않는다.
 */

export type MailMessage = {
  /** 제목. 사용자 입력을 그대로 넣지 않는다 (헤더 인젝션 방지 — B-2) */
  subject: string;
  /** 본문(plain text). HTML 미지원 */
  text: string;
  /** 회신 주소. 사용자 이메일을 여기에만 넣는다 */
  replyTo?: string;
};

export type MailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

export interface Mailer {
  readonly name: string;
  send(message: MailMessage): Promise<MailResult>;
}

/** 제어문자 판정 — C0 제어문자, DEL, 유니코드 줄/문단 구분자 */
function isControlCodePoint(code: number): boolean {
  const C0_END = 0x1f;
  const DEL = 0x7f;
  const C1_START = 0x80;
  const C1_END = 0x9f;
  const LINE_SEPARATOR = 0x2028;
  const PARAGRAPH_SEPARATOR = 0x2029;

  if (code <= C0_END) return true;
  if (code === DEL) return true;
  if (code >= C1_START && code <= C1_END) return true;
  if (code === LINE_SEPARATOR || code === PARAGRAPH_SEPARATOR) return true;
  return false;
}

/**
 * 헤더 인젝션 방지 (보안 체크리스트 B-2)
 *
 * 메일 헤더는 개행으로 필드가 구분된다. 사용자 입력에 CR/LF 가 섞이면
 * 공격자가 Bcc: 같은 헤더를 새로 끼워 넣어 폼을 스팸 릴레이로 쓸 수 있다.
 * 제목·회신 주소 등 헤더에 들어가는 값에는 반드시 이 함수를 통과시킨다.
 *
 * 정규식 문자 범위 대신 코드포인트로 판정한다 — 소스에 제어문자를 남기지 않기 위함.
 */
export function sanitizeHeaderValue(value: string): string {
  let out = "";

  for (const char of value) {
    const code = char.codePointAt(0);
    out += code !== undefined && isControlCodePoint(code) ? " " : char;
  }

  return out.replace(/\s{2,}/g, " ").trim();
}
