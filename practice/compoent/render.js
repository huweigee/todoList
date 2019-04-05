// eslint-disable-line

import Vue from 'vue'

const component = {
  // 子组件接收父组件 props1
  props: ['props1'],
  name: 'comp',
  template: `
    <div :style="style">
      <slot></slot>
    </div>
  `,
  render (createElement) {
    return createElement(
      'div',
      {
        // 属性值 调用 data里的数据
        style: this.style
        // on: {
        //   click: () => {
        //     this.$emit('click')
        //   }
        // }
        // 创建 slot： slot没有名字的时候 this.$solts.default
        // slot有名字的时候 <slot name="body"></slot> this.$solts.body
      }, [
        // 创建下面父组件命名的插槽
        this.$slots.header,
        // 将 props1 插入到子组件的模板中
        this.props1
      ])
  },
  data () {
    return {
      style: {
        width: `200px`,
        height: `200px`,
        border: `1px solid #aaa`
      },
      vaule: `component value`
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '0'
    }
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  methods: {
    handelClick () {
      console.log('clicked')
    }
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span"> {{value}} </span>
  //   </comp-one>
  // `,
  // render () {
  //   return this.$createElement
  // }
  // createElement 作为形参
  render (createElement) {
    return createElement(
      // 传入需要创建的节点的名字(可以是组件也可以是dom节点)
      'comp-one',
      // 节点上的属性/事件都写在这个对象里
      {
        ref: 'comp',
        // 父组件接收自己的 value 赋值给props1
        props: {
          props1: this.value
        },
        // on: {
        //   click: this.handelClick
        // },
        // 绑定到子组件的根节点上面，直接触发根节点的的事件(不需要 $on和$emit)
        nativeOn: {
          // 要触发的事件以及执行的函数
          click: this.handelClick
        }
      },
      // 创建的节点里有子节点就在这里写，如果是节点的内容就用字符串，如果是子节点就用数组
      [ // 子节点必须以数组的方式进行传递
        createElement(
          'span',
          {
            ref: 'span',
            // 给插槽命名
            slot: 'header',
            // 在 span 里面再插入一个span 覆盖span本来的内容(就是下面的this.value)
            domProps: {
              innerHTML: '<span>465</span>'
            },
            arrts: {
              id: 'test-id'
            }
            // 这里的 this.value 就是字符串，是 span 里的值
          }, this.value)
      ]
    )
  }
})
