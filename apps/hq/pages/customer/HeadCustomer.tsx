import { useState } from 'react';
import CustomerIcon from '../../../../src/Icon/CustomerIcon';
import CustomerChart from './components/CustomerChart';
import Header from '../../../../packages/common/Header';
import Search from '../../../../packages/common/Search';

const HeadCustomer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="mx-[94px] w-[960px]">
      <Header title="대리점 조회" Icon={CustomerIcon} />
      <Search placeholderName="지점을 검색하세요" onSearch={handleSearch} />
      <CustomerChart searchTerm={searchTerm} />
    </div>
  );
};

export default HeadCustomer;
