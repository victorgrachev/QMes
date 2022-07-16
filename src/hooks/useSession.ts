import { useEffect, useState } from 'react';
import { AuthService } from 'service/AuthService';

export function useSession() {
  const auth = AuthService.getAuthInfo();

  const [session, setSession] = useState(auth.session());

  useEffect(() => {
    const stateSession = auth.onAuthStateChange((_, changeSession) => setSession(changeSession));

    return () => {
      stateSession.data?.unsubscribe?.();
    };
  }, [setSession]);

  return session;
}
