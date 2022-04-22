import { SerializedEntries, StorageAdapter } from '@urql/exchange-graphcache';
import { readWholeFileSource } from 'lib/utils/readFile';
import { writeWholeFile } from 'lib/utils/writeFile';
import path from 'path';
import { map, pipe, toPromise } from 'wonka';

export const makeLocalStorage = ({
  dataPath = path.resolve(process.cwd(), 'tmp/cache/data'),
}: {
  dataPath?: string;
} = {}): StorageAdapter => {
  const cache: SerializedEntries = {};

  return {
    async writeData(delta) {
      Object.assign(cache, delta);
      return writeWholeFile({
        text: JSON.stringify(cache),
        filePath: dataPath,
      });
    },
    async readData() {
      return pipe(
        readWholeFileSource(dataPath),
        map((local) => {
          if (local) {
            Object.assign(cache, JSON.parse(local));
          }
          return cache;
        }),
        toPromise
      );
    },
  };
};
