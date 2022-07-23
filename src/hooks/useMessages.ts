import { useEffect, useState } from 'react';
import { IMessage, IChat } from 'models/interfaces';
import { DEFAULT_LIMIT_MESSAGE } from 'common/const';
import { useServices } from './useServices';

type TStateMessages = {
  [chatID: string]: IMessage[];
};

export function useMessages(chatID?: IChat['id']) {
  const { ChatService, MessageListController } = useServices();

  const [loading, setLoading] = useState(false);
  const [totalCountMessages, setCountTotalMessages] = useState(0);
  const [messages, setMessages] = useState<TStateMessages>({});
  const [newIncomingMessage, setNewIncomingMessage] = useState<IMessage>();

  useEffect(() => {
    ChatService.subscribeMessageChat(payload => setNewIncomingMessage(payload));
    return () => ChatService.unsubscribeMessageChat();
  }, []);

  useEffect(() => {
    if (chatID) {
      setLoading(true);

      ChatService.getMessages(Number(chatID), { limit: DEFAULT_LIMIT_MESSAGE, calcCountMessage: true }).then(
        ({ data, totalCountMessages }) => {
          setMessages(state => ({ ...state, [chatID]: data }));
          setLoading(false);
          setCountTotalMessages(totalCountMessages);
        },
      );

      return () => {
        setLoading(false);
      };
    }
  }, [chatID]);

  useEffect(() => {
    if (chatID && newIncomingMessage?.chatID === chatID) {
      setMessages(state => ({
        ...state,
        [chatID]: [...state[chatID], newIncomingMessage],
      }));

      requestAnimationFrame(() =>
        MessageListController?.current?.scrollMessageListTo({ behavior: 'smooth', message: newIncomingMessage }),
      );
    }
  }, [newIncomingMessage, chatID]);

  const sendMessage = (chatID: IChat['id'] = '', textValue: IMessage['textValue']) => {
    ChatService.sendMessageInChat(Number(chatID), textValue);
  };

  const loadMoreMessages = (onLoading?: () => void, onLoaded?: () => void) => {
    if (chatID && messages[chatID]?.length < totalCountMessages) {
      onLoading?.();

      ChatService.getMessages(Number(chatID), { limit: messages[chatID]?.length + DEFAULT_LIMIT_MESSAGE }).then(
        ({ data }) => {
          setMessages(state => ({ ...state, [chatID]: data }));
          onLoaded?.();
          MessageListController?.current?.scrollMessageListTo();
        },
      );
    }
  };

  return { loading, messages: chatID ? messages[chatID] : [], sendMessage, loadMoreMessages };
}
