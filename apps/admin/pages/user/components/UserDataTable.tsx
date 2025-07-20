import { useEffect, useState } from 'react';
import UserSideModal from './UserSideModal';
import ChartPagination from '../../../../../packages/common/ChartPagination';
import UserDataTableHeader from './UserDataTableHeader';
import PlusIcon from '../../../../../src/Icon/PlusIcon';
import api from '../../../../../packages/hooks/api';

interface User {
  userId: number;
  loginId: string;
  name: string;
  phone: string;
  role: 'ADMIN';
  csName: string;
  createdAt: string;
  isAssigned: string;
  email: string;
}

interface UserDataTableProps {
  searchTerm: string;
}

const UserDataTable = ({ searchTerm }: UserDataTableProps) => {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/admin/user', {
          params: {
            page: 0,
            size: 10000
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setData(response.data.result.responseList);
      } catch (error) {
        console.error('유저 데이터 불러오기 실패:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      setFilteredData(
        data.filter((user) =>
          [user.csName, user.name].some((field) =>
            field?.toLowerCase().includes(searchTermLower)
          )
        )
      );
    }
  }, [searchTerm, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const deleteUser = (userId: number) => {
    setData((prev) => prev.filter((user) => user.userId !== userId));
  };

  const handleApproveUser = async (userId: number) => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.post(`/admin/approve/${userId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setData((prev) =>
          prev.map((user) =>
            user.userId === userId ? { ...user, isAssigned: '등록' } : user
          )
        );
      }
    } catch (error) {
      console.error('등록 실패:', error);
    }
  };

  return (
    <div className="mt-4 flex h-[778px] w-[960px] flex-col items-start rounded-3xl border border-solid border-gray-300 bg-white">
      <UserDataTableHeader />

      <div className="flex-grow mx-2 overflow-y-scroll custom-scrollbar">
        {paginatedData.length === 0 ? (
          <div className="text-center text-gray-500 ml-[400px]">
            데이터가 없습니다.
          </div>
        ) : (
          paginatedData.map((row) => (
            <div
              key={row.userId}
              className="flex w-[932px] h-[42px] items-center hover:bg-gray-100 rounded-xl cursor-pointer"
              onClick={() => openModal(row)}
            >
              <div
                className={`w-[92px] pl-5 font-sm-medium ${
                  row.isAssigned === '미등록'
                    ? 'text-warning-600'
                    : 'text-gray-800'
                }`}
              >
                {row.isAssigned}
              </div>
              <div className="w-[190px] pl-5 gap-5 text-gray-800 font-sm-medium">
                {row.csName}
              </div>
              <div className="w-[120px] pl-5 ml-1 text-gray-800 font-sm-medium">
                {row.name}
              </div>
              <div className="w-[200px] pl-5 text-gray-800 font-sm-medium tabular-nums">
                {row.phone}
              </div>
              <div className="w-[170px] pl-5 ml-1 text-gray-800 font-sm-medium tabular-nums">
                {row.createdAt}
              </div>
              <div className="w-[140px] px-5 py-2 items-center">
                {row.isAssigned === '미등록' && (
                  <button
                    className="flex w-[85px] h-[26px] gap-1 pl-2 pr-3 items-center justify-center rounded-lg bg-[#E6F1F7] text-[#2C72FF] font-xs-regular whitespace-nowrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApproveUser(row.userId);
                    }}
                  >
                    <PlusIcon />
                    등록하기
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <ChartPagination
        totalItems={filteredData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {isModalOpen && selectedUser && (
        <UserSideModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          role="admin"
          onDelete={() => deleteUser(selectedUser.userId)}
        />
      )}
    </div>
  );
};

export default UserDataTable;
