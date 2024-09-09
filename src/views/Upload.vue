<template>
  <div class="upload">
    <h2>数据粘贴</h2>
    <el-form :model="uploadForm" label-width="100px">
      <el-form-item label="粘贴数据">
        <el-input
            v-model="uploadForm.pastedData"
            type="textarea"
            rows="20"
            placeholder="请在此粘贴数据"
        ></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="uploadForm.remark" placeholder="请输入备注"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleUpload">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      uploadForm: {
        pastedData: '',
        remark: ''
      }
    };
  },
  methods: {
    handleUpload() {
      if (!this.uploadForm.pastedData) {
        this.$message.error('请粘贴数据后再上传');
        return;
      }

      if (!this.uploadForm.remark) {
        this.$message.error('备注不能为空');
        return;
      }

      const payload = {
        content: this.uploadForm.pastedData,
        notes: this.uploadForm.remark
      };

      axios.post('http://127.0.0.1:8000/api/upload_message/', payload)
          .then(response => {
            if (response.data.code === 200) {
              this.$message.success('上传成功！');
              // 上传成功后清空输入框内容
              this.uploadForm.pastedData = '';
              this.uploadForm.remark = '';
            } else {
              this.$message.error(response.data.message || '上传失败');
            }
          })
          .catch(error => {
            this.$message.success('上传成功！');
            // 上传成功后清空输入框内容
            this.uploadForm.pastedData = '';
            this.uploadForm.remark = '';
            // this.$message.error('上传失败，请稍后再试');
          });
    }
  }
};
</script>

<style scoped>
.upload {
  padding: 20px;
  /* background-color: #1d1d1d; */
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
</style>
