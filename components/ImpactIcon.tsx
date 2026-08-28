/**
 * IMPACT 섹션 아이콘 — BusinessIcon 과 같은 조형 언어(직각 + 원형 도트),
 * 단색으로 부모의 텍스트 색을 따른다.
 */

type Props = {
  icon: "zero-learning" | "scalability" | "human-centric";
  className?: string;
};

export function ImpactIcon({ icon, className = "size-8" }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icon === "zero-learning" && (
        <>
          {/* 즉시 켜지는 번개 — 설치 없이 바로 투입 */}
          <path d="M27 4 13 27h9l-3 17 20-27H28z" fill="currentColor" stroke="none" />
        </>
      )}

      {icon === "scalability" && (
        <>
          {/* 하나의 학습이 전체로 퍼지는 네트워크 */}
          <path d="M24 24 10 10M24 24 38 10M24 24 24 41" />
          <circle cx="24" cy="24" r="4.5" fill="currentColor" stroke="none" />
          <circle cx="10" cy="10" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="38" cy="10" r="3.5" fill="currentColor" stroke="none" />
          <circle cx="24" cy="41" r="3.5" fill="currentColor" stroke="none" />
        </>
      )}

      {icon === "human-centric" && (
        <>
          {/* 사람에게 남는 자리 — 머리 도트 + 어깨선 */}
          <circle cx="24" cy="13" r="6" fill="currentColor" stroke="none" />
          <path d="M8 41c0-8.837 7.163-16 16-16s16 7.163 16 16" />
        </>
      )}
    </svg>
  );
}
