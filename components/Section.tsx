import type { ReactNode } from "react";

/**
 * Section Wrapper — 기획서 6장
 * 최대폭 1200px, 좌우 여백 PC 80px / 태블릿 40px / 모바일 20px
 */

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1600px] px-5 md:px-10 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  /**
   * 배경 톤. 다크 테마 — ink 2단계(white/offwhite)와 navy 2단계로 교차 리듬을
   * 만든다. 순정 블랙(#000)은 쓰지 않는다.
   */
  tone?: "white" | "offwhite" | "navy" | "navy-deep";
  className?: string;
  id?: string;
  /** 상하 여백 크기 */
  size?: "sm" | "md" | "lg";
};

const TONE_CLASS: Record<NonNullable<SectionProps["tone"]>, string> = {
  // 다크 테마 — white/offwhite 는 잉크 톤 2단계로 교차 리듬을 만든다
  white: "bg-ink-950 text-paper",
  offwhite: "bg-ink-900 text-paper",
  navy: "bg-ink-950 text-white",
  "navy-deep": "bg-ink-950 text-white",
};

const SIZE_CLASS: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-14 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
};

export function Section({
  children,
  tone = "white",
  size = "md",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${TONE_CLASS[tone]} ${SIZE_CLASS[size]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  /** eyebrow 색상만 개별 지정하고 싶을 때 (기본값: text-navy-300) */
  eyebrowClassName?: string;
  /** description 크기·굵기·색을 개별 지정하고 싶을 때 */
  descriptionClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  eyebrowClassName = "text-sm font-semibold text-navy-300",
  descriptionClassName = "text-lg leading-[1.8] text-navy-100",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <p
          className={`mb-4 tracking-[0.14em] uppercase ${eyebrowClassName}`}
        >
          {eyebrow}
        </p>
      )}
      {title && <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>}
      {description && (
        <div className={`mt-5 ${descriptionClassName}`}>{description}</div>
      )}
    </div>
  );
}
