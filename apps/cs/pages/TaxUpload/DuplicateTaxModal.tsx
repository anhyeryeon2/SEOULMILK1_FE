import { useNavigate } from 'react-router-dom';
import WarningIcon from '../../../../src/Icon/WarningIcon';
interface DuplicateTaxModalProps {
  title: string;
  taxDate: string;
  id: string;
  onClose: () => void;
}

const DuplicateTaxModal = ({
  title,
  taxDate,
  id,
  onClose
}: DuplicateTaxModalProps) => {
  const navigate = useNavigate();

  const isMobileView = window.innerWidth <= 768;

  const handleConfirm = () => {
    if (id) {
      if (isMobileView) {
        navigate(`/cs/tax/${id}`);
      } else {
        navigate(`/cs/tax?taxId=${id}`);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="w-[328px] bg-white rounded-[20px] drop-shadow-elevation2 flex flex-col">
        <div className="pt-10 px-5 text-center">
          <div className="flex items-center justify-center gap-2 font-md-semibold text-gray-800">
            <WarningIcon />
            <span>이미 업로드 된 세금계산서가 있어요</span>
          </div>

          <div className="mt-5 mb-6 p-3 bg-gray-100 rounded-[16px] flex items-center gap-3">
            <div className="text-gray-500">📄</div>
            <div className="text-left">
              <p className="text-gray-800 text-sm truncate w-[230px]">
                {title}
              </p>
              <p className="text-gray-500 text-xs">{taxDate} 발행됨</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full h-[56px] border-t text-gray-600 text-center font-md-semibold rounded-b-[20px]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default DuplicateTaxModal;
