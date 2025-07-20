import GraySearchIcon from '../../src/Icon/GraySearchIcon';
import SearchIcon from '../../src/Icon/SearchIcon';

interface SearchButtonProps {
  isActive: boolean;
}

const SearchButton = ({ isActive }: SearchButtonProps) => {
  return (
    <div
      className={`relative w-[104px] py-3 px-6 justify-center items-center rounded-xl cursor-pointer ${
        isActive ? 'bg-primary-700' : 'bg-gray-200'
      }`}
    >
      <div className="absolute top-1/2 transform -translate-y-1/2">
        {isActive ? <SearchIcon /> : <GraySearchIcon />}
      </div>
      <span
        className={`ml-5 text-center font-md-medium ${
          isActive ? 'text-white' : 'text-gray-400'
        }`}
      >
        검색
      </span>
    </div>
  );
};

export default SearchButton;
