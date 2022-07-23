import { IAuthEmail, IUser } from 'models/interfaces';
import { useServices } from './useServices';

export function useAuth() {
  const { AuthService } = useServices();
  const handleSighIn = (authData: IAuthEmail) => AuthService.signIn(authData);
  const handleSignUp = (userData: Pick<IUser, 'firstName' | 'lastName'>, authData: IAuthEmail) =>
    AuthService.signUp(userData, authData);
  const handleSighOut = () => AuthService.signOut();

  return { handleSighIn, handleSignUp, handleSighOut };
}
