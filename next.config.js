const json = require('./package.json');

const projectName = json.name;

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  const nextConfig = {
    env: {
      NEXT_PHASE: phase,
    },
    reactStrictMode: true,
    swcMinify: isProduction,
    basePath: isProduction ? `/${projectName}` : '',
    images: {
      domains: ['github.io'],
    },
  };

  if (!isProduction) {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: process.env.ANALYZE === 'true',
    });
    return withBundleAnalyzer(nextConfig);
  }
  return nextConfig;
};
