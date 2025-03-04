// const { defineConfig } = require('@vue/cli-service')
// // 引入插件
// const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
// module.exports = defineConfig({
//   transpileDependencies:true,
//   configureWebpack: {
//     plugins:[
//       new NodePolyfillWebpackPlugin()
//     ],
//   },
// })

const webpack = require("webpack");
const { defineConfig } = require("@vue/cli-service");
const NodePolyfillWebpackPlugin = require("node-polyfill-webpack-plugin");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new NodePolyfillWebpackPlugin(),
      ComponentsPlugin({ resolvers: [VantResolver()] }),
    ],
    resolve: {
      fallback: {
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
      },
    },
  },
});
