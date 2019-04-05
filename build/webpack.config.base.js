const path = require('path')
// 引入 vue-loader.config 文件
const cteateVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    // filename: 'bundle.js',
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   // 默认处理文件的 loader
      //   loader: 'eslint-loader',
      //   // 去掉node_modules，因为node_modules里的文件是经过处理的，有些是不符合 standard 标准的，
      //   exclude: /node_modules/,
      //   // 预处理，在文件指定的 loader 处理文件之前先用 eslint-loader 处理一遍，处理通过再用指定loader处理，否则报错
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // 使用 cteateVueLoaderOptions 这是一个方法
        options: cteateVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resouces/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
