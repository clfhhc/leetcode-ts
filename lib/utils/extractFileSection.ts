/**
 * references:
 * https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6
 * https://gist.github.com/yvele/447555b1c5060952a279
 * https://gist.github.com/yvele/447555b1c5060952a279
 */

import { read, openSync } from 'fs';
import {
  make,
  pipe,
  skipWhile,
  takeWhile,
  scan,
  takeLast,
  concatMap,
  concat,
  fromValue,
  toPromise,
} from 'wonka';
import { sourceT } from 'wonka/dist/types/src/Wonka_types.gen';

export type ReadBytesResolve = (result: {
  bytesRead: number;
  buffer: Buffer;
}) => void;

export type ReadBytesReject = (err: NodeJS.ErrnoException) => void;

export function readBytes({
  fd,
  sharedBuffer,
  resolve,
  reject = console.error,
}: {
  fd: number;
  sharedBuffer: Buffer;
  resolve: ReadBytesResolve;
  reject?: ReadBytesReject;
}) {
  read(
    fd,
    sharedBuffer,
    0,
    sharedBuffer.length,
    null,
    (err, bytesRead, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve({ bytesRead, buffer });
    }
  );
}
export const createReadLineSource = (filePath: string, bufferSize = 1000) => {
  const sharedBuffer = Buffer.alloc(bufferSize);
  const fd = openSync(filePath, 'r');
  let data = '';
  let i = 0;

  const readLineSource = make<string>(({ next, complete }) => {
    let cancelled = false;

    const reject: ReadBytesReject = (err) => {
      console.error(err);
      complete();
    };

    const resolve: ReadBytesResolve = ({ buffer, bytesRead }) => {
      if (!cancelled) {
        if (bytesRead === 0) {
          if (data) {
            next(data);
            data = '';
          }
          return complete();
        }
        data += buffer.toString('utf-8', 0, bytesRead);
        const parts = data.split('\n');
        data = parts.pop() || '';
        parts.forEach(next);
        readBytes({ fd, sharedBuffer, resolve, reject });
      }
    };

    readBytes({ fd, sharedBuffer, resolve, reject });

    return () => {
      cancelled = true;
    };
  });

  return readLineSource;
};

export const extractFileSection = ({
  filePath,
  startPredicate,
  endPradicate,
}: {
  filePath: string;
  startPredicate?: (line: string) => boolean;
  endPradicate?: (line: string) => boolean;
}) => {
  const readLineSource = createReadLineSource(filePath);
  let source: sourceT<string | null> = startPredicate
    ? pipe(
        readLineSource,
        skipWhile((line) => !startPredicate(line))
      )
    : readLineSource;

  if (endPradicate) {
    source = pipe(
      source,
      concatMap((line) => {
        if (endPradicate(line || '')) {
          return concat([fromValue(line), fromValue(null)]);
        }
        return fromValue(line);
      }),
      takeWhile((line) => line !== null)
    );
  }

  return pipe(
    source,
    scan((accu, line) => {
      return accu ? `${accu}\n${line}` : line || '';
    }, ''),
    takeLast(1),
    toPromise
  );
};
