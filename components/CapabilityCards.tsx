import { Reveal } from "@/components/Reveal";
import { CapabilityIcon } from "@/components/CapabilityIcon";
import type { Business } from "@/lib/business";

/**
 * 에이전트가 처리하는 것 — 사업 상세 "접근 방식" 아래 카드 그리드.
 *
 * 가로로 긴 카드다. 왼쪽에 발광하는 원형 배지(아이콘), 오른쪽에 제목·설명을
 * 둔다. 세로 카드보다 한 줄 설명이 읽기 편하고, 아이콘과 글이 한 줄에 놓여
 * 네 장이 목록처럼 훑힌다.
 *
 * 배지·카드 바탕은 이미지가 아니라 CSS(app/globals.css `.cap-row*`)다.
 * 소재 확보가 필요 없고 어느 크기에서도 선명하다.
 */
export function CapabilityCards({
  items,
}: {
  items: NonNullable<Business["capabilities"]>;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <Reveal key={item.term} delay={index * 80}>
          <article className="cap-row h-full">
            <span aria-hidden className="cap-row__badge">
              <CapabilityIcon name={item.icon} className="cap-row__icon" />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-bold md:text-xl">{item.term}</h3>
              <p className="mt-2 text-sm leading-[1.85] text-navy-300">
                {item.desc}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
