/**
 * 문의 적재 어댑터 인터페이스 — 보안 체크리스트 A-3
 *
 * 부록 A 제3조는 "문의 응대: 처리 완료 후 3년 보관 후 파기" 로 확정되어 있다.
 * 파기 의무를 이행하려면 문의가 어디에 몇 건 있는지 식별 가능해야 한다.
 *
 * 현재 결정(2026-08-13): 별도 DB 를 두지 않고 **수신 메일함(info@fluxlabs.co.kr)
 * 을 공식 보관소로 본다.** 이유는 두 가지다.
 *   1. 개인정보 보관 지점을 늘리지 않는다 (파기 대상이 한 곳)
 *   2. 문의량 목표가 월 5건(기획서 1.4)이라 메일 라벨 검색으로 관리 가능한 규모
 * 대신 파기 절차를 docs/data-retention.md 에 문서로 남긴다.
 *
 * 문의량이 늘어 DB 가 필요해지면 이 인터페이스 구현체를 추가하기만 하면 된다.
 * 그때 부록 A 제5조 처리위탁 표에 수탁자를 추가해야 한다.
 */

export type InquiryRecord = {
  /** 기획서 5.5 폼 필드 */
  type: string;
  company: string;
  name: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  message: string;
  /** 3년 경과분 식별용 — 보안 체크리스트 A-3 */
  createdAt: string;
};

export type StoreResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "store_failed" };

export interface InquiryStore {
  readonly name: string;
  save(record: InquiryRecord): Promise<StoreResult>;
}

/**
 * 기본 구현 — 아무 곳에도 적재하지 않는다.
 *
 * 메일함이 공식 보관소이므로 이것이 현재의 의도된 동작이다.
 * 로그로도 남기지 않는다: 개인정보가 서버 로그에 남으면 안 된다 (B-4).
 */
export const noopStore: InquiryStore = {
  name: "noop",
  async save() {
    return { ok: true };
  },
};
