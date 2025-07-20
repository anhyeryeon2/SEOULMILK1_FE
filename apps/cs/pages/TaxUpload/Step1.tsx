import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../../packages/common/Header';
import UploadIcon from '../../../../src/Icon/TaxUpload.svg';
import ImageCrop from './ImageCrop';
import api from '../../../../packages/hooks/api';
import ConfirmUpload from './ConfirmUpload';
import DuplicateTaxModal from './DuplicateTaxModal';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ConfirmModal from '../../../../packages/common/ConfirmModal';

const Step1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [duplicateTitle, setDuplicateTitle] = useState<string>('');
  const [duplicateTaxDate, setDuplicateTaxDate] = useState<string>('');
  const [duplicateId, setDuplicateId] = useState<string>('');

  useEffect(() => {
    if (location.state?.selectedImage) {
      setSelectedImage(location.state.selectedImage);
      setCroppedImage(location.state.selectedImage);
    }
  }, [location.state]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
        setCroppedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReuploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!croppedImage) {
      return;
    }
    setIsUploading(true);

    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();

      const uniqueFilename = `cropped-${uuidv4()}.png`;
      console.log('생성된 이미지 파일명:', uniqueFilename);

      const formData = new FormData();
      formData.append('file', blob, uniqueFilename);

      for (const [key, value] of formData.entries()) {
        console.log(`FormData Key: ${key}, Value:`, value);
      }

      // 1. OCR 요청을 먼저 보내 중복 확인
      const res = await api.post('/tax/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('OCR 응답:', res.data);

      if (!res.data.isSuccess) {
        console.error('서버 오류 발생:', res.data.message);
        setErrorMessage('파일 업로드 중 오류가 발생했어요');
        setIsErrorModalOpen(true);
        return;
      }

      const { ntsTaxId, issueId, status, title, issueDate } = res.data.result;

      if (issueId === '이미 등록된 세금계산서입니다.') {
        if (status === 'APPROVE') {
          setDuplicateId(ntsTaxId.toString());
          setDuplicateTitle(title || '세금계산서');
          setDuplicateTaxDate(issueDate || '날짜 없음');
          setIsDuplicateModalOpen(true);
          return;
        }
        if (status === 'WAIT' || 'REFUSED') {
          //  2. 반려된 세금계산서인 경우, 삭제 요청 먼저
          await api.delete(`/tax/${ntsTaxId}`);
          console.log(`기존 반려된 세금계산서 삭제 완료: ${ntsTaxId}`);

          // 3. 삭제 후 OCR 재요청
          const res = await api.post('/tax/ocr', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });

          console.log('삭제완료후 재요청 ocr 응답:', res.data.result);

          // 4. 새로운 ID로 Step2 이동
          navigate(`/cs/upload-tax/step2?taxId=${ntsTaxId}`, {
            state: { ocrData: res.data, selectedImage: croppedImage }
          });
          return;
        }
      }

      // 중복이 아니면 정상적으로 step2 이동
      navigate(`/cs/upload-tax/step2?taxId=${ntsTaxId}`, {
        state: { ocrData: res.data, selectedImage: croppedImage }
      });
    } catch (error) {
      console.error('OCR 업로드 실패', error);
      setErrorMessage('파일 업로드 중 오류가 발생했습니다.');
      setIsErrorModalOpen(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleErrorConfirm = () => {
    setIsErrorModalOpen(false);
    setSelectedImage(undefined);
    setCroppedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };
  const handleErrorClose = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="px-[94px] mx-auto">
      <Header
        title="세금계산서 업로드"
        showStepProgress={true}
        Icon={() => (
          // <img src={uploadIcon} alt="세금계산서 업로드" className="w-6 h-6" />
          <UploadIcon className="w-6 h-6" />
        )}
      />
      {/* 처음 사진업로드 확인모달 */}
      {isModalOpen && (
        <ConfirmUpload
          title="여러 장의 세금계산서는 오류가 생겨요!"
          message="한 장만 나오도록 사진을 잘라주세요."
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {/* 중복일경우 모달 */}
      {isDuplicateModalOpen && (
        <DuplicateTaxModal
          id={duplicateId}
          title={duplicateTitle}
          taxDate={duplicateTaxDate}
          onClose={() => setIsDuplicateModalOpen(false)}
        />
      )}
      {/* 서버 오류 모달 */}
      {isErrorModalOpen && (
        <ConfirmModal
          isOpen={isErrorModalOpen}
          onClose={handleErrorClose}
          onConfirm={handleErrorConfirm}
          title="업로드에 실패했어요"
          description={errorMessage}
          confirmText="재업로드"
          cancelText="돌아가기"
          isPrimary={true}
        />
      )}
      <div className="mr-20">
        <ImageCrop
          initialImage={selectedImage}
          onCropComplete={(croppedImg) => setCroppedImage(croppedImg)}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="mt-[64px] flex gap-[24px] justify-center">
        <button
          className="font-md-medium w-[200px] h-[48px] text-center border border-primary-600 text-primary-600 px-6 py-3 rounded-[12px]"
          onClick={handleReuploadClick}
        >
          다시 업로드
        </button>
        <button
          className="font-md-medium w-[200px] h-[48px] text-center bg-primary-600 text-white px-6 py-3 rounded-[12px]"
          onClick={handleUpload}
          disabled={!croppedImage || isUploading}
        >
          {isUploading ? '업로드 중...' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default Step1;
