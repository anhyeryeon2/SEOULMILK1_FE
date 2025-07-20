import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingIcon from '../../src/Icon/SettingIcon';
import LogoGray from '../../src/Icon/LogoGray';
import AdminSideModal from './SideModal/AdminSideModal';
import HQSideModal from './SideModal/HQSideModal';
import CSSideModal from './SideModal/CSSideModal';

import SidebarUploadButton from '../../apps/cs/pages/TaxUpload/SidebarUploadBtn';
import { useAuthStore } from '../store/useAuthStore';
import { adminMenuItems } from '../../apps/admin/routes/menuItems';
import { CSMenuItems } from '../../apps/cs/routes/menuItems';
import { HQMenuItems } from '../../apps/hq/routes/menuItems';

interface RoleProps {
  type: 'admin' | 'hq' | 'cs';
}

const Sidebar = ({ type }: RoleProps) => {
  const { user } = useAuthStore();
  console.log('Zustand 상태:', { user });

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<string>('홈');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const excludedPaths = [
    '/upload-tax/step1',
    '/upload-tax/step2',
    '/upload-tax/step3'
  ];

  const menuItems =
    type === 'admin'
      ? adminMenuItems
      : type === 'hq'
      ? HQMenuItems
      : CSMenuItems;

  useEffect(() => {
    if (excludedPaths.includes(location.pathname)) {
      setSelectedMenu('');
      return;
    }
    const activeMenu = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (activeMenu) {
      setSelectedMenu(activeMenu.name);
    }
  }, [location.pathname, menuItems]);

  const getModalComponent = () => {
    switch (type) {
      case 'admin':
        return (
          <AdminSideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
      case 'hq':
        return (
          <HQSideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
      case 'cs':
        return (
          <CSSideModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <aside className="w-60 h-[992px] bg-white flex flex-col gap-4 py-2 rounded-3xl">
        <div className="flex justify-between items-center px-5 py-4">
          <div
            className={`flex gap-1 ${type === 'cs' ? 'flex-col' : 'flex-row'}`}
          >
            <div className="text-gray-800 font-xl-bold">
              {user?.name}{' '}
              <span className="text-gray-800 font-xl-regular">님</span>
            </div>

            {type === 'admin' && (
              <span className="flex px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                관리자
              </span>
            )}
            {type === 'hq' && (
              <span className="flex px-2 py-[2px] justify-center items-center gap-[10px] rounded-3xl bg-primary-50 text-primary-600 font-xs-semibold">
                직원
              </span>
            )}
            {type === 'cs' && (
              <div className="text-gray-500 font-md-regular mt-[4px]">
                {user?.teamName}
              </div>
            )}
          </div>

          <button
            className={`${type === 'cs' ? 'mb-8' : ''}`}
            onClick={() => setIsModalOpen(true)}
          >
            <SettingIcon />
          </button>
        </div>

        <nav className="flex flex-col mx-2 my-1 gap-1">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`h-10 flex items-center gap-2 px-5 py-3 rounded-[13px] cursor-pointer transition ${
                selectedMenu === item.name
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              onClick={() => {
                setSelectedMenu(item.name);
                navigate(item.path);
              }}
            >
              {selectedMenu === item.name ? item.selectedIcon : item.icon}
              <span className="font-md-medium">{item.name}</span>
            </div>
          ))}
        </nav>
        {type === 'cs' && <SidebarUploadButton />}

        <div className="flex px-5 py-4 items-center gap-2 mt-auto mb-2">
          <LogoGray />
        </div>
      </aside>

      {isModalOpen && getModalComponent()}
    </div>
  );
};

export default Sidebar;
