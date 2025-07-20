import { useEffect, useState } from 'react';
import StatusBadge, {
  Status
} from '../../../../../packages/common/StatusBagde';
import TaxDetailModal from '../../../../../packages/common/TaxDetailModal';
import api from '../../../../../packages/hooks/api';
import { useLocation, useSearchParams } from 'react-router-dom';

interface CustomerChartContentProps {
  startDate: string | null;
  endDate: string | null;
  searchTriggered: boolean;
  selectedStatus: string | null;
  currentPage: number;
  pageSize: number;
  setTotalItems: (total: number) => void;
}

interface InvoiceData {
  id: string;
  status: Status;
  number: string;
  title: string;
  date: string;
  center: string;
  ntsTaxId: string;
  team: string;
  taxDate: string;
  approvalNo: string;
  supplier: string;
  recipient: string;
  dateFormatted: string;
  amount: string;
  originalStatus: string;
}

const statusMap: Record<string, Status> = {
  APPROVE: '승인',
  REFUSED: '반려',
  WAIT: '반려'
};

const CustomerChartContent = ({
  startDate,
  endDate,
  searchTriggered,
  selectedStatus,
  currentPage,
  pageSize,
  setTotalItems
}: CustomerChartContentProps) => {
  const [data, setData] = useState<InvoiceData[]>([]);
  const [filteredData, setFilteredData] = useState<InvoiceData[]>([]);
  const [selectedItem, setSelectedItem] = useState<InvoiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const parseDate = (dateString: string): Date => {
    if (!dateString) return new Date(0);
    const [year, month, day] = dateString.split('.');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const params: Record<string, any> = {
          page: currentPage - 1,
          size: pageSize
        };

        const response = await api.get('/cs/search/tax', {
          headers: { Authorization: `Bearer ${token}` },
          params
        });

        if (response.data.isSuccess) {
          const transformedData = response.data.result.responseList.map(
            (item: any) => ({
              id: item.ntsTaxId.toString(),
              number: item.ntsTaxId.toString(),
              title: item.title,
              date: item.taxDate,
              center: item.team,
              originalStatus: item.status,
              status: statusMap[item.status] || '대기중',
              dateFormatted: item.taxDate
            })
          );

          setData(transformedData);
          setTotalItems(response.data.result.totalElements);

          if (searchTriggered) {
            let filtered = [...transformedData];

            if (startDate && endDate) {
              const start = parseDate(startDate);
              const end = parseDate(endDate);

              filtered = filtered.filter((item) => {
                const itemDate = parseDate(item.date);
                return itemDate >= start && itemDate <= end;
              });
            }

            if (selectedStatus && selectedStatus !== '선택') {
              filtered = filtered.filter((item) => {
                return (
                  item.originalStatus === selectedStatus ||
                  item.status === selectedStatus
                );
              });
            }

            setFilteredData(filtered);
          } else {
            setFilteredData(transformedData);
          }

          const taxIdParam = searchParams.get('taxId');
          if (taxIdParam) {
            const itemToSelect = transformedData.find(
              (item: { id: string }) => item.id === taxIdParam
            );
            if (itemToSelect) {
              setSelectedItem(itemToSelect);
              setIsModalOpen(true);
            }
          }
        } else {
          console.error('API 요청 실패:', response.data.message);
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [
    startDate,
    endDate,
    selectedStatus,
    currentPage,
    pageSize,
    searchTriggered,
    searchParams,
    setTotalItems
  ]);

  const handleItemClick = (item: InvoiceData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setSearchParams({ taxId: item.id });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('taxId');
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const handleRedirectFromEdit = () => {
      const taxIdParam = searchParams.get('taxId');
      if (taxIdParam && !isModalOpen) {
        const item = data.find((item) => item.id === taxIdParam);
        if (item) {
          setSelectedItem(item);
          setIsModalOpen(true);
        }
      }
    };

    handleRedirectFromEdit();
  }, [location.pathname, data, isModalOpen, searchParams]);

  return (
    <div className="h-[602px] w-[960px] overflow-y-auto overflow-x-hidden custom-scrollbar">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div
            key={index}
            className={`mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium cursor-pointer ${
              selectedItem?.id === item.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleItemClick(item)}
          >
            <div className="w-[92px] pl-4">
              <StatusBadge status={item.status} />
            </div>
            <div className="w-[92px] pl-9 text-sm font-medium text-gray-700">
              {item.number}
            </div>
            <div className="w-[358px] pl-7 text-sm font-medium text-gray-700">
              {item.title}
            </div>
            <div className="w-[170px] pl-7 text-sm font-medium text-gray-700 tabular-nums">
              {item.date}
            </div>
            <div className="w-[200px] pl-7 text-sm font-medium text-gray-700">
              {item.center}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500 font-medium">
          {data.length > 0
            ? '선택한 조건에 해당하는 데이터가 없습니다.'
            : '데이터를 불러오는 중입니다...'}
        </div>
      )}

      <TaxDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default CustomerChartContent;
