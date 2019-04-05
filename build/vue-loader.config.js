// 自定义一个 loader
// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    // 去除空格
    preserveWhitepace: true,
    // extract-text-webpack-plugin默认不会使用这个依赖把 vue文件内的css内容单独打包，这个可以让 VUE 的css内容也分离出来打包
    // vue认为这种单独打包更有效率，
    // true 是分离打包，false 是不分离，开发的时候不需要分离，所以判断一下
    // 开发的环境不需要，正式环境需要
    extractCSS: !isDev,
    //
    // 使用方法 在 style 上加一个 module  <style lang="stylus" module scoped></style>
    // 在外层标签里 <div :class="$style.minMax(这个在style里是 min-max)"></div>
    cssModules: {
      // @hash:bass64:5   截取5个字符串
      // css 对应的 className 编译成一个根据 文件路径 + 文件名 + 文件内容的 hash 值生成的一个独一无二的名字
      // 在 vue 文件里写的class名字，通过cssModules调用之后，只有在这个文件里才会生成这样一个名字，在别的文件里是无法调用的
      // isDev ? '[path]-[name]-[hash:bass64:5]' : '[hash:bass64:5]' 开发环境用前面那个长的，正式环境用后面那个
      localIdentName: isDev ? '[path]-[name]-[hash:bass64:5]' : '[hash:bass64:5]',
      // 这个配置是将 css 的类名中的短横杠 转化成 js 里的 驼峰方式
      // 它会将类名 转化成 这个文件的路径 - 这个文件的名字 - hash码 的组成形式
      // 相当于 computed: { $style(){return {minMax: ''}}}
      camelCase: true
    }
    // // 热加载 ,默认不需要，vue-loader会根据环境变量自动生成是否需要热加载
    // // hotReload: false

    // 以下不常用
    // // 自定义模块(类似 template)
    // // 不同的文件都可以指定不同的 loader,用于解析对应的文件
    // loaders: {
    //   // 这个loader功能是将docs里的内容输入到组件的options上
    //   // 在组件里 <docs>内容</docs>
    //   // 在app.vue里  console.log(组件名.__docs)(两个下划线)会输出 <docs>内容</docs> 里的内容
    //   'docs':docsLoader
    //   // js: 'coffe-loader',
    //   // html,style:
    // },
    // // 在使用 vue 指定的(比如 babel-loader)解析文件之前，可以先用preLoader里指定的loader 解析代码，然后再用 babel-loader 解析解析过了的文件
    // preLoader: {
    //   // js:
    // },
    // // 在用指定的loader 解析完代码之后再用指定的 loader 解析一遍
    // postLoader: {

    // }
  }
}
