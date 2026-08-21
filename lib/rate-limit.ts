/**
 * Rate limit — 보안 체크리스트 B-1
 *
 * ⚠️ 현재 구현은 프로세스 메모리 기반이라 best-effort 다.
 * 서버리스는 인스턴스가 여러 개 뜨고 수시로 재활용되므로 카운터가 공유되지 않는다.
 * 즉 실제 허용량은 설정값 × 인스턴스 수까지 늘어날 수 있다.
 *
 * 그럼에도 두는 이유: 단일 IP 의 폭주(수백 건 연속 제출)는 대체로 같은 인스턴스로
 * 라우팅되므로 실사용 방어에는 유효하다. 1차 방어선은 허니팟과 시간 트랩이다.
 *
 * 호스팅 확정 후 Redis(Upstash 등) 기반으로 교체할 것.
 * 그때 이 파일의 checkRateLimit 시그니처만 유지하면 호출부는 수정 불필요.
 * → docs/security-checklist.md 잔여 항목
 */

const WINDOW_MS = 60 * 60 * 1000; // 1시간
const MAX_REQUESTS = 5; // IP당 시간당 5건 (체크리스트 B-1 예시값)

/** 메모리 누수 방지 — 이 수를 넘으면 만료 항목을 청소한다 */
const CLEANUP_THRESHOLD = 1000;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function cleanup(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** 남은 허용 건수 */
  remaining: number;
  /** 제한 해제까지 남은 초 */
  retryAfterSeconds: number;
};

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();

  if (buckets.size > CLEANUP_THRESHOLD) cleanup(now);

  const bucket = buckets.get(identifier);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      retryAfterSeconds: 0,
    };
  }

  bucket.count += 1;

  const retryAfterSeconds = Math.ceil((bucket.resetAt - now) / 1000);

  if (bucket.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - bucket.count,
    retryAfterSeconds,
  };
}

/**
 * 클라이언트 IP 추출
 *
 * 프록시 뒤에 있으므로 x-forwarded-for 를 읽되, 신뢰 경계에 주의한다.
 * 이 헤더는 클라이언트가 위조할 수 있다 — 플랫폼(Vercel 등)이 덮어써 주는 것을
 * 전제로 한다. 자체 서버로 옮길 경우 리버스 프록시가 이 헤더를 강제 설정하는지
 * 반드시 확인할 것.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // 첫 번째 항목이 원 클라이언트
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return headers.get("x-real-ip")?.trim() || "unknown";
}
