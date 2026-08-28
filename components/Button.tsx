import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Button — 기획서 6장
 * variant: Primary / Secondary / Ghost
 * state: default, hover, active, disabled, loading
 */

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark"; // 놓이는 배경. dark = Navy 배경 위

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition-[background-color,color,border-color,transform] duration-200 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const SIZE = "h-12 px-6 text-base";

/*
 * 다크 테마 — 사이트 전체가 어두운 배경이라 light/dark 톤 구분은 더 이상
 * "어느 배경 위인가"가 아니라 강조 강도를 나타낸다. light = 기본,
 * dark = navy 계열의 더 어두운 섹션(Hero, CTA 배너) 위에서 쓰는 톤.
 */
const VARIANT: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-white text-navy-950 hover:bg-navy-100",
    secondary:
      "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
    ghost: "text-white hover:bg-white/5",
  },
  dark: {
    primary: "bg-white text-navy-900 hover:bg-navy-100",
    secondary:
      "border border-white/40 text-white hover:border-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  },
};

function classesFor(variant: Variant, tone: Tone, className: string) {
  return `${BASE} ${SIZE} ${VARIANT[tone][variant]} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  /** 외부 링크 여부 — true 면 새 창으로 열고 rel 을 붙인다 */
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  className = "",
  external = false,
}: ButtonLinkProps) {
  const classes = classesFor(variant, tone, className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        // noopener 없이 target=_blank 를 쓰면 열린 페이지가 window.opener 로
        // 원본 탭을 조작할 수 있다 (탭내빙)
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  tone?: Tone;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  tone = "light",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classesFor(variant, tone, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

/**
 * 로딩 스피너
 *
 * ⚠️ 기획서 8.6 — 로고 심볼을 회전시키지 않는다. 스피너는 별도 도형을 쓴다.
 */
function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 링크·버튼 라벨의 화살표. 기획서 카피의 `▸` 표기 대응 */
export function Arrow() {
  return (
    <span aria-hidden="true" className="text-[0.9em] leading-none">
      ▸
    </span>
  );
}

/** 종이비행기 아이콘 — 그라디언트 CTA 버튼 등에서 Arrow 대신 쓴다 */
export function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4"
      fill="none"
    >
      <path
        d="M17.5 2.5L9 11M17.5 2.5L12 17.5L9 11M17.5 2.5L2.5 8L9 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 얇은 꺾쇠(>) 아이콘 — Arrow(▸)보다 가벼운 느낌이 필요한 곳에 쓴다 */
export function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 12"
      className="size-2.5"
      fill="none"
    >
      <path
        d="M1.5 1.5L6 6L1.5 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
