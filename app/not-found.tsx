import Link from "next/link";
import { Section } from "@/components/Section";
import { Arrow } from "@/components/Button";

export default function NotFound() {
  return (
    <Section tone="white" size="lg" className="pt-32 md:pt-40">
      <p className="tnum text-sm font-semibold tracking-[0.14em] text-navy-300">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold md:text-4xl">
        요청하신 페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-[1.85] text-navy-100">
        주소가 변경되었거나 삭제된 페이지일 수 있습니다.
      </p>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-semibold text-navy-300 hover:underline"
        >
          홈으로 <Arrow />
        </Link>
        <Link
          href="/#business"
          className="inline-flex items-center gap-1.5 font-semibold text-navy-300 hover:underline"
        >
          사업영역 <Arrow />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 font-semibold text-navy-300 hover:underline"
        >
          문의하기 <Arrow />
        </Link>
      </div>
    </Section>
  );
}
