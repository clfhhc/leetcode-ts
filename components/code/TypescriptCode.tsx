import { FC, ReactElement } from 'react';
import {
  PrismAsyncLight as SyntaxHighligher,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

SyntaxHighligher.registerLanguage('ts', typescript);

interface Props extends Omit<SyntaxHighlighterProps, 'style' | 'language'> {
  lineNumberContainerStyle?: any;
  wrapLines?: boolean | undefined;
  wrapLongLines?: boolean | undefined;
  renderer?: any;
  PreTag?: ReactElement | HTMLElement | undefined;
  CodeTag?: ReactElement | HTMLElement | undefined;
}

const TypescriptCode: FC<Props> = ({
  children,
  wrapLines = true,
  wrapLongLines = false,
  showLineNumbers = true,
  ...props
}) => (
  <SyntaxHighligher
    style={atomDark}
    language="ts"
    wrapLines={wrapLines}
    wrapLongLines={wrapLongLines}
    showLineNumbers={showLineNumbers}
    {...props}
  >
    {children}
  </SyntaxHighligher>
);

export default TypescriptCode;
