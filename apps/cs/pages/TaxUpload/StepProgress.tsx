import { useLocation, useSearchParams } from 'react-router-dom';

const steps = [
  { step: 1, label: '이미지 편집', path: '/upload-tax/step1' },
  { step: 2, label: '데이터 확인 및 수정', path: '/upload-tax/step2' },
  { step: 3, label: '홈택스 검증', path: '/upload-tax/step3' }
];

const StepProgress = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const taxId = searchParams.get('taxId');

  let currentStep =
    steps.findIndex((step) => location.pathname.includes(step.path)) + 1;
  if (taxId) {
    if (location.pathname.includes('/upload-tax/step3')) {
      currentStep = 3;
    } else {
      currentStep = 2;
    }
  }

  return (
    <div className="flex items-center w-[500px] h-[40px] mr-[110px]">
      {steps.map(({ step, label }) => (
        <div key={step} className="flex items-center gap-[10px]">
          <div
            className={`w-[24px] h-[24px] flex items-center justify-center rounded-full font-md-semibold 
                ${
                  currentStep >= step
                    ? 'bg-primary-700 text-white'
                    : ' text-gray-300 border-[1.6px] border-gray-300'
                }
              `}
          >
            {step}
          </div>
          <span
            className={`font-xl-semibold pr-[28px] whitespace-nowrap ${
              currentStep >= step ? 'text-primary-700' : 'text-gray-400'
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
