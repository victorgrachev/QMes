import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './routes';
import { AppWrapper } from 'styled';

export default function App() {
  return (
    <AppWrapper className="teal lighten-5">
      <HashRouter>
        <Router />
      </HashRouter>
    </AppWrapper>
  );
}
