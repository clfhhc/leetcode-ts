import { concat, Operator, Source, buffer, fromValue } from 'wonka';

export function startWith<T extends any>(initial: T): Operator<T, T> {
  return function (source) {
    return concat([fromValue(initial), source]);
  };
}
