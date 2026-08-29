import { BUSINESSES, type Business } from "@/lib/business";

/**
 * 사업영역 영문 카피 — lib/business.ts(한국어 원본)와 slug 로 짝지어 쓴다.
 *
 * ⚠️ 원본과 동일한 표기 원칙을 따른다 (기획서 4.2 / 4.3 / 4.5, 10장)
 *  - 협업 상대사의 사명·업종·규모·상장 여부 등 유추 가능한 서술 금지
 *  - 병원 실명·소재 도시·"테스트베드/실증 중" 문구 비노출
 *  - "상급종합병원" 금지 → "general hospital"
 *  - "계열사"·"자회사" 금지 → "partner"
 *
 * 텍스트 필드만 담고, 비텍스트 필드(slug·icon·tint·image·heroImage 등)는
 * 원본에서 그대로 가져와 합친다 (getBusinessEn 참조).
 */
type BusinessCopyEn = Pick<
  Business,
  | "name"
  | "summary"
  | "headline"
  | "heroLines"
  | "category"
  | "problem"
  | "approach"
  | "capabilities"
  | "challenge"
  | "status"
  | "ctas"
>;

const COPY_EN: Record<string, BusinessCopyEn> = {
  nxi: {
    name: "AUI Retail Operations Platform",
    summary: "Speak, and everything from ordering to payment is handled",
    headline: "Running a store through conversation, not screens",
    heroLines: [
      "Customers can ask the AI to place an order, extend their seat, or pay,",
      "and the AI understands and handles the entire process automatically.",
      "Built on FLUXLABS AUI (Agent User Interface) technology.",
    ],
    category: "Retail",
    problem: [],
    // 히어로에서 이미 같은 문장을 보여 주므로 본문은 카드로만 설명한다
    approach: [],
    capabilities: [
      {
        icon: "taste",
        term: "Play Preference Analysis",
        desc: "Finds your own game preferences from your play data.",
      },
      {
        icon: "assist",
        term: "AI Play Coach",
        desc: "Understands the game situation and offers the help you need.",
      },
      {
        icon: "voice",
        term: "Voice Ordering",
        desc: "Order a menu item and pick your options with a single spoken request.",
      },
      {
        icon: "payment",
        term: "Easy Payment",
        desc: "From ordering to payment, completed with ease.",
      },
    ],
    challenge: {
      title: "From play to ordering and payment, faster and easier",
      body: [
        // 문단 안 줄바꿈 — whitespace-pre-line 으로 이 위치에서 줄이 바뀐다
        `It is effortless to use, but a high bar of engineering sits behind it.
Speech recognition through noise, choosing the right moment to step in, confirming a payment safely — every one of those requirements has to be met.`,
        "“FLUXLABS connects the whole experience into a single AI agent.”",
      ],
    },
    status: {
      title: "Expansion plan",
      body: [
        // 한 문장의 앞뒤 — 문단을 나누지 않고 이 자리에서 줄만 바꾼다
        `Our partner aims to build a 1,000-store network within three years,
and FLUXLABS is scaling into the operations platform that connects every one of those stores.`,
      ],
    },
  },

  wearable: {
    name: "Wearable On-device Agent",
    summary: "Intelligence that works even when your hands aren't free",
    headline: "An interface for the moments your hands aren't free",
    heroLines: [
      "We build the AI agent software that runs inside smart glasses",
      "It understands what comes into view, takes voice instructions, and carries out the task for you",
    ],
    category: "Wearable",
    problem: [],
    // 문장은 히어로에서 이미 보여 주므로, 접근 방식은 카드로만 설명한다
    approach: [],
    capabilities: [
      {
        icon: "vision",
        term: "Visual understanding",
        desc: "Reads what comes into view and works out what is needed.",
      },
      {
        icon: "voice",
        term: "Voice instruction",
        desc: "Takes instructions by voice, with no hands involved.",
      },
      {
        icon: "act",
        term: "Task execution",
        desc: "Carries out the instructed task on the user's behalf.",
      },
    ],
    challenge: {
      title: "Engineering challenges",
      items: [
        "Optimizing on-device inference under limited compute resources",
        "Multimodal processing that interprets visual context and voice commands together",
        "Designing always-on standby within battery constraints",
      ],
    },
    status: {
      title: "An interface for the moments your hands aren't free",
      body: [
        "Smart glasses have small screens and limited input. More than that, users often do not have both hands free even while they are wearing them.",
        "In that setting an AUI — usable just by looking and speaking — fits better than a GUI that has to be operated by hand.",
        "FLUXLABS builds the AI agent software for Othersider's smart glasses. It understands what has come into the user's view, takes instructions by voice, and carries out the task on their behalf.",
      ],
    },
  },

  healthcare: {
    name: "Healthcare Front-office Automation",
    summary: "Agents clear the bottleneck at reception and payment counters",
    headline: "How the queue disappears at reception and payment counters",
    category: "Healthcare",
    problem: [],
    // 이 문단은 3번 섹션(현재 상태)으로 내렸다 — 접근 방식은 타일로만 설명한다
    approach: [],
    capabilities: [
      {
        icon: "register",
        term: "Registration & guidance",
        desc: "Handles first-visit and follow-up registration and department guidance through conversation.",
      },
      {
        icon: "calendar",
        term: "Appointments",
        desc: "Looks up appointments, and changes or cancels them.",
      },
      {
        icon: "receipt",
        term: "Payment & documents",
        desc: "Takes payment and issues receipts and certificates.",
      },
      {
        icon: "queue",
        term: "Queue guidance",
        desc: "Announces the queue and calls patients when their turn comes.",
      },
    ],
    challenge: {
      title: "Scope of application",
      items: [
        "First-visit and follow-up registration, and department guidance",
        "Appointment lookup, change, and cancellation",
        "Payment of medical fees, and issuing receipts and certificates",
        "Wait-status updates and patient calling",
      ],
    },
    status: {
      title: "Current status",
      body: [
        "FLUXLABS runs SI projects that automate this area with AI agents. Instead of walking up to a counter, patients check in, change appointments, and complete payment through conversation. Hospitals can redeploy staff to where face-to-face support is genuinely needed.",
        "Already deployed and running at a general hospital operating multiple departments, and we are preparing to expand nationwide using it as the standard model.",
      ],
      pullQuote:
        "“Healthcare is a domain where errors are not permitted. We began the design by drawing a clear line between what an agent may handle automatically and what a person must always confirm.”",
    },
  },

  assistant: {
    name: "AI Assistant Service",
    summary: "Start a conversation right inside the apps you already use",
    headline: "The agent goes to where people already are",
    category: "AI Assistant",
    problem: [],
    approach: [
      "Ask questions, find information, and get guidance through conversation on YouTube and Telegram.",
      "No install or sign-up needed — start right in the app you already use.",
      "Free to use.",
    ],
    challenge: {
      title: "What this service means for us",
      body: [
        "A channel that touches real users every day is itself a proving ground for the technology. The conversation design, response quality, and failure patterns we confirm here feed directly back into our retail, healthcare, and wearable agents.",
      ],
    },
    status: {
      title: "Usage notice",
      body: [
        "Use of the service is governed by our Terms of Service. AI-generated answers may not be accurate, so we recommend verifying independently before making important decisions.",
      ],
    },
    // ⚠️ href 미지정 = 비활성. 원본과 동일하게 URL 확보 시 채운다 (9.2 B항목)
    ctas: [{ label: "Start on Telegram" }, { label: "YouTube channel" }],
  },
};

/** 영문 사업영역 — 비텍스트 필드는 원본에서, 텍스트는 COPY_EN 에서 가져와 합친다 */
export const BUSINESSES_EN: Business[] = BUSINESSES.map((business) => {
  const copy = COPY_EN[business.slug];
  if (!copy) return business;

  /*
    얕은 병합이라 challenge·status 를 통째로 갈아 끼우게 된다. 두 곳 안에 든
    image 는 텍스트가 아니라 원본에만 있는 값이므로, 여기서 다시 이어 준다.
    (이 처리가 없으면 영문 페이지에서만 사진이 사라진다)
  */
  return {
    ...business,
    ...copy,
    challenge: {
      ...copy.challenge,
      image: business.challenge.image,
      itemIcons: business.challenge.itemIcons,
    },
    status: {
      ...copy.status,
      eyebrow: business.status.eyebrow,
      titleAsHeadline: business.status.titleAsHeadline,
      image: business.status.image,
      imageAsStage: business.status.imageAsStage,
    },
  };
});

export const getBusinessEn = (slug: string) =>
  BUSINESSES_EN.find((business) => business.slug === slug);
