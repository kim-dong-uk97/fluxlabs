import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, Container, PillHeading } from "@/components/Section";
import { ButtonLink, Arrow, Chevron } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { TechApproachSection } from "@/components/TechApproach";
import { ImpactIcon } from "@/components/ImpactIcon";
import { ExpandPanels, type ExpandPanelItem } from "@/components/ExpandPanels";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BUSINESSES_EN } from "@/lib/business-en";
import { TECH_AXES_EN } from "@/lib/tech-en";
import { SITE } from "@/lib/site";

/**
 * 홈 영어 버전 — app/page.tsx 의 본문 콘텐츠를 영어로 번역한 버전.
 * 헤더/푸터 내비게이션은 여러 페이지가 함께 쓰는 공용 컴포넌트라 한국어
 * 그대로 두지만, TechApproachSection·사업영역 카드(ExpandPanels)는 이
 * 페이지 전용 영어 데이터(TECH_AXES_EN/BUSINESS_PANELS_EN)를 props 로
 * 넘겨 렌더링한다 — lib/tech.ts·lib/business.ts 원본(한국어)은 건드리지
 * 않는다.
 */

export const metadata: Metadata = {
  title: `${SITE.shortName} — Technology that understands people`,
  description:
    "FLUXLABS redesigns on-site operations across retail, healthcare, and wearables with AI agents.",
  alternates: {
    canonical: "/en",
    languages: { ko: "/", en: "/en" },
  },
  openGraph: {
    locale: "en_US",
    title: `${SITE.shortName} — Technology that understands people`,
    description:
      "FLUXLABS redesigns on-site operations across retail, healthcare, and wearables with AI agents.",
    url: "/en",
  },
};

export default function HomePageEn() {
  return (
    <>
      <Hero />
      <CompanyDefinition />
      <BusinessGrid />
      <TechApproachSection
        axes={TECH_AXES_EN}
        eyebrow="Approach"
        description="What's proven on one site becomes the starting point for the next."
        descriptionClassName="text-[26px] font-medium leading-[1.4] text-white"
        detailLabel="Learn more"
        href="/en#business"
      />
      <ImpactSection />
      <PartnersSection />
      <CtaBanner />
    </>
  );
}

/* ---------------------------------------------------------------- S1 히어로 */

function Hero() {
  return (
    <section
      className="on-navy relative flex min-h-[90vh] items-center overflow-hidden bg-ink-950 text-white md:min-h-screen"
      aria-labelledby="hero-heading"
    >
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 size-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_10%,rgba(10,11,15,0.06)_0%,rgba(10,11,15,0.16)_45%,rgba(10,11,15,0.3)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/45 via-ink-950/16 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_60%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_45%,transparent_75%)]"
      />

      <Container className="relative pt-24 pb-20 text-center md:pt-40 md:pb-32">
        <Reveal>
          <h1
            id="hero-heading"
            className="text-2xl leading-[1.35] font-bold md:text-4xl lg:text-5xl"
          >
            From technology people adapt to,
            <br />
            to technology that{" "}
            <span className="bg-gradient-to-r from-[#356CF5] to-[#a78bfa] bg-clip-text text-transparent">
              understands
            </span>{" "}
            people
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-14 max-w-2xl text-lg leading-[1.8] text-navy-100 md:text-xl">
            FLUXLABS redesigns on-site operations across retail, healthcare,
            <br />
            and wearables with AI agents.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-20 flex justify-center">
            <ButtonLink
              href="/en#business"
              tone="dark"
              variant="primary"
              className="!rounded-full !bg-gradient-to-r !from-[#356CF5] !to-[#a78bfa] !text-white transition-opacity hover:!opacity-90"
            >
              Explore Services <Arrow />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 flex justify-center text-sm text-white/50"
      >
        <span className="animate-bounce">↓ scroll</span>
      </div>
    </section>
  );
}

/* ------------------------------------------------- S2 회사 한 줄 정의 */

function CompanyDefinition() {
  return (
    <Section tone="white" size="lg" className="!py-16 md:!py-40">
      <div className="grid gap-14 sm:grid-cols-[1.4fr_1fr] sm:items-center lg:gap-64">
        <div className="flex w-full gap-10 sm:gap-20">
          <Reveal
            distance={64}
            className="group relative h-[380px] w-1/2 overflow-hidden sm:h-[480px]"
          >
            <Image
              src="/company/arcade.png"
              alt="A person standing in front of a neon arcade screen"
              fill
              sizes="(min-width: 640px) 45vw, 45vw"
              className="object-cover grayscale brightness-75 transition-[filter] duration-700 ease-[var(--ease-out-soft)] group-hover:brightness-90"
            />
          </Reveal>
          <Reveal
            distance={64}
            delay={120}
            className="group relative mt-16 ml-2 h-[380px] w-1/2 overflow-hidden sm:mt-24 sm:ml-4 sm:h-[480px]"
          >
            <Image
              src="/company/archive.png"
              alt="Neatly arranged archive shelves"
              fill
              sizes="(min-width: 640px) 45vw, 45vw"
              className="object-cover grayscale brightness-75 transition-[filter] duration-700 ease-[var(--ease-out-soft)] group-hover:brightness-90"
            />
          </Reveal>
        </div>

        <div>
          <div>
            <Reveal distance={40}>
              <p className="text-base leading-[1.3] font-medium text-[#6C6C6D] md:text-lg">
                Founded in 2015
              </p>
            </Reveal>
            <Reveal distance={40} delay={100}>
              <p className="text-base leading-[1.3] font-medium text-[#6C6C6D] md:text-lg">
                Following the shift of the times
              </p>
            </Reveal>
            <Reveal distance={40} delay={200}>
              <p className="mt-10 text-2xl leading-[1.3] font-bold md:text-4xl">
                Into an <span className="text-[#356CF5]">AI Agent</span>{" "}
                company by 2026
              </p>
            </Reveal>
          </div>

          <Reveal distance={40} delay={300}>
            <p className="mt-14 max-w-lg text-lg leading-[2.1] text-navy-100">
              FLUXLABS combines system-building expertise from financial IT
              <br />
              with AI agent technology to transform how revenue-generating
              <br />
              sites actually operate.
            </p>
          </Reveal>

          <Reveal distance={40} delay={200}>
            <div className="mt-12 flex items-center gap-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#6C6C6D] uppercase">
                  Founded
                </p>
                <p className="tnum mt-2 text-4xl leading-none font-bold text-[#6C6C6D] md:text-5xl">
                  2015
                </p>
              </div>
              <div
                aria-hidden="true"
                className="h-px w-16 shrink-0 self-center bg-white/20 md:w-24"
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#356CF5] uppercase">
                  Now
                </p>
                <p className="tnum mt-2 text-4xl leading-none font-bold text-white md:text-5xl">
                  2026
                </p>
                <div
                  aria-hidden="true"
                  className="mt-3 h-0.5 w-10 bg-[#356CF5]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal distance={40} delay={350}>
            <Link
              href="/en/about"
              className="mt-16 inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
            >
              More About Us <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------- S3 사업영역 4분할 그리드 */

const BUSINESS_PANELS: ExpandPanelItem[] = BUSINESSES_EN.map((business) => ({
  key: business.slug,
  title: business.name,
  description: [...business.problem, ...business.approach],
  tint: business.tint,
  href: `/en/business/${business.slug}`,
  image: business.image,
}));

function BusinessGrid() {
  return (
    <section className="on-navy bg-ink-950 py-16 text-white md:py-40" id="business">
      <Container>
        <PillHeading
          eyebrow="Business"
          description="Agents take over the work on the ground"
          descriptionClassName="text-[26px] font-medium text-white"
        />
      </Container>

      <Container>
        <div className="mt-14 overflow-hidden rounded-2xl">
          <ExpandPanels items={BUSINESS_PANELS} />
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------- S4-1 IMPACT */

const IMPACT_VALUES = [
  {
    key: "zero-learning" as const,
    title: "Zero Learning Curve",
    description:
      "Deploy on-site instantly — no training or installation required",
  },
  {
    key: "scalability" as const,
    title: "Infinite Scalability",
    description:
      "Learning from one site instantly upgrades the intelligence of every site",
  },
  {
    key: "human-centric" as const,
    title: "Human-centric",
    description:
      "Leave repetitive tasks to AI, so people can focus on higher-value work",
  },
];

function ImpactSection() {
  return (
    <section
      className="on-navy bg-ink-950 py-16 text-white md:py-40"
      id="impact"
    >
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <Reveal>
              <div className="lg:-translate-y-10">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/70">
                  Impact
                </span>
                <h2 className="mt-6 text-3xl leading-[1.3] font-bold md:text-4xl lg:text-[42px]">
                  Beyond simple automation,
                  <br />
                  a site partner that never stops,
                  <br />
                  24 hours a day.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 flex flex-col gap-9">
              {IMPACT_VALUES.map((value, index) => (
                <Reveal key={value.key} delay={index * 100}>
                  <div className="flex items-start gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
                      <ImpactIcon icon={value.key} className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold tracking-wide">
                        {value.title}
                      </h3>
                      <p className="mt-1 leading-[1.7] text-navy-300">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="relative mx-auto aspect-square w-full max-w-xl lg:aspect-[4/5]">
              <Image
                src="/impact/beam.png"
                alt="Beams of light converging at the center"
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-contain"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(closest-side, black 55%, transparent 100%)",
                  maskImage:
                    "radial-gradient(closest-side, black 55%, transparent 100%)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** 로고 월 — 8개 로고 그리드. 셀이 정사각형이라 로고 크기는 균일하게 맞춘다 */
const LOGO_WALL = Array.from({ length: 8 }, (_, i) => ({
  src: `/partners/logo-${i + 1}.svg`,
  alt: `Partner logo ${i + 1}`,
  boxClass: "h-14 max-w-[150px]",
}));

function PartnersSection() {
  return (
    <section className="bg-ink-950 py-8 text-white md:py-10" id="partners">
      <Container>
        <Reveal>
          <p className="text-center text-base font-semibold tracking-[0.18em] text-white/60 uppercase md:text-lg">
            Partners of the Best
          </p>
        </Reveal>
      </Container>

      <Container className="mt-5">
        <LogoMarquee logos={LOGO_WALL} label="Partner logos" />
      </Container>
    </section>
  );
}

/* --------------------------------------------- S6 채용 · 문의 (좌우 분할) */

const CTA_CARDS = [
  {
    key: "careers",
    href: "/careers",
    eyebrow: "Careers",
    title: (
      <>
        If you&apos;re curious about
        <br />
        the change we&apos;re making
      </>
    ),
    body: (
      <>
        We look at unsolved problems with fresh eyes.
        <br />
        We&apos;re waiting for a teammate to help build the answer with us.
      </>
    ),
    cta: "View Openings",
    ctaVariant: "primary" as const,
    image: { src: "/cta/careers.png", alt: "Careers" },
  },
  {
    key: "contact",
    href: "/contact",
    eyebrow: "Contact",
    title: (
      <>
        Tell us about
        <br />
        your on-site challenge
      </>
    ),
    body: (
      <>
        Let us know which task is causing friction.
        <br />
        We&apos;ll look at your situation and help find the best solution
        together.
      </>
    ),
    cta: "Contact Us",
    ctaVariant: "primary" as const,
    image: { src: "/cta/contact.png", alt: "Contact" },
  },
] as const;

function CtaBanner() {
  return (
    <Section tone="navy-deep" size="lg" className="!py-16 md:!py-40">
      <div className="grid gap-8 lg:grid-cols-2">
        {CTA_CARDS.map((card, index) => (
          <Reveal key={card.key} delay={index * 120}>
            <div className="group relative h-full min-h-[440px] overflow-hidden rounded-2xl p-8 md:p-10">
              <Image
                src={card.image.src}
                alt={card.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/25 to-ink-950/90"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-3/4 bg-gradient-to-b from-ink-950/95 via-ink-950/70 to-transparent"
              />

              <div className="relative z-10">
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
                  {card.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  {card.title}
                </h2>
                <p className="mt-6 text-lg leading-[1.85] text-navy-100">
                  {card.body}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center md:bottom-10">
                <div className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  <ButtonLink
                    href={card.href}
                    tone="dark"
                    variant={card.ctaVariant}
                    className="pointer-events-auto !h-9 !px-4 !text-sm shadow-[0_0_0_rgba(255,255,255,0)] transition-shadow duration-300 ease-out group-hover:shadow-[0_10px_30px_-6px_rgba(255,255,255,0.45)]"
                  >
                    {card.cta} <Chevron />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
