import { useState, useRef } from 'react';
import StateDropdownIcon from '../../src/Icon/StateDropdownIcon';

interface DropdownProps {
  selected?: string;
  onChange?: (bank: string) => void;
  optionsToShow?: string[];
}

const BankDropdown = ({
  selected = '은행 선택',
  onChange,
  optionsToShow
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const allBanks = [
    '국민은행',
    '신한은행',
    '우리은행',
    '하나은행',
    '농협은행',
    '기업은행',
    '카카오뱅크',
    '토스뱅크',
    '케이뱅크'
  ];
  const options = optionsToShow
    ? allBanks.filter((bank) => optionsToShow.includes(bank))
    : allBanks;
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useState(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleSelect = (bank: string) => {
    if (selected !== bank) {
      setIsOpen(false);
      if (onChange) {
        onChange(bank);
      }
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-[352px] h-12 px-4 py-3 border rounded-xl bg-white border-solid transition-all ${
          selected === '은행 선택'
            ? 'border-gray-300 text-gray-500'
            : 'border-primary-700 text-primary-700'
        } ${isOpen ? 'border-primary-700' : ''}`}
      >
        {selected}
        <StateDropdownIcon selected={selected} />
      </button>
      {isOpen && (
        <div className="absolute mt-[8px] w-[352px] px-[8px] py-[12px] font-md-medium bg-white border border-gray-100 rounded-[12px] drop-shadow-elevation2">
          {options.map((bank) => (
            <button
              key={bank}
              className={`block w-full px-[8px] py-2 text-center text-gray-500 rounded-[8px] hover:bg-gray-100 ${
                selected === bank
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : ''
              }`}
              onClick={() => handleSelect(bank)}
              disabled={selected === bank}
            >
              {bank}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankDropdown;
