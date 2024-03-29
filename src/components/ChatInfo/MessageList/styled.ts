import styled from 'styled-components';

type TPropsCardMessage = {
  position: 'left' | 'right';
};

export const WrapperMessage = styled.div`
  overflow: hidden;
  display: flex;
`;

export const WrapperMessageList = styled.div`
  flex: 1 1 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const MessageListTitle = styled.div`
  flex: 0 0 auto;
`;

export const MessageListStyled = styled.div`
  overflow-y: auto;
  padding: 0 1rem;
  flex: 1 1 100%;
`;

export const CardMessage = styled.div<TPropsCardMessage>`
  position: relative;
  max-width: 50%;
  overflow-wrap: break-word;
  border-radius: 15px;
  ${props => `margin-${props.position ?? 'left'}: auto`}
`;

export const TimeMessage = styled.span`
  font-size: 0.7em;
  position: absolute;
  bottom: 0.4rem;
  right: 0.4rem;
`;
