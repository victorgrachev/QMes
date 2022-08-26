import React, { PropsWithChildren } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import { StyledPage } from './styled';

export const PageWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} timeout={300} classNames="page">
        <StyledPage>{children}</StyledPage>
      </CSSTransition>
    </TransitionGroup>
  );
};
