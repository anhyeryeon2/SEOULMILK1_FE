import { useEffect, useState } from 'react';
import WebRouter from './routes/WebRouter';
import { RouterProvider } from 'react-router-dom';
import CSRouter from './routes/WebRouter';

const App = () => {
  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    updateView();
    window.addEventListener('resize', updateView);

    return () => {
      window.removeEventListener('resize', updateView);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('pushstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('pushstate', handleRouteChange);
    };
  }, []);

  return <RouterProvider router={CSRouter} />;
};

export default App;
