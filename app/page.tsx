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
import { BUSINESSES } from "@/lib/business";
import { SITE } from "@/lib/site";

/**
 * 홈 — 기획서 5.1
 * 스크롤 순서: S1 히어로 → S2 회사 한 줄 정의 → S3 사업영역 4분할
 *            → S4 기술 접근 → S5 관계사 → S6 채용·문의 (좌우 분할)
 */

export const metadata: Metadata = {
  // 홈은 layout 의 default title 을 그대로 쓴다
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyDefinition />
      <BusinessGrid />
      <TechApproachSection />
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
      {/*
        배경 — 기획서 5.1 S1 원안은 실사/스톡 소재 금지였으나, 임시로 배경
        영상을 얹는다. 배포 전 반드시 웹 최적화된 영상으로 교체할 것.
      */}
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
      {/*
        텍스트 가독성용 그라디언트 — 패널(박스) 대신 왼쪽에서 오른쪽으로
        옅어지는 스크림. 텍스트가 있는 왼쪽만 어둡게 눌러주고 오른쪽은
        영상이 그대로 드러난다.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/45 via-ink-950/16 to-transparent"
      />
      {/* 가운데에서 오른쪽으로 살짝 밝게 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_60%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.08)_45%,transparent_75%)]"
      />

      <Container className="relative pt-32 pb-28 text-center md:pt-40 md:pb-32">
        <Reveal>
          <h1
            id="hero-heading"
            className="text-2xl leading-[1.35] font-bold md:text-4xl lg:text-5xl"
          >
            {SITE.tagline.split(", ").map((line, index, lines) => (
              <span key={line}>
                {line.split("이해하는").map((part, partIndex, parts) => (
                  <span key={partIndex}>
                    {part}
                    {partIndex < parts.length - 1 && (
                      <span className="bg-gradient-to-r from-[#356CF5] to-[#a78bfa] bg-clip-text text-transparent">
                        이해하는
                      </span>
                    )}
                  </span>
                ))}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-14 max-w-2xl text-lg leading-[1.8] text-navy-100 md:text-xl">
            플럭스랩스는 리테일·의료·웨어러블
            <br />
            현장의 운영 구조를 AI 에이전트로 다시 설계합니다.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-20 flex justify-center">
            <ButtonLink
              href="/#business"
              tone="dark"
              variant="primary"
              className="!rounded-full !bg-gradient-to-r !from-[#356CF5] !to-[#a78bfa] !text-white transition-opacity hover:!opacity-90"
            >
              서비스 알아보기 <Arrow />
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
    <Section tone="white" size="lg" className="!py-28 md:!py-40">
      <div className="grid gap-14 sm:grid-cols-[1.4fr_1fr] sm:items-center lg:gap-64">
        {/*
          사진 2장 — 대각 구도. 섹션을 정확히 반으로 나눈 왼쪽 절반을 꽉
          채운다. 왼쪽(아케이드)은 위에, 오른쪽(아카이브)은 아래로 내려
          위·아래로 어긋나게 배치한다. 흑백·저채도를 유지하되 이전보다
          살짝 밝게. 확대(zoom) 없이 호버 시 살짝만 밝아진다.
        */}
        <div className="flex w-full gap-10 sm:gap-20">
          <Reveal
            distance={64}
            className="group relative h-[380px] w-1/2 overflow-hidden sm:h-[480px]"
          >
            <Image
              src="/company/arcade.png"
              alt="네온 아케이드 화면 앞에 선 사람"
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
              alt="정렬된 아카이브 서가"
              fill
              sizes="(min-width: 640px) 45vw, 45vw"
              className="object-cover grayscale brightness-75 transition-[filter] duration-700 ease-[var(--ease-out-soft)] group-hover:brightness-90"
            />
          </Reveal>
        </div>

        <div>
          {/* 헤드라인 3줄 — 굵기를 번갈아 배치해 리듬을 준다. 줄마다 아래에서 올라오며 순차 등장 */}
          <div>
            <Reveal distance={40}>
              <p className="text-base leading-[1.3] font-medium text-[#6C6C6D] md:text-lg">
                2015년 설립
              </p>
            </Reveal>
            <Reveal distance={40} delay={100}>
              <p className="text-base leading-[1.3] font-medium text-[#6C6C6D] md:text-lg">
                시대의 흐름을 따라
              </p>
            </Reveal>
            <Reveal distance={40} delay={200}>
              <p className="mt-10 text-2xl leading-[1.3] font-bold md:text-4xl">
                2026년{" "}
                <span className="text-[#356CF5]">AI Agent</span> 기업으로
              </p>
            </Reveal>
          </div>

          <Reveal distance={40} delay={300}>
            <p className="mt-14 max-w-lg text-lg leading-[2.1] text-navy-100">
              플럭스랩스는 금융 IT 영역에서 축적한 시스템 구축 역량
              <br />
              위에 AI 에이전트 기술을 결합해, 실제 매출이 발생하는
              <br />
              현장의 운영 방식을 바꾸는 일을 합니다.
            </p>
          </Reveal>

          {/* 설립~현재 스탯 — 가로형. FOUNDED 2015 왼쪽, NOW 2026 오른쪽, 세로선으로 구분 */}
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
              href="/about"
              className="mt-16 inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
            >
              회사 소개 더 보기 <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------- S3 사업영역 4분할 그리드 */

const BUSINESS_PANELS: ExpandPanelItem[] = BUSINESSES.map((business) => ({
  key: business.slug,
  title: business.name,
  description: [...business.problem, ...business.approach],
  tint: business.tint,
  href: `/business/${business.slug}`,
  image: business.image,
}));

function BusinessGrid() {
  return (
    <section className="on-navy bg-ink-950 py-28 text-white md:py-40" id="business">
      <Container>
        <PillHeading
          eyebrow="Business"
          description="현장의 업무를 에이전트가 대신 수행합니다"
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

/* --------------------------------------------------- S5 관계사 */

/* -------------------------------------------------------- S4-1 IMPACT */

const IMPACT_VALUES = [
  {
    key: "zero-learning" as const,
    title: "Zero Learning Curve",
    description: "별도의 교육이나 설치 없이 즉시 현장 투입 가능",
  },
  {
    key: "scalability" as const,
    title: "Infinite Scalability",
    description: "한 지점의 학습 데이터가 전체 지점의 지능으로 즉각 업데이트",
  },
  {
    key: "human-centric" as const,
    title: "Human-centric",
    description: "단순 반복 업무는 AI에게, 사람은 더 가치 있는 업무에 집중",
  },
];

function ImpactSection() {
  return (
    <section
      className="on-navy bg-ink-950 py-28 text-white md:py-40"
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
                  단순한 자동화를 넘어
                  <br />
                  24시간 멈추지 않는
                  <br />
                  현장 파트너.
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

          {/* 배경과 이어지도록 가장자리를 방사형으로 페이드아웃한다 (박스 경계 없음) */}
          <Reveal delay={120}>
            <div className="relative mx-auto aspect-square w-full max-w-xl lg:aspect-[4/5]">
              <Image
                src="/impact/beam.png"
                alt="중심으로 모여드는 빛줄기"
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
  alt: `관계사 로고 ${i + 1}`,
  boxClass: "h-14 max-w-[150px]",
}));

function PartnersSection() {
  return (
    <section className="bg-ink-950 py-8 text-white md:py-10" id="partners">
      {/* 로고 띠 위에 얹는 작은 라벨 — 헤드라인이 아니라 스트립의 이름표다 */}
      <Container>
        <Reveal>
          <p className="text-center text-base font-semibold tracking-[0.18em] text-white/60 uppercase md:text-lg">
            Partners of the Best
          </p>
        </Reveal>
      </Container>

      {/*
        ⚠️ 보안 체크리스트 A-1
        기획서 5.1 S5 는 로고 스트립 마크업을 심고 display:none 처리하라고
        지시하지만, display:none 은 소스 보기로 전부 노출되고 검색엔진도 읽는다.
        같은 문서 4.2 의 확정사항("협업 상대사 사명 미표기")과 충돌하므로
        **마크업 자체를 만들지 않는다.** 공개 동의 확보 후 Partner.logo 에
        값이 들어오면 그때 렌더링되도록 데이터 구조만 열어 두었다.
        (lib/business.ts 의 Partner 타입 참조)
      */}

      {/*
        로고 마퀴 — 검정 바탕의 얇은 띠 안에서 로고가 끊김 없이 흘러간다.
        무한 루프·간격·접근성 처리는 components/LogoMarquee.tsx 주석 참고.

        원본 SVG 가 흰색(fill="white")이라 검정 바탕에서는 필터 없이
        그대로 쓴다. 흰 바탕에 얹을 때만 invert(1) 이 필요했다.
      */}
      <Container className="mt-5">
        <LogoMarquee logos={LOGO_WALL} label="관계사 로고" />
      </Container>
    </section>
  );
}
/* --------------------------------------------- S6 채용 · 문의 (좌우 분할) */

/** 왼쪽(채용)·오른쪽(문의) 배경 사진 — 평소에도 선명하게 보이고, 호버하면 위/아래에서 빛 효과가 번진다 */
const CTA_CARDS = [
  {
    key: "careers",
    href: "/careers",
    eyebrow: "Careers",
    title: (
      <>
        우리가 만드는 변화에
        <br />
        관심이 있다면
      </>
    ),
    body: (
      <>
        아직 풀리지 않은 문제를 새로운 시선으로 바라봅니다.
        <br />
        그 답을 함께 만들어갈 동료를 기다립니다.
      </>
    ),
    cta: "공고보기",
    ctaVariant: "primary" as const,
    image: { src: "/cta/careers.png", alt: "채용" },
  },
  {
    key: "contact",
    href: "/contact",
    eyebrow: "Contact",
    title: (
      <>
        현장의 문제를
        <br />
        들려주세요
      </>
    ),
    body: (
      <>
        어떤 업무가 불편한지 말씀해 주세요.
        <br />
        현장의 상황을 살펴보고, 최적의 해결 방법을 함께 찾아드립니다.
      </>
    ),
    cta: "문의하기",
    ctaVariant: "primary" as const,
    image: { src: "/cta/contact.png", alt: "문의" },
  },
] as const;

function CtaBanner() {
  return (
    <Section tone="navy-deep" size="lg" className="!py-28 md:!py-40">
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
              {/* 글씨 구간만 한 번 더 눌러 가독성 확보 (버튼 쪽 그라디언트는 그대로 둔다) */}
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

              {/* 버튼 — 평소에도 카드 하단 가운데에 보이고, 호버하면 살짝 떠오르며 빛난다 */}
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
