import { Subject } from 'wonka';

export function inputWonkaFactory<T>(subject: Subject<T>) {
  return (val: T) => subject.next(val);
}
