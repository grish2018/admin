module.exports = {
  // pluginOptions: {
  //   svgSprite: {
  //     dir: "src/assets/icons",
  //     test: /\.(svg)(\?.*)?$/,
  //     loaderOptions: {
  //       extract: true,
  //       spriteFilename: "img/icons.[hash:8].svg"
  //     }
  //   }
  // },
  lintOnSave: true,
  devServer: {
    proxy: "https://global.shop/api/",
    open: true,
    watchOptions: {
      poll: true
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@use "~@/assets/scss/_variables" as *;'
      }
    }
  }
  // chainWebpack: config => {
  //   const svgRule = config.module.rule("svg");

  //   svgRule.uses.clear();

  //   svgRule.use("svg-sprite-loader").loader("svg-sprite-loader");
  // }
};
