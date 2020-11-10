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
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios'
    }
  }
}