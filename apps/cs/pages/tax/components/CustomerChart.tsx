import { useEffect, useState } from 'react';
import ChartPagination from '../../../../../packages/common/ChartPagination';
import CustomerChartContent from './CustomerChartContent';
import CustomerChartHeader from './CustomerChartHeader';

interface CustomerChartProps {
  startDate: string | null;
  endDate: string | null;
  searchTriggered: boolean;
  selectedStatus: string | null;
}

const CustomerChart = ({
  startDate,
  endDate,
  searchTriggered,
  selectedStatus
}: CustomerChartProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate, searchTriggered, selectedStatus]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="mt-4 flex h-[714px] flex-col border border-gray-300 bg-white rounded-3xl">
      <CustomerChartHeader />

      <div className="flex-grow">
        <CustomerChartContent
          startDate={startDate}
          endDate={endDate}
          selectedStatus={selectedStatus}
          searchTriggered={searchTriggered}
          currentPage={currentPage}
          pageSize={pageSize}
          setTotalItems={setTotalItems}
        />
      </div>

      <ChartPagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default CustomerChart;
