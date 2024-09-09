<template>
  <div class="home" @mousemove="handleMouseMove">
    <div class="background" :style="backgroundStyle"></div>
    <div class="overlay"></div>
    <div class="content">
      <div class="intro-section" data-aos="fade-up">
        <h1 class="title">智能车检测平台</h1>
        <button class="enter-button" @click="goToLogin" @mousemove="handleButtonMouseMove" @mouseleave="handleButtonMouseLeave" ref="enterButton">
          <span>立即体验</span>
        </button>
        <div class="intro" data-aos="fade-up" data-aos-delay="200">
          <p>我们的平台利用大模型技术，为车载网络提供全面的漏洞检测服务，确保您的车辆安全无忧。</p>
        </div>
        <div class="advantages" data-aos="fade-up" data-aos-delay="400">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card class="advantage-card" data-aos="fade-right">
                <h3>高效检测</h3>
                <p>利用先进的大模型技术，快速识别并修复车载网络中的漏洞。</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="advantage-card" data-aos="fade-up">
                <h3>实时监控</h3>
                <p>实时监控车载网络状态，及时发现潜在威胁，保障行车安全。</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="advantage-card" data-aos="fade-left">
                <h3>用户友好</h3>
                <p>简洁直观的用户界面，操作便捷，轻松上手。</p>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 删除新模块 -->
    </div>
    <div class="particles"></div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';

export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      // ... 其他数据 ...
    };
  },
  computed: {
    backgroundStyle() {
      const translateX = (this.mouseX - window.innerWidth / 2) / 30;
      const translateY = (this.mouseY - window.innerHeight / 2) / 30;
      return {
        transform: `translate(${translateX}px, ${translateY}px)`,
      };
    },
  },
  methods: {
    handleMouseMove(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    refreshAOS() {
      AOS.refresh();
    },
    contactSupport() {
      // 联系客服的逻辑
    },
    contactTech() {
      // 联系技术支持的逻辑
    },
    handleButtonMouseMove(event) {
      const button = this.$refs.enterButton;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      gsap.to(button, {
        duration: 0.3,
        x: (x - rect.width / 2) / 10,
        y: (y - rect.height / 2) / 10,
        ease: 'power2.out'
      });
    },
    handleButtonMouseLeave() {
      const button = this.$refs.enterButton;
      gsap.to(button, {
        duration: 0.3,
        x: 0,
        y: 0,
        ease: 'power2.out'
      });
    }
  },
  mounted() {
    AOS.init({
      duration: 1000, // 动画持续时间
      once: true, // 动画只执行一次
    });
    // 重新刷新AOS以确保所有元素都被正确初始化
    this.$nextTick(() => {
      AOS.refresh();
    });
    // 监听窗口大小变化事件
    window.addEventListener('resize', this.refreshAOS);
  },
  beforeDestroy() {
    // 移除窗口大小变化事件监听器
    window.removeEventListener('resize', this.refreshAOS);
  },
};
</script>

<style scoped>
.home {
  position: relative;
  min-height: 100vh; /* 确保占满视口高度 */
  display: flex;
  flex-direction: column;
  overflow-y: hidden; /* 允许内容溢出并显示滚动条 */
  overflow-x: hidden; /* 隐藏横向滚动条 */
  background-color: #000;
  color: #fff;
}

.background {
  position: fixed; /* 固定背景位置 */
  top: 0;
  left: 0;
  width: 100%; /* 确保背景图像不超出视口宽度 */
  height: 100%; /* 确保背景图像覆盖整个视口高度 */
  background-image: url('@/assets/background.jpg'); 
  background-size: cover;
  background-position: center;
  transition: transform 0.1s ease-out;
  z-index: -1; /* 确保背景在所有内容的后面 */
}

.overlay {
  position: fixed; /* 固定叠加层位置 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,50,100,0.5));
  z-index: 0; /* 确保叠加层在背景前面 */
}

.content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto; /* 居中对齐 */
}

.intro-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 确保初始内容占满视口高度 */
}

.title {
  font-size: 64px;
  margin-bottom: 30px;
  text-shadow: 0 0 10px rgba(0,150,255,0.8);
  animation: pulse 2s infinite;
}

.center-button {
  font-size: 24px;
  padding: 10px 40px;
  width: 400px;
  height: 100px;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #00a8ff, #007bff);
  border: none;
  box-shadow: 0 0 20px rgba(0,150,255,0.5);
}

.center-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(0,150,255,0.8);
}

.intro {
  margin: 40px 0;
  font-size: 20px;
  line-height: 1.5;
}

.advantages {
  margin-top: 20px;
}

.advantage-card {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  text-align: left;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0,150,255,0.5);
}

.particles {
  position: fixed; /* 固定粒子层位置 */
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
  z-index: 1; /* 确保粒子层在叠加层前面 */
}

.enter-button {
  position: relative;
  font-size: 24px;
  padding: 15px 60px; /* 调整内边距，使按钮变矮一些 */
  width: 250px; /* 设置固定宽度 */
  background: linear-gradient(45deg, #00a8ff, #007bff);
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0,150,255,0.5);
}

.enter-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s;
}

.enter-button:hover::before {
  transform: scale(1);
}

.enter-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0,150,255,0.8);
}

.enter-button span {
  position: relative;
  z-index: 1;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0,150,255,0.7); }
  70% { box-shadow: 0 0 0 10px rgba(0,150,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,150,255,0); }
}

.enter-button {
  animation: pulse 2s infinite;
}

@keyframes moveParticles {
  0% { background-position: 0 0, 25px 25px; }
  100% { background-position: 50px 50px, 75px 75px; }
}
</style>
