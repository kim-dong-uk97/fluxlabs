import type { CapabilityIconName } from "@/lib/business";

/**
 * 카드·타일 아이콘 — 접근 방식 타일(CapabilityTiles)과 기술 과제 카드
 * (ChallengeCards)가 같은 세트를 나눠 쓴다.
 *
 * BusinessIcon 과 같은 조형 언어를 따른다 (기획서 8.9):
 * 직각 + 원형 도트, 단색, 부모의 텍스트 색 상속.
 * 색을 받지 않으므로 발광 처리는 CSS(.cap-art__icon)가 전담한다.
 */
export function CapabilityIcon({
  name,
  className,
}: {
  name: CapabilityIconName;
  className?: string;
}) {
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
      {name === "taste" && (
        <>
          {/* 이용 이력 막대 + 읽어 낸 지점 도트 */}
          <path d="M9 27h7v13H9z" />
          <path d="M20.5 20h7v20h-7z" />
          <path d="M32 31h7v9h-7z" />
          <circle cx="24" cy="10" r="3.5" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "assist" && (
        <>
          {/* 게임 패드 — 방향키 + 버튼 도트 */}
          <path d="M13 17h22a7 7 0 0 1 7 7v7a7 7 0 0 1-7 7H13a7 7 0 0 1-7-7v-7a7 7 0 0 1 7-7z" />
          <path d="M15 23.5v8M11 27.5h8" />
          <circle cx="33" cy="25" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="37" cy="30" r="2.4" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "voice" && (
        <>
          {/* 마이크 + 수음 도트 */}
          <path d="M24 6a5 5 0 0 1 5 5v10a5 5 0 0 1-10 0V11a5 5 0 0 1 5-5z" />
          <path d="M12 21a12 12 0 0 0 24 0" />
          <path d="M24 33v5" />
          <circle cx="24" cy="43" r="2.6" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "vision" && (
        <>
          {/* 시야 — 눈 + 초점 도트 */}
          <path d="M4 24c5-7.5 11.5-11.5 20-11.5S39 16.5 44 24c-5 7.5-11.5 11.5-20 11.5S9 31.5 4 24z" />
          <circle cx="24" cy="24" r="4.2" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "act" && (
        <>
          {/* 대신 수행 — 한 바퀴 도는 처리 흐름 + 완료 도트 */}
          <path d="M39 24a15 15 0 1 1-4.4-10.6" />
          <path d="M39 7v9h-9" />
          <circle cx="24" cy="24" r="3.6" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "payment" && (
        <>
          {/* 카드 + 정산 완료 체크 */}
          <path d="M6 13h36v22H6z" />
          <path d="M6 20h36" />
          <path d="M14 28.5l4 4 8.5-8.5" />
          <circle cx="36" cy="28" r="2.6" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "chip" && (
        <>
          {/* 연산 칩 — 다리 여덟 개 + 가운데 연산 코어 */}
          <path d="M14 14h20v20H14z" />
          <path d="M19 14V8M29 14V8M19 34v6M29 34v6M14 19H8M14 29H8M34 19h6M34 29h6" />
          <circle cx="24" cy="24" r="3.2" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "multimodal" && (
        <>
          {/* 보는 눈 + 듣는 음파 — 두 갈래 입력을 한 아이콘에 담는다 */}
          <path d="M3 24c4-5.5 8.5-8.5 12.5-8.5S24 18.5 28 24c-4 5.5-8.5 8.5-12.5 8.5S7 29.5 3 24z" />
          <circle cx="15.5" cy="24" r="3.2" fill="currentColor" stroke="none" />
          <path d="M35 18a8.5 8.5 0 0 1 0 12M41.5 13.5a16 16 0 0 1 0 21" />
        </>
      )}

      {name === "battery" && (
        <>
          {/* 배터리 잔량 + 상시 대기 중임을 알리는 도트 */}
          <path d="M6 17h26v14H6z" />
          <path d="M37 21.5v5" />
          <path d="M11.5 22v4M17 22v4" />
          <circle cx="26" cy="24" r="2.6" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "register" && (
        <>
          {/* 접수 보드 — 집게 + 기재란 + 처리 완료 도트 */}
          <path d="M11 11h26v31H11z" />
          <path d="M19 6h10v8H19z" />
          <path d="M18 25h12M18 32h8" />
          <circle cx="33.5" cy="32" r="2.4" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "calendar" && (
        <>
          {/* 예약 달력 — 걸이 + 머리선 + 잡힌 날짜 도트 */}
          <path d="M7 12h34v30H7z" />
          <path d="M7 21h34" />
          <path d="M16 7v8M32 7v8" />
          <path d="M25 30h9M15 36h19" />
          <circle cx="17" cy="30" r="2.8" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "receipt" && (
        <>
          {/* 영수증 — 톱니 마감 + 금액 줄 + 수납 완료 도트 */}
          <path d="M11 6h26v30l-4.3-3.2L28.4 36l-4.4-3.2L19.6 36l-4.3-3.2L11 36z" />
          <path d="M17 15h14M17 22h9" />
          <circle cx="32" cy="22" r="2.4" fill="currentColor" stroke="none" />
        </>
      )}

      {name === "queue" && (
        <>
          {/* 대기 호출 표시기 — 번호판 + 호출 도트 + 받침 */}
          <path d="M6 12h36v18H6z" />
          <path d="M13 21h10" />
          <circle cx="32" cy="21" r="2.8" fill="currentColor" stroke="none" />
          <path d="M24 30v6M16 40h16" />
        </>
      )}
    </svg>
  );
}
