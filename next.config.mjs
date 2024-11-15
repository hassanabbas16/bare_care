/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['allurebeauty.pk', 'www.heygirl.pk', 'www.vegas.pk', 'www.theskinfit.com', "imagedelivery.net", "skinstorepakistan.com"],
        disableStaticImages: true,
    },
    webpack: (config) => {
        config.module.rules.push(
            {
                test: /\.(png|jpe?g|gif|webp|avif|ico)$/,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        );

        return config;
    },
};

export default nextConfig;
