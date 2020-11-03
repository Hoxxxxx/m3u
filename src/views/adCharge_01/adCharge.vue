<template>
  <div class="workSpace">

    <!-- 表单区域 -->
    <el-card class="formContent">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane name="firTab">
          <span slot="label"> 表单</span>
          1111
        </el-tab-pane>
        <el-tab-pane label="流程进度" name="secTab">
          <span slot="label"> 流程进度</span>
          1111112222
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 附件区域 -->
    <el-card class="uploadContent">
      
    </el-card>

  </div>
</template>

<script>
// import FixedBtns from "@/components/fixedBtns";

export default {
  components: {
  },
  data() {
    return {
      activeTab: 'firTab',
    };
  },
  created() {
  },
  methods: {
    handleClick() {
      console.log(this.activeTab)
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";

</style>
