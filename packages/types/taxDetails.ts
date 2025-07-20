export interface TaxDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    status: string;
    title: string;
    taxImageUrl: string;
    issueId: string;
    suId: string;
    ipId: string;
    taxDate: string;
    chargeTotal: string;
  };
}

export interface TaxDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: {
    id: string;
    status: string;
    center: string;
    date: string;
    approvalNo: string;
    supplier: string;
    recipient: string;
    dateFormatted: string;
    amount: string;
  } | null;
}
