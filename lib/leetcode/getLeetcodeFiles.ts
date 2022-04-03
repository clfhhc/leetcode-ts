import path from 'path';
import { findFilesInDirIteratively } from 'lib/utils/findFilesInDirIteratively';

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
