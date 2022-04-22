/**
 * references:
 * https://betterprogramming.pub/a-memory-friendly-way-of-reading-files-in-node-js-a45ad0cc7bb6
 * https://gist.github.com/yvele/447555b1c5060952a279
 * https://gist.github.com/yvele/447555b1c5060952a279
 */

import { read, openSync, createReadStream, closeSync } from 'fs';
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
  map,
  fromArray,
  Source,
} from 'wonka';

const defaultBufferSize = 1e2;

export type ReadBytesResolve = (result: {
  bytesRead: number;
  buffer: Buffer;
}) => void;

export type ReadBytesReject = (err: NodeJS.ErrnoException) => void;

export type CreateReadSource = (
  filePath: string,
  bufferSize?: number
) => Source<string>;

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

export const createReadBytesSource = (
  filePath: string,
  bufferSize = defaultBufferSize
) => {
  const sharedBuffer = Buffer.alloc(bufferSize);
  const fd = openSync(filePath, 'r');

  const createReadBytesSource = make<Buffer>(({ next, complete }) => {
    let cancelled = false;

    const reject: ReadBytesReject = (err) => {
      console.error(err);
      closeSync(fd);
      complete();
    };

    const resolve: ReadBytesResolve = ({ buffer, bytesRead }) => {
      if (!cancelled) {
        next(buffer.slice(0, bytesRead));
        if (bytesRead === 0) {
          closeSync(fd);
          return complete();
        }
        readBytes({ fd, sharedBuffer, resolve, reject });
      }
    };

    readBytes({ fd, sharedBuffer, resolve, reject });

    return () => {
      cancelled = true;
    };
  });

  return createReadBytesSource;
};

export const createReadLineSourceFromBytes: CreateReadSource = (
  filePath,
  bufferSize = defaultBufferSize
) => {
  let data = '';
  return pipe(
    createReadBytesSource(filePath, bufferSize),
    map((buffer) => buffer.toString('utf-8')),
    concatMap((chars) => {
      data += chars;
      const parts = data.split('\n');
      data = parts.pop() || '';
      return fromArray(parts);
    })
  );
};

export const createReadLineSource: CreateReadSource = (
  filePath,
  bufferSize = defaultBufferSize
) => {
  const sharedBuffer = Buffer.alloc(bufferSize);
  const fd = openSync(filePath, 'r');
  let data = '';

  const readLineSource = make<string>(({ next, complete }) => {
    let cancelled = false;

    const reject: ReadBytesReject = (err) => {
      console.error(err);
      closeSync(fd);
      complete();
    };

    const resolve: ReadBytesResolve = ({ buffer, bytesRead }) => {
      if (!cancelled) {
        if (bytesRead === 0) {
          next('');
          closeSync(fd);
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

export const createReadLineSourceFromReadStream: CreateReadSource = (
  filePath,
  bufferSize = defaultBufferSize
) => {
  let data = '';
  const readStream = createReadStream(filePath, {
    highWaterMark: bufferSize,
    encoding: 'utf-8',
  });

  const readStreamSource = make<string>(({ next, complete }) => {
    readStream.on('data', (chars) => {
      data += chars;
      const parts = data.split('\n');
      data = parts.pop() || '';
      parts.forEach(next);
    });
    readStream.on('close', () => {
      complete();
    });

    return () => {
      complete();
    };
  });

  return readStreamSource;
};

export interface ExtractFileSectionSourceProps {
  filePath: string;
  bufferSize?: number;
  startPredicate?: (line: string) => boolean;
  endPradicate?: (line: string) => boolean;
  createLineSource?: CreateReadSource;
}

export const extractFileSectionSource = ({
  filePath,
  bufferSize = defaultBufferSize,
  startPredicate,
  endPradicate,
  createLineSource = createReadLineSource,
}: ExtractFileSectionSourceProps) => {
  const readLineSource = createLineSource(filePath, bufferSize);
  let source: Source<string | null> = startPredicate
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
    takeLast(1)
  );
};

export const extractFileSection = (arg: ExtractFileSectionSourceProps) =>
  pipe(extractFileSectionSource(arg), toPromise);

export const readWholeFileSource: CreateReadSource = (
  filePath,
  bufferSize = defaultBufferSize
) => {
  return pipe(
    createReadBytesSource(filePath, bufferSize),
    scan((accu, buffer) => accu + buffer.toString('utf-8'), ''),
    takeLast(1)
  );
};
