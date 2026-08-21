import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
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

/** 찾고 있는 사람 — 직무명 대신 역량 기준으로 서술 (기획서 5.4) */
const CAPABILITIES = [
  {
    title: "에이전트 오케스트레이션",
    desc: "여러 에이전트에 역할을 분배하고, 실패와 예외를 다루는 구조를 설계해 보신 분",
  },
  {
    title: "음성·자연어 처리",
    desc: "잡음이 많은 실제 환경에서 인식·이해 품질을 끌어올려 보신 분",
  },
  {
    title: "임베디드 최적화",
    desc: "제한된 연산·전력 조건에서 모델을 돌려 보신 분",
  },
  {
    title: "기간계 연동",
    desc: "결제·의료정보처럼 되돌릴 수 없는 처리를 안전하게 다뤄 보신 분",
  },
];

export default function CareersPage() {
  return (
    <>
      <Section tone="white" size="lg" className="pt-32 md:pt-40">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
            Careers
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            아직 정답이 없는 문제를 다룹니다
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-navy-100">
            플럭스랩스가 지금 풀고 있는 문제를 그대로 적었습니다. 이 중 하나라도
            흥미롭다면 이야기를 나누고 싶습니다.
          </p>
        </Reveal>
      </Section>

      {/* 인트로 — "우리가 푸는 문제". 이 페이지의 핵심 블록 (기획서 5.4) */}
      <Section tone="navy" size="lg">
        <SectionHeading
          eyebrow="Problems"
          title="우리가 푸는 문제"
          description="네 개 사업이 각각 다른 종류의 어려움을 갖고 있습니다."
        />

        <div className="mt-14 space-y-px overflow-hidden rounded-xl bg-white/10">
          {BUSINESSES.map((business, index) => (
            <Reveal key={business.slug} delay={index * 70}>
              <div className="bg-ink-950 p-8 md:p-10">
                <p className="text-sm font-semibold text-navy-300">
                  {business.name}
                </p>
                <h3 className="mt-3 text-xl font-bold text-white">
                  {business.challenge.title}
                </h3>

                {business.challenge.body && (
                  <p className="mt-4 max-w-3xl leading-[1.85] text-navy-100">
                    {business.challenge.body}
                  </p>
                )}

                {business.challenge.items && (
                  <ul className="mt-4 max-w-3xl space-y-2">
                    {business.challenge.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 leading-[1.8] text-navy-100"
                      >
                        <span aria-hidden="true" className="text-navy-300">
                          ·
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 찾고 있는 사람 — 역량 기준 서술 */}
      <Section tone="white" size="lg">
        <SectionHeading
          eyebrow="People"
          title="찾고 있는 사람"
          description="직무명보다 무엇을 해보셨는지가 중요합니다."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CAPABILITIES.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 70}>
              <div className="h-full rounded-xl border border-white/10 bg-ink-900 p-8">
                <h3 className="text-lg font-bold text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 leading-[1.8] text-navy-100">
                  {capability.desc}
                </p>
              </div>
            </Reveal>
          ))}
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
            <h2 className="text-3xl font-bold md:text-4xl">상시 지원</h2>
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
