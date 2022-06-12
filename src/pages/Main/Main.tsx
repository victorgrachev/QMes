import React, { useState } from 'react';
import { NavBar } from 'components/NavBar';
import { PageWrapper } from 'components/PageWrapper';
import { ListChat, TPropsListChat } from 'components/ListChat';
import { ModalSearch, TPropsModalSearch } from 'components/ModalSearch';
import { useChat } from 'hooks/useChat';
import { Loader } from 'components/Loader';
import { ChatInfo, TPropsChatInfo } from 'components/ChatInfo';
import { useMessages } from 'hooks/useMessages';
import { StyledMainPage, WrapperMain, WrapperNavbar, WrapperListChat, WrapperChatInfo } from './styled';
import M from 'materialize-css';

export const Main = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const { chats, createChat, selectChat, setSelectChat } = useChat({ onLoading: setIsPageLoading });
  const { messages, sendMessage } = useMessages(selectChat?.id);

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

  const handleSendMessage: TPropsChatInfo['onSendMessage'] = textValue => {
    sendMessage(selectChat?.id, textValue);
  };

  return (
    <PageWrapper>
      <ModalSearch onCreateChat={handleCreateChat} />
      <StyledMainPage>
        <WrapperNavbar>
          <NavBar />
        </WrapperNavbar>
        <WrapperMain>
          {isPageLoading ? (
            <Loader />
          ) : (
            <>
              <WrapperListChat>{chats && <ListChat chats={chats} onClickChat={handleClickChat} />}</WrapperListChat>
              <WrapperChatInfo>
                {selectChat && <ChatInfo messages={messages} onSendMessage={handleSendMessage} />}
              </WrapperChatInfo>
            </>
          )}
        </WrapperMain>
      </StyledMainPage>
    </PageWrapper>
  );
};
