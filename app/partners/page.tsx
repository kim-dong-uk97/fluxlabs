import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Arrow } from "@/components/Button";
import { PARTNERS } from "@/lib/business";
import { SITE } from "@/lib/site";

/**
 * 관계사 — 기획서 4.2
 *
 * 표기 원칙 (확정):
 *  - 메뉴·페이지 명칭은 "관계사". 본문 지칭은 "관계사" 또는 "협력사"
 *  - "계열사"·"자회사" 사용 금지 (공정거래법·상법상 지분 요건이 필요한 용어)
 *  - 지분관계 각주 미표기 · 파트너사 로고 미노출 · 협업 상대사 사명 미표기
 *
 * ⚠️ 보안 체크리스트 A-1
 *    기획서는 로고 이미지 슬롯을 마크업에 포함하고 display:none 처리하라고
 *    지시하지만, display:none 은 소스 보기·검색엔진에 그대로 노출된다.
 *    미표기 원칙과 정면으로 충돌하므로 **마크업을 만들지 않는다.**
 *    공개 동의 확보 시 Partner.logo 에 값을 넣으면 렌더링되도록
 *    데이터 구조만 열어 두었다 (lib/business.ts).
 */

export const metadata: Metadata = {
  title: "관계사",
  description:
    "플럭스랩스는 각자의 영역에서 가장 잘하는 회사들과 기술로 연결됩니다. 하드웨어, 도메인 전문성, 현장 운영 역량을 보유한 관계사와 함께합니다.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: `관계사 | ${SITE.shortName}`,
    description: "기술로 연결된 관계사와 함께 에이전트를 현장에 배치합니다.",
    url: "/partners",
  },
};

export default function PartnersPage() {
  return (
    <>
      <Section tone="white" size="lg" className="pt-32 md:pt-40">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
            Partners
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">관계사</h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-navy-100">
            플럭스랩스는 각자의 영역에서 가장 잘하는 회사들과 기술로 연결됩니다.
            하드웨어, 도메인 전문성, 현장 운영 역량을 각각 보유한 관계사와 함께
            에이전트 기술을 실제 현장에 배치합니다.
          </p>
        </Reveal>
      </Section>

      <Section tone="offwhite" size="lg">
        {/* 각 카드는 `분야 · 협력 내용` 2줄 구조 (기획서 4.2) */}
        <div className="grid gap-5 md:grid-cols-3">
          {PARTNERS.map((partner, index) => (
            <Reveal key={partner.field} delay={index * 80}>
              <article className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-900 p-8">
                <h2 className="text-sm font-semibold tracking-wide text-navy-300">
                  {partner.field}
                </h2>
                <p className="mt-3 flex-1 text-lg leading-[1.8] font-medium text-white">
                  {partner.work}
                </p>

                {/* 사명은 공개 동의를 받은 곳만 노출한다 */}
                {partner.name && (
                  <p className="mt-6 border-t border-white/10 pt-4 text-sm text-navy-300">
                    {partner.name}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" size="md">
        <SectionHeading
          title="함께 만들 수 있는 일이 있다면"
          description="기술 협력·공급·공동 개발 어느 쪽이든 편하게 문의해 주세요."
        />
        <div className="mt-8">
          <ButtonLink href="/contact?type=partnership" variant="primary">
            제휴 문의하기 <Arrow />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
