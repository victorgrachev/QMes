import { supabase } from '../client';
import { IAuthEmail, IUser } from 'models/interfaces';
import { TSystemColumn, TUser } from '../types';
import { ETableName } from '../enums';

export class AuthService {
  constructor(private authClient = supabase.auth) {}

  /**
   * Авторизация пользователя
   *
   * @param authData
   */
  async signIn(authData: IAuthEmail) {
    return await this.authClient.signIn(authData);
  }

  /**
   * Регистрация пользователя
   *
   * @param userData
   * @param authData
   */
  async signUp(userData: Pick<IUser, 'firstName' | 'lastName'>, authData: IAuthEmail) {
    const authResult = await this.authClient.signUp(authData);

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
  signOut() {
    return this.authClient.signOut();
  }

  /**
   * Получить информацию об авторизации
   */
  getAuthInfo() {
    return this.authClient;
  }
}
