"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll Reveal — 기획서 6장
 * IntersectionObserver 기반 fade-up. **1회만 실행** (반복 재생 금지)
 *
 * prefers-reduced-motion 대응은 globals.css 에서 처리한다.
 */

type RevealProps = {
  children: ReactNode;
  /** 순차 등장용 지연(ms) */
  delay?: number;
  /** 아래에서 올라오는 거리(px). 기본 16px — 더 크게 주면 "쑥 올라오는" 느낌이 강해진다 */
  distance?: number;
  as?: ElementType;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  distance,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // IntersectionObserver 미지원 환경에서는 즉시 노출 (콘텐츠가 숨겨지면 안 됨)
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.dataset.revealed = "true";
          // 1회만 실행 — 관측 해제
          observer.unobserve(target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: Record<string, string> = {};
  if (delay) style.transitionDelay = `${delay}ms`;
  if (distance) style["--reveal-y"] = `${distance}px`;

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={Object.keys(style).length ? style : undefined}
    >
      {children}
    </Tag>
  );
}
