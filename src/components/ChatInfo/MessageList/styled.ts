import styled from 'styled-components';
import { TPropsMessage } from './Message';

type TPropsItem = {
  position: TPropsMessage['position'];
};

export const Item = styled.div<TPropsItem>`
  width: 50%;
  ${props => (props.position === 'left' ? 'margin-left: 0' : 'margin-right: 0')}
`;
