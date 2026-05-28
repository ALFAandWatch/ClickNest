import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactStrictMode: true, // Enables React strict mode
   images: {
      domains: [
         'www.pngplay.com',
         'www.asus.com',
         'p2-ofp.static.pub',
         'products.shureweb.eu',
         'bryanpfeiffer.com',
         'www.hp.com',
         'www.lg.com',
         'encrypted-tbn0.gstatic.com',
         'www.insight.com',
      ],
   },
};

export default nextConfig;
