import { FC, createContext } from 'react';
import { Source, Subject } from 'wonka';
import { createStateEngine } from './createStateEngine';

export function createStateContext<
  S extends Record<string, Subject<any>>,
  O extends Record<string, Source<any>>
>(engineArgs: { subjects: S; output?: O }) {
  const engine = createStateEngine(engineArgs);

  const EngineContext = createContext(engine);

  const EngineProvider: FC = ({ children }) => {
    return (
      <EngineContext.Provider value={engine}>{children}</EngineContext.Provider>
    );
  };
  return {
    engine,
    EngineContext,
    EngineProvider,
  };
}
