import Vue from 'vue'

// 二级组件
// 这是对象还不是组件，要成为组件要先注册
const compoent = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text" /> <br/>
      <input type="text" v-model="propOne" /><br/>
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>`,
  data () {
    return {
      text: 123
    }
  },
  methods: {
    handleChange () {
      // this.onChange()
      this.$emit('change')
    }
  }
}

// 全局使用Vue这个类
// 注册组件 定义了一个叫 CompOne 的组件
// @component() 这个方法定义组件
// @CompOne 组件名 在模板里当作标签用
// @compoent 定义的对象
// Vue.component('CompOne', compoent)

// 一级组件，最外层的组件
new Vue({
  components: {
    // 组件名(key)：组件内容(val)
    CompOne: compoent
  },
  data: {
    prop1: 'text1'
  },
  methods: {
    handleChange () {
      this.propOne += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  el: '#root',
  // 代表使用了 compoent
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one :active="false"></comp-one>
    </div>`
})
