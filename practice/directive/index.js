import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div>{{text}}</div>
      <div v-text="text"></div>
      <div>{{html}}</div>
      <div v-html="html"></div>
      <div v-show="active">{{text}}</div>
      <div v-if="active">{{text}}</div>
      <div v-else-if="text === 0">Else-if: {{text}}</div>
      <div v-else>else content</div>
      <ul>
        <li v-for="(item, index) in arr">
          {{item}}:{{index}}
        </li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">
          {{val}}:{{key}}:{{index}}
        </li>
      </ul>

      <input type="text" v-model="text" />
      <input type="text" v-model.number="text1" />
      <input type="text" v-model.trim="text2" />
      <input type="text" v-model.lazy="text3" />
      <input type="checkbox" v-model="active" />
      <div>
        <input type="checkbox" :value="1" v-model="arr" />
        <input type="checkbox" :value="2" v-model="arr" />
        <input type="checkbox" :value="3" v-model="arr" />
      </div>

      <div>
        <input type="radio" value="one" v-model="picked" />
        <input type="radio" value="two" v-model="picked" />
      </div>
    </div>
  `,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    text1: 0,
    text2: 0,
    text3: 0,
    active: false,
    html: '<span>this is html</span>'
  }
})
