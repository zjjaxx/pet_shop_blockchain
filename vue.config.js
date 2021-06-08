const webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV == "production"
let _plugins = []
let externals = {}
let cdn = {
  js: []
}
if (isProd) {
  externals = {
    web3: "web3"
  }
  cdn = {
    js: ["https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"]
  }
  _plugins = [
    // new BundleAnalyzerPlugin({
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   openAnalyzer: false,
    // }),//打包分析
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,// 匹配文件名
      threshold: 10240, // 对超过10k的数据压缩
      deleteOriginalAssets: false, // 不删除源文件
      minRatio: 0.8 // 压缩比
    })
  ]
}

module.exports = {
  productionSourceMap: isProd ? false : true,
  configureWebpack: {
    externals: externals,
    plugins: _plugins
  },
  // 将cdn的资源挂载到插件上
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '<url>',
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }
}