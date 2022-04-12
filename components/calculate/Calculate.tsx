import { EngineContext } from 'lib/state/initStateEngineContext';
import { useWonkaInput } from 'lib/wonka/useWonkaInput';
import { useWonkaOutput } from 'lib/wonka/useWonkaOutput';
import { FC, useContext } from 'react';

const Calculate: FC = () => {
  const {
    subjects: { numbersToSum, calculate },
    output: { solution },
    state: { output },
  } = useContext(EngineContext);
  const addNumber = useWonkaInput(numbersToSum);
  const calculateNow = useWonkaInput(calculate);
  const solutions = useWonkaOutput(solution, []);
  const state = useWonkaOutput(output);
  console.log('state: ', state);

  return (
    <div>
      <button type="button" onClick={addNumber.bind(null, 2)}>
        add 2
      </button>
      <button type="button" onClick={addNumber.bind(null, 5)}>
        add 5
      </button>
      <button type="button" onClick={calculateNow.bind(null, undefined)}>
        calculate
      </button>
      <ul>
        {solutions.map((solution, idx) => (
          <li key={`${idx}:${solution}`}>{solution}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calculate;
