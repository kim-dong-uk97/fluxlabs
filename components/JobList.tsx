import { Accordion, type AccordionItem } from "./Accordion";

/**
 * 채용 공고 목록 — 기획서 5.4 개발 참고
 *
 * ⚠️ **오픈 시점에는 렌더링하지 않는다.**
 *    현재 채용은 상시 지원(Open Application) 형태로 운영하기로 확정되었다.
 *    향후 개별 공고 운영으로 전환할 수 있도록 **구조만 정의**해 둔 것이다.
 *
 * 전환 방법:
 *    1. 아래 JOB_POSTINGS 배열에 공고를 채운다
 *    2. app/careers/page.tsx 에서 <JobList /> 를 렌더링한다
 *    3. 상시 지원 블록의 문구를 조정한다
 *
 * 이 파일은 어디에서도 import 되지 않으므로 번들에 포함되지 않는다.
 */

export type JobPosting = {
  id: string;
  /** 직무명 */
  title: string;
  /** 고용 형태 · 근무지 등 요약 */
  meta: string;
  responsibilities: string[];
  requirements: string[];
  preferred?: string[];
};

/** 공고 데이터 — 운영 전환 시 채운다 */
export const JOB_POSTINGS: JobPosting[] = [];

export function JobList({
  postings = JOB_POSTINGS,
}: {
  postings?: JobPosting[];
}) {
  if (postings.length === 0) return null;

  const items: AccordionItem[] = postings.map((posting) => ({
    id: posting.id,
    title: posting.title,
    content: (
      <div className="space-y-6">
        <p className="text-sm text-navy-300">{posting.meta}</p>

        <JobSection heading="맡게 될 일" items={posting.responsibilities} />
        <JobSection heading="필요한 경험" items={posting.requirements} />
        {posting.preferred && (
          <JobSection heading="이런 분이면 더 좋습니다" items={posting.preferred} />
        )}
      </div>
    ),
  }));

  return <Accordion items={items} />;
}

function JobSection({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold text-white">{heading}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true" className="text-navy-500">
              ·
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
