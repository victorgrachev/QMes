import React, { useRef, useState } from 'react';
import { Textarea, WrapperTextarea, WrapperButtonSend, WrapperInputMessage } from './styled';
import { IMessage } from 'models/interfaces';

export type TPropsInputMessage = {
  onSendMessage: (textValue: IMessage['textValue']) => void;
};

export const InputMessage: React.FC<TPropsInputMessage> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const refButtonSend = useRef<HTMLButtonElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => setMessage(event.target.value);

  const handleSendMessage = () => {
    setMessage('');
    onSendMessage(message);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = event => {
    if (event.code.toUpperCase() === 'ENTER') {
      event.preventDefault();
      refButtonSend.current?.click();
    }
  };

  return (
    <WrapperInputMessage>
      <WrapperTextarea>
        <Textarea
          id="icon_prefix2"
          className="materialize-textarea"
          placeholder="Сообщение"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </WrapperTextarea>
      <WrapperButtonSend>
        <button ref={refButtonSend} className="btn waves-effect waves-light" onClick={handleSendMessage}>
          <i className="material-icons right">send</i>
        </button>
      </WrapperButtonSend>
    </WrapperInputMessage>
  );
};
