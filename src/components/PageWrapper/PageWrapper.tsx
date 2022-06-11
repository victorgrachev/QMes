import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import { StyledPage } from './styled';

export const PageWrapper: React.FC = ({ children }) => {
  const location = useLocation();

  return (
    <SwitchTransition>
      <CSSTransition key={location.key} appear timeout={300} classNames="page">
        <StyledPage>{children}</StyledPage>
      </CSSTransition>
    </SwitchTransition>
  );
};
