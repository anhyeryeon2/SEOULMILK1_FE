import { createBrowserRouter } from 'react-router-dom';

import HQ_home from '../pages/home/HQDashBoard';
import HeadCustomer from '../pages/customer/HeadCustomer';
import Tax from '../pages/tax';
import Payment from '../pages/payment/Payment';
import PaymentDetail from '../pages/paymentDetail/PaymentDetail';
import HQRootLayout from '../components/layout/HQRootLayout';

const HQRouter = createBrowserRouter([
  {
    path: '/hq',
    element: <HQRootLayout />,
    children: [
      { path: 'home', element: <HQ_home /> },
      { path: 'head-customer', element: <HeadCustomer /> },
      { path: 'tax', element: <Tax /> },
      { path: 'payment', element: <Payment /> },
      { path: 'payment/detail/:id', element: <PaymentDetail /> }
    ]
  }
]);

export default HQRouter;
