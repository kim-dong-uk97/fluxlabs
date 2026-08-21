import type { Metadata } from "next";
import { Section, SectionHeading, Container } from "@/components/Section";
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
      <CeoMessage />
      <CompanyOverview />
      <History />
      <Location />
    </>
  );
}

/* ---------------------------------------------------------------- 페이지 히어로 */

function PageHero() {
  return (
    <Section tone="white" size="lg" className="pt-32 md:pt-40">
      <Reveal>
        <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
          About
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">회사소개</h1>
        <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-navy-100">
          플럭스랩스는 금융 IT 영역에서 축적한 시스템 구축 역량 위에 AI 에이전트
          기술을 결합해, 실제 매출이 발생하는 현장의 운영 방식을 바꾸는 일을
          합니다.
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------------------------------------------------------------- 대표 메시지 */

/**
 * 조판 지시 — 기획서 5.2
 *  - 배경 Navy 풀블리드 + 화이트 텍스트 (이 블록만 색 반전 → 시선 정지)
 *  - 폭 최대 640px (한 줄이 길어지면 호흡이 무너진다)
 *  - 좌측 정렬. 중앙 정렬 금지
 *  - 문단 사이 여백 1.5~2em
 *  - 줄바꿈은 원고 그대로 고정, 모바일에서만 자동 흐름
 *  - 헤드라인은 본문 대비 2.5~3배
 *  - 대표 사진은 넣지 않는다
 */
function CeoMessage() {
  return (
    <section className="on-navy bg-ink-950 py-24 text-white md:py-36">
      <Container>
        <Reveal>
          {/* 폭 640px 제한 */}
          <div className="max-w-[640px]">
            <h2 className="text-[2.5rem] leading-[1.25] font-bold md:text-[3rem]">
              {CEO_MESSAGE.heading}
            </h2>

            <div className="mt-12 space-y-[1.75em] text-lg leading-[1.9] text-navy-100">
              {CEO_MESSAGE.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  // 모바일: 자동 흐름 / 768px 이상: 원고 줄바꿈 고정
                  className="whitespace-normal md:whitespace-pre-line"
                >
                  <EmphasizedText text={paragraph} />
                </p>
              ))}
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
      <SectionHeading eyebrow="Overview" title="회사 개요" />

      <Reveal>
        <dl className="mt-12 divide-y divide-white/10 border-t border-white/10">
          {OVERVIEW.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 py-5 md:grid-cols-[10rem_1fr] md:gap-6"
            >
              <dt className="font-semibold text-white">{row.label}</dt>
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
      <SectionHeading eyebrow="History" title="연혁" />

      <ol className="mt-12 border-l border-white/15 pl-6 md:pl-10">
        {HISTORY.map((item, index) => (
          <Reveal key={`${item.year}-${item.text}`} as="li" delay={index * 60}>
            <div className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-navy-300 md:-left-[calc(2.5rem+5px)]"
              />
              <p className="tnum text-sm font-bold text-navy-300">
                {item.year}
              </p>
              <p className="mt-1.5 text-lg text-white">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------------------------------------------------------- 오시는 길 */

const KAKAO_MAP_SEARCH = `https://map.kakao.com/?q=${encodeURIComponent(SITE.address)}`;

function Location() {
  return (
    <Section tone="white" size="lg">
      <SectionHeading eyebrow="Location" title="오시는 길" />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div>
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

            <dl className="mt-10 space-y-4 border-t border-white/10 pt-8">
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

        <Reveal delay={120}>
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

