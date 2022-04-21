import path from 'path';
import { findFilesInDirIteratively } from 'lib/utils/findFilesInDirIteratively';

export interface SlugIndexed<T> {
  [slug: string]: T;
}

export const findLocalLeetcodeFiles = (projectPath: string = process.cwd()) => {
  const folderPath = path.resolve(projectPath, 'leetcode');
  return findFilesInDirIteratively(folderPath);
};

export const getLocalLeetcodeSlugs = (projectPath: string = process.cwd()) =>
  findLocalLeetcodeFiles(projectPath).reduce<SlugIndexed<{ filePath: string }>>(
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
