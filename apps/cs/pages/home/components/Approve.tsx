import { useEffect, useState } from 'react';
import ApproveHeader from './ApproveHeader';
import api from '../../../../../packages/hooks/api';
import TaxApproveIcon from '../../../../../src/Icon/TaxApproveIcon';

interface ApproveProps {
  ntsTaxId: number;
  title: string;
  taxDate: string;
  name: string;
}

const Approve = () => {
  const [data, setData] = useState<ApproveProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await api.get('/cs/tax/approve', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setData(response.data.result.responseList);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="mt-12 flex flex-row gap-2 items-center">
        <TaxApproveIcon />
        <span className="text-gray-800 font-2xl-bold"> 승인 </span>
        <span className="text-gray-500 font-2xl-medium"> {data.length} </span>
      </div>
      {/* // */}
      <div className="mt-4 flex h-[341px] flex-col border border-gray-300 bg-white rounded-3xl">
        <ApproveHeader />

        <div className="h-[602px] w-[960px] overflow-y-scroll overflow-x-hidden custom-scrollbar">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.ntsTaxId}
                className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium cursor-pointer"
              >
                <div className="w-[350px] pl-5 text-sm font-medium text-gray-700">
                  {item.title}
                </div>
                <div className="w-[170px] pl-5 text-sm font-medium text-gray-700 tabular-nums">
                  {item.taxDate}
                </div>
                <div className="w-[120px] pl-5 text-sm font-medium text-gray-700">
                  {item.name}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center font-xl-medium mt-[129px]">
              세금 계산서 내역이 없어요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Approve;
