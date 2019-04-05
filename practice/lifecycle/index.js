import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  // 执行顺序由上至下
  // 创建实例中必定会执行
  // this.$el 是 undefined
  beforeCreate () {
    console.log(this, this.$el, 'beforeCreate')
  },
  // 创建实例中必定会执行
  // this.$el 是 undefined
  created () {
    console.log(this, this.$el, 'created')
  },
  // 创建实例中指定挂载才会执行
  // this.$el 是 <div id='root'></div> 就是div 节点
  beforeMount () {
    console.log(this, this.$el, 'beforeMount')
  },
  // 创建实例中指定挂载才会执行
  // this.$el 是 <div> 0 </div> 节点变成渲染之后的样式覆盖 beforeMount 里的节点，并包含有数值 
  // 在 mounted 之后，所有调用的生命周期方法，所拿到的节点都是 mounted 里的渲染过去的
  mounted () {
    console.log(this, this.$el, 'mouned')
  },
  // 有数据更新才会执行
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  // 有数据更新才会执行
  updated () {
    console.log(this, 'updated')
  },
  //
  activated () {
    console.log(this, 'activated')
  },
  //
  deactivated () {
    console.log(this, 'deactivated')
  },
  // 调用 $destroy()方法是执行  $destroy()方法是销毁组件
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  // 调用 $destroy()方法是执行  $destroy()方法是销毁组件
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    // 抛出异常
    // throw new TypeError('render error')
    // 创建模板
    return h('div', {}, this.text)
  },
  // 捕获异常，只有本组件可以捕获到，正式环境不可用
  renderError (h, err) {
    // 捕获异常
    return h('div', {}, err.stack)
  }
  // 根组件有这个方法，可以捕获子组件的异常，除非子组件阻止冒泡，正式环境可用
  // errorCaptured () {
  //   return h('div', {}, err.stack)
  // }
})

app.$mount('#root')

// setInterval(() => {
//   app.text = app.text += 1
//   app.text += 1
// }, 1000)

setTimeout(() => {
  app.$destroy()
}, 1000)
