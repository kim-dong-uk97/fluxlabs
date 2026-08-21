import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, Container } from "@/components/Section";
import { ButtonLink, Arrow, Chevron } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { TechApproachSection } from "@/components/TechApproach";
import { AIShowcaseSection } from "@/components/AIShowcase";
import { ExpandPanels, type ExpandPanelItem } from "@/components/ExpandPanels";
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
      <AIShowcaseSection />
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_10%,rgba(10,11,15,0.15)_0%,rgba(10,11,15,0.3)_45%,rgba(10,11,15,0.5)_100%)]"
      />
      {/*
        텍스트 가독성용 그라디언트 — 패널(박스) 대신 왼쪽에서 오른쪽으로
        옅어지는 스크림. 텍스트가 있는 왼쪽만 어둡게 눌러주고 오른쪽은
        영상이 그대로 드러난다.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/65 via-ink-950/30 to-transparent"
      />

      <Container className="relative pt-28 pb-24 md:pt-32">
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
          <p className="mt-10 max-w-2xl text-lg leading-[1.8] text-navy-100 md:text-xl">
            플럭스랩스는 리테일·의료·웨어러블
            <br />
            현장의 운영 구조를 AI 에이전트로 다시 설계합니다.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-16 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/business" tone="dark" variant="primary">
              사업영역 보기 <Arrow />
            </ButtonLink>
            <ButtonLink href="/contact" tone="dark" variant="secondary">
              문의하기
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
        <div>
          <p className="text-base font-semibold tracking-[0.14em] text-[#356CF5] uppercase">
            Business
          </p>
          <h2 className="mt-4 text-[26px] font-medium text-white">
            현장의 업무를 에이전트가 대신 수행합니다
          </h2>
        </div>
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

/** 로고 월 — 8개 로고 그리드. 셀이 정사각형이라 로고 크기는 균일하게 맞춘다 */
const LOGO_WALL = Array.from({ length: 8 }, (_, i) => ({
  src: `/partners/logo-${i + 1}.svg`,
  alt: `관계사 로고 ${i + 1}`,
  boxClass: "h-14 max-w-[150px]",
}));

function PartnersSection() {
  return (
    <section className="bg-white py-28 text-navy-975 md:py-40" id="partners">
      {/* 큰 타이포 헤드라인 — PARTNERS 는 위 줄로 분리, 전체 크게 */}
      <Reveal>
        <p className="text-center text-5xl leading-[1.1] font-bold sm:text-6xl lg:text-7xl">
          PARTNERS
          <br />
          OF THE BEST
        </p>
      </Reveal>

      <p className="mx-auto mt-8 max-w-md text-center text-sm text-navy-700">
        플럭스랩스는 각자의 영역에서 가장 잘하는 회사들과 기술로 연결됩니다.
      </p>

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
        로고 월 — 4×2 정사각형 격자 + 교차점 십자(+) 마커로 도면 같은
        느낌을 낸다. divide-x/divide-y 는 grid 의 행 경계를 구분하지
        못하므로(첫 행의 왼쪽 끝 셀에도 세로선이 생겨버림) 열·행 인덱스로
        직접 테두리를 판별해 붙인다.

        로고 색 처리 — invert(1) 로 색을 정확히 반전한다(brightness(0) 은
        모든 색을 검정으로 뭉개버려서, 흰 바탕 위에 검정 마크가 얹힌
        2톤 로고의 내부 명암 대비가 사라지는 문제가 있었다. invert 는
        흰↔검을 그대로 맞바꿔 명암 관계를 보존한다).
      */}
      <Container>
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-4 border-y border-navy-100">
          {LOGO_WALL.map((logo, index) => {
            const hasLeftBorder = index % 4 !== 0;
            const hasTopBorder = index >= 4;

            return (
              <Reveal key={logo.src} delay={index * 40}>
                <div
                  className={`group relative flex aspect-square items-center justify-center p-7 transition-colors duration-300 hover:bg-navy-50 ${
                    hasLeftBorder ? "border-l border-navy-100" : ""
                  } ${hasTopBorder ? "border-t border-navy-100" : ""} ${
                    hasLeftBorder
                      ? "before:absolute before:top-0 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2 before:text-[10px] before:text-navy-300 before:content-['+'] after:absolute after:bottom-0 after:left-0 after:-translate-x-1/2 after:translate-y-1/2 after:text-[10px] after:text-navy-300 after:content-['+']"
                      : ""
                  }`}
                >
                  <div
                    className={`relative w-full transition-transform duration-300 [filter:invert(1)] group-hover:scale-110 ${logo.boxClass}`}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Reveal delay={240}>
        <div className="mt-10 text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:underline"
          >
            관계사 전체 보기 <Arrow />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------------------- S6 채용 · 문의 (좌우 분할) */

/** 왼쪽(채용)·오른쪽(문의) 배경 사진 — 평소엔 흐리게, 호버하면 선명해지며 프레임이 내려와 자리잡는다 */
const CTA_CARDS = [
  {
    key: "careers",
    href: "/careers",
    eyebrow: "Careers",
    title: (
      <>
        지금 만들고 있는 것에
        <br />
        관심이 있다면
      </>
    ),
    body: (
      <>
        플럭스랩스는 아직 정답이 없는 문제를 다룹니다.
        <br />
        함께 풀 사람을 찾고 있습니다.
      </>
    ),
    cta: "공고보기",
    image: { src: "/cta/contact.png", alt: "채용" },
  },
  {
    key: "contact",
    href: "/contact",
    eyebrow: "Contact",
    title: (
      <>
        현장의 문제를
        <br />
        알려주세요
      </>
    ),
    body: (
      <>
        어떤 업무가 병목인지 듣는 것에서 시작합니다.
        <br />
        검토 후 담당자가 회신드립니다.
      </>
    ),
    cta: "문의하기",
    image: { src: "/cta/careers.png", alt: "문의" },
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
                className="object-cover opacity-70 blur-md brightness-50 saturate-75 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:blur-none group-hover:brightness-90 group-hover:saturate-100"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/35"
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

              {/* 버튼 — 평소엔 숨어있다가 호버하면 카드 하단 가운데에 나타난다 */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center md:bottom-10"
              >
                <div className="translate-y-3 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <ButtonLink
                    href={card.href}
                    tone="dark"
                    variant="primary"
                    className="pointer-events-auto !h-9 !px-4 !text-sm"
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
