
import HomeIcon from '../../../src/Icon/HomeIcon';
import TaxIconGray from '../../../src/Icon/TaxIconGray';
import TaxIcon from '../../../src/Icon/TaxIcon';
import HomeGrayIcon from '../../../src/Icon/HomeGrayIcon';

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}

export const CSMenuItems: MenuItem[] = [
  {
    name: '홈',
    path: '/cs/home',
    icon: <HomeGrayIcon />,
    selectedIcon: <HomeIcon />
  },
  {
    name: '세금계산서 조회',
    path: '/cs/tax',
    icon: <TaxIconGray />,
    selectedIcon: <TaxIcon />
  }
];
