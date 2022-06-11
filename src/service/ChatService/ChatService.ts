import { supabase } from '../client';
import { AuthService } from '../AuthService';
import { TChat, TMessage, TParticipant, TUser } from '../types';
import { ETableName } from '../enums';
import { IChat, IMessage } from 'models/interfaces';
import { RealtimeSubscription } from '@supabase/supabase-js';

export class ChatService {
  private static subscribeMessageID: RealtimeSubscription | null = null;
  private static subscribeChatID: RealtimeSubscription | null = null;
  /**
   * Получить id пользователя
   * @private
   */
  private static async getCurrentUserInfo() {
    const currentUser = AuthService.getAuthInfo().user();
    const { data } = await supabase.from<TUser>(ETableName.USER).select('*').eq('auth_id', currentUser?.id).single();
    return data;
  }

  /**
   * Получить пользователя по QIN
   * @param searchQIN
   */
  static async getUserByQIN(searchQIN: TUser['qin']) {
    const { data, error } = await supabase.from<TUser>(ETableName.USER).select('*').eq('qin', searchQIN).single();
    const { id, qin, first_name, last_name } = data || {};

    const user = {
      id: id?.toString(),
      qin,
      lastName: last_name,
      firstName: first_name,
    };

    return { data: user, error };
  }

  /**
   * Получить чаты пользователя
   */
  static async getChats() {
    const currentUserInfo = await ChatService.getCurrentUserInfo();

    const { data, error } = await supabase
      .from<TParticipant>(ETableName.PARTICIPANT)
      .select('chat_id!inner(*), chat_name')
      .eq('user_id', currentUserInfo?.id);

    return {
      data: data?.map<IChat>(({ chat_id, chat_name }) => ({
        id: (chat_id as TChat).id?.toString(),
        chatName: (chat_id as TChat).chat_name || chat_name,
      })),
      error,
    };
  }

  /**
   * Получить сообщения из чатов
   * @param chatID
   */
  static async getMessage() {
    const currentUserInfo = await ChatService.getCurrentUserInfo();

    const { data: chats, error } = await supabase
      .from<TParticipant>(ETableName.PARTICIPANT)
      .select('chat_id(*)')
      .eq('user_id', currentUserInfo?.id);

    const resultMessage: IMessage[] = [];

    if (chats) {
      for (const chat of chats) {
        const chatInfo = chat.chat_id as TChat;

        const { data: message } = await supabase
          .from<TMessage>(ETableName.MESSAGE)
          .select('*')
          .eq('chat_id', chatInfo.id);

        message?.forEach(({ id, text_value, chat_id, create_user_id }) =>
          resultMessage.push({
            id: id?.toString(),
            chatID: chat_id?.toString() as string,
            textValue: text_value,
            incoming: create_user_id !== currentUserInfo?.id,
          }),
        );
      }
    }

    return {
      data: resultMessage,
      error,
    };
  }

  /**
   * Отправить сообщение в чат
   * @param chatID
   * @param textValue
   */
  static async sendMessageInChat(chatID: TChat['id'], textValue: TMessage['text_value']) {
    const currentUserInfo = await ChatService.getCurrentUserInfo();

    const message: TMessage = {
      chat_id: chatID,
      create_user_id: currentUserInfo?.id!,
      text_value: textValue,
    };

    const { data, error } = await supabase.from<TMessage>(ETableName.MESSAGE).insert([message]).single();

    return { data, error };
  }

  /**
   * Подписаться на обновления сообщений
   * @param onSubscribe
   */
  static subscribeMessageChat(onSubscribe: (payload: IMessage) => void) {
    ChatService.subscribeMessageID = supabase
      .from<TMessage>(ETableName.MESSAGE)
      .on('INSERT', payload => {
        if (!payload.errors && payload.new) {
          ChatService.getCurrentUserInfo().then(userInfo => {
            const message: IMessage = {
              id: payload.new.id?.toString(),
              chatID: (payload.new.chat_id as number).toString(),
              textValue: payload.new.text_value,
              incoming: payload.new.create_user_id !== userInfo?.id,
            };

            onSubscribe(message);
          });
        }
      })
      .subscribe();
  }

  /**
   * Отписаться от обновления сообщений
   */
  static unsubscribeMessageChat() {
    ChatService.subscribeMessageID &&
      supabase.removeSubscription(ChatService.subscribeMessageID).then(() => (ChatService.subscribeMessageID = null));
  }

  /**
   * Подписаться на создание новых чатов
   * @param onSubscribe
   */
  static async subscribeChat(onSubscribe: (payload: IChat) => void) {
    const currentUserInfo = await ChatService.getCurrentUserInfo();

    ChatService.subscribeChatID = supabase
      .from<TParticipant>(`${ETableName.PARTICIPANT}:user_id=eq.${currentUserInfo?.id}`)
      .on('INSERT', payload => {
        if (!payload.errors && payload.new) {
          const chat: IChat = {
            id: payload?.new?.chat_id?.toString(),
            chatName: payload?.new?.chat_name,
          };

          onSubscribe(chat);
        }
      })
      .subscribe();
  }

  /**
   * Отписаться от создания новых чатов
   */
  static unsubscribeChat() {
    ChatService.subscribeChatID &&
      supabase.removeSubscription(ChatService.subscribeChatID).then(() => (ChatService.subscribeChatID = null));
  }

  /**
   * Создать чат
   * @param chatData
   */
  static async createChat(chatData: TChat) {
    const { data, error } = await supabase.from<TChat>(ETableName.CHAT).insert([chatData]).single();
    return { data, error };
  }

  /**
   * Создать участника чата
   * @param partData
   */
  static async createParticipant(partData: TParticipant) {
    const currentUserInfo = await ChatService.getCurrentUserInfo();

    const participants: TParticipant[] = [
      { ...partData, chat_name: `${currentUserInfo?.first_name} ${currentUserInfo?.last_name}` },
    ];

    if (currentUserInfo?.id !== partData.user_id) {
      participants.push({
        chat_id: partData.chat_id,
        user_id: currentUserInfo?.id,
        chat_name: partData.chat_name,
      });
    }

    const { data, error } = await supabase.from<TParticipant>(ETableName.PARTICIPANT).insert(participants);
    return { data, error };
  }
}
