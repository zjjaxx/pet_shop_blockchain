const webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin')
const isProd=process.env.NODE_ENV== "production"
let _plugins = []
if (isProd) {
  _plugins = [
    // new BundleAnalyzerPlugin({
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   openAnalyzer: false,
    // }),//打包分析
    new webpack.ProvidePlugin({
      TruffleContract: "@truffle/contract"
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/,// 匹配文件名
      threshold: 10240, // 对超过10k的数据压缩
      deleteOriginalAssets: false, // 不删除源文件
      minRatio: 0.8 // 压缩比
    })
  ]
}
else {
  _plugins = [
    new webpack.ProvidePlugin({
      TruffleContract: "@truffle/contract"
    }),
  ]
}
module.exports = {
  productionSourceMap: isProd?false:true,
  configureWebpack: {
    plugins:_plugins
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