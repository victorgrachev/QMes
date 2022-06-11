import React from 'react';
import { Message } from './Message';
import { IMessage } from 'models/interfaces';

type TPropsMessageList = {
  messages?: IMessage[] | null;
};

export const MessageList: React.FC<TPropsMessageList> = ({ messages }) => {
  return (
    <>
      {messages &&
        messages.map(({ id, textValue, incoming }) => (
          <Message key={id} text={textValue} position={incoming ? 'left' : 'right'} />
        ))}
    </>
  );
};
