import { SITE } from "./site";

/**
 * JSON-LD 직렬화
 *
 * 보안 체크리스트 B-6 — `dangerouslySetInnerHTML` 을 쓰지 않는다.
 *
 * JSON-LD 는 보통 dangerouslySetInnerHTML 로 넣지만, React 는 <script> 의
 * 텍스트 자식에서 `<`, `>`, `&` 를 HTML 엔티티로 이스케이프한다. 브라우저는
 * script 안의 엔티티를 되돌리지 않으므로 JSON 이 깨진다.
 *
 * 그래서 그 세 문자를 **JSON 유니코드 이스케이프**로 미리 바꾼다.
 * 결과 문자열에는 해당 문자가 아예 없으므로 React 가 손댈 것이 없고,
 * JSON.parse 는 < 를 정상적으로 `<` 로 복원한다.
 *
 * 부수 효과로 `</script>` 조기 종료 문제도 함께 막힌다.
 */
export function jsonLdString(data: object): string {
  return JSON.stringify(data)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026");
}

/** Organization 스키마 — 기획서 7.4 (사명, 주소, 전화번호, 로고) */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  email: SITE.email,
  telephone: SITE.tel,
  foundingDate: "2015-02-26",
  address: {
    "@type": "PostalAddress",
    streetAddress: "동교로12길 38, 5층 (서교동, JH빌딩)",
    addressLocality: SITE.addressLocality,
    addressRegion: SITE.addressRegion,
    addressCountry: "KR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.tel,
    email: SITE.email,
    contactType: "customer support",
    areaServed: "KR",
    availableLanguage: ["Korean"],
  },
  description: SITE.description,
};
