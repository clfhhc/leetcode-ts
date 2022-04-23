import { SerializedEntries, StorageAdapter } from '@urql/exchange-graphcache';
import { readWholeFileSource } from 'lib/utils/readFile';
import { createWriteBytesSource } from 'lib/utils/writeFile';
import isEmpty from 'lodash/isEmpty';
import path from 'path';
import { map, pipe, toPromise } from 'wonka';

export const makeLocalStorage = ({
  dataPath = path.resolve(process.cwd(), 'tmp/cache/data'),
  shouldWrite = true,
  shouldRead = true,
}: {
  dataPath?: string;
  shouldWrite?: boolean;
  shouldRead?: boolean;
} = {}): StorageAdapter => {
  const cache: SerializedEntries = {};

  return {
    async writeData(delta) {
      Object.assign(cache, delta);

      if (!shouldWrite || isEmpty(delta)) {
        return;
      }

      console.info('Writing cache');
      return pipe(
        createWriteBytesSource({
          text: JSON.stringify(cache),
          filePath: dataPath,
        }),
        toPromise
      );
    },
    async readData() {
      if (!shouldRead) {
        return cache;
      }
      console.info('Reading cache');
      return pipe(
        readWholeFileSource(dataPath),
        map((local) => {
          if (local) {
            try {
              Object.assign(cache, JSON.parse(local));
            } catch (err) {
              console.error(
                'error parsing cache file: ',
                (err as Error)?.message
              );
              return cache;
            }
          }
          return cache;
        }),
        toPromise
      ).catch((err) => {
        console.error('error reading cache file: ', err.message);
        return {};
      });
    },
  };
};
