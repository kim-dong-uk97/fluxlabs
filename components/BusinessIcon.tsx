import type { Business } from "@/lib/business";

/**
 * 사업영역 아이콘 — 기획서 8.9
 *
 * ⚠️ 임시 자산이다. 최종본은 디자인팀(김동욱)이 제작한다.
 *    "심볼의 조형 언어(직각 + 원형 도트) 계승, 단색 Navy" 지침에 맞춰
 *    개발 진행용으로 만든 것이며, 최종 아이콘 수령 시 이 파일을 교체한다.
 *
 * 기획서 8.2 — 4개 사업의 구분은 색상이 아니라 **아이콘 형태**로 처리한다.
 * 따라서 이 컴포넌트는 색을 받지 않고 부모의 텍스트 색을 따른다.
 */

type Props = {
  icon: Business["icon"];
  className?: string;
};

export function BusinessIcon({ icon, className = "size-10" }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      {icon === "retail" && (
        <>
          {/* 매장 카운터 + 대화 도트 */}
          <path d="M6 18h36v22H6z" />
          <path d="M6 18l4-10h28l4 10" />
          <circle cx="24" cy="29" r="4" fill="currentColor" stroke="none" />
        </>
      )}

      {icon === "wearable" && (
        <>
          {/* 글래스 프레임 + 시야 도트 */}
          <path d="M4 22h40" />
          <path d="M8 22v6a6 6 0 0 0 12 0v-6" />
          <path d="M28 22v6a6 6 0 0 0 12 0v-6" />
          <circle cx="24" cy="14" r="3.5" fill="currentColor" stroke="none" />
        </>
      )}

      {icon === "healthcare" && (
        <>
          {/* 창구 + 응답 도트 */}
          <path d="M8 10h32v28H8z" />
          <path d="M8 24h32" />
          <path d="M18 31h12" />
          <circle cx="24" cy="17" r="3.5" fill="currentColor" stroke="none" />
        </>
      )}

      {icon === "assistant" && (
        <>
          {/* 대화 말풍선 + 도트 */}
          <path d="M8 10h32v22H20l-8 8v-8H8z" />
          <circle cx="24" cy="21" r="3.5" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
