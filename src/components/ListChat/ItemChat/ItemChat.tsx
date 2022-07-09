import React from 'react';
import { IChat } from 'models/interfaces';
import { MainItem, Info, Avatar } from './styled';

export type TPropsItemChat = {
  chat: IChat;
  active: boolean;
  onClick: (chat: IChat) => void;
};

export const ItemChat: React.FC<TPropsItemChat> = props => {
  const {
    chat,
    chat: { chatName, avatar, chatView },
    active,
    onClick,
  } = props;

  const handleClick = () => onClick(chat);

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
