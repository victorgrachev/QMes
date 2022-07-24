import React, { useEffect, useRef, useState } from 'react';
import { Textarea, WrapperTextarea, WrapperInputMessage, WrapperButton } from './styled';
import { IMessage } from 'models/interfaces';
import { ModalEmoji, TPropsModalEmoji } from './ModalEmoji';

export type TPropsInputMessage = {
  onSendMessage: (textValue: IMessage['textValue']) => void;
};

export const InputMessage: React.FC<TPropsInputMessage> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [openModalEmoji, setOpenModalEmoji] = useState(false);
  const refBtnOpenEmoji = useRef<HTMLButtonElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => setMessage(event.target.value);

  const handleSendMessage = () => {
    if (message) {
      setMessage('');
      onSendMessage(message);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = event => {
    if (event.code.toUpperCase() === 'ENTER') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectEmoji: TPropsModalEmoji['onSelect'] = (_, { emoji }) => {
    setMessage(message + emoji);
    setOpenModalEmoji(!openModalEmoji);
  };

  const handleToggleEmoji = () => setOpenModalEmoji(!openModalEmoji);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!refBtnOpenEmoji.current?.contains(event.target as Node)) {
        setOpenModalEmoji(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <WrapperInputMessage>
      {openModalEmoji && <ModalEmoji onSelect={handleSelectEmoji} />}
      <WrapperButton>
        <button
          ref={refBtnOpenEmoji}
          className="btn-floating waves-effect waves-light light-green lighten-2"
          onClick={handleToggleEmoji}
        >
          <i className="material-icons prefix green-text text-darken-4">insert_emoticon</i>
        </button>
      </WrapperButton>
      <WrapperTextarea>
        <Textarea
          id="icon_prefix2"
          className="materialize-textarea green-text text-darken-4"
          placeholder="Введите текст сообщения"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </WrapperTextarea>
      <WrapperButton>
        <button className="btn-floating waves-effect waves-light light-green lighten-2" onClick={handleSendMessage}>
          <i className="material-icons right green-text text-darken-4">send</i>
        </button>
      </WrapperButton>
    </WrapperInputMessage>
  );
};
