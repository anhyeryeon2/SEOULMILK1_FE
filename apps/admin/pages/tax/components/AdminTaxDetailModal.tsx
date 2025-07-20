import { useState, useEffect } from 'react';
import ArrowIcon from '../../../../../src/Icon/ArrowIcon';
import api from '../../../../../packages/hooks/api';
import StatusBadge, {
  Status
} from '../../../../../packages/common/StatusBagde';

interface TaxDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    status: string;
    title: string;
    taxImageUrl: string;
    issueId: string;
    suId: string;
    ipId: string;
    taxDate: string;
    chargeTotal: string;
  };
}

interface TaxDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: {
    id: string;
    status: string;
    ntsTaxId: string;
    team: string;
    taxDate: string;
    approvalNo: string;
    supplier: string;
    recipient: string;
    dateFormatted: string;
    amount: string;
  } | null;
}

const AdminTaxDetailModal = ({
  isOpen,
  onClose,
  selectedItem
}: TaxDetailModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<
    TaxDetailResponse['result'] | null
  >(null);

  useEffect(() => {
    const fetchTaxDetail = async () => {
      if (!isOpen || !selectedItem?.ntsTaxId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await api.get<TaxDetailResponse>(
          `/admin/tax/${selectedItem.ntsTaxId}`
        );
        console.log('111', response.data);
        if (response.data.isSuccess) {
          setDetailData(response.data.result);
        } else {
          setError('데이터를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('서버 연결에 실패했습니다. 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaxDetail();
  }, [isOpen, selectedItem]);

  const getDisplayStatus = (apiStatus: string): Status => {
    const statusMap: Record<string, Status> = {
      APPROVE: '승인',
      REFUSED: '반려',
      WAIT: '반려'
    };
    return statusMap[apiStatus] || (apiStatus as Status);
  };

  if (!isOpen || !selectedItem) return null;

  const displayStatus = detailData
    ? getDisplayStatus(detailData.status)
    : (selectedItem.status as Status);

  return (
    <div
      className={`fixed p-4 pr-0 inset-0 flex justify-end items-start z-50 transition-opacity duration-300 
      ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white pt-8 px-6 rounded-[24px] drop-shadow-elevation3 w-[400px] max-h-[1024px] h-full flex flex-col transform transition-transform duration-300 
                overflow-y-auto custom-scrollbar`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center pt-6 pb-4 mb-4">
          <div className="absolute left-0 cursor-pointer" onClick={onClose}>
            <ArrowIcon strokeColor={'#949BA7'} />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600">로딩 중...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 p-4 rounded-lg mb-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <StatusBadge status={displayStatus} />

            <div>
              <h2 className="flex text-center font-xl-semibold text-gray-800 mt-[12px]">
                {detailData?.title}
              </h2>

              <div className="w-[352px] h-[264px] border rounded-[24px] flex items-center justify-center mt-4">
                {detailData?.taxImageUrl ? (
                  <img
                    src={detailData.taxImageUrl}
                    alt="세금계산서"
                    className="w-full h-full object-contain rounded-[24px]"
                  />
                ) : (
                  <span className="text-gray-500">
                    이미지가 존재하지 않습니다.
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-4 flex-1">
              <DetailField
                label="승인번호"
                value={detailData?.issueId || selectedItem.approvalNo}
              />
              <DetailField
                label="공급자 등록번호"
                value={detailData?.suId || selectedItem.supplier}
              />
              <DetailField
                label="공급 받는 자 등록번호"
                value={detailData?.ipId || selectedItem.recipient}
              />
              <DetailField
                label="작성일자"
                value={detailData?.taxDate || selectedItem.taxDate}
              />
              <DetailField
                label="공급가액"
                value={detailData?.chargeTotal || selectedItem.amount}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-gray-600 font-md-semibold mb-1">{label}</label>
    <div className="w-full p-4 h-[56px] mb-4 bg-gray-100 rounded-[12px] text-gray-600 font-md-medium">
      {value}
    </div>
  </div>
);

export default AdminTaxDetailModal;
