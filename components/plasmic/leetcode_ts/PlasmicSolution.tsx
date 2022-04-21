// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 7WsMcki2ZLTk8QRowXDdYK
// Component: gSDoiytAgu
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
import Title from '../../Title'; // plasmic-import: Ix9vuo16AZ/component
import DifficultyLabel from '../../DifficultyLabel'; // plasmic-import: RLfjfL5lSL/component

import { useScreenVariants as useScreenVariantsqNtJgJXrY5Orn } from './PlasmicGlobalVariant__Screen'; // plasmic-import: qNtJgJXrY5orn/globalVariant

import '@plasmicapp/react-web/lib/plasmic.css';

import projectcss from '../my_project/plasmic_my_project.module.css'; // plasmic-import: 7WsMcki2ZLTk8QRowXDdYK/projectcss
import sty from './PlasmicSolution.module.css'; // plasmic-import: gSDoiytAgu/css

export type PlasmicSolution__VariantMembers = {};

export type PlasmicSolution__VariantsArgs = {};
type VariantPropType = keyof PlasmicSolution__VariantsArgs;
export const PlasmicSolution__VariantProps = new Array<VariantPropType>();

export type PlasmicSolution__ArgsType = {
  question?: React.ReactNode;
  solution?: React.ReactNode;
  titleText?: React.ReactNode;
  difficultyLabel?: React.ReactNode;
};

type ArgPropType = keyof PlasmicSolution__ArgsType;
export const PlasmicSolution__ArgProps = new Array<ArgPropType>(
  'question',
  'solution',
  'titleText',
  'difficultyLabel'
);

export type PlasmicSolution__OverridesType = {
  root?: p.Flex<'div'>;
  title?: p.Flex<typeof Title>;
};

export interface DefaultSolutionProps {}

function PlasmicSolution__RenderFunc(props: {
  variants: PlasmicSolution__VariantsArgs;
  args: PlasmicSolution__ArgsType;
  overrides: PlasmicSolution__OverridesType;

  forNode?: string;
}) {
  const { variants, args, overrides, forNode } = props;
  const $props = props.args;

  const globalVariants = ensureGlobalVariants({
    screen: useScreenVariantsqNtJgJXrY5Orn(),
  });

  return (
    <React.Fragment>
      <Head>
        <meta name="twitter:card" content="summary" />
        <title key="title">{'Leetcode Solution'}</title>
        <meta
          key="og:title"
          property="og:title"
          content={'Leetcode Solution'}
        />
      </Head>

      <style>{`
        body {
          margin: 0;
        }
      `}</style>

      <div className={projectcss.plasmic_page_wrapper}>
        {true ? (
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
            <div className={classNames(projectcss.all, sty.freeBox__wt9Kr)}>
              <Title
                data-plasmic-name={'title'}
                data-plasmic-override={overrides.title}
                className={classNames('__wab_instance', sty.title)}
                title={p.renderPlasmicSlot({
                  defaultContents: '',
                  value: args.titleText,
                })}
              />

              {p.renderPlasmicSlot({
                defaultContents: (
                  <DifficultyLabel
                    className={classNames(
                      '__wab_instance',
                      sty.difficultyLabel__sDfvN
                    )}
                  />
                ),

                value: args.difficultyLabel,
              })}

              <div className={classNames(projectcss.all, sty.freeBox__xGvnV)}>
                <div className={classNames(projectcss.all, sty.freeBox__tCdW1)}>
                  {p.renderPlasmicSlot({
                    defaultContents: null,
                    value: args.question,
                  })}
                </div>

                <div className={classNames(projectcss.all, sty.freeBox__ppLi1)}>
                  {p.renderPlasmicSlot({
                    defaultContents: null,
                    value: args.solution,
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
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
  title: typeof Title;
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicSolution__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicSolution__VariantsArgs;
    args?: PlasmicSolution__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicSolution__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicSolution__ArgsType, ReservedPropsType> &
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
      internalArgPropNames: PlasmicSolution__ArgProps,
      internalVariantPropNames: PlasmicSolution__VariantProps,
    });

    return PlasmicSolution__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicSolution';
  } else {
    func.displayName = `PlasmicSolution.${nodeName}`;
  }
  return func;
}

export const PlasmicSolution = Object.assign(
  // Top-level PlasmicSolution renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    title: makeNodeComponent('title'),

    // Metadata about props expected for PlasmicSolution
    internalVariantProps: PlasmicSolution__VariantProps,
    internalArgProps: PlasmicSolution__ArgProps,
  }
);

export default PlasmicSolution;
/* prettier-ignore-end */