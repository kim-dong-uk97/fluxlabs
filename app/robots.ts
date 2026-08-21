import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt — 기획서 7.4
 *
 * 보안 체크리스트 C-1 — 프리뷰 도메인은 전체 차단한다.
 * 프리뷰 URL 은 주소만 알면 누구나 볼 수 있고, 확정 전 카피와 미완성 페이지가
 * 노출된다. 색인까지 되면 회수가 어렵다.
 *
 * VERCEL_ENV 는 Vercel 이 자동 주입한다 ("production" | "preview" | "development").
 * 다른 호스팅으로 옮길 경우 그 플랫폼의 환경 구분 변수로 바꿔야 한다.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction =
    (process.env.VERCEL_ENV ?? process.env.NODE_ENV) === "production";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // 문의 접수 엔드포인트는 색인 대상이 아니다
          "/news", // Phase 2 — 운영 시작 시 제거 (C-1)
        ],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
