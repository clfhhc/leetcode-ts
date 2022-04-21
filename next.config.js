const json = require('./package.json');
// require('@swc/register');
// const { findLocalLeetcodeFiles } = require('./lib/leetcode/getLeetcodeFiles');

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
  exportPathMap: (defaultPathMap, { dir }) => {
    const pathMap = {
      '/': { page: '/' },
      // '/leetcode/*': { page: '/leetcode/[...slug]' },
    };

    return pathMap;
  },
};

module.exports = nextConfig;
