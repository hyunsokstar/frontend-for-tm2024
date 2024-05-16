// const nextConfig = {}

// module.exports = {
//     reactStrictMode: true,
//     env: {
//         PORTONE_SHOP_ID: process.env.PORTONE_SHOP_ID,
//     },
// };
// export default nextConfig;

module.exports = {
    reactStrictMode: false,
    cacheBust: true,
    env: {
        PORTONE_SHOP_ID: process.env.PORTONE_SHOP_ID,
        PORTONE_API_KEY: process.env.PORTONE_API_KEY,
        PORTONE_API_SECRET: process.env.PORTONE_API_SECRET, // Add other necessary variables
    },
};

