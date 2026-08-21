import { ImageResponse } from "next/og";

/**
 * Apple Touch Icon — 기획서 8.3
 *   Symbol / White / 180×180, 배경 Navy 풀블리드
 *
 * apple-icon 은 PNG/JPG 만 지원한다(SVG 불가). 그래서 빌드 시 PNG 로 생성한다.
 *
 * ⚠️ 심볼은 정사각형이 아니라 2:3 비율(130 × 196)이다.
 *    늘리지 말고 비율을 유지한 채 중앙에 안착시킨다 (8.6 비율 왜곡 금지).
 *    높이 108px 기준 → 폭 = 108 × 130 / 196 ≒ 72px
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const SYMBOL_HEIGHT = 108;
const SYMBOL_WIDTH = Math.round((SYMBOL_HEIGHT * 130) / 196);

/** 심볼 패스 — 화이트. 승인된 3색 중 하나만 사용한다 (8.2) */
const SYMBOL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 196" fill="#FFFFFF"><path d="M130 0H0.00147647C0.00147647 0 -0.000369928 11.5121 0.00147647 30.699C0.00332287 49.8859 38.2363 69.0728 38.2363 69.0728V30.699H107.059C128.087 30.699 130 0 130 0Z"/><path d="M0 195.511V65.5606C0 65.5606 9.54693 81.03 16.8649 88.4931C24.1828 95.9562 37.4775 103.781 37.4775 103.781V168.757C37.4775 189.778 0 195.511 0 195.511Z"/><path d="M99.5496 94.2434C99.5496 108.145 88.5382 119.414 74.955 119.414C61.3717 119.414 50.3604 108.145 50.3604 94.2434C50.3604 80.3421 61.3717 69.0728 74.955 69.0728C88.5382 69.0728 99.5496 80.3421 99.5496 94.2434Z"/></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // 배경 Navy 풀블리드
          background: "#2A4269",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(SYMBOL_SVG)}`}
          width={SYMBOL_WIDTH}
          height={SYMBOL_HEIGHT}
          alt=""
        />
      </div>
    ),
    size,
  );
}
