import 'lib/utils/serverLoadEnvConfig';
import {
  createReadLineSource,
  createReadLineSourceFromBytes,
  createReadLineSourceFromReadStream,
  extractFileSection,
  extractFileSectionSource,
  ExtractFileSectionSourceProps,
} from 'lib/utils/readFile';
import {
  timesFunctionTime,
  timesFunctionTimeWithCallback,
} from 'lib/utils/functionTime';
import { fromPromise, fromValue, map, pipe, subscribe, toPromise } from 'wonka';
import flattenDeep from 'lodash/flattenDeep';
import { forkJoin } from 'lib/wonka/forkJoin';
import fetch from 'cross-fetch';
global.fetch = fetch;

const defaultFilePath = 'leetcode/add-two-numbers.ts';

let recordedString = '';
const copyStringCallback = (file: string) => {
  recordedString = file;
};

const readFileWithCallback = ({
  callback,
  ...args
}: ExtractFileSectionSourceProps & { callback: (text: string) => void }) => {
  pipe(extractFileSectionSource(args), subscribe(callback));
};

const readFileWithPromise = (args: ExtractFileSectionSourceProps) =>
  extractFileSection(args).then(copyStringCallback);

const bufferSizes = [1e4, 1e5];
const createLineSources = [
  createReadLineSource,
  createReadLineSourceFromBytes,
  createReadLineSourceFromReadStream,
];
const startPredicate = (line: string) => line === '/* solution start */';
const endPradicate = (line: string) => line === '/* solution end */';

const startPredicates = [startPredicate, undefined];
const endPradicates = [endPradicate, undefined];

const testCases = flattenDeep(
  startPredicates.map((startPredicate) =>
    endPradicates.map((endPradicate) =>
      bufferSizes.map((bufferSize) =>
        createLineSources.map<
          Omit<ExtractFileSectionSourceProps, 'filePath'> & {
            description: string;
          }
        >((createLineSource) => ({
          bufferSize,
          createLineSource,
          description: `${bufferSize}|${createLineSource.name}|${
            startPredicate ? 'start' : 'noStart'
          }|${endPradicate ? 'end' : 'noEnd'}`,
          startPredicate,
          endPradicate,
        }))
      )
    )
  )
);

// const main = async () => {
//   const functionToTest = readFileWithCallback;
//   const promiseToTest = readFileWithPromise;
//   const times = 1000;
//   const filePath = defaultFilePath;
//   for (let i = 0; i < testCases.length; i++) {
//     const { bufferSize, createLineSource, description } = testCases[i];
//     await timesFunctionTimeWithCallback({
//       functionToTest,
//       functionArgs: ({ resolve }): Parameters<typeof functionToTest> => {
//         const callback = (text: string) => {
//           copyStringCallback(text);
//           return resolve();
//         };
//         return [
//           {
//             callback,
//             filePath,
//             bufferSize,
//             createLineSource,
//           },
//         ];
//       },
//       description: `${description}|callback`,
//       times,
//     });

//     await timesFunctionTime({
//       functionToTest: promiseToTest,
//       functionArgs: [
//         {
//           filePath,
//           bufferSize,
//           createLineSource,
//         },
//       ],
//       times,
//       description: `${description}|promise`,
//     });
//   }
// };
const solutionContentSource = (filePath: string) =>
  extractFileSectionSource({
    filePath,
    startPredicate: (line) => line === '/* solution start */',
    endPradicate: (line) => line === '/* solution end */',
  });

// const testFetch = async () => {
//   const result = await fetch('https://google.com', {method: 'GET'});
//   return result.text();
// }

const testFetch = () => Promise.resolve(3);

const functionToTest1 = async () => {
  return pipe(
    forkJoin([
      solutionContentSource('leetcode/add-two-numbers.ts'),
      solutionContentSource('leetcode/two-sum.ts'),
      fromPromise(testFetch()),
    ]),
    map(([content1, content2, content3]) => ({ content1, content2, content3 })),
    toPromise
  );
};

const functionToTest2 = async () => {
  const request1 = pipe(
    solutionContentSource('leetcode/add-two-numbers.ts'),
    toPromise
  );
  const request2 = pipe(
    solutionContentSource('leetcode/two-sum.ts'),
    toPromise
  );
  const request3 = testFetch();

  return {
    content1: await request1,
    content2: await request2,
    content3: await request3,
  };
};
const main = async () => {
  [functionToTest1, functionToTest2].forEach((functionToTest, index) =>
    timesFunctionTime({
      functionToTest,
      times: 10000,
      functionArgs: [],
      description: `func${index}`,
    })
  );
};

main();
