"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * 확장형 패널 — 하나만 넓어지고 나머지는 좁은 스트립으로 접히는 형태.
 * 마우스오버/포커스로 활성 패널이 바뀐다. 어두운 배경은 검정이 아니라
 * Navy 계열로 유지한다 (기획서 8.2).
 */

export type ExpandPanelItem = {
  key: string;
  title: string;
  /** 여러 문단을 넣을 수 있다 — 20자 안팎에서 자연스럽게 줄바꿈된다 */
  description?: string[];
  tint: "navy-900" | "navy-800" | "navy-700" | "navy-500";
  href?: string;
  image?: { src: string; alt: string };
};

const TINT_BG: Record<ExpandPanelItem["tint"], string> = {
  "navy-900": "bg-navy-900",
  "navy-800": "bg-navy-800",
  "navy-700": "bg-navy-700",
  "navy-500": "bg-navy-500",
};

type Props = {
  items: ExpandPanelItem[];
};

export function ExpandPanels({ items }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-1 overflow-hidden bg-ink-950 md:h-[520px] md:flex-row">
      {items.map((item, index) => {
        const isActive = index === active;

        const inner = (
          <>
            {item.image ? (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover"
              />
            ) : (
              <div className={`absolute inset-0 ${TINT_BG[item.tint]}`} />
            )}

            {/*
              비활성 패널은 진하게 눌러 두고, 활성 패널은 사진이 또렷하게
              보이도록 블러 없이 옅은 어두운 톤만 살짝 덮는다.
            */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-500 ${
                isActive ? "bg-ink-950/50" : "bg-ink-950/70"
              }`}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
              <span className="tnum inline-flex items-center justify-center rounded-full border border-white/50 px-3 py-1 text-xs font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 max-w-full overflow-hidden text-sm leading-snug font-bold tracking-wide text-ellipsis whitespace-nowrap text-white md:text-base">
                {item.title}
              </span>
              {isActive && item.description && item.description.length > 0 && (
                <div className="mt-3 hidden max-w-xs space-y-1 md:block">
                  {item.description.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-sm leading-[1.5] text-navy-100 whitespace-pre-line"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </>
        );

        // 모바일은 고정 높이로 세로 스택, md 이상은 기존처럼 가로 폭을 나눠 갖는다
        const className = `group relative h-28 min-w-0 shrink-0 overflow-hidden transition-[flex-grow] duration-150 ease-out md:h-auto ${
          isActive ? "md:flex-[4_0_0%]" : "md:flex-[1_0_0%]"
        }`;

        if (item.href) {
          return (
            <Link
              key={item.key}
              href={item.href}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={className}
            >
              {inner}
            </Link>
          );
        }

        return (
          <div
            key={item.key}
            tabIndex={0}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={className}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
