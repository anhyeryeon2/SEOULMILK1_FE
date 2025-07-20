import DeleteXIcon from '../../src/Icon/DeleteXIcon';

interface ModalProps {
  onClose: () => void;
}

const AgreeModal = ({ onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="w-[576px] h-[716px] px-8 py-[42px] flex flex-col gap-6 rounded-[32px] bg-white shadow-lg relative">
        <div className="relative w-full flex justify-center">
          <span className="block text-gray-800 text-xl font-semibold text-center">
            개인정보 수집 및 이용 동의
          </span>

          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 cursor-pointer"
          >
            <DeleteXIcon stroke="#949BA7" />
          </button>
        </div>

        <div className="text-gray-800 text-ellipsis overflow-y-scroll custom-scrollbar">
          <p>
            <p>
              서울우유협동조합(이하 '회사')은 자동화 프로그램 서비스 제공을 위해
              아래와 <br />
              같이 개인정보를 수집・이용하고자 합니다.
              <p>
                내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.
              </p>
            </p>
          </p>
          <br />
          <p>
            <strong>1. 수집하는 개인정보 항목</strong>
            <p>필수항목 : </p>
            <li className="ml-1"> 기본정보</li>
            <li className="ml-10"> 이름</li>
            <li className="ml-10"> 아이디</li>
            <li className="ml-10"> 비밀번호</li>
            <li className="ml-10"> 휴대전화 번호</li>
            <li className="ml-10"> 이메일 주소</li>
            <li className="ml-10"> 소속 대리점명 </li>
          </p>
          <li className="ml-1"> 세금계산서 관련 정보</li>
          <li className="ml-10"> 공급자/공급받는 자 정보 </li>
          <li className="ml-10"> 사업자등록번호</li>
          <li className="ml-10"> 대표자명</li>
          <li className="ml-10"> 사업장 주소</li>
          <li className="ml-10"> 이메일 주소</li>
          <li className="ml-10"> 업태 및 종목 </li>

          <p>
            <p>자동 수집 항목</p>
            <li className="ml-1"> IP 주소</li>
            <li className="ml-1"> 접속 로그</li>
            <li className="ml-1"> 서비스 이용 기록</li>
          </p>
          <br />
          <p>
            <strong> 2. 개인정보의 수집 및 이용목적</strong>
            <p className="ml-2">1. 서비스 제공 및 관리</p>
            <li className="ml-10"> 세금계산서 업로드/승인 서비스 제공</li>
            <li className="ml-10"> 지급결제서 처리 및 송부</li>
            <li className="ml-10"> 기록 보관 및 관리</li>

            <p className="ml-2">2. 사용자 식별 및 본인인증</p>
            <li className="ml-10"> 서비스 이용자 확인</li>
            <li className="ml-10"> 접근 권한 관리</li>
            <li className="ml-10"> 긴급 사항 통보</li>

            <p className="ml-2">3. 고지사항 전달</p>
            <li className="ml-10"> 서비스 관련 공지</li>
            <li className="ml-10"> 처리 결과 알림</li>
            <li className="ml-10"> 부정 이용 방지</li>
          </p>
          <br />
          <p>
            <strong> 3. 개인정보의 보유 및 이용기간</strong>
            <p className="ml-2">1. 회원 탈퇴 시까지 보관하는 정보</p>
            <li className="ml-10"> 기본 로그인 정보</li>
            <li className="ml-10"> 연락처 정보</li>

            <p className="ml-2">2. 관련 법령에 따른 보관</p>
            <li className="ml-10">
              {' '}
              전자세금계산서 관련 정보: 5년 (전자세금계산서 유통에 관한 사항)
            </li>
            <li className="ml-10"> 계약 또는 청약철회 등에 관한 기록: 5년</li>
            <li className="ml-10">
              {' '}
              대금결제 및 재화 등의 공급에 관한 기록: 5년
            </li>
            <li className="ml-10">
              {' '}
              소비자의 불만 또는 분쟁처리에 관한 기록: 3년
            </li>
            <li className="ml-10"> 로그인 기록: 3개월</li>
          </p>

          <br />
          <p>
            <strong> 4. 개인정보의 파기절차 및 방법</strong>
            <p className="ml-2">1. 파기절차</p>
            <li className="ml-10">
              {' '}
              이용자가 회원탈퇴를 요청하거나 개인정보 수집·이용목적이 달성된
              후에는 보유기간 및 이용기간에 따라 해당 정보를 지체 없이
              파기합니다.
            </li>
            <li className="ml-10">
              {' '}
              관계 법령에 따라 보존할 필요가 있는 경우에는 해당 정보를 별도의
              데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
            </li>

            <p className="ml-2">2. 파기방법</p>
            <li className="ml-10">
              전자적 파일 형태: 복구 불가능한 방법으로 영구 삭제
            </li>
            <li className="ml-10">기록물, 인쇄물: 파쇄 또는 소각</li>
          </p>
          <br />
          <p>
            <strong> 5. 동의 거부권 및 거부 시 불이익</strong>
            <li className="ml-1">
              {' '}
              개인정보 수집·이용에 대한 동의를 거부할 수 있습니다.
            </li>
            <li className="ml-1">
              {' '}
              필수항목에 대한 동의 거부 시 서비스 이용이 제한됩니다.
            </li>
          </p>
          <br />
          <strong> 6. 개인정보의 안전성 확보 조치</strong>
          <p>
            {' '}
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다:
          </p>
          <p className="ml-2">1. 관리적 조치</p>
          <li className="ml-10">내부관리계획 수립 및 시행</li>
          <li className="ml-10">정기적 직원 교육</li>

          <p className="ml-2">2. 기술적 조치</p>
          <li className="ml-10">개인정보처리시스템 접근 권한 관리</li>
          <li className="ml-10">개인정보 암호화</li>
          <li className="ml-10">보안프로그램 설치 및 갱신</li>
          <li className="ml-10">접속기록의 보관</li>

          <p className="ml-2">3. 물리적 조치</p>
          <li className="ml-10">전산실, 자료보관실 등의 접근통제</li>

          <br />
          <strong>
            ※ 개인정보 보호법 제15조 및 제22조에 따라 개인정보의 수집·이용에
            관하여 <br /> 고지하고 동의를 받아야 합니다.
          </strong>
        </div>
      </div>
    </div>
  );
};

export default AgreeModal;
