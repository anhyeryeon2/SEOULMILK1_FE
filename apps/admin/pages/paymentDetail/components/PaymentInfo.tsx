interface PaymentInfoProps {
  label: string;
  value?: string;
}

const AdminPaymentInfo = ({ label, value = '-' }: PaymentInfoProps) => {
  return (
    <div className="grid grid-cols-2 border-b border-gray-100 bg-gray-50">
      <div className="text-gray-700 font-sm-semibold bg-gray-100 pl-[28px] py-[13.5px]">
        {label}
      </div>
      <div className="text-gray-700 font-sm-medium pl-[28px] py-[13.5px] flex s-center gap-3">
        <p>{value}</p>
        {/* {isEditable && onEdit && (
          <div className="cursor-pointer" onClick={onEdit}>
            <EditIcon />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AdminPaymentInfo;
