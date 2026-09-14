import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, Container, PillHeading } from "@/components/Section";
import { ButtonLink, Arrow } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { BUSINESSES } from "@/lib/business";
import { TECH_AXES } from "@/lib/tech";
import { SITE } from "@/lib/site";

/**
 * 사업영역 목록 — 홈 히어로의 "서비스 알아보기" 가 닿는 곳.
 *
 * ⚠️ GNB(lib/site.ts NAV)는 이 페이지를 거치지 않고 4개 상세로 바로 들어간다.
 *    기획서 3.1 의 확정 사항이라 그대로 두었다. 이 페이지는 "전체를 먼저
 *    훑고 싶은" 사람을 위한 입구이지, 내비게이션의 한 단계가 아니다.
 *
 * 카드 사진·문구는 홈 3번 섹터와 같은 자산을 쓴다. 두 곳이 어긋나면
 * 같은 사업이 다른 얼굴로 보이므로, 사진을 바꿀 때 app/page.tsx 도 함께 볼 것.
 */

const TITLE = "사업영역";
const DESCRIPTION =
  "플럭스랩스는 리테일·웨어러블·의료·AI 어시스턴트 네 영역에서 현장의 운영 구조를 AI 에이전트로 다시 설계합니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/business",
    languages: { ko: "/business", en: "/en/business" },
  },
  openGraph: {
    title: `${TITLE} | ${SITE.shortName}`,
    description: DESCRIPTION,
    url: "/business",
  },
};

/**
 * 카드 사진 — 홈 3번 섹터와 같은 파일.
 *
 * halves 가 있는 칸은 세로 사진 두 장을 맞대 한 칸을 이룬다 (웨어러블).
 * 사진에 테두리·둥근 모서리·글자가 그려져 있지 않은 순수 이미지라,
 * 여기서는 카드 쪽에서 테두리와 라운드를 준다.
 */
const CARD_MEDIA: Record<
  string,
  { image?: string; halves?: [string, string] }
> = {
  nxi: { image: "/business/card-nxi.png" },
  wearable: {
    halves: ["/business/card-wearable-l.png", "/business/card-wearable-r.png"],
  },
  healthcare: { image: "/business/card-healthcare-v3.png" },
  assistant: { image: "/business/card-assistant-v5.png" },
};

export default function BusinessIndexPage() {
  return (
    <>
      <PageHero />
      <BusinessList />
      <SharedApproach />
      <ContactCta />
    </>
  );
}

/* ------------------------------------------------------------------ 히어로 */

function PageHero() {
  return (
    <section className="on-navy relative overflow-hidden bg-ink-950 pt-40 pb-16 text-white md:pt-52 md:pb-24">
      {/* 배경 발광 — 사진 없이 색만으로 깊이를 준다 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(74,146,229,0.22)_0%,rgba(30,58,138,0.08)_45%,transparent_75%)]"
      />

      <Container className="relative">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-[#4A92E5] uppercase">
            Business
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mt-5 text-[2rem] leading-[1.25] font-bold tracking-tight md:text-[2.5rem] lg:text-[3rem]">
            현장의 업무를
            <br />
            에이전트가 대신 수행합니다
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-base leading-[1.9] break-keep text-navy-100 md:text-lg">
            {DESCRIPTION}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------- 네 영역 카드 */

function BusinessList() {
  return (
    <section className="on-navy bg-ink-950 pb-16 text-white md:pb-40">
      <Container>
        <ul className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {BUSINESSES.map((business, index) => {
            const media = CARD_MEDIA[business.slug];

            return (
              <li key={business.slug}>
                <Reveal delay={index * 80}>
                  <Link
                    href={`/business/${business.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition-colors duration-300 hover:border-white/25"
                  >
                    <div className="relative aspect-[539/370]">
                      {media?.halves ? (
                        <div className="flex h-full w-full gap-1.5">
                          {media.halves.map((half) => (
                            <span
                              key={half}
                              className="relative block h-full flex-1"
                            >
                              <Image
                                src={half}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 280px, 25vw"
                                className="object-fill"
                              />
                            </span>
                          ))}
                        </div>
                      ) : (
                        <Image
                          src={media?.image ?? "/business/card-nxi.png"}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 560px, 50vw"
                          className="object-fill"
                        />
                      )}
                    </div>

                    {/*
                      글자는 사진 위가 아니라 사진 아래에 둔다. 홈에서는 사진에
                      얹었지만 여기서는 카드마다 설명 길이가 달라, 겹치면 줄 수가
                      들쭉날쭉해져 네 칸의 높이가 어긋난다.
                    */}
                    <div className="border-t border-white/10 px-6 py-6 md:px-7 md:py-7">
                      <p className="text-xs font-semibold tracking-[0.14em] text-[#4A92E5] uppercase">
                        {business.category}
                      </p>
                      <h2 className="mt-3 text-lg leading-snug font-bold">
                        {business.name}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed break-keep text-navy-100">
                        {business.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                        자세히 보기 <Arrow />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------- 네 영역이 공유하는 방식 */

function SharedApproach() {
  return (
    <Section tone="offwhite" size="lg">
      <Container>
        <PillHeading
          eyebrow="Approach"
          description="네 영역이 같은 기술 축 위에 서 있습니다"
          descriptionClassName="text-[26px] font-medium text-white"
        />
      </Container>

      <Container>
        <dl className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {TECH_AXES.map((axis, index) => (
            <Reveal key={axis.key} delay={index * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <div className="flex items-center gap-4">
                  <Image
                    src={`/tech/icon-v2-${index + 1}.png`}
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <dt className="text-lg font-bold text-sky-100">
                    {axis.label}
                  </dt>
                </div>
                <dd className="mt-4 text-sm leading-relaxed break-keep text-sky-200/70">
                  {axis.description}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- 하단 문의 */

function ContactCta() {
  return (
    <section className="cta-band">
      <Container>
        <Reveal distance={26}>
          <CtaPanel
            title="어떤 영역이 맞을지 함께 찾아드립니다"
            description="현장의 문제와 상황을 알려주시면, 플럭스랩스가 함께 해결 방법을 찾아보겠습니다."
            actionLabel="문의하기"
            href="/contact"
          />
        </Reveal>
      </Container>
    </section>
  );
}
