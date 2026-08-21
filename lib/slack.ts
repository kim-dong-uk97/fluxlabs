/**
 * Slack 알림 — 기획서 5.5 동작 정의 (SMTP 발송 + Slack Webhook 동시 알림)
 *
 * 보안 체크리스트 B-3 — 사용자 입력의 마크다운/멘션 이스케이프.
 * 이스케이프하지 않으면 문의 내용에 @channel 을 넣어 팀 전체에 알림을 울릴 수 있다.
 */

/**
 * Slack 메시지 텍스트 이스케이프
 *
 * Slack 이 특별 취급하는 문자는 &, <, > 세 개다. 이것만 치환하면
 * <!channel>, <http://...|링크> 같은 제어 시퀀스가 성립하지 않는다.
 * 순서 중요: & 를 가장 먼저 치환해야 이중 이스케이프가 안 생긴다.
 */
export function escapeSlackText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/**
 * 위 이스케이프만으로는 평문 @channel / @here 이 남는다.
 * Slack 은 평문 @channel 을 자동 링크하지 않지만, 클라이언트 설정에 따라
 * 눈에 띄는 표시가 될 수 있어 형태를 깨뜨려 둔다.
 */
function defuseMentions(value: string): string {
  return value.replace(/@(channel|here|everyone)/gi, "@​$1");
}

export async function notifySlack(lines: string[]): Promise<void> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;

  const text = defuseMentions(lines.map(escapeSlackText).join("\n"));

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    // 보안 체크리스트 B-4 — 실패 사실만 남기고 내용은 남기지 않는다
    console.error(
      "[slack] 알림 발송 실패:",
      error instanceof Error ? error.message : "unknown error",
    );
  }
}
