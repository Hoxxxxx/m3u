<template>
  <div>
    <div class="fixedBtns">
      <el-button
        type="primary"
        class="btn"
        v-for="(item, index) in Btns_List"
        :key="index"
        @click="handClick(item)"
        >{{ item.name }}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Btns_List: {
      type: Array
    },
  },
  methods: {
    handClick(item) {
      this.$emit(item.method);
    },
  },
};
</script>

<style lang="less" scoped>
.fixedBtns {
  position: fixed;
  right: 0px;
  top: 150px;
  width: 100px;
  padding: 10px 10px;
  border-radius: 8px;
  border: 1px solid #409efd;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  .btn {
    margin-bottom: 10px;
    margin-left: 0;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-button {
    padding: 12px 4px !important;
  }
}
</style>