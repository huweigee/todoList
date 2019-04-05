// 引入autoprefixer 自动添加私有前缀
const autoprefixer = require('autoprefixer')

// 导出模块
module.exports = {
  // 插件
  plugins: [
    // 调用私有前缀方法
    autoprefixer()
  ]
}
