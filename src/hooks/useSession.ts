import { useEffect, useState } from 'react';
import { useServices } from './useServices';

export function useSession() {
  const { AuthService } = useServices();
  const auth = AuthService.getAuthInfo();

  const [session, setSession] = useState(auth.session());

  useEffect(() => {
    const stateSession = auth.onAuthStateChange((_, changeSession) => setSession(changeSession));

    return () => {
      stateSession.data?.unsubscribe?.();
    };
  }, []);

  return session;
}
