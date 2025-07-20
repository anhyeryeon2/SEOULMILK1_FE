import { useNavigate } from 'react-router-dom';
import CircleNumber from './CircleNumber';
import SignupButton from './SignupButton';
import SignupInput from './SignupInput';
import { useState } from 'react';
import SignupModal from './SignupModal';
import Check from '../../../../../src/Icon/Check';
import AgreeModal from '../../../../../packages/common/AgreeModal';
import api from '../../../../../packages/hooks/api';
import { useSignupStore } from '../../../../../packages/store/useSignupStore';

interface FormState {
  phone: string;
  email: string;
}

interface Errors {
  phone: string;
  email: string;
  agree?: string;
}

const Signup2 = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreeModal, setIsAgreeModal] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<Errors>({
    phone: '',
    email: '',
    agree: ''
  });

  const { name, loginId, password, resetSignupData } = useSignupStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    let newErrors: Errors = { phone: '', email: '', agree: '' };
    let isValid = true;

    if (!formState.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요.';
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    }

    if (!isAgree) {
      newErrors.agree = '개인정보 수집 및 이용 동의를 해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validate()) return;

    console.log('111', formState);

    try {
      const response = await api.post('/auth/sign-up/hq', {
        name,
        loginId,
        password,
        phone: formState.phone,
        email: formState.email
      });

      console.log('회원가입 성공:', response.data);
      resetSignupData();
      setIsModalOpen(true);
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        email: error.response?.data?.message || '회원가입에 실패했습니다.'
      }));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="flex flex-col gap-4">
          <CircleNumber type="two" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 전화번호 </label>
          <SignupInput
            name="phone"
            placeholder="- 없이 숫자만 입력"
            type="text"
            value={formState.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-warning-700 font-sm-regular">{errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-gray-600 font-md-semibold"> 이메일 </label>
          <SignupInput
            name="email"
            placeholder="example@email.com"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-warning-700 font-sm-regular">{errors.email}</p>
          )}
        </div>

        <div className="flex w-full flex-col">
          <div className="flex w-full items-center">
            <div className="relative items-center mt-1">
              <input
                type="checkbox"
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
                className="appearance-none w-6 h-6 rounded-lg border border-solid border-gray-300 checked:bg-primary-700 checked:border-primary-700 
                relative peer checked:cursor-pointer cursor-pointer"
              />
              <span className="absolute inset-0 bottom-[6px] left-1 right-1 items-center justify-center pointer-events-none hidden peer-checked:flex">
                <Check stroke="#fff" />
              </span>
            </div>

            <div className="flex w-full items-center">
              <span className="ml-2 text-center text-gray-800 font-md-medium">
                개인정보 수집 및 이용 동의
              </span>
              <div
                className="text-gray-500 font-sm-medium underline ml-auto cursor-pointer"
                onClick={() => setIsAgreeModal(true)}
              >
                전문 보기
              </div>
            </div>
          </div>
          {errors.agree && (
            <p className="text-warning-700 font-sm-regular mt-2">
              {errors.agree}
            </p>
          )}
        </div>

        <SignupButton
          text="회원가입"
          prevonClick={() => navigate('/head/signup')}
          onClick={handleSubmit}
        />
      </div>

      {isModalOpen && <SignupModal />}
      {isAgreeModal && <AgreeModal onClose={() => setIsAgreeModal(false)} />}
    </div>
  );
};

export default Signup2;
