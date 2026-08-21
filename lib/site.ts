/**
 * 회사 정보 단일 출처 (Single Source of Truth)
 * 근거: 기획서 3.2 Footer · 5.2 회사 개요 표 (등기·사업자등록증 기준 확정값)
 *
 * 이 파일의 값은 등기부·사업자등록증과 일치해야 한다. 임의 수정 금지.
 */

export const SITE = {
  name: "플럭스랩스 주식회사",
  nameEn: "FLUX LABS Co., Ltd.",
  shortName: "플럭스랩스",
  url: "https://fluxlabs.co.kr",
  domain: "fluxlabs.co.kr",

  // 기획서 2.2 — A안을 메인 태그라인, B안을 서브 카피로 병기
  tagline: "사람이 적응하는 기술에서, 사람을 이해하는 기술로",
  taglineSub: "사람의 의도를 이해하는 가장 자연스러운 인터랙션",

  description:
    "플럭스랩스는 리테일·의료·웨어러블 현장의 운영 구조를 AI 에이전트로 다시 설계합니다.",

  // 등기·사업자등록증 기준 확정값 (기획서 5.2)
  established: "2015년 2월 26일",
  ceo: "김정욱",
  businessNumber: "228-86-00029",
  address: "서울특별시 마포구 동교로12길 38, 5층 (서교동, JH빌딩)",
  addressRegion: "서울특별시",
  addressLocality: "마포구",
  postalCode: "04030",
  tel: "02-512-0001",
  email: "info@fluxlabs.co.kr",

  // 기획서 9.1 #12 — 개인정보 보호책임자
  privacyOfficer: {
    name: "이영광",
    title: "개발총괄이사",
    tel: "02-512-0001",
    email: "info@fluxlabs.co.kr",
  },

  // 기획서 9.1 #14 — 개인정보처리방침·이용약관 시행일
  policyEffectiveDate: "2026년 8월 31일",
  policyNoticeDate: "2026년 8월 24일",

  businessScope:
    "AI 에이전트 소프트웨어 개발, 시스템 통합(SI), 데이터 처리·분석, 플랫폼 운영",
} as const;

/**
 * 법인등록번호(110111-5650828)는 홈페이지 필수 기재사항이 아니므로
 * 의도적으로 이 파일에 포함하지 않는다. — 기획서 3.2 개발 참고
 */

/** GNB 구성 — 기획서 3.1 (오픈 시점) */
export const NAV = [
  { label: "회사소개", href: "/about" },
  {
    label: "사업영역",
    href: "/business",
    children: [
      { label: "AUI 리테일 운영 플랫폼", href: "/business/nxi" },
      { label: "웨어러블 온디바이스 에이전트", href: "/business/wearable" },
      { label: "의료기관 프론트오피스 자동화", href: "/business/healthcare" },
      { label: "AI 어시스턴트 서비스", href: "/business/assistant" },
    ],
  },
  { label: "관계사", href: "/partners" },
  { label: "인재영입", href: "/careers" },
] as const;

/**
 * 문의 유형 — 기획서 5.5 폼 필드 정의
 * value 는 `?type=` 쿼리스트링으로 사전 선택에 쓰인다.
 */
export const INQUIRY_TYPES = [
  { value: "nxi", label: "AUI 리테일" },
  { value: "wearable", label: "웨어러블" },
  { value: "healthcare", label: "의료 SI" },
  { value: "assistant", label: "AI 어시스턴트" },
  { value: "careers", label: "채용" },
  { value: "partnership", label: "제휴" },
  { value: "etc", label: "기타" },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["value"];
