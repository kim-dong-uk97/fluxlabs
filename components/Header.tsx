"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/site";

/**
 * GNB — 기획서 3.1 · 6장
 *
 *  - 상단 고정. 스크롤 100px 이상 시 배경 불투명 + 높이 축소 (6장)
 *  - 사업영역 드롭다운에 4개 하위 항목 직접 노출 (3.1)
 *  - 문의하기는 버튼 스타일로 시각적 우선순위 부여 (3.1)
 *  - KOR/ENG 토글은 Phase 2. 마크업만 심고 비활성 처리 (3.1)
 *  - 로고 크기: PC 160/140px · 태블릿 140px · 모바일 120px (8.3)
 *
 * 로고 색 전환 (8.3 개발 유의):
 *   두 SVG 를 겹쳐 opacity 로 크로스페이드하지 않는다 (8.6 투명도 조절 금지).
 *   인라인 SVG 하나를 두고 fill 값만 #FFFFFF ↔ #2A4269 로 전환한다. 0.2s.
 */

const SCROLL_THRESHOLD = 100;

/** 페이지 최상단이 Navy 배경인 라우트 — 이 경우 GNB 가 투명하게 시작한다 */
function hasDarkHero(pathname: string): boolean {
  return pathname === "/" || pathname.startsWith("/business");
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const darkHero = hasDarkHero(pathname);
  // 투명 상태: 다크 히어로 페이지의 최상단에서만
  const transparent = darkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // 새로고침으로 중간 위치에서 진입한 경우 대응
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트가 바뀌면 모바일 메뉴를 닫는다
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // 모바일 메뉴가 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // ESC 로 모바일 메뉴 닫기 (접근성)
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        본문으로 건너뛰기
      </a>

      <header
        className={`on-navy fixed inset-x-0 top-0 z-50 transition-[background-color,height,box-shadow] duration-300 ${
          transparent
            ? "h-20 bg-transparent"
            : "h-16 bg-ink-950/90 shadow-[0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-20">
          <Link
            href="/"
            aria-label="플럭스랩스 홈"
            // 로고를 링크로 쓸 때 밑줄이 상속되지 않도록 (8.6 추가 금지 사항)
            className="no-underline"
          >
            <Logo
              variant="primary"
              tone="white"
              width={160}
              decorative
              className={
                transparent
                  ? "w-[120px] md:w-[140px] lg:w-[160px]"
                  : "w-[120px] md:w-[140px]"
              }
            />
          </Link>

          {/* ---- PC 내비게이션 ---- */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="주요 메뉴"
          >
            {NAV.map((item) =>
              "children" in item ? (
                <DesktopDropdown key={item.href} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-4 py-2 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ),
            )}

            <span className="mx-3 h-4 w-px bg-white/25" aria-hidden="true" />

            <Link
              href="/contact"
              className="inline-flex h-10 origin-center scale-[0.85] items-center gap-1.5 rounded-md bg-white px-5 text-[0.95rem] font-semibold text-navy-900 transition-colors hover:bg-navy-100"
            >
              문의하기
              <span aria-hidden="true">▸</span>
            </Link>

            {/*
              KOR/ENG 토글 — Phase 2 (기획서 3.1)
              오픈 시점에는 마크업만 심고 비활성 처리한다.
              disabled 버튼이라 키보드 포커스도 받지 않는다.
            */}
            <div className="ml-2 flex items-center text-[0.8rem] font-medium">
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="한국어"
                className="px-1.5 text-white"
              >
                KOR
              </button>
              <span className="text-white/40" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="영문 페이지는 준비 중입니다"
                className="px-1.5 text-white/50"
              >
                ENG
              </button>
            </div>
          </nav>

          {/* ---- 모바일 햄버거 ---- */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="-mr-2 flex size-11 items-center justify-center rounded-md text-white lg:hidden"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* ---- 모바일 풀스크린 오버레이 (기획서 6장) ---- */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* ------------------------------------------------------------------------- */

type NavItem = (typeof NAV)[number];

function DesktopDropdown({
  item,
}: {
  item: Extract<NavItem, { children: readonly unknown[] }>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      // 키보드 사용자를 위해 포커스가 그룹 밖으로 나가면 닫는다
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
      >
        {item.label}
        <span aria-hidden="true" className="text-[0.7em]">
          ▾
        </span>
      </Link>

      {open && (
        <div className="absolute top-full left-0 pt-2">
          <ul className="min-w-[16rem] rounded-lg border border-white/10 bg-ink-900 py-2 shadow-lg">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className="block px-4 py-2.5 text-[0.9rem] text-white transition-colors hover:bg-white/5"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [businessOpen, setBusinessOpen] = useState(false);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      // 오버레이 배경 navy-950 (기획서 8.3)
      className="on-navy fixed inset-0 z-40 overflow-y-auto bg-ink-950 pt-16 lg:hidden"
    >
      <div className="px-5 pb-16">
        <nav aria-label="모바일 메뉴">
          <ul className="divide-y divide-white/10">
            {NAV.map((item) =>
              "children" in item ? (
                <li key={item.href}>
                  {/* 사업영역 아코디언 (기획서 6장) */}
                  <button
                    type="button"
                    onClick={() => setBusinessOpen((v) => !v)}
                    aria-expanded={businessOpen}
                    className="flex w-full items-center justify-between py-5 text-left text-xl font-semibold text-white"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-sm transition-transform duration-200 ${
                        businessOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {businessOpen && (
                    <ul className="pb-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block py-3 pl-4 text-navy-100"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-5 text-xl font-semibold text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link
          href="/contact"
          onClick={onClose}
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-white font-semibold text-navy-900"
        >
          문의하기
          <span aria-hidden="true">▸</span>
        </Link>
      </div>
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M5 5l14 14" />
          <path d="M19 5L5 19" />
        </>
      ) : (
        <>
          <path d="M3 7h18" />
          <path d="M3 12h18" />
          <path d="M3 17h18" />
        </>
      )}
    </svg>
  );
}
