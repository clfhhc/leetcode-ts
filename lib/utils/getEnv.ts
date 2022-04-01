export const getIsClient = () => typeof window !== 'undefined';

export const getIsProduction = () =>
  process.env.NEXT_PUBLIC_ENV === 'production';
