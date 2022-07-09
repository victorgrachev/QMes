import styled from 'styled-components';

type TPropsMainDiv = {
  openMobileMenu: boolean;
};

export const MainDiv = styled.div<TPropsMainDiv>`
  flex: 0 1 25%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    transform: ${({ openMobileMenu }) => `translateX(${openMobileMenu ? '0' : '-100'}%)`};
    transition: transform ease-in 1s;
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
