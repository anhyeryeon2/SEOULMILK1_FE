import ChartLine from '../../../../../src/Icon/ChartLine';

const CustomerChartHeader = () => {
  return (
    <div className="flex w-[960px] h-14 pl-2 pr-5 items-center border-b border-gray-300">
      <div className="w-[92px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        상태
      </div>

      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[92px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        번호
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[200px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        대리점
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[358px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        제목
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[170px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        발행일
      </div>
    </div>
  );
};

export default CustomerChartHeader;
