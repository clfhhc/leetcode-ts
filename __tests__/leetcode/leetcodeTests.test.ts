import { importLocalLeetcodeFiles } from 'lib/leetcode/importLocalLeetcodeFiles';
import { FunctionTestCase } from 'lib/utils/types';

describe('LeetCode Tests', () => {
  Object.values(importLocalLeetcodeFiles()).forEach(
    ({ testCases, filePath }) => {
      describe(filePath, () => {
        describe('should meet all included testCases', () => {
          testCases.forEach(({ f, cases }) => {
            describe(f.name, () => {
              cases.forEach(
                ({ i, o }: FunctionTestCase<(...args: any) => any>) => {
                  it(`given ${JSON.stringify(i)} should output ${JSON.stringify(
                    o
                  )}`, () => {
                    expect(f(...i)).toEqual(o);
                  });
                }
              );
            });
          });
        });
      });
    }
  );
});
