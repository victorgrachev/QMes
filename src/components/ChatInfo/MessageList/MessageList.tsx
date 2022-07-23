import React, { useEffect, useLayoutEffect, useRef, useState, useImperativeHandle } from 'react';
import { Message } from './Message';
import { IMessage } from 'models/interfaces';
import { WrapperMessageList } from './styled';
import { Loader } from 'components/Loader';

export type TMessageListController = {
  scrollMessageListTo: (params?: { top?: number; behavior?: ScrollBehavior; message?: IMessage }) => void;
};

type TPropsMessageList = {
  messages: IMessage[];
  onFirstVisibleMessage?: (onLoading?: () => void, onLoaded?: () => void) => void;
};

export const MessageList = React.forwardRef<TMessageListController, TPropsMessageList>(
  ({ messages, onFirstVisibleMessage }, ref) => {
    const [isMoreMessageLoading, setIsMoreMessageLoading] = useState(false);
    const refMessageList = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      scrollMessageListTo: ({ top = refMessageList.current?.scrollHeight, behavior = 'auto', message } = {}) => {
        if (message) {
          const refMessage = document.querySelector(`[data-message="${message.id}"]`);
          refMessage?.scrollIntoView({ behavior });
        } else {
          refMessageList.current?.scrollTo?.({ top, behavior });
        }
      },
    }));

    useLayoutEffect(() => {
      refMessageList.current?.scrollTo?.({ top: refMessageList.current?.scrollHeight });
    }, []);

    const handleOnFirstVisibleMessage = () => {
      onFirstVisibleMessage?.(
        () => setIsMoreMessageLoading(true),
        () => setIsMoreMessageLoading(false),
      );
    };

    return (
      <WrapperMessageList ref={refMessageList}>
        {isMoreMessageLoading && (
          <div className="row">
            <div className="col s12 center-align">
              <Loader />
            </div>
          </div>
        )}
        {messages?.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            onVisible={index === 0 ? handleOnFirstVisibleMessage : undefined}
          />
        ))}
      </WrapperMessageList>
    );
  },
);
