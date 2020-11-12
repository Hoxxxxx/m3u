<template>
  <div class="error">
    <h2 class="errorMsg">请返回重新登录！</h2>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.error {
  width: 100%;
  height: 100%;
  position: relative;
  .errorMsg {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50);
  }
}
</style>