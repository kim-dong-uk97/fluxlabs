import Image from "next/image";
import type { Metadata } from "next";
import { Section, PillHeading, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { CopyButton } from "@/components/CopyButton";
import { KakaoMap } from "@/components/KakaoMap";
import { ButtonLink, Arrow } from "@/components/Button";
import { CEO_MESSAGE, HISTORY } from "@/lib/ceo-message";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
  description: `${SITE.name}는 2015년 설립 후 2026년 AI 에이전트 기업으로 전환했습니다. 회사 개요, 연혁, 대표 메시지, 오시는 길을 안내합니다.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `회사소개 | ${SITE.shortName}`,
    description: `${SITE.name} 회사 개요·연혁·대표 메시지`,
    url: "/about",
  },
};

export default function AboutPage() {
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
            회사소개
          </h1>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- 대표 메시지 */

/**
 * 조판 지시 — 기획서 5.2
 *  - 배경 Navy 풀블리드 + 화이트 텍스트 (이 블록만 색 반전 → 시선 정지)
 *  - 좌측 정렬. 중앙 정렬 금지
 *  - 문단 사이 여백 1.5~2em
 *  - 헤드라인은 본문 대비 2.5~3배 (헤드라인은 페이지 히어로로 올렸다)
 *  - 대표 사진은 넣지 않는다
 *
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
              &ldquo;{CEO_MESSAGE.heading}&rdquo;
            </h2>

            <div className="mt-14">
              <CeoParagraphs paragraphs={CEO_MESSAGE.paragraphs} />
            </div>

            <p className="mt-16 text-lg">
              <span className="text-navy-300">
                {CEO_MESSAGE.signatureTitle}
              </span>{" "}
              {/* 자간 벌림은 원고 의도이므로 유지 (5.2) */}
              <span className="font-semibold tracking-[0.3em] text-white">
                {CEO_MESSAGE.signature}
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

/** `30초`, `1분` 두 수치만 미세 강조. 그 외 강조 금지 (기획서 5.2) */
function EmphasizedText({ text }: { text: string }) {
  const pattern = new RegExp(`(${CEO_MESSAGE.emphasis.join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        (CEO_MESSAGE.emphasis as readonly string[]).includes(part) ? (
          // Navy 배경이므로 navy-900 대신 굵기+화이트로 강조한다
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
  { label: "사명", value: `${SITE.name} (${SITE.nameEn})` },
  { label: "설립일", value: SITE.established },
  { label: "대표이사", value: SITE.ceo },
  { label: "소재지", value: SITE.address },
  { label: "대표전화", value: SITE.tel },
  { label: "사업영역", value: SITE.businessScope },
];

function CompanyOverview() {
  return (
    <Section tone="white" size="lg">
      <PillHeading
        eyebrow="Overview"
        description="회사 개요"
        eyebrowClassName="inline-block w-auto px-3 py-1 border-white/60 text-white"
        descriptionClassName="text-3xl font-bold text-white md:text-4xl"
        lineClassName="opacity-0 h-8"
      />

      <Reveal>
        <dl className="mx-auto mt-16 max-w-3xl divide-y divide-white/10 border-t border-white/10">
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
        description="연혁"
        eyebrowClassName="inline-block w-auto px-3 py-1 border-white/60 text-white"
        descriptionClassName="text-3xl font-bold text-white md:text-4xl"
        lineClassName="opacity-0 h-8"
      />

      {/* 가운데 가로선을 기준으로 항목이 위·아래로 번갈아 붙는 타임라인. 색은 흰색 하나로 통일. */}
      <div className="mx-auto mt-24 max-w-6xl overflow-x-auto pb-4">
        <div className="relative flex min-w-[900px]">
          {/* 가운데 가로선 — 열의 세로 중앙(=점 위치)과 정확히 맞도록 위·아래 칸 높이를 대칭으로 둔다 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15"
          />

          {HISTORY.map((item, idx) => {
            const isAbove = idx % 2 === 0;

            return (
              <div key={idx} className="relative flex flex-1 flex-col items-center px-3">
                {/* 위 칸 — 위로 붙는 항목만 채운다 */}
                <div className="flex h-32 w-full flex-col items-center justify-end text-center">
                  {isAbove && (
                    <>
                      <p className="text-xs leading-relaxed text-white/50">
                        {item.text}
                      </p>
                      <p className="tnum mt-3 text-xl font-bold text-white">
                        {item.year}
                      </p>
                    </>
                  )}
                </div>

                {/* 점 — 얇은 원형 띠 하나 + 가운데 점 */}
                <div className="relative z-10 flex flex-col items-center">
                  {isAbove && <div className="h-6 w-px bg-white/25" />}
                  <div className="relative flex size-6 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-white/35" />
                    <span className="size-2 rounded-full bg-white" />
                  </div>
                  {!isAbove && <div className="h-6 w-px bg-white/25" />}
                </div>

                {/* 아래 칸 — 아래로 붙는 항목만 채운다 */}
                <div className="flex h-32 w-full flex-col items-center justify-start text-center">
                  {!isAbove && (
                    <>
                      <p className="tnum mt-3 text-xl font-bold text-white">
                        {item.year}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-white/50">
                        {item.text}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/** 연혁 타임라인 줄바꿈 — 기획서 없음, 참고 이미지 기준 첫 줄 3개·다음 줄 2개 */
const HISTORY_ROW_SIZES = [3, 2];
const HISTORY_ROWS = (() => {
  const rows: (typeof HISTORY)[number][][] = [];
  let cursor = 0;
  for (const size of HISTORY_ROW_SIZES) {
    rows.push(HISTORY.slice(cursor, cursor + size));
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
        description="찾아오시는 길"
        eyebrowClassName="inline-block w-auto px-3 py-1 border-white/60 text-white"
        descriptionClassName="text-3xl font-bold text-white md:text-4xl"
        lineClassName="opacity-0 h-8"
      />

      <div className="mt-16 grid items-start gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="mx-auto w-[85%]">
            <p className="text-xl font-semibold">{SITE.name}</p>
            <p className="mt-3 text-lg leading-[1.8] text-navy-100">
              {SITE.address}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CopyButton value={SITE.address} />
              <ButtonLink
                href={KAKAO_MAP_SEARCH}
                variant="secondary"
                external
                className="h-10 px-4 text-sm"
              >
                카카오맵에서 보기 <Arrow />
              </ButtonLink>
            </div>

            <dl className="mt-10 w-fit space-y-4 border-t border-white/10 pt-8">
              <div>
                <dt className="text-sm font-semibold text-navy-300">지하철</dt>
                <dd className="mt-1 text-white">
                  2호선 홍대입구역 도보 8분 · 6호선 상수역 도보 10분
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-navy-300">대표전화</dt>
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

        <Reveal delay={120} className="ml-auto w-[75%]">
          {/*
            지도 — 기획서 5.2 카카오맵 API 임베드.
            NEXT_PUBLIC_KAKAO_MAP_KEY 가 없으면 SDK 를 로드하지 않고
            외부 링크 폴백으로 내려간다 (components/KakaoMap.tsx 주석 참조).
          */}
          <KakaoMap
            address={SITE.address}
            placeName={SITE.name}
            fallbackHref={KAKAO_MAP_SEARCH}
          />
        </Reveal>
      </div>
    </Section>
  );
}

