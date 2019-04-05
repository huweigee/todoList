import Vue from 'vue'

const ChildComponent = {
  template: `<div>child component</div>`
}
const component = {
  // tempalte: `
  //   <div :style="style">
  //     <slot></slot>
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,
  components: {
    ChildComponent
  },
  tempalte: `
  <div :style="style">
    <slot vaule="456"></slot>
    <ChildComponent />
  </div>
`,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
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
  // template: `
  //   <div>
  //     <comp-one>
  //       <span>this is content</span>
  //       <span slot="header">this is content</span>
  //       <span slot="body">this is content</span>
  //     </comp-one>
  //   </div>
  // `
  template: `
  <div>
    <comp-one>
      <span></span>
      <!--
      <span slot-scoped="props">{{props.value}}</span>
      -->
    </comp-one>
  </div>  
`
})
