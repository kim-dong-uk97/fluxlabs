/**
 * AUI 오브 — 사업 상세 히어로 우측에 놓는 발광 링.
 *
 * 대화형 에이전트가 "거기서 듣고 있다"는 상태를 원 하나로 표현한다.
 * 영상(/video/aui-orb.mp4)을 원형으로 오려 쓴다. 원형 마스크가 두 가지를
 * 한 번에 처리한다.
 *  · 원 밖으로 터져 나가는 물결을 잘라 낸다 (링 안쪽 물결만 남는다)
 *  · 우하단 생성 워터마크를 시야에서 지운다 — object-cover 가 1280×720 의
 *    가운데 정사각만 남기므로 워터마크는 그 전에 이미 잘려 나간다
 *
 * 잘린 자리에 원 바깥 발광이 같이 사라지므로, 뒤에 halo 를 깔아 되살린다.
 *
 * 장식이므로 aria-hidden. 스크린리더에는 제목·한 줄 정의만 전달된다.
 */
export function AuiOrb({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`hero-visual aui-orb ${className ?? ""}`}>
      <div className="aui-orb__halo" />
      <div className="aui-orb__lens">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="aui-orb__video"
        >
          <source src="/video/aui-orb.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
