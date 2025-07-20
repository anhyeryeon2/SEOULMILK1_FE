import { useEffect, useState } from 'react';
import StatusBadge, {
  Status
} from '../../../../../packages/common/StatusBagde';
import api from '../../../../../packages/hooks/api';
import { useSearchParams } from 'react-router-dom';
import AdminTaxDetailModal from './AdminTaxDetailModal';

interface InvoiceData {
  id: string;
  status: Status;
  ntsTaxId: string;
  title: string;
  taxDate: string;
  team: string;
  center: string;
  date: string;
  approvalNo: string;
  supplier: string;
  recipient: string;
  dateFormatted: string;
  amount: string;
}

interface CustomerChartContentProps {
  selectedStatus: string;
  startDate: string | null;
  endDate: string | null;
  currentPage: number;
  pageSize: number;
  onTotalItemsChange: (totalItems: number) => void;
  searchKeyword: string;
}

const AdminChartContent = ({
  selectedStatus,
  startDate,
  endDate,
  currentPage,
  pageSize,
  onTotalItemsChange,
  searchKeyword
}: CustomerChartContentProps) => {
  const [data, setData] = useState<InvoiceData[]>([]);
  const [filteredData, setFilteredData] = useState<InvoiceData[]>([]);
  const [selectedItem, setSelectedItem] = useState<InvoiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/admin/search/tax', {
          params: {
            page: 0,
            size: 10000
          },
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log(response.data);

        if (response.data.isSuccess) {
          const transformedData = response.data.result.responseList.map(
            (item: any) => ({
              ntsTaxId: item.ntsTaxId || '',
              status: item.status as Status,
              title: item.title || '',
              taxDate: item.taxDate || '',
              team: item.team || '',
              center: item.csName || ''
            })
          );

          setData(transformedData);
          onTotalItemsChange(transformedData.length);
        } else {
          console.error('API 요청 실패:', response.data.message);
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const parseDate = (dateString: string): Date => {
      if (!dateString) return new Date(0);
      const [year, month, day] = dateString.split('.').map(Number);
      return new Date(year, month - 1, day);
    };

    let result = data;

    if (selectedStatus) {
      result = result.filter((item) => item.status === selectedStatus);
    }
    if (startDate || endDate) {
      result = result.filter((item) => {
        const itemDate = parseDate(item.taxDate);
        return (
          (!startDate || itemDate >= parseDate(startDate)) &&
          (!endDate || itemDate <= parseDate(endDate))
        );
      });
    }
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword) ||
          item.team.toLowerCase().includes(keyword)
      );
    }

    setFilteredData(result);
    onTotalItemsChange(result.length);
  }, [
    selectedStatus,
    startDate,
    endDate,
    searchKeyword,
    data,
    onTotalItemsChange
  ]);

  const handleItemClick = (item: InvoiceData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setSearchParams({ taxId: item.ntsTaxId });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('taxId');
    setSearchParams(newSearchParams);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="h-[538px] w-[960px] overflow-y-scroll custom-scrollbar cursor-pointer">
      {paginatedData.length > 0 ? (
        paginatedData.map((item, index) => (
          <div
            key={index}
            className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium"
            onClick={() => handleItemClick(item)}
          >
            <div className="w-[92px] pl-5">
              <StatusBadge status={item.status} />
            </div>
            <div className="w-[92px] pl-6 text-sm font-medium text-gray-700">
              {item.ntsTaxId}
            </div>
            <div className="w-[200px] pl-6 text-sm font-medium text-gray-700">
              {item.team}
            </div>
            <div className="w-[358px] pl-6 text-sm font-medium text-gray-700">
              {item.title}
            </div>
            <div className="w-[170px] pl-7 text-sm font-medium text-gray-700 tabular-nums">
              {item.taxDate}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          {selectedStatus || startDate || endDate || searchKeyword
            ? '데이터가 없습니다.'
            : ''}
        </div>
      )}
      <AdminTaxDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default AdminChartContent;
