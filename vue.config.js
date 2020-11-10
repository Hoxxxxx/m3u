module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    open: true,
    // port:'80',
    // proxy: {
    //   '/baseApi': {
    //     target: 'http://luxy.hr.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/baseApi': ''
    //     }
    //   }
    // }
  },
  css: {
    extract: false
  },
  configureWebpack: {
    //警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
}