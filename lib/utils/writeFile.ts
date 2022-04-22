import { openSync, write } from 'fs';
import { make, pipe, publish, takeLast, toPromise } from 'wonka';

const defaultBufferSize = 1e5;

export type WriteBytesResolve = (result: {
  bytesWriten: number;
  buffer: Buffer;
}) => void;

export type WriteBytesReject = (err: NodeJS.ErrnoException) => void;

export function writeBytes({
  fd,
  sharedBuffer,
  start = 0,
  end = sharedBuffer.length,
  position = 0,
  resolve,
  reject = console.error,
}: {
  fd: number;
  sharedBuffer: Buffer;
  start?: number;
  end?: number;
  position?: number;
  resolve: WriteBytesResolve;
  reject?: WriteBytesReject;
}) {
  write(fd, sharedBuffer, start, end, position, (err, bytesWriten, buffer) => {
    if (err) {
      return reject(err);
    }
    return resolve({ bytesWriten, buffer });
  });
}

export const createWriteBytesSource = ({
  text,
  filePath,
  bufferSize = defaultBufferSize,
}: {
  text: string;
  filePath: string;
  bufferSize?: number;
}) => {
  const sharedBuffer = Buffer.alloc(bufferSize);
  const fd = openSync(filePath, 'w');
  const totalLength = text.length;
  let position = 0;
  let bytesToWrite = Math.min(bufferSize, totalLength);

  const createWriteBytesSource = make<Buffer>(({ next, complete }) => {
    let cancelled = false;

    const reject: WriteBytesReject = (err) => {
      console.error(err);
      complete();
    };

    const resolve: WriteBytesResolve = ({ buffer, bytesWriten }) => {
      if (!cancelled) {
        next(buffer.slice(0, bytesWriten));
        position += bytesWriten;
        bytesToWrite = Math.min(bufferSize, totalLength - position);
        if (bytesToWrite > 0) {
          sharedBuffer.fill(
            text.substring(position, position + bytesToWrite),
            0,
            bytesToWrite,
            'utf-8'
          );
          return writeBytes({
            fd,
            sharedBuffer,
            end: bytesToWrite,
            position,
            resolve,
            reject,
          });
        }
        return complete();
      }
    };

    writeBytes({
      fd,
      sharedBuffer,
      end: bytesToWrite,
      position,
      resolve,
      reject,
    });

    return () => {
      cancelled = true;
    };
  });

  return createWriteBytesSource;
};

export const writeWholeFile = ({
  text,
  filePath,
  bufferSize = defaultBufferSize,
}: {
  text: string;
  filePath: string;
  bufferSize?: number;
}) =>
  pipe(
    createWriteBytesSource({ text, filePath, bufferSize }),
    takeLast(1),
    toPromise
  );
