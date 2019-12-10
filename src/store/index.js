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
    nextId: 5,
    viewKey: 'all'
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
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 点击复选框 切换选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已完成
    removeDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 点击 tab 按钮切换列表数据
    changeList(state, key) {
      state.viewKey = key
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
  getters: {
    // 获取未完成项的数目
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 切换列表数据 根据当前选中的按钮展示不同的列表数据
    infolist(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  },
  modules: {}
})
