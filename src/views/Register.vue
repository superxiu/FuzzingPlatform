<template>
  <div class="register-container" @mousemove="handleMouseMove">
    <div class="background" :style="backgroundStyle"></div>
    <div class="overlay"></div>
    <div class="particles"></div>
    <el-card class="register-card">
      <h2 class="title">注册</h2>
      <el-form :model="form" :rules="rules" ref="registerForm" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" class="custom-input">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" class="custom-input">
            <template #prefix>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input v-model="form.password1" type="password" placeholder="请输入密码" class="custom-input">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="form.password2" type="password" placeholder="请再次输入密码" class="custom-input">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="register-button" @click="handleRegister">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-link class="login-link" @click="goToLogin">已有账号？去登录</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Lock, Message, User } from '@element-plus/icons-vue';
import axios from 'axios';

export default {
  components: {
    User,
    Message,
    Lock,
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password1: '',
        password2: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
        ],
        password1: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password2: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.validatePasswordMatch, trigger: 'blur' },
        ],
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
    validatePasswordMatch(rule, value, callback) {
      if (value !== this.form.password1) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
    handleRegister() {
      console.log(this.form)
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8000/api/register/', this.form, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            if (response.data.code === 200) {
              this.$message.success('注册成功');
              this.$router.push('/dashboard'); // 注册成功后自动登录跳转仪表盘
            } else {
              this.$message.error(response.data.message);
            }
          })
              .catch(error => {
                this.$message.error(error.response?.data?.message || '注册失败');
                this.$message.error(error.response?.data?.error || '注册失败');
              });
        }
      });
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-container {
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

.register-card {
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

.register-card::before {
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

.register-card::after {
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

.custom-input {
  background-color: rgba(42, 59, 71, 0.6);
  border-radius: 8px;
  margin-bottom: 20px;
}

.custom-input .el-input__inner {
  color: #ffffff;
}

.el-icon {
  color: #4caf50;
}

.register-button {
  width: 100%;
  background: linear-gradient(45deg, #00a8ff, #007bff);
  border: none;
  font-size: 18px;
  padding: 14px;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0,150,255,0.5);
}

.register-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0,150,255,0.8);
}

.login-link {
  display: block;
  text-align: center;
  color: #80deea;
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.login-link:hover {
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
