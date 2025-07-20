import { useNavigate } from 'react-router-dom';

export default function LoginFooter() {
  const navigate = useNavigate();

  return (
    <div className="font-md-medium text-gray-500 flex justify-between items-center mt-[16px]">
      <div className="flex space-x-[6px]">
        <span
          className="cursor-pointer"
          onClick={() => navigate('/아이디찾기')}
        >
          아이디 찾기
        </span>
        <span>|</span>
        <span
          className="cursor-pointer"
          onClick={() => navigate('/비밀번호찾기')}
        >
          비밀번호 찾기
        </span>
      </div>

      <div className="cursor-pointer" onClick={() => navigate('/signup')}>
        회원가입
      </div>
    </div>
  );
}
