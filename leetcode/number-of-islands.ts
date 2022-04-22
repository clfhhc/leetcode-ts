import { FunctionTestCases } from 'lib/utils/types';

/* solution start */

function numIslands(grid: string[][]): number {
  if (grid.length === 0) {
    return 0;
  }
  const width = grid[0].length;
  const height = grid.length;
  let islandCounter = 0;
  const explore = (i: number, j: number) => {
    if (i >= 0 && i < height && j >= 0 && j < width && grid[i][j] == '1') {
      grid[i][j] = '0';
      explore(i + 1, j);
      explore(i - 1, j);
      explore(i, j + 1);
      explore(i, j - 1);
    }
  };
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] == '1') {
        explore(i, j);
        islandCounter++;
      }
    }
  }
  return islandCounter;
}

/* solution end */

export default numIslands;

export const testCases: FunctionTestCases<typeof numIslands> = [];

(
  [
    [
      [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
      ],
      1,
    ],
    [
      [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1'],
      ],
      3,
    ],
  ] as [string[][], number][]
).forEach((array) => {
  const [input, output] = [...array];
  testCases.push([[input], output]);
});
