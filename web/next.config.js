/** @type {import('next').NextConfig} */

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack']
        });
        // Important: return the modified config
        return config;
    },
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/landing',
                permanent: true
            },
            {
                source: '/app',
                destination: '/app/dashboard',
                permanent: true
            }
        ];
    }
};
