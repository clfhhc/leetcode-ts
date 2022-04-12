export type SourceSubject<T extends Source<any>> = T extends Source<infer S>
  ? S
  : never;
