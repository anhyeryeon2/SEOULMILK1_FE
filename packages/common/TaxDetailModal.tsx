import { useState, useEffect } from 'react';
import Button from './Button';
import ArrowIcon from '../../src/Icon/ArrowIcon';
import StatusBadge, { Status } from './StatusBagde';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../hooks/api';

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

const TaxDetailModal = ({
  isOpen,
  onClose,
  selectedItem
}: TaxDetailModalProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<
    TaxDetailResponse['result'] | null
  >(null);

  useEffect(() => {
    const fetchTaxDetail = async () => {
      if (!isOpen || !selectedItem?.id) {
        console.log(' selectedItem 또는 id가 없습니다.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get<TaxDetailResponse>(
          `/cs/tax/${selectedItem.id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log(response);
        if (response.data.isSuccess) {
          setDetailData(response.data.result);
        } else {
          setError(
            response.data.message || '데이터를 불러오는데 실패했습니다.'
          );
        }
      } catch (err) {
        setError('서버 연결에 실패했습니다. 다시 시도해 주세요.');
        console.error(' API 요청 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTaxDetail();
  }, [isOpen, selectedItem]);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpening(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleReupload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const currentPath = window.location.pathname;
        const currentSearchParams = searchParams.toString();
        const returnUrl = `${currentPath}${
          currentSearchParams ? `?${currentSearchParams}` : ''
        }`;

        navigate(`/cs/upload-tax/step1?taxId=${selectedItem?.id}`, {
          state: {
            selectedImage: imageUrl,
            returnUrl: returnUrl
          }
        });
      }
    };
    input.click();
  };
  const handleDataEdit = () => {
    if (!selectedItem?.id) {
      console.error('세금계산서 ID 없음!');
      return;
    }

    const taxId = selectedItem.id || detailData?.issueId;

    navigate(`/cs/tax/edit?taxId=${taxId}`, {
      state: {
        taxId,
        ...selectedItem,
        ...(detailData
          ? {
              approvalNo: detailData.issueId,
              supplier: detailData.suId,
              recipient: detailData.ipId,
              date: detailData.taxDate,
              amount: detailData.chargeTotal
            }
          : {})
      }
    });
  };

  if (!isOpen || !selectedItem) return null;

  const getDisplayStatus = (apiStatus: string): Status => {
    const statusMap: Record<string, Status> = {
      APPROVE: '승인',
      REFUSED: '반려',
      WAIT: '반려'
    };

    return statusMap[apiStatus] || (apiStatus as Status);
  };

  const isRejected =
    detailData?.status === 'REJECTED' ||
    selectedItem.status === '반려됨' ||
    detailData?.status === 'REFUSED' ||
    detailData?.status === 'WAIT';
  const displayStatus = detailData
    ? getDisplayStatus(detailData.status)
    : (selectedItem.status as Status);

  return (
    <div
      className={`fixed p-4 pr-0 inset-0 flex justify-end items-start z-50 transition-opacity duration-300 
      ${isOpening && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white pt-8 px-6 rounded-[24px] drop-shadow-elevation3 w-[400px] max-h-[1024px] h-full flex flex-col transform transition-transform duration-300 
                overflow-y-auto custom-scrollbar ${
                  isOpening && !isClosing ? 'translate-x-0' : 'translate-x-full'
                }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center pt-6 pb-4 mb-4">
          <div className="absolute left-0 cursor-pointer" onClick={handleClose}>
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

              <div
                className="w-[352px] h-[264px] border rounded-[24px] flex items-center justify-center mt-4 cursor-pointer"
                onClick={handleImageClick}
              >
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

            {isRejected && (
              <div className="font-xl-semibold flex justify-between w-full p-4 bg-white sticky bottom-0 left-0 right-0 gap-4 ">
                <Button
                  className="text-warning-400 w-[168px] h-[56px] border border-warning-400"
                  onClick={handleReupload}
                >
                  재업로드
                </Button>
                <Button
                  className="bg-warning-400 text-white w-[168px] h-[56px]"
                  onClick={handleDataEdit}
                >
                  데이터 수정
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeImageModal}
        >
          <div className="w-[700px] h-[500px] bg-white flex items-center justify-center">
            {detailData?.taxImageUrl ? (
              <img
                src={detailData.taxImageUrl}
                alt="세금계산서"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <span className="text-gray-500 text-lg">확대된 임시 이미지</span>
            )}
          </div>
        </div>
      )}
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

export default TaxDetailModal;
