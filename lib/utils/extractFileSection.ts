/**
 * references:
 * https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6
 * https://gist.github.com/yvele/447555b1c5060952a279
 * https://gist.github.com/yvele/447555b1c5060952a279
 */

import { read, openSync, statSync } from 'fs';
import {
  make,
  pipe,
  subscribe,
  skipWhile,
  takeWhile,
  skip,
  skipUntil,
  map,
  scan,
  takeLast,
  share,
  take,
  publish,
  filter,
  merge,
  concatMap,
  concat,
  fromValue,
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
const createReadLineSource = (filePath: string, bufferSize = 10000000) => {
  const sharedBuffer = Buffer.alloc(bufferSize);
  const stats = statSync(filePath);
  const fd = openSync(filePath, 'r');
  let data = '';

  const readLineSource = make<string>(({ next, complete }) => {
    let cancelled = false;

    const resolve: ReadBytesResolve = ({ buffer, bytesRead }) => {
      if (!cancelled) {
        data += buffer.toString('utf-8', 0, bytesRead);
        const parts = data.split('\n');
        data = parts.pop() || '';
        parts.forEach(next);
        if (bytesRead === 0) {
          complete();
        }
      } else {
        complete();
      }
    };
    const reject: ReadBytesReject = (err) => {
      console.error(err);
      complete();
    };

    for (let i = 0; i < Math.ceil(stats.size / bufferSize); i++) {
      readBytes({ fd, sharedBuffer, resolve, reject });
    }

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
  callback,
}: {
  filePath: string;
  startPredicate?: (line: string) => boolean;
  endPradicate?: (line: string) => boolean;
  callback: (content: string) => void;
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

  pipe(
    source,
    scan((accu, line) => (accu ? `${accu}\n${line}` : line || ''), ''),
    takeLast(1),
    subscribe(callback)
  );
};
