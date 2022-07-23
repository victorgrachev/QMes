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

export const CardMessage = styled.div`
  position: relative;
`;

export const TimeMessage = styled.span`
  font-size: 0.7em;
  position: absolute;
  bottom: 0.4rem;
  right: 0.4rem;
`;
