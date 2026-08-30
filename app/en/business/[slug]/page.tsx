import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BusinessIcon } from "@/components/BusinessIcon";
import { AuiOrb } from "@/components/AuiOrb";
import { HeroPhoto } from "@/components/HeroPhoto";
import { CapabilityCards } from "@/components/CapabilityCards";
import { CapabilityTiles } from "@/components/CapabilityTiles";
import { ChallengeCards } from "@/components/ChallengeCards";
import { ButtonLink, Arrow } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { BUSINESSES_EN, getBusinessEn } from "@/lib/business-en";
import { SITE } from "@/lib/site";

/**
 * 사업영역 상세 영문판 — app/business/[slug]/page.tsx 와 같은 구조.
 * 콘텐츠만 lib/business-en.ts 에서 가져오고, 내부 링크는 /en/... 로 건다.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BUSINESSES_EN.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessEn(slug);

  if (!business) return {};

  return {
    title: business.name,
    description: `${business.headline} — ${business.summary}`,
    alternates: {
      canonical: `/en/business/${business.slug}`,
      languages: {
        ko: `/business/${business.slug}`,
        en: `/en/business/${business.slug}`,
      },
    },
    openGraph: {
      locale: "en_US",
      title: `${business.name} | ${SITE.shortName}`,
      description: business.headline,
      url: `/en/business/${business.slug}`,
    },
  };
}

export default async function BusinessDetailPageEn({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const business = getBusinessEn(slug);

  if (!business) notFound();

  /*
    배경 사진 무대 — 사진을 섹션 안에 두면 그 섹션 밖으로 못 나가므로,
    두 섹션을 묶은 바깥 층이 사진을 든다 (.chal-art).
    기술 과제가 사진을 갖는 사업(AUI)과, 확장 계획 자리에서 같은 연출을 쓰는
    사업(웨어러블)이 이 무대를 공유한다.
  */
  const statusOnStage = Boolean(
    business.status.imageAsStage && business.status.image,
  );
  const stageImage = business.challenge.image ?? (statusOnStage ? business.status.image : undefined);

  return (
    <>
      {/*
        1. 페이지 히어로 — 세 가지 형태
         · heroOrb    : 검정 바탕 · 좌우 분할 (왼쪽 텍스트 · 오른쪽 오브 또는 사진)
         · heroImage  : 좌우 분할 (왼쪽 텍스트 · 오른쪽 사진)
         · 둘 다 없음 : 아이콘 + 왼쪽 정렬 텍스트
      */}
      {business.heroOrb ? (
        <section
          className={`on-navy relative flex min-h-[560px] items-center overflow-hidden bg-black pt-20 pb-12 text-white md:min-h-[72vh] md:pt-36 md:pb-24 ${
            business.heroNeon ? "hero-neon" : ""
          }`}
        >
          <Container className="relative">
            {/* 좁은 화면에서는 텍스트 아래로 오브가 내려와 세로로 쌓인다 */}
            <div className="grid items-center gap-14 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-16">
              {/* 제목이 먼저 올라오고 아래 줄이 차례로 따라 올라온다 */}
              <div>
                <Reveal distance={30}>
                  <h1
                    className={`text-3xl font-bold md:text-5xl ${
                      business.heroNeon ? "hero-title-gradient" : ""
                    }`}
                  >
                    {business.name}
                  </h1>
                </Reveal>
                {/* 한 줄씩 끊어 보여 준다. heroLines 가 없으면 headline 한 줄 */}
                <div className="mt-12 max-w-xl text-base leading-[1.6] text-navy-100 md:mt-16 md:text-lg">
                  {(business.heroLines ?? [business.headline]).map(
                    (line, index) => (
                      <Reveal
                        key={line}
                        delay={140 + index * 110}
                        distance={24}
                      >
                        <p>{line}</p>
                      </Reveal>
                    ),
                  )}
                </div>
              </div>
              {/* 사업에 따라 오브(영상) 또는 사진이 같은 자리에 놓인다 */}
              {business.heroPhoto ? (
                <HeroPhoto
                  image={business.heroPhoto}
                  neon={business.heroNeon}
                  className="mx-auto xl:mx-0"
                />
              ) : (
                <AuiOrb className="mx-auto xl:mx-0" />
              )}
            </div>
          </Container>
        </section>
      ) : (
        <section
          className={`on-navy relative overflow-hidden pt-24 pb-14 text-white md:pt-44 md:pb-28 ${
            business.heroImage ? "bg-black" : "bg-ink-950"
          }`}
        >
          {business.heroImage && (
            // 사진 자체 배경이 검정이라 덮개(그라디언트) 없이 그대로 보여준다
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] lg:block">
              {/* object-contain — 잘라내거나 확대하지 않고 원본 비율 그대로 맞춘다 */}
              <Image
                src={business.heroImage.src}
                alt=""
                fill
                priority
                sizes="34vw"
                className="object-contain object-right"
              />
            </div>
          )}

          <Container className="relative">
            <Reveal
              className={business.heroImage ? "lg:max-w-[60%]" : undefined}
            >
              {/* 사진이 있는 히어로는 아이콘 없이 제목부터 시작한다 */}
              {!business.heroImage && (
                <BusinessIcon
                  icon={business.icon}
                  className="mb-8 size-12 text-navy-300"
                />
              )}
              <h1
                className={
                  business.heroImage
                    ? "text-2xl font-bold md:text-4xl"
                    : "text-3xl font-bold md:text-5xl"
                }
              >
                {business.name}
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-[1.7] text-navy-100 md:text-2xl">
                {business.headline}
              </p>
            </Reveal>
          </Container>
        </section>
      )}

      {/* 2. 문제 정의 — 내용이 있을 때만 렌더링 */}
      {business.problem.length > 0 && (
        <Section tone="white" size="lg">
          <Reveal>
            <div className="max-w-3xl">
              <SubHeading>The problem</SubHeading>
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

      {/* 3. 접근 방식 — 문단도 카드도 없으면 제목만 남으므로 섹션째 숨긴다 */}
      {(business.approach.length > 0 || business.capabilities) && (
        <Section tone="offwhite" size="lg">
          <div className="mx-auto max-w-3xl">
            {/*
              기술 과제 섹션과 같은 짜임 — 영문 눈썹말 위, 제목 아래.
              제목은 가운데로 두되 본문 문단은 왼쪽 정렬로 남긴다. 여러 줄
              문단까지 가운데로 맞추면 줄 시작점이 흔들려 읽기 나빠진다.
            */}
            <div className="text-center">
              <Reveal distance={22}>
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
                  Approach
                </p>
              </Reveal>
              <Reveal delay={90} distance={30}>
                <div className="mt-4">
                  <SubHeading>Technical approach</SubHeading>
                </div>
              </Reveal>
            </div>

            {/* 카드로만 설명하는 사업은 approach 를 비워 둔다 */}
            {business.approach.map((paragraph, index) => (
              <Reveal key={paragraph} delay={160 + index * 110}>
                <p className="mt-6 text-lg leading-[1.9] whitespace-pre-line">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {business.capabilities && (
            // 제목 덩어리와 카드 사이 — 좁으면 제목이 카드에 딸린 것처럼 읽힌다
            <div className="mt-24 md:mt-32">
              {business.capabilityLayout === "tile" ? (
                <CapabilityTiles items={business.capabilities} />
              ) : (
                <CapabilityCards items={business.capabilities} />
              )}
            </div>
          )}
        </Section>
      )}

      {/*
        4. 기술 과제 — 채용 타깃 대상 핵심 블록 (기획서 5.3 / 4.3 디자인 의도)
        시각적으로 강조해 기술적 깊이를 드러낸다.
      */}
      {/*
        사진이 있으면 두 섹션(기술 과제 · 확장 계획)을 한 무대로 묶는다.
        사진을 섹션 안에 두면 그 섹션 밖으로 한 픽셀도 못 나가서, 아래로
        내리는 순간 잘린다. 바깥 층으로 빼면 두 섹션에 걸쳐 자유롭게 놓인다.
        배경색도 이 층이 맡고 안쪽 섹션은 plain(투명)이 된다.
      */}
      <div
        className={
          stageImage
            ? "stage-band relative overflow-hidden bg-ink-950"
            : "contents"
        }
      >
        {stageImage && (
          <div
            aria-hidden
            className={`chal-art${statusOnStage ? " chal-art--sm" : ""}`}
          >
            <Image
              src={stageImage.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 140vw"
              className="chal-art__img object-cover"
            />
            <div className="chal-art__veil" />
          </div>
        )}

        {!business.hideChallengeSection && (
          <Section
            tone={stageImage ? "plain" : "navy"}
            size="lg"
            className={
              // 눈썹말부터 카드까지 한 덩어리를 아래로 내린다. 배경 사진을
              // 함께 쓰는 페이지(AUI)는 사진 위쪽이 비도록 한 단계 더 내린다.
              business.challenge.image
                ? "relative pt-40 md:pt-56"
                : "relative pt-28 md:pt-40"
            }
          >
          <div>
            <div className="relative z-10 max-w-2xl">
              <Reveal distance={22}>
                <p className="text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
                  Engineering
                </p>
              </Reveal>
              <Reveal delay={90} distance={30}>
                {/* 본문과 함께 한 단계씩 내렸다 — 둘의 크기 차는 그대로 */}
                <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                  {business.challenge.title}
                </h2>
              </Reveal>

              {business.challenge.body?.map((paragraph, index) => (
                <Reveal key={paragraph} delay={200 + index * 120} distance={24}>
                  <p className="mt-8 text-base leading-[1.85] whitespace-pre-line text-navy-100 md:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

            {business.challenge.items && (
              <div className="mt-12">
                <ChallengeCards
                  items={business.challenge.items}
                  icons={business.challenge.itemIcons}
                />
              </div>
            )}
          </Section>
        )}

        {/* 5. 현재 상태 / 확장 계획 */}
        <Section
          tone={stageImage ? "plain" : "white"}
          size="lg"
          className={
            statusOnStage
              ? // 이 섹션이 무대의 주인공이다. 위아래를 같은 값으로 두고
                // 남는 높이는 .stage-band 가 위아래로 똑같이 나눈다
                "relative py-28 md:py-40"
              : business.challenge.image
                ? // 앞 섹션과 무대를 나눠 쓰는 페이지는 바로 밑에 붙인다
                  // (pt-* 가 py-* 를 덮는다)
                  "relative pt-0 md:pt-0"
                : // 그 외에는 앞 섹션과 끊어 독립된 한 칸으로 세운다
                  "relative pt-16 pb-28 md:pt-24 md:pb-44"
          }
        >
          {/*
            사진이 있으면 왼쪽 글 · 오른쪽 사진의 2단으로 세운다.
            사진이 없는 사업은 wrapper 를 contents 로 두어 기존 한 단 그대로다.
          */}
          <div
            className={
              business.status.image && !statusOnStage
                ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)] lg:gap-16"
                : "contents"
            }
          >
            <div>
              <div
                className={
                  statusOnStage ? "relative z-10 max-w-2xl" : "max-w-3xl"
                }
              >
                <Reveal distance={30}>
                  {business.status.eyebrow && (
                    <p className="mb-4 text-sm font-semibold tracking-[0.14em] text-navy-300 uppercase">
                      {business.status.eyebrow}
                    </p>
                  )}
                  {/*
                    "확장 계획" 같은 라벨은 마무리 블록답게 작게, 한 문장짜리
                    헤드라인은 기술 과제 제목과 같은 크기로 올린다.
                    공용 SubHeading 을 쓰지 않고 여기서만 크기를 지정한다.
                  */}
                  <h2
                    className={
                      business.status.titleAsHeadline
                        ? "text-2xl font-bold md:text-3xl"
                        : "text-lg font-bold md:text-xl"
                    }
                  >
                    {business.status.title}
                  </h2>
                </Reveal>
                {/* 배열 한 칸이 한 문단. 문단 안 줄바꿈은 데이터의 
 이 맡는다 */}
                {business.status.body.map((paragraph, index) => (
                  <Reveal
                    key={paragraph}
                    delay={110 + index * 110}
                    distance={24}
                  >
                    <p
                      className={`text-base leading-[1.9] whitespace-pre-line md:text-lg ${
                        index > 0
                          ? "mt-5"
                          : // 문장형 헤드라인은 기술 과제 섹션과 같은 간격(mt-8),
                            // "확장 계획" 같은 라벨은 제 글에 바짝 붙인다
                            business.status.titleAsHeadline
                            ? "mt-8"
                            : "mt-4"
                      }`}
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/*
              외부 서비스 진입 CTA (기획서 4.6)
              URL 미확보 시 비활성 처리한다 (9.2 B항목).
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
                        Channel addresses are being prepared. They will be
                        linked here once public.
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
            </div>

            {/* 가장자리를 녹여 어두운 바탕에 그대로 잇는다 (globals.css) */}
            {business.status.image && !statusOnStage && (
              <Reveal delay={200} distance={30}>
                <div className="status-photo">
                  <div aria-hidden className="status-photo__glow" />
                  <Image
                    src={business.status.image.src}
                    alt={business.status.image.alt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="status-photo__img"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </Section>
      </div>

      {/* 6. 하단 CTA — 문의 유형 사전 선택 (기획서 5.3 · 5.5) */}
      {/* 섹션 하나를 흰 바탕으로 꽉 채운다 — 어두운 페이지의 마침표 */}
      <section className="cta-band">
        <Container>
          <Reveal distance={26}>
          <CtaPanel
            title="Tell us when you need an AI agent"
            description="Tell us the problem and the situation on site, and FLUXLABS will work out the answer with you."
            actionLabel="Contact Us"
              href={`/contact?type=${business.slug}`}
            />
          </Reveal>
        </Container>
      </section>

    </>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold md:text-3xl">{children}</h2>;
}
