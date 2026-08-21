import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BusinessIcon } from "@/components/BusinessIcon";
import { ButtonLink, Arrow } from "@/components/Button";
import { BUSINESSES, getBusiness } from "@/lib/business";
import { SITE } from "@/lib/site";

/**
 * 사업영역 상세 — 기획서 5.3 하위 페이지 공통 구조
 *  1. 페이지 히어로 (사업명 + 한 줄 정의)
 *  2. 문제 정의
 *  3. 접근 방식
 *  4. 기술 과제  ← 채용 타깃 대상 핵심 블록
 *  5. 현재 상태 / 확장 계획
 *  6. 하단 CTA → /contact?type=... 자동 선택
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BUSINESSES.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) return {};

  return {
    title: business.name,
    description: `${business.headline} — ${business.summary}`,
    alternates: { canonical: `/business/${business.slug}` },
    openGraph: {
      title: `${business.name} | ${SITE.shortName}`,
      description: business.headline,
      url: `/business/${business.slug}`,
    },
  };
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) notFound();

  return (
    <>
      {/* 1. 페이지 히어로 */}
      <section className="on-navy bg-ink-950 pt-32 pb-20 text-white md:pt-44 md:pb-28">
        <Container>
          <Reveal>
            <BusinessIcon
              icon={business.icon}
              className="size-12 text-navy-300"
            />
            <h1 className="mt-8 text-3xl font-bold md:text-5xl">
              {business.name}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-[1.7] text-navy-100 md:text-2xl">
              {business.headline}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2. 문제 정의 — 내용이 있을 때만 렌더링 */}
      {business.problem.length > 0 && (
        <Section tone="white" size="lg">
          <Reveal>
            <div className="max-w-3xl">
              <SubHeading>문제 정의</SubHeading>
              {business.problem.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 text-lg leading-[1.9] whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* 3. 접근 방식 */}
      <Section tone="offwhite" size="lg">
        <Reveal>
          <div className="max-w-3xl">
            <SubHeading>접근 방식</SubHeading>
            {business.approach.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 text-lg leading-[1.9] whitespace-pre-line"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {business.capabilities && (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {business.capabilities.map((capability, index) => (
              <Reveal key={capability.term} delay={index * 70}>
                <div className="h-full rounded-xl border border-white/10 bg-ink-900 p-7">
                  <p className="font-bold text-navy-300">{capability.term}</p>
                  <p className="mt-2 leading-[1.8] text-navy-100">
                    {capability.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/*
        4. 기술 과제 — 채용 타깃 대상 핵심 블록 (기획서 5.3 / 4.3 디자인 의도)
        시각적으로 강조해 기술적 깊이를 드러낸다.
      */}
      <Section tone="navy" size="lg">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
              Engineering
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {business.challenge.title}
            </h2>

            {business.challenge.body && (
              <p className="mt-8 text-xl leading-[1.85] text-navy-100">
                {business.challenge.body}
              </p>
            )}
          </div>
        </Reveal>

        {business.challenge.items && (
          <ul className="mt-12 grid gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-3">
            {business.challenge.items.map((item, index) => (
              <Reveal key={item} as="li" delay={index * 80}>
                <div className="h-full bg-ink-950 p-7">
                  <span className="tnum text-sm font-semibold text-navy-300">
                    0{index + 1}
                  </span>
                  <p className="mt-3 leading-[1.8] text-white">{item}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      {/* 5. 현재 상태 / 확장 계획 */}
      <Section tone="white" size="lg">
        <Reveal>
          <div className="max-w-3xl">
            <SubHeading>{business.status.title}</SubHeading>
            {business.status.body.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-lg leading-[1.9]">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/*
          외부 서비스 진입 CTA (기획서 4.6)
          URL 미확보 시 비활성 처리한다 (9.2 B항목).
          disabled 버튼은 키보드 포커스를 받지 않으므로, 왜 비활성인지
          별도 안내 문구를 함께 노출한다.
        */}
        {business.ctas && (
          <Reveal delay={80}>
            <div className="mt-10">
              <div className="flex flex-wrap gap-3">
                {business.ctas.map((cta) =>
                  cta.href ? (
                    <ButtonLink
                      key={cta.label}
                      href={cta.href}
                      variant="secondary"
                      external
                    >
                      {cta.label} <Arrow />
                    </ButtonLink>
                  ) : (
                    <button
                      key={cta.label}
                      type="button"
                      disabled
                      className="inline-flex h-12 items-center gap-2 rounded-md border border-white/20 px-6 font-semibold text-navy-500 opacity-60"
                    >
                      {cta.label} <Arrow />
                    </button>
                  ),
                )}
              </div>

              {business.ctas.some((cta) => !cta.href) && (
                <p className="mt-3 text-sm text-navy-500">
                  채널 주소는 준비 중입니다. 공개되면 이곳에서 바로 연결됩니다.
                </p>
              )}
            </div>
          </Reveal>
        )}

        {/* 신뢰 장치 — 별도 인용 블록으로 강조 (기획서 4.5 디자인 의도) */}
        {business.status.pullQuote && (
          <Reveal delay={120}>
            <blockquote className="mt-12 max-w-3xl border-l-4 border-navy-300 bg-ink-900 py-8 pr-8 pl-8">
              <p className="text-lg leading-[1.9] font-medium text-white md:text-xl">
                {business.status.pullQuote}
              </p>
            </blockquote>
          </Reveal>
        )}
      </Section>

      {/* 6. 하단 CTA — 문의 유형 사전 선택 (기획서 5.3 · 5.5) */}
      <Section tone="offwhite" size="md">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              이 사업에 대해 문의하기
            </h2>
            <p className="mt-4 max-w-xl leading-[1.85] text-navy-100">
              현장 상황을 알려주시면 적용 가능한 범위를 함께 검토하겠습니다.
            </p>
          </div>

          <ButtonLink href={`/contact?type=${business.slug}`} variant="primary">
            문의하기 <Arrow />
          </ButtonLink>
        </div>

        <nav className="mt-16 border-t border-white/15 pt-8" aria-label="다른 사업영역">
          <p className="text-sm font-semibold text-navy-300">다른 사업영역</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {BUSINESSES.filter((item) => item.slug !== business.slug).map(
              (item) => (
                <li key={item.slug}>
                  <Link
                    href={`/business/${item.slug}`}
                    className="font-medium text-white hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </Section>
    </>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold md:text-3xl">{children}</h2>;
}
