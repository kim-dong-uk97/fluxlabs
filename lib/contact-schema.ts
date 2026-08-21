import { INQUIRY_TYPES } from "./site";

/**
 * 문의 폼 검증 — 기획서 5.5 폼 필드 정의
 *
 * 보안 체크리스트 B-1 — 이 검증은 **서버에서 반드시 다시 수행**한다.
 * 클라이언트 검증만으로는 안 된다. 봇은 브라우저를 쓰지 않는다.
 */

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

/** 허니팟 필드명 — 사람은 절대 채우지 않는 필드 (B-1) */
export const HONEYPOT_FIELD = "website";

/** 렌더링~제출 최소 경과 시간. 이보다 빠르면 봇으로 본다 */
export const MIN_ELAPSED_MS = 3000;

export type ContactInput = {
  type: string;
  company: string;
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

/** 지나치게 관대하지도, 엄격하지도 않은 실무 수준 이메일 검증 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/** 기획서 5.5 — 숫자·하이픈만 */
const PHONE_PATTERN = /^[0-9-]+$/;

export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};

  const validTypes = INQUIRY_TYPES.map((t) => t.value) as string[];
  if (!input.type || !validTypes.includes(input.type)) {
    errors.type = "문의 유형을 선택해 주세요.";
  }

  if (!input.company.trim()) {
    errors.company = "회사명을 입력해 주세요.";
  } else if (input.company.trim().length > 100) {
    errors.company = "회사명은 100자 이내로 입력해 주세요.";
  }

  if (!input.name.trim()) {
    errors.name = "성함을 입력해 주세요.";
  } else if (input.name.trim().length > 50) {
    errors.name = "성함은 50자 이내로 입력해 주세요.";
  }

  if (input.jobTitle.trim().length > 50) {
    errors.jobTitle = "직함은 50자 이내로 입력해 주세요.";
  }

  if (!input.email.trim()) {
    errors.email = "이메일을 입력해 주세요.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  } else if (input.email.trim().length > 254) {
    errors.email = "이메일이 너무 깁니다.";
  }

  const phone = input.phone.trim();
  if (phone) {
    if (!PHONE_PATTERN.test(phone)) {
      errors.phone = "연락처는 숫자와 하이픈만 입력할 수 있습니다.";
    } else if (phone.length > 20) {
      errors.phone = "연락처가 너무 깁니다.";
    }
  }

  const message = input.message.trim();
  if (message.length < MESSAGE_MIN) {
    errors.message = `문의 내용을 ${MESSAGE_MIN}자 이상 입력해 주세요.`;
  } else if (message.length > MESSAGE_MAX) {
    errors.message = `문의 내용은 ${MESSAGE_MAX}자 이내로 입력해 주세요.`;
  }

  // 기획서 5.5 — 필수 동의. 미동의 시 접수 불가 (체크리스트 C-3)
  if (!input.consent) {
    errors.consent = "개인정보 수집·이용에 동의해 주세요.";
  }

  return errors;
}

export const hasErrors = (errors: FieldErrors) =>
  Object.keys(errors).length > 0;

export const emptyContactInput = (): ContactInput => ({
  type: "",
  company: "",
  name: "",
  jobTitle: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
});
