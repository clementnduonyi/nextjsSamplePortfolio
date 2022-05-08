/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
 
  env: {
    AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
    BASE_URL: process.env.BASE_URL
  }
}

module.exports = nextConfig
