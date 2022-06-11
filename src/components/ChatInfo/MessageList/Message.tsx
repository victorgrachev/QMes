import React from 'react';
import { Item } from './styled';

export type TPropsMessage = {
  position: 'left' | 'right';
  text?: string;
};

export const Message: React.FC<TPropsMessage> = ({ text, position }) => {
  return (
    <Item position={position} className="row">
      <div className="col s12">
        <div className="card-panel teal">
          <span className="white-text">{text}</span>
        </div>
      </div>
    </Item>
  );
};
