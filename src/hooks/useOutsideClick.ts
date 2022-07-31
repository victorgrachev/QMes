import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends Element = Element>(onOutsideClick: (event: MouseEvent) => void) {
  const ref = useRef<T | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    event.preventDefault();

    if (!ref.current?.contains(event.target as Node)) {
      onOutsideClick(event);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [onOutsideClick]);

  return ref;
}
