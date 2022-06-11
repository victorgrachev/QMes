import { IChat, IUser } from 'models/interfaces';
import { ChatService } from 'service/ChatService';
import { useEffect, useState } from 'react';

type TPropsUseContact = {
  onLoading?: (loading: boolean) => void;
};

export function useChat(props: TPropsUseContact) {
  const { onLoading } = props;
  const [chats, setChats] = useState<IChat[] | null>();
  const [selectChat, setSelectChat] = useState<IChat>();

  useEffect(() => {
    onLoading?.(true);

    ChatService.getChats().then(({ data }) => {
      setChats(data);
      onLoading?.(false);
    });
  }, [setChats]);

  useEffect(() => {
    ChatService.subscribeChat(chat => setChats(oldChat => [...(oldChat || []), chat]));
    return () => ChatService.unsubscribeChat();
  }, [setChats]);

  const createChat = async (participantChat: IUser) => {
    const chat = await ChatService.createChat({
      chat_name: '',
    });

    if (!chat.error) {
      await ChatService.createParticipant({
        chat_id: chat?.data?.id,
        user_id: Number(participantChat.id),
        chat_name: `${participantChat.firstName} ${participantChat.lastName}`,
      });
    }

    return chat;
  };

  return { chats, createChat, selectChat, setSelectChat };
}
