import { supabase } from '../client';
import { IAuthEmail, IUser } from 'models/interfaces';
import { TSystemColumn, TUser } from '../types';
import { ETableName } from '../enums';

const authClient = supabase.auth;

export class AuthService {
  /**
   * Авторизация пользователя
   *
   * @param authData
   */
  static async signIn(authData: IAuthEmail) {
    return await authClient.signIn(authData);
  }

  /**
   * Регистрация пользователя
   *
   * @param userData
   * @param authData
   */
  static async signUp(userData: Pick<IUser, 'firstName' | 'lastName'>, authData: IAuthEmail) {
    const authResult = await authClient.signUp(authData);

    if (!authResult.error && authResult.user) {
      const { firstName, lastName } = userData;

      const user: Omit<TUser, keyof TSystemColumn> = {
        auth_id: authResult.user.id,
        first_name: firstName,
        last_name: lastName,
        // TODO Доработать создание qin
        qin: Date.now(),
      };

      await supabase.from<TUser>(ETableName.USER).insert([user]);
    }

    return authResult;
  }

  /**
   * Покинуть текущую сессию
   */
  static signOut() {
    return authClient.signOut();
  }

  /**
   * Получить информацию об авторизации
   */
  static getAuthInfo() {
    return authClient;
  }
}
