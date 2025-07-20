import { useState, useEffect } from 'react';
import ArrowIcon from '../../../../../src/Icon/ArrowIcon';
import DeleteXIcon from '../../../../../src/Icon/DeleteXIcon';
import ConfirmModal from '../../../../../packages/common/ConfirmModal';
import api from '../../../../../packages/hooks/api';

interface UserSideModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    userId: number;
    department?: string;
    email: string;
    phone: string;
    selectedBank?: string;
    accountNumber?: string;
    isAssigned?: string;
  };
  role: 'admin' | 'HQ' | 'CS';
  onDelete: () => void;
}

const UserSideModal = ({
  isOpen,
  onClose,
  user,
  role,
  onDelete
}: UserSideModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(false);
    setIsOpening(false);
    onClose();
  };

  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(user.userId);
      setIsConfirmModalOpen(false);
      handleClose();
      onDelete();
    } catch (error) {
      alert('회원 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
  };

  const deleteUser = async (userId: number) => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.delete(`/admin/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  if (!isOpen && !isOpening) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-end items-start z-50 transition-opacity duration-300 
      ${isOpening && !isClosing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-white pt-8 px-6 pb-10 rounded-2xl shadow-lg w-[400px] max-h-[1024px] h-full flex flex-col transform transition-transform duration-300 
          overflow-y-auto custom-scrollbar ${
            isOpening && !isClosing ? 'translate-x-0' : 'translate-x-full'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-center pb-4">
          <div className="absolute left-0 cursor-pointer" onClick={handleClose}>
            <ArrowIcon strokeColor={'#949BA7'} />
          </div>
          <h2 className="flex-1 text-center font-xl-medium text-gray-500">
            유저 정보
          </h2>
        </div>

        <div className="flex justify-between items-center pt-4 border-b pb-4">
          <div
            className={`flex gap-1 ${role === 'CS' ? 'flex-col' : 'flex-row'}`}
          >
            <div className="text-gray-800 font-xl-bold">{user.name}</div>

            {role === 'admin' &&
              (user.isAssigned !== '미등록' ? (
                <span className="flex gap-[8px] px-[10px] py-[2px] justify-center items-center rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                  대리점 직원
                </span>
              ) : (
                <span className="flex gap-[8px] px-[10px] py-[2px] justify-center items-center rounded-3xl bg-warning-50 text-warning-700 font-xs-semibold">
                  미등록
                </span>
              ))}
            {role === 'HQ' && (
              <span className="flex px-[10px] py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                직원
              </span>
            )}
            {role === 'CS' && (
              <div className="text-gray-500 font-md-regular mt-[4px]">
                서울우유태평고객센터
              </div>
            )}
          </div>
        </div>

        <div className="mt-[16px] space-y-4">
          <div>
            <label className="font-md-medium text-gray-500">아이디</label>
            <input
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium"
              value={user.userId}
              readOnly
            />
          </div>
          {role === 'HQ' && user.department && (
            <div>
              <label className="font-md-medium text-gray-500">부서</label>
              <input
                className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium"
                value={user.department}
                readOnly
              />
            </div>
          )}
          <div>
            <label className="font-md-medium text-gray-500">이메일</label>
            <input
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium"
              value={user.email}
              readOnly
            />
          </div>
          <div>
            <label className="font-md-medium text-gray-500">연락처</label>
            <input
              className="w-full mt-[8px] p-4 h-[56px] rounded-[12px] bg-gray-100 text-gray-600 font-md-medium"
              value={user.phone}
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="w-[128px] px-6 py-3 gap-2 flex items-center justify-centergap-[4px] border border-red-500 text-red-500 rounded-[12px] bg-white font-md-medium whitespace-nowrap"
            onClick={handleDeleteClick}
          >
            <DeleteXIcon />
            회원 삭제
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="회원을 삭제하시겠어요?"
        description="삭제된 회원은 복구할 수 없어요."
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  );
};

export default UserSideModal;
