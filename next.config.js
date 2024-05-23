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
    // cacheBust: true,
    env: {
        PORTONE_SHOP_ID: process.env.PORTONE_SHOP_ID,
        PORTONE_API_KEY: process.env.PORTONE_API_KEY,
        PORTONE_API_SECRET: process.env.PORTONE_API_SECRET, // Add other necessary variables
    },

    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000, // 파일 변경 감지 주기 (밀리초)
            aggregateTimeout: 300, // 여러 변경 사항을 기다리는 시간 (밀리초)
        };

        return config;
    },

};

