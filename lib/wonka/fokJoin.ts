import {
  fromValue,
  make,
  onPush,
  pipe,
  publish,
  Source,
} from 'wonka';

export function forkJoin(sources: []): Source<never>;
export function forkJoin<T extends readonly (Source<unknown> | undefined)[]>(
  sources: [...T]
): Source<{
  -readonly [P in keyof T]: T[P] extends Source<infer S> ? S : T[P];
}>;
export function forkJoin(sources: any[]): Source<any> {
  const result = make(({ next, complete }) => {
    const { length } = sources;
    const values = new Array(length);
    let remainingCompletions = length;
    let remainingEmissions = length;
    let cancelled = false;
    for (let sourceIndex = 0; sourceIndex < length; sourceIndex++) {
      if (!cancelled) {
        let hasValue = false;
        publish(
          pipe(
            sources[sourceIndex] ?? fromValue(undefined),
            onPush((value) => {
              if (!hasValue) {
                hasValue = true;
                remainingEmissions--;
              }
              values[sourceIndex] = value;
              remainingCompletions--;
            }),
            onPush(() => {
              if (!remainingCompletions || !hasValue) {
                if (!remainingEmissions) {
                  next(values);
                }
                complete();
              }
            })
          )
        );
      }
    }
    return () => {
      cancelled = true;
    };
  });

  return result;
}
