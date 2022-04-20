import { createStateContext } from 'lib/wonka/createStateContext';
import { makeSubject, pipe, buffer, map, scan } from 'wonka';

const numbersToSumString = (numbers: number[]) => numbers.join('+');

const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b);

const numbersToSum = makeSubject<number>();
const calculate = makeSubject<undefined>();

const solution = pipe(
  numbersToSum.source,
  buffer(calculate.source),
  map((numbers) => `${numbersToSumString(numbers)}=${sum(numbers)}`),
  scan<string, string[]>(
    (solutionsSoFar, solution) => [solution, ...solutionsSoFar],
    []
  )
);

export const { StateProvider, useStateContext } = createStateContext({
  subjects: { numbersToSum, calculate },
  output: { solution },
});
