export type TechAxis = {
  key: string;
  /** 원 위에 뜨는 라벨 */
  label: string;
  /** 카드 본문 설명 — 없으면 라벨만 노출된다 */
  description?: string;
  /** 태그 클라우드에 노출되는 짧은 역량 문구 */
  tags: string[];
  /** 사진 — 확보되면 홀로그램 플레이스홀더 대신 렌더링된다 */
  image?: { src: string; alt: string };
  /** 사진 크기를 개별 조정하고 싶을 때 (기본: 카드 꽉 채움) */
  imageClassName?: string;
};

/** 기술 접근 축 — 홈 · 사업영역 페이지에서 공용으로 쓴다 */
export const TECH_AXES: TechAxis[] = [
  {
    key: "orchestration",
    label: "에이전트 오케스트레이션",
    description:
      "업무를 역할별 에이전트에 분담하고, 주문·결제·재고 업무를 동시에 처리합니다.",
    tags: ["멀티 에이전트 오케스트레이션", "역할 분배와 예외 처리"],
    image: {
      src: "/tech/agent1.png",
      alt: "여러 에이전트가 역할을 나누어 협업하는 모습",
    },
  },
  {
    key: "nlp",
    label: "멀티모달 인터페이스",
    description:
      "소음 속에서도 사용자의 의도를 정확히 파악하고 자연스럽게 작업을 수행합니다.",
    tags: ["소음 환경 의도 파악", "대화 흐름 안에서 작업 완결"],
    image: {
      src: "/tech/agent2.png",
      alt: "에이전트와 나누는 자연스러운 대화",
    },
  },
  {
    key: "integration",
    label: "시스템 인테그레이션",
    description:
      "기존 시스템과 연동해 필요한 작업을 안전하고 안정적으로 수행합니다.",
    tags: ["되돌릴 수 없는 처리의 안전한 수행", "기존 시스템과의 접속"],
    image: { src: "/tech/agent3.png", alt: "안전하게 연결되는 화면" },
  },
  {
    key: "trusted-action",
    label: "트러스티드 액션",
    description:
      "실행 과정을 검증하고 기록해, 언제든 작업의 흐름과 결과를 확인할 수 있습니다.",
    tags: [],
    image: {
      src: "/tech/agent4-v2.png",
      alt: "돋보기와 체크 표시로 검증되는 실행 과정",
    },
  },
];
