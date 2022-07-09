import React, { useState } from 'react';
import { SearchNav, TPropsSearchNav } from 'components/SearchNav';
import { ItemChat, TPropsItemChat } from './ItemChat';
import { IChat } from 'models/interfaces';
import { MainDiv, SearchNavWrapper, ListWrapper } from './styled';

export type TPropsListChat = {
  chats: IChat[];
  selectedChat: IChat | null;
  onClickChat: TPropsItemChat['onClick'];
  openMobileMenu: boolean;
};

export const ListChat: React.FC<TPropsListChat> = props => {
  const { chats, onClickChat, selectedChat, openMobileMenu } = props;
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
    <MainDiv openMobileMenu={openMobileMenu}>
      <SearchNavWrapper>
        <SearchNav onChange={handleChangeSearch} onClose={handleCloseSearch} />
      </SearchNavWrapper>
      <ListWrapper className="teal darken-1">
        {
          <ul>
            {(filterChat ? filterChat : chats)?.map(chat => (
              <ItemChat key={chat.id} chat={chat} onClick={onClickChat} active={chat.id === selectedChat?.id} />
            ))}
          </ul>
        }
      </ListWrapper>
    </MainDiv>
  );
};
