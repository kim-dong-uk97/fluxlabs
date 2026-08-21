import { Container, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/**
 * AI 쇼케이스 섹션 — Approach 섹션 바로 아래. 영상 자체 배경이 순검정
 * (#000000)이라, 섹션 배경도 동일한 검정으로 맞춰 박스 경계가 보이지
 * 않게 한다.
 */
export function AIShowcaseSection() {
  return (
    <section className="on-navy bg-black py-28 text-white md:py-40">
      <Container>
        <SectionHeading
          description={
            <>
              &ldquo;기존 방식 그대로
              <br />
              더 빠르고 더 똑똑하게&rdquo;
            </>
          }
          descriptionClassName="text-[38px] font-bold leading-[1.4] text-white md:text-[46px]"
          className="mx-auto text-center"
        />

        <Reveal delay={120}>
          <div className="mx-auto mt-14 aspect-video max-w-5xl overflow-hidden rounded-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover"
            >
              <source src="/video/ai-approach.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
