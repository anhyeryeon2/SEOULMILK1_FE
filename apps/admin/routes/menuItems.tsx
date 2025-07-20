import HomeIcon from '../../../src/Icon/HomeIcon';
import TaxIconGray from '../../../src/Icon/TaxIconGray';
import TaxIcon from '../../../src/Icon/TaxIcon';
import UserIcon from '../../../src/Icon/UserIcon';
import PaymentIcon from '../../../src/Icon/PaymentIcon';
import HomeGrayIcon from '../../../src/Icon/HomeGrayIcon';

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

export const adminMenuItems: MenuItem[] = [
  {
    name: '홈',
    path: '/admin/home',
    icon: <HomeGrayIcon />,
    selectedIcon: <HomeIcon />
  },
  {
    name: '유저 관리',
    path: '/admin/user-manage',
    icon: <UserIcon />,
    selectedIcon: <UserIcon primaryColor="#009856" secondaryColor="#4CC584" />
  },
  {
    name: '세금계산서 조회',
    path: '/admin/admin-tax',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  {
    name: '지급결의서 조회',
    path: '/admin/admin-payment',
    icon: <PaymentIcon />,
    selectedIcon: (
      <PaymentIcon
        primaryColor="#4CC584"
        secondaryColor="#009856"
        accentColor="#C3EAD2"
      />
    )
  }
];
