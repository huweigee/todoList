<template>
  <div class="helper">
      <!-- 有多少个节点剩下，相当于有多少个未完成的选项(completed) 
        unFinishedTodoLength 将这个函数的返回值作为插值插入模板里
      -->
    <span class="left">
      {{ unFinishedTodoLength }} items left
      <span class="tabs">
        <!-- 遍历出三种状态 
          state: 数组的值，用于显示当前的状态(所有，未完成，完成)
          states: 数组名 放置状态
          key: key是唯一的，每次循环都是从key开始，优化性能，这里用 state。因为 state的值都不一样
          class: 选中和未选中 (filter===state)为true 则加上 active,否则为空，state没有加引号说明这是变量，根据循环给三个span赋值三个类名
          click：该事件执行toggleFilter方法，将数组的值作为参数传递给函数
          每次点击将循环的数组的值(state) 当作参数传递给函数
        -->
        <span 
          v-for="state in states"
          :key="state"
          :class="[state, filter === state ? 'actived' : '']"
          @click="toggleFilter(state)"
        >
          {{state}}
        </span>
      </span>
    </span>
    <span
      class="clear"
      @click="clearAllCompleted"
    >
    Clear Completed
    </span>
  </div>
</template>

<script>
export default {
  // 接收父组件传递的参数
  // type：接收参数的类型
  // require：该参数是否必须要传
  // 接收到父组件传递的数组 todos，包含数组的值
  // filter: 父组件传递过来的值是 all
  props: {
    filter: {
      type: String,
      require: true
    },
    todos: {
      type: Array,
      require: true
    }
  },
  computed: {
    // filter(callbackfunction): 过滤函数并返回新数组(删除不符合条件的元素，将符合条件的元素组成一个新数组)
    // callbackfunction：执行过滤条件
    // todo => !todo.completed function(todo)(return todo.completed = false)
    // !todo.completed  completed 初始值是 false 非 就是true   true 为选中状态
    unFinishedTodoLength() {
      console.log(this.todos.filter(todo => !todo.completed).length)
      // 返回新数组的长度
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  data () {
    return {
      // 三种状态
      // all:  全选
      // active: 没完成的
      // completed: 完成的
      states: ['all', 'active', 'completed']
    }
  },
  methods: {
    // 选中函数
    toggleFilter (state) {
      // 向父组件 触发 toggle 事件(父组件将在 标签tabs上监听这个事件(toggle)),并传递 state(状态)
      // state: 是下一个filter的状态
      // 
      this.$emit('toggle', state)
    },
    // 清除函数
    clearAllCompleted () {
      this.$emit('clearAllCompleted')
    }
  }
}
</script>

<style lang="stylus" scoped>
.helper{
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing: antialiased
}
.left, .clear, .tabs{
  padding 0 10px
  box-sizing border-box
}
.left, .clear{
  width 150px
}
.left{
  text-align left
}
.clear{
  text-align right
  cursor pointer
}
.tabs{
  width 200px
  display flex
  justify-content space-around
  * {
    display inline-block
    padding 0 10px
    cursor pointer
    border 1px solid rgba(175,47,47,0)
    &.actived{
      border-color rgba(175,47,47,0.4)
      border-radius 5px
    }
  }
}
</style>
