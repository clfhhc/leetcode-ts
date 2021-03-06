// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 7WsMcki2ZLTk8QRowXDdYK
// Component: Ix9vuo16AZ
import * as React from 'react';

import Head from 'next/head';
import Link, { LinkProps } from 'next/link';

import * as p from '@plasmicapp/react-web';
import * as ph from '@plasmicapp/host';

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants,
} from '@plasmicapp/react-web';

import '@plasmicapp/react-web/lib/plasmic.css';

import projectcss from '../my_project/plasmic_my_project.module.css'; // plasmic-import: 7WsMcki2ZLTk8QRowXDdYK/projectcss
import sty from './PlasmicTitle.module.css'; // plasmic-import: Ix9vuo16AZ/css

export type PlasmicTitle__VariantMembers = {
  italic: 'isItalic';
};

export type PlasmicTitle__VariantsArgs = {
  italic?: SingleChoiceArg<'isItalic'>;
};

type VariantPropType = keyof PlasmicTitle__VariantsArgs;
export const PlasmicTitle__VariantProps = new Array<VariantPropType>('italic');

export type PlasmicTitle__ArgsType = {
  title?: React.ReactNode;
};

type ArgPropType = keyof PlasmicTitle__ArgsType;
export const PlasmicTitle__ArgProps = new Array<ArgPropType>('title');

export type PlasmicTitle__OverridesType = {
  root?: p.Flex<'div'>;
  title?: p.Flex<'div'>;
};

export interface DefaultTitleProps {
  title?: React.ReactNode;
  italic?: SingleChoiceArg<'isItalic'>;
  className?: string;
}

function PlasmicTitle__RenderFunc(props: {
  variants: PlasmicTitle__VariantsArgs;
  args: PlasmicTitle__ArgsType;
  overrides: PlasmicTitle__OverridesType;

  forNode?: string;
}) {
  const { variants, args, overrides, forNode } = props;
  const $props = props.args;

  return (
    <div
      data-plasmic-name={'root'}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        sty.root
      )}
    >
      <div
        data-plasmic-name={'title'}
        data-plasmic-override={overrides.title}
        className={classNames(projectcss.all, sty.title, {
          [sty.titleitalic_isItalic]: hasVariant(
            variants,
            'italic',
            'isItalic'
          ),
        })}
      >
        {p.renderPlasmicSlot({
          defaultContents: '',
          value: args.title,
          className: classNames(sty.slotTargetTitle, {
            [sty.slotTargetTitleitalic_isItalic]: hasVariant(
              variants,
              'italic',
              'isItalic'
            ),
          }),
        })}
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root', 'title'],
  title: ['title'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: 'div';
  title: 'div';
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicTitle__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicTitle__VariantsArgs;
    args?: PlasmicTitle__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicTitle__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicTitle__ArgsType, ReservedPropsType> &
    // Specify overrides for each element directly as props
    Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    // Specify props for the root element
    Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicTitle__ArgProps,
      internalVariantPropNames: PlasmicTitle__VariantProps,
    });

    return PlasmicTitle__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicTitle';
  } else {
    func.displayName = `PlasmicTitle.${nodeName}`;
  }
  return func;
}

export const PlasmicTitle = Object.assign(
  // Top-level PlasmicTitle renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    title: makeNodeComponent('title'),

    // Metadata about props expected for PlasmicTitle
    internalVariantProps: PlasmicTitle__VariantProps,
    internalArgProps: PlasmicTitle__ArgProps,
  }
);

export default PlasmicTitle;
/* prettier-ignore-end */
