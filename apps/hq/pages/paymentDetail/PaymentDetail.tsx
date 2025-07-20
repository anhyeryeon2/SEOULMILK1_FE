import Header from '../../../../packages/common/Header';
import ArrowIcon from '../../../../src/Icon/ArrowIcon';
import Button from '../../../../packages/common/Button';
import ChatLine from '../../../../src/Icon/ChartLine';
import { useEffect, useState } from 'react';
import api from '../../../../packages/hooks/api';
import AccountEditModal from './AccountEditModal';
import PaymentDetailModal from './PaymentDetailModal';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PaymentData } from '../../../../packages/types/paymentDetails';
import PaymentInfo from './components/PaymentInfo';
import TaxInvoiceList from './components/TaxInvoiceItem';

const PaymentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [paymentData, setPaymentData] = useState<PaymentData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTaxItem, setSelectedTaxItem] = useState<any | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const fetchPaymentDetails = async () => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.get(`/hq/payment-resolution/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.isSuccess) {
        setPaymentData(response.data.result);
        setBankName(response.data.result.bank);
        setAccountNumber(response.data.result.account);
      } else {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('서버 요청 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPaymentDetails();
    }
  }, [id, reloadTrigger]);

  useEffect(() => {
    const taxId = searchParams.get('ntsId');
    if (taxId && paymentData?.paymentDetails) {
      const itemToSelect = paymentData.paymentDetails.find(
        (item) => item.ntsTaxNum === taxId
      );
      if (itemToSelect) {
        setSelectedTaxItem(itemToSelect);
      }
    }
  }, [searchParams, paymentData]);

  const handleTaxItemClick = (item: any) => {
    setSelectedTaxItem(item);
    setSearchParams({ ntsId: item.ntsId.toString() });
  };

  const handleCloseModal = () => {
    setSelectedTaxItem(null);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('ntsId');
    setSearchParams(newSearchParams);
  };

  const handleDownloadPaymentResolution = async () => {
    try {
      const response = await api.get(`/hq/payment-resolution/pdf/${id}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `지급결의서_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(' 지급 결의서 다운로드 성공');
    } catch (error) {
      console.error(' 지급 결의서 다운로드 실패:', error);
    }
  };

  if (loading) {
    return <p className="text-center py-6 text-gray-500">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mx-[94px] w-[960px]">
      <Header
        title={paymentData?.name || 'N/A'}
        Icon={() => (
          <div
            onClick={() => navigate('/hq/payment')}
            style={{ cursor: 'pointer' }}
          >
            <ArrowIcon strokeColor="#3A404A" />
          </div>
        )}
      >
        <div className="text-sm text-gray-500 flex gap-3">
          <p>작성일: {paymentData?.createdAt || 'N/A'}</p>{' '}
          <ChatLine className="mt-1" />
          {/* <p>문서번호: {paymentData?.paymentResolutionId || 'N/A'}</p> */}
        </div>
      </Header>

      <div className="rounded-[24px] w-[960px] border border-gray-200 overflow-hidden mb-8 mt-8">
        <div className="grid grid-cols-2 text-center py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="text-gray-600 font-medium">지급 대상 정보</h2>
          <h2 className="text-gray-600 font-medium">지급 주체 정보</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 ">
          <div>
            <PaymentInfo
              label="지급 대상"
              value={paymentData?.paymentRecipient}
            />
            <PaymentInfo
              label="사업자 등록번호"
              value={paymentData?.recipientBusinessNumber}
            />
            <PaymentInfo
              label="정산 지급 총액"
              value={`${paymentData?.totalPaymentAmount || '0'} 원`}
            />
            <PaymentInfo label="지급 방법" value={paymentData?.paymentMethod} />
            <PaymentInfo
              label="지급 계좌"
              value={paymentData?.paymentAccount}
              isEditable
              onEdit={() => setIsModalOpen(true)}
            />
          </div>

          <div>
            <PaymentInfo
              label="지급 주체"
              value={paymentData?.paymentPrincipal}
            />
            <PaymentInfo
              label="사업자 등록번호"
              value={paymentData?.principalBusinessNumber}
            />
            <PaymentInfo label="결제권자" value="-" />
            <PaymentInfo
              label="지급결의서 작성일자"
              value={paymentData?.createdAt}
            />
            <PaymentInfo label="지급 예정일" value="-" />
          </div>
        </div>
      </div>

      {/* 반영된 세금계산서 목록 */}
      <TaxInvoiceList
        paymentDetails={paymentData?.paymentDetails || []}
        onTaxItemClick={handleTaxItemClick}
      />

      <div className="flex justify-end">
        <Button
          size="sm"
          className="bg-primary-700 h-[48px] rounded-[12px] w-[180px] text-white px-6 py-3 font-md-medium whitespace-nowrap"
          onClick={handleDownloadPaymentResolution}
        >
          지급 결의서 다운로드
        </Button>
      </div>
      {selectedTaxItem && (
        <PaymentDetailModal
          isOpen={!!selectedTaxItem}
          onClose={handleCloseModal}
          selectedItem={selectedTaxItem}
        />
      )}
      <AccountEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        initialBank={bankName}
        initialAccount={accountNumber}
        onUpdate={(newBank, newAccount) => {
          setBankName(newBank);
          setAccountNumber(newAccount);
          setReloadTrigger((prev) => prev + 1);
        }}
      />
    </div>
  );
};

export default PaymentDetail;
