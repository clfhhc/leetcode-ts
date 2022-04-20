// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from 'react';
import { classNames } from '@plasmicapp/react-web';

export type Icon4IconProps = React.ComponentProps<'svg'> & {
  title?: string;
};

export function Icon4Icon(props: Icon4IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      fill={'none'}
      viewBox={'0 0 24 24'}
      height={'1em'}
      width={'1em'}
      style={{
        fill: 'currentcolor',

        ...(style || {}),
      }}
      className={classNames('plasmic-default__svg', className)}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        d={
          'M23.29 4.943a.96.96 0 00-1.163.688l-2.097 8.33H7.856L4.976 2.167a.95.95 0 00-.934-.739H.96c-.53 0-.96.433-.96.968 0 .536.43.969.96.969h2.35L7.2 19.362a.95.95 0 00.934.739h11.088c.531 0 .96-.433.96-.968a.963.963 0 00-.96-.969H8.866l-.556-2.267h12.428c.43 0 .808-.305.934-.713l2.3-9.07c.126-.51-.177-1.044-.683-1.17zM11.468 22.445c0 .858-.69 1.555-1.54 1.555a1.548 1.548 0 01-1.542-1.555c0-.857.69-1.554 1.542-1.554.85 0 1.54.697 1.54 1.555zm7.956 0c0 .858-.69 1.555-1.54 1.555a1.548 1.548 0 01-1.541-1.555c0-.857.69-1.554 1.541-1.554.85 0 1.54.697 1.54 1.555z'
        }
        fill={'currentColor'}
      ></path>

      <path
        d={
          'M16.697 6.114L14.98 7.847V.968A.963.963 0 0014.02 0c-.53 0-.96.433-.96.968v6.879l-1.718-1.733a.972.972 0 00-.682-.28c-.252 0-.48.101-.681.28-.38.383-.38.994 0 1.35l3.36 3.39c.353.356.984.356 1.339 0l3.36-3.39c.378-.381.378-.992 0-1.35-.355-.382-.96-.382-1.34 0z'
        }
        fill={'currentColor'}
      ></path>
    </svg>
  );
}

export default Icon4Icon;
/* prettier-ignore-end */
