<template>
  <div class="fuzzing-test-container">
    <div class="background"></div>
    <div class="overlay"></div>
    <div class="particles"></div>
    <div class="fuzzing-test-content">
      <h2>模糊测试</h2>
      <el-form :model="fuzzingForm" label-width="150px">
        <el-form-item label="测试对象" class="form-item">
          <el-select v-model="fuzzingForm.target" placeholder="请选择测试对象">
            <el-option label="测试1" value="对象1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="车机地址 (IP)" class="form-item">
          <el-input v-model="fuzzingForm.ip" placeholder="输入IP"></el-input>
        </el-form-item>

        <el-form-item label="端口 (PORT)" class="form-item">
          <el-input v-model="fuzzingForm.port" placeholder="输入端口"></el-input>
        </el-form-item>

        <el-form-item label="生成测试用例个数" class="form-item">
          <el-input-number v-model="fuzzingForm.testCaseCount" :min="1" :max="1000" label="生成测试用例个数"></el-input-number>
        </el-form-item>

        <el-form-item class="form-item">
          <el-button type="primary" @click="startTest">开始测试</el-button>
          <el-button type="danger" @click="stopTest">停止测试</el-button>
        </el-form-item>

        <el-progress :percentage="progress" :stroke-width="20" :show-text="false" class="custom-progress"/>

        <el-table ref="taskTable" :data="tasks" :row-class-name="tableRowClassName" style="margin-top: 20px;" height="300">
          <el-table-column prop="task" label="样例ID"/>
          <el-table-column prop="status" label="状态"/>
        </el-table>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fuzzingForm: {
        target: '',
        ip: 'localhost', // 默认IP为localhost
        port: '', // 端口初始为空
        testCaseCount: 200 // 默认测试用例个数
      },
      progress: 0,
      tasks: [],
      testInterval: null
    };
  },
  methods: {
    startTest() {
      if (!this.fuzzingForm.target) {
        this.$message.error('请先选择测试对象');
        return;
      }

      if (!this.fuzzingForm.ip) {
        this.$message.error('请先输入IP地址');
        return;
      }

      if (!this.fuzzingForm.port) {
        this.$message.error('请先输入端口');
        return;
      }

      if (!this.fuzzingForm.testCaseCount || this.fuzzingForm.testCaseCount < 1) {
        this.$message.error('请设置生成测试用例个数');
        return;
      }

      const totalTasks = this.fuzzingForm.testCaseCount;
      const tasksPerSecond = 10;
      const totalSteps = Math.ceil(totalTasks / tasksPerSecond);
      let currentStep = 0;

      this.tasks = []; // 重置任务列表
      this.progress = 0;

      this.$message.success(`测试对象 ${this.fuzzingForm.target} 测试已开始，目标地址 ${this.fuzzingForm.ip}:${this.fuzzingForm.port}`);

      this.testInterval = setInterval(() => {
        if (currentStep >= totalSteps) {
          clearInterval(this.testInterval);
          this.$message.success('测试完成');
        } else {
          currentStep++;
          this.progress = Math.min((currentStep / totalSteps) * 100, 100);

          // 模拟添加任务
          for (let i = 0; i < tasksPerSecond && this.tasks.length < totalTasks; i++) {
            const status = Math.random() > 0.3 ? '成功' : '报错';
            const newTask = {
              task: `样例 ${this.tasks.length + 1}`,
              status: status
            };

            this.tasks.push(newTask);

            // 如果任务是"成功"，立即滚动到底部并高亮显示
            if (status === '成功') {
              this.$nextTick(() => {
                const elTableBodyWrapper = this.$refs.taskTable.$el.querySelector('.el-table__body-wrapper');
                if (elTableBodyWrapper) {
                  elTableBodyWrapper.scrollTop = elTableBodyWrapper.scrollHeight;
                }
                // 高亮显示新添加的"成功"行
                this.$refs.taskTable.setCurrentRow(newTask);
              });
            }
          }
        }
      }, 1000);
    },
    stopTest() {
      clearInterval(this.testInterval);
      this.progress = 0;
      this.tasks = []; // 清空任务列表
      this.$message.warning('测试已停止');
    },
    tableRowClassName({row}) {
      if (row.status === '成功') {
        return 'success-row';
      } else if (row.status === '报错') {
        return 'error-row';
      }
      return '';
    }
  }
};
</script>

<style scoped>
.fuzzing-test-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  
}

.fuzzing-test-content {
  position: relative;
  z-index: 3;
  padding: 20px;
  color: #fff;
}

h2 {
  color: #ffffff;
  /* text-shadow: 0 0 10px rgba(160, 196, 255, 0.5); */
  margin-bottom: 30px;
  text-align: left;
  font-size: 1.5em;
  position: relative;
  padding-bottom: 15px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  /* transform: translateX(-50%); */
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #3498db, transparent);
  border-radius: 2px;
}

.form-item {
  margin-bottom: 20px;
}

.el-form-item__label {
  color: #a0c4ff !important;
}

.el-input__inner, .el-input-number__input, .el-select .el-input__inner {
  background-color: rgba(42, 59, 71, 0.6) !important;
  color: #ffffff !important;
  border: none !important;
}

.el-button {
  background: linear-gradient(45deg, #00a8ff, #007bff);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0,150,255,0.5);
  margin-right: 10px;
}

.el-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(0,150,255,0.8);
}

.el-button.el-button--danger {
  background: linear-gradient(45deg, #ff4757, #ff6b81);
}

.custom-progress {
  margin-top: 20px;
  background-color: rgba(42, 59, 71, 0.6);
  border-radius: 10px;
  overflow: hidden;
}

.custom-progress .el-progress-bar__outer {
  background-color: rgba(42, 59, 71, 0.6) !important;
}

.custom-progress .el-progress-bar__inner {
  background: linear-gradient(45deg, #00a8ff, #007bff) !important;
}

.el-table {
  background-color: rgba(42, 59, 71, 0.6) !important;
  color: #ffffff !important;
}

.el-table th, .el-table tr {
  background-color: transparent !important;
  color: #ffffff !important;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 150, 255, 0.1) !important;
}

.success-row {
  background-color: rgba(0, 255, 0, 0.1) !important;
}

.error-row {
  background-color: rgba(255, 0, 0, 0.1) !important;
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
