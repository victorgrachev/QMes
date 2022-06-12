import { IChat, IUser } from 'models/interfaces';
import { ChatService } from 'service/ChatService';
import { useEffect, useState } from 'react';

type TPropsUseContact = {
  onLoading?: (loading: boolean) => void;
};

export function useChat(props: TPropsUseContact) {
  const { onLoading } = props;
  const [chats, setChats] = useState<IChat[] | null>(null);
  const [selectChat, setSelectChat] = useState<IChat | null>(null);

  useEffect(() => {
    onLoading?.(true);

    ChatService.getChats().then(({ data }) => {
      data && setChats(data);
      onLoading?.(false);
    });
  }, [setChats]);

  useEffect(() => {
    ChatService.subscribeChat(chat => setChats(oldChat => [...(oldChat || []), chat]));
    return () => ChatService.unsubscribeChat();
  }, [setChats]);

  useEffect(() => {
    if (chats && selectChat && !selectChat.chatView) {
      ChatService.updateChatView(Number(selectChat.id));

      setSelectChat({ ...selectChat, chatView: true });
      setChats(
        chats.map(chat => {
          if (chat.id === selectChat.id) {
            return {
              ...chat,
              chatView: true,
            };
          } else {
            return { ...chat };
          }
        }),
      );
    }
  }, [chats, selectChat, setChats, setSelectChat]);

  const createChat = async (participantChat: IUser) => {
    const { data, error } = await ChatService.createChat({
      chat_name: '',
      chat_view: false,
    });

    if (!error && data) {
      await ChatService.createParticipant({
        chat_id: data.id,
        user_id: Number(participantChat.id),
        chat_name: `${participantChat.firstName} ${participantChat.lastName}`,
      });
    }

    return { data, error };
  };

  return { chats, createChat, selectChat, setSelectChat };
}
