// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from 'react';
import { classNames } from '@plasmicapp/react-web';

export type DotSvgrepoCom1SvgIconProps = React.ComponentProps<'svg'> & {
  title?: string;
};

export function DotSvgrepoCom1SvgIcon(props: DotSvgrepoCom1SvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
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

      <circle
        cx={'12'}
        cy={'12'}
        r={'4'}
        fill={'currentColor'}
        fillRule={'evenodd'}
      ></circle>
    </svg>
  );
}

export default DotSvgrepoCom1SvgIcon;
/* prettier-ignore-end */
