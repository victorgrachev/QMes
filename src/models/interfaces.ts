import { ApiError, Provider, Session, User } from '@supabase/gotrue-js/src/lib/types';

/**
 * Ответ supabase
 */
export interface IResponseSupabase {
  session: Session | null;
  user: User | null;
  provider?: Provider;
  url?: string | null;
  error: ApiError | null;
}

/**
 * Пользователь
 */
export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  qin?: number;
  avatar?: string;
}

/**
 * Авторизация по email
 */
export interface IAuthEmail {
  email: string;
  password: string;
}

/**
 * Чат
 */
export interface IChat {
  id?: string;
  chatName?: string;
  avatar?: string;
}

export interface IMessage {
  id?: string;
  chatID: string;
  textValue: string;
  incoming: boolean;
}
