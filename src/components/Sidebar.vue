<template>
  <el-aside v-if="showHeaderAndSidebar && !loading" :width="isCollapsed ? '64px' : '250px'" class="sidebar">
    <el-menu
      :default-active="$route.path"
      router
      :collapse="isCollapsed"
      class="el-menu-vertical"
      
      text-color="#a0b7d6"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/dashboard">
        <el-icon><DataAnalysis /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-menu-item index="/upload">
        <el-icon><Upload /></el-icon>
        <span>数据上传</span>
      </el-menu-item>
      <el-menu-item index="/fuzzing-test">
        <el-icon><Monitor /></el-icon>
        <span>模糊测试</span>
      </el-menu-item>
      <el-menu-item v-if="isAdmin" index="/admin">
        <el-icon><Setting /></el-icon>
        <span>管理员</span>
      </el-menu-item>
    </el-menu>
    <el-button class="toggle-collapse-btn" @click="toggleCollapse" type="text">
      <el-icon>
        <Fold v-if="!isCollapsed" />
        <Expand v-if="isCollapsed" />
      </el-icon>
    </el-button>
  </el-aside>
</template>

<script>
import {ElIcon, ElMenu, ElMenuItem} from 'element-plus';
import {DataAnalysis, Monitor, Setting, Upload, Fold, Expand} from '@element-plus/icons-vue';

export default {
  components: {
    ElMenu,
    ElMenuItem,
    ElIcon,
    DataAnalysis,
    Upload,
    Monitor,
    Setting,
    Fold,
    Expand,
  },
  props: {
    showHeaderAndSidebar: Boolean,
    loading: Boolean,
    isCollapsed: Boolean,
    isAdmin: Boolean,
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggle-collapse');
    },
  },
};
</script>

<style scoped>
.sidebar {
  /* background-color: #1a2233; */
  padding-top: 20px;
  position: relative;
  transition: width 0.3s;
  height: 93.5vh;
}

/* .sidebar::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 2px;
  background: linear-gradient(180deg, #ffffff, #3498db);
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.6);
} */

.el-menu-vertical {
  border-right: none;
}

.el-menu-item {
  font-size: 16px;
  margin-bottom:10px;
  margin-left: 15px;
  height: 50px;
  width: 230px;
}

.el-menu-item.is-active {
  background: linear-gradient(90deg, #3498db, rgba(20, 20, 20, 1));
  color: #ffffff;
  -webkit-text-fill-color: #ffffff;
  border-radius: 24px;
  border: none;
  position: relative;
  overflow: visible;
}

.el-menu-item.is-active::before,
.el-menu-item.is-active::after {
  content: none;
}

.toggle-collapse-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background:transparent;
  /* background-color: #2c3e50; */
  border: none;
  /* padding: 10px; */
  border-radius: 50%;
  font-size: 30px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.toggle-collapse-btn:hover {
  color: #3498db;
  transform: translateX(-50%) scale(1.1);
}
</style>
