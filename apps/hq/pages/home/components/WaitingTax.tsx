import { useEffect, useState } from 'react';
import WaitingChartContents from './WaitingChartContents';
import WaitingChartHeader from './WaitingChartHeader';

interface LenghProps {
  onDataLength: (length: number) => void;
}

const WaitingTax = ({ onDataLength }: LenghProps) => {
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    onDataLength(dataLength);
  }, [dataLength, onDataLength]);

  return (
    <div className="mt-4 flex h-[341px] flex-col border border-gray-300 bg-white rounded-3xl">
      <WaitingChartHeader />
      <div className="flex-grow">
        <WaitingChartContents onDataLength={setDataLength} />
      </div>
    </div>
  );
};

export default WaitingTax;
