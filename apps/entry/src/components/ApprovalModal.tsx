function ApprovalModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-[328px] h-[191px] rounded-[16px] shadow-[16px] drop-shadow-elevation2">
        <div className="py-[40px] gap-[4px]">
          <p className="font-xl-semibold text-center text-gray-800">
            아직 가입 승인이 되지 않았어요.
          </p>
          <p className="text-gray-500 font-md-medium text-center">
            가입 승인을 기다려 주세요.
          </p>
        </div>

        <div className="flex justify-center border-t-[1px] border-gray-300 ">
          <button
            className="w-[328px] h-[56px] text-gray-600 rounded-lg font-md-semibold py-[16px] px-[12px]"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApprovalModal;
