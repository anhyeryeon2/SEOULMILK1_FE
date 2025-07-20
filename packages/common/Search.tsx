import { useState, useEffect, ChangeEvent, JSX } from 'react';
import GraySearchIcon from '../../src/Icon/GraySearchIcon';
import { LoginDeleteIcon } from '../../src/Icon/LoginDeleteIcon';
import SearchButton from './SearchButton';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholderName: string;
  showSearchButton?: boolean;
  defaultSearchIcon?: JSX.Element;
  activeSearchIcon?: JSX.Element;
  value?: string;
  reset?: boolean;
}

const Search = ({
  onSearch,
  placeholderName,
  showSearchButton = true,
  defaultSearchIcon = <GraySearchIcon />,
  activeSearchIcon = <GraySearchIcon fillColor="#1aba6e" />,
  value,
  reset = false
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>(value || '');

  useEffect(() => {
    if (reset) {
      setInputValue('');
    }
  }, [reset]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearText = () => {
    setInputValue('');
    onSearch('');
  };

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mt-8 flex flex-row gap-4">
      <div className="relative w-[360px]">
        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handleSearch}
        >
          {inputValue.length > 0 ? activeSearchIcon : defaultSearchIcon}
        </div>
        <input
          placeholder={placeholderName}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`w-full h-12 pl-[44px] pr-4 py-4 rounded-xl border border-solid focus:border-primary-500 ${
            inputValue ? 'border-primary-500 text-gray-800' : 'border-gray-300'
          } placeholder:text-gray-500 placeholder:font-md-medium focus:outline-none`}
        />

        {inputValue.length > 0 && (
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleClearText}
          >
            <LoginDeleteIcon />
          </div>
        )}
      </div>

      {showSearchButton && (
        <div onClick={handleSearch}>
          <SearchButton isActive={true} />
        </div>
      )}
    </div>
  );
};

export default Search;
