import React from 'react';
import { MessageList } from './MessageList';
import { InputMessage } from './InputMessage';
import { MainChatInfo } from './styled';
import { IChat } from 'models/interfaces';
import { useMessages } from 'hooks/useMessages';

export type TPropsChatInfo = {
  selectChat: IChat;
};

export const ChatInfo: React.FC<TPropsChatInfo> = props => {
  const { selectChat } = props;
  const { messages, sendMessage } = useMessages(selectChat?.id);

  const handleSendMessage = (textValue: string) => {
    sendMessage(selectChat?.id, textValue);
  };

  return (
    <MainChatInfo>
      <MessageList messages={messages} />
      <InputMessage onSendMessage={handleSendMessage} />
    </MainChatInfo>
  );
};
