import Image from "next/image";

export type MarqueeLogo = {
  src: string;
  alt: string;
};

type Props = {
  logos: readonly MarqueeLogo[];
  /** 스크린리더에 읽히는 스트립 이름 */
  label: string;
};

/**
 * 로고 마퀴 — 홈 S5 관계사 스트립
 *
 * 얇은 띠(border-y) 안에서 로고가 왼쪽으로 끊김 없이 흘러간다.
 *
 * 이음매 없는 무한 루프의 조건:
 *   1) 트랙을 정확히 2배로 복제하고 -50% 만큼 이동시킨다.
 *   2) 항목 사이 간격을 flex 의 gap 이 아니라 각 항목의 좌우 패딩으로 준다.
 *      gap 을 쓰면 트랙 폭이 (항목×n + 간격×(n−1)) 이 되어 절반 지점이
 *      한 세트 경계와 어긋나고, 매 바퀴마다 간격 절반만큼 튄다.
 *   3) 한 세트가 가장 넓은 뷰포트보다 넓어야 빈 구간이 생기지 않는다.
 *      로고 8개(≈1,700px)로는 모자라서 세트당 2회 반복한다.
 *
 * 접근성 — 복제본은 aria-hidden 으로 감춰 같은 로고가 여러 번 읽히지 않게 한다.
 * 모션 최소화 설정에서는 globals.css 의 전역 규칙이 애니메이션을 멈춘다.
 */

/** 한 세트에 로고 목록을 몇 번 반복할지 (뷰포트보다 넓게 만들기 위함) */
const REPEATS_PER_SET = 2;

export function LogoMarquee({ logos, label }: Props) {
  const set = Array.from({ length: REPEATS_PER_SET }, () => logos).flat();

  return (
    <div
      className="marquee relative overflow-hidden border-y border-white/15 py-11"
      role="group"
      aria-label={label}
    >
      <div className="marquee-track flex w-max items-center">
        {/* 원본 세트 + 복제 세트 = 트랙. -50% 이동 시 원본 세트 시작점과 정확히 맞물린다 */}
        {[0, 1].map((copy) =>
          set.map((logo, index) => (
            <div
              key={`${copy}-${index}-${logo.src}`}
              aria-hidden={copy === 1 ? "true" : undefined}
              // 간격은 gap 이 아니라 항목 바깥 여백으로 (위 2번 주석 참고)
              className="relative mx-7 h-11 w-[140px] shrink-0 md:h-12 md:w-[160px]"
            >
              <Image
                src={logo.src}
                alt={copy === 1 ? "" : logo.alt}
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
