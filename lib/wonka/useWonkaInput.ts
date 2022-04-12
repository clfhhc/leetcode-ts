import { Subject } from 'wonka';

export function useWonkaInput<T>(subject: Subject<T>) {
  return (val: T) => subject.next(val);
}
