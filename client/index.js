import Vue from 'vue'
import App from './app.vue'
// 引入样式文件，该样式将作用于该组件
import './assets/styles/global.styl'
// 引入图片文件，该图片将在本组件中显示
// import './assets/images/bg.jpeg'

// 因为在config.js里 HTMLPlugin 指明的模板文件的存在，所以这里就不用自己创建节点了
// 创建节点，然后 $mount(root)
// root: 节点的名字，用于挂载
// const root = document.createElement('div')
// document.body.appendChild(root)

// 引入router插件
import VueRouter from 'vue-router'
//  引入 store 文件
import store from './store/store'

// 从 routes 文件中 引入 createRouter 方法
// createRouter 创建 router 对象方法
import createRouter from './config/router.js'

// 使用 router 插件,在入口文件中使用router插件，别的组件才可以调用router
Vue.use(VueRouter)

// 创建组件里要应用的 router对象
const router = createRouter()

new Vue({
  // 注入 router
  // 在根节点里的 vue 实例中挂载 router 对象，在其他组件里就可以拿到router了
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
