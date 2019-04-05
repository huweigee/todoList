<template>
  <!-- 
    v-bind:class 动态绑定class 
    根据 todo.completed(true/false) 的状态来判断要不要加上 completed 这个类名
   -->
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <!-- 
      checkbox:  多选框
      todo.completed
      v-model: 双向绑定这里的数据变化会影响到父组件completed的值，这里将 todor 属性 completed 赋值给 v-model,用于判断是否选中
     -->
    <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    />
    <!-- label 用于显示 todo 的 内容 -->
    <label>
      {{todo.content}}
    </label>
    <!-- button 的点击事件触发 deleteTodo 函数 -->
    <button class="destory" @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
  // @props: 接收父组件传递的参数
  // @todo: 父组件将 todo 传递给子组件，对象类型，必须要传
  // @todo: 里包含 todo.id todo.content todo.completed  todo的属性一起传过来，子组件可以用
  props:{
    todo: {
      type:Object,
      require: true
    }
  },
  methods: {
    //声明deleteTodo方法 
    deleteTodo () {
      // 向父组件触发 del 事件，并传递 this.todo.id 给父组件
      // this.todo.id: 是触发该点击事件的元素的索引
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-item{
  position relative
  background-color #fff
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,0.06)
  &:hover{
    .destory:after{
      // after的内容是 X 
      content: '×'
    }
  }
  label{
    // 合并空白符序列，保留换行符
    white-space: pre-line;
    // 允许在单词内换行
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  &.completed{
    label{
      color: #d9d9d9;
      // 删除线
      text-decoration line-through
    }
  }
}
.toggle{
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  // 外观
  appearance: none;
  outline none
  &:after{
    content url('../../assets/images/round.svg')
  }
  &:checked:after{
    content url('../../assets/images/done.svg')
  }
}
.destory{
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  background-color transparent
  appearance none
  border-width 0
  cursor pointer
  outline none
}
</style>


