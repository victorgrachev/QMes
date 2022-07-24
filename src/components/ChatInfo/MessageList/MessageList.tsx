import React, { useLayoutEffect, useRef, useState, useImperativeHandle } from 'react';
import { Message } from './Message';
import { IMessage } from 'models/interfaces';
import { WrapperMessageList } from './styled';
import { Loader } from 'components/Loader';
import moment from 'moment';

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

    const messagesGroupByDate = groupByDateMessages(messages);

    return (
      <WrapperMessageList ref={refMessageList}>
        {isMoreMessageLoading && (
          <div className="section center-align">
            <Loader />
          </div>
        )}
        {Object.keys(messagesGroupByDate).map((date, indexDate) => (
          <div key={date}>
            <div className="section center-align green-text text-darken-4">{date}</div>
            <div className="divider light-green lighten-3"></div>
            {messagesGroupByDate[date].map((message, index) => (
              <Message
                key={message.id}
                message={message}
                onVisible={indexDate === 0 && index === 0 ? handleOnFirstVisibleMessage : undefined}
              />
            ))}
          </div>
        ))}
      </WrapperMessageList>
    );
  },
);

function groupByDateMessages(messages: IMessage[]) {
  const result: Record<string, IMessage[]> = {};

  messages?.forEach(({ createDate, ...rest }) => {
    const date = moment(createDate);
    const dateFormatLL = date.format('LL');

    if (!result[dateFormatLL]) {
      result[dateFormatLL] = [{ ...rest, createDate: date.format('LT') }];
    } else {
      result[dateFormatLL].push({ ...rest, createDate: date.format('LT') });
    }
  });

  return result;
}
