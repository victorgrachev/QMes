import React, { useState } from 'react';
import { NavBar } from 'components/NavBar';
import { PageWrapper } from 'components/PageWrapper';
import { ListChat } from 'components/ListChat';
import { ModalSearch } from 'components/ModalSearch';
import { useChat } from 'hooks/useChat';
import { ChatInfo } from 'components/ChatInfo';
import { StyledMainPage, WrapperMain } from './styled';
import { LoaderPage } from 'components/LoaderPage';

export const Main = () => {
  const { chats, createChat, selectedChat, selectChat, isLoading } = useChat();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const handleClickMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  return (
    <PageWrapper>
      <ModalSearch onCreateChat={createChat} />
      <StyledMainPage>
        <NavBar onClickMobileMenu={handleClickMobileMenu} />
        {isLoading ? (
          <LoaderPage />
        ) : (
          <WrapperMain>
            {chats && (
              <ListChat
                chats={chats}
                selectedChat={selectedChat}
                onClickChat={selectChat}
                openMobileMenu={isOpenMobileMenu}
              />
            )}
            {selectedChat && <ChatInfo selectedChat={selectedChat} />}
          </WrapperMain>
        )}
      </StyledMainPage>
    </PageWrapper>
  );
};
