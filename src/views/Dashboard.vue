<template>
  <div class="iframe-container">
    <iframe
        src="http://localhost:10000/prp35xs5cs5s/"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh; /* 使容器占满整个视口高度 */
  margin: 0;
  padding: 0;
}

iframe {
  width: 100%;
  height: 100%;
  border: none; /* 移除边框 */
}
</style>
