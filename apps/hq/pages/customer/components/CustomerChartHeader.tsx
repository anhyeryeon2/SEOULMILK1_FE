import ChartLine from '../../../../../src/Icon/ChartLine';

const CustomerChartHeader = () => {
  return (
    <div className="flex w-[960px] h-14 pl-2 pr-5 items-center border-b border-gray-300">
      <div className="w-[200px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        대리점
      </div>

      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[120px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        성명
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[200px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        연락처
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[179px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        이메일
      </div>
    </div>
  );
};

export default CustomerChartHeader;
