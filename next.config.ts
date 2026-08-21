import type { NextConfig } from "next";

/**
 * 보안 헤더 — 보안 체크리스트 B-7
 *
 * CSP 주의:
 * - script-src 에 'unsafe-inline' 이 들어간다. Next.js 가 하이드레이션 부트스트랩을
 *   인라인 <script> 로 주입하기 때문이다. 이를 제거하려면 middleware 에서 nonce 를
 *   발급해야 하는데, middleware 는 전 라우트를 동적 렌더링으로 만들어 SSG 이점(7.3
 *   성능 목표)을 잃는다. 이 사이트는 사용자 입력이 문의 폼 하나뿐이고 React 가
 *   기본 이스케이프하므로(B-6) 현 단계에서는 트레이드오프를 수용한다.
 *   → docs/security-checklist.md 잔여 항목으로 기록
 * - 아래 서드파티 도메인은 기획서 5.2(카카오맵)·7.1(GA4·네이버 애널리틱스) 도입을
 *   전제로 미리 열어둔 것이다. 실제로 붙이지 않으면 아무 요청도 발생하지 않는다.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // 카카오맵 SDK 는 dapi.kakao.com 에서 로더를, *.daumcdn.net 에서 실제 모듈을
  // 내려받는다. 지도 타일·마커 스프라이트도 *.daumcdn.net 이며,
  // 지오코더 등 일부 서비스는 *.daum.net 으로 요청한다.
  "script-src 'self' 'unsafe-inline' https://dapi.kakao.com https://*.daumcdn.net https://www.googletagmanager.com https://www.google-analytics.com https://wcs.naver.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.daumcdn.net https://*.kakaocdn.net https://*.daum.net https://www.google-analytics.com https://wcs.naver.net",
  "font-src 'self'",
  "connect-src 'self' https://dapi.kakao.com https://*.daumcdn.net https://*.daum.net https://*.kakao.com https://www.google-analytics.com https://wcs.naver.net",
  "frame-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 상위 디렉터리의 package-lock.json 을 프로젝트 루트로 오인하지 않도록 고정
  turbopack: {
    root: import.meta.dirname,
  },

  // 보안 체크리스트 C-1 — 소스맵이 프로덕션에 올라가지 않도록
  productionBrowserSourceMaps: false,

  // 응답 헤더에 프레임워크·버전 노출 제거
  poweredByHeader: false,

  /*
   * next/image 는 SVG 를 기본 차단한다 (내부에 스크립트가 들어갈 수 있어
   * XSS 위험이 있기 때문). public/business/ 의 SVG 는 팀이 직접 올리는
   * 신뢰된 자산이므로 Next.js 문서가 권장하는 안전한 조합으로 허용한다:
   * 렌더된 이미지는 CSP 로 스크립트를 차단하고, 직접 접근 시 다운로드시켜
   * 브라우저가 인라인 실행하지 않게 한다.
   */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
