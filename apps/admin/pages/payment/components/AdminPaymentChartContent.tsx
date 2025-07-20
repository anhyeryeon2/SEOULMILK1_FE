import { useNavigate } from 'react-router-dom';

interface PaymentData {
  paymentResolutionId: number;
  paymentResolutionName: string;
  createdAt: string;
  paymentRecipient: string;
  hqUserName: string;
  suDeptName: string;
}

interface Props {
  data: PaymentData[];
}

const AdminPaymentChartContent = ({ data = [] }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[584px] overflow-y-scroll custom-scrollbar overflow-x-hidden">
      {data.map((item) => (
        <div
          key={item.paymentResolutionId}
          className="mx-[8px] flex w-[932px] h-[42px] items-center rounded-[12px] hover:bg-gray-100 font-sm-medium cursor-pointer"
          onClick={() =>
            navigate(`/admin/admin-payment/detail/${item.paymentResolutionId}`)
          }
        >
          <div className="w-[200px] pl-5 font-sm-medium text-gray-800 truncate">
            {item.suDeptName}
          </div>
          <div className="w-[350px] pl-5 font-sm-medium text-gray-800 truncate">
            {item.paymentResolutionName}
          </div>

          <div className="w-[170px] pl-5 font-sm-medium text-gray-800 tabular-nums">
            {item.createdAt}
          </div>

          <div className="w-[120px] pl-7 font-sm-medium text-gray-800 truncate">
            {item.hqUserName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPaymentChartContent;
