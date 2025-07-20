import UploadImage from '../../../../src/Icon/UploadImage.svg';

interface ConfirmUploadProps {
  title: string;
  message: string;
  onClose: () => void;
  buttonText?: string;
}

const ConfirmUpload = ({
  title,
  message,
  onClose,
  buttonText = '확인했어요'
}: ConfirmUploadProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="w-[320px] h-[319px] bg-white rounded-[20px] drop-shadow-elevation2 flex flex-col items-center justify-between">
        <div className="text-center pt-8">
          <h2 className="font-md-bold text-gray-800">{title}</h2>
          <p
            className="font-sm-medium text-gray-500 mt-2"
            style={{ whiteSpace: 'pre-line' }}
          >
            {message}
          </p>
        </div>
        {/* <UploadImage className="w-22 mt-4" /> */}
        <button
          onClick={onClose}
          className="w-full h-[48px] bg-primary-700 text-white text-center font-md-semibold rounded-b-[20px]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmUpload;
