import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../../../packages/common/Header';
import uploadIcon from '../../../../packages/../public/Icon/TaxUpload.svg';
import WarningIcon from '../../../../src/Icon/WarningIcon';
import api from '../../../../packages/hooks/api';
import queryString from 'query-string';
import UploadIcon from '../../../../src/Icon/TaxUpload.svg';

const Step2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taxId } = queryString.parse(location.search);

  const croppedImage =
    location.state?.croppedImage || location.state?.selectedImage;
  const newTaxId = location.state?.ocrData?.result?.ntsTaxId || taxId;
  const [formData, setFormData] = useState({
    approvalNo: '',
    supplier: '',
    recipient: '',
    date: '',
    amount: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.ocrData?.result) {
      console.log('OCR 데이터 적용됨', location.state.ocrData.result);

      const ocrData = location.state.ocrData.result;

      setFormData({
        approvalNo: ocrData.issueId || '',
        supplier: ocrData.suId || '',
        recipient: ocrData.ipId || '',
        date: ocrData.issueDate || '',
        amount: ocrData.chargeTotal || ''
      });
    } else {
      console.warn('OCR 데이터 없음', location.state);
    }
  }, [JSON.stringify(location.state?.ocrData?.result)]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    if (!newTaxId) {
      console.error('ntxTaxId 없음 API 요청을 보낼 수 없습니다.');
      return;
    }

    setIsSubmitting(true);

    // 세금계산서 검증
    try {
      const response = await api.post(`/tax/validate/${newTaxId}`);

      console.log('API 응답', response.data);

      if (response.data.isSuccess) {
        navigate(`/cs/upload-tax/step3?taxId=${newTaxId}`, {
          state: { validationData: response.data.result }
        });
      } else {
        console.error('API 요청 실패', response.data.message);
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[94px] mx-auto">
      <Header
        title="정보 수정"
        showStepProgress={true}
        Icon={() => (
            <UploadIcon className="w-6 h-6" />
        )}
      />

      <div className="pt-[32px] flex gap-[40px]">
        <div className="w-[560px] flex-col rounded-[32px] flex items-center justify-center gap-[24px]">
          <img
            src={croppedImage}
            alt="Cropped Preview"
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
          className="font-md-medium w-[200px] h-[48px] text-center border border-primary-600 text-primary-600 px-6 py-3 rounded-[12px]"
          onClick={() => navigate(-1)}
        >
          이전
        </button>
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

export default Step2;
