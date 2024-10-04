/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Allow serving images from the `public` folder
        unoptimized: false, // This is the default
        domains: [], // No external domains, so this can remain empty
    },
};

export default nextConfig;
