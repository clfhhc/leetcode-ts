import { useEffect, useRef, useState } from 'react';
import { Source, subscribe } from 'wonka';

export function useWonkaOutput<T>(source: Source<T>, initial?: T) {
  const [val, setVal] = useState<T | undefined>(initial);
  const unsubscribe = useRef<() => void>();

  useEffect(() => {
    unsubscribe.current = subscribe(setVal)(source).unsubscribe;
    return () => {
      unsubscribe.current && unsubscribe.current();
    };
  }, [source]);

  return val;
}
