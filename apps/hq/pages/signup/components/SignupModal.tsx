import { useNavigate } from 'react-router-dom';
import SignupCheck from '../../../../../src/Icon/SignupCheck';

const SignupModal = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col w-[480px] px-8 py-[42px] justify-center items-center rounded-[32px] drop-shadow-elevation1 bg-white">
        <div className="flex w-16 h-16 justify-center items-center rounded-[48px] bg-primary-700">
          <SignupCheck />
        </div>
        <span className="mt-4 text-gray-800 font-3xl-bold">
          회원가입 신청 완료
        </span>
        <span className="text-gray-500 text-center font-2xl-medium">
          신청이 완료되었습니다.
          <br />
          가입 승인을 기다려 주세요.
        </span>

        <button
          className="mt-14 flex w-[200px] h-14 px-7 justify-center items-center rounded-xl border border-solid border-primary-600 bg-white text-primary-600 font-xl-semibold"
          onClick={() => navigate('/')}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
