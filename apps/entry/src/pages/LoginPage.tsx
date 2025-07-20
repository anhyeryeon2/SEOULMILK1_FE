import { useState } from 'react';
import FloatingLabelInput from '../components/LabelInput';
import RedLogo from '../../../../src/Icon/RedLogoIcon';
import Button from '../../../../packages/common/Button';
import ErrorMessage from '../components/ErrorMessage';
import LoginFooter from '../components/LoginFooter';
import ApprovalModal from '../components/ApprovalModal';
import api from '../../../../packages/hooks/api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../packages/store/useAuthStore';
import ShowEyeIcon from '../../../../src/Icon/ShowEyeIcon';
import NoShowEyeIcon from '../../../../src/Icon/NoShowEyeIcon';

function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setAuthData, fetchUserInfo } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const isButtonDisabled = !loginId || !password;
  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        loginId,
        password
      });

      console.log('로그인 응답:', response.data);

      if (response.data) {
        const accessToken =
          response.headers['authorization']?.split('Bearer ')[1];

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);

          await setAuthData(accessToken);
          await fetchUserInfo();
        } else {
          console.error(' Access Token이 없음.');
          setError('인증 토큰이 없습니다. 다시 로그인해 주세요.');
          return;
        }

        const role = response.data.result?.role;
        localStorage.setItem('userRole', role);

        const isMobile = window.innerWidth <= 768;

        const REDIRECT_URLS: Record<string, string> = {
          CS_USER: isMobile
            ? 'http://localhost:5174/cs'
            : 'http://localhost:5174/cs/home',
          HQ_USER: 'http://localhost:5175/hq/home',
          ADMIN: 'http://localhost:5176/admin/home'
        };

        window.location.href = REDIRECT_URLS[role] ?? '/';
      } else {
        setError('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error: any) {
      console.error(' 로그인 요청 실패:', error);
      if (error.response?.status === 400) {
        setIsApprovalModalOpen(true);
      } else {
        setError('로그인 요청 중 문제가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-[456px] mx-auto px-6 py-[40px] bg-white rounded-[32px] drop-shadow-elevation1 max-sm:min-h-screen flex flex-col justify-center">
        <div className="flex justify-center mb-[32px]">
          <RedLogo />
        </div>

        <div className="space-y-[20px]">
          <FloatingLabelInput
            placeholder="사번 또는 아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <div className="relative">
            <FloatingLabelInput
              placeholder="비밀번호"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showDeleteButton={false}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-4 right-4 flex items-center"
            >
              {showPassword ? <ShowEyeIcon /> : <NoShowEyeIcon />}
            </button>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}

        <Button
          size="lg"
          className={`w-full mt-6 ${
            isButtonDisabled
              ? 'bg-gray-200 text-gray-400'
              : 'bg-primary-700 text-white'
          }`}
          disabled={isButtonDisabled}
          onClick={handleLogin}
        >
          로그인
        </Button>
        <LoginFooter />
      </div>
      <ApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
      />
    </div>
  );
}

export default LoginPage;
