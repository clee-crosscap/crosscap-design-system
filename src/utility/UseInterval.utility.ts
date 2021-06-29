import { useEffect, useRef } from 'react';

export function useInterval(callback: () => any, delay?: number) {
  const savedCallback = useRef<() => any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [ callback ]);

  useEffect(() => {
    if(typeof delay === 'number' && Number.isFinite(delay) && delay > 0) {
      const id: number = +setInterval(() => savedCallback.current?.(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}