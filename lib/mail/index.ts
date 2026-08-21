import { smtpMailer } from "./smtp";
import type { Mailer } from "./types";

/**
 * 발송 수단 선택
 *
 * 현재는 SMTP 하나뿐이다. 이메일 API(Resend 등)로 옮길 때는
 *   1. lib/mail/resend.ts 에 Mailer 인터페이스 구현을 추가하고
 *   2. 아래 분기에 한 줄 추가한 뒤
 *   3. 환경변수 MAIL_TRANSPORT=resend 로 전환한다.
 * 호출부(app/api/contact/route.ts)는 수정할 필요가 없다.
 *
 * ⚠️ 발송 수단을 바꾸면 부록 A 제5조 처리위탁 표에 수탁자를 추가해야 한다.
 *    해외 사업자라면 "개인정보의 국외 이전" 조항도 필요하다. (기획서 9.2 E항목)
 */
export function getMailer(): Mailer {
  const transport = process.env.MAIL_TRANSPORT ?? "smtp";

  switch (transport) {
    case "smtp":
      return smtpMailer;
    default:
      console.warn(
        `[mail] 알 수 없는 MAIL_TRANSPORT="${transport}" — smtp 로 대체합니다.`,
      );
      return smtpMailer;
  }
}

export type { Mailer, MailMessage, MailResult } from "./types";
