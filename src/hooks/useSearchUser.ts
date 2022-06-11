import { useEffect, useState } from 'react';
import { IUser } from 'models/interfaces';
import { ChatService } from 'service/ChatService';

export function useSearchUser(userQIN?: IUser['qin']) {
  const [user, setUser] = useState<IUser>();
  const [qin, setQin] = useState(userQIN);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setQin(userQIN);
  }, [userQIN, setQin]);

  useEffect(() => {
    if (qin) {
      setLoading(true);

      ChatService.getUserByQIN(qin).then(({ data }) => {
        data.id && setUser(data);
        setLoading(false);
      });
    }
  }, [qin, setUser, setLoading]);

  return { searchUser: user, loading };
}
