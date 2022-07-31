import { ETypeEvent } from './enums';
import { IMessage } from '../models/interfaces';

export type TSystemColumn = {
  id: number;
  created_at: string;
};

export type TUser = TSystemColumn & {
  qin: number;
  auth_id: string;
  first_name: string;
  last_name: string;
};

export type TChat = TSystemColumn & {
  chat_name: string;
  chat_view: boolean;
};

export type TMessage = TSystemColumn & {
  chat_id: number | TChat;
  text_value: string;
  create_user_id: number | TUser;
};

export type TParticipant = TSystemColumn & {
  user_id: number | TUser;
  chat_id: number | TChat;
  chat_name: string;
};

export type TMapEventParams = {
  [ETypeEvent.SCROLL_MESSAGE_LIST_TO]: { top?: number; behavior?: ScrollBehavior; message?: IMessage };
  [ETypeEvent.OPEN_MODAL_SEARCH_USER]: {};
  [ETypeEvent.CLOSE_MODAL_SEARCH_USER]: {};
  [ETypeEvent.OPEN_LIST_CHAT]: {};
  [ETypeEvent.CLOSE_LIST_CHAT]: {};
  [ETypeEvent.TOGGLE_MOBILE_ICON]: {};
};
