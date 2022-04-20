// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from 'react';
import { classNames } from '@plasmicapp/react-web';

export type ButtonArrowIconProps = React.ComponentProps<'svg'> & {
  title?: string;
};

export function ButtonArrowIcon(props: ButtonArrowIconProps) {
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
          'M13.47 8.53a.75.75 0 011.06-1.06l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 11-1.06-1.06l2.72-2.72H6.5a.75.75 0 010-1.5h9.69l-2.72-2.72z'
        }
        fill={'currentColor'}
      ></path>
    </svg>
  );
}

export default ButtonArrowIcon;
/* prettier-ignore-end */
