import { useEffect, useState } from 'react';
import UnderIcon from '../../src/Icon/UnderIcon';
import TwoArrowIcon from '../../src/Icon/TwoArrowIcon';
import ArrowIcon from '../../src/Icon/ArrowIcon';

interface ChartPaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ChartPagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange
}: ChartPaginationProps) => {
  const [selectedPageSize, setSelectedPageSize] = useState(pageSize);
  const [totalPages, setTotalPages] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (totalItems > 0 && pageSize > 0) {
      setTotalPages(Math.ceil(totalItems / pageSize));
    } else {
      setTotalPages(1);
    }
  }, [totalItems, pageSize]);

  const handlePageSizeChange = (size: number) => {
    setSelectedPageSize(size);
    onPageSizeChange(size);
    onPageChange(1);
    setIsDropdownOpen(false);
    setIsClicked(true);
  };

  return (
    <div className="flex w-[960px] h-[56px] px-5 justify-end items-center border-t border-gray-300">
      <div className="flex items-center gap-9">
        <span className="text-gray-500 font-sm-medium">페이지 당 행</span>

        <div className="relative py-[6px]">
          <div
            className={`flex w-[84px] h-[34px] font-sm-medium px-4 text-left rounded-xl cursor-pointer items-center justify-between border border-solid 
              ${
                isDropdownOpen || isClicked
                  ? 'border-primary-700 text-primary-700'
                  : 'border-gray-300 text-gray-500'
              }`}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsClicked(true);
            }}
          >
            <span>{selectedPageSize}</span>
            <UnderIcon
              fill={isDropdownOpen || isClicked ? '#009856' : '#B0B0B0'}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute bottom-full w-[84px] py-2 px-1 bg-white flex flex-col rounded-xl drop-shadow-elevation1 z-50">
              {[10, 20, 30, 40].map((size) => (
                <div
                  key={size}
                  onClick={() => handlePageSizeChange(size)}
                  className={`text-gray-500 font-sm-medium flex w-[76px] h-[34px] justify-center items-center rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100 
                    ${
                      selectedPageSize === size
                        ? 'bg-primary-50 text-primary-600'
                        : ''
                    }`}
                >
                  {size}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-[29px]">
          <div
            onClick={() => currentPage > 1 && onPageChange(1)}
            className={`cursor-pointer ${
              currentPage === 1 ? 'opacity-50' : ''
            }`}
          >
            <TwoArrowIcon />
          </div>

          <div
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`cursor-pointer ${
              currentPage === 1 ? 'opacity-50' : ''
            }`}
          >
            <ArrowIcon />
          </div>

          <div className="text-gray-500 text-center font-sm-medium">
            {currentPage} / {totalPages} 페이지
          </div>

          <div
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={`cursor-pointer rotate-180 ${
              currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <ArrowIcon />
          </div>

          <div
            onClick={() => currentPage < totalPages && onPageChange(totalPages)}
            className={`cursor-pointer rotate-180 ${
              currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <TwoArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPagination;
