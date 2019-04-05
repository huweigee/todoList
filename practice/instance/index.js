// 引入vue
import Vue from 'vue'

// 创建实例
// 用 el 挂载
// new Vue({
//   // @el: 指定本实例渲染出来的内容要挂载到哪个地方
//   el: '#root',
//   // 创建一个模板 内容是 标签<div></div>
//   template: '<div>this is content</div>'
// })

// 不用 el 挂载的方法

const app = new Vue({
  template: '<div>{{text}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})

// 将 app 挂载到 html 上面
app.$mount('#root')
// 更改 text 的值
// app.text = 'text1'

// 定时器，每隔一秒，text 的值加1
setInterval(() => {
  // 初始值为0
  // app.text = app.text + 1
  // app.text = 0 + 1
  // app.text += 1

  // 没有变化 直接这样修改是没有作用的
  app.$options.data.text += 1
  // 有变化 跟app.text += 1 是一样的，这两个属性是相通的
  app.$data.text += 1
}, 1000)

// // data 里的数值
// console.log(app.$data)

// console.log(app.$props)
// // 对应html 的节点的引用
// console.log(app.$el)
// // 对应的就是 new vue 的一整个对象里的内容都是作为创建这个对象的 options 这个参数而存在的
// // options 里包含我们传进去的参数和默认的参数
// console.log(app.$options)
// // 这样赋值有作用，要等下一次有值变化，重新渲染才会生效
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// // 这是 vue 的实例
// console.log(app.$root === app) // true
// // <item><div></div></item>  @item 是组件  div 就是 item 的 chilren  传入到 item里面的
// console.log(app.$chilren)
// // 这两上是 vue 的插槽，在 template 可以调用，也可以编译成对象挂载到 vue 实例上面
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// // 模板里的引用，快速定位到组件/节点  在标签里使用 ref="属性值"，就可以使用 $refs 了
// // 操作组件/节点，修改属性之类的
// console.log(app.$refs)
// // 服务端渲染才会用这个判断
// console.log(app.$isServer)

// // 方法

// // 对应 watch
// // @text 要监听的属性
// // @newText  属性值发生变化之后的新值
// // @oldText  属性值发生变化之前的旧值
// app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)  // 0 : 1  1 : 2 2 : 3
// })


// // 事件监听
// // 监听 test 事件
// // 相当于 ontest = function(){console.log('test emited')}
// app.$on('test', () => {
//   console.log('test emited')
// })
// // 触发事件
// // 触发 test 事件
// app.$emit('test')

// // $emit 和 $on 必须同进作用在一个 vue 对象上面才会生效

// setInterval(() => {
//   app.$emit('test')
// }, 1000)

// // 强制组件重新渲染
// app.$forceUpdate()

// let i = 0
// setInterval(() => {
//   i++
//   // 给某个对象上的某个值 赋值为 i 效果跟app.$forceUpdate() 是一样的
//   // 这种方法可以将 a 声明成 obj 的属性
//   app.$set(app.obj, 'a', i)
//   // 删除某个对象的某个属性
//   app.$delete(app.obj, 'a')
// }, 100)
