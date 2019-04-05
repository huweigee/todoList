// 导入路由器的 对象
import Router from 'vue-router'

// 导入路由配置页面
import routes from './routes'
console.log('roures', routes)

// ---------------------------------------------------------
// 不建议用下面这种方法创建路由，因为在全局 import  路由的时候是同一个router
// 因为我们的项目会进行服务端渲染，用这种方式会导致内存溢出
// export default 只能使用一次，服务端渲染每次都会重新生成一个APP

// 通过new Router 创建一个路由的实例，实例里把配置文件声明上
// const router = new Router({
//   routes
// })
// // 输出这个路由实例
// export default router
// ---------------------------------------------------------

// 输出文件 返回一个 router 实例，实例里声明路由配置文件
// routes: 是路由配置项
export default () => {
  // 返回一个router实例
  // mode: 有三个值。默认是 hash, url带# history 不带#
  // mode: hash   使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
  // mode: history  依赖 HTML5 History API 和服务器配置
  // mode: abstract 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
  // base:'/base/' 在路径上 加上 base/ 例： base/app
  // linkActiveClass  router-link 跳转后加载到标签上的类
  // linkExactActiveClass  区别是上面那个是区域加载(意思是点击了儿子同进也会给父亲加上这个类，)，这个是精确加载，点击谁就给谁加，
  // scrollBehavior  页面跳转需不需要滚动
  //   to:  跳转时要去往的路由
  //   from:   从哪个路由跳转
  //   savedPosition:  保存过的路径(如果去往过这个路由在这个路由里产生了滚动的行为，会保存该路由滚动过的位置，跳转后会直接定位到这个位置)
  // query:  页面请求时的参数 地址中 ? 号后面的参数 就是了
  // parseQuery(query)  将字符串转成 json Obj 方法 query  是字符串
  // stringifyQuery(obj) 将对象转成字符串
  // fallback: 在浏览器不支持 history 模式时自动转换成 hash 模式，推荐使用
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      // 如果有滚动行为
      if (savedPosition) {
        // 返回到滚动的位置
        return savedPosition
      } else {
        // 如果没有滚动(或者说没有跳转过这个路由)，就返回到页面顶部
        // x/y 是坐标
        return {
          x: 0,
          y: 0
        }
      }
    },
    fallback: true
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
