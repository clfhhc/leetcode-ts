export type TestCase<I, O> = [I, O];

export type TestCases<I, O> = TestCase<I, O>[];

export interface FunctionTestCase<
  F extends (...args: any) => any = (...args: any) => any
> extends TestCase<Parameters<F>, ReturnType<F>> {}

export type FunctionTestCases<
  F extends (...args: any) => any = (...args: any) => any
> = FunctionTestCase<F>[];
