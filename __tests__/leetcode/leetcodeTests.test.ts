import importLocalLeetcodeFiles from 'lib/leetcode/importLocalLeetcodeFiles';

describe('LeetCode Tests', () => {
  Object.values(importLocalLeetcodeFiles()).forEach(
    ({ default: solutionFunction, testCases, filePath }) => {
      describe(filePath, () => {
        describe('should meet all included testCases', () => {
          testCases.forEach(([input, output]: [any, any]) => {
            it(`given ${JSON.stringify(input)} should output ${JSON.stringify(
              output
            )}`, () => {
              expect(solutionFunction(...input)).toEqual(output);
            });
          });
        });
      });
    }
  );
});
