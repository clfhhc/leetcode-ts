import { findLocalLeetcodeFiles, SlugIndexed } from './getLeetcodeFiles';
import { FunctionTestCases } from 'lib/utils/types';
import path from 'path';

export interface ImportedObj {
  default: (...args: any) => any;
  testCases: FunctionTestCases;
  filePath: string;
}

export const importLocalLeetcodeFiles = () =>
  findLocalLeetcodeFiles().reduce<SlugIndexed<ImportedObj>>(
    (obj, absolutePath) => {
      const filePath = path.relative(process.cwd(), absolutePath);
      const slug = path.parse(filePath).name;
      return {
        ...obj,
        [slug]: {
          ...require(filePath),
          filePath,
        },
      };
    },
    {}
  );
