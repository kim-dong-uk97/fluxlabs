export type TechAxis = {
  key: string;
  /** 원 위에 뜨는 라벨 */
  label: string;
  /** 카드 본문 설명 */
  description: string;
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
      "에이전트가 업무를 분담하고, 사람의 확인이 필요한 순간을 판단합니다.",
    tags: ["멀티 에이전트 오케스트레이션", "역할 분배와 예외 처리"],
    image: {
      src: "/tech/agent1.png",
      alt: "여러 에이전트가 역할을 나누어 협업하는 모습",
    },
  },
  {
    key: "nlp",
    label: "자연스러운 AI 구조",
    description:
      "소음 속에서도 의도를 파악하고 자연스럽게 작업을 완결합니다.",
    tags: ["소음 환경 의도 파악", "대화 흐름 안에서 작업 완결"],
    image: {
      src: "/tech/agent2.png",
      alt: "에이전트와 나누는 자연스러운 대화",
    },
  },
  {
    key: "integration",
    label: "빠르고 안전한 연결",
    description:
      "기존 시스템과 연결되어 필요한 작업을 안전하게 진행합니다.",
    tags: ["되돌릴 수 없는 처리의 안전한 수행", "기존 시스템과의 접속"],
    image: { src: "/tech/agent3.png", alt: "안전하게 연결되는 화면" },
  },
];
