<template>
  <div class="admin">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <!-- 用户管理界面内容 -->
        <el-table :data="users">
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="email" label="邮箱"/>
          <el-table-column prop="role" label="角色"/>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="数据上传管理" name="second">
        <!-- 数据上传管理界面内容 -->
        <el-upload action="#" list-type="text">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import type {TabsPaneContext} from 'element-plus'

const activeName = ref('first')

const users = ref([
  {username: 'user1', email: 'user1@example.com', role: '普通用户'},
  {username: 'admin', email: 'admin@example.com', role: '管理员'},
  // 其他模拟数据
])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped>
.admin {
  padding: 20px;
  color: #ffffff; /* 白色字体 */
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  background-color: #263238; /* 标签页内容背景色 */
  color: #b0bec5; /* 浅蓝灰色字体 */
  font-size: 24px; /* 调整字体大小 */
  font-weight: 600; /* 加粗字体 */
}

::v-deep .el-tabs__item {
  font-size: 20px; /* 标签文本字体大小 */
  font-weight: bold; /* 标签文本加粗 */
  color: #ffd04b; /* 标签文本颜色 */
}

.el-tabs__item {
  color: #ffd04b; /* 选中状态下的标签文本颜色 */
}

.el-table th {
  background-color: #37474f; /* 深蓝绿色表头背景 */
  color: #b0bec5; /* 浅蓝灰色字体 */
}

.el-table td {
  background-color: #263238; /* 表格内容背景色 */
  color: #ffffff; /* 表格内容字体色 */
}

.el-button {
  background-color: #26a69a; /* 蓝绿色按钮 */
  border-color: #26a69a; /* 边框颜色 */
  color: #ffffff; /* 白色字体 */
}

.el-button:hover {
  background-color: #00796b; /* 深蓝绿色按钮悬停效果 */
  border-color: #00796b; /* 边框颜色悬停效果 */
}
</style>
