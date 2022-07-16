import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useSession } from 'hooks/useSession';
import { Login } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { Main } from '../pages/Main';
import { ROUTES } from './const';

const PUBLIC_ROUTES = [
  {
    path: ROUTES.NOT_AUTH.SIGN_IN,
    element: <Login />,
  },
  {
    path: ROUTES.NOT_AUTH.SIGN_UP,
    element: <Registration />,
  },
  {
    path: ROUTES.COMMON,
    element: <Navigate to="/signin" replace />,
  },
];

const PRIVATE_ROUTES = [
  {
    path: ROUTES.AUTH.MAIN,
    element: <Main />,
  },
  {
    path: ROUTES.COMMON,
    element: <Navigate to="/main" replace />,
  },
];

export const Router = () => {
  const session = useSession();
  return useRoutes(session ? PRIVATE_ROUTES : PUBLIC_ROUTES);
};
