import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
          <!-- 字符串拼接的方式  -->
      <p>Name: {{firstName + ' ' + lastName}}</p>
          <!-- computed 方式  name 是函数名 -->
      <p>Name: {{name}} </p>
          <!-- 调用函数作为插值需要加括号 -->
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <input type="text" v-model="number"/>

      <p>Firstname: <input type="text" v-model="firstName"/></p>
      <p>LastName: <input type="text" v-model="lastName"/></p>
          <!-- name -->
      <p>Name: <input type="text" v-model="name"/></p>
          <!-- watch: firstName -->
      <p>FullName: {{ fullName }} </p>

      <p>Obj.a: <input type="text" v-model="obj.a"/></p>
    </div>
  `,
  data: {
    firstName: 'Hu',
    lastName: 'Wei',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  computed: {
    // 设置属性值的操作  不推荐这种操作
    // name: {
    //   // 获取值 获取 data 里的数据,将获取的数值赋值给 name
    //   get () {
    //     console.log('new name')
    //     // 通过字符串拼接的方式插入 data 里的数据 返回给插入符
    //     return `${this.firstName} ${this.lastName}`
    //   },
    //   // 设置值，将 get获取到值重新设置值
    //   set (name) {
    //     // split 以空格方式分割字符串
    //     const names = name.split(' ')
    //     this.firstName = names[0]
    //     this.lastName = names[1]
    //   }
    // }
    // 定义一个函数
    name () {
      console.log('new name')
      // 通过字符串拼接的方式插入 data 里的数据 返回给插入符
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {
    // 监听 firstName,一旦firstName的值有变化就执行这个函数
    // @newName 是默认参数，firstName变化后的新值
    // @oldName 是默认参数，firstName没有变化时的值
    firstName (newName, oldName) {
      this.fullName = newName + ' ' + this.lastName
    },
    lastName: {
      // handler，默认写方法的时候其实就是在写handler,
      handler (newName, oldName) {
        this.fullName = this.fullName + ' ' + newName
      },
      // 声明这个方法之后(就是监听 lastName)，会立即执行 handler，如果不设置为true就会在数据有糖化 之后才会执行
      immediate: true
    },
    // 深入监听方法一： deep: true
    obj: {
      // 监听到属性有变化，就调用 handler 方法
      // 默认的情况下 handler 方法只有在给 obj对象赋值的时候才会临到obj的变化才会执行这个函数
      // 当obj原有的属性值有变化的时候是不会监听到的，如果要监听原有属性值就要设置deep：true
      handler () {
        // 当检测到 obj 里的属性 a 的值 有变化时 就打印下面的语句
        console.log('obj.a changed')
      },
      immediate: true,
      // 深入观察，obj里的所有属性的值只要有变化就可以监听到，false 则监听不到
      deep: true
    },
    // 深入监听方法二： 将要监听的对象属性变为字符串
    'obj.a': {
      handler () {
        console.log('obj.a changed-again')
      },
      immediate: true
    }
  },
  methods: {
    getName () {
      // console.log('getName')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
