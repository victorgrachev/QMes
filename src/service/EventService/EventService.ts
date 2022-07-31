import { ETypeEvent } from 'service/enums';
import { TMapEventParams } from 'service/types';

export class EventService {
  private subscribeMap = new Map<ETypeEvent, { handleEvent: (event: CustomEvent) => void }[]>();
  private eventTarget = new EventTarget();

  subscribe<T extends ETypeEvent>(typeEvent: T, callback: (event: CustomEvent<TMapEventParams[T]>) => void) {
    const handle = { handleEvent: callback };

    this.eventTarget.addEventListener(typeEvent, handle);

    const currentMap = this.subscribeMap.get(typeEvent);

    if (currentMap) {
      currentMap.push(handle);
    } else {
      this.subscribeMap.set(typeEvent, [handle]);
    }
  }

  unsubscribe<T extends ETypeEvent>(typeEvent: T, callback: (event: CustomEvent<TMapEventParams[T]>) => void) {
    const handlers = this.subscribeMap.get(typeEvent) ?? [];
    const targetHandle = handlers.find(({ handleEvent }) => handleEvent === callback);

    if (targetHandle) {
      this.eventTarget.removeEventListener(typeEvent, targetHandle);

      if (handlers.length > 1) {
        this.subscribeMap.set(
          typeEvent,
          handlers?.filter(handle => handle !== targetHandle),
        );
      } else {
        this.subscribeMap.delete(typeEvent);
      }
    }
  }

  dispatch<T extends ETypeEvent>(typeEvent: T, options?: TMapEventParams[T]) {
    this.eventTarget.dispatchEvent(new CustomEvent(typeEvent, { detail: options }));
  }

  unsubscribeAll() {
    for (const [eventType, callbacks] of this.subscribeMap) {
      callbacks.forEach(callback => {
        this.eventTarget.removeEventListener(eventType, callback);
      });
    }
    this.subscribeMap.clear();
  }
}
