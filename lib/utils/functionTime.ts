export type ElapsedTimeCallback = (
  start: [number, number],
  description: string
) => void;

const elapsedTimeCallback: ElapsedTimeCallback = (start, description) => {
  const elapsedTime = process.hrtime(start);
  console.log(
    `${description} took ${(elapsedTime[0] * 1e9 + elapsedTime[1]) / 1e6} ms.`
  );
};

export const timesFunctionTime = async <T extends (...args: any) => any>({
  functionToTest,
  functionArgs,
  description: givenDiscription,
  times = 1,
}: {
  functionToTest: T;
  functionArgs: Parameters<T> | (() => Parameters<T> | Promise<Parameters<T>>);
  description?: string;
  times?: number;
}) => {
  const start = process.hrtime();
  const description = givenDiscription || `Function ${functionToTest?.name}`;
  const args =
    functionArgs instanceof Function ? await functionArgs() : functionArgs;
  for (let i = 0; i < times; i++) {
    await functionToTest(...args);
  }

  elapsedTimeCallback(start, description);
};

export const timesFunctionTimeWithCallback = <T extends (...args: any) => any>({
  functionToTest,
  functionArgs,
  description: givenDiscription,
  times = 1,
}: {
  functionToTest: T;
  functionArgs:
    | Parameters<T>
    | (({
        resolve,
        reject,
      }: {
        resolve: () => void;
        reject: (reason?: any) => void;
      }) => Parameters<T>);
  description?: string;
  times?: number;
}) =>
  new Promise<void>((resolve, reject) => {
    const start = process.hrtime();
    const description = givenDiscription || `Function ${functionToTest?.name}`;
    let i = 0;

    const newResolve = () => {
      i += 1;
      if (i === times) {
        elapsedTimeCallback(start, description);
        return resolve();
      }
      functionToTest(...args);
    };
    const args =
      functionArgs instanceof Function
        ? functionArgs({ resolve: newResolve, reject })
        : functionArgs;

    functionToTest(...args);
  });

export const timesFunctionTimeForCallback = ({}) => {};
