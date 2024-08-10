// /** @type {import('next').NextConfig} */
// const nextConfig = {};


// export default nextConfig;

require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    env: {
        GEMINI_API_KEY: "AIzaSyD-_IVYl5taC_Ir061z-Lf97cIKHXRO-zQ"
    },
    ...nextConfig
};
