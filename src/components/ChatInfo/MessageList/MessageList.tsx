import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import { IMessage } from 'models/interfaces';
import { WrapperMessageList } from './styled';

type TPropsMessageList = {
  messages?: IMessage[] | null;
};

export const MessageList: React.FC<TPropsMessageList> = ({ messages }) => {
  const refMessageList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refMessageList.current?.scroll({ top: refMessageList.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <WrapperMessageList ref={refMessageList}>
      {messages &&
        messages.map(({ id, textValue, incoming }) => (
          <Message key={id} text={textValue} position={incoming ? 'left' : 'right'} />
        ))}
    </WrapperMessageList>
  );
};
