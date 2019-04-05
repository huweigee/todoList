const path = require('path')

const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  // HTMLPlugin: 用于生成 html 的入口文件
  // 使用 template.html,意思是根据这个文件生成模板
  new HTMLPlugin({
    // 指定入口文件地址
    template: path.join(__dirname, 'template.html')
  })
]
// historyFallback:
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    error: true
  },
  // historyFallback: {
  //   index: '/index.html'
  // },
  hot: true
  // open: true,
  // historyFallback: {

  // }
}

let config

// if  是开发环境的配置
if (isDev) {
  // merge 不会覆盖baseConfig，只会产生新的Object ,
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            // 这里不需要这么复杂的模式
            // {
            //   loader:'css-loader',
            //   // 开启 cssModule 模式
            //   // 在jsx文件中使用 import classname from '样式文件的路径'
            //   // render()调用 <div id={classname.样式文件名}></div>
            //   options: {
            //     module: true,
            //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
            //   }
            // },
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
  // config.module.rules.push({
  //   test: /\.styl/,
  //   use: [
  //     'style-loader',
  //     'css-loader',
  //     {
  //       loader: 'postcss-loader',
  //       options: {
  //         sourceMap: true
  //       }
  //     },
  //     'stylus-loader'
  //   ]
  // })
  // config.devtool = '#cheap-module-eval-source-map'
  // config.devServer = {
  //   port: 8000,
  //   host: '0.0.0.0',
  //   overlay: {
  //     error: true
  //   },
  //   hot: true
  //   // open: true,
  //   // historyFallback: {

  //   // }
  // }
  // config.plugins.push(
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoEmitOnErrorsPlugin()
  // )
} else { //  else 是正式环境的配置
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
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
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
  // config.entry = {
  //   app: path.join(__dirname, 'src/index.js'),
  //   vendor: ['vue']
  // }
  // config.output.filename = '[name].[chunkhash:8].js'
  // config.module.rules.push(
  //   {
  //   test: /\.styl/,
  //   use: ExtractPlugin.extract({
  //     fallback: 'style-loader',
  //     use: [
  //       'css-loader',
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           sourceMap: true,
  //         }
  //       },
  //       'stylus-loader'
  //     ]
  //   })
  // }, )
  // config.plugins.push(
  //   new ExtractPlugin('styles.[contentHash:8].css'),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor'
  //   }),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'runtime'
  //   })
  // )
}

module.exports = config
