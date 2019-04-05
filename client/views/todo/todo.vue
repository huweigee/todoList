<template>
  <!-- section区域标签 
    @autofocus：自动选中(自动聚焦)
    @placeholder: 输入框中的默认值(类似 value)，一有个输入就消失
    @keyup.enter: 按下回车才可以输入
  -->
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么?"
      @keyup.enter="addTodo"
    />
    <!-- item 里面没有内容可以写成单标签模式 
      item： 是子组件，用于显示每一列要显示的内容
      v-bind:todo="todo" 将data里的属性todo的值给标签的属性todo
      遍历 todos 数组，将数组的值 todo 动态绑定给 todo属性用于给props里的todo传值
      数组的值 todo 包含 todo.id todo.content todo.completed.props接收这个值并接收这些属性
      @del 监听该子组件是否触发这个事件,并接收子组件传递过来的参数 事件源是 item 这个子组件 事件是 del 事件执行是 deleteTodo
    -->
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    />
    <!-- 
      todos: 将数组传递给子组件tabs
      filter：将 filter 传递给子组件 tabs 
     -->
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted">
    </tabs>
    <!-- <router-view /> -->
  </section>
  
</template>

<script>
  // 引入 Item 组件，加载其内容
  import Item from './item.vue'
  import Tabs from './tabs.vue'

  // 定义一个ID 直到数组索引的作用
  let id = 0
  export default {
    data () {
      return {
        todos: [],
        filter: 'all'
      }
    },
    components: {
      // 注册组件
      Item,
      Tabs
    },
    computed: {
      filteredTodos () {
        if (this.filter === 'all') {
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      // 声明 addTodo 方法
      addTodo (e) {
        // 在 数组 todos 里的第一行插入数值(这里的数值是对象)
        this.todos.unshift({
          // 插入数组的索引加 1
          id: id++,
          // 插入数组的内容是  当前元素的 value 值，
          // @e: 是 event是事件的对象
          // @e.target：触发事件的当前元素(这里是 input 触发的事件 是事件源)
          // @e.target.value： input 触发了 键盘按下事件 执行函数来获取 input 输入框里的值
          // @trim()：去除空格
          content: e.target.value.trim(),
          // 插入数组的内容是否是完成状态
          completed: false
        })
        // 清空事件元素的值
        e.target.value = ''
      },
      // 监听到子组件触发了事件 在父组件执行事件触发后的方法
      // id 用于接收子组件传递过来的参数
      // splice(index， howmany, item)用于添加或删除数组并返回新的数组(会改变当前数组)
      // index: 必需，从数组的哪里添加或删除 必须是数字
      // howmany: 必需，规定应该删除多少元素，可以是字符串 '0'
      // item: 可选，可以有多个，要添加到数组的新元素
      // this.todos.splice(查找的元素下标，删除几个)
      // findIndex(callbackfunction)用于查找符合回调函数条件的数组元素的下标，查找到第一个返回值为true之后就不再执行并返回该值的索引
      // todo => todo.id === id findIndex的回调函数 functoin (todo){return todo.id===id},该回调函数用于判断当前数组的索引是否与子组件传递回来的索引相等
      // todo 是数组的元素
      deleteTodo(id) {
        // 用于 查找数组中第一个 数组的索引 === 传递回来的索 并删除这个值
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleFilter(state) {
        this.filter = state
      },
      clearAllCompleted () {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  // 抗锯齿，让文字更清晰
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
