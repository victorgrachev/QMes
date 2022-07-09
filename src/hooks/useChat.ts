import { IChat, IUser } from 'models/interfaces';
import { ChatService } from 'service/ChatService';
import { useEffect, useState } from 'react';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<IChat[] | null>(null);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

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
    if (selectedChat && !selectedChat.chatView) {
      ChatService.updateChatView(Number(selectedChat.id));

      setSelectedChat({ ...selectedChat, chatView: true });
      setChats(
        prevChats =>
          prevChats &&
          prevChats.map(chat => {
            if (chat.id === selectedChat.id) {
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
  }, [selectedChat, setChats, setSelectedChat]);

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

  const selectChat = (chat: IChat) => setSelectedChat(chat);

  return { chats, createChat, selectedChat, selectChat, isLoading };
}
