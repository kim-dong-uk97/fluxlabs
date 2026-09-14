import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, Container, PillHeading } from "@/components/Section";
import { Arrow } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { CtaPanel } from "@/components/CtaPanel";
import { BUSINESSES_EN } from "@/lib/business-en";
import { TECH_AXES_EN } from "@/lib/tech-en";
import { SITE } from "@/lib/site";

/**
 * 사업영역 목록 영어 버전.
 *
 * ⚠️ app/business/page.tsx(한국어)와 레이아웃이 같아야 한다. 구조·클래스·순서는
 *    그대로 두고 문구만 영어로 바꾼다. 한쪽을 고치면 다른 쪽도 같이 고칠 것.
 */

const TITLE = "Business";
const DESCRIPTION =
  "FLUXLABS redesigns on-site operations with AI agents across four areas — retail, wearables, healthcare, and AI assistants.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/en/business",
    languages: { ko: "/business", en: "/en/business" },
  },
  openGraph: {
    locale: "en_US",
    title: `${TITLE} | ${SITE.shortName}`,
    description: DESCRIPTION,
    url: "/en/business",
  },
};

/** 카드 사진 — 한국어판과 같은 파일 */
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

export default function BusinessIndexPageEn() {
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
            Agents take over
            <br />
            the work on the ground
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-base leading-[1.9] text-navy-100 md:text-lg">
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
          {BUSINESSES_EN.map((business, index) => {
            const media = CARD_MEDIA[business.slug];

            return (
              <li key={business.slug}>
                <Reveal delay={index * 80}>
                  <Link
                    href={`/en/business/${business.slug}`}
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
                      글자는 사진 위가 아니라 사진 아래에 둔다. 카드마다 설명
                      길이가 달라, 겹치면 줄 수가 들쭉날쭉해져 높이가 어긋난다.
                    */}
                    <div className="border-t border-white/10 px-6 py-6 md:px-7 md:py-7">
                      <p className="text-xs font-semibold tracking-[0.14em] text-[#4A92E5] uppercase">
                        {business.category}
                      </p>
                      <h2 className="mt-3 text-lg leading-snug font-bold">
                        {business.name}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-navy-100">
                        {business.summary}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                        Learn more <Arrow />
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
          description="All four areas stand on the same technical axes"
          descriptionClassName="text-[26px] font-medium text-white"
        />
      </Container>

      <Container>
        <dl className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {TECH_AXES_EN.map((axis, index) => (
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
                <dd className="mt-4 text-sm leading-relaxed text-sky-200/70">
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
            title="We'll help you find the right fit"
            description="Tell us the problem and the situation on site, and FLUXLABS will work out the answer with you."
            actionLabel="Contact Us"
            href="/contact"
          />
        </Reveal>
      </Container>
    </section>
  );
}
