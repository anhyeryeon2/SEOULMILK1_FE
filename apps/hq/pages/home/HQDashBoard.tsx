import Header from '../../../../packages/common/Header';
import HQHome from '../../../../src/Icon/HQHome';
import WaitingTax from './components/WaitingTax';
import HQIcon from '../../../../src/Icon/CustomerIcon';
import WritePayment from './components/WritePayment';
import { useState } from 'react';
import HQAgencyModal from './components/HQAgencyModal';
import api from '../../../../packages/hooks/api';
import TaxIconGray from '../../../../src/Icon/TaxIconGray';
import PaymentIcon from '../../../../src/Icon/PaymentIcon';
import Loading from '../../../../src/Icon/Loading';
import ModalCompleteIcon from '../../../../src/Icon/ModalCompleteIcon';

const HQ_home = () => {
  const [isModal, setIsModal] = useState(false);
  const [dataLength, setDataLength] = useState(0);
  const [writeDataLength, setWriteDataLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleWritePayment = async () => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.post(`/hq/payment-resolution`, null, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('일괄 작성 완료:', response.data);
      } catch (error) {
        console.error('일괄 작성 요청 중 에러 발생:', error);
      }
    };

    setTimeout(async () => {
      setIsLoading(false);
      setIsCompleted(true);

      setTimeout(async () => {
        setIsCompleted(false);
        await fetchData();
        window.location.reload();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="이번 달 지급결의 현황" Icon={HQHome} />
      <div className="mt-8 flex flex-row justify-between">
        <div className="flex flex-row gap-2 justify-center items-center">
          <TaxIconGray />
          <div className="text-gray-800 font-2xl-bold">
            지급 대기 세금계산서
          </div>
          <span
            className={` font-2xl-medium ${
              dataLength ? 'text-primary-700' : 'text-gray-500'
            }`}
          >
            {dataLength}
          </span>
        </div>

        <div className="flex flex-row gap-4">
          <div
            className="flex px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-gray-100 cursor-pointer"
            onClick={() => setIsModal(true)}
          >
            <HQIcon />
            <span className="text-gray-600 font-md-medium">
              {' '}
              담당 대리점 관리
            </span>
          </div>
          {isModal && <HQAgencyModal onClose={() => setIsModal(false)} />}
          {dataLength > 0 && (
            <div
              className="flex px-4 py-2 justify-center items-center gap-1 rounded-xl bg-primary-700 cursor-pointer"
              onClick={handleWritePayment}
            >
              <span className="text-white text-center font-md-medium">
                지급결의서 일괄 작성
              </span>
            </div>
          )}
        </div>
      </div>
      <WaitingTax onDataLength={setDataLength} />

      <div className="mt-[53px] flex flex-row">
        <div className="flex flex-row gap-2 justify-center items-center">
          <PaymentIcon />
          <div className="text-gray-800 font-2xl-bold">작성된 지급결의서</div>
          <span
            className={` font-2xl-medium ${
              writeDataLength ? 'text-primary-700' : 'text-gray-500'
            }`}
          >
            {writeDataLength}
          </span>
        </div>
      </div>
      <WritePayment onWriteDataLength={setWriteDataLength} />

      {/* 로딩 팝업 */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="flex flex-row gap-2 items-center justify-center text-center bg-gray-500 rounded-3xl drop-shadow-elevation2 px-6 py-3">
            <Loading />
            <p className="text-white font-xl-semibold">
              {' '}
              세금계산서를 작성 중이에요...
            </p>
          </div>
        </div>
      )}

      {/* 완료 팝업 */}
      {isCompleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="items-center flex flex-row gap-2 text-center bg-primary-400 bg-opacity-80 rounded-3xl backdrop-blur-lg drop-shadow-elevation2 px-6 py-3">
            <ModalCompleteIcon />
            <p className="text-white font-xl-semibold">
              총 {dataLength}건이 작성 완료되었어요!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HQ_home;
