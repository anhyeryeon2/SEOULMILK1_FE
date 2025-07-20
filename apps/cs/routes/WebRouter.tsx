import { createBrowserRouter } from 'react-router-dom';
import CSRootLayout from '../components/layout/CSRootLayout';
import { CSHome } from '../pages/home';
import CSTax from '../pages/tax';
import EditTax from '../pages/tax/EditTax';
import Step1 from '../pages/TaxUpload/Step1';
import Step2 from '../pages/TaxUpload/Step2';
import Step3 from '../pages/TaxUpload/Step3';

const CSRouter = createBrowserRouter([
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
  }
]);

export default CSRouter;
