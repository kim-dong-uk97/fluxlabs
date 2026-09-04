import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section, Container, PillHeading } from "@/components/Section";
import { ButtonLink, Arrow, Chevron } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { LogoMarquee } from "@/components/LogoMarquee";
import { TECH_AXES_EN } from "@/lib/tech-en";
import { SITE } from "@/lib/site";

/**
 * 홈 영어 버전.
 *
 * ⚠️ app/page.tsx(한국어)와 레이아웃이 같아야 한다. 구조·클래스·순서는
 *    그대로 두고 문구만 영어로 바꾼다. 한쪽을 고치면 다른 쪽도 같이 고칠 것.
 *
 * 링크만 다르다 — 사업 상세는 /en/business/*, 나머지(채용·문의)는 아직
 * 영문 페이지가 없어 한국어 라우트를 그대로 가리킨다.
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
      <ProcessSteps />
      <AgentGoalVisual />
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
        배경 — 사진 비율(1.415)이 화면보다 세로로 길어 위아래가 잘린다.
        기본값(가운데)으로 두면 위아래를 반씩 잘라 위쪽 지평선 빛이 깎이므로,
        기준점을 25% 로 올려 잘림을 아래쪽 빈 공간에 몰아준다.
      */}
      <Image
        src="/company/hero-orb-v8.png"
        alt=""
        fill
        priority
        quality={95}
        sizes="100vw"
        className="pointer-events-none object-cover object-[center_25%]"
      />
      {/*
        스크림은 두지 않는다. 글자가 앉는 자리의 원본 밝기가 17~21/255 라
        흰 굵은 글씨가 그대로 읽힌다. 여기에 어둠을 더 덮으면 어두운 사진에
        남은 색까지 눌려서 사진이 죽는다.
      */}

      <Container className="relative py-24 md:py-32">
        {/*
          제목은 사진 속 구를 사이에 두고 짧은 두 단어로 갈린다. 가운데 칸은
          글자를 넣지 않고 자리만 비워 구가 그대로 드러나게 한다.

          ⚠️ 가운데 빈 칸 폭(md:w-[40vw] lg:w-[38vw])은 사진 속 구 지름보다 넉넉해야 한다.
             좁으면 글자가 구를 밟는다. 사진을 갈아끼우면 이 값도 같이 볼 것.

          설명 줄이 제목 아래 정확히 붙도록, 아래 grid 도 같은 3칸 구성을 쓴다.
        */}
        <Reveal>
          <h1
            id="hero-heading"
            className="grid gap-3 text-4xl leading-none font-bold tracking-tight md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0 md:text-5xl lg:text-6xl"
          >
            <span className="md:justify-self-end md:text-right">
              We
              {/* 단어 아래 얇은 빛줄 — 왼쪽 단어에만 붙는다 */}
              <span
                aria-hidden="true"
                className="mt-3 block h-[3px] w-full bg-gradient-to-r from-transparent via-[#4a92e5] to-[#bcd9ff] md:mt-4"
              />
            </span>
            <span aria-hidden="true" className="hidden md:block md:w-[40vw] lg:w-[38vw]" />
            <span className="md:justify-self-start md:text-left">shift it</span>
          </h1>
        </Reveal>

        {/* 설명 — 왼쪽 단어 바로 아래. 제목과 같은 3칸이라 세로선이 맞는다 */}
        <Reveal delay={120}>
          <div className="grid md:grid-cols-[1fr_auto_1fr]">
            <p className="mt-6 text-sm leading-[1.7] whitespace-pre-line text-navy-100 md:mt-8 md:justify-self-end md:text-left">
              {`FLUXLABS redesigns on-site operations across
retail, healthcare and wearables with AI agents.`}
            </p>
            <span aria-hidden="true" className="hidden md:block md:w-[40vw] lg:w-[38vw]" />
            <span aria-hidden="true" className="hidden md:block" />
          </div>
        </Reveal>

        {/* 버튼 — 구 아래 가운데 */}
        <Reveal delay={240}>
          <div className="mt-16 flex justify-center md:mt-24">
            <ButtonLink
              href="/en#business"
              tone="dark"
              variant="primary"
              className="!rounded-full !border !border-white/15 !bg-[#0a0b0f] !text-white transition-colors hover:!bg-[#16181f]"
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
    <Section tone="white" size="lg" className="!py-16 bg-[#0c0c0e] md:!py-40">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-24">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex flex-col">
          <div>
            <Reveal distance={40}>
              <div className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
                FOUNDED 2015
              </div>
            </Reveal>

            <Reveal distance={40} delay={100}>
              <h2 className="mt-6 text-[32px] leading-tight font-bold text-white">
                Into an AI Agent company by 2026
              </h2>
            </Reveal>

            <Reveal distance={40} delay={200}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-navy-100 md:text-lg">
                FLUXLABS combines the system-building expertise it built up in
                <br />
                financial IT with AI agent technology, changing how the sites
                <br />
                that actually generate revenue are run.
              </p>
            </Reveal>
          </div>

          <Reveal distance={40} delay={300} className="mt-16 md:mt-auto">
            <div className="flex flex-col gap-2.5 text-white md:text-lg">
              <p className="text-[20px] font-bold text-[#4A92E5] md:text-[22px]">
                FLUXLABS AGENT GOAL
              </p>
              <p className="font-medium">Software that understands people,</p>
              <p className="font-medium">
                reading your intent and deciding on its own to deliver the best
                result.
              </p>
            </div>
          </Reveal>
        </div>

        {/* 오른쪽 이미지 */}
        <Reveal
          distance={64}
          delay={400}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-white/10"
        >
          <Image
            src="/company/ai-agent.png"
            alt="AI Agent"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------- S3 사업영역 4분할 그리드 */

/**
 * 사업영역 네 칸 — 한국어판과 같은 사진·같은 배치. 문구만 영어다.
 *
 * halves 가 있는 칸은 세로 사진 두 장을 맞대 한 칸을 이룬다 (웨어러블).
 */
const BUSINESS_CARDS = [
  {
    slug: "nxi",
    title: "AUI Retail Operations Platform",
    body: "FLUXLABS' AUI technology builds a system where AI takes on every step of the process and handles it automatically.",
    image: "/business/card-nxi.png",
  },
  {
    slug: "wearable",
    title: "Wearable On-device Agent",
    body: "Smart Glasses",
    halves: ["/business/card-wearable-l.png", "/business/card-wearable-r.png"],
  },
  {
    slug: "healthcare",
    title: "How the queue at the front desk disappears",
    body: "FLUXLABS runs SI projects that automate this area with AI agents",
    image: "/business/card-healthcare-v3.png",
  },
  {
    slug: "assistant",
    title: "AI Assistant Service",
    body: "We bring agents into the systems you already use",
    image: "/business/card-assistant-v4.png",
  },
];

function BusinessGrid() {
  return (
    <section
      className="on-navy bg-ink-950 py-16 text-white md:py-40"
      id="business"
    >
      <Container>
        <PillHeading
          eyebrow="Business"
          description="Agents take over the work on the ground"
          descriptionClassName="text-[26px] font-medium text-white"
        />
      </Container>

      <Container>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {BUSINESS_CARDS.map((card, index) => (
            <Reveal key={card.slug} delay={index * 80}>
              <Link href={`/en/business/${card.slug}`} className="group block">
                {/*
                  사진에 테두리와 둥근 모서리가 그려져 있으므로 카드 쪽에서는
                  테두리도 클리핑도 주지 않는다. 자르면 그 테두리가 깎인다.
                */}
                <div className="relative aspect-[539/370]">
                  {/*
                    호버 광 — 사진의 투명도를 마스크로 써서 파란색을 그 모양대로
                    찍고 흐린다. 모양이 사진과 100% 같으므로 모서리가 어긋날 수 없다.

                    ⚠️ box-shadow / border-radius 로는 안 된다. 사진의 모서리가
                       원호가 아니라 완만한 곡선(squircle)이라 CSS 로 재현되지 않는다.
                    ⚠️ drop-shadow 도 안 된다. 불투명한 모든 요소를 따라가서,
                       안이 비어 있는 사진에서는 내부 아이콘까지 빛난다.
                  */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 blur-[10px] transition-opacity duration-500 group-hover:opacity-85"
                  >
                    {(card.halves ?? [card.image]).map((src, i) => (
                      <span
                        key={src}
                        className={`absolute inset-y-0 bg-[#4a92e5] ${
                          card.halves
                            ? i === 0
                              ? "right-1/2 left-0 mr-[3px]"
                              : "right-0 left-1/2 ml-[3px]"
                            : "inset-x-0"
                        }`}
                        style={{
                          WebkitMaskImage: `url(${src})`,
                          maskImage: `url(${src})`,
                          WebkitMaskSize: "100% 100%",
                          maskSize: "100% 100%",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                        }}
                      />
                    ))}
                  </span>

                  {card.halves ? (
                    <div className="flex h-full w-full gap-1.5">
                      {card.halves.map((half) => (
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
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 560px, 50vw"
                      className="relative object-fill"
                    />
                  )}

                  {/* 글자는 사진 위 왼쪽 아래. 네 칸이 같은 자리·같은 크기를 쓴다 */}
                  <div className="absolute inset-x-5 bottom-5 z-10 md:inset-x-7 md:bottom-7">
                    <h3 className="text-lg leading-snug font-bold">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-navy-100 md:text-base">
                      {card.body}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------- S3-2 프로세스 스텝 */

function ProcessSteps() {
  return (
    <section
      className="relative overflow-hidden bg-ink-950 py-16 text-white md:py-40"
      id="process-steps"
    >
      <Container>
        <PillHeading
          eyebrow="Approach"
          description="What we prove at one site becomes the starting point for the next."
          descriptionClassName="text-[26px] font-medium text-white"
        />
        {/* 유리에 비칠 빛 — 이게 없으면 카드 윗부분이 빈칸으로 보인다 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/3 h-[520px] bg-[radial-gradient(60%_50%_at_50%_50%,rgba(74,146,229,0.22)_0%,rgba(30,58,138,0.1)_45%,transparent_75%)]"
        />

        <div className="relative mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TECH_AXES_EN.map((axis, index) => (
            <div
              key={axis.key}
              className="group relative flex min-h-[380px] w-full flex-col px-6 pt-16 pb-20 text-center"
            >
              {/* === BACKGROUND AND BORDER LAYER === */}
              <div className="absolute inset-0 z-0 drop-shadow-[0_0_8px_rgba(74,146,229,0.2)] transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(74,146,229,0.5)]">
                {/* 1. 메인 카드 (밑이 잘리지 않은 완전한 둥근 사각형) */}
                <div className="step-card-surface absolute inset-0 rounded-[28px] border border-slate-600">
                  <div className="absolute inset-x-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#4A92E5] to-transparent blur-[2px]" />
                </div>

                {/*
                  2. 테두리 지우개 — 카드 바닥의 직선 테두리 중 아치가 열리는
                  78px 구간만 덮는다. 아치 안쪽과 같은 색이어야 두 조각이
                  한 덩어리로 읽힌다.
                */}
                <div className="absolute bottom-0 left-1/2 z-10 h-[2px] w-[78px] -translate-x-1/2 bg-ink-950" />

                {/* 3. 상단 아치 — 카드에서 파낸 자리. 구슬이 여기 앉는다 */}
                <div className="absolute bottom-0 left-1/2 z-20 h-10 w-20 -translate-x-1/2 rounded-t-[40px] border-x border-t border-slate-600 bg-ink-950" />

                {/* 4. 이너 구슬 (구슬 하단은 테두리 없이 자연스럽게 노출) */}
                <div className="absolute -bottom-8 left-1/2 z-30 flex size-16 -translate-x-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_42%_28%,_#ffffff_0%,_#cfe3ff_16%,_#6aa4f5_42%,_#2a54b8_70%,_#16265f_100%)] text-lg font-bold text-white shadow-[inset_0_0_12px_rgba(56,189,248,0.5)]">
                  0{index + 1}
                </div>
              </div>

              {/* === CONTENT LAYER === */}
              <div className="relative z-10 flex h-full w-full flex-col items-center">
                <Image
                  src={`/tech/icon-v2-${index + 1}.png`}
                  alt={axis.label}
                  width={56}
                  height={56}
                  className="mb-8 object-contain"
                />
                <h3 className="mb-5 text-xl font-bold text-sky-100">
                  {axis.label}
                </h3>
                <p className="text-[13px] leading-relaxed text-sky-200/70 md:text-[14px]">
                  {axis.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------- S4-1 키비주얼 */

/** 아래 칩 — 사진의 화살표가 가리키는 네 사업 */
const AGENT_GOAL_TAGS = [
  "AUI Retail",
  "Healthcare Automation",
  "Wearable Agent",
  "AI Assistant",
];

/**
 * 접근 방식 아래 키비주얼.
 *
 * 사진에는 원호·로고·화살표만 있고, 워드마크·문구·칩은 HTML 로 얹는다.
 * 그래야 언어별로 문구만 갈아끼울 수 있다.
 *
 * 글자 위치는 % 로 잡는다. 사진이 원본 비율(2880x1358)대로 늘어나므로,
 * 화면 폭이 달라져도 글자가 사진 속 빈 자리에 그대로 앉는다.
 */
function AgentGoalVisual() {
  return (
    <section className="bg-ink-950 pt-16 md:pt-40">
      <Reveal>
        <div className="relative">
          <Image
            src="/company/hero-13.jpg"
            alt=""
            width={2880}
            height={1358}
            quality={92}
            sizes="100vw"
            className="h-auto w-full"
          />

          {/* 발광 덩어리 바로 아래에 글자를 앉힌다 */}
          <div className="absolute inset-x-0 top-[43%] px-5 text-center">
            <p className="mt-4 text-xl leading-none font-bold tracking-tight text-white md:mt-6 md:text-3xl lg:text-4xl">
              FLUXLABS
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-xs leading-[2.2] font-semibold break-keep whitespace-pre-line text-white/85 md:mt-9 md:text-base">
              {`"Software that understands people. It reads your intent,
makes autonomous decisions, and delivers optimal results."`}
            </p>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-1.5 md:mt-10 md:gap-2.5">
              {AGENT_GOAL_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-[#1817b1] px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-[0_0_16px_rgba(45,43,220,0.7)] md:px-4 md:py-1.5 md:text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* --------------------------------------------------- S5 관계사 */

/** 로고 월 — 8개 로고 그리드. 셀이 정사각형이라 로고 크기는 균일하게 맞춘다 */
const LOGO_WALL = Array.from({ length: 8 }, (_, i) => ({
  src: `/partners/logo-${i + 1}.svg`,
  alt: `Partner logo ${i + 1}`,
  boxClass: "h-14 max-w-[150px]",
}));

function PartnersSection() {
  return (
    <section
      className="bg-ink-950 pt-10 pb-8 text-white md:pt-20 md:pb-10"
      id="partners"
    >
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
        협업 상대사 사명은 표기하지 않기로 확정돼 있어 **마크업 자체를 만들지
        않는다.** 공개 동의 확보 후 Partner.logo 에 값이 들어오면 그때
        렌더링되도록 데이터 구조만 열어 두었다.
      */}
      <Container className="mt-5">
        <LogoMarquee logos={LOGO_WALL} label="Partner logos" />
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
