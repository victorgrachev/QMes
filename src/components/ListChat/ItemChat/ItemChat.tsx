import React from 'react';
import { IChat } from 'models/interfaces';
import styled from 'styled-components';

export type TPropsContact = {
  chat: IChat;
  onClick: (chatID: IChat['id']) => void;
};

const MainItem = styled.li`
  display: flex;
  padding: 20px 10px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: #10101014;
  }
`;

const Avatar = styled.div`
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

const Info = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 0;
  }
`;

export const ItemChat: React.FC<TPropsContact> = props => {
  const {
    chat: { id, chatName, avatar, chatView },
    onClick,
  } = props;

  const handleClick = () => onClick(id);

  return (
    <MainItem className="no-select" onClick={handleClick}>
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
