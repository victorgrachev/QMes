import React, { useEffect, useState } from 'react';
import { ServiceContext, TServiceContext } from './context';
import { AuthService } from 'service/AuthService';
import { ChatService } from 'service/ChatService';
import { EventService } from 'service/EventService';

export const ServiceProvider: React.FC = ({ children }) => {
  const [services, setServices] = useState<TServiceContext>();

  useEffect(() => {
    const InstanceAuthService = new AuthService();
    const InstanceChatService = new ChatService(InstanceAuthService);
    const InstanceEventService = new EventService();

    setServices({
      InstanceAuthService,
      InstanceChatService,
      InstanceEventService,
    });
  }, []);

  if (!services) {
    return null;
  }

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
};
