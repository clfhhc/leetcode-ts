import {
  filter,
  makeSubject,
  onPush,
  pipe,
  publish,
  Source,
  Subject,
} from 'wonka';

export function createStateEngine<
  S extends Record<string, Subject<unknown>>,
  O extends Record<string, Source<unknown>>,
  I extends Partial<{
    [P in keyof S & string]: S[P] extends Subject<infer T> ? T : never;
  }>
>({
  subjects,
  output,
}: {
  subjects: S;
  output?: O;
}): { subjects: S; output: O; state: { output: Source<I> } } {
  const state = {} as I;
  const stateSubject = makeSubject<I>();
  const keys: (keyof S & string)[] = Object.keys(subjects);
  for (let key of keys) {
    publish(
      pipe(
        subjects[key].source as Source<I[keyof S & string]>,
        filter((value) => value !== state[key]),
        onPush((value) => {
          state[key] = value;
          stateSubject.next(state);
        })
      )
    );
  }

  return {
    subjects,
    output,
    state: { output: stateSubject.source },
  };
}
