import { IUser } from './interfaces';

/**
 * Пользователь
 */
export type TUserInfoDatabase = IUser & { auth_id?: string };

/**
 * Контакт
 */
export type TContactDatabase = Partial<IUser> & {
  user_id?: IUser | number;
  contact_id?: IUser | number;
};

/**
 * Сообщение
 */
export type TMessageDatabase = {
  id: number;
  chat_id: number;
  text_value: string;
  incoming: boolean;
};
