const webpack =require("webpack")
var contract = require("@truffle/contract");
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                TruffleContract:"@truffle/contract"
              })
        ]
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