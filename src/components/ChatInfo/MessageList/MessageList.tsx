import React, { useLayoutEffect, useRef, useState } from 'react';
import { Message } from './Message';
import { IMessage } from 'models/interfaces';
import { WrapperMessageList, MessageListStyled, MessageListTitle } from './styled';
import { Loader } from 'components/Loader';
import moment from 'moment';
import { useServices } from 'hooks/useServices';
import { ETypeEvent } from 'service/enums';
import { TMapEventParams } from 'service/types';

type TPropsMessageList = {
  title: string;
  messages: IMessage[];
  onFirstVisibleMessage?: (onLoading?: () => void, onLoaded?: () => void) => void;
};

export const MessageList: React.FC<TPropsMessageList> = ({ title, messages, onFirstVisibleMessage }) => {
  const [isMoreMessageLoading, setIsMoreMessageLoading] = useState(false);
  const { EventService } = useServices();
  const refMessageList = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    refMessageList.current?.scrollTo?.({ top: refMessageList.current?.scrollHeight });

    const scrollMessage = ({ detail }: CustomEvent<TMapEventParams[ETypeEvent.SCROLL_MESSAGE_LIST_TO]>) => {
      const { message, behavior = 'auto', top = refMessageList.current?.scrollHeight } = detail ?? {};

      if (message) {
        const refMessage = document.querySelector(`[data-message="${message.id}"]`);
        refMessage?.scrollIntoView({ behavior });
      } else {
        refMessageList.current?.scrollTo?.({ top, behavior });
      }
    };

    EventService.subscribe(ETypeEvent.SCROLL_MESSAGE_LIST_TO, scrollMessage);

    return () => {
      EventService.unsubscribe(ETypeEvent.SCROLL_MESSAGE_LIST_TO, scrollMessage);
    };
  }, []);

  const handleOnFirstVisibleMessage = () => {
    onFirstVisibleMessage?.(
      () => setIsMoreMessageLoading(true),
      () => setIsMoreMessageLoading(false),
    );
  };

  const messagesGroupByDate = groupByDateMessages(messages);

  return (
    <WrapperMessageList>
      <MessageListTitle>
        <nav className="no-select top-nav light-green lighten-3 z-depth-3">
          <div className="nav-wrapper container right-align">
            <a href="#">
              <i className="material-icons right green-text text-darken-4">phone</i>
            </a>
            <span className="flow-text green-text text-darken-4">{title}</span>
          </div>
        </nav>
      </MessageListTitle>
      <MessageListStyled ref={refMessageList}>
        {isMoreMessageLoading && (
          <div className="section center-align">
            <Loader />
          </div>
        )}
        {Object.keys(messagesGroupByDate).map((date, indexDate) => (
          <div key={date}>
            <div className="section center-align green-text text-darken-4">{date}</div>
            <div className="divider light-green lighten-3" />
            {messagesGroupByDate[date].map((message, index) => (
              <Message
                key={message.id}
                message={message}
                onVisible={indexDate === 0 && index === 0 ? handleOnFirstVisibleMessage : undefined}
              />
            ))}
          </div>
        ))}
      </MessageListStyled>
    </WrapperMessageList>
  );
};

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
