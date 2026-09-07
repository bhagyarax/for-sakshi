/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isGithubActions ? '/for-sakshi' : '',
  assetPrefix: isGithubActions ? '/for-sakshi/' : '',
};

export default nextConfig;
