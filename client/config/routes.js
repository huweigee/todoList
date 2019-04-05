// 引入要配置路由的组件
import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

// 配置路由映射关系，路由的映射是数组，由对象组成的数组
// 每个对象都是一个路由映射
export default [
  // '/' :  / 就是默认路由
  // redirect：重新跳转，当检测到是默认路由时跳转到指定页面
  // path: 该组件跳转的页面(大概的意思就是这个组件要在哪显示)
  // component: component来自于项目中的vue页面
  // {
  //   path: '/',
  //   redirect: '/app'
  // },
  // todo组件在 app页面显示(相当于主页)
  {
    path: '/app',
    component: Todo
    // name: 'app',
    // meta: {
    //   title: 'this is app',
    //   description: 'app'
    // }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  }
  // login组件在login页面显示
  // {
  //   path: '/login',
  //   component: Login
  // }
]
