import { useState } from 'react';
import Header from '../../../../packages/common/Header';
import SelectMonth from '../../../../packages/common/SelectMonth';
import StateDropdown from '../../../../packages/common/StateDropdown';
import Button from '../../../../packages/common/Button';
import SearchIcon from '../../../../src/Icon/SearchIcon';
import ResetIcon from '../../../../src/Icon/ResetIcon';
import CustomerChart from './components/CustomerChart';
import TaxIconGray from '../../../../src/Icon/TaxIconGray';
import SelectCalendar from '../../../../packages/common/SelectCalendar';

const CSTax = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleSelectMonth = (start: string, end: string, label: string) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedMonth(label);
  };

  const handleSelectDate = (date: string, dateType: 'start' | 'end') => {
    if (dateType === 'start') {
      setStartDate(date);
      setSelectedMonth('');
    } else {
      setEndDate(date);
      setSelectedMonth('');
    }
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedMonth('');
    setSelectedStatus(null);
    setSearchTriggered(false);
  };

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="세금계산서 조회" Icon={TaxIconGray} />

      <div className="flex flex-row gap-4 mb-4"></div>
      <div className="flex items-center gap-4 text-gray-500">
        기간
        <SelectMonth
          selectedMonth={selectedMonth}
          onSelectMonth={handleSelectMonth}
        />
        <SelectCalendar
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          onSelectDate={handleSelectDate}
        />
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-4 text-gray-500">
          상태
          <StateDropdown
            selected={selectedStatus || '선택'}
            onChange={handleStatusChange}
            optionsToShow={['승인', '반려']}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-transparent border border-primary-600 text-primary-500 flex items-center gap-1"
            onClick={handleReset}
          >
            <ResetIcon />
            초기화
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1 text-white bg-primary-700"
            onClick={handleSearch}
          >
            <SearchIcon />
            조회
          </Button>
        </div>
      </div>

      {/* 표 */}
      <CustomerChart
        startDate={startDate}
        endDate={endDate}
        searchTriggered={searchTriggered}
        selectedStatus={selectedStatus}
      />
    </div>
  );
};

export default CSTax;
