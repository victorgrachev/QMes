import styled from 'styled-components';

export const Nav = styled.nav`
  flex: 0 0 auto;
`;

export const MobileMenu = styled.a`
  display: none;

  @media (max-width: 768px) {
    display: initial;
  }
`;
