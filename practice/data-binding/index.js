import Vue from 'vue'

var globalVar = '111'  // eslint-disable-line
const app = new Vue({
  el: '#root',
  // {{}} 里可以写语句，这里的意思是 判断 isActive 的值进行三目运算
  // template: `
  //   <div v-bind:id="aaa" v-on:click="handleClick" >
  //     // 进行简单的运算
  //     {{isActive ? 'active' : 'not active'}}
  //     // 进行数组操作
  //     {{arr.join(' ')}}
  //     // 调用全局对象
  //     {{Date.now()}}
  //     // 无法访问data 之外的数据
  //     {{globalVar}}
  //     // 显示html 代码 
  //     <p v-html="html"></p>
  //   </div>`,
  template: `
    <div :class="{ active: isActive }">
      <p v-html="html"></p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: `<span>123</span>`,
    aaa: 'main'
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    }
  }
  // render (h) {
  //   return h('div', {}, this.text)
  // }
})

app.$mount('#root')
