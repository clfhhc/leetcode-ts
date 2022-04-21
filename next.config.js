const json = require('./package.json');

const projectName = json.name;

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: isProduction,
  basePath: isProduction ? `/${projectName}` : '',
  images: {
    domains: ['github.io'],
  },
};

if (isProduction) {
  module.exports = nextConfig;
} else {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  module.exports = withBundleAnalyzer(nextConfig);
}
