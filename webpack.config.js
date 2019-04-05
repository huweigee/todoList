// 引入path模块 path 是node.js里的基本包，用于处理路径
const path = require('path')

// 引入webpack插件html-webpack-plugin，该插件用于生成html入口文件，为外部资源编译之后添加hash码
const HTMLPlugin = require('html-webpack-plugin')

// 引入webpack，方便下面使用 webpack 本身的插件
const webpack = require('webpack')

const ExtractPlugin = require('extract-text-webpack-plugin')

// 用于判断当前是开发环境还是生产环境
// @process: 这个是node的全局变量，提供当前node.js的信息，控制node的有关进程
// @env:  是用户环境信息
// @process.env: 用于存储package.json中声明的变量名 cross-env NODE_ENV=变量名
// @NODE_ENV： 自定义信息用于表明当前是生产环境还是开发环境，在package.json里通过cross-env声明了。这里通过全局变量 process 来调用
// @development: 开发环境
// @isDev:  为 true 则是开发环境，false 则为生产环境
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // @target: 设置 webpack 编译目标,前端项目是web
  target: 'web',
  // 输入 path.join(__dirname, 'client/index.js') 这个文件，webpack会将这个文件以及这个文件所拥有的img/css等打包成一个文件filename放到 dist 里面
  // @entry：入口配置 使用绝对路径  index.js是入口文件
  // @__dirname: 表示当前文件所在的地址(根目录)
  // @path.join(): 将路径以特定的分隔符(\)连接成路径(把当前路径加上想要访问的路径拼成绝对路径)
  // @'client/index.js'：想要访问的文件地址
  entry: path.join(__dirname, 'client/index.js'),
  // @output: 出口配置，将文件输出
  // @filename：想要的输出的文件名
  // @path: 输入路径
  output: {
    // filename: 'bundle.js',
    filename: 'bundle.[hash:8].js',
    // 在当前路径下创建一个文件夹 这里创建的是 dist
    path: path.join(__dirname, 'dist')
  },
  // @module: 模块
  // @rules: 规则,指明什么文件用什么方法解析，类型是数组
  // @test：指明文件类型，是正则表达式 vue$表示以vue结尾的文件
  // @loader：指明处理该文件的程序
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // @use:  接收数组
      // @css-loader: 只是处理 css 文件
      // @style-loader: 将css 文件写进 html
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      // @stylus：css预处理文件
      // @postcss-loader: 处理私有前缀
      // @sourceMap: 压缩源码，定位错误信息
      {
        test: /\.styl$/,
        use: [
          // 将 css 文件转换成 js代码写进 html 里
          'style-loader',
          // 处理css代码文件，处理完成交给style-loader
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          // 处理 styl 文件，处理完成变成css代码
          'stylus-loader'
        ]
      },
      // @options: 对象声明，里面可以写很多选项
      // @limit: 限制，用于判断文件的大小，如果文件小于给的number值，文件将会以base64代码的方式写进代码里
      // @name: 输入文件的名字
      // @ext: 文件的后缀名
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  // @plugins：插件，数组形式，用于接收 webpack的插件调用
  // @new webpack.DefinePlugin： webpack 本身的插件，用于设置环境/切换环境
  // @process.env：存储环境变量
  // process.evn.NODE_ENV = isDev ? '"development"' : '"production"'
  // @'"development"': 里面的双引号一定要加
  // @new HTMLPlugin()： 调用 html-webpack-plugin 插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // 判断当前 NODE_ENV 是什么环境，
        // 当 isDev 为 true 时 NODE_ENV 是 development
        // 当 isDev 为 false 时 NODE_ENV 是 production
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  // @devtool: 该配置用于在页面上调试代码，定位错误代码位置
  // @#cheap-module-eval-source-map：官方推荐配置
  // @source-map：完整映射代码效率低文件大，
  // @eval：代码看起来比较乱
  config.devtool = '#cheap-module-eval-source-map'
  // @devServer: 是对象,webpack-dev-server启动之后是一个服务
  // @port: 监听端口
  // @host: localhost
  // @overlay: 是对象，显示 webpack 编译时的错误到网页上用于定位错误
  // @error： overlay 的属性，为true 则监听 webpack的错误并显示
  // 以上是基础配置
  // @hot: 热加载
  // @open：判断在启动webpack-dev-server时要不要打开浏览器
  // @historyFallback: 将webpack-dev-server没有映射的地址映射到入口index.js上
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      error: true
    },
    hot: true
    // open: true,
    // historyFallback: {
    // }
  }
  // 添加插件到 插件(plugins)里
  // @webpack.HotModuleReplacementPlugin: 启动热加载的插件
  // @webpack.NoEmitOnErrorsPlugin: 屏蔽一些无关信息的插件
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'client/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

// 模块输出  输出 config里的内容
module.exports = config
