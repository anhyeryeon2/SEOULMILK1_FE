import { useEffect, useState } from 'react';
import Check from '../../../../../src/Icon/Check';
// import ChartPagination from '../../../../packages/common/ChartPagination';
import ChartPagination from '../../../../../packages/common/ChartPagination';
import DashTableHeader from './DashTableHeader';
import api from '../../../../../packages/hooks/api';

interface UserData {
  userId: number;
  employeeId: number;
  name: string;
  csName: string;
  role: 'ADMIN';
  phone: string;
  createdAt: string;
  isAssigned: string;
}

interface DataTableProps {
  selected: number[];
  toggleSelect: (index: number) => void;
  toggleSelectAll: () => void;
  setDataLength: (length: number) => void;
  userData: UserData[];
  refreshTrigger?: number;
}

const DashDataTable = ({
  selected,
  toggleSelect,
  toggleSelectAll,
  setDataLength,
  userData,
  refreshTrigger = 0
}: DataTableProps) => {
  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayData, setDisplayData] = useState<UserData[]>([]);

  useEffect(() => {
    if (userData && userData.length > 0) {
      const filteredData = userData.filter(
        (user: UserData) => user.isAssigned === '미등록'
      );
      setFilteredData(filteredData);
      setDataLength(filteredData.length);
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/admin/user', {
          params: {
            page: currentPage - 1,
            size: pageSize
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const filteredData = response.data.result.responseList.filter(
          (user: UserData) => user.isAssigned === '미등록'
        );
        setFilteredData(filteredData);
        setDataLength(filteredData.length);
      } catch (error) {
        console.error('데이터 불러오기 에러가 발생했습니다.', error);
        setFilteredData([]);
        setDataLength(0);
      }
    };

    fetchData();
  }, [setDataLength, userData, refreshTrigger]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredData.length);
    setDisplayData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="mt-4 flex h-[786px] w-[960px] flex-col items-start rounded-3xl border border-solid border-gray-300 bg-white">
      <div className="flex w-[960px] h-14 pl-2 pr-5 items-center border-b border-gray-300">
        <div className="relative w-[52px] h-[42px] pl-5 mt-6">
          <input
            type="checkbox"
            className="appearance-none w-5 h-5 rounded-md border border-solid border-gray-300 checked:bg-primary-700 checked:border-primary-700 
      relative peer checked:cursor-pointer cursor-pointer"
            checked={
              selected.length === displayData.length && displayData.length > 0
            }
            onChange={toggleSelectAll}
          />
          <span className="absolute inset-0 bottom-5 left-2 items-center justify-center pointer-events-none hidden peer-checked:flex ">
            <Check stroke="#fff" />
          </span>
        </div>
        <div className="w-[92px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
          분류
        </div>
        <DashTableHeader />
      </div>

      <div className="flex-grow overflow-y-scroll custom-scrollbar">
        {displayData.map((data, index) => (
          <div
            key={index}
            className={`flex w-[932px] h-[42px] items-center mx-2 hover:bg-gray-100 rounded-xl cursor-pointer 
          ${selected.includes(index) ? 'bg-primary-50' : ''}`}
          >
            <div className="w-[52px] pl-5 mt-1 relative">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 rounded-md border border-solid border-gray-300 checked:bg-primary-700 checked:border-primary-700 
      relative peer checked:cursor-pointer cursor-pointer"
                checked={selected.includes(index)}
                onChange={() => toggleSelect(index)}
              />
              <span className="absolute inset-0 bottom-1 left-2 items-center justify-center pointer-events-none hidden peer-checked:flex ">
                <Check stroke="#fff" />
              </span>
            </div>

            <div className="w-[92px] pl-5 text-warning-600 font-sm-medium">
              {data.isAssigned}
            </div>
            <div className="w-[120px] pl-5 text-gray-800 font-sm-medium">
              {data.name}
            </div>
            <div className="w-[298px] pl-5 text-gray-800 font-sm-medium">
              {data.csName}
            </div>
            <div className="w-[200px] pl-5 text-gray-800 font-sm-medium tabular-nums">
              {data.phone}
            </div>
            <div className="w-[170px] pl-5 text-gray-800 font-sm-medium tabular-nums">
              {data.createdAt}
            </div>
          </div>
        ))}
      </div>

      <ChartPagination
        totalItems={filteredData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default DashDataTable;
