import SideModal from './SideModal';

interface AdminSideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AdminSideModal({ isOpen, onClose }: AdminSideModalProps) {
  return <SideModal isOpen={isOpen} onClose={onClose} role="admin" />;
}

export default AdminSideModal;
