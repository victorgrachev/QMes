import React, { useEffect, useRef } from 'react';
import { WrapperMessage } from './styled';
import { IMessage } from 'models/interfaces';

export type TPropsMessage = {
  message: IMessage;
  onVisible?: () => void;
};

export const Message: React.FC<TPropsMessage> = ({ message: { textValue, incoming, id }, onVisible }) => {
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
    <WrapperMessage position={incoming ? 'left' : 'right'} className="row">
      <div ref={refMessage} className="col s12" data-message={id}>
        <div className="card-panel teal">
          <span className="white-text">{textValue}</span>
        </div>
      </div>
    </WrapperMessage>
  );
};
