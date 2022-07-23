import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './routes';
import { AppWrapper } from 'styled';
import { ServiceProvider } from './context';
import moment from 'moment';

moment.locale('ru');

export default function App() {
  return (
    <AppWrapper className="teal lighten-5">
      <ServiceProvider>
        <HashRouter>
          <Router />
        </HashRouter>
      </ServiceProvider>
    </AppWrapper>
  );
}
