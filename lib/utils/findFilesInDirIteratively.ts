import { readdirSync, statSync, promises } from 'fs';
import path from 'path';

const { readdir, stat } = promises;

const findFilesInDirIteratively = (...dirList: string[]) => {
  const files: string[] = [];
  const dirInRead: string[] = [...dirList];

  while (dirInRead.length) {
    const dirPath = dirInRead.shift();
    if (!dirPath) {
      continue;
    }
    try {
      const dirContent = readdirSync(dirPath);
      const extraDir: string[] = [];
      for (const content of dirContent) {
        const contentPath = path.join(dirPath, content);
        const stat = statSync(contentPath);
        if (stat?.isFile()) {
          files.push(contentPath);
        } else if (stat?.isDirectory()) {
          extraDir.push(contentPath);
        }
      }
      dirInRead.unshift(...extraDir);
    } catch (err) {
      console.warn('cannot access path from: ', dirPath);
    }
  }

  return files;
};

export default findFilesInDirIteratively;

export const findFilesInDirIterativelyAsync = async (...dirList: string[]) => {
  const files: string[] = [];
  let dirInRead: string[] = [...dirList];

  while (dirInRead.length) {
    const dirPath = dirInRead.shift();
    if (!dirPath) {
      continue;
    }

    try {
      const dirContent = await readdir(dirPath);
      await Promise.all(
        dirContent.map(async (content) => {
          const contentPath = path.join(dirPath, content);
          const contentStat = await stat(contentPath);
          if (contentStat.isFile()) {
            files.push(contentPath);
          } else if (contentStat.isDirectory()) {
            dirInRead.push(contentPath);
          }
        })
      );
    } catch {
      console.warn('cannot access path from: ', dirPath);
    }
  }
};
