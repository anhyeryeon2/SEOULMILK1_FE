import { RouterProvider } from 'react-router-dom';
import WebRouter from './routes/WebRouter';

export default function App() {
  return <RouterProvider router={WebRouter} />;
}
