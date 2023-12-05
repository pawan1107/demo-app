import { Navigate, useRoutes } from 'react-router-dom';
import Cards from '../components/Cards';
import NotFound from '../components/NotFound';
import ComingSoon from '../components/ComingSoon';


export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/cards" replace />,
    },
    {
      path: '/home',
      element: <ComingSoon />,
    },
    {
      path: '/cards',
      element: <Cards />,
    },
    {
      path: '/payments',
      element: <ComingSoon />,
    },
    {
      path: '/credit',
      element: <ComingSoon />,
    },
    {
      path: '/profile',
      element: <ComingSoon />,
    },

      {
          path: '*',
          children: [
            { path: '404', element: <NotFound /> },
            { path: '*', element: <Navigate to="/404" replace /> }
          ]
        },
  ]);

}