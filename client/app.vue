<template>
  <!-- 组件要显示的内容 -->
  <div id="app">
    <div id="cover">
    </div>
    <!-- 使用组件 -->
    <Header></Header>
    <todo></todo>
    <!-- <router-link to="/app">app</router-link> -->
    <!-- <router-link to="/login">login</router-link> -->
    <router-view />
    <Footer></Footer>
  </div>
</template>

<!-- 控制组件变化 -->
<script>
  // 引入 header 组件
  import Header from './layout/header.vue'
  // 引入 Footer 组件
  import Footer from './layout/footer.jsx'
  // 引入 Todo 组件
  import Todo from './views/todo/todo.vue'

  console.log(Header.__docs)
// 要导出内容  export default 导出命令 
  export default {
    // 声明组件(注册组件)
    components: {
      Header,
      Footer,
      Todo
    },
    data () {
      return {text: 'abc'}
    }
  }
</script>

<!-- 控制组件外观 
  lang: 指定CSS预处理器
  scoped：指定样式只在本组件内生效
-->
<style lang="stylus" scoped>
  #app
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    #cover
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: #999;
      opacity: 0.9;
      z-index: -1;
</style>
