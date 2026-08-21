"use client";

import { useState, type ReactNode } from "react";

/**
 * Accordion — 기획서 6장 (채용 JD, FAQ)
 *
 * <details>/<summary> 대신 버튼 + aria-expanded 로 구현한 이유:
 * 애니메이션과 아이콘 상태를 제어하기 쉽고, 스크린리더 지원도 동등하다.
 */

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => {
        const open = openId === item.id;

        return (
          <li key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                aria-expanded={open}
                aria-controls={`accordion-panel-${item.id}`}
                id={`accordion-trigger-${item.id}`}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-navy-300 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
            </h3>

            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              hidden={!open}
              className="pb-6 leading-[1.85] text-navy-100"
            >
              {item.content}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
