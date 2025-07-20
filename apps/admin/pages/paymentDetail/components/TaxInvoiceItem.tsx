import ChatLine from '../../../../../src/Icon/ChartLine';
interface TaxInvoiceListProps {
  paymentDetails: {
    ntsId: number | null;
    ntsTaxNum: string;
    issueDate: string;
    supplyAmount: number;
  }[];
  onTaxItemClick: (item: any) => void;
}
const AdminTaxInvoiceList = ({
  paymentDetails,
  onTaxItemClick
}: TaxInvoiceListProps) => {
  return (
    <div className="mb-8">
      <h2 className="font-2xl-bold text-gray-800 mb-6">반영된 세금계산서</h2>

      <div className="w-[960px] rounded-[24px] border border-gray-200 overflow-hidden">
        <div className="flex items-center h-[42px] bg-gray-50 border-b border-gray-300 mt-[14px] pl-2 pr-5">
          <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[100px]">
            번호
          </div>
          <ChatLine />
          <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[350px]">
            세금계산서 번호
          </div>
          <ChatLine />
          <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[180px]">
            발행일
          </div>
          <ChatLine />
          <div className="pl-5 pr-5 text-gray-500 font-sm-medium w-[200px]">
            공급가액
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {paymentDetails && paymentDetails.length > 0 ? (
            paymentDetails.map((tax, index) => (
              <TaxInvoiceItem
                key={index}
                index={index}
                tax={tax}
                onClick={onTaxItemClick}
              />
            ))
          ) : (
            <p className="text-center py-6 text-gray-500">
              조회된 세금계산서가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface TaxInvoiceItemProps {
  index: number;
  tax: {
    ntsId: number | null;
    ntsTaxNum: string;
    issueDate: string;
    supplyAmount: number;
  };
  onClick: (item: any) => void;
}

const TaxInvoiceItem = ({ index, tax, onClick }: TaxInvoiceItemProps) => {
  return (
    <div
      className={`flex items-center py-3 border-b border-gray-100 px-5 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      } hover:bg-gray-100 rounded-[12px]`}
      onClick={() => onClick(tax)}
    >
      <div className="w-[92px] px-5">{index + 1}</div>
      <div className="px-5 w-[350px] overflow-hidden text-ellipsis">
        {tax.ntsTaxNum || '-'}
      </div>
      <div className="pl-5 pr-5 w-[180px]">
        {tax.issueDate ? tax.issueDate.split(' ')[0] : '-'}
      </div>
      <div className="pl-5 pr-5 w-[200px]">
        {tax.supplyAmount ? tax.supplyAmount.toLocaleString() + '원' : '-'}
      </div>
    </div>
  );
};

export default AdminTaxInvoiceList;
