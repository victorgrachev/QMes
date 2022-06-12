import { useEffect, useState } from 'react';
import { IMessage, IChat } from 'models/interfaces';
import { ChatService } from 'service/ChatService';

export function useMessages(chatID?: IChat['id']) {
  const [allMessages, setAllMessages] = useState<IMessage[] | null>(null);
  const [messages, setMessages] = useState<IMessage[] | null>(null);

  useEffect(() => {
    ChatService.getMessage().then(({ data }) => {
      setAllMessages(data);
    });
    ChatService.subscribeMessageChat(payload => {
      setAllMessages(message => [...(message || []), payload]);
    });

    return () => ChatService.unsubscribeMessageChat();
  }, [setAllMessages]);

  useEffect(() => {
    allMessages && setMessages(allMessages?.filter(message => message?.chatID === chatID));
  }, [chatID, allMessages]);

  const sendMessage = (chatID: IChat['id'] = '', textValue: IMessage['textValue']) => {
    ChatService.sendMessageInChat(Number(chatID), textValue);
  };

  return { messages, sendMessage };
}
