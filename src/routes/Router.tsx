import React from 'react';
import { Navigate, Routes, useRoutes } from 'react-router-dom';
import { useSession } from 'hooks/useSession';
import { Login } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { Main } from '../pages/Main';
import { ROUTES } from './const';
import { PageWrapper } from '../components/PageWrapper';

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
    element: <Navigate to={ROUTES.NOT_AUTH.SIGN_IN} replace />,
  },
];

const PRIVATE_ROUTES = [
  {
    path: ROUTES.AUTH.MAIN,
    element: <Main />,
  },
  {
    path: ROUTES.COMMON,
    element: <Navigate to={ROUTES.AUTH.MAIN} replace />,
  },
];

export const Router = () => {
  const session = useSession();
  const routes = useRoutes(session ? PRIVATE_ROUTES : PUBLIC_ROUTES);

  return <PageWrapper>{routes}</PageWrapper>;
};
