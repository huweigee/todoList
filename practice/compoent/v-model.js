import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
    <div>
      <input
        type="text"
        @input="handleInput"
        :value="value"
      />
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
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
      <comp-one :value="value" @change="value1 = arguments[0]"></comp-one>
      <comp-one :value="value" v-model="value1"></comp-one>
    </div>
  `
})
