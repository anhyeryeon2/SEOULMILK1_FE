import { createBrowserRouter } from 'react-router-dom';

import HeadCustomer from '../pages/HQ/customer/HeadCustomer';
import Tax from '../pages/HQ/tax';
import AdminRootLayout from '../outlet/AdminRootLayout';
import DashBoard from '../pages/ADMIN/home/DashBoard';
import UserManage from '../pages/ADMIN/user/UserManage';
import HQRootLayout from '../outlet/HQRootLayout';
import CSRootLayout from '../outlet/CSRootLayout';
import LoginPage from '../pages/login';
import CSSignup from '../pages/CS/cssignup/CSSignup';
import HeadSignup from '../pages/HQ/signup/HeadSignup';
import Signup from '../pages/HQ/signup';
import Signup2 from '../pages/HQ/signup/components/Signup2';
import CsSignup2 from '../pages/CS/cssignup/components/CsSignup2';
import CSTax from '../pages/CS/tax';
import Payment from '../pages/HQ/payment/Payment';
import HQ_home from '../pages/HQ/home/HQDashBoard';
import { CSHome } from '../pages/CS/home';
import Step1 from '../pages/CS/TaxUpload/Step1';
import Step2 from '../pages/CS/TaxUpload/Step2';
import Step3 from '../pages/CS/TaxUpload/Step3';
import EditTax from '../pages/CS/tax/EditTax';
import PaymentDetail from '../pages/HQ/paymentDetail/PaymentDetail';
import AdminTax from '../pages/ADMIN/tax';
import AdminPayment from '../pages/ADMIN/payment';
import AdminPaymentDetail from '../pages/ADMIN/paymentDetail/AdminPaymentDetail';


const WebRouter = createBrowserRouter([
  // 기본 경로를 로그인
  { path: '/', element: <LoginPage /> },

  // 관리자쪽 라우터 (ADMIN)
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
  },

  // 본사쪽 라우터 (HQ - 직원)
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
  },

  // 대리점쪽 라우터 (CS)
  {
    path: '/cs',
    element: <CSRootLayout />,
    children: [
      { path: 'home', element: <CSHome /> },
      { path: 'upload-tax/step1', element: <Step1 /> },
      { path: 'upload-tax/step2', element: <Step2 /> },
      { path: 'upload-tax/step3', element: <Step3 /> },
      { path: 'tax', element: <CSTax /> },
      { path: 'tax/edit', element: <EditTax /> }
    ]
  },

  { path: '/signup', element: <Signup /> },
  { path: '/head/signup', element: <HeadSignup /> },
  { path: '/head/signup2', element: <Signup2 /> },
  { path: '/cs/signup', element: <CSSignup /> },
  { path: '/cs/signup2', element: <CsSignup2 /> }
]);

export default WebRouter;
