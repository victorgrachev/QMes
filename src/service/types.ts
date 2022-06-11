type TSystemColumn = {
  id?: number;
  created_at?: string;
};

export type TUser = TSystemColumn & {
  qin?: number;
  auth_id?: string;
  first_name?: string;
  last_name?: string;
};

export type TChat = TSystemColumn & {
  chat_name?: string;
};

export type TMessage = TSystemColumn & {
  chat_id?: number | TChat;
  text_value: string;
  create_user_id: number | TUser;
};

export type TParticipant = TSystemColumn & {
  user_id?: number | TUser;
  chat_id?: number | TChat;
  chat_name?: string;
};
