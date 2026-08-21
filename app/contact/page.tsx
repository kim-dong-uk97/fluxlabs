import { Suspense } from "react";
import type { Metadata } from "next";
import { Section, Container } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { CopyButton } from "@/components/CopyButton";
import { SITE } from "@/lib/site";

/**
 * 문의 — 기획서 5.5
 *  좌측: 문의 폼 / 우측: 연락처 정보 + 지도 + 문의 유형별 안내
 */

export const metadata: Metadata = {
  title: "문의",
  description: `${SITE.name}에 사업 제휴, 도입 검토, 채용 등 문의를 남겨주세요. ${SITE.email}`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `문의 | ${SITE.shortName}`,
    description: "현장의 문제를 알려주세요. 검토 후 담당자가 회신드립니다.",
    url: "/contact",
  },
};

const GUIDES = [
  {
    title: "사업 도입 검토",
    desc: "리테일·의료·웨어러블 중 해당 영역을 선택해 주시면 담당자가 연결됩니다.",
  },
  {
    title: "기술 제휴 · 공급",
    desc: "제휴 유형으로 보내주세요. 협력 형태를 함께 검토합니다.",
  },
  {
    title: "채용 지원",
    desc: `이력서는 ${SITE.email} 로 보내주시면 더 빠릅니다.`,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section tone="white" size="md" className="pt-32 md:pt-40">
        <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">문의</h1>
        <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-navy-100">
          어떤 업무가 병목인지 듣는 것에서 시작합니다. 남겨주신 내용을 검토한 뒤
          담당자가 회신드립니다.
        </p>
      </Section>

      <section className="bg-ink-950 pb-24 text-paper md:pb-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            {/* 좌측 — 문의 폼 */}
            <div>
              {/* useSearchParams 사용 컴포넌트는 Suspense 경계가 필요하다 */}
              <Suspense fallback={<FormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>

            {/* 우측 — 연락처 + 안내 */}
            <aside className="space-y-10">
              <div className="rounded-xl border border-white/10 bg-ink-900 p-8">
                <h2 className="text-lg font-bold text-white">연락처</h2>

                <dl className="mt-5 space-y-4 text-navy-100">
                  <div>
                    <dt className="text-sm font-semibold">이메일</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${SITE.email}`}
                        className="text-white hover:underline"
                      >
                        {SITE.email}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-semibold">대표전화</dt>
                    <dd className="tnum mt-1">
                      <a
                        href={`tel:${SITE.tel.replaceAll("-", "")}`}
                        className="text-white hover:underline"
                      >
                        {SITE.tel}
                      </a>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-semibold">주소</dt>
                    <dd className="mt-1 leading-[1.75] text-white">
                      {SITE.address}
                    </dd>
                    <dd className="mt-3">
                      <CopyButton value={SITE.address} />
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  문의 유형별 안내
                </h2>
                <dl className="mt-5 divide-y divide-white/10 border-t border-white/10">
                  {GUIDES.map((guide) => (
                    <div key={guide.title} className="py-4">
                      <dt className="font-semibold text-white">
                        {guide.title}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-[1.8] text-navy-100">
                        {guide.desc}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="text-sm leading-[1.8] text-navy-300">
                개인정보 보호책임자 {SITE.privacyOfficer.name}{" "}
                {SITE.privacyOfficer.title} · {SITE.privacyOfficer.email}
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="space-y-2">
          <div className="h-5 w-24 rounded bg-ink-800" />
          <div className="h-12 rounded-lg bg-ink-900" />
        </div>
      ))}
      <div className="h-40 rounded-lg bg-ink-900" />
    </div>
  );
}
