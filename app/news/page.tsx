import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Arrow } from "@/components/Button";

/**
 * 뉴스룸 — 기획서 12장 Phase 2
 *
 * 오픈 시점에는 GNB 에 노출하지 않는다 (기획서 3.1). 라우트만 만들어 둔다.
 *
 * ⚠️ 보안 체크리스트 C-1
 *    GNB 에 없어도 크롤러는 이 경로를 찾아낸다. 빈 페이지가 색인되면
 *    기획서 1.4 의 "검색 1위" 목표에 해롭다. 따라서 noindex 를 건다.
 *    실제 운영을 시작할 때 아래 robots 설정을 제거하고 sitemap 에 추가할 것.
 */

export const metadata: Metadata = {
  title: "뉴스룸",
  robots: { index: false, follow: false },
};

export default function NewsPage() {
  return (
    <Section tone="white" size="lg" className="pt-32 md:pt-40">
      <h1 className="text-3xl font-bold md:text-4xl">뉴스룸</h1>
      <p className="mt-6 max-w-xl text-lg leading-[1.85] text-navy-100">
        준비 중입니다. 회사 소식은 곧 이곳에서 전해드리겠습니다.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 font-semibold text-navy-300 hover:underline"
      >
        홈으로 <Arrow />
      </Link>
    </Section>
  );
}
