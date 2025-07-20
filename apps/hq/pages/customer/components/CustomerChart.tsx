import { useState, useEffect } from 'react';
import ChartPagination from '../../../../../packages/common/ChartPagination';
import CustomerChartContent from './CustomerChartContent';
import CustomerChartHeader from './CustomerChartHeader';

interface CustomerChartProps {
  searchTerm: string;
}

const CustomerChart = ({ searchTerm }: CustomerChartProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (currentPage > Math.ceil(totalItems / pageSize)) {
      setCurrentPage(1);
    }
  }, [totalItems, pageSize, currentPage]);

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
    <div className="mt-4 flex h-[778px] flex-col border border-gray-300 bg-white rounded-3xl">
      <CustomerChartHeader />

      <div className="flex-grow">
        <CustomerChartContent
          searchTerm={searchTerm}
          currentPage={currentPage}
          pageSize={pageSize}
          onTotalItemsChange={handleTotalItemsChange}
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
