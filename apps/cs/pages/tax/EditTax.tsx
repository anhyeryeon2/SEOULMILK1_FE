import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../../../packages/common/Header';
// import uploadIcon from '../../../../src/Icon/TaxUpload';
import WarningIcon from '../../../../src/Icon/WarningIcon';
import api from '../../../../packages/hooks/api';

const EditTax = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taxId = searchParams.get('taxId');

  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    approvalNo: '',
    supplier: '',
    recipient: '',
    date: '',
    amount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taxId) {
      console.error(' taxId가 없습니다!');
      setLoading(false);
      return;
    }

    const fetchTaxDetails = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get(`/cs/tax/${taxId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('세금계산서 데이터:', response.data);

        if (response.data.isSuccess) {
          const taxData = response.data.result;
          setFormData({
            approvalNo: taxData.issueId || '',
            supplier: taxData.suId || '',
            recipient: taxData.ipId || '',
            date: taxData.taxDate || '',
            amount: taxData.chargeTotal || ''
          });

          if (taxData.taxImageUrl) {
            setCroppedImage(taxData.taxImageUrl);
          }
        } else {
          setError(
            response.data.message || '데이터를 불러오는데 실패했습니다.'
          );
        }
      } catch (err) {
        console.error(' API 요청 오류:', err);
        setError('서버 연결에 실패했습니다. 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchTaxDetails();
  }, [taxId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!taxId) {
      console.error(' taxId가 없습니다!');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1️ **세금계산서 수정 요청**
      console.log(` 세금계산서 수정 요청: /tax/${taxId}`);
      const updateResponse = await api.put(`/tax/${taxId}`, {
        issueId: formData.approvalNo, // 승인번호
        suId: formData.supplier, // 공급자 등록번호
        ipId: formData.recipient, // 공급 받는 자 등록번호
        issueDate: formData.date, // 작성일자
        chargeTotal: formData.amount // 공급가액
      });

      console.log(' 세금계산서 수정 응답:', updateResponse.data);

      if (!updateResponse.data.isSuccess) {
        setError(updateResponse.data.message || '세금계산서 수정 실패');
        setIsSubmitting(false);
        return;
      }

      // **검증 요청**
      console.log(`세금계산서 검증 요청: /tax/validate/${taxId}`);
      const validateResponse = await api.post(`/tax/validate/${taxId}`);
      console.log('검증 API 응답:', validateResponse.data);

      if (validateResponse.data.isSuccess) {
        navigate(`/cs/upload-tax/step3?taxId=${taxId}`, {
          state: { validationData: validateResponse.data.result }
        });
      } else {
        setError(validateResponse.data.message || '검증 실패');
      }
    } catch (error) {
      console.error(' API 요청 중 오류 발생:', error);
      setError('서버 오류 발생. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600 text-center py-10">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center py-10">{error}</p>;
  }

  return (
    <div className="px-[94px] mx-auto">
      <Header
        title="세금계산서 수정"
        showStepProgress={true}
        // Icon={() => (
        //   <img src={uploadIcon} alt="세금계산서 업로드" className="w-6 h-6" />
        // )}
      />

      <div className="pt-[32px] flex gap-[40px]">
        <div className="w-[560px] flex-col rounded-[32px] flex items-center justify-center gap-[24px]">
          <img
            src={croppedImage || '/placeholder.png'}
            alt="세금계산서 미리보기"
            className="w-[560px] max-h-[500px] object-contain rounded-md"
          />
          <div className="w-[560px] px-[24px] py-[16px] bg-[#FFEAED] rounded-[16px] flex items-start gap-[8px]">
            <WarningIcon className="mt-1" />
            <div className="text-start gap-[8px]">
              <p className="text-warning-400 font-xl-semibold">
                내용이 알맞게 입력되었나요?
              </p>
              <p className="text-warning-300 font-lg-semibold">
                사진 속 정보와 다를 경우 직접 수정하거나 다시 입력해 주세요.
              </p>
            </div>
          </div>
        </div>

        <div className="w-[360px] p-6">
          <form className="flex flex-col gap-[24px]">
            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">승인번호</span>
              <input
                type="text"
                name="approvalNo"
                value={formData.approvalNo}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px] focus:border-primary-500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">
                공급자 등록번호
              </span>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px] focus:border-primary-500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">
                공급 받는 자 등록번호
              </span>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px] focus:border-primary-500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">작성일자</span>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px] focus:border-primary-500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-md-semibold text-gray-600">공급가액</span>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="border border-gray-300 rounded-[12px] p-[16px] focus:border-primary-500"
              />
            </label>
          </form>
        </div>
      </div>

      <div className="mt-[64px] flex gap-[24px] justify-center">
        <button
          className="font-md-medium w-[200px] h-[48px] text-center bg-primary-600 text-white px-6 py-3 rounded-[12px]"
          onClick={handleUpload}
          disabled={isSubmitting}
        >
          {isSubmitting ? '업로드 중...' : '업로드'}
        </button>
      </div>
    </div>
  );
};

export default EditTax;
