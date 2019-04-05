// 导出getters对象模块
export default {
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}
