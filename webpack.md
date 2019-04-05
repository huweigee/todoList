# 项目初始化
  npm init

## 安装依赖
  npm i webpack vue vue-loader

  vue-loader需要第三方依赖
    css-loader
    vue-template-complier

## export/import
  export: 用于对外输出本模块(一个文件就是一个模块)变量的接口
  import: 用于在一个模块中加载另一个含有export接口的模块

  使用export命令定义了模块的对外接口后，其他的JS文件可以通过import命令加载这个模块

例： 
  a.js
    let name1='hu'
    let name2='wei'
    function add (x, y) {return x + y}
    export {name1,name2, add}
  b.js
    import {name1,name2} from './a.js
    export default {
      created () {
        <!-- 打印 name1 == hu -->
        console.log(name1)
        <!-- 6 -->
        console.log(add(2, 4))  
      }
    }

### export/export default
区别：
  1.  export/export default 都可以用于导出常量、函数、文件、模块等
  2.  可以在其他文件或模块中 import + (常量|函数|文件|模块)名的方式，将其导入，以便对其使用
  3.  在一个文件或模块中，export/import 可以有多个，export default仅有一个
  4.  export方式导出必须加 {},export default不需要

export default为模块指定默认输出，就不需要知道所要加载的模块的变量名

export default输出，实际上是将其赋值到 default属性上导出，相当于 export.default = xxx


## webpack.config.js
webpack: 打包前端资源的(js/css/font/img),这些资源都是要通过http请求加载的内容


## cross-env
可以跨平台设置和使用环境变量
npm i crpss-env


## html-webpack-plugin
  npm i html-webpack-plugin: webpack 插件
  1.  为html文件中引入的外部资源(script/link)动态添加每次编译后的hash，防止引用缓存的外部文件问题
  2.  可以生成创建html入口文件，


## postcss-loader

## autoprefixer
autoprefixer： 用于给CSS自动添加私有前缀

## babel
  用于转义 ES6 代码

## babel-preset-env

## babel-plugin-transform-vue-jsx

## extract-text-webpack-plugin
  npm i extract-text-webpack-plugin

## webpack.dev.server
webpack.dev.server: 是webpack的包 npm i webpack-dev-server

## 判断环境
配置文件要同时用在开发环境和用户环境所以要判断是什么环境

## 挂载
.vue 是组件，组件不能直接挂载到 html 上去 通过入口文件挂载
render: (h) => h(App)，将APP挂载到 html 上

<!-- 创建节点 -->
// const root = document.createElement('div')
// document.body.appendChild(root)
<!-- 挂载节点 -->
new Vue({
  router,
  render: (h) => h(App)
}).$mount(root)

##  package.json
根据 npm script时设置一个环境来标识现在是什么环境
mac：
  build: NODE_ENV=production 就能读取环境变量
win:
  build: set NODE_ENV=production 就能读取环境变量
通用设置：
  build: cross-env NODE_ENV=production 就能读取环境变量


script: 

<!-- 这里是调用 webpack打包，用于生产环境 -->
  build: cross-env NODE_ENV=production webpack --config webpack.config.js
<!-- 专门用于开发环境 -->
  dev: cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js


## .babelrc
  配置 babel 文件

## .postcss.config.js
  配置 postcss 文件，后处理css文件，css文件编译完成后调用这个文件优化css代码