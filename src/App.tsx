import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Main } from 'pages/Main';
import { Login } from 'pages/Login';
import { AppRoute } from 'const';
import { useSession } from 'hooks/useSession';
import { Registration } from 'pages/Registration';
import { AppWrapper } from 'styled';

export default function App() {
  const session = useSession();

  return (
    <AppWrapper className="teal lighten-5">
      <HashRouter>
        <Routes>
          {session ? (
            <>
              <Route path={AppRoute.AUTH.MAIN.path} element={<Main />} />
              <Route path="*" element={<Navigate to={AppRoute.AUTH.MAIN.path} replace />} />
            </>
          ) : (
            <>
              <Route path={AppRoute.NOT_AUTH.SIGN_IN.path} element={<Login />} />
              <Route path={AppRoute.NOT_AUTH.SIGN_UP.path} element={<Registration />} />
              <Route path="*" element={<Navigate to={AppRoute.NOT_AUTH.SIGN_IN.path} replace />} />
            </>
          )}
        </Routes>
      </HashRouter>
    </AppWrapper>
  );
}
