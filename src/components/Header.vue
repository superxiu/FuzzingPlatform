<template>
  <el-header v-if="showHeaderAndSidebar && !loading" class="header">
    <div class="header-content">
      <router-link to="/" class="logo">Fuzzing Platform</router-link>
      <el-tooltip content="登出" placement="bottom">
        <el-button type="text" @click="logout" class="logout-btn">
          <el-icon><SwitchButton /></el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </el-header>
</template>

<script>
import { SwitchButton } from '@element-plus/icons-vue'

export default {
  components: {
    SwitchButton,
  },
  props: {
    showHeaderAndSidebar: Boolean,
    loading: Boolean,
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
.header {
  /* background-color: #1a2233; */
  padding: 0;
  position: relative;
}

.header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #373737;
  box-shadow: 0 0 8px rgba(80, 80, 80, 0.6);
}

.header-content {
  /* max-width: 1200px; */
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.logo {
  /* color: #3498db; */
  font-family: 'melete';
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  /* font-family:Verdana, Geneva, Tahoma, sans-serif; */
  margin-right: auto;
  background: linear-gradient(90deg, #ffffff,#3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
}

.logout-btn {
  color: #a0b7d6;
  font-size: 20px;
  transition: color 0.3s ease, transform 0.3s ease;
  margin-right: 10px;
}

.logout-btn:hover {
  color: #3498db;
  transform: scale(1.1);
}
</style>
