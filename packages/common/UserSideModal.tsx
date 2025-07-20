import { useState } from 'react';
import ArrowIcon from '../../src/Icon/ArrowIcon';
import ConfirmModal from './ConfirmModal';
import LogoutIcon from '../../src/Icon/LogoutIcon';

function UserSideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={() => setIsOpen(true)}>사이드 모달열기</button>

      {isOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 flex justify-end items-center ">
          <div className="bg-white pt-[32px] px-[24px] pb-[471px] rounded-[24px] shadow-lg w-[400px] h-full drop-shadow-elevation3">
            <div className="relative flex items-center">
              <div
                className="absolute left-0 pb-[16px] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <ArrowIcon strokeColor={'#949BA7'} />
              </div>

              <h2 className="flex-1 text-center font-xl-medium text-gray-500 pb-[16px]">
                내 정보
              </h2>
            </div>

            <div className="flex border-b pb-[16px] mb-[16px] gap-[8px]">
              {' '}
              <div>김구름</div>{' '}
              <span className="flex w-[45px] px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                회원
              </span>
            </div>

            <div className="text-gray-500 mb-[8px]">아이디(사번)</div>
            <input
              type="text"
              className="p-[16px] w-[352px] h-[56px] rounded-[12px]  border border-gray-300 mb-[24px]"
            />
            <div className="text-gray-500">이메일</div>
            <input
              type="text"
              className="p-[16px] w-[352px] h-[56px] rounded-[12px] border border-gray-300 mb-[24px]"
            />
            <div className="text-gray-500">연락처</div>
            <input
              type="text"
              className="p-[16px] w-[352px] h-[56px] rounded-[12px] border border-gray-300 mb-[24px]"
            />
            <div className="flex justify-end space-x-2">
              {/* <button
                className="flex px-[24px] py-[12px] gap-2 items-center bg-white rounded-[12px] border border-warning-500 text-warning-500 font-md-medium"
                onClick={() => setIsConfirmOpen(true)}
              >
                <DeleteXIcon /> 회원삭제
              </button> */}
              <button
                className="flex px-[24px] py-[12px] gap-2 items-center bg-white rounded-[12px] border border-gray-500 text-gray-500 font-md-medium"
                onClick={() => setIsOpen(false)}
              >
                <LogoutIcon /> 로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onDelete={() => {
            setIsConfirmOpen(false);
            setIsOpen(false);
          }}
          onConfirm={() => {}}
        />
      )}
    </div>
  );
}

export default UserSideModal;
