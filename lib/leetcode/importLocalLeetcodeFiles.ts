import path from 'path';
import { FunctionTestCases } from 'lib/utils/types';
import findFilesInDirIteratively from 'lib/utils/findFilesInDirIteratively';

export interface ImportedObj {
  default: (...args: any) => any;
  testCases: FunctionTestCases;
  filePath: string;
}

export interface IndexedImportedObj {
  [slug: string]: ImportedObj;
}

const folderPath = path.resolve(process.cwd(), 'leetcode');
const filePaths = findFilesInDirIteratively(folderPath);

const importLocalLeetcodeFiles = () =>
  filePaths.reduce<IndexedImportedObj>((obj, absolutePath) => {
    const filePath = path.relative(process.cwd(), absolutePath);
    const slug = path.parse(filePath).name;
    return {
      ...obj,
      [slug]: {
        ...require(filePath),
        filePath,
      },
    };
  }, {});

export default importLocalLeetcodeFiles;
