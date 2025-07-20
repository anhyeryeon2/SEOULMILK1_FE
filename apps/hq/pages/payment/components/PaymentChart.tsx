import { useState, useEffect } from 'react';
import PaymentChartHeader from './PaymentChartHeader';
import PaymentChartContent from './PaymentContent';
import api from '../../../../../packages/hooks/api';
import ChartPagination from '../../../../../packages/common/ChartPagination';

interface PaymentData {
  paymentResolutionId: number;
  paymentResolutionName: string;
  createdAt: string;
  paymentRecipient: string;
  hqUserName: string;
  suDeptName: string;
}

interface PaymentChartProps {
  searchTerm: string;
  startDate: string | null;
  endDate: string | null;
  selectedMonth: string;
  isFilterApplied: boolean;
}

const PaymentChart = ({
  searchTerm,
  startDate,
  endDate,
  selectedMonth,
  isFilterApplied
}: PaymentChartProps) => {
  const [data, setData] = useState<PaymentData[]>([]);
  const [filteredData, setFilteredData] = useState<PaymentData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/hq/payment-resolution/list', {
          params: {
            page: isFilterApplied ? 0 : currentPage - 1,
            size: isFilterApplied ? 1000 : pageSize
          },
          headers: { Authorization: `Bearer ${token}` }
        });

        setData(response.data.result.results);
        if (!isFilterApplied) {
          setFilteredData(response.data.result.results);
          setTotalItems(response.data.result.total);
        }
      } catch {
        setError('서버 요청 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [currentPage, pageSize, isFilterApplied]);

  useEffect(() => {
    if (!isFilterApplied) return;

    const filterPayments = () => {
      let filtered = data;

      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.paymentResolutionName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }

      if (startDate && endDate) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
          );
        });
      }

      if (selectedMonth) {
        const monthsAgo = new Date();
        monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(selectedMonth));
        filtered = filtered.filter(
          (item) => new Date(item.createdAt) >= monthsAgo
        );
      }

      setTotalItems(filtered.length);
      setFilteredData(
        filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      );

      if (
        currentPage > Math.ceil(filtered.length / pageSize) &&
        filtered.length > 0
      ) {
        setCurrentPage(1);
      }
    };

    filterPayments();
  }, [
    searchTerm,
    startDate,
    endDate,
    selectedMonth,
    data,
    isFilterApplied,
    currentPage,
    pageSize
  ]);

  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
      <PaymentChartHeader />

      <div className="flex-grow">
        {loading ? (
          <p className="text-center py-6 text-gray-500">로딩 중...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredData.length === 0 ? (
          <p className="text-center py-6 text-gray-500">
            지급결의서가 없습니다.
          </p>
        ) : (
          <PaymentChartContent data={filteredData} />
        )}
      </div>

      <ChartPagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default PaymentChart;
