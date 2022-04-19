// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 7WsMcki2ZLTk8QRowXDdYK
// Component: 3b_qeIJoA0
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

import { useScreenVariants as useScreenVariantsqNtJgJXrY5Orn } from './PlasmicGlobalVariant__Screen'; // plasmic-import: qNtJgJXrY5orn/globalVariant

import '@plasmicapp/react-web/lib/plasmic.css';

import projectcss from '../my_project/plasmic_my_project.module.css'; // plasmic-import: 7WsMcki2ZLTk8QRowXDdYK/projectcss
import sty from './PlasmicTable.module.css'; // plasmic-import: 3b_qeIJoA0/css

export type PlasmicTable__VariantMembers = {};

export type PlasmicTable__VariantsArgs = {};
type VariantPropType = keyof PlasmicTable__VariantsArgs;
export const PlasmicTable__VariantProps = new Array<VariantPropType>();

export type PlasmicTable__ArgsType = {};
type ArgPropType = keyof PlasmicTable__ArgsType;
export const PlasmicTable__ArgProps = new Array<ArgPropType>();

export type PlasmicTable__OverridesType = {
  root?: p.Flex<'div'>;
  leetcodeLogo?: p.Flex<typeof p.PlasmicImg>;
  title?: p.Flex<typeof Title>;
  text?: p.Flex<'div'>;
  typescriptLogo?: p.Flex<typeof p.PlasmicImg>;
};

export interface DefaultTableProps {}

function PlasmicTable__RenderFunc(props: {
  variants: PlasmicTable__VariantsArgs;
  args: PlasmicTable__ArgsType;
  overrides: PlasmicTable__OverridesType;

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
        <title key="title">{'Leetcode + Typescript'}</title>
        <meta
          key="og:title"
          property="og:title"
          content={'Leetcode + Typescript'}
        />
        <meta
          key="description"
          property="og:description"
          name="description"
          content={'Showcasing Typescript solutions to Leetcode problems'}
        />
        <meta
          key="og:image"
          property="og:image"
          content={
            'https://site-assets.plasmic.app/39ab613343d68887cf7c5b89df0bfcec.png'
          }
        />
      </Head>

      <style>{`
        body {
          margin: 0;
        }
      `}</style>

      <div className={projectcss.plasmic_page_wrapper}>
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
          <div className={classNames(projectcss.all, sty.freeBox___7Q0H3)}>
            {true ? (
              <p.Stack
                as={'div'}
                hasGap={true}
                className={classNames(projectcss.all, sty.freeBox___9XOn)}
              >
                <p.PlasmicImg
                  data-plasmic-name={'leetcodeLogo'}
                  data-plasmic-override={overrides.leetcodeLogo}
                  alt={'Leetcode Logo' as const}
                  className={classNames(sty.leetcodeLogo)}
                  displayHeight={'auto' as const}
                  displayMaxHeight={
                    '100px /* plasmic-token: JkGO6QUDB */' as const
                  }
                  displayMaxWidth={'300px' as const}
                  displayMinHeight={'0' as const}
                  displayMinWidth={'0' as const}
                  displayWidth={'auto' as const}
                  loading={'lazy' as const}
                  src={{
                    src: '/plasmic/leetcode_ts/images/leetcodeLogo.png',
                    fullWidth: 1360,
                    fullHeight: 512,
                    aspectRatio: undefined,
                  }}
                />

                {(
                  hasVariant(globalVariants, 'screen', 'mobileOnly')
                    ? true
                    : true
                ) ? (
                  <Title
                    data-plasmic-name={'title'}
                    data-plasmic-override={overrides.title}
                    className={classNames('__wab_instance', sty.title)}
                    italic={'isItalic' as const}
                    title={
                      <div
                        data-plasmic-name={'text'}
                        data-plasmic-override={overrides.text}
                        className={classNames(
                          projectcss.all,
                          projectcss.__wab_text,
                          sty.text
                        )}
                      >
                        {'&&'}
                      </div>
                    }
                  />
                ) : null}

                <p.PlasmicImg
                  data-plasmic-name={'typescriptLogo'}
                  data-plasmic-override={overrides.typescriptLogo}
                  alt={'Typescript Logo' as const}
                  className={classNames(sty.typescriptLogo)}
                  displayHeight={'auto' as const}
                  displayMaxHeight={'none' as const}
                  displayMaxWidth={'300px' as const}
                  displayMinHeight={'0' as const}
                  displayMinWidth={'0' as const}
                  displayWidth={'auto' as const}
                  loading={'lazy' as const}
                  src={{
                    src: '/plasmic/leetcode_ts/images/typescriptLogo.png',
                    fullWidth: 640,
                    fullHeight: 193,
                    aspectRatio: undefined,
                  }}
                />
              </p.Stack>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ['root', 'leetcodeLogo', 'title', 'text', 'typescriptLogo'],
  leetcodeLogo: ['leetcodeLogo'],
  title: ['title', 'text'],
  text: ['text'],
  typescriptLogo: ['typescriptLogo'],
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: 'div';
  leetcodeLogo: typeof p.PlasmicImg;
  title: typeof Title;
  text: 'div';
  typescriptLogo: typeof p.PlasmicImg;
};

type ReservedPropsType = 'variants' | 'args' | 'overrides';
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicTable__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicTable__VariantsArgs;
    args?: PlasmicTable__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicTable__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicTable__ArgsType, ReservedPropsType> &
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
      internalArgPropNames: PlasmicTable__ArgProps,
      internalVariantPropNames: PlasmicTable__VariantProps,
    });

    return PlasmicTable__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName,
    });
  };
  if (nodeName === 'root') {
    func.displayName = 'PlasmicTable';
  } else {
    func.displayName = `PlasmicTable.${nodeName}`;
  }
  return func;
}

export const PlasmicTable = Object.assign(
  // Top-level PlasmicTable renders the root element
  makeNodeComponent('root'),
  {
    // Helper components rendering sub-elements
    leetcodeLogo: makeNodeComponent('leetcodeLogo'),
    title: makeNodeComponent('title'),
    text: makeNodeComponent('text'),
    typescriptLogo: makeNodeComponent('typescriptLogo'),

    // Metadata about props expected for PlasmicTable
    internalVariantProps: PlasmicTable__VariantProps,
    internalArgProps: PlasmicTable__ArgProps,
  }
);

export default PlasmicTable;
/* prettier-ignore-end */
