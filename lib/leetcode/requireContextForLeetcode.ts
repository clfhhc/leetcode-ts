import { FunctionTestCases } from 'lib/utils/types';
import path from 'path';

export function importAllLeetcodeFiles(r: ReturnType<typeof require.context>) {
  const filePaths = r.keys();
  const result = filePaths.reduce<{
    [slug: string]: {
      default: (...args: any) => any;
      testCases: FunctionTestCases;
      filePath: string;
    };
  }>((obj, filePath) => {
    const slug = path.parse(filePath).name;
    return {
      ...obj,
      [slug]: {
        ...r(filePath),
        filePath,
      },
    };
  }, {});
  return result;
}

export const importedLeetcodeObj = importAllLeetcodeFiles(
  require.context('leetcode/', true, /^leetcode.*.ts$/)
);
