import path from 'path';
import { FunctionTestCases } from 'lib/utils/types';
import { findFilesInDirIteratively } from 'lib/utils/findFilesInDirIteratively';

export interface ImportedObj {
  default: (...args: any) => any;
  testCases: FunctionTestCases;
  filePath: string;
}

export interface SlugIndexed<T> {
  [slug: string]: T;
}

export const findLocalLeetcodeFiles = () => {
  const folderPath = path.resolve(process.cwd(), 'leetcode');
  return findFilesInDirIteratively(folderPath);
};

export const getLocalLeetcodeSlugs = () =>
  findLocalLeetcodeFiles().reduce<SlugIndexed<{ filePath: string }>>(
    (obj, absolutePath) => {
      const filePath = path.relative(process.cwd(), absolutePath);
      const slug = path.parse(filePath).name;
      return {
        ...obj,
        [slug]: { filePath },
      };
    },
    {}
  );

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
