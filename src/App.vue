<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange" />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e) => {ckStateChange(e, item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="removeDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infolist'])
  },
  methods: {
    // ...mapMutations(['setIpuntValue']),
    // 监听 input 文本内容变化
    handleInputChange(e) {
      // console.log(e.target.value)
      this.$store.commit('setIpuntValue', e.target.value)
    },
    // 向列表中新增 item 项
    addItem() {
      if (this.inputValue.trim() <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      }
      this.$store.commit('addItem')
    },
    // 根据 ID 删除对应的 item 项
    removeItemById(id) {
      // console.log(id)
      this.$store.commit('removeItem', id)
    },
    // 监听复选框 选中状态改变
    ckStateChange(e, id) {
      // console.log(e.target.checked)
      // console.log(id)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', param)
    },
    // 清除已完成
    removeDone() {
      this.$store.commit('removeDone')
    },
    // 点击 tab 按钮切换列表数据
    changeList(key) {
      // console.log(key)
      this.$store.commit('changeList', key)
    }
  },
  created() {
    this.$store.dispatch('getList')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
