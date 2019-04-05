import Vue from 'vue'

const compoent = {
  props: {
    active: Boolean,
    propOne: {
      require: true
    }
  },
  template: `
    <div>
      <input type="text" v-model="text" />
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const compoent2 = {
  // 指定从 compoent 继承
  extends: compoent,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log('comp2 mounted')
    console.log('comp2 mounted')
  }
}
//
// const CompVue = Vue.extend(compoent)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: 123
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

new Vue({
  el: '#root',
  components: {
    Comp: compoent2
  },
  template: `<comp></comp>`
})
