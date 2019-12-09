import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 数据列表
    list: [],
    // 给 input 绑定数据
    inputValue: '',
    // 默认新增 item 项的 id
    nextId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 监听 inputValue 变化
    setIpuntValue(state, val) {
      state.inputValue = val
    },
    // 新增 item 项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.inputValue = ''
      state.nextId++
    },
    // 根据 ID 删除对应的 item 项
    removeItem(state, id) {
      const index = state.list.findIndex(x => x.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    }
  },
  actions: {
    getList(context) {
      // 异步请求数据列表 通过 commit 触发 Mutations 把数据保存到 state 中的 list
      axios.get('/list.json').then(({
        data
      }) => {
        // console.log(data)
        context.commit('initList', data)
      })
    }
  },
  modules: {}
})
