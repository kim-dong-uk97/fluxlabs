"use client";

import { useState } from "react";

/**
 * 주소 복사 버튼 — 기획서 5.2 오시는 길
 *
 * navigator.clipboard 는 보안 컨텍스트(HTTPS 또는 localhost)에서만 동작한다.
 * 실패 시 사용자가 직접 선택해 복사할 수 있도록 안내한다.
 */
export function CopyButton({
  value,
  label = "주소 복사",
  copiedLabel = "복사했습니다",
  failedLabel = "복사에 실패했습니다. 주소를 직접 선택해 주세요.",
  copiedAnnouncement = "주소를 복사했습니다.",
}: {
  value: string;
  label?: string;
  /** 복사 성공 시 버튼 라벨 */
  copiedLabel?: string;
  /** 복사 실패 시 안내 문구 */
  failedLabel?: string;
  /** 복사 성공 시 스크린리더 안내 */
  copiedAnnouncement?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-white/25 px-4 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
      >
        <CopyIcon />
        {state === "copied" ? copiedLabel : label}
      </button>

      {/* 상태 변화를 스크린리더에도 알린다 */}
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" && copiedAnnouncement}
        {state === "failed" && failedLabel}
      </span>

      {state === "failed" && (
        <span className="text-sm text-navy-300">{failedLabel}</span>
      )}
    </>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
