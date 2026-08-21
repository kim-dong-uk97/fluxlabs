import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeading, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BusinessIcon } from "@/components/BusinessIcon";
import { Arrow } from "@/components/Button";
import { TechApproachSection } from "@/components/TechApproach";
import { BUSINESSES } from "@/lib/business";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "사업영역",
  description:
    "AUI 리테일 운영 플랫폼, 웨어러블 온디바이스 에이전트, 의료기관 프론트오피스 자동화, AI 어시스턴트 서비스 — 플럭스랩스의 네 개 사업을 소개합니다.",
  alternates: { canonical: "/business" },
  openGraph: {
    title: `사업영역 | ${SITE.shortName}`,
    description:
      "현장의 업무를 에이전트가 대신 수행합니다. 플럭스랩스의 네 개 사업.",
    url: "/business",
  },
};

export default function BusinessIndexPage() {
  return (
    <>
      {/* 페이지 히어로 — Navy 배경 (GNB 가 투명하게 시작한다) */}
      <section className="on-navy bg-ink-950 pt-32 pb-20 text-white md:pt-44 md:pb-28">
        <Container>
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
              Business
            </p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">사업영역</h1>
            <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-navy-100">
              업종은 전부 다르지만 하나의 명제로 묶입니다. 사람이 화면을 보고,
              찾고, 누르던 일을 에이전트가 대신 수행합니다.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 사업 카드 그리드 — 사진 상단 / 이름·분류 태그 하단 */}
      <Section tone="white" size="lg">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {BUSINESSES.map((business, index) => (
            <Reveal key={business.slug} delay={index * 80}>
              <Link href={`/business/${business.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-800">
                  {business.image ? (
                    <Image
                      src={business.image.src}
                      alt={business.image.alt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BusinessIcon icon={business.icon} className="size-14 text-navy-300" />
                    </div>
                  )}
                  {/* 유리판 오버레이 — 평소엔 옅은 어두운 유리, 호버 시 위로 걷힌다 */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-ink-950/40 backdrop-blur-[2px] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-full"
                  />
                </div>
                <h2 className="mt-6 text-xl font-bold">{business.name}</h2>
                <span className="mt-3 inline-flex items-center rounded-full border border-white/25 px-3 py-1 text-xs font-semibold tracking-wide text-navy-300 uppercase">
                  {business.category}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <TechApproachSection />

      <Section tone="offwhite" size="md">
        <SectionHeading
          title="어느 사업이 우리 현장에 맞는지 모르겠다면"
          description="어떤 업무가 병목인지 알려주시면 적합한 방식을 함께 찾겠습니다."
        />
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-1.5 font-semibold text-navy-300 hover:underline"
        >
          문의하기 <Arrow />
        </Link>
      </Section>
    </>
  );
}
