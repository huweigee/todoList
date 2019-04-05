// 引入 vuex 插件
import Vuex from 'vuex'
// // 引入vue
// import Vue from 'vue'
// // 使用vuex插件
// Vue.use(Vuex)

// 创建 vuex store 对象
// store: 仓库，用于存放应用中的大部分的状态(state)
//  state: 状态
// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, num) {
//       state.count = num
//     }
//   }
// })
// 导出模块
// export default store
// 引入 state 文件
// defaultState: 为什么使用defaultState，面不是 state,因为有服务端渲染的过程，服务端渲染的时候会有一部分数据直传到客户端，拿到的数据会覆盖defaultState的数据
//  defaultState数据没有任务跟业务相关的内容，只是默认数据
// state会接收传递的业务数据这部分数据会覆盖defaultState数据
import defaultState from './state/state'

// 引入 mutations 文件
// mutations 是操作定义，不管有没有默认的数据对操作来说都是一样的
import mutations from './mutations/mutations'

import getters from './getters/getters'

// 上面的方法无法用于服务端渲染，会造成每次都渲染同一个对象
export default () => {
  return new Vuex.Store({
    // state: {
    //   count: 0
    // },
    state: defaultState,
    mutations: mutations,
    getters
  })
}
