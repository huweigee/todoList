# vue
在 build 里新建这个文件
  webpack.config.practice.js

## webpack.config.practice.js
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin()
]

const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    error: true
  },
  hot: true
  // open: true,
  // historyFallback: {

  // }
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  resolve: {
    // 指定 vue 的版本
    // import Vue from 'vue'  指定使用哪个版本的 vue 文件
    // 默认情况下 improt Vue 指向的是 vue.runtime.XXX.js 文件
    // 开发环境 improt Vue 指向的是 vue.runtime.esm.js 文件
    // 正式环境 improt Vue 指向的是 vue.runtime.min.js 文件
    // runtime： 有没有这个的区别是 可不可以在 vue对象里写 template
    // new({ template:'<div>this is content</div>'}) 有runtime 这么写会报错
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config


## template.html
在 build 里新建 template.html 文件


## index.js
  要创建一个节点
    const div = document.createElement('div')
  将创建的节点添加到 body 里
    document.body.appendChild(div)

  挂载节点
    new Vue({
      el: div,
      <!-- template里的内容就会在页面中显示了 -->
      template: '<div>this is vue</div>'
    })

## resolve  是什么意思


## vue实例

  实例：某个类通过 new 出来的就叫这个类的实例

### vue实例的创建和作用
  创建
    // 引入vue
    import Vue from 'vue'

### vue 挂载方法
     创建实例
1.  用 el 挂载
     new Vue({
      <!-- @el: 指定本实例渲染出来的内容要挂载到哪个地方 -->
       el: '#root',
       <!-- 创建一个模板 内容是 标签<div></div> -->
       template: '<div>this is content</div>'
     })

2.  不用 el 挂载的方法
    <!-- 给实例一个变量名 -->
    const app = new Vue({
      <!-- 动态获取 text 的值  -->
      template: '<div>this is {{text}}</div>',
      data: {
        text: 'text'
      }
    })

    <!-- 通过变量名 将 app 挂载到 html 上面 -->
    app.$mount('#root')
    <!-- 更改 text 的值  -->
    app.text = 'text1'

    setInterval(() => {
      <!-- app.text = app.text + 1 -->
      app.text += 1
    }, 1000)

### vue实例的属性
// data 里的数值
console.log(app.$data)

console.log(app.$props)

// 对应html 的节点的引用
console.log(app.$el)

// 对应的就是 new vue 的一整个对象里的内容都是作为创建这个对象的 options 这个参数而存在的
// options 里包含我们传进去的参数和默认的参数
console.log(app.$options)

// 这样赋值有作用，要等下一次有值变化，重新渲染才会生效
app.$options.render = (h) => {
  return h('div', {}, 'new render function')
}

// 这是 vue 的实例
console.log(app.$root === app) // true
// <item><div></div></item>  @item 是组件  div 就是 item 的 chilren  传入到 item里面的
console.log(app.$chilren)

// 这两上是 vue 的插槽，在 template 可以调用，也可以编译成对象挂载到 vue 实例上面
console.log(app.$slots)
console.log(app.$scopedSlots)

// 模板里的引用，快速定位到组件/节点  在标签里使用 ref="属性值"，就可以使用 $refs 了
// 操作组件/节点，修改属性之类的
console.log(app.$refs)

// 服务端渲染才会用这个判断
console.log(app.$isServer)

### vue实例的方法
$watch() 与 实例里的 watch 是一样的

  $watch()写法(这样会有一个 unWatch 的值返回) 要手动注销
    const unWatch = app.$watch('text', (newText, oldText) => {
      console.log(`${newText} : ${oldText}`)
    })
    注销监听
    unWatch()

  watch写法 自动注销
    watch: {
      text (newText, oldText) {
        console.log(`${newText} : ${oldText}`)
      }
    }

### $on $emit
  $on()     监听事件
  $emit()   触发事件

例：
<!-- 监听事件 一直监听
  相当于 
  ontest = function(){
    console.log(`test emited ${a} ${b}`)
  }
   -->
  app.$on('test', (a, b) =>{
    <!-- `` 字符串模板，通过 ${} 可以向字符串里插入变量 -->
    console.log(`test emited ${a} ${b}`)
  })
  <!-- 触发事件 
    触发 test 事件  该事件执行函数 
    1，2 是向事件执行的函数传递参数
    -->
  app.$emit('test', 1, 2)

<!-- 只监听一次 -->
  app.$once('test', {a, b} => {
    console.log( `test emited ${a} ${b}`)
  })
<!-- 强制组件重新渲染 -->
  app.forceUpdate()

    给某个对象上的某个值 赋值为 i 效果跟app.$forceUpdate() 是一样的
    这种方法可以将 a 声明成 obj 的属性
  app.$set(app.obj, 'a', i)


  // 删除某个对象的某个属性
  app.$delete(app.obj, 'a')

<!--  vue 渲染过程是异步的，每次更改数值并不会同步刷新，而是等待异步队列，多次数据更改的结果一次性渲染出来 -->
  app.$nextTick([callback])

  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  输出的结果是  5 10 15 20  意思就是一次性时行了 加 5 的操作而不是加1

  <!-- 主动销毁生成的实例，销毁的过程会解除事件监听以入 watch-->
    app.$destroy()

setTimeout(() => {
  app.$destroy()
}, 1000)
## this
  这里的 this 指向的是实例(app)

##  vue 框架 
  vue是响应式的框架，如果 data 里的某一个对象里的值没有声明的话，对象里的属性直接赋值就成了非响应式的，vue 不会重新渲染

  data : {
    text: 0
    <!-- 没有声明对象的值 -->
    obj: {}
  }

  let i = 0
  setInterval(() => {
    i ++
    <!-- 给对象的属性赋值 -->
    app.obj.a = i
    <!-- 强制重新渲染 -->
    app.$forceUpdate()
  })

##  vue 组件的生命周期
在 new 一个  vue实例的过程中有四个方法相继执行了
  beforeCreate => created => beforeMount => mounted
  beformCreate和 created 是必定会执行的

如果没有指定 el/$mount()(挂载)，创建实例过程中将不执行beforeMount => mounted

new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  <!-- 创建实例中必定会执行 -->
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  <!-- 创建实例中必定会执行 -->
  created () {
    console.log(this, 'created')
  },
  <!-- 创建实例中，有挂载才会执行 -->
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  <!-- 创建实例中，有挂载才会执行 -->
  mouned () {
    console.log(this, 'mouned')
  },
  <!-- 有数据更新才会执行 -->
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  <!-- 有数据更新才会执行 -->
  updated () {
    console.log(this, 'updated')
  },
  <!--  -->
  activated () {
    console.log(this, 'activated')
  },
  <!--  -->
  deactivated () {
    console.log(this, 'deactivated')
  },
  <!-- 调用 $destroy()方法是执行  $destroy()方法是销毁组件 -->
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  <!-- 调用 $destroy()方法是执行  $destroy()方法是销毁组件 -->
  destroyed () {
    console.log(this, 'destroyed')
  }
})

操作跟 dom 有关的东西 都放到 mounted 里 
操作数据 可以放到 created 里  也可以放到 mounted

## 有哪些生命周期方法
beforeCreate => created => beforeMount => mounted  
这四个方法是一次性的

 beforeMount/mounted  服务端渲染时不会调用，因为服务端没有 dom 执行的环境

 beforeCreate/created 服务端渲染会调用的只有这两个


### render() 和 template
  template: '<div>{{text}</div>'
    两种写法的结果是一样的
  render (h) => {
    <!-- 
      @ div: 要创建的标签
      @ {}: 标签上的一些属性，事件
      @ this.text:  标签里的内容
     -->
    return h('div', {}, this.text)
  }

render() 在 beforeMount 和 mounted 中间执行，，先执行beforeMount 再执行 render() 再执行 mounted


### renderError()
调试报错，只有本组件出错才会调用，子组件调用不到，正式环境不可以用
  renderError(h, err) {

    return h('div' {}, err.stack)
  }

### errorCaptured()
  errorCaptured(): 搜集线上的错误，在根组件写了这个方法，子组件有错误也可以捕捉到，除非子组件停止向上冒泡，正式环境可以使用

### 疑惑
  app.text += 1
  app.text = app.text += 1
  这两条语句无论哪一条在上面都只会输入一个结果，两条语句的结果是一样的，那么这两种写法有什么区别么

## 数据绑定
  数据绑定就是把 data 绑定到 template 上面 显示到页面上

  vue在模板里能访问的数据：
    1. 对象上绑定在this上的所有值
    2. JS默认的全局对象
    3. 自己定义在外层的不能访问
  
  template: `
    <div v-bind:id="aaa" v-on:click="handleClick" >
      // 进行简单的运算
      {{isActive ? 'active' : 'not active'}}
      // 进行数组操作
      {{arr.join(' ')}}
      // 调用全局对象
      {{Date.now()}}
      // 无法访问data 之外的数据
      {{globalVar}}
      // 显示html 代码 
      <p v-html="html"></p>
      // 可以插入 函数 结果跟  {{arr.join(' ')}} 是一样的，不推荐这种方法，可以用 computed 方法来做
      <p> {{getJoinedArr(arr)}} </p>
    </div>`
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: `<span>123</span>`,
    aaa: 'main'
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }


### 属性绑定

#### v-bind
  绑定动态数据
  v-bind:属性名="变量名"

例：  动态给 div 赋值 id 的名称  aaa 是变量，在 data 里定义这个变量并将变量的值赋值给 div 的 id 
  <div v-bind:id="aaa">

  data: {
    aaa: 'main'
  }

#### v-html
  用于输入html代码 
  v-html:属性名="变量名"
例： 在 p 标签里插入一个 span 标签 并显示span里的内容
  <p v-html="html"></p>
  data: {
    html: `<span>123</span>`
  }

#### v-on
  绑定事件 
  v-on:事件名="函数名"

例：
  <div v-on:click="handleClick">

  methods: {
    handleClick () {
      alert('clicked')
    }
  }

####  :class
  动态绑定class/合并class

例： 
  方法一：对象表达式
    根据isActive返回的值来判断是否把 acrive 这个类加到 div 上
    isActive 是 true 就加上  false 就不加
    active: boolean(必须是布尔值)
  <div :class="{ active: isActive }">

  方法二：数组
    可以在数组里写表达式 
    是 true 就把 类加上 false 就什么都不加
  <div :class="[ isActive ? 'active' : '']">

  方法三：
  <div :class="[{ active: isActive }]">

data: {
  isActive: false
}


#### :style
vue 会自动加需要加前缀的样式

单个样式插入方式：
  <div :style="styles"></div>

多个样式插入方式：这种方式如果有相同的样式则下面的会覆盖上面的样式
  <div :style="[styles, styles2]"></div>


data: {
  styles: {
    color: 'red'
  }
  styles2: {
    color: 'black'
  }
}

#### appearance: none  消除浏览器默认样式
  appearance: none  消除浏览器默认样式
  需要加前缀


**关闭 eslint 的方法，// eslint-disable-line**


## computed/watch

###  computed
computed: 可以缓存，数据没有变化 就不会刷新，性能优化比较好
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
    </div>
  `,
  data: {
    firstName: 'Hu',
    lastName: 'Wei',
    number: 0
  },
  computed: {
    // 设置属性值的操作  不推荐这种操作
    name: {
      // 获取值 获取 data 里的数据,将获取的数值赋值给 name
      get () {
        console.log('new name')
        // 通过字符串拼接的方式插入 data 里的数据 返回给插入符
        return `${this.firstName} ${this.lastName}`
      },
      // 设置值，将 get获取到值重新设置值
      set (name) {
        // split 以空格方式分割字符串
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
    // 定义一个函数
    // name () {
    //   console.log('new name')
    //   // 通过字符串拼接的方式插入 data 里的数据 返回给插入符
    //   return `${this.firstName} ${this.lastName}`
    // }
  },
  methods: {
    getName () {
      console.log('getName')
      return `${this.firstName} ${this.lastName}`
    }
  }


###  watch
  watch: 监听到某个属性的变化 要去执行某个操作就要用watch


watch: 最初绑定的时候是不会执行的，只有监听的属性有了数据的变化才会执行

// 监听 firstName,一旦firstName的值有变化就执行这个函数 
// @newName 是默认参数，firstName变化后的新值

firstName (newName, oldName) {
this.fullName = newName + ' ' + this.lastName
}

要想立即执行就要
 lastName: {
   // handler，默认写方法的时候其实就是在写handler,
   handler (newName, oldName) {
     this.fullName =this.fullName + ' ' + newName
   },
   // 声明这个方法之后(就是监听 lastName)，会立即执行 handler，如果不设置为true就会在数据有糖化 之后才会执行 
   immediate: true
 }
<div>      
  <p>Obj.a: <input type="text" v-model="obj.a"/></p>
</div>

  data: {
    obj: {
      a: '123'
    }

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
深入监听方法一： deep: true
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
深入监听方法二： 将要监听的对象属性变为字符串
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true
    }
  }

**watch 在 methods 前面执行**


computed 和 watch 里不要修改属性的值 因为这两都是监听属性的变化，然后生成新的值，如果在这里改了值可能会进入无限循环


## vue 原生指令 

### v-text
  v-text: 标签里要显示的内容是什么 
  <div v-text = "text"></div>与<div>{{text}}</div> 是一样的
    data: {
      text: 0}

  区别是： 前者只能写text指定的内容

### v-html
  v-html: 插入标签

  <div>{{html}}</div>     会将 span 当会内容显示出来
  <div v-html="html"></div>   会将 span 当作标签显示出来

  data: {
    html: '<span>this is html</span>'
    }

### v-show
  v-show: 判断当前节点要不要显示，
    active 的值为 boolean  true就显示,什么都不加 false 就不显示，会在标签上加display: none
  <div v-show="active">{{text}}</div>
  data: {
    text: 0,
    active: false
  }

### v-if
  v-if: 如果条件为 false 则节点被删除，不存在文档流里面

### v-else/v-else-if
  <div v-if="active">If: {{text}}</div>
  <div v-else-if="text === 0">Else Text: {{text}}</div>
  <div v-else>Else: {{text}}</div>

### v-for
  v-for="(item, index) in array"
  v-bind:key  key的值是唯一的不能重复，一般使用数组的item ，不推荐什么 index，会导致错误缓存

遍历数组：
  item： 是数组的值
  index: 是数组的索引
  <ul>
    <li v-for="(item, index) in arr">
      {{item}}
    </li>
  </ul>
  data: {
    arr: [1, 2, 3],
    },
遍历对象：
  对象是键值对的形式,键就属性名，值是属性值
  val：是对象的值
  key：是对象的键
  index: 键在对象里的索引
  <ul>
    <li v-for="(val, key, index) in obj">
      {{val}}:{{key}}
    </li>
  </ul>
  data: {
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },

### v-bind
  绑定属性

  将 text 字符串赋值给 prop-one
  <div prop-one="text"></div>


  将 属性 text 的值赋值给 prop-one  相当于 prop-one = 0
  <div :prop-one="text"></div>
  data: {
    属性： 属性值
    text: 0
  }


### v-model
  双向数据绑定
  默认用在 input 上 

#### 表单上绑定 v-model
<!-- active 的值为 false 选择框默认没选中 -->
<input type="checkbox" v-model="active"/>

<!-- 绑定一列数据 多选框-->
<div>
<!-- 绑定的是数组的值 
  默认在 dom 上的 value 都是字符串 
  如果想要 value 的值是数值就要加上 v-bind
-->
  <input type="checkbox" :value="1" v-model="arr" />
  <input type="checkbox" :value="2" v-model="arr" />
  <input type="checkbox" :value="3" v-model="arr" />
</div>

<!-- 单选框 -->

<div>
<!-- 单选框的 value不能用v-bind -->
  <input type="radio" value="one" v-model="picked" />
  <input type="radio" value="two" v-model="picked" />
</div>
data: {
  active: false,
  arr: [1,2,3],
  picked: ''
}


#### 修饰符
没有修饰符的 text 的值是字符串
  <input type="text" v-model="text" />

.number
加入一个 number 的修饰符，输入的值就是 数值，加了这个修饰符就只能输入数字
  <input type="text" v-model.number="text" />

.trim 去除首尾空格
  <input type="text" v-model.trim="text" />

.lazy v-model默认绑定的是 input 事件，只要有输入就会触发这个事件，加上.lazy就会变成onchange事件,意思是输入时不会变化，当失去焦点之后才会变化
  <input type="text" v-model.lazy="text" />


### v-on
  v-on:  事件绑定命令

### v-bind:class
  绑定类名
### v-bind:style
  绑定样式

###  v-pre
  v-pre 原样输入标签里的内容
  <div v-pre> Text: {{text}}</div>  输入 Text: {{text}}

### v-cloak

  模板写在body里面才会用到这个

### v-once
  数据绑定的内容只变化一次，一次之后就不变了
  <div v-once> Text: {{text}}</div>



##  vue 组件
  vue组件可以认为是一个类
### 定义组件
new Vue  就是一个组件
  new Vue({
    <!-- 声明组件 -->
    el: '#root',
    <!-- 组件的内容 -->
    template: `<comp></comp>`
  })


#### 全局定义组件
1.  定义一个对象作为组件的内容
    // 二级组件也可以叫子组件
    // 这是对象还不是组件，要成为组件要先注册
    const compoent = {
      template: `<div> {{text}} </div>`,
    }

2.  注册(定义)组件(要在父组件里使用子组件需要在父组件里注册子组件)注册完成后将子组件的名字当作标签在模板里写就可以使用了
    // 全局使用Vue这个类
    // 注册组件 定义了一个叫 CompOne 的组件
    // @component() 这个方法定义组件
    // @CompOne 组件名 在模板里当作标签用
    // @compoent 定义的对象
    Vue.component('CompOne', compoent)

3.  使用组件父组件
  new Vue({
  el: '#root',
  // 代表使用了 compoent
  template: `<comp-one></comp-one>`
  })


####  局部注册组件
  new Vue({
    <!-- 配置项 这里一定要加 s -->
  component: {
    <!-- 组件名(key)：组件内容(val) -->
    CompOne: compoent
  },
  el: '#root',
  // 代表使用了 compoent
  template: `<comp-one></comp-one>`
  })


### data
  data 在 new vue({
    data: {
      text: 123
    }
  })

  data 在非 new vue 里 
    data () {
      return {
        text: 123
      }
    }

* 不建议用这种全局的方法声明 data *
  const data = { text: 0 }
  data () {
    return data  
  }

### props 
  props：是vue组件选项中非常重要的一项，用于定义子组件被外部使用的时候的一些可变的行为(比如处理什么功能)
         是子组件用于接受父组件传递过来的数据的
         接收的数据必须要注明数据类型
         子组件是不可以给父组件传递的属性赋值的，因为props里的属性不是子组件的属性，是父组件传递过来约束子组件行为的
         如果要改这个属性值要在data里定义或者向父组件通信要改的值
  
  父组件向子组件通信
    1.  props  可以用对象也可以用数组，用数组只要写属性名就可以了， 用对象就要写属性的数据类型
    2.  属性名，表示从父组件接收的是什么数据
    3.  模板里使用这个数据，子组件使用父组件传递的数据只要使用属性名就可以了，属性值会在父组件里定义
    4.  父组件在子组件标签上通过 v-bind 的方式给属性赋值(v-bind:属性名="属性值")
  
  
  子组件向父组件通信
    1.  子组件定义一个方法
    2.  这个方法执行触发事件的函数(this.$emit('事件名'，传递的参数(可选)))  
    3.  父组件监听这个事件 v-on事件名=函数名 当监听到这个事件被触发了，就执行后面的函数
    4.  执行函数，子组件调用父组件数据，通信完毕



例：
  props: {
    声明接收的数据的类型
    active: Boolean,
    propONe: String
  }

子组件：
  <div>
    <!-- 接收的 active 的值 赋值给 v-show -->
    <span v-show="active">see me if active</span>
    <!-- 在子组件输出父组件给propOne赋的值 -->
    <span> {{propOne}} </span>
  </div>
父组件：向子组件传递的属性要用 v-bind ，用于解析属性值而不将属性值当作字符串来操作
  在子组件标签上传递 v-bind:属性：属性值 
  template: `
  <div>
  <!-- active的值为 true 传递给子组件的active -->
    <子组件名字 :active="true"></子组件名字>
    <!-- 给 propOne 赋值为 text1 -->
    <子组件名字 prop-one="text1"></子组件名字>
  </div>
  `

定义props:
  方法一：
    props: ['属性名'，'属性名']
  方法二：　
    props: {
      active: {
        type: Boolean,
        require: true,
        defaule: true，
        defaule () {
          return {

          }
        }，
        validator (value) {
          return typeof value = 'boolean'
        }
      }
active：  属性名
type：    属性的类型(必写)
require： true 表示这个属性父组件一定要传，子组件一定要接收，要不就报错
defaule:  true的情况下表示这个属性不传也没关系(跟require两个只能存在一个，二选一)
defaule (){}：可以接收对象，两个组件
validator(value){}：接收外部过来的props的value的数据类型是不是一致的
  return typeof value = 'boolean' 判断 active的数据类型是不是布尔型
  value：父组件传递的参数值(:active="true",一定要用v-bind)


### ref/$refs
  ref: 用于注册dom节点或子组件的引用信息
    dom: 引用信息就是dom的元素
    子组件：引用信息是子组件的实例
  <标签名 ref="注册名"></标签名>
 
  $refs：是所有注册过的ref的集合
     this.$refs.注册名  如果这个是实例那么这个方法跟 new vue的实例是一样的 

例： 
  <div>
  <!-- ref 注册子组件的实例名为comp1 -->
    <comp-one ref="comp1">
  </div>

  mounted () {
    <!-- 获取实例 -->
    <!--  调用$refs+实例名 -->
    console.log(this.$refs.comp)  vue实例
    console.log(this.$refs.comp.value)  vue实例

    console.log(this.$refs.span)  span节点
  }

  <comp-one ref="comp">
    <span ref="span"></span>  
  </comp-one>

# index.js
在 index.js 里引入的文件如果不是 index.js 就要把文件名写上，要不会出错


## vue 的 extend

extend: 延伸
vue.extend(obj): obj就是要扩展的对象

用处，当我们不想重新写一个组件时，可用这个方法覆盖掉我们不想要的数据


例：
定义一个对象 
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
    <!-- 比下面的 mounted 先调用 -->
    mounted () {
      console.log('instance mounted')
    },
    methods: {
      handleChange () {
        this.$emit('change')
      }
    }
  }

<!-- 将这个扩展对象声明成组件 -->
  const CompVue = Vue.extend(compoent)
<!-- 实例化这个组件 -->
  new CompVue({
    el: '#root',
    <!-- 给porops传递的属性值必须用 propsData -->
    propsData: {
      propOne: 'xxx'
    },
    <!-- 这个组件是可以覆盖compoent对象里的数据的 -->
    data: {
      text: 123
    },
    mounted () {
      console.log('instance mounted')
    }
  })


指定继承
<!-- 定义一个对象 -->
  const compoent2 = {
    <!-- 通过extends属性指定从哪个对象承继属性和方法 -->
    extends: compoent,
    <!-- 这个对象有自己的数据，输出时会覆盖继承对象的数据 -->
    data () {
      return {
        text: 1
      }
    }
  }
<!-- 实例化 -->
  new Vue({
    el: '#root',
    <!-- 将定义的对象注册成组件 -->
    components: {
      Comp: compoent2
    },
    <!-- 使用这个组件 -->
    template: `<comp></comp>`
  })


### $parent


### 组件实现 v-model    没听懂

  双向绑定：
  1.  子组件里有 props, 有value
  2.  $emit('事件', 触发该事件的dom的value(e.target.value))

  import Vue from 'vue'

const component = {
  props: ['value'],
  template: `
    <div>
      <input
        type="text"
        @input="handleInput"
        :value="value
      />
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data: {
    value: '123'
  },
  template: `
    <div>
      <!--
        @arguments 表示实参的集合
        @input="value = arguments" 这个表示 function () {value = arguments"}
      -->
      <comp-one :value="value" @input="value = arguments[0]"></comp-one>
      <comp-one v-model="value"></comp-one>
    </div>
  `
})



## event
  event 对象，表示事件的状态，当事件发生时 事件的元素，鼠标/键盘的状态如鼠标的位置，键盘的按下弹起
  通常与函数结合使用，函数不会在事件触发前被执行

  e.bubbles:    boolean     表示事件是否是冒泡事件
  e.cancelable  boolean     表示事件是否拥有可取消操作
  e.currentTarget     返回事件监听器触发该事件的元素
  e.eventPhase        返回事件传播的当前阶段
  e.target            返回触发该事件的元素(事件的目标节点)
  e.timeStamp         返回事件生成的日期和时间
  e.type              返回当前 Event 对象表示的事件名称 


## arguments
  arguments 表示传递给函数的实参


##  组件的高级功能

### 插槽 slot
  slot:  就是在子组件显示父组件在子组件标签内写的 html 内容

  <slot></slot> 在子组件的 div 里使用可以将父组件 的子组件标签里的内容输出出来

  <slot></slot> === <子组件标签><标签></标签></子组件标签>


  <div class="header">
    <slot name="header"></slot>
  </div>
  <div class="body">
    <slot name="body"></slot>
  </div>

  <comp-one>
    <span slot="header"></span>
    <span slot="body"></span>
  </comp-one>

### 作用域插槽 slot-scope  怎么用

### provide() 跨层级关系(爷孙关系)

### Obj.defineProperty

### enumerable


## render

  template: `
    <comp-one ref="comp">
      <span ref="span"> {{value}} </span>
    </comp-one>
  `
  template 会被编译成 render()

  编译过程：
    return createElement(
      <!-- 传入需要创建的节点的名字(可以是组件也可以是dom节点) -->
      'comp-one',
      <!-- 节点上的属性，事件都写在这个对象里 -->
      {
        ref: 'comp'
      },
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
      }, this.$slots.default)
  }



  render () {
    return this.$createElement
  }
这两种写法是一样的
  render (createElement) {
    return createElement()
  }


#### arrts

#### domProps


###  createElement() 虚拟dom
  createElement()：vue提供的创建节点的函数，每个 vue 实例里都会有这个函数，创建出来的不是真正的 html 的节点，而是 v-node


## vue-router
路由跳转  
**默认的路由形式是 hash (#/)  hash路由，默认是#号**
**带 # 号的路由是hash路由，多数是用来定位的， 不是用来做路由状态的记录，而且hash路由不能被搜索引擎解析**

在 router.js里 
  export default () => {
  return new Router({
    routes,
    <!-- 
      mode: hash
        history
        hash

     -->
    mode: 'history'
  })
}



  文件创建在这里
  src => config(router.js/routes.js)

  router.js
    路由器配置

  routes.js
    路由配置，跟路由的映射关系

安装 
  npm i vue-router -s

配置 routes
  <!-- 引入要配置路由的组件 -->
  import Todo from '../views/todo/todo.vue'
  import Login from '../views/login/login.vue'

  <!-- 配置路由映射关系，路由的映射是数组，由对象组成的数组
  每个对象都是一个路由映射 -->
  export default [
    <!-- 
      '/' :  / 就是默认路由
      redirect：重新跳转，当检测到是默认路由时跳转到指定页面
      path: 该组件跳转的页面(大概的意思就是这个组件要在哪显示)
      component: component来自于项目中的vue页面 
    -->
    {
      path: '/',
      redirect: '/app'
    },
    <!-- todo组件在 app页面显示(相当于主页) -->
    {
      path: '/app',
      component: Todo
    },
    <!-- login组件在login页面显示 -->
    {
      path: '/login',
      component: Login
    }
  ]

配置 router

  <!-- // 导入路由器的 对象 -->
  import Router from 'vue-router'
  <!-- // 导入路由配置页面 -->
  import routes from './routes'
<!-- 
    // ---------------------------------------------------------
    // 不建议用下面这种方法创建路由，因为在全局 import  路由的时候是同一个router
    // 因为我们的项目会进行服务端渲染，用这种方式会导致内存溢出
    // export default 只能使用一次，服务端渲染每次都会重新生成一个APP

    // 通过new Router 创建一个路由的实例，实例里把配置文件声明上
    // const router = new Router({
    //   routes
    // })
    // // 输出这个路由实例
    // export default router
    // ---------------------------------------------------------
  -->

  <!-- // 输出文件 返回一个 router 实例，实例里声明路由配置文件 -->
  <!-- // routes: 是路由配置项 -->
  export default () => {
    return new Router({
      <!-- 注入routes -->
      routes
    })
  }

使用router：index.js(入口文件)
  在入口文件将vue-router加载到整个应用中去

  1.  引入router 插件
      import VueRouter from 'vue-router'

  2.  使用 router 插件 
      Vue.use(VueRouter)
  
  3.  引入创建路由的方法
      import createRouter from './router.js'
  
  4.  创建路由对象
      1.  方法一：
          const router = createRouter()
      2.  方法二： 
          const router  = new VueRouter({
            <!-- 注明配置文件名 -->
            routes: routes,
            <!-- 注册跳转时默认加载的类名 -->
            linkActiveClass: 'active'
          })

  5.  注入路由，将创建的路由注入到根节点的vue实例中，在实例中挂载 router对象
      new Vue({
        <!-- 注册路由 -->
        router,
        render: (h) => {
          h(App)
        }
      }).$mount('#root')

  6.  其他组件通过 provider 或者 类似的方式使用根节点中挂载的 router 对象

  7.  router 内置组件
      1.  router-link: 跟 a 标签是一样的效果
          1.  :to 相当于 a 里的 href 
            <router-link to='./home'>Home</router-link>
            <a href='/home'>Home</a>

          2.  replace： 页面切面不留下历史记录
            <router-link :to='./home' replace>Home</router-link>
          
          3.  tag:  渲染成相应的标签
            <router-link :to='./home' tag="li">Home</router-link>
            <li>Home</li>

          4.  active-class: u-link-Active(默认类名)，跳转激活后添加的样式
                在 router.js 里设置 linkActiveClass: 'u-link-Active'
            <router-link :to='./home' active-class="u-link-Active">Home</router-link>

          5.  exact: 严格模式 
            <router-link :to='./home' exact>Home</router-link>

      2.  router-view: 占位符 我们声明的组件的路径还有组件，那么这个组件将显示在 <router-view/>所占据的地方(或者说当路由配置到这个路径的时候组件将显示在占位符所在的位置)/跳转显示的部分，将配置到的组件显示在这个里面  
        

          
### router/routes/route
  route：单个路由
    路由对象
    home按钮 => home内容 是一组路由
    about按钮 => about内容 是另一组路由

  routes：多个路由
    路由配置项，用于配置多个路由对象
    [
      {
        home按钮 => home内容 是一组路由
      },
      {
        about按钮 => about内容 是另一组路由
      }
    ]

  router:
    路由实例
    router 是一个机制，相当于管理者用于管理路由, routes 是静止的， 当请求(按钮)来了,由 router到 routes中去寻找对应的内容


  模板中的
    router-link: 对应按钮
    router-view: 对应内容，没有指定按钮就去找默认的路径
      默认路由：
        /： 表示默认路由
        redirect： 指明默认路由路径
        {
          path: '/',
          redirect: '/组件名'
        }


## new Router参数
<!-- // 输出文件 返回一个 router 实例，实例里声明路由配置文件 -->
<!-- // routes: 是路由配置项 -->
export default () => {
  <!-- 
  // 返回一个router实例
  // mode: 有三个值。默认是 hash, url带# history 不带#
  // mode: hash   使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
  // mode: history  依赖 HTML5 History API 和服务器配置
  // mode: abstract 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
  // base:'/base/' 在路径上 加上 base/ 例： base/app
  // linkActiveClass  router-link 跳转后加载到标签上的类
  // linkExactActiveClass  区别是上面那个是区域加载(意思是点击了儿子同进也会给父亲加上这个类，)，这个是精确加载，点击谁就给谁加，
  // scrollBehavior  页面跳转需不需要滚动
  //   to:  跳转时要去往的路由
  //   from:   从哪个路由跳转
  //   savedPosition:  保存过的路径(如果去往过这个路由在这个路由里产生了滚动的行为，会保存该路由滚动过的位置，跳转后会直接定位到这个位置)
  // query:  页面请求时的参数 地址中 ? 号后面的参数 就是了
  // parseQuery(query)  将字符串转成 json Obj 方法 query  是字符串
  // stringifyQuery(obj) 将对象转成字符串
  // fallback: 在浏览器不支持 history 模式时自动转换成 hash 模式，推荐使用 
  -->
  return new Router({
    routes,
    mode: 'history',
    base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      <!-- // 如果有滚动行为 -->
      if (savedPosition) {
        <!-- // 返回到滚动的位置 -->
        return savedPosition
      } else {
        <!-- // 如果没有滚动(或者说没有跳转过这个路由)，就返回到页面顶部 -->
        <!-- // x/y 是坐标 -->
        return {
          x: 0,
          y: 0
        }
      }
    },
    fallback: true
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}


##  router  参数传递

1.  配置
  routes.js
  <!-- 
    '/' :  / 就是默认路由
    redirect：重新跳转，当检测到是默认路由时跳转到指定页面
    path: 该组件跳转的页面(大概的意思就是这个组件要在哪显示)
    component: component来自于项目中的vue页面
    name: 路由的命名，这个名字可以跟path 没有任何的关系，可以使用这个进行跳转 
      使用： <router-link :to={name:'app'}>，要用v-bind进行数据绑定
    meta:{
      title:  组件标题信息
      description: 组件描述信息
    } 用于保存路由里的信息(页面的原信息)，这些信息用于处理seo的东西

    children: [
      {
        不用加 /
        path: 'test',
        component: Login
      }
    ]     用于存储 /app 的子路由的信息，子组件要想显示需要在父组件(这里是todo)里写一个占位符(<router-view/>)
  -->
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    name: 'app',
    meta: {
      title:  'this is app',
      description: 'abcdefg'
    },
    children: [
      {

      }
    ]
  },


2. 传参
  <!-- 
    /:id: 这个id是变量名，
          <router-link to='/app/123'>，to后面的格式必须跟path一样，123是传递给变量的值 
          在 mounted 里  console.log(this.$route) 可以打印当前的信息 params:里包含的就是ID的信息
    query: 地址栏里 以 ？开始的信息就是 query 信息是键值对

    props: true 定义为true之后 会将params或者 :id作为props传递到当前组件里，
          组件todo.vue
            声明props 
              props: ['id']
            打印
              mounted() {
                console.log(this.id)  // 123
              }

    props: {
      id: '456',
    }

    props: (route) => ({
      id: route.query.b   // 465  b 是query的键名
    })  
   -->
  {
    path: '/app/:id',
    props: true,
    component: Todo,
    name: 'app',
    meta: {
      title:  'this is app',
      description: 'abcdefg'
    },
    children: [
      {

      }
    ]
  },


## 路由高级使用--导航守卫
  router-view name="a"    适用于三栏布局
    name:

  页面上有多个 router-view  配置文件的更改
  {
    path: '/app',
    props: true,
    <!-- component: Todo, -->
    components: {
      <!-- 没有 name 的 router-view -->
      default: Todo,
      <!-- 有 name 的 router-view -->
      a: 组件名(例： Login)
    }
  },
  {
    path: '/app',
    props: true,
    <!-- component: Todo, -->
    components: {
      <!-- 没有 name 的 router-view -->
      default: Login,
      <!-- 有 name 的 router-view -->
      a: 组件名(例： Todo)
    }
  }

### 导航守卫

在入口文件里进行守卫注册 
有router对象的地方注册

1.  router 的钩子
  全局的钩子，每次路由跳转之后都会触发
    按顺序依次是 beforeEach => beforeResolve => afterEach

  <!-- 
    beforeEach   路由守卫进行跳转时触发这个钩子

    beforeResolve

    afterEach   路由跳转完成之后触发
   -->
  <!-- 创建一个 router 对象 -->
  const router = createRouter()
  <!-- 每次路由守卫进行跳转时触发这个钩子 -->
<!-- beforeEach里可以进行数据校验 -->
  router.beforeEach((to, from, next) => {
    <!-- 必须先执行next()之后路由才会真正的跳转，不执行这个函数是不会跳到到下一个路由的 -->
    <!-- 
    to: 去往某个地方
      fullPath: 完全路径地址
      to.fullPath: 去往完全路径地址
    next():执行操作 括号里是要执行的语句或路径
      next('/login'): 执行跳转到 login 页面  可以用于判断用户是否登录
      next() 不跟参数是直接跳转
      next({
        path: '/login',
        replace   ??????????????????????????????
      })
     -->
    if (to.fullPath === '/app) {   <!-- 当路径不是我们想要去的地方就不执行 next() -->
      next('/login)
    } else {
      next()  <!-- 不跟参数是直接跳转 -->
    }
  })
  <!-- 

   -->
  router.beforeResolve((to, from, next) => {
    next()
  })
<!-- 路由跳转完成之后触发 -->
  router.afterEach((to, from) => {

  })

2.  在 routes 里也有钩子
  <!-- 
    beforeEnter：进入这个路由之前触发，必须执行 next(),当进入这个组件之后能打印出这个钩子， 
        这个钩子在 beforeEach 和 beforeResolve 之间执行
        也就是 beforeEach => beforeEnter => beforeResolve
   -->

  {
    path: '/app',
    component: Todo,
    <!--  -->
    beforeEnter (to, from, next) {
      next()
    }
  }


3.  在组件里执行路由的钩子
  <!-- 
    直接在script里声明就可以 有 next 一定要执行 next 否则路由会被中止

    beforeRouteEnter 进入本组件前触发，获取页面要用到的数据，获取到数据才可以真正的显示页面，触发时本组件的实例还未创建无法获取 this，没有执行next之前组件没有真正被创建，
      next(vm => {

      })  next 执行一个回调函数 ,函数接收一个参数 vm ，vm是组件被创建之后的this对象，返回 vm.属性名

    beforeRouteUpdate  当前组件被不同的组件重复调用时触发，相当于一个公共组件，将代码 beforeEnter 钩子

    beforeRouteLeave: 路由离开本组件时调用
      global.comfirm('are you sure?')点击别的组件离开本组件是弹出are you sure?进行询问，取消不离开，确定就是离开，
      global.comfirm 类似于 window.alert
  -->

  export default {
    beforeRouteEnter (to, from, next) {
      next()
    }
    beforeRouteUpdate (to, from, next) {
      next()
    }
    beforeRouteLeave (to, from, next) {
      if(global.comfirm('are you sure?')) {
          next()
      }
    }
  }


### 钩子执行顺序 
1.  首页进行 user 页面
    1.  全局的 beforeEach 最先触发
    2.  然后是配置(routes)里的 beforeEnter
    3.  然后是组件里的 beforeRouteEnter
    4.  然后是全局的 beforeResolve
    5.  然后是全局的 afterEach
    6.  然后是 mounted
2.  user 页面回到首页
    1.  组件里的 beforeRouteEnter
    2.  全局的 beforeEach 
    3.  全局的 beforeResolve
    4.  全局的 afterEac


##  异步组件 import  syntax-dynamic-import
  异步组件： 不同的路由只加载对应的部分代码(核心代码是肯定要加载的，对应的业务代码到要访问的时候才加载)

操作步骤
  routes.js
    不直接引入组件，
    在 component 的属性值里使用 import 函数引入组件
    component 接收一个函数
    需要安装一个插件，要不会不认识 import 的这种写法
      npm i babel-plugin-syntax-dynamic-import -d
    在 .babelrc 里的 plugins 里加上这个插件
      Plugins: [
        transform-vue-jsx,
        syntax-dynamic-import
      ]
    app.vue 里取消掉要异步加载的组件
  {
    path: '/app',
    component: () = > import ('组件路径')
  }



## transiton 过渡动画
  在 <router-view>外面包一层 transitoin,所有的组件都有过渡动画效果，

  v-enter           进入过渡效果刚刚开始的那一刻。在元素被插入或者show的时候生效，在下一个帧就会立刻移除
  v-enter-active    表示进入过渡的结束状态。在元素被插入时生效，在 transition/animation完成后移除
  v-leave           离开过渡的开始那一刻。在离开过渡被触发时生效，在下一个帧移除
  v-leave-active    离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation完成后移除

例：被transition组件包含的节点从隐藏到显示(进入过渡)，会依次添加一些类
  开始
    添加 v-enter
  下一帧
    删除 v-enter
    添加 v-enter-acitve
  过渡完成
    删除 v-enter-acitve

例：如果是从显示到隐藏（称之为离开过渡），它会被依次添加一些类class
  开始
    添加 v-leave
  下一帧
    删除 v-leave
    添加 v-leave-acitve
  过渡完成
    删除 v-leave-acitve


<transition name="fade">
  <todo />    单个组件有动画效果 
</transition>

<transition name="fade">
  <router-view />
</transition>

在样式里定义动画

.fade-enter-active, .fade-leave-active
  transition: opcity 0.5s
.fade-enter,  .fade-leave-to
  transition: 0

## vuex
  安装
    npm i vuex -s
  
  创建 store.js文件
```javascript

  // 引入 vuex 插件
  import Vuex from 'vuex'
  // 引入vue
  import Vue from 'vue'
  // 使用vuex插件
  Vue.use(Vuex)

  // 创建 vuex store 对象
  // store: 仓库，用于存放应用中的大部分的状态(state)
  //  state: 状态
  const store = new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    }
  })
  // 导出模块
  export default store


```

  引入 store 文件：
    index.js
      import store from 'store路径'

  注册：
```javascript
    new Vue({
      // 注入 router
      // 在根节点里的 vue 实例中挂载 router 对象，在其他组件里就可以拿到router了
      router,
      // 注入srore文件
      store,
      render: (h) => h(App)
    }).$mount('#root')
```
  使用：
    在组件里使用 this.$store.state.属性名 来调用这个全局的对象
    

  修改store里的state 属性值
    this.$store.commit('mutations里的函数名'，函数接收的参数)

  通过 export default () => {
    return new Vuex.Store({

    })
  }   这种方法生成的 store对象可以将 vue.use(vuex) 使用插件的方法放到入口文件中使用
    index.js
      import Vuex from 'vuex'
    <!-- 获取创建store方法 -->
      import createStore from 'store.js的路径'
    <!-- 创建store -->
      const store = createStore()


### vuex   state   getters

#### state
  在store 里创建 state.js
```javascript
// 导出模块
// state 就是一个初始的 JS 对象
export default {
  count: 0,
  firstName: 'Hu',
  lastName: 'Wei'
}
```


#### getters
  getters 相当于 computed 用于生成一些直接在应用里可以用的数据,在组件的computed 里使用getters里的方法

  具体用法： 
    computed里声明一个方法，方法名就是想要调用的getters里的方法名(想调用哪个就用哪个方法名)
    这个方法返回一个调用值
      return this.store.getters.方法名

  在 store 里要引入这个文件


```javascript
// 导出getters对象模块
export default {
  fullName (state) {
    // 返回值用字符串拼接的方法写
    return `${state.firstName} ${state.lastName}`
  }
}

```
在组件的 computed 里
  fullName () {
    return this.$store.getters.fullName
  }


#### mutations
修改 state 里的数据尽量都放到 mutations里来做 

mutatioin 非常类似于事件：每个 mutation 都有一个字符串的事件类型(type)和一个回调函数(handler)，这个回调函数就是我们实际进行状态更改的地方，会接收 state 作为第一个参数

mutations 里不能有异步的代码，要进行异步操作必须放到 actions 里

updateCount (state, num): mutations里没有第三个参数的说法，要想传多个参数，第二个参数可以写成对象形式

updateCount (state, {num, num2})


```javascript

// 导出模块
// mutations 也是一个对象
export default {
  updateCount (state, num) {
    state.count = num
  }
}

```

#### action
action: 跟 mutations 差不多都是用于修改数据的，不同的是  action可以进行异步数据修改

action 提交的是 mutation,而不是直接更改状态，唯一能更改状态的是 mutations

数据请求可以写在这里

操作同一个数据里 action 和 mutations 传参的方法必须一样，就是如果用对象就都用对象，否则会出问题

updateCountSync (store, {})  只能接收两个参数，第一个参数是 store 对象 ，第个二参数可以是单个参数也可以是对象，对象里包含多个参数

```javascript
action.js
// 导出模块 actions也是一个对象
// data: 是数据的集合，用于接收组件里传递过来的数据的集合
// 提交 mutation 的时候，用这个集合.属性值来添加形参(data.num/date.time)
// num time 都是形参，需要从外面接收实参进来
export default {
  //
  updateCountAsync (store, data) {
    setTimeout(() => {
      // 将 updateCountAsync 方法提交到 mutations 里 相当于在 mutations 里创建了一个方法 updateCountAsync
      // 这个方法接收一个参数 num
      store.commit('updateCountAsync', data.num)
    }, data.time)
  }
}

store.js
  import action from 'action.js的地址'
  // 导出模块
  export default () => {
  return new Vuex.Store({
    action
  })
}


组件里
  mounted () {
    this.$store.dispatch('updateCountAsync', {
      num: 5,
      time: 2000
    })
  }
```

#### commit
  commit： 用于触发 mutations 里的方法，相当于事件
    相当于组件里执行一个函数，这个函数的语句是触发commit事件，这个事件触发 mutations 里的方法 function 就是 mutations里的方法名，
    $store.commit('function'，{形参： 实参})

  
#### dispatch
  dispatch: 跟  commit 类似，用于触发 actions 的方法



#### 组件内快捷方便的使用 store 方法

```javascript
// mapActions/mapMutations对应的是操作，操作要写在 methods 里面
// mapState/mapGetters对应到属性的计算，所以写在 computed 里
  <script>
    import {
      mapState,
      mapGetters，
      mapActions,
      mapMutations
    } from 'vuex'
    mounted () {
      // 直接调用就好了，直接传参就好
      this.updateCountAsync({
        num: 5,
        time: 2000
      })
    }
    methods: {
      // 获取这两个文件里的方法 ['方法名']
      ...mapActions(['updateCountAsync'])
      ...mapMutations(['updateCount'])
    }
    computed: {
      // 同名的用数组声明就可以了
      ...mapState(['state里的属性名'])
      // 不同名的用对象声明 
      ...mapState({
        属性名1：'字符串'

        方法名：(state) => state.count
      }),
    // 这两个是一样的  都是获取 state 里 count 的值 
      count () {
        return this.$store.state.count
      },
      ...mapGetters(['fullName'])
    }
  </script>

```

**env无法使用一些没有定稿的语法**
**使用一些没有定稿的语法需要安装 npm i babel-preset-stage-1 -d   preserts 里 env 下面加一个 stage-1 就可以了**

### vuex 模块 modules
模块里还可以再添加模块 

  export default () => {
    return new Vuex.Store({
      state,
      mutations,
      getters,
      actions,
      modules: {
        modulesName: {
          namespaced: true,
          state: {
            属性名：属性值
          }
          mutations,
          getters,
          actions,
          mudules: {
            mudulesChildrenName: {
              state: {
                属性名：属性值
              }
              mutations,
              getters,
              actions,
            }
          }
        }
      }
    })
  }

```javascript
modules: 分模块，这里面可以声明不同的 state/actions/mutations/getters

namespaced: 封闭作用域，这样不同的模块都可以用同一个方法名

state：this.$store.state.a.text/state.a.text

mutations： 默认会将模块里的 mutations 加入到全局的 mutations 匿名空间里，加上 namespaced: true，就成为了模块里的 mutations,调用时要加上模块名+ '/' + 要调用的方法名 

actions：

getters：模块里的getters 可以接收三个参数 
  state: 该模块的 state
  getters: 所有的 getters 方法
  rootState:  全局的 state,可以通过 rootState.模块名.属性名的方法获取别的模块的属性值

模块可以加名字，加了名字模块就有了作用域

state 调用：在组件里，调用state是在computed(计算属性里)里，写一个方法  然后在模板里输出这个方法名 v-text="方法名" 
  textA: 是方法名
  a: 是模块名
  text：是模块里 state 里的属性名
  textA (): {
    return this.$store.state.a.text
  }
  ...mapState({
    textA: (state) => state.a.text
  })

mutations 调用：组件调用模块的mutations
  在方法里先获取 mutations 里的方法
    methods: {
      // 全局的调用方法 没有加 namespaced: true 时
      ...mapMutations(['updateText'])
      // 模块间的调用方法 加上 namespaced: true 时
      ...mapMutations(['a/updateText'])
    }
  然后调用获取到的方法并传参
    mounted(){
      // 全局的调用方法 没有加 namespaced: true 时
      this.updateText('123')
      // 模块间的调用方法 加上 namespaced: true 时
      // 通过变量的形式
      this['a/updateText']('123')
    }

getters 调用：组件里
  computed: {
    // 获取这个方法
    ...mpaGetters({
      // 模板里可以直接使用 textPlus
      textPlus: 'a/textPlus'
    })
  },
  mounted () {
    // 使用这个方法
    console.log(this.textPlus)
  }

actions 调用：组件里
  // 获取模块里 actions 里的方法
  methods: {
    ...mapActions(['a/add'])
  }
  // 调用 
  mounted () {
    this['a/add']()
  }

export default () => {
  return new Vuex.Store({
    state: defauleState,
    actions,
    mutations,
    getters,
    modules: {
      a: {
        namespaced: true,
        state: {
          texgt: 1
        },
        mutations: {
          // 这里的 state 是该模块的 state 不是全局的 state
          // text：接收更改 state.text 的值的参数
          updateText (state, text) {
            console.log(state),
            state.text = text
          }
        },
        getters: {
          textPlus (state，getters, rootState) {
            // a 模块的 text 的值 加上 b 模块的 text 的值
            console.log(state.text + rootState.b.text)
            return state.text + 1
          }
        },
        actions: {
          // ctx： state/commit/rootState
          add (ctx) {
            // 触发模块内的 mutation 的方法
            // 也就是说这里声明 updateText 方法只会在这个模块内的mutations 里去找， 不会在全局去找
            commit('updateText', rootState.count)
            // 想要在模块内调用 全局的 mutations方法 必须 设置 root: true
            // {num: 5} 传参 ，组件里就不用传参了
            // {num: 5}： 之所以这样传参，是因为updateCount 接收是一个对象参数
            commit('updateCount', {num: 5}, {root: true})
          }
        },
        modules: {

        }
      },
      b: {
        state: {
          text: 2
        }，
        actions: {
          // commit: 参数
          // 调用模块间的 mutation 也必须声明 root: true
          textAction(commit) {
            commit('a/updateText', 'test text', {root: true})
          } 
        }
      }
    } 
  })
}


```

### vuex 动态注册模块 
  index.js

  <!-- 注册新的模块 -->
  <!-- c 是新注册的模块名 -->
  store.registerModule('c', {
    state: {
      text: 3
    }
  })

  组件里调用这个新模块
  computed: {
    ...mapState({
      textC: state => state.c.text
    })
  }


### vuex 热加载
**import 只能写在最外层，不能在业务代码的逻辑里用 import业务逻辑里可以用 require,因为导出是export default，所以这里用 require()后面要加上default 就是 require().default**

export default () => {
  <!-- 因为这个 store 是在方法里定义的，所以要在声明的下面加上热加载 -->
  const app = new Vuex.Store({
    state: defaultState,
    mutations: mutations,
    getters,
    actions,
  })
<!-- 
  热加载判断，加入需要热加载的文件 
  回调函数用于开启热加载功能
  -->
  if ( module.hot) {
    module.hot.accept([
      'state.js的地址'
      'mutations.js的地址'
      'getters.js的地址'
      'actions.js的地址'
    ], () => {
      <!-- 重新加载或者说引入(请求)state/mutations/getters/actions文件 -->
      const newState = require('state.js的地址').default
      const newMutations = require('mutations.js的地址').default
      const newGetters = require('getters.js的地址').default
      const newActions = require('actions.js的地址').default
      <!-- 动态更新这些重新加载的模块 -->
      store.hotUpdata({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
<!-- 返回这个重新加载的 store -->
  return store
}


### vuex   api

#### registerModule
<!-- 绑定(注册)新的状态模块 -->
  store.registerModule('模块名'，{模块属性})

#### unregisterModule
<!-- 解除绑定(销毁)模块 -->
  store.unregisterModule('模块名')


#### watch
<!-- 
  参数一：是function，是一个方法
    function(state): 这个方法的第一个参数是 state
                     方法的语句是监听想要监听的 state 的属性
    (state) => state.count + 1：　function(state) {return state.count + 1}
  参数二：也是一个方法，这个方法在第一个方法的返回值有变化的时候才会执行这个方法

  store.watch: 该方法的接收两个方法参数，第一个方法用于监听想要监听的store数据，第二个方法用于监听第一个方法的返回值
 -->
  store.watch((state) => state.count + 1, (newCount) => {
    console.log('newCount watched:', newCount)
  })

#### subscribe  在插件里使用
subscribe: 订阅(监听) mutation 的变化，只要有 mutation 被调用都将触发这个方法，该方法执行一个回调函数

mutation：回调函数接收的参数，表明监听是什么

state：回调函数接收的参数，获取最新的状态

mutation.type：subscribe方法监听的 mutation 被调用的方法

mutation.payload：subscribe方法监听的 mutation 被调用的方法接收的参数

  store.subscribe((mutation, state) => {
    <!-- 获取被调用的 mutation 里的方法 -->
    console.log(mutation.type)
    <!-- 获取被调用的 mutation 里的方法接收的参数 -->
    console.log(mutation.payload)
  })

#### subscribeAction 在插件里使用
subscribeAction: 监听 action 的变化, 执行一个回调函数

action: 表明监听是什么

state: 获取最新的状态变化

action.type：subscribe方法监听的 action 被调用的方法

action.payload：subscribe方法监听的 action 被调用的方法接收的参数

store.subscribeAction((action, state) => {
      <!-- 获取被调用的 action 里的方法 -->
    console.log(action.type)
    <!-- 获取被调用的 action 里的方法接收的参数 -->
    console.log(action.payload)
})

### 如何自定义vuex的插件

  在声明 store 的时候，可以自定义插件

plugins: 声明自定义插件的集合，自定义插件都是放在这里的， 

自定义插件是一个方法，该方法获取一个参数(store),这个store是全局的对象store，该方法只执行一次，

插件将在 vue 初始化的时候被调用(在 beforeEach 之前被调用 )
  
  export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations: mutations,
    getters，
    actions,
    <!-- 自定义插件 -->
    plugins: [
      (store) => {
        console.log('')
        store.subscribe，
        store.subscribeAction
      }
    ]
  })
}




## vue-resource
  npm install vue-resource --save-dev

## devDependencies
  开发依赖，打包时不会打包这些文件

  -D  表示安装开发依赖

## dependencies
  用户依赖,打包时要打包这些东西，开发时也要用
  -S  表示安装用户依赖


#   服务端渲染

build => webpack.config.server.js 不需要关心是开发环境还是正式环境，只需要在 node 端上运行就行了