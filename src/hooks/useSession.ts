import { useEffect, useState } from 'react';
import { AuthService } from 'service/AuthService';

let isSubscribe = false;

export function useSession() {
  const auth = AuthService.getAuthInfo();

  const [session, setSession] = useState(auth.session());

  useEffect(() => {
    if (!isSubscribe) {
      const stateSession = auth.onAuthStateChange((_, changeSession) => setSession(changeSession));
      isSubscribe = true;

      return () => {
        stateSession.data?.unsubscribe?.();
        isSubscribe = false;
      };
    }
  }, [setSession]);

  return session;
}
