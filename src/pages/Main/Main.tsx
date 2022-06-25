import React, { useState } from 'react';
import { NavBar } from 'components/NavBar';
import { PageWrapper } from 'components/PageWrapper';
import { ListChat, TPropsListChat } from 'components/ListChat';
import { ModalSearch, TPropsModalSearch } from 'components/ModalSearch';
import { useChat } from 'hooks/useChat';
import { ChatInfo, TPropsChatInfo } from 'components/ChatInfo';
import { useMessages } from 'hooks/useMessages';
import { StyledMainPage, WrapperMain } from './styled';
import M from 'materialize-css';
import { LoaderPage } from 'components/LoaderPage';

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
        <NavBar />
        {isPageLoading ? (
          <LoaderPage />
        ) : (
          <WrapperMain>
            {chats && <ListChat chats={chats} selectChat={selectChat} onClickChat={handleClickChat} />}
            {selectChat && <ChatInfo messages={messages} onSendMessage={handleSendMessage} />}
          </WrapperMain>
        )}
      </StyledMainPage>
    </PageWrapper>
  );
};
