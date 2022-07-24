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
      <CardMessage className="card-panel light-green lighten-2" position={incoming ? 'right' : 'left'}>
        <span className="green-text text-darken-4">{textValue}</span>
        <TimeMessage className="green-text text-darken-4">{createDate}</TimeMessage>
      </CardMessage>
    </WrapperMessage>
  );
};
