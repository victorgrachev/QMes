import React from 'react';
import { MessageList } from './MessageList';
import { InputMessage } from './InputMessage';
import { MainChatInfo } from './styled';
import { IChat } from 'models/interfaces';
import { useMessages } from 'hooks/useMessages';

export type TPropsChatInfo = {
  selectedChat: IChat;
};

export const ChatInfo: React.FC<TPropsChatInfo> = props => {
  const { selectedChat } = props;
  const { messages, sendMessage } = useMessages(selectedChat?.id);

  const handleSendMessage = (textValue: string) => {
    sendMessage(selectedChat?.id, textValue);
  };

  return (
    <MainChatInfo>
      <MessageList messages={messages} />
      <InputMessage onSendMessage={handleSendMessage} />
    </MainChatInfo>
  );
};
