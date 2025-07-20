import CircleNumber from '../../../../hq/pages/signup/components/CircleNumber';
import SignupInput from '../../../../hq/pages/signup/components/SignupInput';
import SignupButton from '../../../../hq/pages/signup/components/SignupButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCsSignupStore } from '../../../../../packages/store/useCsSignupStore';
import api from '../../../../../packages/hooks/api';

interface FormState {
  name: string;
  loginId: string;
  password: string;
  passwordCheck: string;
}

interface Errors {
  name: string;
  loginId: string;
  password: string;
  passwordCheck: string;
}

const CsSignup1 = () => {
  const navigate = useNavigate();
  const [idCheckMessage, setIdCheckMessage] = useState<string>('');
  const [isIdValid, setIsIdValid] = useState<boolean>(false);
  const { setSignupData } = useCsSignupStore();
  const [formState, setFormState] = useState<FormState>({
    name: '',
    loginId: '',
    password: '',
    passwordCheck: ''
  });
  const [errors, setErrors] = useState<Errors>({
    name: '',
    loginId: '',
    password: '',
    passwordCheck: ''
  });

  const validate = (): boolean => {
    let newErrors: Errors = {
      name: '',
      loginId: '',
      password: '',
      passwordCheck: ''
    };
    let isValid = true;

    if (!formState.loginId.trim()) {
      newErrors.loginId = '아이디를 입력해주세요.';
      isValid = false;
    } else if (!/^[a-zA-Z0-9]{6,20}$/.test(formState.loginId)) {
      newErrors.loginId = '유효한 아이디가 아닙니다.';
      isValid = false;
    }

    if (!formState.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
        formState.password
      )
    ) {
      newErrors.password = '비밀번호 규칙에 맞지 않습니다.';
      isValid = false;
    }

    if (formState.password !== formState.passwordCheck) {
      newErrors.passwordCheck = '동일한 비밀번호가 아닙니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (e.target.name === 'loginId') {
      setIsIdValid(false);
      setIdCheckMessage('');
    }
  };

  const handleSubmit = (): void => {
    if (validate()) {
      setSignupData({
        name: formState.name,
        loginId: formState.loginId,
        password: formState.password
      });
      navigate('/cs/signup2');
    }
  };

  const handleValidateId = async () => {
    try {
      const response = await api.get(
        `/auth/validation/login-id?loginId=${formState.loginId}`
      );

      if (response.data && response.data.result === '가입 가능한 사번입니다.') {
        setIdCheckMessage('사용 가능한 아이디입니다.');
        setIsIdValid(true);
      } else {
        setIdCheckMessage('이미 사용 중인 아이디입니다.');
        setIsIdValid(false);
      }
    } catch (error) {
      setIdCheckMessage('아이디 중복 체크에 실패했습니다.');
      setIsIdValid(false);
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col w-[480px] py-[42px] px-8 justify-center items-start gap-8 rounded-[32px] bg-white drop-shadow-elevation1">
      <div className="flex flex-col gap-4">
        <CircleNumber type="one" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 이름 </label>
        <SignupInput
          placeholder="이름을 알려주세요."
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 아이디 </label>
        <div className="flex flex-row gap-2">
          <SignupInput
            placeholder="최소 6자 이상,최대 20자 이하의 영문 또는 숫자"
            name="loginId"
            type="text"
            value={formState.loginId}
            onChange={handleChange}
          />

          <button
            onClick={handleValidateId}
            className={`flex w-[80px] whitespace-nowrap px-7 h-14 justify-center items-center gap-[10px] rounded-xl text-center font-md-medium ${
              formState.loginId
                ? 'bg-primary-700 text-white'
                : 'bg-gray-200 text-gray-400'
            } text-center font-md-medium`}
          >
            확인
          </button>
        </div>
        {idCheckMessage && (
          <p
            className={`font-md-medium ${
              isIdValid ? 'text-warning-700' : 'text-warning-700'
            }`}
          >
            {idCheckMessage}
          </p>
        )}
        {errors.loginId && (
          <p className="text-warning-700 font-sm-regular">{errors.loginId}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 비밀번호 </label>
        <SignupInput
          placeholder="영문, 숫자, 특수문자 조합 8~16자"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-warning-700 font-sm-regular">{errors.password}</p>
        )}
        <SignupInput
          placeholder="비밀번호 재입력"
          type="password"
          name="passwordCheck"
          value={formState.passwordCheck}
          onChange={handleChange}
        />
        {errors.passwordCheck && (
          <p className="text-warning-700 font-sm-regular">
            {errors.passwordCheck}
          </p>
        )}
      </div>

      <SignupButton
        text="다음"
        onClick={handleSubmit}
        prevonClick={() => navigate('/signup')}
      />
    </div>
  );
};

export default CsSignup1;
