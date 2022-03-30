import { FunctionTestCases } from '../lib/utils/types';

function twoSum(nums: number[], target: number): number[] {
  const numsObj: { [k: number]: number } = {};
  // iterate all the elements in the array
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    // calculate the match
    let match = target - current;
    // find match in the previously scanned items
    if (match in numsObj) {
      // return if there is a match in the previously scanned items
      return [numsObj[match], i];
    } else {
      // store this item in the hash table if there is not a match
      numsObj[current] = i;
    }
  }
  return [];
}

export default twoSum;

export const testCases: FunctionTestCases<typeof twoSum> = [];
testCases.push([
  [[2, 7, 11, 15], 9],
  [0, 1],
]);
testCases.push([
  [[3, 2, 4], 6],
  [1, 2],
]);
testCases.push([
  [[3, 3], 6],
  [0, 1],
]);
