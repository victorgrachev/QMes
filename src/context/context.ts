import React from 'react';
import { AuthService } from 'service/AuthService';
import { ChatService } from 'service/ChatService';
import { TMessageListController } from 'components/ChatInfo/MessageList';

export type TServiceContext = {
  MessageListController?: React.ForwardedRef<TMessageListController>;
  InstanceAuthService?: AuthService;
  InstanceChatService?: ChatService;
};

export const ServiceContext = React.createContext<TServiceContext>({});
