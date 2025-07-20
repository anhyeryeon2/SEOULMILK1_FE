import HomeGrayIcon from '../../../src/Icon/HomeGrayIcon';
import HomeIcon from '../../../src/Icon/HomeIcon';
import TaxIconGray from '../../../src/Icon/TaxIconGray';
import TaxIcon from '../../../src/Icon/TaxIcon';
import HQIcon from '../../../src/Icon/CustomerIcon';
import SelectHQIon from '../../../src/Icon/SelectHQIon';
import PaymentIcon from '../../../src/Icon/PaymentIcon';

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

export const HQMenuItems: MenuItem[] = [
  {
    name: '홈',
    path: '/hq/home',
    icon: <HomeGrayIcon />,
    selectedIcon: <HomeIcon />
  },
  {
    name: '세금계산서 조회',
    path: '/hq/tax',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  },
  {
    name: '지급결의서 조회',
    path: '/hq/payment',
    icon: <PaymentIcon />,
    selectedIcon: (
      <PaymentIcon
        primaryColor="#4CC584"
        secondaryColor="#009856"
        accentColor="#C3EAD2"
      />
    )
  },
  {
    name: '대리점 조회',
    path: '/hq/head-customer',
    icon: <HQIcon />,
    selectedIcon: <SelectHQIon />
  }
];
