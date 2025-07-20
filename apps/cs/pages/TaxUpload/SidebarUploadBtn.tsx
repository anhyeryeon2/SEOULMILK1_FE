import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarUploadIcon from '../../../../src/Icon/SidebarUploadIcon';

const SidebarUploadButton = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        navigate('/cs/upload-tax/step1', {
          state: { selectedImage: reader.result }
        });
      };
    }
  };

  return (
    <div className="px-[8px] mt-[32px]">
      <button
        className="w-full relative flex items-center bg-green-600 text-white px-[8px] py-[12px] rounded-[12px] font-md-semibold"
        onClick={handleButtonClick}
      >
        <span className="pl-[8px]">세금계산서 업로드</span>
        <SidebarUploadIcon className="absolute right-[12px] bottom-0 w-[55px] h-auto" />
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SidebarUploadButton;
