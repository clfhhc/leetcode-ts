import { FC, createContext, useContext } from 'react';
import { Source, Subject } from 'wonka';
import { createStateEngine } from './createStateEngine';

export function createStateContext<
  S extends Record<string, Subject<any>>,
  O extends Record<string, Source<any>>
>(engineArgs: { subjects: S; output?: O }) {
  const engine = createStateEngine(engineArgs);

  const StateContext = createContext(engine);

  const useStateContext = () => useContext(StateContext);

  const StateProvider: FC = ({ children }) => {
    return (
      <StateContext.Provider value={engine}>{children}</StateContext.Provider>
    );
  };
  return {
    engine,
    StateContext,
    StateProvider,
    useStateContext,
  };
}
