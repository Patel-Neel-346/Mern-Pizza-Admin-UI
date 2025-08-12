import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
// import Categories from './pages/Categories';
import Login from './pages/login/Login';
import Dashboard from './layouts/Dashboard';
import NonAuth from './layouts/NonAuth';
import Root from './layouts/Root';

import Tenants from './pages/tenants/Tenants';
// import User from './pages/users/User';

//@ts-ignore
import User from './pages/users/User';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: 'users',
            element: <User />,
          },
          {
            path: 'restaurants',
            element: <Tenants />,
          },
        ],
      },
      {
        path: '/auth',
        element: <NonAuth />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
    ],
  },
]);
