import React, { useState } from 'react';
import { NavBar } from 'components/NavBar';
import { PageWrapper } from 'components/PageWrapper';
import { ListChat, TPropsListChat } from 'components/ListChat';
import { ModalSearch, TPropsModalSearch } from 'components/ModalSearch';
import { useChat } from 'hooks/useChat';
import { ChatInfo } from 'components/ChatInfo';
import { StyledMainPage, WrapperMain } from './styled';
import M from 'materialize-css';
import { LoaderPage } from 'components/LoaderPage';

export const Main = () => {
  const { chats, createChat, selectChat, setSelectChat, isLoading } = useChat();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const handleCreateChat: TPropsModalSearch['onCreateChat'] = (participantChat, onCreated) => {
    createChat(participantChat).then(({ error }) => {
      onCreated();

      if (error) {
        M.toast({ html: error.message });
      } else {
        M.toast({ html: `Создан чат ${participantChat.firstName} ${participantChat.lastName}` });
      }
    });
  };

  const handleClickChat: TPropsListChat['onClickChat'] = chatID => {
    setSelectChat(chats?.find(chat => chat.id === chatID) || null);
  };

  const handleClickMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  return (
    <PageWrapper>
      <ModalSearch onCreateChat={handleCreateChat} />
      <StyledMainPage>
        <NavBar onClickMobileMenu={handleClickMobileMenu} />
        {isLoading ? (
          <LoaderPage />
        ) : (
          <WrapperMain>
            {chats && (
              <ListChat
                chats={chats}
                selectChat={selectChat}
                onClickChat={handleClickChat}
                openMobileMenu={isOpenMobileMenu}
              />
            )}
            {selectChat && <ChatInfo selectChat={selectChat} />}
          </WrapperMain>
        )}
      </StyledMainPage>
    </PageWrapper>
  );
};
