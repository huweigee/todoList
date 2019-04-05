const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  // 使用 template.html,意思是根据这个文件生成模板
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    error: true
  },
  hot: true
  // open: true,
  // historyFallback: {

  // }
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
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
  devServer,
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
