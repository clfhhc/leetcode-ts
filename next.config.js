const json = require('./package.json');

const projectName = json.name;

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isProduction ? `/${projectName}` : '',
};

module.exports = nextConfig;
