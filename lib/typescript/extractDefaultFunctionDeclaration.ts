import * as ts from 'typescript';

function extractDefaultFunctionDeclaration(file: string): string {
  try {
    // Create a Program to represent the project, then pull out the
    // source file to parse its AST.
    const program = ts.createProgram([file], {});
    const sourceFile = program.getSourceFile(file);

    if (!sourceFile) {
      throw new Error('no source file detected');
    }
    // To print the AST, we'll use TypeScript's printer
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const checker = program.getTypeChecker();
    const fileSymbol = checker.getSymbolAtLocation(sourceFile);
    const defaultSymbol = fileSymbol?.exports?.get('default' as ts.__String);
    if (!defaultSymbol) {
      throw new Error('no default export detected');
    }

    const functionSymbol = checker.getAliasedSymbol(defaultSymbol);

    if (!functionSymbol || !functionSymbol.valueDeclaration) {
      throw new Error('no default function detected');
    }

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

export default extractDefaultFunctionDeclaration;
