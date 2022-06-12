import React from 'react';
import { MessageList } from './MessageList';
import { InputMessage } from './InputMessage';
import { MainChat } from './styled';
import { IMessage } from 'models/interfaces';

export type TPropsChatInfo = {
  messages: IMessage[] | null;
  onSendMessage: (textValue: IMessage['textValue']) => void;
};

export const ChatInfo: React.FC<TPropsChatInfo> = props => {
  const { messages, onSendMessage } = props;

  return (
    <MainChat>
      <MessageList messages={messages} />
      <InputMessage onSendMessage={onSendMessage} />
    </MainChat>
  );
};
