"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { INQUIRY_TYPES } from "@/lib/site";
import {
  HONEYPOT_FIELD,
  MESSAGE_MAX,
  MESSAGE_MIN,
  emptyContactInput,
  hasErrors,
  validateContact,
  type ContactInput,
  type FieldErrors,
} from "@/lib/contact-schema";
import { SITE } from "@/lib/site";

/**
 * 문의 폼 — 기획서 5.5
 *
 * 동작 정의:
 *  - 전송 중: 버튼 비활성 + 스피너
 *  - 성공: 인라인 성공 메시지 (페이지 이동 없음)
 *  - 실패: 에러 메시지 + 대표 이메일 직접 안내
 *  - `?type=` 쿼리스트링으로 문의 유형 사전 선택
 *
 * 스팸 방지 (보안 체크리스트 B-1):
 *  - 허니팟 필드 · 시간 트랩 · 서버 측 rate limit
 *  - 여기의 클라이언트 검증은 UX 용이다. **서버에서 반드시 다시 검증한다.**
 */

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();

  const [values, setValues] = useState<ContactInput>(emptyContactInput);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /** 폼이 렌더된 시각 — 시간 트랩용 (B-1) */
  const renderedAt = useRef<number>(0);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  /** ?type= 사전 선택 (기획서 5.5) */
  useEffect(() => {
    const type = searchParams.get("type");
    if (!type) return;
    if (!INQUIRY_TYPES.some((item) => item.value === type)) return;
    setValues((prev) => (prev.type ? prev : { ...prev, type }));
  }, [searchParams]);

  function update<K extends keyof ContactInput>(
    key: K,
    value: ContactInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // 사용자가 고치기 시작하면 해당 필드 오류를 지운다
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContact(values);
    if (hasErrors(nextErrors)) {
      setErrors(nextErrors);
      // 첫 오류 필드로 포커스 이동 (접근성)
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const form = event.currentTarget;
      const honeypotValue =
        (form.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)
          ?.value ?? "";

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          [HONEYPOT_FIELD]: honeypotValue,
          renderedAt: renderedAt.current,
        }),
      });

      const data: { ok?: boolean; error?: string; errors?: FieldErrors } =
        await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        setValues(emptyContactInput());
        return;
      }

      if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      setStatus("error");
      setErrorMessage(
        data.error ??
          `접수 중 문제가 발생했습니다. ${SITE.email} 로 직접 보내주시면 확인하겠습니다.`,
      );
    } catch {
      setStatus("error");
      setErrorMessage(
        `네트워크 오류로 접수하지 못했습니다. ${SITE.email} 로 직접 보내주시면 확인하겠습니다.`,
      );
    }
  }

  // 성공 시 인라인 메시지 (페이지 이동 없음 — 기획서 5.5)
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-white/15 bg-ink-900 p-8"
      >
        <h2 className="text-xl font-bold text-white">문의가 접수되었습니다</h2>
        <p className="mt-3 leading-[1.85] text-navy-100">
          내용을 확인한 뒤 담당자가 회신드리겠습니다. 급한 사안이라면{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold underline">
            {SITE.email}
          </a>{" "}
          로 연락 주세요.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-semibold text-navy-300 underline"
        >
          새 문의 작성하기
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/*
        허니팟 (보안 체크리스트 B-1)
        display:none 대신 화면 밖으로 밀어낸다 — 일부 봇은 display:none 필드를
        걸러내기 때문이다. aria-hidden + tabIndex=-1 로 스크린리더·키보드
        사용자에게는 닿지 않게 한다. (실수로 채워지면 정상 문의가 차단된다)
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor={`field-${HONEYPOT_FIELD}`}>
          이 항목은 비워 두세요
        </label>
        <input
          id={`field-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <Field
        id="type"
        label="문의 유형"
        required
        error={errors.type}
      >
        <select
          id="field-type"
          value={values.type}
          onChange={(event) => update("type", event.target.value)}
          aria-invalid={errors.type ? true : undefined}
          aria-describedby={errors.type ? "error-type" : undefined}
          className={inputClass(!!errors.type)}
        >
          <option value="">선택해 주세요</option>
          {INQUIRY_TYPES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="company" label="회사명" required error={errors.company}>
          <input
            id="field-company"
            type="text"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            autoComplete="organization"
            maxLength={100}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? "error-company" : undefined}
            className={inputClass(!!errors.company)}
          />
        </Field>

        <Field id="name" label="성함" required error={errors.name}>
          <input
            id="field-name"
            type="text"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
            maxLength={50}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "error-name" : undefined}
            className={inputClass(!!errors.name)}
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="jobTitle" label="직함" error={errors.jobTitle}>
          <input
            id="field-jobTitle"
            type="text"
            value={values.jobTitle}
            onChange={(event) => update("jobTitle", event.target.value)}
            autoComplete="organization-title"
            maxLength={50}
            className={inputClass(!!errors.jobTitle)}
          />
        </Field>

        <Field id="phone" label="연락처" error={errors.phone} hint="숫자와 하이픈만">
          <input
            id="field-phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            autoComplete="tel"
            maxLength={20}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "error-phone" : "hint-phone"}
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      <Field id="email" label="이메일" required error={errors.email}>
        <input
          id="field-email"
          type="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          autoComplete="email"
          maxLength={254}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "error-email" : undefined}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field
        id="message"
        label="문의 내용"
        required
        error={errors.message}
        hint={`${MESSAGE_MIN}자 이상 ${MESSAGE_MAX}자 이내`}
      >
        <textarea
          id="field-message"
          rows={7}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          maxLength={MESSAGE_MAX}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "error-message" : "hint-message"
          }
          className={`${inputClass(!!errors.message)} resize-y`}
        />
        <p className="tnum mt-1.5 text-right text-sm text-navy-300">
          {values.message.length} / {MESSAGE_MAX}
        </p>
      </Field>

      {/* 개인정보 수집·이용 동의 — 기획서 5.5 필수 표기 */}
      <div
        className={`rounded-lg border p-5 ${
          errors.consent
            ? "border-red-500/50 bg-red-950/30"
            : "border-white/10 bg-ink-900"
        }`}
      >
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="field-consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby="consent-detail"
            className="mt-1 size-5 shrink-0 accent-[#2A4269]"
          />
          <span className="font-semibold text-white">
            <span className="text-navy-300">[필수]</span> 개인정보 수집·이용에
            동의합니다.
          </span>
        </label>

        <div
          id="consent-detail"
          className="mt-4 space-y-1.5 pl-8 text-sm leading-[1.75] text-navy-300"
        >
          <p>· 수집 항목: 회사명, 성함, 직함, 이메일, 연락처, 문의 내용</p>
          <p>· 수집 목적: 문의 접수 및 회신</p>
          <p>· 보유 기간: 문의 처리 완료 후 3년</p>
          <p>· 동의를 거부할 수 있으나, 거부 시 문의 접수가 제한됩니다.</p>

          <Link
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-semibold text-white underline"
          >
            [ 전문 보기 ]
          </Link>
        </div>

        {errors.consent && (
          <p className="mt-3 pl-8 text-sm font-medium text-red-400">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-950/30 p-4 text-sm leading-[1.8] text-red-300"
        >
          {errorMessage}
        </p>
      )}

      <Button type="submit" loading={submitting} className="w-full sm:w-auto">
        {submitting ? "전송 중" : "문의 보내기"}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function inputClass(invalid: boolean): string {
  return [
    "w-full rounded-lg border bg-ink-900 px-4 py-3 text-white",
    "transition-colors placeholder:text-navy-500",
    "disabled:bg-ink-950 disabled:text-navy-500",
    invalid
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/15 focus:border-white/50",
  ].join(" ");
}

function Field({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={`field-${id}`}
        className="mb-2 block font-semibold text-white"
      >
        {label}
        {required && (
          <span className="ml-1 text-navy-300" aria-label="필수 항목">
            *
          </span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p id={`hint-${id}`} className="mt-1.5 text-sm text-navy-300">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={`error-${id}`}
          role="alert"
          className="mt-1.5 text-sm font-medium text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
