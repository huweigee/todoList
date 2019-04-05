// 请求或者加载模块 path 的值并赋值给常量 path
const path = require('path')
// const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
// 请求或者加载 webpack.config.base 文件里的值赋值给 baseConfig
const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })
]

let config

config = merge(baseConfig, {
  // 指定打包好的程序在哪种环境运行
  target: 'node',
  // 入口文件
  entry: path.join(__dirname, '../client/server-entty.js'),
  // 代码调试用的文件
  devtool: '#source-map',
  // 配置打包好的导出文件：导出文件名，导出文件路径
  // libraryTarget: 库名 用于指定我们写的代码入口(或者说是导出模块)的方式 例：module.exports = {} 这就是一个入口
  // filename: 指定导出文件名
  // path: 指定导出文件路径
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // externals：用于指定一些不想让webpack打包但是又要在全局使用的依赖
  // Object.keys(): 该方法用于获取括号内对象的所有属性
  // require(): 请求命令或者说加载命令，括号内是想要请求的值
  // 请求/加载 '../package.json' 这个文件里的 dependencies 里的所有的值
  // 指定不要打包 vue 文件，会重复，后面要用vue时可以直接 require('vue')就可以了
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  resolve: {
    // 指定 vue 的版本
    // import Vue from 'vue'  指定使用哪个版本的 vue 文件
    // 默认情况下 improt Vue 指向的是 vue.runtime.XXX.js 文件
    // 开发环境 improt Vue 指向的是 vue.runtime.esm.js 文件
    // 正式环境 improt Vue 指向的是 vue.runtime.min.js 文件
    // runtime： 有没有这个的区别是 可不可以在 vue对象里写 template
    // new({ template:'<div>this is content</div>'}) 有runtime 这么写会报错
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
