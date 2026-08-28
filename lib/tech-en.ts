import type { TechAxis } from "@/lib/tech";

/** 기술 접근 축 영문판 — lib/tech.ts(한국어 원본)와 key 를 맞춰 쓴다 */
export const TECH_AXES_EN: TechAxis[] = [
  {
    key: "orchestration",
    label: "Agent Orchestration",
    description:
      "Work is split across role-specific agents that handle ordering, payment, and inventory simultaneously.",
    tags: [],
    image: {
      src: "/tech/agent1.png",
      alt: "Multiple agents collaborating, each handling a different role",
    },
  },
  {
    key: "nlp",
    label: "Multimodal Interface",
    description:
      "Accurately reads user intent even in noisy environments and carries out tasks naturally.",
    tags: [],
    image: {
      src: "/tech/agent2.png",
      alt: "A natural conversation with an agent",
    },
  },
  {
    key: "integration",
    label: "System Integration",
    description:
      "Integrates with existing systems to carry out tasks safely and reliably.",
    tags: [],
    image: { src: "/tech/agent3.png", alt: "A safely connected system screen" },
  },
  {
    key: "trusted-action",
    label: "Trusted Action",
    description:
      "Every execution is verified and logged, so the flow and outcome of any task can be reviewed at any time.",
    tags: [],
    image: {
      src: "/tech/agent4-v2.png",
      alt: "A magnifying glass with a checkmark, verifying an execution",
    },
  },
];
