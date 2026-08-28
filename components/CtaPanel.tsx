import Image from "next/image";
import Link from "next/link";

/**
 * 사업 상세 하단 문의 CTA — 가운데 정렬 한 장의 판.
 *
 * 위에서부터 로고 · 제목 · 한두 줄 설명 · 알약 버튼 순으로 쌓는다.
 * 바탕(흰 칸)과 각 조각의 색은 app/globals.css `.cta-band` · `.cta-panel*` 이
 * 맡는다 — 페이지에서 유일하게 밝은 칸이라 글자와 버튼이 모두 검정이다.
 */

/*
 * 로고. 검정 라운드 사각 안에 흰 글자꼴이라, 흰 바탕 위에 그대로 올린다.
 * 배지(테두리·바탕)를 따로 두지 않는다 — 이미 이미지가 사각을 갖고 있다.
 */
const MARK_SRC = "/cta/logo-mark-v2.png";

export function CtaPanel({
  title,
  description,
  actionLabel,
  href,
}: {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
}) {
  return (
    <div className="cta-panel">
      <span aria-hidden className="cta-panel__mark">
        <Image src={MARK_SRC} alt="" width={112} height={112} />
      </span>

      {/* 로고와 제목 사이 — 로고가 떠 있는 표식으로 읽히도록 넉넉히 띄운다 */}
      <h2 className="mt-11 text-2xl font-bold md:text-3xl">{title}</h2>

      {/*
        text-balance — 두 줄로 접힐 때 줄 길이를 고르게 나눠, 마지막 낱말만
        아래 줄에 홀로 떨어지는 것을 막는다. 폭도 한 단계 넓게 잡는다.
      */}
      <p className="mx-auto mt-7 max-w-xl text-sm leading-[1.9] text-balance text-navy-800 md:text-base">
        {description}
      </p>

      <Link href={href} className="cta-panel__action">
        {actionLabel}
      </Link>
    </div>
  );
}
