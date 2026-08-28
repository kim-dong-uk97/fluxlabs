import { Reveal } from "@/components/Reveal";
import { CapabilityIcon } from "@/components/CapabilityIcon";
import type { Business } from "@/lib/business";

/**
 * 에이전트가 처리하는 것 — 가운데 정렬 타일 (capabilityLayout: "tile").
 *
 * 위에 둥근 사각 배지(아이콘), 아래 제목·설명을 세로로 쌓고 가로로 나열한다.
 * 항목이 세 개 안팎이고 설명이 한두 줄일 때 가로 카드(CapabilityCards)보다
 * 리듬이 좋다.
 *
 * 배지 색은 타일마다 다르다 — 구분을 색으로만 하지 않는다는 원칙(기획서 8.2)
 * 아래에서, 형태(아이콘)가 이미 구분을 맡고 색은 리듬만 만든다.
 */

/*
  민트 → 보라 → 파랑 → 자홍. 히어로 제목 그라디언트와 같은 네온 계열로 묶는다.
  네 칸까지는 서로 다른 색이 배정된다 — 세 색만 두면 네 번째 타일이 첫 타일과
  같은 색이 되어 나란히 놓인 넉 장 중 둘이 겹쳐 보인다.
*/
const TINTS = [
  "110, 231, 208",
  "184, 132, 255",
  "126, 166, 255",
  "236, 132, 198",
];

export function CapabilityTiles({
  items,
}: {
  items: NonNullable<Business["capabilities"]>;
}) {
  // 4장은 4열로, 그 밖(3장)은 3열로 — 3열에 4장을 넣으면 한 칸이 남는다
  const columns =
    items.length % 4 === 0 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div className={`grid gap-12 text-center sm:gap-8 ${columns}`}>
      {items.map((item, index) => (
        <Reveal key={item.term} delay={index * 90}>
          <div>
            <span
              aria-hidden
              className="cap-tile__badge"
              style={
                { "--tint": TINTS[index % TINTS.length] } as React.CSSProperties
              }
            >
              <CapabilityIcon name={item.icon} className="w-1/2" />
            </span>
            <h3 className="mt-6 text-lg font-bold md:text-xl">{item.term}</h3>
            <p className="mx-auto mt-3 max-w-[22rem] text-sm leading-[1.85] text-navy-300">
              {item.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
