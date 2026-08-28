import Image from "next/image";

/**
 * 히어로 우측 사진 — AuiOrb 와 같은 자리를 쓰는 다른 종류의 시각물.
 *
 * 자리(크기·정렬)는 `.hero-visual` 로 오브와 똑같이 쓰고, 사진에만 필요한
 * 처리(가장자리 녹이기)는 `.hero-photo*` 가 맡는다. 사진 자체 배경이 검정이라
 * 테두리를 두면 오려 붙인 것처럼 보이므로, 마스크로 바깥을 녹여
 * 검정 히어로 바탕에 그대로 이어지게 한다.
 *
 * neon 을 켜면 뒤에 깔리는 것이 파란 후광 대신 민트·보라 두 색이 좌우에서
 * 번지는 후광이 된다. 사진 상자 밖으로 나가므로 사진 크기를 키우지 않고도
 * 시각적 덩치가 커진다 — 다른 사업 히어로와 맞춰 둔 자리 크기를 깨지 않는다.
 */
export function HeroPhoto({
  image,
  neon,
  className,
}: {
  image: { src: string; alt: string };
  neon?: boolean;
  className?: string;
}) {
  return (
    <div className={`hero-visual ${className ?? ""}`}>
      <div
        aria-hidden
        className={neon ? "hero-neon-halo" : "aui-orb__halo"}
      />
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(min-width: 1280px) 440px, 66vw"
        className="hero-photo__img"
      />
    </div>
  );
}
