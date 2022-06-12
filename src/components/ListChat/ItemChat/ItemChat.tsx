import React from 'react';
import { IChat } from 'models/interfaces';
import { MainItem, Info, Avatar } from './styled';

export type TPropsItemChat = {
  chat: IChat;
  active: boolean;
  onClick: (chatID: IChat['id']) => void;
};

export const ItemChat: React.FC<TPropsItemChat> = props => {
  const {
    chat: { id, chatName, avatar, chatView },
    active,
    onClick,
  } = props;

  const handleClick = () => onClick(id);

  return (
    <MainItem className="no-select" onClick={handleClick} active={active}>
      <Avatar>
        {avatar ? <img className="circle" src={avatar} /> : <i className="small material-icons">account_circle</i>}
      </Avatar>
      <Info>
        <h6>{chatName}</h6>
      </Info>
      {!chatView && <span className="new badge pulse" />}
    </MainItem>
  );
};
