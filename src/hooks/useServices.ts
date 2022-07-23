import React, { useContext } from 'react';
import { ServiceContext } from 'context/context';
import { TMessageListController } from '../components/ChatInfo/MessageList';

export function useServices() {
  const { InstanceAuthService, InstanceChatService, MessageListController } = useContext(ServiceContext);
  return {
    AuthService: InstanceAuthService!,
    ChatService: InstanceChatService!,
    MessageListController: <React.MutableRefObject<TMessageListController>>MessageListController,
  };
}
