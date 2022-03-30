import { importedObjArray } from './importLeetcodeFiles';

describe('LeetCode Tests', () => {
  importedObjArray.forEach((importedObj) => {
    describe(importedObj.slug, () => {
      describe('should meet all included testCases', () => {
        importedObj.testCases.forEach(([input, output]: [any, any]) => {
          it(`given ${JSON.stringify(input)} should output ${JSON.stringify(
            output
          )}`, () => {
            expect(importedObj.default(...input)).toEqual(output);
          });
        });
      });
    });
  });
});
