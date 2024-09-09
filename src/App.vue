<template>
  <el-container id="app" class="dark">
    <Header :showHeaderAndSidebar="showHeaderAndSidebar" :loading="loading" @logout="logout" />
    <el-container class="main-container">
      <Sidebar
        :showHeaderAndSidebar="showHeaderAndSidebar"
        :loading="loading"
        :isCollapsed="isCollapsed"
        :isAdmin="isAdmin"
        @toggle-collapse="toggleCollapse"
      />
      <!-- 主要内容区域 -->
      <el-main v-if="!isHomePage && !isLoginPage && !isRegisterPage" class="main-content">
        <el-skeleton v-if="loading" :rows="5" animated /> <!-- 骨架屏 -->
        <router-view v-else></router-view> <!-- 实际内容 -->
      </el-main>
    </el-container>
    <!-- 首页、登录、注册页面内容 -->
    <router-view v-if="isHomePage || isLoginPage || isRegisterPage" class="full-height"></router-view>
  </el-container>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      isCollapsed: false, // 默认展开侧边栏
      loading: true, // 用于控制骨架屏的显示
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    },
    isLoginPage() {
      return this.$route.path === '/login';
    },
    isRegisterPage() {
      return this.$route.path === '/register';
    },
    showHeaderAndSidebar() {
      // 仅在非首页、非登录、非注册页面显示侧边栏和顶部导航
      return !this.isHomePage && !this.isLoginPage && !this.isRegisterPage;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    fetchData() {
      // 模拟数据加载，2秒后关闭骨架屏
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
  },
  mounted() {
    this.fetchData(); // 页面加载后获取数据
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 确保占满视口高度 */
  background-color: rgba(20, 20, 20, 1);
  color: #a0b7d6;
  overflow-x: hidden; /* 隐藏横向滚动条 */
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden; /* 确保子元素处理滚动 */
}

.main-content {
  padding: 20px;
  background-color: rgba(20, 20, 20, 1);
  color: #a0b7d6;
  height: 100%;
  overflow-y: auto; /* 允许内容溢出并显示滚动条 */
}

.full-height {
  height: 100%;
  overflow-y: auto; /* 允许内容溢出并显示滚动条 */
}
</style>
