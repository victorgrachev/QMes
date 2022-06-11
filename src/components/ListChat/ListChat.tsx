import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchNav, TPropsSearchNav } from 'components/SearchNav';
import { ItemChat } from './ItemChat';
import { IChat } from 'models/interfaces';

export type TPropsListChat = {
  chats: IChat[];
  onClickChat: (chatID: IChat['id']) => void;
};

const MainDiv = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SearchNavWrapper = styled.div`
  flex: 0 0 auto;
`;

const ListWrapper = styled.div`
  flex: 1 1 auto;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  color: #fff;
`;

export const ListChat: React.FC<TPropsListChat> = props => {
  const { chats, onClickChat } = props;
  const [filterChat, setFilterChat] = useState<typeof chats | null>(null);

  const handleChangeSearch: TPropsSearchNav['onChange'] = event => {
    const value = event.target.value.toUpperCase();

    if (!value) {
      setFilterChat(null);
    } else {
      setFilterChat(chats?.filter(chat => chat?.chatName?.toUpperCase()?.includes(value)));
    }
  };

  const handleCloseSearch = () => {
    setFilterChat(null);
  };

  return (
    <MainDiv>
      <SearchNavWrapper>
        <SearchNav onChange={handleChangeSearch} onClose={handleCloseSearch} />
      </SearchNavWrapper>
      <ListWrapper className="teal darken-1">
        {
          <ul>
            {(filterChat ? filterChat : chats)?.map(chat => (
              <ItemChat key={chat.id} chat={chat} onClick={onClickChat} />
            ))}
          </ul>
        }
      </ListWrapper>
    </MainDiv>
  );
};
