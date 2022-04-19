// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from 'react';
import { classNames } from '@plasmicapp/react-web';

export type Icon3IconProps = React.ComponentProps<'svg'> & {
  title?: string;
};

export function Icon3Icon(props: Icon3IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      fill={'none'}
      viewBox={'0 0 24 25'}
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
        fillRule={'evenodd'}
        clipRule={'evenodd'}
        d={
          'M22.907 4.22a.898.898 0 01.383.018c.505.136.808.704.681 1.245l-2.299 9.643c-.126.434-.505.759-.934.759H8.31l.556 2.41h10.356c.531 0 .96.46.96 1.03 0 .57-.429 1.03-.96 1.03H8.134c-.455 0-.834-.326-.935-.786L3.31 2.56H.96C.43 2.56 0 2.1 0 1.53 0 .96.43.5.96.5h3.082c.454 0 .833.325.934.785l2.88 12.542H20.03l1.747-7.377H13.9a1.118 1.118 0 010-2.235h8.9c.036 0 .071.002.106.005zM9.927 24.5c.851 0 1.54-.74 1.54-1.653 0-.912-.689-1.653-1.54-1.653-.851 0-1.54.741-1.54 1.653s.689 1.653 1.54 1.653zm9.497-1.653c0 .912-.69 1.653-1.54 1.653-.852 0-1.541-.74-1.541-1.653 0-.912.69-1.653 1.541-1.653.85 0 1.54.741 1.54 1.653z'
        }
        fill={'currentColor'}
      ></path>
    </svg>
  );
}

export default Icon3Icon;
/* prettier-ignore-end */
