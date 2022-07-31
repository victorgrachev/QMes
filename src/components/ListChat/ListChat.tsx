import React, { useEffect, useState } from 'react';
import { SearchNav, TPropsSearchNav } from 'components/SearchNav';
import { ItemChat, TPropsItemChat } from './ItemChat';
import { IChat } from 'models/interfaces';
import { ListWrapper, MainDiv, SearchNavWrapper } from './styled';
import { useServices } from 'hooks/useServices';
import { ETypeEvent } from 'service/enums';

export type TPropsListChat = {
  chats: IChat[];
  selectedChat: IChat | null;
  onClickChat: TPropsItemChat['onClick'];
};

export const ListChat: React.FC<TPropsListChat> = props => {
  const { chats, onClickChat, selectedChat } = props;
  const [filterChat, setFilterChat] = useState<typeof chats | null>(null);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const { EventService } = useServices();

  useEffect(() => {
    const openListChat = () => setIsOpenMobileMenu(true);
    const closeListChat = () => setIsOpenMobileMenu(false);

    EventService.subscribe(ETypeEvent.OPEN_LIST_CHAT, openListChat);
    EventService.subscribe(ETypeEvent.CLOSE_LIST_CHAT, closeListChat);

    return () => {
      EventService.unsubscribe(ETypeEvent.OPEN_LIST_CHAT, openListChat);
      EventService.unsubscribe(ETypeEvent.CLOSE_LIST_CHAT, closeListChat);
    };
  }, []);

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
    <MainDiv openMobileMenu={isOpenMobileMenu}>
      <SearchNavWrapper>
        <SearchNav onChange={handleChangeSearch} onClose={handleCloseSearch} />
      </SearchNavWrapper>
      <ListWrapper className="light-green lighten-3 green-text text-darken-4">
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
