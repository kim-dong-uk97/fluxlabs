/**
 * 회사소개 영문 카피 — lib/ceo-message.ts(한국어 원본)의 영어판.
 *
 * ⚠️ 원본과 동일한 표기 원칙을 따른다 (기획서 9.1 #9)
 *    구 사명("플럭스투자자문")은 표기하지 않는다.
 *    "(formerly a financial investment advisory business)" 로만 서술한다.
 *
 * 줄바꿈(\n)은 원고의 의도된 호흡이므로 원본과 같은 자리에 유지한다.
 */

export const CEO_MESSAGE_EN = {
  heading: "We make the screen disappear.",

  paragraphs: [
    "Searching, tapping, waiting.\nWe remove the time that lives in between.",

    "To be precise, it isn't the screen we remove.\nIt's the time people used to spend in front of it.",

    "At store counters, at hospital reception desks, beyond a pair of glasses,\nwe are already proving it.",

    "For someone whose hands are full, even using software\nbecomes one more task.",

    // 이 문단의 `30 seconds`, `a minute` 두 수치만 미세 강조한다 (5.2)
    "30 seconds to find a menu, a minute to type in a value.\nOn site, that time is not simply time.\nSomeone has to wait, and someone's work piles up.",

    "So instead of making people learn software,\nwe make software understand people.",

    "A good tool does not announce its presence.\nWhen what we built becomes invisible,\nthat is when we consider it properly made.",
  ],

  signature: "Jeongwook Kim",
  signatureTitle: "CEO",

  /** 미세 강조 대상. 이 두 개 외에는 강조하지 않는다 */
  emphasis: ["30 seconds", "a minute"],
} as const;

/** 연혁 영문판 — 원본과 같은 순서·같은 항목 수를 유지한다 */
export const HISTORY_EN = [
  {
    year: "2015",
    text: "Company founded · formerly a financial investment advisory business",
  },
  { year: "2021", text: "Head office relocated (Yeongdong-daero, Gangnam-gu)" },
  {
    year: "2026.03",
    text: "Renamed to FLUXLABS and pivoted to the AI business",
  },
  {
    year: "2026.04",
    text: "Head office relocated (Seogyo-dong, Mapo-gu); AI R&D, SI, and data processing added to the business purpose",
  },
  {
    year: "2026",
    text: "Began development of the AUI Retail Operations Platform and launched the healthcare front-office automation project",
  },
] as const;

/** 회사 개요 라벨 영문판 — 값은 lib/site.ts 에서 그대로 가져온다 */
export const OVERVIEW_LABELS_EN = {
  name: "Company",
  established: "Founded",
  ceo: "CEO",
  address: "Address",
  tel: "Phone",
  businessScope: "Business areas",
} as const;

/** 영문으로 표기해야 하는 개요 값 — 원본이 한국어인 항목만 옮겨 적는다 */
export const OVERVIEW_VALUES_EN = {
  established: "February 26, 2015",
  ceo: "Jeongwook Kim",
  address: "5F, 38 Donggyo-ro 12-gil, Mapo-gu, Seoul, Republic of Korea",
  businessScope:
    "AI agent software development, system integration (SI), data processing & analytics, platform operations",
} as const;

/** 오시는 길 안내 영문판 */
export const LOCATION_EN = {
  subway: "Subway",
  subwayValue:
    "8 min walk from Hongik Univ. Station (Line 2) · 10 min walk from Sangsu Station (Line 6)",
  tel: "Phone",
} as const;
