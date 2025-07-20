import { useEffect, useState } from 'react';
import api from '../../../../../packages/hooks/api';

interface Customer {
  csName: string;
  name: string;
  phone: string;
  email: string;
}

interface CustomerChartContentProps {
  searchTerm: string;
  currentPage: number;
  pageSize: number;
  onTotalItemsChange: (totalItems: number) => void;
}

const CustomerChartContent = ({
  searchTerm,
  currentPage,
  pageSize,
  onTotalItemsChange
}: CustomerChartContentProps) => {
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [data, setData] = useState<Customer[]>([]);
  const [filteredData, setFilteredData] = useState<Customer[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');

        const response = await api.get('/hq/search/cs/info', {
          params: {
            page: 0,
            size: 10000
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = response.data.result.responseList;
        setData(result);
      } catch (error) {
        console.error('데이터 연결에 에러가 발생했습니다.', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.csName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    onTotalItemsChange(filtered.length);
  }, [data, searchTerm, onTotalItemsChange]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="h-[660px] w-[960px] overflow-y-scroll custom-scrollbar">
      {paginatedData.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelectedList(index)}
          className={`flex w-[932px] h-[42px] mx-2 items-start gap-2 rounded-xl flex-col cursor-pointer ${
            selectedList === index ? 'bg-white' : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex">
            <div className="flex w-[200px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.csName}
            </div>
            <div className="flex w-[120px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.name}
            </div>
            <div className="flex w-[200px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium tabular-nums">
              {item.phone}
            </div>
            <div className="flex w-[170px] h-[42px] pl-5 items-center text-gray-800 font-sm-medium">
              {item.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerChartContent;
