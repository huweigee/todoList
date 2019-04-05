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
