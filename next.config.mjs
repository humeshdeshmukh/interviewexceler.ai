/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MC_ID: process.env.MC_ID,
        GA_ID: process.env.GA_ID,
        HOSTING_URL: process.env.HOSTING_URL,
        STRIPE_URL_ENDPOINT: process.env.STRIPE_URL_ENDPOINT
    }
};

export default nextConfig;
