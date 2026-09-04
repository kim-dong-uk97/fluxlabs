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

/**
 * 카드·타일 아이콘 식별자 — components/CapabilityIcon 한 곳에서 그린다.
 * 접근 방식 타일과 기술 과제 카드가 같은 세트를 쓰므로 이름을 나누지 않는다.
 */
export type CapabilityIconName =
  | "taste"
  | "assist"
  | "voice"
  | "payment"
  | "vision"
  | "act"
  | "chip"
  | "multimodal"
  | "battery"
  | "register"
  | "calendar"
  | "receipt"
  | "queue";

/** 기술 과제 카드도 같은 세트를 쓴다 (이름만 따로 부른다) */
export type ChallengeIconName = CapabilityIconName;

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
  /**
   * 상세 페이지 히어로 우측에 놓는 사진. 없으면 히어로는 텍스트만 렌더링한다.
   * 배경이 어두운(검정 계열) 이미지를 전제로 좌우 분할 레이아웃을 쓴다.
   */
  heroImage?: { src: string; alt: string };
  /**
   * 히어로 우측에 발광 오브(components/AuiOrb)를 놓는다. 배경은 검정 단색이며
   * 왼쪽 텍스트 · 오른쪽 오브의 좌우 분할이 된다. 사진을 쓰는 heroImage 와는
   * 배타적이고, 이 값이 있으면 아이콘은 렌더링하지 않는다.
   */
  heroOrb?: boolean;
  /**
   * heroOrb 자리에 오브(영상) 대신 놓을 사진. 자리·크기는 오브와 같고
   * 가장자리를 녹여 검정 바탕에 잇는다 (components/HeroPhoto).
   */
  heroPhoto?: { src: string; alt: string };
  /**
   * 네온 히어로. 제목을 보라 → 파랑 → 민트 그라디언트로 칠하고
   * (.hero-title-gradient), 사진 뒤에 민트·보라 두 색 후광을 깐다.
   * 바탕은 다른 사업과 같은 검정 그대로다.
   */
  heroNeon?: boolean;
  /**
   * 히어로 제목 아래 문구. 한 줄씩 끊어 쓴다. 없으면 headline 을 그대로 쓴다.
   * headline 은 메타 설명·OG 에도 나가는 값이라, 히어로에서만 다르게 보여
   * 주고 싶을 때 이 값을 둔다.
   */
  heroLines?: string[];
  /** 문제 정의 — 왜 이게 문제인가 */
  problem: string[];
  /** 접근 방식 — 에이전트가 무엇을 하는가 */
  approach: string[];
  /** 에이전트가 처리하는 것 (있는 사업만) */
  capabilities?: { term: string; desc: string; icon: CapabilityIconName }[];
  /**
   * capabilities 를 어떤 카드로 보여 줄지.
   *  · row  (기본) : 가로 카드 — 왼쪽 원형 배지 + 오른쪽 제목·설명
   *  · tile        : 가운데 정렬 타일 — 위 아이콘 · 아래 제목·설명
   */
  capabilityLayout?: "row" | "tile";
  /**
   * 상세 페이지에서 기술 과제 섹션을 렌더링하지 않는다. 접근 방식 카드가
   * 이미 그 자리를 대신하는 사업에 쓴다. 데이터 자체는 남겨 둔다 —
   * /careers 의 "우리가 풀고 있는 문제" 목록이 네 사업 모두를 읽어 간다.
   */
  hideChallengeSection?: boolean;
  /** 기술 과제 — 채용 타깃 대상 핵심 블록 (기획서 5.3) */
  challenge: {
    title: string;
    /** 문단 단위. 문단 안 줄바꿈은 
 (whitespace-pre-line 으로 렌더링) */
    body?: string[];
    items?: string[];
    /**
     * items 와 같은 순서로 짝지어지는 아이콘. 아이콘 이름은 번역 대상이 아니라
     * 영문 카피(lib/business-en.ts)에 두지 않고 여기에만 둔다. 없으면 카드는
     * 아이콘 없이 번호만 크게 보여 준다.
     */
    itemIcons?: ChallengeIconName[];
    /** 있으면 본문 오른쪽에 나란히 놓인다 */
    image?: { src: string; alt: string };
  };
  /** 현재 상태 / 확장 계획 */
  status: {
    title: string;
    body: string[];
    /**
     * 제목 위에 놓는 영문 눈썹말. 기술 과제 섹션과 같은 스타일이다.
     * 영문판에서도 같은 단어를 쓰므로 번역 대상이 아니다.
     */
    eyebrow?: string;
    /**
     * 제목이 "확장 계획" 같은 라벨이 아니라 한 문장짜리 헤드라인일 때 켠다.
     * 기술 과제 제목과 같은 크기로 올라간다 — 라벨 크기로는 문장이 눌린다.
     */
    titleAsHeadline?: boolean;
    /** 있으면 본문 오른쪽에 나란히 놓인다 (가장자리를 녹여 바탕에 잇는다) */
    image?: { src: string; alt: string };
    /**
     * image 를 옆에 세우지 않고 기술 과제 섹션(AUI)과 같은 배경 무대로 깐다.
     * 글은 왼쪽에 남고 사진이 그 뒤 오른쪽에서 크게 번진다.
     */
    imageAsStage?: boolean;
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
    image: { src: "/business/new-healthcare.png", alt: "AUI 리테일 운영 플랫폼" },
    heroOrb: true,
    heroLines: [
      "고객은 AI에게 주문·좌석 연장·결제를 요청할 수 있고,",
      "AI가 이를 이해해 모든 과정을 자동으로 처리합니다.",
      "플럭스랩스의 AUI(Agent User Interface) 기술로 구현됩니다.",
    ],
    problem: [],
    // 히어로에서 이미 같은 문장을 보여 주므로 본문은 카드로만 설명한다
    approach: [],
    capabilityLayout: "tile",
    capabilities: [
      {
        icon: "taste",
        term: "플레이 취향 분석",
        desc: "플레이 데이터를 바탕으로 나만의 게임 취향을 찾습니다.",
      },
      {
        icon: "assist",
        term: "AI 플레이 코치",
        desc: "게임 상황을 이해하고 필요한 도움을 제공합니다.",
      },
      {
        icon: "voice",
        term: "음성주문",
        desc: "말 한마디로 메뉴를 주문하고 옵션을 선택합니다.",
      },
      {
        icon: "payment",
        term: "간편결제",
        desc: "주문부터 결제까지 편리하게 완료합니다.",
      },
    ],
    challenge: {
      title: "게임부터 주문·결제까지, 더 빠르고 편리하게",
      body: [
        // 문단 안 줄바꿈 — whitespace-pre-line 으로 이 위치에서 줄이 바뀐다
        `사용자는 간편하게 이용하지만, 그 뒤에는 높은 수준의 기술이 필요합니다.
소음 속 음성 인식부터 적절한 개입 시점, 안전한 결제 확인까지
복잡한 기술적 요건을 충족해야 합니다.`,
        "“플럭스랩스는 이 모든 경험을 하나의 AI 에이전트로 연결합니다.”",
      ],
      image: {
        src: "/business/nxi-engineering.jpg",
        alt: "빛나는 관문 앞에 선 인물",
      },
    },
    status: {
      title: "확장 계획",
      body: [
        // 한 문장의 앞뒤 — 문단을 나누지 않고 이 자리에서 줄만 바꾼다
        `파트너사는 3년 내 1,000개 매장 네트워크 구축을 목표로 하며,
플럭스랩스는 전체 매장을 연결하는 운영 플랫폼으로 확장합니다.`,
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
    image: { src: "/business/new-wearable.png", alt: "웨어러블 온디바이스 에이전트" },
    heroOrb: true,
    heroNeon: true,
    heroPhoto: {
      src: "/business/wearable-glasses-v2.png",
      alt: "스마트글래스를 착용한 형상",
    },
    heroLines: [
      "스마트 글래스에 탑재되는 AI 에이전트 소프트웨어를 개발합니다",
      "시야에 들어온 상황을 이해하고, 음성으로 지시받고 필요한 작업을 대신 수행합니다",
    ],
    problem: [],
    // 문장은 히어로에서 이미 보여 주므로, 접근 방식은 카드로만 설명한다
    approach: [],
    capabilityLayout: "tile",
    hideChallengeSection: true,
    capabilities: [
      {
        icon: "vision",
        term: "시야 이해",
        desc: "시야에 들어온 장면을 읽어 지금 무엇이 필요한지 파악합니다.",
      },
      {
        icon: "voice",
        term: "음성 지시",
        desc: "손을 쓰지 않고 말로 지시를 전달합니다.",
      },
      {
        icon: "act",
        term: "작업 수행",
        desc: "지시받은 작업을 사용자를 대신해 처리합니다.",
      },
    ],
    challenge: {
      title: "기술 과제",
      items: [
        "제한된 연산 자원에서의 온디바이스 추론 최적화",
        "시각 정보와 음성 명령을 함께 해석하는 멀티모달 처리",
        "배터리 제약 아래에서의 상시 대기 구조 설계",
      ],
      itemIcons: ["chip", "multimodal", "battery"],
    },
    status: {
      title: "손이 자유롭지 않은 순간을 위한 인터페이스",
      eyebrow: "Engineering",
      titleAsHeadline: true,
      body: [
        // 강제 줄바꿈 없이 폭에 맞춰 흐른다 (배열 한 칸이 한 문단)
        "스마트글래스는 화면이 작고, 입력 수단도 제한적입니다. 무엇보다 사용자는 스마트글래스를 사용하는 순간에도 두 손이 자유롭지 않은 경우가 많습니다.",
        // "AUI가 더" 부터 다음 줄로 넘긴다 (whitespace-pre-line)
        `이런 환경에서는 화면을 직접 조작하는 GUI보다, 보고 말하는 것만으로 사용할 수 있는
AUI가 더 적합합니다.`,
        "플럭스랩스는 아더사이더의 스마트글래스를 위한 AI 에이전트 소프트웨어를 개발합니다. 사용자의 시야에 들어온 상황을 이해하고, 음성으로 지시를 받아 필요한 작업을 대신 수행합니다.",
      ],
      image: {
        src: "/business/wearable-role-v3.png",
        alt: "시야에 겹쳐진 정보를 읽어 들이는 눈",
      },
      imageAsStage: true,
    },
  },
  {
    slug: "healthcare",
    name: "의료기관 프론트오피스 자동화",
    summary: "접수·수납 창구의 병목을 에이전트가 해소",
    headline: "접수·수납 창구에서 줄이 사라지는 방식",
    heroLines: [
      "접수·수납 창구에서 줄이 사라지는 방식",
      "플럭스랩스는 이 영역을 AI 에이전트 기반으로 자동화하는 SI 프로젝트를 수행합니다.",
      "환자는 창구를 찾아가는 대신 대화로 접수하고, 예약을 바꾸고, 수납을 마칩니다. 병원은 인력을 응대가 꼭 필요한 곳에 재배치할 수 있습니다.",
    ],
    icon: "healthcare",
    tint: "navy-700",
    category: "헬스케어",
    image: {
      src: "/business/new-unknown.png",
      alt: "의료기관 프론트오피스 자동화",
    },
    heroOrb: true,
    heroPhoto: {
      src: "/business/healthcare-hero.png",
      alt: "의료기관 프론트오피스 자동화",
    },
    problem: [],
    // 이 문단은 3번 섹션(현재 상태)으로 내렸다 — 접근 방식은 타일로만 설명한다
    approach: [],
    capabilityLayout: "tile",
    hideChallengeSection: true,
    capabilities: [
      {
        icon: "register",
        term: "접수·안내",
        desc: "초진·재진 접수와 진료과 안내를 대화로 처리합니다.",
      },
      {
        icon: "calendar",
        term: "예약 관리",
        desc: "예약을 조회하고, 변경하거나 취소합니다.",
      },
      {
        icon: "receipt",
        term: "수납·발급",
        desc: "진료비를 수납하고 영수증·증명서를 발급합니다.",
      },
      {
        icon: "queue",
        term: "대기 안내",
        desc: "대기 현황을 알리고 순서가 되면 호출합니다.",
      },
    ],
    challenge: {
      title: "적용 범위",
      items: [
        "초진·재진 접수 및 진료과 안내",
        "예약 조회·변경·취소",
        "진료비 수납 및 영수증·증명서 발급",
        "대기 현황 안내 및 호출",
      ],
      itemIcons: ["register", "calendar", "receipt", "queue"],
    },
    status: {
      title: "현재 상태",
      eyebrow: "Engineering",
      /*
        사진이 들어오면 웨어러블과 같은 배경 무대로 전환된다.
        image 가 채워지기 전까지는 글만 있는 한 칸으로 렌더링된다.
      */
      imageAsStage: true,
      image: {
        src: "/business/healthcare-status.png",
        alt: "의료기관 프론트오피스 자동화",
      },
      body: [
        "플럭스랩스는 이 영역을 AI 에이전트 기반으로 자동화하는 SI 프로젝트를 수행합니다. 환자는 창구를 찾아가는 대신 대화로 접수하고, 예약을 바꾸고, 수납을 마칩니다. 병원은 인력을 응대가 꼭 필요한 곳에 재배치할 수 있습니다.",
        "다수 진료과를 운영하는 종합병원에 실제 도입되어 운영 중이며, 이를 표준 모델로 전국 의료기관 대상 확대를 준비하고 있습니다.",
      ],
      // 기획서 4.5 디자인 의도 — 이 페이지의 신뢰 장치. 별도 인용 블록으로 강조
      pullQuote:
        "“의료 현장은 오류가 허용되지 않는 영역입니다. 저희는 에이전트가 자동으로 처리할 범위와, 반드시 사람이 확인해야 할 범위를 명확히 구분하는 것에서부터 설계를 시작했습니다.”",
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
    heroOrb: true,
    problem: [],
    approach: [
      "유튜브와 텔레그램에서 대화를 통해 궁금한 것을 묻고, 정보를 찾고, 상담을 받을 수 있습니다.",
      "별도 설치나 가입 없이, 쓰던 앱에서 그대로 시작합니다.",
      // 기획서 4.6 확정 — 무료 명시
      "무료로 이용하실 수 있습니다.",
    ],
    challenge: {
      title: "이 서비스가 회사에 갖는 의미",
      body: [
        "실사용자와 매일 접촉하는 채널은 그 자체로 기술의 시험장입니다. 여기서 확인한 대화 설계, 응답 품질, 실패 패턴이 리테일·의료·웨어러블 에이전트에 그대로 반영됩니다.",
      ],
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
