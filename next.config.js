/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,  // Enable strict mode for better development experience

  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],  // Ensure Next.js recognizes TypeScript and JSX files

  typescript: {
    ignoreBuildErrors: true,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add src directory alias for easier imports
    config.resolve.alias['@'] = `${__dirname}/src`;
    config.resolve.alias['@interview-types'] = `${__dirname}/src/app/products/interview-questions/types.ts`;
    config.resolve.alias['@components'] = `${__dirname}/src/app/components`;
    config.resolve.alias['@public'] = `${__dirname}/public`;
    config.resolve.alias['@styles'] = `${__dirname}/src/styles`;
    config.resolve.alias['@utils'] = `${__dirname}/src/utils`;
    config.resolve.alias['@data'] = `${__dirname}/src/data`;
    config.resolve.alias['@hooks'] = `${__dirname}/src/hooks`;
    config.resolve.alias['@lib'] = `${__dirname}/src/lib`;
    config.resolve.alias['@models'] = `${__dirname}/src/models`;
    config.resolve.alias['@services'] = `${__dirname}/src/services`;

    // Handle client-side modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        encoding: false,
        fs: false,
        path: false,
        stream: false,
        util: false,
      };
    }

    // Handle PDF.js requirements
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Add transpilation rule for cheerio
    config.module.rules.push({
      test: /node_modules\/cheerio.*\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties']
      }
    });

    return config;
  },

  // Setup redirects
  async redirects() {
    return [
      {
        source: '/old-route',   // Old URL
        destination: '/new-route',  // New URL
        permanent: true,  // Permanent redirect
      },
      {
        source: '/another-old-route',   // Old URL
        destination: '/another-new-route',  // New URL
        permanent: true,  // Permanent redirect
      },
      {
        source: '/old-route',   // Old URL
        destination: '/new-route',  // New URL
        permanent: true,  // Permanent redirect
      },
    ];
  },

  // Add new turbopack config at the root
  turbopack: {
    rules: {
      '*.mdx': ['mdx-loader']
    },
  },


  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,  // Ensure ESLint warnings don't block the build
  },

  // Image domains (migrated to remotePatterns)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.gravatar.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'media.licdn.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'img.icons8.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cdn.dribbble.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'cdn.hashnode.com' },
      { protocol: 'https', hostname: 'cdn.buymeacoffee.com' },
    ],
  },


  // Environment variables
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    STRIPE_URL_ENDPOINT: process.env.STRIPE_URL_ENDPOINT,
    GA_ID: process.env.GA_ID,
    MC_ID: process.env.MC_ID,
  },
};
