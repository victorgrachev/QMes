import styled from 'styled-components';

type TPropsMainItem = {
  active: boolean;
};

export const MainItem = styled.li<TPropsMainItem>`
  display: flex;
  padding: 20px 10px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 10px;
  ${({ active }) => (active ? 'background-color: #10101014' : null)};

  &:hover {
    background-color: #10101014;
  }
`;

export const Avatar = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;

  & > img {
    width: 42px;
    height: 42px;
  }
`;

export const Info = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 0;
  }
`;
