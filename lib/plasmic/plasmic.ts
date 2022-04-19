import { initPlasmicLoader } from '@plasmicapp/loader-nextjs';
import TypescriptCode from 'components/code/TypescriptCode';
import { getIsProduction } from 'lib/utils/getEnv';

export const Plasmic = initPlasmicLoader({
  projects: [
    {
      id: process.env.PLASMIC_ID || '',
      token: process.env.PLASMIC_TOKEN || '',
    },
  ],
  preview: !getIsProduction(),
});

Plasmic.registerComponent(TypescriptCode, {
  name: 'TypescriptCode',
  props: {
    children: {
      type: 'slot',
      defaultValue:
        'const funcA = (num1: number, num2: number) => num1 + num2;',
    },
    showLineNumbers: 'boolean',
    wrapLongLines: 'boolean',
    className: 'string',
  },
});
