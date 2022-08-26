import styled from 'styled-components';

export const StyledPage = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;

  &.page-appear,
  &.page-enter {
    opacity: 0;
    transform: scale(0.7);
  }

  &.page-appear-active,
  &.page-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  &.page-exit {
    opacity: 1;
    transform: scale(1);
  }

  &.page-exit-active {
    opacity: 0;
    transform: scale(0.7);
    transition: opacity 300ms, transform 300ms;
  }
`;
