import type { Metadata } from "next";
import { Article, Bullets, Clauses, LegalPage } from "@/components/Legal";
import { SITE } from "@/lib/site";

/**
 * 서비스 이용약관 — 부록 B
 *
 * 적용 범위: 회사가 직접 운영하는 AI 어시스턴트 서비스(텔레그램·유튜브 등
 * 외부 플랫폼 기반) 및 홈페이지 이용.
 *
 * 전제: 유료 요소가 없는 무료 서비스 (기획서 4.6 확정).
 * 유료화 시 결제·환불·청약철회 조항과 전자상거래법상 표시사항을 추가해야 한다.
 *
 * ⚠️ 법률 검토 전 초안이다. 게시 전 변호사 또는 법무 담당 검토가 반드시 필요하다.
 * ⚠️ 제7조(AI 생성 결과물 고지)가 이 약관의 핵심 조항이다. 임의 축약 금지.
 */

export const metadata: Metadata = {
  title: "이용약관",
  description: `${SITE.name}가 제공하는 AI 어시스턴트 서비스 및 홈페이지 이용약관입니다.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="서비스 이용약관"
      effectiveDate={SITE.policyEffectiveDate}
      intro={
        <p>
          본 약관은 회사가 제공하는 AI 어시스턴트 서비스 및 홈페이지 이용에
          적용됩니다.
        </p>
      }
    >
      <Article number={1} title="목적">
        <p>
          본 약관은 {SITE.name}(이하 &ldquo;회사&rdquo;)가 제공하는 AI 어시스턴트
          서비스 및 관련 제반 서비스(이하 &ldquo;서비스&rdquo;)의 이용과 관련하여
          회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </Article>

      <Article number={2} title="정의">
        <Clauses
          items={[
            <>
              <strong>&ldquo;서비스&rdquo;</strong>란 회사가 텔레그램, 유튜브 등
              외부 플랫폼 또는 회사 홈페이지를 통해 제공하는 인공지능 기반
              대화·상담·정보 제공 서비스를 말합니다.
            </>,
            <>
              <strong>&ldquo;이용자&rdquo;</strong>란 본 약관에 따라 서비스를
              이용하는 자를 말합니다.
            </>,
            <>
              <strong>&ldquo;생성 결과물&rdquo;</strong>이란 이용자의 입력에
              대응하여 인공지능 모델이 생성한 텍스트 등 일체의 응답을 말합니다.
            </>,
          ]}
        />
      </Article>

      <Article number={3} title="약관의 효력 및 변경">
        <Clauses
          items={[
            "본 약관은 서비스 화면 또는 회사 홈페이지에 게시함으로써 효력이 발생합니다.",
            "회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.",
            <>
              약관을 변경하는 경우 적용일자 및 변경사유를 명시하여 적용일자{" "}
              <strong>7일 전</strong>부터 공지합니다. 다만 이용자에게 불리한
              변경의 경우에는 <strong>30일 전</strong>부터 공지합니다.
            </>,
            "이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.",
          ]}
        />
      </Article>

      <Article number={4} title="서비스의 제공">
        <Clauses
          items={[
            <>
              회사는 다음의 서비스를 제공합니다.
              <div className="mt-2">
                <Bullets
                  items={[
                    "인공지능 기반 대화 및 정보 제공",
                    "기타 회사가 정하는 서비스",
                  ]}
                />
              </div>
            </>,
            <>
              서비스는 <strong>무료로 제공</strong>됩니다.
            </>,
            "서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다.",
          ]}
        />
      </Article>

      <Article number={5} title="서비스의 변경 및 중단">
        <Clauses
          items={[
            "회사는 운영상·기술상의 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.",
            <>
              다음의 경우 사전 통지 없이 서비스 제공을 일시 중단할 수 있습니다.
              <div className="mt-2">
                <Bullets
                  items={[
                    "설비의 보수·점검·교체 등 공사로 인해 부득이한 경우",
                    "정전, 설비 장애, 이용량 폭주 등으로 정상적인 서비스 제공이 불가능한 경우",
                    "서비스가 제공되는 외부 플랫폼(텔레그램, 유튜브 등)의 정책 변경 또는 장애가 발생한 경우",
                    "천재지변 등 불가항력적 사유가 있는 경우",
                  ]}
                />
              </div>
            </>,
          ]}
        />
      </Article>

      <Article number={6} title="이용자의 의무 및 금지행위">
        <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
        <Clauses
          items={[
            "타인의 정보를 도용하거나 허위 정보를 입력하는 행위",
            "회사 또는 제3자의 지식재산권을 침해하는 행위",
            "서비스에 부하를 유발하는 자동화된 방식의 대량 요청 행위",
            "서비스를 역설계하거나, 모델의 내부 지시문을 탈취하려 시도하는 행위",
            "서비스를 이용하여 불법적·유해한 콘텐츠를 생성하거나 이를 유포하는 행위",
            "기타 관련 법령에 위배되는 행위",
          ]}
        />
      </Article>

      {/* 이 약관의 핵심 조항 — AI 생성 답변의 정확성 면책 (기획서 4.6) */}
      <Article number={7} title="인공지능 생성 결과물에 관한 고지">
        <Clauses
          items={[
            <>
              서비스는 인공지능 모델을 기반으로 하며,{" "}
              <strong>
                생성 결과물의 정확성·완전성·최신성·적법성을 보증하지 않습니다.
              </strong>
            </>,
            <>
              인공지능의 특성상 사실과 다른 내용이 생성될 수 있으며, 이용자는
              중요한 판단에 앞서{" "}
              <strong>반드시 별도의 확인 절차를 거쳐야 합니다.</strong>
            </>,
            <>
              생성 결과물은{" "}
              <strong>
                의료·법률·세무·투자 등 전문적 판단을 대체하지 않습니다.
              </strong>{" "}
              해당 분야의 결정은 반드시 자격을 갖춘 전문가의 자문을 받으시기
              바랍니다.
            </>,
            "동일하거나 유사한 입력에 대해서도 서로 다른 결과물이 생성될 수 있습니다.",
            "이용자가 생성 결과물을 신뢰하여 취한 행위 및 그 결과에 대한 책임은 이용자에게 있습니다.",
          ]}
        />
      </Article>

      <Article number={8} title="지식재산권">
        <Clauses
          items={[
            "서비스 및 서비스에 포함된 저작물에 대한 지식재산권은 회사에 귀속됩니다.",
            "이용자가 입력한 내용에 대한 권리는 이용자에게 있습니다.",
            "이용자는 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제·전송·출판·배포·방송하거나 제3자에게 이용하게 하여서는 안 됩니다.",
          ]}
        />
      </Article>

      <Article number={9} title="개인정보의 보호">
        <p>
          회사는 이용자의 개인정보를 보호하기 위해 노력하며, 개인정보의 처리에
          관한 사항은{" "}
          <a href="/privacy" className="font-semibold underline">
            별도의 개인정보처리방침
          </a>
          에 따릅니다.
        </p>
      </Article>

      <Article number={10} title="책임의 제한">
        <Clauses
          items={[
            "회사는 천재지변, 불가항력, 이용자의 귀책사유 또는 서비스가 제공되는 외부 플랫폼의 장애로 인하여 서비스를 제공할 수 없는 경우 책임이 면제됩니다.",
            "회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.",
            "회사는 이용자 상호 간 또는 이용자와 제3자 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임이 없습니다.",
            "본 조의 면책은 관련 법령에서 허용하는 범위 내에서 적용되며, 회사의 고의 또는 중대한 과실로 인한 손해에 대해서는 적용되지 않습니다.",
          ]}
        />
      </Article>

      <Article number={11} title="이용 제한">
        <p>
          회사는 이용자가 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을
          방해한 경우, 사전 통지 없이 서비스 이용을 제한하거나 중지할 수
          있습니다.
        </p>
      </Article>

      <Article number={12} title="분쟁의 해결 및 관할법원">
        <Clauses
          items={[
            "회사와 이용자는 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.",
            "본 약관은 대한민국 법령에 따라 규율되고 해석됩니다.",
            <>
              서비스 이용과 관련하여 회사와 이용자 간에 분쟁이 발생한 경우,
              관할법원은 <strong>민사소송법</strong>에 따릅니다.
            </>,
          ]}
        />
      </Article>

      <section aria-labelledby="addendum">
        <h2 id="addendum" className="text-xl font-bold md:text-2xl">
          부칙
        </h2>
        <p className="mt-5 leading-[1.9]">
          본 약관은 <strong>{SITE.policyEffectiveDate}</strong>부터 시행합니다.
        </p>
      </section>
    </LegalPage>
  );
}
