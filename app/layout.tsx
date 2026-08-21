import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import { jsonLdString, organizationSchema } from "@/lib/json-ld";
import "./globals.css";

/**
 * 루트 레이아웃 — 기획서 7.4 SEO
 *  - 페이지별 title / description 은 각 page.tsx 에서 개별 지정
 *  - OG 이미지 1200×630 (8.9 — 디자인팀 제작 대기)
 *  - JSON-LD Organization 스키마 삽입
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.shortName} — ${SITE.tagline}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.shortName,
  keywords: [
    "플럭스랩스",
    "FLUXLABS",
    "AI 에이전트",
    "AUI",
    "Agent User Interface",
    "온디바이스 에이전트",
    "프론트오피스 자동화",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.shortName,
    title: `${SITE.shortName} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.shortName} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
  // 구글 서치콘솔 / 네이버 서치어드바이저 등록 (기획서 7.4)
  // 소유권 확인 코드는 발급 후 환경변수로 주입한다. 공개되어도 무방한 값이다.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
      ? { "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }
      : {},
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2A4269",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />

        {/* JSON-LD — dangerouslySetInnerHTML 미사용 (lib/json-ld.ts 주석 참조) */}
        <script type="application/ld+json">
          {jsonLdString(organizationSchema)}
        </script>
      </body>
    </html>
  );
}
