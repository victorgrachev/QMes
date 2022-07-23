import React, { useEffect, useState, useRef } from 'react';
import { ServiceContext, TServiceContext } from './context';
import { AuthService } from 'service/AuthService';
import { ChatService } from 'service/ChatService';
import { TMessageListController } from 'components/ChatInfo/MessageList';

export const ServiceProvider: React.FC = ({ children }) => {
  const MessageListController = useRef<TMessageListController>();
  const [services, setServices] = useState<TServiceContext>();

  useEffect(() => {
    const InstanceAuthService = new AuthService();
    const InstanceChatService = new ChatService(InstanceAuthService);

    setServices({
      InstanceAuthService,
      InstanceChatService,
      // @ts-ignore
      MessageListController,
    });
  }, []);

  if (!services) {
    return null;
  }

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
};
