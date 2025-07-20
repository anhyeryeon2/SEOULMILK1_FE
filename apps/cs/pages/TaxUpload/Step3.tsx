import Header from '../../../../packages/common/Header';
import Step3Icon from '../../../../public/Icon/홈택스.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';
import UploadIcon from '../../../../src/Icon/TaxUpload.svg';

const Step3 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { taxId } = queryString.parse(location.search);

  useEffect(() => {
    if (!taxId) {
      return;
    }

    const timer = setTimeout(() => {
      navigate(`/cs/tax?taxId=${taxId}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [taxId, navigate]);

  return (
    <div className="mx-[94px]">
      <Header
        title="세금계산서 업로드"
        showStepProgress={true}
        Icon={() => <UploadIcon className="w-6 h-6" />}
      />
      <div className="flex flex-col items-center justify-center gap-[21px] mt-[200px]">
        {/* <Step3Icon className="w-[250px] h-[250px] animate-[bounceEffect_3s_ease-in-out]" /> */}
        <div className="text-gray-600 font-2xl-medium">
          홈택스를 통해서 검증하고 있어요
        </div>
      </div>
    </div>
  );
};

export default Step3;
