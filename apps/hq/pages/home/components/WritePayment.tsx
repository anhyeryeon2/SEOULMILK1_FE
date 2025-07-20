import { useEffect, useState } from 'react';
import WriteChartContents from './WriteChartContents';
import WriteChartHeader from './WriteChartHeader';

interface LenghProps {
  onWriteDataLength: (length: number) => void;
}

const WritePayment = ({ onWriteDataLength }: LenghProps) => {
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    onWriteDataLength(dataLength);
  }, [dataLength, onWriteDataLength]);
  return (
    <div className="mt-4 flex h-[341px] flex-col border border-gray-300 bg-white rounded-3xl">
      <WriteChartHeader />
      <div className="flex-grow">
        <WriteChartContents onWriteDataLength={setDataLength} />
      </div>
    </div>
  );
};
export default WritePayment;
