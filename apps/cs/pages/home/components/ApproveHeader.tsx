import ChartLine from '../../../../../src/Icon/ChartLine';

const ApproveHeader = () => {
  return (
    <div className="flex w-full h-14 pl-2 pr-5 items-center border-b border-gray-300">
      <div className="w-[350px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        제목
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[170px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        발행일
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[120px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        성명
      </div>
    </div>
  );
};

export default ApproveHeader;
