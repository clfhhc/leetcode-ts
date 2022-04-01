import * as ts from 'typescript';

export function extractDefaultFunctionDeclaration(file: string): string {
  try {
    // Create a Program to represent the project
    const program = ts.createProgram([file], {});

    // pull out the source file to parse its AST.
    const sourceFile = program.getSourceFile(file);
    if (!sourceFile) {
      throw new Error('no source file detected');
    }

    // create a type checker
    const checker = program.getTypeChecker();

    // find the default symbol
    const fileSymbol = checker.getSymbolAtLocation(sourceFile);
    const defaultSymbol = fileSymbol?.exports?.get('default' as ts.__String);
    if (!defaultSymbol) {
      throw new Error('no default export detected');
    }

    // find the default alias function symbol
    const functionSymbol = checker.getAliasedSymbol(defaultSymbol);

    if (!functionSymbol || !functionSymbol.valueDeclaration) {
      throw new Error('no default function detected');
    }

    // To print the AST, we'll use TypeScript's printer
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    // output the function declaration
    return printer.printNode(
      ts.EmitHint.Unspecified,
      functionSymbol.valueDeclaration,
      sourceFile
    );
  } catch (err) {
    console.error(err);
    return '';
  }
}
