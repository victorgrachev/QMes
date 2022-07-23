import React from 'react';
import { MessageList } from './MessageList';
import { InputMessage } from './InputMessage';
import { MainChatInfo } from './styled';
import { IChat } from 'models/interfaces';
import { useMessages } from 'hooks/useMessages';
import { LoaderPage } from 'components/LoaderPage';
import { useServices } from 'hooks/useServices';

export type TPropsChatInfo = {
  selectedChat: IChat;
};

export const ChatInfo: React.FC<TPropsChatInfo> = props => {
  const { selectedChat } = props;
  const { loading, messages, sendMessage, loadMoreMessages } = useMessages(selectedChat?.id);
  const { MessageListController } = useServices();

  const handleSendMessage = (textValue: string) => {
    sendMessage(selectedChat?.id, textValue);
  };

  return (
    <MainChatInfo>
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <MessageList ref={MessageListController} messages={messages} onFirstVisibleMessage={loadMoreMessages} />
          <InputMessage onSendMessage={handleSendMessage} />
        </>
      )}
    </MainChatInfo>
  );
};
