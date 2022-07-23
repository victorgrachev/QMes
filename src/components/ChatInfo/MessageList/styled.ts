import styled from 'styled-components';

type TPropsWrapperMessage = {
  position: 'left' | 'right';
};

export const WrapperMessage = styled.div<TPropsWrapperMessage>`
  width: 50%;
  ${props => `margin-${props.position ?? 'right'}: initial`}
`;

export const WrapperMessageList = styled.div`
  flex: 1 1 100%;
  overflow-y: auto;
`;
