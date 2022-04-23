import { PHASE_EXPORT, PHASE_PRODUCTION_BUILD } from 'next/constants';

export const getIsClient = () => typeof window !== 'undefined';

export const getIsProduction = () =>
  process.env.NEXT_PUBLIC_ENV === 'production';

export const getIsBuildOrExport = () =>
  process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD ||
  process.env.NEXT_PHASE === PHASE_EXPORT;
