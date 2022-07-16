import { AuthService } from 'service/AuthService';
import { IAuthEmail, IUser } from 'models/interfaces';

export function useAuth() {
  const handleSighIn = (authData: IAuthEmail) => AuthService.signIn(authData);
  const handleSignUp = (userData: Pick<IUser, 'firstName' | 'lastName'>, authData: IAuthEmail) =>
    AuthService.signUp(userData, authData);
  const handleSighOut = () => AuthService.signOut();

  return { handleSighIn, handleSignUp, handleSighOut };
}
