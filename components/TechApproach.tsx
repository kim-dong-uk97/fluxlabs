import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, PillHeading } from "@/components/Section";
import { Chevron } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { TECH_AXES, type TechAxis } from "@/lib/tech";

type Props = {
  /** 다른 언어 버전에서 축(카드) 데이터를 통째로 바꿔 끼울 때 쓴다. 기본값: 한국어 TECH_AXES */
  axes?: TechAxis[];
  eyebrow?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  /** 카드 우측 상단 호버 라벨 */
  detailLabel?: string;
  /** 카드 클릭 시 이동 경로 */
  href?: string;
};

/**
 * 기술 접근 섹션 — 홈과 사업영역 페이지에서 공용으로 쓴다.
 * 4칸 그리드: 사진을 카드 전체에 채우고 하단에 텍스트를 오버레이한다.
 * 사진·설명이 없는 항목은 라벨만 노출한다.
 */
export function TechApproachSection({
  axes = TECH_AXES,
  eyebrow = "Approach",
  description = "한 현장에서 검증된 방식이 다음 현장의 출발점이 됩니다",
  descriptionClassName = "text-[26px] font-medium leading-[1.4] text-white",
  detailLabel = "자세히 보기",
  href = "/#business",
}: Props) {
  return (
    <section className="on-navy bg-ink-950 py-28 text-white md:py-40">
      <Container>
        <PillHeading
          eyebrow={eyebrow}
          description={description}
          descriptionClassName={descriptionClassName}
        />

        {/*
          모바일 — 가로 스크롤 캐러셀. 카드 2개는 온전히 보이고 3번째가 살짝
          걸쳐 보여야 "옆에 더 있다"는 게 드러난다. 스크롤바는 숨긴다.
          sm 이상은 기존 그리드로 되돌아간다.
        */}
        <div className="mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {axes.map((axis, index) => (
            <Reveal key={axis.key} delay={index * 80} className="w-[45%] shrink-0 snap-start sm:w-auto sm:shrink">
              <Link
                href={href}
                className="group relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden rounded-lg border border-white/15 bg-ink-800"
              >
                {axis.image && (
                  <Image
                    src={axis.image.src}
                    alt={axis.image.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className={`object-cover brightness-125 transition-transform duration-500 ease-out group-hover:scale-110 ${axis.imageClassName ?? ""}`}
                  />
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
                />

                <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-1 text-[10px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                  {detailLabel} <Chevron />
                </span>

                <div className="relative z-10 p-4 sm:p-5">
                  <span className="tnum text-sm font-semibold text-navy-500">
                    0{index + 1}
                  </span>
                  <div className="mt-2 border-t border-white/15 pt-2">
                    <h3 className="text-base font-bold">{axis.label}</h3>
                    {axis.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-[1.6] text-navy-300">
                        {axis.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
