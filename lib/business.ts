/**
 * 사업영역 콘텐츠 — 기획서 4장
 *
 * ⚠️ 표기 원칙 (기획서 4.2 / 4.3 / 4.5, 10장, 보안 체크리스트 A-1)
 *  - 협업 상대사의 사명·업종·규모·상장 여부 등 유추 가능한 서술 일절 금지
 *  - 병원 실명·소재 도시·"테스트베드/실증 중" 문구 비노출
 *  - "상급종합병원" 사용 금지 → "종합병원" 으로 통일
 *  - "계열사"·"자회사" 사용 금지 → "관계사"·"협력사"
 * 이 파일을 수정할 때 위 원칙을 반드시 확인할 것.
 */

export type Business = {
  slug: string;
  /** 대외 명칭 — 기획서 4.1 */
  name: string;
  /** 홈 4분할 그리드용 1줄 요약 — 기획서 5.1 S3 */
  summary: string;
  /** 페이지 히어로 한 줄 정의 */
  headline: string;
  /** 아이콘 식별자 — 구분은 색상이 아니라 아이콘 형태로 (기획서 8.2) */
  icon: "retail" | "wearable" | "healthcare" | "assistant";
  /** 식별 컬러: 틴트 4단계 배정 (기획서 8.2) */
  tint: "navy-900" | "navy-800" | "navy-700" | "navy-500";
  /** 사업영역 카드 하단 분류 태그 */
  category: string;
  /**
   * 사업영역 카드용 사진. 아직 확보되지 않아 비워 둔다 — 값이 없으면
   * BusinessIcon 플레이스홀더로 렌더링된다. `public/business/` 에 파일을
   * 넣고 이 필드만 채우면 자동으로 사진이 노출된다.
   */
  image?: { src: string; alt: string };
  /** 문제 정의 — 왜 이게 문제인가 */
  problem: string[];
  /** 접근 방식 — 에이전트가 무엇을 하는가 */
  approach: string[];
  /** 에이전트가 처리하는 것 (있는 사업만) */
  capabilities?: { term: string; desc: string }[];
  /** 기술 과제 — 채용 타깃 대상 핵심 블록 (기획서 5.3) */
  challenge: {
    title: string;
    body?: string;
    items?: string[];
  };
  /** 현재 상태 / 확장 계획 */
  status: {
    title: string;
    body: string[];
    /** 신뢰 장치용 인용 블록 (기획서 4.5 디자인 의도) */
    pullQuote?: string;
  };
  /**
   * 외부 서비스 진입 CTA (기획서 4.6)
   * href 가 없으면 **비활성 상태로 렌더링**한다 — 기획서 9.2 B항목:
   * "텔레그램 봇 / 유튜브 채널 URL 미확보 시 CTA 버튼 비활성 처리"
   */
  ctas?: { label: string; href?: string }[];
};

export const BUSINESSES: Business[] = [
  {
    slug: "nxi",
    name: "AUI 리테일 운영 플랫폼",
    summary: "말하면 주문부터 결제까지, 매장 운영을 대화로",
    headline: "매장 운영을 화면이 아닌 대화로",
    icon: "retail",
    tint: "navy-900",
    category: "리테일",
    image: { src: "/business/nxi.svg", alt: "AUI 리테일 운영 플랫폼" },
    problem: [],
    approach: [
      "매장 운영을 대화로 간편하게 처리하는 AI 시스템입니다.",
      "고객은 AI에게 주문·좌석 연장·결제를 요청할 수 있고,",
      "AI가 이를 이해해 모든 과정을 자동으로 처리합니다.",
      "플럭스랩스의 AUI(Agent User Interface) 기술로 구현됩니다.",
    ],
    capabilities: [
      {
        term: "취향 분석",
        desc: "이용 이력을 학습해 고객별 선호 게임·메뉴·좌석을 파악",
      },
      {
        term: "인게임 어시스트",
        desc: "플레이 상황에 맞춘 정보 제공 및 코칭",
      },
      {
        term: "음성 주문",
        desc: "자연어 대화만으로 메뉴 주문 및 옵션 선택",
      },
      {
        term: "결제 완결",
        desc: "주문부터 정산까지 대화 흐름 안에서 종료",
      },
    ],
    challenge: {
      title: "왜 어려운 문제인가",
      body: "소음이 큰 환경에서의 음성 인식, 게임 중인 사용자의 인지 부하를 방해하지 않는 개입 시점 설계, 결제라는 되돌릴 수 없는 행위를 에이전트에게 위임하기 위한 확인 구조. 저희가 지금 풀고 있는 문제들입니다.",
    },
    status: {
      title: "확장 계획",
      body: [
        "파트너사는 3년 내 1,000개 매장 규모의 네트워크 구축을 목표로 하고 있으며, 플럭스랩스는 해당 네트워크 전체의 운영 플랫폼을 담당합니다.",
      ],
    },
  },
  {
    slug: "wearable",
    name: "웨어러블 온디바이스 에이전트",
    summary: "손이 자유롭지 않은 순간에도 작동하는 지능",
    headline: "손이 자유롭지 않은 순간을 위한 인터페이스",
    icon: "wearable",
    tint: "navy-800",
    category: "웨어러블",
    image: { src: "/business/wearable.svg", alt: "웨어러블 온디바이스 에이전트" },
    problem: [],
    approach: [
      "플럭스랩스는 관계사 아더사이더 주식회사의 스마트글래스에 탑재되는 AI 에이전트 소프트웨어를 개발합니다. 시야에 들어온 상황을 이해하고, 음성으로 지시를 받고, 필요한 작업을 대신 수행합니다.",
    ],
    challenge: {
      title: "기술 과제",
      items: [
        "제한된 연산 자원에서의 온디바이스 추론 최적화",
        "시각 정보와 음성 명령을 함께 해석하는 멀티모달 처리",
        "배터리 제약 아래에서의 상시 대기 구조 설계",
      ],
    },
    status: {
      title: "역할 분담",
      body: [
        "아더사이더는 하드웨어를, 플럭스랩스는 그 안에서 동작하는 지능을 맡습니다.",
      ],
    },
  },
  {
    slug: "healthcare",
    name: "의료기관 프론트오피스 자동화",
    summary: "접수·수납 창구의 병목을 에이전트가 해소",
    headline: "접수·수납 창구에서 줄이 사라지는 방식",
    icon: "healthcare",
    tint: "navy-700",
    category: "헬스케어",
    image: { src: "/business/healthcare.svg", alt: "의료기관 프론트오피스 자동화" },
    problem: [],
    approach: [
      "플럭스랩스는 이 영역을 AI 에이전트 기반으로 자동화하는 SI 프로젝트를 수행합니다. 환자는 창구를 찾아가는 대신 대화로 접수하고, 예약을 바꾸고, 수납을 마칩니다. 병원은 인력을 응대가 꼭 필요한 곳에 재배치할 수 있습니다.",
    ],
    challenge: {
      title: "적용 범위",
      items: [
        "초진·재진 접수 및 진료과 안내",
        "예약 조회·변경·취소",
        "진료비 수납 및 영수증·증명서 발급",
        "대기 현황 안내 및 호출",
      ],
    },
    status: {
      title: "현재 상태",
      body: [
        "다수 진료과를 운영하는 종합병원에 실제 도입되어 운영 중이며, 이를 표준 모델로 전국 의료기관 대상 확대를 준비하고 있습니다.",
      ],
      // 기획서 4.5 디자인 의도 — 이 페이지의 신뢰 장치. 별도 인용 블록으로 강조
      pullQuote:
        "의료 현장은 오류가 허용되지 않는 영역입니다. 저희는 에이전트가 자동으로 처리할 범위와, 반드시 사람이 확인해야 할 범위를 명확히 구분하는 것에서부터 설계를 시작했습니다.",
    },
  },
  {
    slug: "assistant",
    name: "AI 어시스턴트 서비스",
    summary: "이미 쓰는 앱 안에서 바로 시작하는 상담",
    headline: "사람들이 이미 쓰고 있는 곳으로 에이전트가 갑니다",
    icon: "assistant",
    tint: "navy-500",
    category: "AI 어시스턴트",
    image: { src: "/business/assistant.svg", alt: "AI 어시스턴트 서비스" },
    problem: [],
    approach: [
      "유튜브와 텔레그램에서 대화를 통해 궁금한 것을 묻고, 정보를 찾고, 상담을 받을 수 있습니다.",
      "별도 설치나 가입 없이, 쓰던 앱에서 그대로 시작합니다.",
      // 기획서 4.6 확정 — 무료 명시
      "무료로 이용하실 수 있습니다.",
    ],
    challenge: {
      title: "이 서비스가 회사에 갖는 의미",
      body: "실사용자와 매일 접촉하는 채널은 그 자체로 기술의 시험장입니다. 여기서 확인한 대화 설계, 응답 품질, 실패 패턴이 리테일·의료·웨어러블 에이전트에 그대로 반영됩니다.",
    },
    status: {
      title: "이용 안내",
      body: [
        "서비스 이용에 관한 사항은 이용약관을 따릅니다. AI가 생성한 답변은 정확하지 않을 수 있으므로 중요한 판단에 앞서 별도의 확인을 권합니다.",
      ],
    },
    // ⚠️ href 미지정 = 비활성. URL 확보 시 href 를 채우면 활성화된다 (9.2 B항목)
    ctas: [
      { label: "텔레그램에서 시작하기" },
      { label: "유튜브 채널" },
    ],
  },
];

export const getBusiness = (slug: string) =>
  BUSINESSES.find((b) => b.slug === slug);

/**
 * 관계사 카드 — 기획서 4.2
 *
 * ⚠️ 보안 체크리스트 A-1: 로고 슬롯을 `display:none` 으로 두지 않는다.
 *    `logo` 필드가 없으면 아예 렌더링하지 않는다(조건부 렌더링).
 *    파일 경로·alt·주석 어디에도 미표기 대상의 실명을 넣지 말 것.
 */
export type Partner = {
  /** 공개 동의를 받은 곳만 사명을 적는다. 나머지는 null */
  name: string | null;
  field: string;
  work: string;
  /** 공개 동의 확보 시에만 채운다. 그 전까지 undefined → 렌더링 자체를 하지 않음 */
  logo?: { src: string; alt: string; width: number; height: number };
};

export const PARTNERS: Partner[] = [
  {
    name: "아더사이더 주식회사",
    field: "웨어러블 하드웨어",
    work: "스마트글래스 온디바이스 에이전트 공동 개발",
  },
  {
    name: null,
    field: "리테일 네트워크",
    work: "AUI 운영 플랫폼 공급",
  },
  {
    name: null,
    field: "의료 부문",
    work: "종합병원 프론트오피스 자동화",
  },
];
