import type { Metadata } from "next";
import {
  Article,
  Bullets,
  Clauses,
  LegalPage,
  LegalTable,
} from "@/components/Legal";
import { SITE } from "@/lib/site";

/**
 * 개인정보처리방침 — 부록 A
 *
 * ⚠️ 법률 검토 전 초안이다. 게시 전 변호사 또는 법무 담당 검토가 반드시 필요하다.
 *
 * ⚠️ 제5조 처리위탁 표에는 **실제 사용하는 사업자명을 전부 기재**해야 한다.
 *    현재는 호스팅·메일 발송·분석 도구가 미확정이라 확정 대기 상태로 두었다.
 *    (기획서 9.2 E항목 — 스택 확정과 동시에 처리할 것)
 *
 * ⚠️ 국외 사업자를 이용하는 경우 "개인정보의 국외 이전" 조항을 추가하고
 *    이전받는 자·국가·시점·항목·목적·보유기간을 모두 고지할 법적 의무가 있다.
 */

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE.name}의 개인정보처리방침입니다.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="개인정보처리방침"
      effectiveDate={SITE.policyEffectiveDate}
      noticeDate={SITE.policyNoticeDate}
      intro={
        <p>
          {SITE.name}(이하 &ldquo;회사&rdquo;)는 「개인정보 보호법」 등 관련
          법령을 준수하며, 이용자의 개인정보를 보호하기 위해 다음과 같이
          개인정보처리방침을 수립·공개합니다.
        </p>
      }
    >
      <Article number={1} title="개인정보의 수집 항목 및 수집 방법">
        <p>회사는 다음의 개인정보를 수집합니다.</p>

        <h3 className="pt-2 font-bold">1. 문의하기 (홈페이지 문의 폼)</h3>
        <LegalTable
          headers={["구분", "항목"]}
          rows={[
            ["필수", "회사명, 성명, 이메일, 문의 내용"],
            ["선택", "직함, 연락처"],
            ["자동 수집", "접속 IP, 쿠키, 접속 일시, 브라우저 및 기기 정보"],
          ]}
        />

        <h3 className="pt-4 font-bold">2. 채용 지원 (이메일 접수)</h3>
        <LegalTable
          headers={["구분", "항목"]}
          rows={[
            [
              "필수",
              "성명, 이메일, 연락처, 이력 및 경력 사항 등 지원자가 제출한 서류에 기재된 정보",
            ],
          ]}
        />

        <h3 className="pt-4 font-bold">
          3. AI 어시스턴트 서비스 (텔레그램·유튜브 등)
        </h3>
        <LegalTable
          headers={["구분", "항목"]}
          rows={[
            [
              "필수",
              "각 플랫폼이 제공하는 이용자 식별값, 이용자가 입력한 대화 내용",
            ],
            ["자동 수집", "서비스 이용 일시, 이용 기록"],
          ]}
        />

        <p className="pt-2">
          회사는 이용자가 서비스를 이용하는 과정에서 개인정보를 수집하며, 별도의
          회원가입 절차를 두고 있지 않습니다.
        </p>
      </Article>

      <Article number={2} title="개인정보의 처리 목적">
        <p>
          회사는 수집한 개인정보를 다음의 목적으로만 이용하며, 목적이 변경될
          경우 사전에 동의를 받습니다.
        </p>
        <Clauses
          items={[
            <>
              <strong>문의 응대</strong> — 문의 내용 확인, 회신, 상담 이력 관리
            </>,
            <>
              <strong>채용 절차 진행</strong> — 지원자 식별, 전형 진행, 결과 통지
            </>,
            <>
              <strong>서비스 제공</strong> — AI 어시스턴트 응답 생성 및 제공
            </>,
            <>
              <strong>서비스 개선</strong> — 이용 통계 분석, 서비스 품질 개선
            </>,
            <>
              <strong>법령상 의무 이행</strong> — 관계 법령에 따른 기록 보존
            </>,
          ]}
        />
      </Article>

      <Article number={3} title="개인정보의 보유 및 이용기간">
        <LegalTable
          headers={["수집 목적", "보유기간"]}
          rows={[
            ["문의 응대", <strong key="a">문의 처리 완료 후 3년</strong>],
            [
              "채용 지원",
              <>
                <strong>채용 절차 종료 후 1년</strong> (지원자가 삭제를 요청하는
                경우 즉시 파기)
              </>,
            ],
            [
              "AI 어시스턴트 이용 기록",
              <strong key="c">수집일로부터 3개월</strong>,
            ],
            ["자동 수집 정보", <strong key="d">수집일로부터 1년</strong>],
          ]}
        />
        <p>
          법령에서 별도의 보존기간을 정한 경우에는 해당 기간 동안 보관합니다.
        </p>
      </Article>

      <Article number={4} title="개인정보의 제3자 제공">
        <p>
          회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만 다음의
          경우는 예외로 합니다.
        </p>
        <Clauses
          items={[
            "이용자가 사전에 동의한 경우",
            "법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우",
          ]}
        />
      </Article>

      <Article number={5} title="개인정보 처리의 위탁">
        <p>
          회사는 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고
          있습니다.
        </p>
        <LegalTable
          headers={["수탁자", "위탁 업무", "보유·이용기간"]}
          rows={[
            [
              "[ 호스팅 사업자명 ]",
              "웹사이트 호스팅 및 서버 운영",
              "위탁계약 종료 시까지",
            ],
            [
              "[ 메일 발송 서비스명 ]",
              "문의 접수 알림 발송",
              "위탁계약 종료 시까지",
            ],
            [
              "[ 분석 도구 제공자 ]",
              "서비스 이용 통계 분석",
              "위탁계약 종료 시까지",
            ],
          ]}
        />
      </Article>

      <Article number={6} title="정보주체의 권리와 행사 방법">
        <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
        <Clauses
          items={[
            "개인정보 열람 요구",
            "오류 등이 있을 경우 정정 요구",
            "삭제 요구",
            "처리 정지 요구",
          ]}
        />
        <p>
          권리 행사는 회사 대표 이메일(
          <a href={`mailto:${SITE.email}`} className="font-semibold underline">
            {SITE.email}
          </a>
          )로 요청하실 수 있으며, 회사는 지체 없이 조치합니다. 이용자의 대리인을
          통해서도 행사할 수 있으며, 이 경우 위임장을 제출하여야 합니다.
        </p>
      </Article>

      <Article number={7} title="개인정보의 파기">
        <p>
          회사는 보유기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 해당
          정보를 파기합니다.
        </p>
        <Bullets
          items={[
            <>
              <strong>전자적 파일</strong> — 복구가 불가능한 방법으로 영구 삭제
            </>,
            <>
              <strong>종이 문서</strong> — 분쇄하거나 소각
            </>,
          ]}
        />
      </Article>

      <Article number={8} title="개인정보의 안전성 확보 조치">
        <p>
          회사는 개인정보의 안전성 확보를 위해 다음의 조치를 취하고 있습니다.
        </p>
        <Clauses
          items={[
            <>
              <strong>관리적 조치</strong> — 내부관리계획 수립·시행, 취급 담당자
              최소화 및 교육
            </>,
            <>
              <strong>기술적 조치</strong> — 접근권한 관리, 접근통제시스템 설치,
              개인정보의 암호화, 보안프로그램 설치
            </>,
            <>
              <strong>물리적 조치</strong> — 전산실 및 자료보관실 접근 통제
            </>,
          ]}
        />
      </Article>

      <Article
        number={9}
        title="개인정보 자동 수집 장치의 설치·운영 및 거부"
      >
        <p>
          회사는 이용자에게 맞춤 서비스를 제공하기 위해 쿠키(cookie)를
          사용합니다.
        </p>
        <Bullets
          items={[
            <>
              <strong>사용 목적</strong> — 접속 빈도 및 방문 시간 분석, 이용 형태
              파악을 통한 서비스 개선
            </>,
            <>
              <strong>거부 방법</strong> — 웹 브라우저 설정에서 쿠키 허용 여부를
              선택할 수 있습니다. 다만 쿠키 저장을 거부할 경우 일부 서비스 이용에
              제한이 있을 수 있습니다.
            </>,
          ]}
        />
      </Article>

      <Article number={10} title="개인정보 보호책임자">
        <p>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
          관련한 이용자의 불만 및 피해구제를 처리하기 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <LegalTable
          headers={["구분", "내용"]}
          rows={[
            ["성명", <strong key="n">{SITE.privacyOfficer.name}</strong>],
            ["직책", <strong key="t">{SITE.privacyOfficer.title}</strong>],
            [
              "연락처",
              `${SITE.privacyOfficer.tel} / ${SITE.privacyOfficer.email}`,
            ],
          ]}
        />
        <p>
          이용자는 서비스를 이용하면서 발생한 모든 개인정보 보호 관련 문의,
          불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실
          수 있습니다. 회사는 지체 없이 답변 및 처리해 드리겠습니다.
        </p>
      </Article>

      <Article number={11} title="권익침해 구제 방법">
        <p>
          이용자는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에
          분쟁해결이나 상담 등을 신청할 수 있습니다.
        </p>
        <LegalTable
          headers={["기관", "전화", "홈페이지"]}
          rows={[
            ["개인정보분쟁조정위원회", "1833-6972", "www.kopico.go.kr"],
            ["개인정보침해신고센터", "(국번없이) 118", "privacy.kisa.or.kr"],
            ["대검찰청 사이버수사과", "(국번없이) 1301", "www.spo.go.kr"],
            ["경찰청 사이버수사국", "(국번없이) 182", "ecrm.police.go.kr"],
          ]}
        />
      </Article>

      <Article number={12} title="개인정보처리방침의 변경">
        <p>
          본 방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의
          추가·삭제 및 정정이 있는 경우에는 변경사항의 시행{" "}
          <strong>7일 전</strong>부터 홈페이지를 통하여 고지합니다.
        </p>
        <Bullets
          items={[
            <>
              <strong>공고일자</strong> {SITE.policyNoticeDate}
            </>,
            <>
              <strong>시행일자</strong> {SITE.policyEffectiveDate}
            </>,
          ]}
        />
      </Article>
    </LegalPage>
  );
}
