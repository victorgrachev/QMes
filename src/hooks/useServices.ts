import { useContext } from 'react';
import { ServiceContext } from 'context/context';

export function useServices() {
  const { InstanceAuthService, InstanceChatService, InstanceEventService } = useContext(ServiceContext);
  return {
    AuthService: InstanceAuthService!,
    ChatService: InstanceChatService!,
    EventService: InstanceEventService!,
  };
}
