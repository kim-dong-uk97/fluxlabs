import type { ReactNode } from "react";
import { Container } from "./Section";

/**
 * 법적 고지 문서 공통 레이아웃 — 부록 개발 적용 참고
 *  - 본문 16px 이상, 조항 번호는 <ol> 시맨틱 마크업
 *  - @media print 대응 (globals.css) — 이용자가 저장·출력할 수 있어야 함
 *
 * 기획서는 MDX 관리를 권장하나, 문서가 2건이고 개정 빈도가 낮아
 * MDX 툴체인 대신 구조화된 TSX 로 작성했다. raw HTML 을 쓰지 않으므로
 * dangerouslySetInnerHTML 금지 원칙(보안 체크리스트 B-6)에도 부합한다.
 */

export function LegalPage({
  title,
  intro,
  effectiveDate,
  noticeDate,
  children,
}: {
  title: string;
  intro?: ReactNode;
  effectiveDate: string;
  noticeDate?: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-ink-950 pt-32 pb-24 text-paper md:pt-40 md:pb-32">
      <Container>
        <div className="max-w-[46rem]">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-navy-300">
            {noticeDate && <span>공고일자 {noticeDate}</span>}
            <span>시행일자 {effectiveDate}</span>
          </div>

          {intro && <div className="mt-8 leading-[1.85]">{intro}</div>}

          <div className="mt-12 space-y-12">{children}</div>
        </div>
      </Container>
    </article>
  );
}

export function Article({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`article-${number}`}>
      <h2 id={`article-${number}`} className="text-xl font-bold md:text-2xl">
        제{number}조 ({title})
      </h2>
      <div className="mt-5 space-y-4 leading-[1.9]">{children}</div>
    </section>
  );
}

/** 조항 항목 — 번호는 <ol> 로 시맨틱하게 처리한다 */
export function Clauses({ items }: { items: ReactNode[] }) {
  return (
    <ol className="list-decimal space-y-2.5 pl-6 marker:text-navy-300">
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  );
}

/** 불릿 목록 */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span aria-hidden="true" className="text-navy-300">
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 표 — 가로 스크롤 컨테이너로 감싸 모바일에서 레이아웃이 깨지지 않게 한다 */
export function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[26rem] border-collapse text-left">
        <thead>
          <tr className="border-y border-white/15 bg-ink-900">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-sm font-bold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-white/10">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 align-top leading-[1.75]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
