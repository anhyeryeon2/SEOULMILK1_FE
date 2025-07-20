import { useEffect, useState } from 'react';
import api from '../../../../../packages/hooks/api';

interface WriteResolutionProps {
  paymentResolutionId: number;
  suDeptName: string;
  paymentResolutionName: string;
  createdAt: string;
  hqUserName: string;
}

interface LenghProps {
  onWriteDataLength: (length: number) => void;
}

const WriteChartContents = ({ onWriteDataLength }: LenghProps) => {
  const [data, setData] = useState<WriteResolutionProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');

        const response = await api.get('/hq/payment-resolution/list/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('333', response.data);
        // console.log('444', response.data.result.responseList.length);
        setData(response.data.result);
        onWriteDataLength(response.data.result.length);
      } catch (error) {
        console.error('연결에 에러가 발생했습니다.', error);
      }
    };
    getData();
  }, []);
  return (
    <div className="h-[285px] w-[960px] overflow-y-auto overflow-x-hidden custom-scrollbar ">
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium cursor-pointer"
          >
            <div className="w-[200px] pl-5 font-sm-medium text-gray-800">
              {item.suDeptName}
            </div>
            <div className="w-[350px] pl-5 font-sm-medium text-gray-800">
              {item.paymentResolutionName}
            </div>
            <div className="w-[170px] pl-6 font-sm-medium text-gray-800 tabular-nums">
              {item.createdAt}
            </div>
            <div className="w-[120px] pl-6 font-sm-medium text-gray-800">
              {item.hqUserName}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center font-xl-medium text-gray-400 mt-[129px]">
          작성된 지급결의서가 없어요
        </div>
      )}
    </div>
  );
};

export default WriteChartContents;
