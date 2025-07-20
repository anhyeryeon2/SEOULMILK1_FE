import { createBrowserRouter } from 'react-router-dom';

import AdminRootLayout from '../components/layout/AdminRootLayout';
import DashBoard from '../pages/home/DashBoard';
import UserManage from '../pages/user/UserManage';
import AdminTax from '../pages/tax';
import AdminPayment from '../pages/payment';
import AdminPaymentDetail from '../pages/paymentDetail/AdminPaymentDetail';

const WebRouter = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminRootLayout />,
    children: [
      { path: 'home', element: <DashBoard /> },
      { path: 'user-manage', element: <UserManage /> },
      { path: 'admin-tax', element: <AdminTax /> },
      { path: 'admin-payment', element: <AdminPayment /> },
      { path: 'admin-payment/detail/:id', element: <AdminPaymentDetail /> }
    ]
  }
]);

export default WebRouter;
