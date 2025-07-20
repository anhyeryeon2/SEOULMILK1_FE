import Header from '../../../../packages/common/Header';

import ArrowIcon from '../../../../src/Icon/ArrowIcon';
import ChatLine from '../../../../src/Icon/ChartLine';
import { useEffect, useState } from 'react';
import api from '../../../../packages/hooks/api';
import PaymentDetailModal from './AdminPaymentDetailModal';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PaymentData } from '../../../../packages/types/paymentDetails';
import PaymentInfo from './components/PaymentInfo';
import TaxInvoiceList from './components/TaxInvoiceItem';

const AdminPaymentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTaxItem, setSelectedTaxItem] = useState<any | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchPaymentDetails = async () => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.get(`/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.isSuccess) {
        setPaymentData(response.data.result);
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
  }, [id]);

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
            onClick={() => navigate('/admin/admin-payment')}
            style={{ cursor: 'pointer' }}
          >
            <ArrowIcon strokeColor="#3A404A" />
          </div>
        )}
      >
        <div className="text-sm text-gray-500 flex gap-3">
          <p>작성일: {paymentData?.createdAt || 'N/A'}</p>{' '}
          <ChatLine className="mt-1" />
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

      <TaxInvoiceList
        paymentDetails={paymentData?.paymentDetails || []}
        onTaxItemClick={handleTaxItemClick}
      />
      {selectedTaxItem && (
        <PaymentDetailModal
          isOpen={!!selectedTaxItem}
          onClose={handleCloseModal}
          selectedItem={selectedTaxItem}
        />
      )}
    </div>
  );
};

export default AdminPaymentDetail;
