<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基础控件" name="1">
        <div class="Btns">
          <div class="btn"></div>
          <div class="btn" style="margin-right: 0"></div>
          <div class="btn"></div>
          <div class="btn" style="margin-right: 0"></div>
          <div class="btn"></div>
          <div class="btn" style="margin-right: 0"></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="布局控件" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1'],
    }
  },
}
</script>

<style lang="less" scoped>
.el-collapse{
  color: #999999;
  border: none !important;
  .el-collapse-item{
    /deep/ .el-collapse-item__header{
      border: none !important;
      font-size: 14px;
      color: #999999;
    }
    .Btns{
      width: 230px;
      display: flex;
      flex-wrap: wrap;
      .btn{
        width: 110px;
        height: 36px;
        margin-right: 10px;
        margin-bottom: 10px;
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
      }
    }
  }
}
</style>