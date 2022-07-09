import { IChat, IUser } from 'models/interfaces';
import { ChatService } from 'service/ChatService';
import { useEffect, useState } from 'react';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<IChat[] | null>(null);
  const [selectChat, setSelectChat] = useState<IChat | null>(null);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      ChatService.getChats().then(({ data }) => {
        data && setChats(data);
      }),
      ChatService.subscribeChat(chat => setChats(oldChat => [...(oldChat || []), chat])),
    ]).then(() => setIsLoading(false));

    return () => ChatService.unsubscribeChat();
  }, [setChats]);

  useEffect(() => {
    if (selectChat && !selectChat.chatView) {
      ChatService.updateChatView(Number(selectChat.id));

      setSelectChat({ ...selectChat, chatView: true });
      setChats(
        prevChats =>
          prevChats &&
          prevChats.map(chat => {
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
  }, [selectChat, setChats, setSelectChat]);

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

  return { chats, createChat, selectChat, setSelectChat, isLoading };
}
