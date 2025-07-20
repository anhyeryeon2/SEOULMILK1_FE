import { useState, useEffect } from 'react';
import HomeGrayIcon from '../../../../src/Icon/HomeGrayIcon';
import DashDataTable from './components/DashDataTable';
import Check from '../../../../src/Icon/Check';
import Header from '../../../../packages/common/Header';
import api from '../../../../packages/hooks/api';

interface UserData {
  userId: number;
  employeeId: number;
  name: string;
  csName: string;
  role: 'ADMIN';
  phone: string;
  createdAt: string;
  isAssigned: string;
}

const DashBoard = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [data, setData] = useState<UserData[]>([]);
  const [dataLength, setDataLength] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accesstoken');
      const response = await api.get('/admin/user?page=0&size=100', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const filteredData = response.data.result.responseList.filter(
        (user: UserData) => user.isAssigned === '미등록'
      );
      setData(filteredData);
      setDataLength(filteredData.length);
    } catch (error) {
      console.error('Error fetching data:', error);

      setData([]);
      setDataLength(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const toggleSelect = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    setSelected((prev) =>
      prev.length === dataLength
        ? []
        : Array.from({ length: dataLength }, (_, i) => i)
    );
  };

  const handleAllApprove = async () => {
    try {
      const userIdsToApprove = selected
        .map((index) => data[index]?.userId)
        .filter(Boolean);

      if (userIdsToApprove.length === 0) return;

      const token = localStorage.getItem('accesstoken');

      const approvalPromises = userIdsToApprove.map((userId) =>
        api.post(`/admin/approve/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      );

      await Promise.all(approvalPromises);

      setSelected([]);

      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Error approving users:', error);
    }
  };

  return (
    <div className="mx-[94px]">
      <Header title="홈" Icon={HomeGrayIcon} />

      <div className="flex flex-row justify-between mt-[37px] h-[40px] w-[960px]">
        <div className="flex flex-row gap-2">
          <div className="text-gray-800 font-2xl-bold">등록되지 않은 유저</div>
          <span className="text-gray-500 font-2xl-medium"> {dataLength} </span>
        </div>

        {selected.length > 0 && (
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex flex-row justify-center items-center gap-1">
              <Check />
              <span className="text-primary-700 text-center font-md-medium">
                {selected.length} {selected.length === 0 ? ' ' : '건 선택'}
              </span>
            </div>
            <button
              className="flex px-4 py-2 justify-center items-center gap-1 rounded-xl bg-primary-700 text-white font-md-medium"
              onClick={handleAllApprove}
            >
              등록하기
            </button>
          </div>
        )}
      </div>

      <DashDataTable
        selected={selected}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
        setDataLength={setDataLength}
        userData={data}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default DashBoard;
