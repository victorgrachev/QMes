import React, { useEffect, useRef } from 'react';
import { WrapperMessage, CardMessage, TimeMessage } from './styled';
import { IMessage } from 'models/interfaces';

export type TPropsMessage = {
  message: IMessage;
  onVisible?: () => void;
};

export const Message: React.FC<TPropsMessage> = ({ message: { textValue, incoming, id, createDate }, onVisible }) => {
  const refMessage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (onVisible) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(({ isIntersecting }) => {
            if (isIntersecting) {
              onVisible();
              observer.disconnect();
            }
          });
        },
        { threshold: 1 },
      );

      observer.observe(refMessage.current!);

      return () => observer.disconnect();
    }
  }, [onVisible]);

  return (
    <WrapperMessage ref={refMessage} data-message={id} className="section">
      <CardMessage className="card-panel teal" position={incoming ? 'right' : 'left'}>
        <span className="white-text">{textValue}</span>
        <TimeMessage className="white-text">{createDate}</TimeMessage>
      </CardMessage>
    </WrapperMessage>
  );
};
