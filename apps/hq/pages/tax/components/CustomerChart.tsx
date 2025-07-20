import { useState, useEffect } from 'react';
import CustomerChartContent from './CustomerChartContent';
import CustomerChartHeader from './CustomerChartHeader';
import ChartPagination from '../../../../../packages/common/ChartPagination';

interface CustomerChartProps {
  selectedStatus: string;
  startDate: string | null;
  endDate: string | null;
  searchKeyword: string;
}

const CustomerChart = ({
  selectedStatus,
  startDate,
  endDate,
  searchKeyword
}: CustomerChartProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, startDate, endDate, searchKeyword]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleTotalItemsChange = (totalItems: number) => {
    setTotalItems(totalItems);
  };

  return (
    <div className="w-[960px] h-[650px] bg-white border border-gray-300 rounded-[12px]">
      <CustomerChartHeader />
      <div className="flex-grow">
        <CustomerChartContent
          selectedStatus={selectedStatus}
          startDate={startDate}
          endDate={endDate}
          currentPage={currentPage}
          pageSize={pageSize}
          onTotalItemsChange={handleTotalItemsChange}
          searchKeyword={searchKeyword}
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
