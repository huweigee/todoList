// jsx无法写 css 只能引用外部 css 文件
import '../assets/styles/footer.styl'

// import classname from '../assets/styles/footer.styl'

// 导出文件出口
export default {
  data () {
    return {
      author: 'HW'
    }
  },
  render () {
    // 这里的 return 后是小括号
    return (
      <div id="footer" >
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
