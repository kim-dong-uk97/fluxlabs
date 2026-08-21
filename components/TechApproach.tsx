import Link from "next/link";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/Section";
import { Chevron } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { BusinessIcon } from "@/components/BusinessIcon";
import { TECH_AXES } from "@/lib/tech";

/**
 * 기술 접근 섹션 — 홈과 사업영역 페이지에서 공용으로 쓴다.
 * 3칸 정적 카드 그리드: 사진 상단 + 제목 + 설명 + 자세히 보기 버튼.
 */
export function TechApproachSection() {
  return (
    <section className="on-navy bg-ink-950 py-28 text-white md:py-40">
      <Container>
        <SectionHeading
          eyebrow="Approach"
          eyebrowClassName="text-base font-semibold text-[#356CF5]"
          description="한 현장에서 검증된 방식이 다음 현장의 출발점이 됩니다"
          descriptionClassName="text-[26px] font-medium leading-[1.4] text-white"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {TECH_AXES.map((axis, index) => (
            <Reveal key={axis.key} delay={index * 80}>
              <div className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                  {axis.image ? (
                    <div
                      className={`absolute inset-0 ${axis.imageClassName ?? ""}`}
                    >
                      <Image
                        src={axis.image.src}
                        alt={axis.image.alt}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 32vw, 460px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BusinessIcon icon="assistant" className="size-12 text-navy-700" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col pt-6">
                  <span className="tnum text-sm font-semibold text-navy-500">
                    0{index + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">{axis.label}</h3>
                  <p className="mt-2 flex-1 leading-[1.8] text-navy-300">
                    {axis.description}
                  </p>
                  <Link
                    href="/business"
                    className="mt-5 inline-flex items-center justify-center gap-1 self-start rounded-sm border border-[#356CF5] bg-[#356CF5] px-2 py-2 text-[11px] leading-none font-semibold text-white transition-colors hover:bg-[#2857DB]"
                  >
                    자세히 보기 <Chevron />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
