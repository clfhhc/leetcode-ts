import path from 'path';
import { readdirSync } from 'fs';
import { FunctionTestCases } from 'lib/utils/types';

export interface ImportedObjArray {
  default: (...args: any) => any;
  testCases: FunctionTestCases;
  slug: string;
}
[];

const folderPath = path.resolve(process.cwd(), 'leetcode');
const fileNames = readdirSync(folderPath);

export const importedObjArray = fileNames.map((fileName) => {
  const filePath = path.join(folderPath, fileName);
  const slug = path.parse(filePath).name;
  return {
    ...require(filePath),
    slug,
  };
});
