import React from 'react';
import { AuthService } from 'service/AuthService';
import { ChatService } from 'service/ChatService';
import { EventService } from 'service/EventService';

export type TServiceContext = {
  InstanceAuthService?: AuthService;
  InstanceChatService?: ChatService;
  InstanceEventService?: EventService;
};

export const ServiceContext = React.createContext<TServiceContext>({});
