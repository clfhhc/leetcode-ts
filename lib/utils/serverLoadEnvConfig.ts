import { loadEnvConfig } from '@next/env';
import { getIsProduction } from 'lib/utils/getEnv';

const dev = !getIsProduction();
loadEnvConfig(process.cwd(), dev);
