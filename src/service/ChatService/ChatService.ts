import { supabase } from '../client';
import { AuthService } from '../AuthService';
import { TChat, TMessage, TParticipant, TSystemColumn, TUser } from '../types';
import { ETableName } from '../enums';
import { IChat, IMessage, IUser } from 'models/interfaces';
import { RealtimeSubscription } from '@supabase/supabase-js';

export class ChatService {
  private currentUserInfo: TUser | null = null;
  private subscribeMessageID: RealtimeSubscription | null = null;
  private subscribeChatID: RealtimeSubscription | null = null;

  constructor(private authService: AuthService) {}

  /**
   * Получить id пользователя
   * @private
   */
  private async getCurrentUserInfo() {
    if (!this.currentUserInfo) {
      const currentUser = this.authService.getAuthInfo().user()!;
      const { data } = await supabase.from<TUser>(ETableName.USER).select('*').eq('auth_id', currentUser.id).single();
      this.currentUserInfo = data;
    }

    return this.currentUserInfo;
  }

  /**
   * Получить пользователя по QIN
   * @param searchQIN
   */
  async getUserByQIN(searchQIN: TUser['qin']) {
    const { data, error } = await supabase.from<TUser>(ETableName.USER).select('*').eq('qin', searchQIN).single();

    if (!data) return { data: null, error };

    const { id, qin, first_name, last_name } = data;

    const user: IUser = {
      id: id.toString(),
      qin,
      lastName: last_name,
      firstName: first_name,
    };

    return { data: user, error };
  }

  /**
   * Получить чаты пользователя
   */
  async getChats() {
    const currentUserInfo = await this.getCurrentUserInfo();

    const { data, error } = await supabase
      .from<TParticipant>(ETableName.PARTICIPANT)
      .select('chat_id!inner(*), user_id!inner(*), chat_name')
      .eq('user_id', currentUserInfo?.id!);

    return {
      data: data?.map<IChat>(({ chat_id, chat_name, user_id }) => ({
        id: (chat_id as TChat).id.toString(),
        chatName: (chat_id as TChat).chat_name || chat_name,
        chatView: (chat_id as TChat).chat_view,
        qin: (user_id as TUser).qin.toString(),
      })),
      error,
    };
  }

  /**
   * Получить сообщения из чата
   *
   * @param chatID
   */
  async getMessages(
    chatID: TChat['id'],
    { limit, calcCountMessage = false }: { limit: number; calcCountMessage?: boolean },
  ) {
    const currentUserInfo = await this.getCurrentUserInfo();

    const { data, error, count } = await supabase
      .from<TMessage>(ETableName.MESSAGE)
      .select('*', calcCountMessage ? { count: 'estimated' } : {})
      .eq('chat_id', chatID)
      .order('created_at', { ascending: false })
      .limit(limit);

    const resultMessages: IMessage[] = [];

    if (data?.length) {
      data.reverse().forEach(({ id, chat_id, text_value, create_user_id, created_at }) => {
        resultMessages.push({
          id: id.toString(),
          chatID: chat_id.toString(),
          textValue: text_value,
          createDate: created_at,
          incoming: create_user_id !== currentUserInfo?.id,
        });
      });
    }

    return {
      data: resultMessages,
      totalCountMessages: count ?? 0,
      error,
    };
  }

  /**
   * Отправить сообщение в чат
   * @param chatID
   * @param textValue
   */
  async sendMessageInChat(chatID: TChat['id'], textValue: TMessage['text_value']) {
    const currentUserInfo = await this.getCurrentUserInfo();

    const message: Omit<TMessage, keyof TSystemColumn> = {
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
  async subscribeMessageChat(onSubscribe: (payload: IMessage) => void) {
    this.subscribeMessageID = await supabase
      .from<TMessage>(ETableName.MESSAGE)
      .on('INSERT', payload => {
        if (!payload.errors && payload.new) {
          this.getCurrentUserInfo().then(userInfo => {
            const message: IMessage = {
              id: payload.new.id.toString(),
              chatID: (payload.new.chat_id as number).toString(),
              textValue: payload.new.text_value,
              createDate: payload.new.created_at,
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
  unsubscribeMessageChat() {
    if (this.subscribeMessageID) {
      supabase.removeSubscription(this.subscribeMessageID).then(() => (this.subscribeMessageID = null));
    }
  }

  /**
   * Подписаться на создание новых чатов
   * @param onSubscribe
   */
  async subscribeChat(onSubscribe: (payload: IChat) => void) {
    const currentUserInfo = await this.getCurrentUserInfo();

    this.subscribeChatID = supabase
      .from<TParticipant>(`${ETableName.PARTICIPANT}:user_id=eq.${currentUserInfo?.id}`)
      .on('INSERT', payload => {
        if (!payload.errors && payload.new) {
          supabase
            .from<TUser>(ETableName.USER)
            .select('*')
            .eq('id', payload.new.user_id.toString())
            .single()
            .then(({ data }) => {
              const chat: IChat = {
                id: payload.new.id.toString(),
                qin: data?.qin.toString(),
                chatName: payload.new.chat_name,
                chatView: false,
                avatar: '',
              };

              onSubscribe(chat);
            });
        }
      })
      .subscribe();
  }

  /**
   * Отписаться от создания новых чатов
   */
  unsubscribeChat() {
    if (this.subscribeChatID) {
      supabase.removeSubscription(this.subscribeChatID).then(() => (this.subscribeChatID = null));
    }
  }

  /**
   * Обновить статус просмотра чата
   * @param chatID
   */
  async updateChatView(chatID: TChat['id']) {
    const { data, error } = await supabase
      .from<TChat>(ETableName.CHAT)
      .update({ chat_view: true })
      .match({ id: chatID })
      .single();

    return { data, error };
  }

  /**
   * Создать чат
   * @param chatData
   */
  async createChat(chatData: Omit<TChat, keyof TSystemColumn>) {
    const { data, error } = await supabase.from<TChat>(ETableName.CHAT).insert([chatData]).single();
    return { data, error };
  }

  /**
   * Создать участника чата
   * @param partData
   */
  async createParticipant(partData: Omit<TParticipant, keyof TSystemColumn>) {
    const currentUserInfo = await this.getCurrentUserInfo();

    const participants: Omit<TParticipant, keyof TSystemColumn>[] = [
      { ...partData, chat_name: `${currentUserInfo?.first_name} ${currentUserInfo?.last_name}` },
    ];

    if (currentUserInfo && currentUserInfo.id !== partData.user_id) {
      participants.push({
        chat_id: partData.chat_id,
        user_id: currentUserInfo.id,
        chat_name: partData.chat_name,
      });
    }

    const { data, error } = await supabase.from<TParticipant>(ETableName.PARTICIPANT).insert(participants);
    return { data, error };
  }
}
