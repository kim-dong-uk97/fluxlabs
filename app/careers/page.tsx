import Image from "next/image";
import type { Metadata } from "next";
import { Section, SectionHeading, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Arrow } from "@/components/Button";
import { BUSINESSES } from "@/lib/business";
import { SITE } from "@/lib/site";

/**
 * 인재영입 — 기획서 5.4
 *
 * 확정: **상시 지원(Open Application) 형태로 운영한다.**
 * 개별 공고 목록을 두지 않으므로, 지원자가 "무엇을 만드는지"를 보고 스스로
 * 판단하게 만드는 구성이어야 한다. 공고가 없다는 사실이 약점으로 보이지
 * 않도록 인트로에 무게를 싣는다.
 *
 * ⚠️ "일하는 방식" 블록은 팀 규모·의사결정 구조·원격 여부가 미확정이라
 *    제외하고 오픈한다 (기획서 5.4 · 9.2 D항목). 정보 확보 시 추가할 것.
 *
 * ⚠️ 개별 공고 운영으로 전환할 수 있도록 공고 목록 컴포넌트(아코디언 JD 포함)는
 *    구조만 정의해 두고 렌더링하지 않는다 (5.4 개발 참고).
 *    → components/JobList.tsx 참조
 */

export const metadata: Metadata = {
  title: "인재영입",
  description:
    "플럭스랩스는 아직 정답이 없는 문제를 다룹니다. 에이전트 오케스트레이션, 음성·자연어 처리, 임베디드 최적화, 기간계 연동 — 함께 풀 사람을 찾고 있습니다.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: `인재영입 | ${SITE.shortName}`,
    description: "아직 정답이 없는 문제를 함께 풀 사람을 찾고 있습니다.",
    url: "/careers",
  },
};

/**
 * 찾고 있는 사람 — 직무명 대신 역량 기준으로 서술 (기획서 5.4)
 *
 * 카드마다 역량을 두 줄로 나눠 적는다. 두 줄 모두 "…해 보신 분" 형태로,
 * 직무명이 아니라 해본 일로 읽히게 맞춰 두었다.
 */
const CAPABILITIES = [
  {
    title: "에이전트 오케스트레이션",
    rows: [
      "여러 에이전트에 역할을 분배하고, 실패와 예외를 다루는 구조를 설계해 보신 분",
      "에이전트가 어디서 틀어졌는지 추적하고, 개선까지 이어가 보신 분",
    ],
  },
  {
    title: "음성·자연어 처리",
    rows: [
      "잡음이 많은 실제 환경에서 인식·이해 품질을 끌어올려 보신 분",
      "말이 겹치거나 끊기는 상황까지 고려해 대화 흐름을 설계해 보신 분",
    ],
  },
  {
    title: "임베디드 최적화",
    rows: [
      "제한된 연산·전력 조건에서 모델을 돌려 보신 분",
      "기기와 서버 사이의 처리 분담을 직접 설계해 보신 분",
    ],
  },
  {
    title: "기간계 연동",
    rows: [
      "결제·의료정보처럼 되돌릴 수 없는 처리를 안전하게 다뤄 보신 분",
      "시스템 간 데이터가 어긋나지 않도록 정합성을 맞춰 보신 분",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero />

      {/* 인트로 — "우리가 풀고 있는 문제". 이 페이지의 핵심 블록 (기획서 5.4) */}
      {/* 바탕은 히어로와 같은 순정 블랙 — tone 대신 plain 으로 두고 직접 칠한다 */}
      <Section tone="plain" size="lg" className="bg-black">
        {/*
          좌: 글 / 우: 꽃 다이어그램.
          lg 미만에서는 한 단으로 떨어지며 글이 먼저 온다 (DOM 순서 그대로).
        */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-iris uppercase">
                Problems
              </p>
              <h2 className="mt-4 text-xl font-bold text-white md:text-2xl">
                우리가 풀고 있는 문제
              </h2>
              {/*
                줄바꿈 — 원고에 적힌 자리에서 그대로 끊는다.
                왼쪽 단은 1440 화면에서 약 506px 다. 본문을 text-base(16px) 로
                둔 이유가 이것이다 — text-lg 로 키우면 가장 긴 줄(31자) 이
                한 줄에 안 들어가 다시 접히면서 원고의 리듬이 깨진다.
                lg 언저리(1024px) 에서는 단이 더 좁아 한 줄이 접힐 수 있다.
              */}
              <p className="mt-5 text-lg leading-[1.85] whitespace-pre-line text-navy-100">
                {`네 개의 사업과 그 기반은 각각 다른 얼굴을 하고 있지만,
결국 같은 문제로 모입니다.`}
              </p>

              {/*
                이 페이지에서 가장 무거운 대목 — 아래 문단이 이 셋을 하나씩
                풀어 준다. 셋을 한 줄에 붙이면 폭에 따라 아무 데서나 접히므로,
                항목마다 줄을 따로 준다.
              */}
              <p className="mt-8 text-xl leading-[1.6] font-bold whitespace-pre-line text-white md:text-2xl">
                {`의도를 이해하고,
맥락을 판단하고,
결과를 만들어 내는 것.`}
              </p>

              <p className="mt-6 leading-[1.9] whitespace-pre-line text-navy-300">
                {`소음 속에서 사람의 말을 정확히 듣고,
무엇을 해야 할지 스스로 판단하고,
결제와 예약처럼 되돌릴 수 없는 일을 실수 없이 끝내는 것.
네 영역 모두 이 세 가지 위에 서 있습니다.`}
              </p>
            </div>
          </Reveal>

          <ProblemGrid />
        </div>
      </Section>

      {/*
        찾고 있는 사람 — 역량 기준 서술.
        가운데 정렬 헤딩 + 2x2 유리 카드.

        섹션에 배경 그라데이션을 함께 깐다. 유리 카드의 backdrop-filter 는
        뒤에 비칠 것이 있어야 의미가 있어서, 배경이 평평하면 그냥 반투명
        사각형으로 보인다 (globals.css .glass-card 주석 참고).
      */}
      <Section
        tone="plain"
        size="lg"
        className="relative overflow-hidden bg-[#060610]"
      >
        {/* 카드 뒤로 번지는 푸른 빛 — 유리에 비칠 대상이다 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_6%,rgba(63,102,255,0.3)_0%,rgba(40,60,170,0.11)_44%,transparent_74%)]"
        />

        <div className="relative">
          <Reveal>
            <div className="mx-auto max-w-5xl text-center">
              <p className="text-sm font-semibold tracking-[0.14em] text-iris uppercase">
                People
              </p>
              <h2 className="mt-4 text-xl font-bold text-white md:text-2xl">
                어떤 역할을 맡았는지보다,
                <br />
                무엇을 만들어왔는지가 중요합니다.
              </h2>
            </div>
          </Reveal>

          {/* 카드가 가로로 늘어지지 않도록 최대폭을 걸고 가운데로 모은다 */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
            {CAPABILITIES.map((capability, index) => (
              <Reveal key={capability.title} delay={index * 70}>
                <div className="glass-card h-full p-7 md:p-8">
                  <h3 className="text-lg font-bold text-white md:text-xl">
                    {capability.title}
                  </h3>

                  <div aria-hidden="true" className="glass-card__rule mt-5" />

                  {/*
                    본문 두 줄 — 위아래가 대비가 아니라 병렬 나열이므로
                    "우리가 풀고 있는 문제" 블록과 같은 · 불릿으로 맞춘다.
                    두 줄의 길이가 달라도 카드 높이가 어긋나지 않도록 min-h 를 준다.
                  */}
                  <ul className="mt-2">
                    {capability.rows.map((row, rowIndex) => (
                      <li
                        key={rowIndex}
                        className="flex min-h-[4.5rem] items-start gap-3 py-4 leading-[1.8] text-navy-100"
                      >
                        <span
                          aria-hidden="true"
                          className="w-3 shrink-0 text-navy-300"
                        >
                          ·
                        </span>
                        {row}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/*
        일하는 방식 블록은 정보 미확정으로 제외한다 (기획서 5.4 · 9.2 D항목).
        팀 규모·의사결정 구조·원격 근무 여부가 확정되면 이 자리에 추가한다.
      */}

      {/* 지원 방법 — 상시 지원 + 이메일 접수. 파일 업로드 폼 미구현 (5.4) */}
      <Section tone="offwhite" size="lg">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold md:text-2xl">상시 지원</h2>
            <p className="mt-6 text-lg leading-[1.9]">
              정해진 공고는 없습니다. 위에 적은 문제 중 하나라도 자신이 잘 풀 수
              있다고 생각하신다면, 이력서와 함께 그 이유를 보내주세요.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={`mailto:${SITE.email}?subject=${encodeURIComponent("[채용 지원]")}`}
                variant="primary"
              >
                {SITE.email}
              </ButtonLink>
              <ButtonLink href="/contact?type=careers" variant="secondary">
                문의 폼으로 보내기 <Arrow />
              </ButtonLink>
            </div>

            <p className="mt-8 text-sm leading-[1.8] text-navy-300">
              지원 서류에 담긴 개인정보는 채용 절차 종료 후 1년간 보관 후
              파기하며, 삭제를 요청하시면 즉시 파기합니다. 자세한 내용은{" "}
              <a href="/privacy" className="font-semibold underline">
                개인정보처리방침
              </a>
              을 확인해 주세요.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------- 페이지 히어로 */

/**
 * 키비주얼 — 2560x1280(정확히 2:1) 원본.
 *
 * 폭을 1200px 로 묶고 가운데 놓는다. 화면 끝까지 늘리지 않으니 원본이
 * 항상 축소되어 들어가고(2560 -> 1200), 고정 헤더와 겹치지도 않아
 * 상단을 어둡게 누를 필요가 없다.
 *
 * ⚠️ quality={90}. 기본값 75 로는 이 사진이 무너진다 — 넓은 어두운
 *    그라디언트와 안개는 JPEG 가 가장 못 다루는 소재라 1920px 변환본이
 *    58KB 까지 떨어지면서 밴딩이 눈에 보였다. 90 을 쓰려면
 *    next.config.ts 의 images.qualities 에 값이 등록돼 있어야 한다.
 *
 * 화면비 대응. md 이상에서는 원본과 같은 aspect-[2/1] 이라 크롭이 0 이다.
 * 세로로 긴 모바일에서는 2:1 이 납작해지므로 비율을 세우고 좌우를 잘라
 * 내는데, 헤드라인이 원본 가로 32~66% 에 있고 4:5 크롭이 보여 주는 구간이
 * 30~70% 라 살아남는다. 여유가 2~3% 로 얇으니 이미지를 교체할 때는
 * 헤드라인을 반드시 가운데 40% 안에 두어야 한다.
 *
 * 하단 카피 두 줄은 이미지에 새기지 않고 실제 텍스트로 둔다 —
 * 어떤 화면비에서도 안 잘리고 검색·번역·스크린리더에도 잡힌다.
 */
function PageHero() {
  return (
    <section className="on-navy relative flex min-h-[640px] items-center overflow-hidden bg-black py-24 md:py-28 lg:min-h-[78vh]">
      {/*
        키비주얼.
        lg 이상에서는 오른쪽 절반만 차지하고 왼쪽 끝은 마스크로 사라져,
        글이 앉는 왼쪽은 검정 바탕만 남는다. 사각형으로 잘린 티가 안 나도록
        테두리를 세우지 않고 배경에 녹인다.

        이 사진은 왼쪽이 어둡고 오른쪽이 밝다 (가로 구간별 평균 밝기 26 → 99).
        네온이 오른쪽에 몰려 있어 오른쪽만 남겨도 그림이 살고, 글은 검정 위에
        놓여 대비 걱정이 없다.
        ⚠️ 사진을 바꿀 때 밝기 분포가 반대면 글 위치와 사진 쪽을 함께 뒤집을 것.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:left-auto lg:w-[56%] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_32%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_32%)]"
      >
        <Image
          src="/careers/hero-grid-v2.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      {/*
        lg 미만에서는 사진이 화면 전체를 덮으므로 글 밑에 밝은 구간이 온다.
        그때만 전체를 눌러 준다 — lg 이상은 왼쪽이 이미 검정이라 필요 없다.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/55 lg:hidden"
      />

      <Container className="relative">
        {/* 글은 사진이 어두운 왼쪽에 둔다 */}
        <div className="flex justify-start">
          <Reveal>
            <div className="max-w-xl">
              {/*
                이 페이지의 h1. 예전에는 눈에 보이는 제목이 없어 숨긴 h1 을
                따로 두었는데, 이제 이 문장이 그 자리를 대신한다.
              */}
              <h1 className="text-xl leading-[1.5] font-bold text-white md:text-2xl">
                “여기서 만드는 것은
                <br />
                아직 세상에 없습니다.”
              </h1>

              {/* 줄바꿈은 모두 원고에 적힌 자리에서 그대로 끊는다 */}
              <p className="mt-8 text-lg leading-[1.85] whitespace-pre-line text-navy-100">
                {`소음 속에서도 알아듣고,
스스로 판단하고,
틀리지 않는 에이전트.`}
              </p>

              <p className="mt-5 text-lg leading-[1.85] text-navy-100">
                이걸 함께 만들 분을 기다립니다.
              </p>

              {/* 지원을 망설이는 사람에게 건네는 대목 — 무게를 준다 */}
              <p className="mt-8 text-xl leading-[1.6] font-bold whitespace-pre-line text-white md:text-2xl">
                {`아직 정답이 정해지지 않았습니다.
그래서 당신이 만들 수 있는 것이 많습니다.`}
              </p>

              <p className="mt-5 leading-[1.9] whitespace-pre-line text-navy-300">
                {`정해진 역할을 따라가는 것보다
함께 방향을 만들고,
직접 답을 만들어갈 수 있는 단계입니다.`}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- 우리가 풀고 있는 문제 */

/**
 * 네 꽃잎 다이어그램.
 *
 * 구성 — 정사각 판을 45도 돌리고 그 안에 2x2 그리드를 넣는다. 회전 때문에
 * 왼쪽 위 칸이 위쪽 꽃잎이 되고, 시계방향으로 오른쪽·아래·왼쪽이 된다.
 * 그래서 사업 순서가 시계방향으로 읽히도록 칸 위치를 명시적으로 지정하고,
 * 각 칸에서 가운데를 향하는 모서리만 각지게 남겨 중앙에 X 자 틈을 만든다.
 * 글자는 판이 돌아간 만큼 -45도로 되돌려 똑바로 세운다.
 *
 * 색 — 꽃잎마다 가운데를 향한 모서리에서 시작하는 방사형 그라디언트다.
 * 중심이 밝고 바깥으로 갈수록 어두워져 네 장이 가운데서 만나는 것처럼 보인다.
 *
 * ⚠️ lg 미만에서는 회전을 걸지 않는다. 좁은 화면에서 45도 돌린 판은 글상자가
 *    급격히 좁아져 읽을 수 없다. 대신 한 줄짜리 카드로 쌓는다. 회전·모서리·
 *    정사각 비율이 모두 lg: 접두사로만 붙는 이유다. 마크업은 하나뿐이라
 *    같은 문장이 DOM 에 두 번 들어가지 않는다.
 */

/**
 * 꽃잎에 들어갈 카피.
 *
 * lib/business.ts 의 challenge 는 사업 상세 페이지용 원문이라 길고, 제목도
 * "기술 과제" "적용 범위" 처럼 구역 이름이라 꽃잎에서 읽을 값이 없다.
 * 그래서 채용 페이지 전용 카피를 여기 따로 둔다. 원문을 건드리면 사업 상세
 * 페이지가 함께 바뀌므로 그쪽은 손대지 않는다.
 *
 * title 을 주면 꽃잎 제목이 그 값으로 바뀌고, 없으면 사업명을 그대로 쓴다.
 * lines 는 전부 같은 크기·굵기로 흐른다 — 문장 사이 위계를 두지 않는다.
 *
 * 줄바꿈 — lines 안의 개행은 whitespace-pre-line 으로 그대로 살아난다.
 * 다만 꽃잎 글상자는 210px 남짓이라 한 줄에 한글 16자쯤만 들어간다.
 * 그보다 긴 줄에 개행을 넣으면 그 줄이 또 접히면서 들쭉날쭉해지므로,
 * 짧게 끊을 자신이 있을 때만 개행을 넣는다.
 */
const PETAL_COPY: Record<
  string,
  {
    title?: string;
    lines: string[];
  }
> = {
  nxi: {
    lines: [
      // 이 자리에서 줄을 바꾼다 (두 토막 모두 16자 안쪽이라 다시 접히지 않는다)
      `게임부터 주문·결제까지,
더 빠르고 편리하게`,
      "플럭스랩스는 이 모든 경험을 하나의 AI 에이전트로 연결합니다.",
    ],
  },
  wearable: {
    lines: [
      "제한된 연산 자원 위에서 추론을 최적화하고, 시각과 음성을 함께 해석하며, 배터리 제약 아래 상시 대기하는 구조를 만듭니다.",
    ],
  },
  healthcare: {
    lines: [
      "접수와 진료과 안내부터 예약 변경, 진료비 수납과 증명서 발급, 대기 호출까지 창구에서 벌어지는 일을 대신합니다.",
    ],
  },
  assistant: {
    title: "AI 어시스턴트 서비스",
    lines: [
      `여기서 배운 것이,
나머지 셋을 만듭니다`,
      "매일 실사용자와 만나며 확인한 대화 설계와 실패 패턴이 세 영역으로 흘러갑니다.",
    ],
  },
};

/**
 * 꽃잎에 앉힐 사업 순서 — 시계방향(위 → 오른쪽 → 아래 → 왼쪽).
 * 자리를 바꾸려면 이 배열의 순서만 바꾸면 된다. BUSINESSES 의 순서는
 * 사업영역 메뉴·목록이 함께 쓰므로 건드리지 않는다.
 */
const PETAL_ORDER = ["nxi", "wearable", "assistant", "healthcare"] as const;


/**
 * 네 사업을 2x2 격자로 늘어놓는다.
 *
 * 칸 사이 선은 테두리가 아니라 gap-px 다 — 바깥 <ul> 의 배경(white/10)이
 * 1px 틈으로 비쳐 선이 된다. 칸마다 border 를 주면 맞닿는 자리에서 두 겹이
 * 되어 굵어지고, 어느 칸에 어느 변을 줄지 따지는 일도 없어진다.
 *
 * 칸 색을 조금씩 달리한다. 네 칸이 같은 색이면 격자가 표처럼 납작해진다.
 * 오른쪽 위를 가장 어둡게 두어 대각으로 밝기가 흐르게 했다.
 */
const GRID_TONES = ["bg-ink-800", "bg-ink-950", "bg-ink-800", "bg-ink-700"];

function ProblemGrid() {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
      {PETAL_ORDER.map((slug, index) => {
        const business = BUSINESSES.find((item) => item.slug === slug);
        if (!business) return null;

        const copy = PETAL_COPY[slug];
        return (
          <li
            key={slug}
            className={`p-7 md:p-8 ${GRID_TONES[index] ?? "bg-ink-900"}`}
          >
            <h3 className="text-base font-bold text-white md:text-lg">
              {copy?.title ?? business.name}
            </h3>

            {/* 제목과 본문을 가르는 가는 선 — 레퍼런스의 구성 */}
            <div aria-hidden="true" className="mt-4 h-px w-full bg-white/15" />

            {copy?.lines.map((line) => (
              <p
                key={line}
                className="mt-4 text-sm leading-[1.75] whitespace-pre-line text-navy-300"
              >
                {line}
              </p>
            ))}
          </li>
        );
      })}
    </ul>
  );
}
