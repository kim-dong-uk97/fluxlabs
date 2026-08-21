import Link from "next/link";
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
 */
export function Footer() {
  return (
    <footer className="on-navy bg-ink-950 text-navy-100">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 md:px-10 lg:px-20">
        <Logo variant="compact" tone="white" width={160} decorative />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-base font-semibold text-white">
              {SITE.name}{" "}
              <span className="font-normal text-navy-300">({SITE.nameEn})</span>
            </p>

            <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed">
              <p>{SITE.address}</p>
              <p>
                대표이사 {SITE.ceo}
                <Divider />
                사업자등록번호 <span className="tnum">{SITE.businessNumber}</span>
              </p>
              <p>
                TEL{" "}
                <a href={`tel:${SITE.tel.replaceAll("-", "")}`} className="tnum hover:text-white">
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
              개인정보 보호책임자 {SITE.privacyOfficer.name}{" "}
              {SITE.privacyOfficer.title}
            </p>
          </div>

          <nav aria-label="정책 및 문의">
            <ul className="space-y-3 text-sm md:text-right">
              <li>
                {/*
                  볼드 처리는 법적 의무다. 다른 링크와 시각적으로 구분되어야 한다.
                  임의로 font-normal 로 바꾸지 말 것. (기획서 3.2)
                */}
                <Link href="/privacy" className="font-bold text-white hover:underline">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white hover:underline">
                  채용문의
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
