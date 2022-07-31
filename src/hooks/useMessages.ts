import { useEffect, useState } from 'react';
import { IChat, IMessage } from 'models/interfaces';
import { DEFAULT_LIMIT_MESSAGE } from 'common/const';
import { useServices } from './useServices';
import { ETypeEvent } from 'service/enums';

type TStateMessages = {
  [chatID: string]: IMessage[];
};

export function useMessages(chatID?: IChat['id']) {
  const { ChatService, EventService } = useServices();

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
        EventService.dispatch(ETypeEvent.SCROLL_MESSAGE_LIST_TO, { behavior: 'smooth', message: newIncomingMessage }),
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
          EventService.dispatch(ETypeEvent.SCROLL_MESSAGE_LIST_TO);
        },
      );
    }
  };

  return { loading, messages: chatID ? messages[chatID] : [], sendMessage, loadMoreMessages };
}
