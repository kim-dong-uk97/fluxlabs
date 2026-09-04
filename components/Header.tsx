"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV, NAV_EN } from "@/lib/site";

/**
 * GNB — 기획서 3.1 · 6장
 *
 *  - 상단 고정. 스크롤 100px 이상 시 배경 불투명 + 높이 축소 (6장)
 *  - 사업영역 드롭다운에 4개 하위 항목 직접 노출 (3.1)
 *    넷을 가르는 구분선은 두지 않는다. AI 어시스턴트를 "서비스" 로 떼어
 *    놓던 선이 있었으나, 넷 모두 사업영역으로 다루기로 하면서 걷어냈다.
 *  - 문의하기는 버튼 스타일로 시각적 우선순위 부여 (3.1)
 *  - KOR/ENG 토글은 번역이 있는 라우트(현재 홈만)에서만 활성화 (3.1)
 *  - 로고 크기: PC 160/140px · 태블릿 140px · 모바일 120px (8.3)
 *
 * 로고 색 전환 (8.3 개발 유의):
 *   두 SVG 를 겹쳐 opacity 로 크로스페이드하지 않는다 (8.6 투명도 조절 금지).
 *   인라인 SVG 하나를 두고 fill 값만 #FFFFFF ↔ #2A4269 로 전환한다. 0.2s.
 */

const SCROLL_THRESHOLD = 100;

/** 페이지 최상단이 Navy 배경인 라우트 — 이 경우 GNB 가 투명하게 시작한다 */
function hasDarkHero(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/en" ||
    pathname === "/about" ||
    pathname === "/en/about" ||
    pathname.startsWith("/business") ||
    pathname.startsWith("/en/business")
  );
}

/**
 * 영문 번역이 있는 라우트 짝 — 한국어 경로 → 영어 경로.
 * 여기 없는 경로에서는 KOR/ENG 토글이 비활성 상태로 남는다.
 */
function translationPair(pathname: string): { ko: string; en: string } | null {
  if (pathname === "/" || pathname === "/en") {
    return { ko: "/", en: "/en" };
  }
  if (pathname === "/about" || pathname === "/en/about") {
    return { ko: "/about", en: "/en/about" };
  }
  // 사업영역 상세 — /business/{slug} ↔ /en/business/{slug}
  const koDetail = pathname.match(/^\/business\/([^/]+)$/);
  if (koDetail) {
    return { ko: pathname, en: `/en/business/${koDetail[1]}` };
  }
  const enDetail = pathname.match(/^\/en\/business\/([^/]+)$/);
  if (enDetail) {
    return { ko: `/business/${enDetail[1]}`, en: pathname };
  }
  return null;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const darkHero = hasDarkHero(pathname);
  // 투명 상태: 다크 히어로 페이지의 최상단에서만
  const transparent = darkHero && !scrolled;

  // 영문 번역이 있는 라우트 — 홈과 사업영역(목록·상세)
  const translation = translationPair(pathname);
  const isEnglish = pathname.startsWith("/en");
  const nav = isEnglish ? NAV_EN : NAV;

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
        className={`on-navy fixed inset-x-0 top-0 z-50 transition-[height,background-color,box-shadow] duration-300 ${
          transparent
            ? "h-20 bg-transparent"
            : "h-16 bg-white/15 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center px-5 md:px-10 lg:px-20">
          <div className="flex flex-1 items-center">
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
          </div>

          {/* ---- PC 내비게이션 (가운데 정렬, 하나의 투명 칩으로 묶는다) ---- */}
          {/*
            칩 안쪽 여백을 상하좌우 2px(p-0.5)로 통일한다.
            항목의 hover 배경이 칩 테두리와 같은 중심의 라운드로 딱 맞게
            들어앉도록 항목 반경은 14px(= 칩 16px − 여백 2px)로 맞춘다.
          */}
          <nav
            className="hidden items-center gap-0.5 rounded-2xl border border-white/15 bg-white/5 p-0.5 lg:flex"
            aria-label="주요 메뉴"
          >
            {nav.map((item) =>
              "children" in item ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[14px] px-4 py-1.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden flex-1 items-center justify-end lg:flex">
            <Link
              href="/contact"
              className="inline-flex h-10 origin-center scale-[0.85] items-center gap-1.5 rounded-2xl bg-white px-5 text-[0.95rem] font-semibold text-navy-900 transition-colors hover:bg-navy-100"
            >
              {isEnglish ? "Contact" : "문의하기"}
              <span aria-hidden="true">▸</span>
            </Link>

            {/*
              KOR/ENG 토글 — 기획서 3.1
              번역이 있는 라우트(홈·사업영역)에서는 같은 페이지의 다른 언어판으로
              이동하고, 나머지 페이지에서는 비활성 상태로 남겨둔다.
            */}
            <div className="ml-2 flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[0.8rem] font-medium">
              {translation ? (
                <Link
                  href={translation.ko}
                  aria-current={!isEnglish ? "page" : undefined}
                  className={`px-1 transition-colors ${
                    isEnglish ? "text-white/50 hover:text-white" : "text-white"
                  }`}
                >
                  KOR
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="한국어"
                  className="px-1 text-white"
                >
                  KOR
                </button>
              )}
              <span className="text-white/40" aria-hidden="true">
                /
              </span>
              {translation ? (
                <Link
                  href={translation.en}
                  aria-current={isEnglish ? "page" : undefined}
                  className={`px-1 transition-colors ${
                    isEnglish ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  ENG
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="영문 페이지는 준비 중입니다"
                  className="px-1 text-white/50"
                >
                  ENG
                </button>
              )}
            </div>
          </div>

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
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={nav}
        isEnglish={isEnglish}
      />
    </>
  );
}

/* ------------------------------------------------------------------------- */

type NavItem = (typeof NAV)[number] | (typeof NAV_EN)[number];

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
      {/*
        목록 페이지가 없으므로 링크가 아니라 펼치기 트리거다.
        이동은 하위 4개 분야에서만 일어난다.
      */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={() => setOpen(true)}
        // 마우스가 이미 올라가 open 이 true 인 상태에서 토글하면 클릭이
        // 목록을 닫아버린다. 클릭은 언제나 여는 쪽으로만 동작시킨다.
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className="inline-flex items-center gap-1 rounded-[14px] px-4 py-1.5 text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
      >
        {item.label}
        <span aria-hidden="true" className="text-[0.7em]">
          ▾
        </span>
      </button>

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
  nav,
  isEnglish,
}: {
  open: boolean;
  onClose: () => void;
  nav: typeof NAV | typeof NAV_EN;
  isEnglish: boolean;
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
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.label}>
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
          {isEnglish ? "Contact" : "문의하기"}
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
