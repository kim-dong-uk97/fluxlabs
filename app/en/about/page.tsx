import Image from "next/image";
import type { Metadata } from "next";
import { Section, PillHeading, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CopyButton } from "@/components/CopyButton";
import { KakaoMap } from "@/components/KakaoMap";
import { ButtonLink, Arrow } from "@/components/Button";
import {
  CEO_MESSAGE_EN,
  HISTORY_EN,
  OVERVIEW_LABELS_EN,
  OVERVIEW_VALUES_EN,
  LOCATION_EN,
} from "@/lib/about-en";
import { SITE } from "@/lib/site";

/**
 * 회사소개 영문판 — app/about/page.tsx 와 같은 구조·같은 레이아웃.
 * 콘텐츠만 lib/about-en.ts 에서 가져온다.
 */

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.nameEn} was founded in 2015 and pivoted to an AI agent company in 2026. Company overview, history, CEO message, and directions.`,
  alternates: {
    canonical: "/en/about",
    languages: { ko: "/about", en: "/en/about" },
  },
  openGraph: {
    locale: "en_US",
    title: `About | ${SITE.shortName}`,
    description: `${SITE.nameEn} — company overview, history, and CEO message`,
    url: "/en/about",
  },
};

export default function AboutPageEn() {
  return (
    <>
      <PageHero />
      <CompanyOverview />
      <CeoMessage />
      <History />
      <Location />
    </>
  );
}

/* ---------------------------------------------------------------- 페이지 히어로 */

function PageHero() {
  return (
    // 사진을 풀블리드로 깔고 그 위 가운데에 페이지 제목만 놓는다.
    <section className="on-navy relative flex min-h-[40vh] items-center overflow-hidden bg-black pt-24 pb-14 text-white md:min-h-[48vh] md:pt-28 md:pb-16">
      <Image
        src="/about/hero-building-v5.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
      {/* 제목이 사진 위에서도 또렷하게 읽히도록 전체를 어둡게 눌러 준다 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/55"
      />

      <Container className="relative">
        <Reveal>
          <h1 className="text-center text-4xl font-medium tracking-tight text-white md:text-6xl">
            About
          </h1>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- 대표 메시지 */

/**
 * ⚠️ 기획서 5.2 의 "폭 최대 640px · 좌측 정렬"에서 벗어난 부분:
 *    요청에 따라 폭을 넓히고(max-w-5xl) 원고의 강제 줄바꿈은 풀어
 *    가로로 흐르게 했다. 좌측 정렬은 유지.
 */
function CeoMessage() {
  return (
    <section className="on-navy relative overflow-hidden bg-ink-950 py-24 text-white md:py-36">
      {/*
        오른쪽 사진 — 테두리 없이 배경에 녹인다.
        왼쪽·아래 가장자리를 마스크로 페이드아웃시켜 섹션 배경과 이어지게 한다.
      */}
      <div className="pointer-events-none absolute inset-y-24 right-0 hidden w-[38%] lg:block">
        <Image
          src="/about/ceo-side-v2.png"
          alt=""
          fill
          sizes="38vw"
          className="object-cover object-center opacity-70"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 45%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 45%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="max-w-5xl text-left lg:max-w-[58%]">
            {/* 인용 형태의 헤드라인 */}
            <h2 className="text-3xl leading-[1.25] font-bold text-white md:text-4xl">
              &ldquo;{CEO_MESSAGE_EN.heading}&rdquo;
            </h2>

            <div className="mt-14">
              <CeoParagraphs paragraphs={CEO_MESSAGE_EN.paragraphs} />
            </div>

            <p className="mt-16 text-lg">
              <span className="text-navy-300">
                {CEO_MESSAGE_EN.signatureTitle}
              </span>{" "}
              <span className="font-semibold tracking-[0.3em] text-white">
                {CEO_MESSAGE_EN.signature}
              </span>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * 원고 본문 — 원고의 줄바꿈(\n)은 공백으로 바꿔 한 문단이 폭에 맞춰 흐르게 한다.
 * 문단이 세로로 길어지지 않도록 가로로 길게 뽑는 쪽을 택했다.
 * 문단 사이 여백(1.5~2em)은 기획서 5.2 그대로.
 */
function CeoParagraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-[1.75em] text-lg leading-[1.9] text-navy-100">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>
          <EmphasizedText text={paragraph.replaceAll("\n", " ")} />
        </p>
      ))}
    </div>
  );
}

/** `30 seconds`, `a minute` 두 수치만 미세 강조. 그 외 강조 금지 (기획서 5.2) */
function EmphasizedText({ text }: { text: string }) {
  const pattern = new RegExp(`(${CEO_MESSAGE_EN.emphasis.join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        (CEO_MESSAGE_EN.emphasis as readonly string[]).includes(part) ? (
          <strong key={index} className="font-semibold text-white">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/* ---------------------------------------------------------------- 회사 개요 */

const OVERVIEW: { label: string; value: string }[] = [
  { label: OVERVIEW_LABELS_EN.name, value: SITE.nameEn },
  {
    label: OVERVIEW_LABELS_EN.established,
    value: OVERVIEW_VALUES_EN.established,
  },
  { label: OVERVIEW_LABELS_EN.ceo, value: OVERVIEW_VALUES_EN.ceo },
  { label: OVERVIEW_LABELS_EN.address, value: OVERVIEW_VALUES_EN.address },
  { label: OVERVIEW_LABELS_EN.tel, value: SITE.tel },
  {
    label: OVERVIEW_LABELS_EN.businessScope,
    value: OVERVIEW_VALUES_EN.businessScope,
  },
];

function CompanyOverview() {
  return (
    <Section tone="white" size="lg">
      <PillHeading
        eyebrow="Overview"
        description="Company Overview"
        eyebrowClassName="border-white/60 text-white"
        descriptionClassName="text-3xl font-bold text-white md:text-4xl"
        lineClassName="bg-white/60"
      />

      <Reveal>
        <dl className="mx-auto mt-12 max-w-3xl divide-y divide-white/10 border-t border-white/10">
          {OVERVIEW.map((row, index) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="flex shrink-0 items-baseline gap-3 sm:w-56">
                <span className="tnum text-lg font-bold text-white">
                  0{index + 1}
                </span>
                <span className="font-semibold text-white">{row.label}</span>
              </dt>
              <dd className="text-navy-100">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- 연혁 */

function History() {
  return (
    <Section tone="offwhite" size="lg">
      <PillHeading
        eyebrow="History"
        description="History"
        eyebrowClassName="border-white/60 text-white"
        descriptionClassName="text-3xl font-bold text-white md:text-4xl"
        lineClassName="bg-white/60"
      />

      {/* 타임라인 전체를 가운데로 모은다 (컨테이너 폭보다 좁게) */}
      <div className="mx-auto mt-20 mb-8 max-w-5xl">
        {HISTORY_ROWS.map((row, rowIndex) => {
          // 뱀처럼 왕복 — 홀수 줄은 오른쪽에서 들어와 왼쪽으로 흐른다
          const reversed = rowIndex % 2 === 1;
          const items = reversed ? [...row].reverse() : row;

          return (
            <div
              key={rowIndex}
              className={rowIndex > 0 ? "relative mt-32" : "relative"}
            >
              {/* 곡선이 지나갈 오른쪽 여백(pr-24)을 비워 두고 그 안에 그리드를 넣는다 */}
              <div className="pr-24">
                <ol
                  className="relative grid min-h-[12rem] gap-x-6 gap-y-10 border-t-2 border-white/20 pt-8"
                  style={{
                    gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                  }}
                >
                  {items.map((item, index) => (
                    <Reveal
                      key={`${item.year}-${item.text}`}
                      as="li"
                      delay={index * 60}
                    >
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute -top-[calc(2rem+6px)] left-0 size-3 rounded-full bg-navy-300"
                        />
                        <p className="tnum text-sm font-bold text-navy-300">
                          {item.year}
                        </p>
                        <p className="mt-1.5 text-base leading-[1.6] text-white">
                          {item.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}

                  {/* 항목 사이 진행 방향 화살표 — 줄(border-t) 위에 얹는다 */}
                  {items.slice(1).map((_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-px -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${((i + 1) / items.length) * 100}%` }}
                    >
                      <TimelineArrow direction={reversed ? "left" : "right"} />
                    </span>
                  ))}
                </ol>
              </div>

              {/*
                다음 줄로 이어지는 연결선 — 뱀처럼 오른쪽에서 꺾여 내려간다.
                높이는 다음 row 와의 간격(mt-32 = 8rem)에 맞추고, 테두리가 박스
                안쪽에 그려지므로 +2px 를 더해 다음 줄의 선과 정확히 맞닿게 한다.
              */}
              {rowIndex < HISTORY_ROWS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 right-0 h-[calc(100%+8rem+2px)] w-24 rounded-tr-[4rem] rounded-br-[4rem] border-t-2 border-r-2 border-b-2 border-white/20"
                />
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function TimelineArrow({
  direction = "right",
}: {
  direction?: "right" | "left";
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`size-3 rounded-full bg-ink-900 text-white/60 ${direction === "left" ? "-scale-x-100" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 2.5L8.5 6L4 9.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 연혁 타임라인 줄바꿈 — 첫 줄 3개·다음 줄 2개 (한국어판과 동일) */
const HISTORY_ROW_SIZES = [3, 2];
const HISTORY_ROWS = (() => {
  const rows: (typeof HISTORY_EN)[number][][] = [];
  let cursor = 0;
  for (const size of HISTORY_ROW_SIZES) {
    rows.push(HISTORY_EN.slice(cursor, cursor + size));
    cursor += size;
  }
  return rows;
})();

/* ---------------------------------------------------------------- 오시는 길 */

const KAKAO_MAP_SEARCH = `https://map.kakao.com/?q=${encodeURIComponent(SITE.address)}`;

function Location() {
  return (
    <Section tone="white" size="lg">
      <PillHeading
        eyebrow="Location"
        description="Directions"
        eyebrowClassName="border-white/60 text-white"
        descriptionClassName="text-3xl font-bold text-white md:text-4xl"
        lineClassName="bg-white/60"
      />

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-xl font-semibold">{SITE.nameEn}</p>
            <p className="mt-3 text-lg leading-[1.8] text-navy-100">
              {OVERVIEW_VALUES_EN.address}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {/* 복사되는 값은 지도 검색과 맞추기 위해 한국어 주소를 그대로 쓴다 */}
              <CopyButton
                value={SITE.address}
                label="Copy address"
                copiedLabel="Copied"
                copiedAnnouncement="Address copied."
                failedLabel="Copy failed. Please select the address manually."
              />
              <ButtonLink
                href={KAKAO_MAP_SEARCH}
                variant="secondary"
                external
                className="h-10 px-4 text-sm"
              >
                View on Kakao Map <Arrow />
              </ButtonLink>
            </div>

            <dl className="mt-10 w-fit space-y-4 border-t border-white/10 pt-8">
              <div>
                <dt className="text-sm font-semibold text-navy-300">
                  {LOCATION_EN.subway}
                </dt>
                <dd className="mt-1 text-white">{LOCATION_EN.subwayValue}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-navy-300">
                  {LOCATION_EN.tel}
                </dt>
                <dd className="tnum mt-1 text-white">
                  <a
                    href={`tel:${SITE.tel.replaceAll("-", "")}`}
                    className="hover:underline"
                  >
                    {SITE.tel}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={120} className="mx-auto w-full max-w-xl lg:mx-0">
          {/*
            지도 — 기획서 5.2 카카오맵 API 임베드.
            NEXT_PUBLIC_KAKAO_MAP_KEY 가 없으면 SDK 를 로드하지 않고
            외부 링크 폴백으로 내려간다 (components/KakaoMap.tsx 주석 참조).
          */}
          <KakaoMap
            address={SITE.address}
            placeName={SITE.nameEn}
            fallbackHref={KAKAO_MAP_SEARCH}
            fallbackLabel="View location on Kakao Map"
            loadingLabel="Loading map…"
            expandLabel="Open larger map"
            mapAriaLabel={`Map showing the location of ${SITE.nameEn}`}
          />
        </Reveal>
      </div>
    </Section>
  );
}
