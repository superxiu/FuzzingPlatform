<template>
  <div class="login-container" @mousemove="handleMouseMove">
    <div class="background" :style="backgroundStyle"></div>
    <div class="overlay"></div>
    <div class="particles"></div>
    <el-card class="login-card">
      <h2 class="title">登录</h2>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-link class="register-link" @click="goToRegister">还没有账号？去注册</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Lock, User } from '@element-plus/icons-vue';
import axios from "axios";
import Cookies from 'js-cookie';

export default {
  components: {
    User,
    Lock,
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      backgroundStyle: {
        transform: 'translate(0px, 0px)',
      },
    };
  },
  methods: {
    handleMouseMove(event) {
      const { clientX, clientY } = event;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      this.backgroundStyle = {
        transform: `translate(${moveX / 50}px, ${moveY / 50}px)`,
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8000/api/login/', {
            username: this.form.username,
            password: this.form.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
              .then(response => {
                // 假设后端返回200状态码时表示成功登录
                if (response.status === 200) {
                  this.$message.success('登录成功');

                  // 提取返回的用户信息和token
                  const user = {
                    username: this.form.username,
                    // 根据实际需要，如果后端返回is_superuser等字段，进行相应处理
                  };

                  // 更新 Vuex 状态
                  this.$store.commit('setUser', user);

                  // 假设 Django 返回JWT或Session ID作为token，你可以从response中获取
                  const token = response.data.token;  // 根据实际返回修改字段名

                  // 设置token到cookie中
                  Cookies.set('access_token', token, {expires: 7}); // 7天有效期

                  // 如果有 refresh_token 可以类似地处理
                  // Cookies.set('refresh_token', refreshToken, {expires: 7}); // 7天有效期

                  // 跳转到仪表板页面
                  this.$router.push('/dashboard');
                } else {
                  this.$message.error('登录失败，请检查用户名和密码');
                }
              })
              .catch(error => {
                // 提取后端返回的详细错误信息并显示
                this.$message.error(error.response?.data?.errors || '登录失败');
              });
        }
      });
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

.background {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: url('/path/to/your/background-image.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(5px);
  z-index: 0;
  transition: transform 0.2s ease-out;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,50,100,0.5));
  z-index: 1;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle, #ffffff 1px, transparent 1px),
    radial-gradient(circle, #ffffff 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
  animation: moveParticles 20s linear infinite;
  opacity: 0.3;
  z-index: 2;
}

.login-card {
  position: relative;
  width: 400px;
  padding: 30px;
  background-color: transparent;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  color: #ffffff;
  z-index: 3;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(180deg, #ffffff, #3498db);
  z-index: -1;
  border-radius: 18px;
}

.login-card::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background-color: rgb(2, 6, 17);
  border-radius: 14px;
  z-index: -1;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #a0c4ff;
  font-size: 32px;
  text-shadow: 0 0 10px rgba(160, 196, 255, 0.5);
  animation: pulse 2s infinite;
}

.el-input {
  background-color: rgba(42, 59, 71, 0.6);
  border-radius: 8px;
  margin-bottom: 20px;
}

.el-input__inner {
  color: #ffffff;
}

.el-icon {
  color: #4caf50;
}

.login-button {
  width: 100%;
  background: linear-gradient(45deg, #00a8ff, #007bff);
  border: none;
  font-size: 18px;
  padding: 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0,150,255,0.5);
}

.login-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0,150,255,0.8);
}

.register-link {
  display: block;
  text-align: center;
  color: #80deea;
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.register-link:hover {
  color: #b2ebf2;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

@keyframes moveParticles {
  0% { background-position: 0 0, 25px 25px; }
  100% { background-position: 50px 50px, 75px 75px; }
}
</style>
