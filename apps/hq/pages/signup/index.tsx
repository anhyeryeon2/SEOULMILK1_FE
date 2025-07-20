import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupColor from '../../../../src/Icon/SignupColor';
import SignupGray from '../../../../src/Icon/SignupGray';
import CsSignupGray from '../../../../src/Icon/CsSignupGray';
import CsSignupColor from '../../../../src/Icon/CsSignupColor';

const Signup = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'head' | 'cs' | null>(null);

  const handleSelect = (type: 'head' | 'cs') => {
    setSelectedType(type);
    navigate(`/${type}/signup`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-[416px] px-8 py-[42px] flex-col justify-center gap-10 rounded-[32px] bg-white drop-shadow-elevation1">
        <div className="items-stretch text-gray-800 font-3xl-bold">
          회원가입
          <div className="text-gray-500 font-2xl-medium">
            회원 유형을 선택해주세요.
          </div>
        </div>

        <div className="flex flex-row gap-6 justify-center">
          <div
            className={`group flex w-[196px] h-[159px] px-8 pt-4 pb-5 flex-col justify-center items-center rounded-3xl font-xl-medium  border border-solid border-gray-200 cursor-pointer
              ${
                selectedType === 'head'
                  ? 'bg-primary-50 text-primary-700 font-xl-semibold'
                  : 'bg-white text-gray-500 hover:bg-primary-50 hover:text-primary-700'
              }`}
            onClick={() => handleSelect('head')}
          >
            {selectedType === 'head' ? (
              <SignupColor />
            ) : (
              <>
                <div className="group-hover:hidden">
                  <SignupGray />
                </div>
                <div className="hidden group-hover:block">
                  <SignupColor />
                </div>
              </>
            )}
            본사 직원
          </div>

          <div
            className={`group flex w-[196px] h-[159px] px-8 pt-4 pb-5 flex-col justify-center items-center rounded-3xl border border-solid border-gray-200 font-xl-medium cursor-pointer
              ${
                selectedType === 'cs'
                  ? 'bg-primary-50 text-primary-700 font-xl-semibold'
                  : 'bg-white text-gray-500 hover:bg-primary-50 hover:text-primary-700'
              }`}
            onClick={() => handleSelect('cs')}
          >
            {selectedType === 'cs' ? (
              <CsSignupColor />
            ) : (
              <>
                <div className="group-hover:hidden">
                  <CsSignupGray />
                </div>
                <div className="hidden group-hover:block">
                  <CsSignupColor />
                </div>
              </>
            )}
            대리점
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
