const statusStyles = {
  반영: 'bg-primary-50 text-primary-600 ',
  미반영: 'bg-gray-200 text-gray-500',
  승인: 'bg-primary-50 text-primary-600 ',
  반려: 'bg-warning-50 text-warning-700',
  승인됨: 'bg-primary-50 text-primary-600 ',
  반려됨: 'bg-warning-50 text-warning-700',
  APPROVE: 'bg-primary-50 text-primary-600',
  REFUSED: 'bg-warning-50 text-warning-700',
  REJECTED: 'bg-error-50 text-error-700',
  WAIT: 'bg-gray-200 text-gray-500'
};

export type Status =
  | '승인'
  | '반려'
  | '반영'
  | '미반영'
  | '승인됨'
  | '반려됨'
  | 'APPROVE'
  | 'REFUSED'
  | 'REJECTED'
  | 'WAIT';

interface StatusBadgeProps {
  status: Status;
}

const statusMapping: Record<string, Status> = {
  APPROVE: '승인됨',
  REFUSED: '반려됨',
  REJECTED: '반려됨',
  WAIT: '미반영'
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const displayStatus = statusMapping[status] || (status as Status);

  return (
    <span
      className={`whitespace-nowrap w-[57px] h-[22px] text-center px-[6px] py-[2px] rounded-full font-xs-bold ${statusStyles[status]}`}
    >
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
