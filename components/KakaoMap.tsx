"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 카카오맵 임베드 — 기획서 5.2 오시는 길
 *
 * ⚠️ 보안 체크리스트 B-5
 *    카카오 JS 키는 원래 브라우저에 노출되는 종류라 NEXT_PUBLIC_ 접두사가 맞다.
 *    **다만 카카오 개발자 콘솔에서 도메인 화이트리스트를 반드시 등록해야 한다.**
 *    등록하지 않으면 키를 복사해 간 누구나 우리 쿼터를 쓸 수 있다.
 *
 * 키가 없으면 지도를 로드하지 않고 외부 링크 폴백을 렌더링한다.
 * 따라서 키 없이도 페이지는 정상 동작하며, 불필요한 외부 요청도 발생하지 않는다.
 *
 * 좌표는 하드코딩하지 않고 주소 → 좌표 변환(geocoder)으로 얻는다.
 * 주소가 바뀌어도 lib/site.ts 한 곳만 고치면 지도가 따라온다.
 */

/* Kakao Maps SDK 중 실제로 쓰는 부분만 좁게 선언한다 */
type LatLng = { __latlng: never };
type KakaoMapsApi = {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => LatLng;
  Map: new (
    container: HTMLElement,
    options: { center: LatLng; level: number },
  ) => { setCenter: (latlng: LatLng) => void };
  Marker: new (options: { map: unknown; position: LatLng }) => unknown;
  ZoomControl: new () => unknown;
  ControlPosition: { RIGHT: unknown };
  services: {
    Geocoder: new () => {
      addressSearch: (
        address: string,
        callback: (
          result: { x: string; y: string }[],
          status: string,
        ) => void,
      ) => void;
    };
    Status: { OK: string };
  };
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMapsApi };
  }
}

const SCRIPT_ID = "kakao-maps-sdk";

type Props = {
  /** 표시할 주소 */
  address: string;
  /** 마커 라벨 겸 접근성 설명에 쓰인다 */
  placeName: string;
  /** 지도를 못 쓸 때 이동시킬 외부 링크 */
  fallbackHref: string;
};

type Status = "idle" | "loading" | "ready" | "unavailable";

export function KakaoMap({ address, placeName, fallbackHref }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const [status, setStatus] = useState<Status>(appKey ? "loading" : "unavailable");

  useEffect(() => {
    if (!appKey) return;

    let cancelled = false;

    function initMap() {
      const kakao = window.kakao;
      const container = containerRef.current;
      if (cancelled || !kakao || !container) return;

      const maps = kakao.maps;
      const geocoder = new maps.services.Geocoder();

      geocoder.addressSearch(address, (result, resultStatus) => {
        if (cancelled || !containerRef.current) return;

        if (resultStatus !== maps.services.Status.OK || result.length === 0) {
          // 주소 변환 실패 — 지도를 비워 두지 말고 폴백으로 내린다
          setStatus("unavailable");
          return;
        }

        const { x, y } = result[0];
        const center = new maps.LatLng(Number(y), Number(x));

        const map = new maps.Map(containerRef.current, { center, level: 3 });
        new maps.Marker({ map, position: center });

        setStatus("ready");
      });
    }

    function loadSdk() {
      if (window.kakao?.maps) {
        window.kakao.maps.load(initMap);
        return;
      }

      const existing = document.getElementById(SCRIPT_ID);
      if (existing) {
        existing.addEventListener("load", () => window.kakao?.maps.load(initMap));
        return;
      }

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      // autoload=false 로 두고 maps.load() 로 명시적으로 초기화한다
      script.src =
        `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey!)}` +
        `&autoload=false&libraries=services`;
      script.onload = () => window.kakao?.maps.load(initMap);
      script.onerror = () => {
        if (!cancelled) setStatus("unavailable");
      };
      document.head.appendChild(script);
    }

    loadSdk();

    return () => {
      cancelled = true;
    };
  }, [appKey, address]);

  // 키가 없거나 로드에 실패한 경우 — 외부 링크 폴백
  if (status === "unavailable") {
    return (
      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-white/10 bg-ink-900 transition-colors hover:border-white/25"
      >
        <MapPinIcon />
        <span className="mt-4 font-semibold text-white">
          카카오맵에서 위치 보기
        </span>
        <span className="mt-1 text-sm text-navy-300">{placeName}</span>
      </a>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10">
      <div
        ref={containerRef}
        className="aspect-[4/3] w-full"
        // 지도는 시각 정보다. 스크린리더에는 주소 텍스트가 이미 제공된다.
        role="img"
        aria-label={`${placeName} 위치 지도`}
      />

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink-900">
          <span className="text-sm text-navy-300">지도를 불러오는 중…</span>
        </div>
      )}

      <a
        href={fallbackHref}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 bottom-3 rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-navy-900 shadow-md hover:bg-white"
      >
        큰 지도로 보기
      </a>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-10 text-navy-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
