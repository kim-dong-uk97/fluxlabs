# 플럭스랩스 공식 홈페이지

fluxlabs.co.kr — 기획서 `fluxlabs_홈페이지_기획서_v1.4` 기반 구현

## 스택

| 영역 | 채택 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) + TypeScript |
| 스타일 | Tailwind CSS v4 |
| 폰트 | Pretendard Variable (동적 서브셋, 자체 호스팅) |
| 폼 처리 | 서버리스 Route Handler + SMTP |
| 콘텐츠 | `lib/` 의 타입 지정 데이터 파일 |

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev                  # http://localhost:3000
```

`.env.local` 없이도 사이트는 정상 동작한다. 문의 폼만 발송 단계에서 실패하며,
이 경우 기획서 5.5 정의대로 대표 이메일 안내가 노출된다.

```bash
npm run build       # 프로덕션 빌드
npm run typecheck   # 타입 검사
```

## 문서

| 문서 | 내용 |
|---|---|
| `docs/security-checklist.md` | 보안 점검 체크리스트 (오픈 전 필수) |
| `docs/deviations.md` | **기획서 대비 구현 차이 — 보고용** |
| `docs/data-retention.md` | 개인정보 보유·파기 절차 |

## 디렉터리

```
app/                라우트
  api/contact/      문의 접수 엔드포인트
components/         UI 컴포넌트
lib/                콘텐츠 데이터 · 검증 · 메일/저장소 어댑터
styles/pretendard/  폰트 (번들러가 해시 처리)
docs/               프로젝트 문서
```

## 코드를 고치기 전에 알아야 할 것

이 프로젝트에는 **법적 의무 또는 CI 가이드에 직결되어 임의로 바꾸면 안 되는 코드**가 있다.
해당 위치에는 근거가 주석으로 달려 있다.

| 위치 | 제약 |
|---|---|
| `components/Footer.tsx` | 개인정보처리방침 링크 **볼드 처리는 법적 의무**. 다른 링크와 시각적으로 구분되어야 한다 (기획서 3.2) |
| `components/Logo.tsx` | 로고 색은 승인된 3색만. `currentColor` 금지, 비율 왜곡 금지, 회전 금지 (기획서 8.6) |
| `lib/business.ts` | 협업 상대사 사명·업종·규모, 병원 실명·지역 **미표기**. "상급종합병원"·"계열사"·"자회사" 사용 금지 (기획서 4.2·4.5·10장) |
| `lib/ceo-message.ts` | 대표 메시지는 확정 원고. **임의 수정·축약 금지**. 줄바꿈도 원고 의도 (기획서 5.2) |
| `lib/site.ts` | 등기·사업자등록증 기준 확정값 |
| `app/api/contact/route.ts` | 수신자는 환경변수 하드코딩. 요청 값에서 받으면 스팸 릴레이가 된다 (체크리스트 B-2) |
| `next.config.ts` | 보안 헤더. 제거 금지 (체크리스트 B-7) |

새 코드를 쓸 때도 `docs/security-checklist.md` 를 따르고, 근거를 주석으로 남긴다.

## 오픈 전 필수 확인

`docs/security-checklist.md` 의 C·D 섹션을 전부 확인한다. 특히:

- [ ] 부록 A 제5조 **처리위탁 업체 목록** 기재 (호스팅·메일·분석 확정 후)
- [ ] 국외 사업자 사용 시 **"개인정보의 국외 이전"** 조항 추가
- [ ] 부록 A·B **법률 검토**
- [ ] 방침·약관 시행일(2026-08-31)과 실제 오픈일 정합성
- [ ] 계정 2FA (GitHub · 도메인 등록기관 · 메일 · 호스팅)
