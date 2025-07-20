import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const WebRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  }
]);

export default WebRouter;
