import { forwardRef, ReactElement } from 'react';
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
  className?: string;
}

const Wrapped = forwardRef<HTMLDivElement, Props>(function TypescriptCode(
  {
    children,
    wrapLines = true,
    wrapLongLines = false,
    showLineNumbers = true,
    className,
    ...props
  },
  ref
) {
  return (
    <div className={className} ref={ref}>
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
    </div>
  );
});

export default Wrapped;
