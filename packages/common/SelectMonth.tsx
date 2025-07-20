import { useState, useEffect } from 'react';

interface SelectMonthProps {
  selectedMonth?: string;
  onSelectMonth?: (startDate: string, endDate: string, label: string) => void;
}

const SelectMonth = ({
  selectedMonth,
  onSelectMonth
}: SelectMonthProps = {}) => {
  const [selected, setSelected] = useState('');
  const options = [
    { label: '1개월', value: 1 },
    { label: '3개월', value: 3 },
    { label: '6개월', value: 6 }
  ];

  useEffect(() => {
    setSelected(selectedMonth || '');
  }, [selectedMonth]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const calculateDateRange = (months: number) => {
    const today = new Date();
    const endDate = formatDate(today);

    const startDate = new Date(today);
    startDate.setMonth(today.getMonth() - months);

    return {
      startDate: formatDate(startDate),
      endDate
    };
  };

  const handleSelectMonth = (option: { label: string; value: number }) => {
    setSelected(option.label);
    const { startDate, endDate } = calculateDateRange(option.value);

    if (onSelectMonth) {
      onSelectMonth(startDate, endDate, option.label);
    }
  };

  return (
    <div className="flex w-[280px] h-[48px] p-[6px] bg-white border border-gray-300 rounded-[12px]">
      {options.map((option) => (
        <button
          key={option.label}
          className={`flex-1 px-[12px] py-[6px] rounded-[8px] text-gray-500 font-md-medium transition-all ${
            selected === option.label ? 'bg-green-100 text-green-600' : ''
          }`}
          onClick={() => handleSelectMonth(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SelectMonth;
