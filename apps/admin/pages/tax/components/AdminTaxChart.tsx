import { useState, useEffect } from 'react';
import ChartPagination from '../../../../../packages/common/ChartPagination';
import AdminChartHeader from './AdminChartHeader';
import AdminChartContent from './AdminChartContent';

interface CustomerChartProps {
  selectedStatus: string;
  startDate: string | null;
  endDate: string | null;
  searchKeyword: string;
}

const AdminTaxChart = ({
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
      <AdminChartHeader />
      <div className="flex-grow">
        <AdminChartContent
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

export default AdminTaxChart;
