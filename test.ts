import {
  createReadBytesSource,
  createReadLineSource,
  createReadLineSourceFromBytes,
  createReadLineSourceFromReadStream,
  extractFileSection,
  extractFileSectionSource,
  ExtractFileSectionSourceProps,
} from 'lib/utils/extractFileSection';
import {
  timesFunctionTime,
  timesFunctionTimeWithCallback,
} from 'lib/utils/functionTime';
import { map, pipe, subscribe } from 'wonka';
import flattenDeep from 'lodash/flattenDeep';

const defaultFilePath = 'leetcode/add-two-numbers.ts';

let recordedString = '';
const copyStringCallback = (file: string) => {
  recordedString = file;
};

// const readWholeFileWithReadBytes1000 = (filePath: string = defaultFilePath) => {
//   const bufferSize = 1000;
//   const createLineSource = createReadLineSourceFromBytes;
//   pipe(
//     extractFileSectionSource({
//       filePath,
//       bufferSize,
//       createLineSource,
//     }),
//     subscribe(copyStringCallback)
//   );
// };

const readFileWithCallback = ({
  callback,
  ...args
}: ExtractFileSectionSourceProps & { callback: (text: string) => void }) => {
  pipe(extractFileSectionSource(args), subscribe(callback));
};

const readFileWithPromise = (args: ExtractFileSectionSourceProps) =>
  extractFileSection(args).then(copyStringCallback);

const bufferSizes = [1e3, 1e4, 1e5, 1e6];
const createLineSources = [
  createReadLineSource,
  createReadLineSourceFromBytes,
  createReadLineSourceFromReadStream,
];
const startPredicate = (line: string) => line === '/* solution start */';
const endPradicate = (line: string) => line === '/* solution end */';

const testCases = flattenDeep(
  bufferSizes.map((bufferSize) =>
    createLineSources.map<
      Omit<ExtractFileSectionSourceProps, 'filePath'> & { description: string }
    >((createLineSource) => ({
      bufferSize,
      createLineSource,
      description: `${bufferSize}|${createLineSource.name}`,
    }))
  )
);

const main = async () => {
  // readWholeFileWithReadBytes1000(defaultFilePath);
  const functionToTest = readFileWithCallback;
  const promiseToTest = readFileWithPromise;
  const times = 10000;
  const filePath = defaultFilePath;
  for (let i = 0; i < testCases.length; i++) {
    const { bufferSize, createLineSource, description } = testCases[i];
    await timesFunctionTimeWithCallback({
      functionToTest,
      functionArgs: ({ resolve }): Parameters<typeof functionToTest> => {
        const callback = (text: string) => {
          copyStringCallback(text);
          return resolve();
        };
        return [
          {
            callback,
            filePath,
            bufferSize,
            createLineSource,
          },
        ];
      },
      description: `${description}|callback`,
      times,
    });

    await timesFunctionTime({
      functionToTest: promiseToTest,
      functionArgs: [
        {
          filePath,
          bufferSize,
          createLineSource,
        },
      ],
      times,
      description: `${description}|promise`,
    });
  }

  // console.log(recordedString);
};

main();
