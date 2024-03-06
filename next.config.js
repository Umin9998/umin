/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  // https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs-hybrid#configure-your-nextjs-app-for-deployment-to-static-web-apps
  output: "standalone",
  reactStrictMode: false,
  compiler: {
    // https://nextjs.org/docs/architecture/nextjs-compiler#styled-components
    // https://github.com/styled-components/styled-components/issues/3634
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["microexstorymakerapi.azurewebsites.net", "konvajs.org"],
  },

  // experimental: {
  //   // https://github.com/konvajs/konva/issues/1458#issuecomment-1543977999
  //   // esmExternals: 'loose' would indicate this package might need some changes to support Node.js ESM (e.g. import() / require() would also not work correctly.
  //   esmExternals: 'loose' // required to make Konva & react-konva work
  // },
  // https://github.com/vercel/next.js/tree/canary/examples/with-react-native-web
  // https://github.com/vercel/next.js/blob/canary/examples/with-react-native-web/next.config.js
  // https://nextjs.org/docs/app/api-reference/next-config-js/webpack
  // https://necolas.github.io/react-native-web/docs/setup/#bundler
  webpack: (config, options) => {
    const webpack = require("webpack");

    console.log(options.webpack.version);

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    // https://nextjs.org/docs/app/api-reference/next-config-js/webpack
    // Existing rule for react-native alias
    config.module.rules.push({
      resolve: {
        alias: {
          "react-native$": "react-native-web",
        },
      },
    });

    // https://github.com/konvajs/react-konva#usage-with-nextjs
    // https://github.com/konvajs/konva/issues/1458#issuecomment-1356122802
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work with Next.js

    // Failed to compile. ./node_modules/canvas/build/Release/canvas.node Module parse failed: Unexpected character '�' (1:2) You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
    // npm install node-loader --save-dev
    // New rule for .node files
    // config.module.rules.push({
    //   test: /\.node$/,
    //   use: 'node-loader'
    // });

    // Important: return the modified config
    return config;
  },

  //tossPaments
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/checkout",
      },
    ];
  },
};

module.exports = nextConfig;
