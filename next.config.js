// /** @type {import('next').NextConfig} */
// const nextConfig = {};


// export default nextConfig;

require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    env: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY
    },
    ...nextConfig
};
