interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDelete?: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isPrimary?: boolean; 
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '확인',
  description = '정말로 진행하시겠습니까?',
  confirmText = '확인',
  cancelText = '취소',
  isPrimary = false 
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-[9999]">
      <div className="bg-white w-[328px] rounded-[16px] shadow-lg gap-[4px] drop-shadow-elevation2 z-[10000]">
        <p className="font-xl-semibold mt-[40px] text-center text-gray-800">
          {title}
        </p>
        <p className="text-gray-500 font-md-medium mt-[4px] mb-[40px] text-center">
          {description}
        </p>
        <div className="flex">
          <button
            className="w-[164px] h-[56px] bg-gray-200 text-gray-600 rounded-bl-[16px] font-md-semibold"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className={`w-[164px] h-[56px] text-white rounded-br-[16px] font-md-semibold transition ${
              isPrimary
                ? 'bg-primary-600 hover:bg-primary-700' 
                : 'bg-warning-400 hover:bg-warning-500' 
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
