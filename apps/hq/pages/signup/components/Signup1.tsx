import { useNavigate } from 'react-router-dom';
import CircleNumber from './CircleNumber';
import SignupInput from './SignupInput';
import SignupButton from './SignupButton';
import { useState } from 'react';
import { useSignupStore } from '../../../../../packages/store/useSignupStore';
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

const Signup1 = () => {
  const navigate = useNavigate();
  const { setSignupData } = useSignupStore();
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
  const [employeeIdError, setEmployeeIdError] = useState<string>('');

  const validate = (): boolean => {
    let newErrors: Errors = {
      name: '',
      loginId: '',
      password: '',
      passwordCheck: ''
    };
    let isValid = true;

    if (!formState.loginId) {
      newErrors.loginId = '사번을 입력해주세요.';
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
  };

  const handleSubmit = (): void => {
    if (validate()) {
      setSignupData({
        name: formState.name,
        loginId: formState.loginId,
        password: formState.password
      });
      navigate('/head/signup2');
    }
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState({
      ...formState,
      loginId: value === '' ? '' : value
    });
    setEmployeeIdError('');
  };

  const handleValidateid = async () => {
    try {
      const response = await api.get(
        `/auth/validation/login-id?loginId=${formState.loginId}`
      );

      if (response.data && response.data.result === '가입 가능한 사번입니다.') {
        setEmployeeIdError('사용 가능한 사번입니다.');
      } else {
        setEmployeeIdError('유효한 아이디가 아닙니다.');
      }
    } catch (error) {
      setEmployeeIdError('사번 중복 체크에 실패했습니다.');
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
          type="text"
          placeholder="이름을 알려주세요"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 사번 </label>
        <div className="flex flex-row gap-2">
          <SignupInput
            type="text"
            name="employeeId"
            placeholder="사번을 입력하세요"
            value={formState.loginId}
            onChange={handleEmployeeIdChange}
          />
          <button
            type="button"
            onClick={handleValidateid}
            className={`flex w-[80px] whitespace-nowrap px-7 h-14 justify-center items-center gap-[10px] rounded-xl text-center font-md-medium ${
              formState.loginId
                ? 'bg-primary-700 text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            확인
          </button>
        </div>
        {employeeIdError && (
          <p className="text-warning-700 font-sm-regular">{employeeIdError}</p>
        )}
        {errors.loginId && (
          <p className="text-warning-700 font-sm-regular">{errors.loginId}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-600 font-md-semibold"> 비밀번호 </label>
        <SignupInput
          type="password"
          name="password"
          placeholder="영문, 숫자, 특수문자 조합 8~16자"
          value={formState.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-warning-700 font-sm-regular">{errors.password}</p>
        )}
        <SignupInput
          type="password"
          placeholder="비밀번호 재입력"
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
        prevonClick={() => navigate('/signup')}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Signup1;
