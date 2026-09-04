"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

/**
 * Footer — 기획서 3.2
 *
 *  - 로고: Compact / White / W160px, 배경 navy-975 (8.3)
 *  - 개인정보처리방침 링크는 **볼드 처리 필수** — 개인정보보호법상 다른 링크와
 *    구분되게 표시할 의무 (3.2 개발 참고 · 보안 체크리스트 C-3)
 *  - 개인정보 보호책임자 상시 노출 (10장 · 보안 체크리스트 C-3)
 *  - 법인등록번호는 필수 기재사항이 아니므로 미노출 (3.2)
 *
 * /en 이하에서는 라벨만 영어로 바뀐다. Header 와 같은 방식(경로로 판별)이라
 * 언어 상태를 따로 들고 다닐 필요가 없다.
 *
 * ⚠️ 사람 이름(대표이사·개인정보 보호책임자)은 영문판에서도 한글 그대로 둔다.
 *    로마자 표기는 등기·명함 표기와 어긋나면 안 되는 값이라 임의로 만들지 않는다.
 *    공식 표기를 받으면 SITE 에 ceoEn / privacyOfficer.nameEn 을 추가할 것.
 */
export function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  const t = isEnglish
    ? {
        ceo: "CEO",
        businessNumber: "Business Reg. No.",
        privacyOfficer: "Privacy Officer",
        privacyOfficerTitle: "Head of Development",
        navLabel: "Policies and contact",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        careers: "Careers",
      }
    : {
        ceo: "대표이사",
        businessNumber: "사업자등록번호",
        privacyOfficer: "개인정보 보호책임자",
        privacyOfficerTitle: SITE.privacyOfficer.title,
        navLabel: "정책 및 문의",
        privacy: "개인정보처리방침",
        terms: "이용약관",
        careers: "채용문의",
      };

  return (
    <footer className="on-navy bg-ink-950 text-navy-100">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 md:px-10 lg:px-20">
        <Logo variant="compact" tone="white" width={160} decorative />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            {/* 영문판은 법인 영문명을 앞에, 한글 상호를 괄호에 — 한국어판과 반대다 */}
            <p className="text-base font-semibold text-white">
              {isEnglish ? SITE.nameEn : SITE.name}{" "}
              <span className="font-normal text-navy-300">
                ({isEnglish ? SITE.name : SITE.nameEn})
              </span>
            </p>

            <address className="mt-3 space-y-1 text-sm leading-relaxed not-italic">
              <p>{isEnglish ? SITE.addressEn : SITE.address}</p>
              <p>
                {t.ceo} {SITE.ceo}
                <Divider />
                {t.businessNumber}{" "}
                <span className="tnum">{SITE.businessNumber}</span>
              </p>
              <p>
                TEL{" "}
                <a
                  href={`tel:${SITE.tel.replaceAll("-", "")}`}
                  className="tnum hover:text-white"
                >
                  {SITE.tel}
                </a>
                <Divider />
                E-MAIL{" "}
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </p>
            </address>

            {/* 개인정보 보호책임자 상시 노출 — 기획서 10장 */}
            <p className="mt-3 text-sm text-navy-300">
              {t.privacyOfficer} {SITE.privacyOfficer.name}{" "}
              {t.privacyOfficerTitle}
            </p>
          </div>

          <nav aria-label={t.navLabel}>
            <ul className="space-y-3 text-sm md:text-right">
              <li>
                {/*
                  볼드 처리는 법적 의무다. 다른 링크와 시각적으로 구분되어야 한다.
                  임의로 font-normal 로 바꾸지 말 것. (기획서 3.2)
                */}
                <Link
                  href="/privacy"
                  className="font-bold text-white hover:underline"
                >
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white hover:underline"
                >
                  {t.careers}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-navy-500">
          © {new Date().getFullYear()} {SITE.nameEn} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Divider() {
  return (
    <span className="mx-2 text-navy-700" aria-hidden="true">
      |
    </span>
  );
}
