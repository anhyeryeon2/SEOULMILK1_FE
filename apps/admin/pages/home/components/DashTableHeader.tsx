import ChartLine from '../../../../../src/Icon/ChartLine';

const DashTableHeader = () => {
  return (
    <>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[120px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        성명
      </div>
      <div className="mt-1">
        <ChartLine />
      </div>
      <div className="w-[298px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        소속기관
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
      <div className="w-[170px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
        등록일자
      </div>
    </>
  );
};

export default DashTableHeader;
