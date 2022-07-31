import styled from 'styled-components';

type TPropsMainDiv = {
  openMobileMenu?: boolean;
};

export const MainDiv = styled.div<TPropsMainDiv>`
  flex: 0 0 auto;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transform: ${({ openMobileMenu }) => `translateX(${openMobileMenu ? '0' : '-100'}%)`};
    transition: transform linear 0.2s;
    z-index: 2;
  }
`;

export const SearchNavWrapper = styled.div`
  flex: 0 0 auto;
`;

export const ListWrapper = styled.div`
  flex: 1 1 auto;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  color: #fff;
`;
