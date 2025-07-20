import ChartLine from '../../../../../src/Icon/ChartLine';

const PaymentChartHeader = () => {
  return (
    <div className="flex w-[960px] h-14 pl-2 pr-5 px-8 items-center border-b border-gray-300">
      <div className="w-[200px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        대리점
      </div>

      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[350px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        제목
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[170px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        작성일
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[120px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        본사 담당자
      </div>
    </div>
  );
};

export default PaymentChartHeader;
