import ChartLine from '../../../../../src/Icon/ChartLine';

const UserDataTableHeader = () => {
  return (
    <>
      <div className="flex w-[960px] h-14 pl-2 pr-5 items-center border-b border-gray-300">
        <div className="w-[92px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
          분류
        </div>
        <div className="mt-1">
          <ChartLine />
        </div>
        <div className="w-[190px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
          소속기관
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
        <div className="w-[170px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
          등록일자
        </div>
        <div className="mt-1">
          <ChartLine />
        </div>
        <div className="w-[140px] h-[42px] pl-5 mt-6 text-gray-500 font-sm-medium">
          등록
        </div>
      </div>
    </>
  );
};

export default UserDataTableHeader;
