import { useState } from 'react';
import ArrowIcon from '../../src/Icon/ArrowIcon';

interface CalendarProps {
  onSelectDate: (date: string) => void;
}

const Calendar = ({ onSelectDate }: CalendarProps) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();
  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;
  const totalCells = Math.ceil((adjustedStartDay + daysInMonth) / 7) * 7;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const daysArray = Array.from({ length: totalCells }, (_, i) => {
    if (i < adjustedStartDay)
      return {
        day: lastDayOfPrevMonth - (adjustedStartDay - 1) + i,
        isCurrentMonth: false
      };
    if (i >= adjustedStartDay + daysInMonth)
      return { day: null, isCurrentMonth: false };
    return { day: i - adjustedStartDay + 1, isCurrentMonth: true };
  });

  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    const selectedDate = `${year}.${(month + 1)
      .toString()
      .padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
    onSelectDate(selectedDate);
  };

  return (
    <div
      className={`flex w-[320px] p-4 flex-col items-center gap-4 rounded-2xl bg-white drop-shadow-elevation2`}
    >
      <div className="flex justify-center items-center gap-2">
        <div onClick={handlePrevMonth} className="cursor-pointer">
          <ArrowIcon strokeColor="#3A404A" />
        </div>
        <div className="text-gray-800 font-xl-bold">
          {year}. {(month + 1).toString().padStart(2, '0')}
        </div>
        <div onClick={handleNextMonth} className="rotate-180 cursor-pointer">
          <ArrowIcon />
        </div>
      </div>

      <div className="grid grid-cols-7 w-[288px] text-center">
        {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
          <div key={index} className="text-gray-400 font-xs-medium">
            {day}
          </div>
        ))}

        {daysArray.map(({ day, isCurrentMonth }, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`flex justify-center items-center p-2 cursor-pointer ${
              day === null
                ? 'text-transparent'
                : isCurrentMonth
                ? day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear()
                  ? 'w-8 h-8 rounded-lg bg-primary-50 text-center text-primary-600 font-md-medium mt-1 ml-1'
                  : 'rounded-lg bg-white text-gray-600 hover:bg-gray-200'
                : 'text-gray-400 opacity-50 cursor-default'
            }`}
          >
            {day !== null ? day : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
