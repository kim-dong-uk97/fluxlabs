import { Reveal } from "@/components/Reveal";
import { CapabilityIcon } from "@/components/CapabilityIcon";
import type { ChallengeIconName } from "@/lib/business";

/**
 * 기술 과제 · 적용 범위 목록 — CapabilityCards 와 같은 카드로 렌더링한다.
 *
 * 네 사업 상세 페이지의 리듬을 맞추기 위한 것이다. 카드 껍데기·발광·호버는
 * 모두 공유한다 (app/globals.css `.cap-*`). 다른 점은 이 목록의 항목이 한 줄
 * 문장이라 제목·설명으로 나눌 재료가 없다는 것뿐이다.
 *
 * 아이콘(itemIcons)이 주어지면 판 가운데에 아이콘을 놓고 번호는 모서리로
 * 물러난다. 없으면 예전처럼 번호만 가운데에 크게 놓는다.
 */
export function ChallengeCards({
  items,
  icons,
}: {
  items: string[];
  icons?: ChallengeIconName[];
}) {
  // 4의 배수가 아니면 3열로 — 4열에 3장을 넣으면 한 칸이 비어 보인다
  const columns = items.length % 4 === 0 ? "xl:grid-cols-4" : "lg:grid-cols-3";

  return (
    <div className={`grid gap-6 sm:grid-cols-2 ${columns}`}>
      {items.map((item, index) => {
        const icon = icons?.[index];

        return (
          <Reveal key={item} delay={index * 80}>
            <article className="cap-card h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-950">
              <div className={`cap-art cap-art--${(index % 4) + 1}`}>
                <div className="cap-art__ripple" />
                <div className="cap-art__glow" />
                {icon && <CapabilityIcon name={icon} className="cap-art__icon" />}
                <span
                  className={`tnum ${icon ? "cap-art__num--corner" : "cap-art__num"}`}
                >
                  0{index + 1}
                </span>
              </div>
              <div className="p-7">
                <p className="leading-[1.8] text-white">{item}</p>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
