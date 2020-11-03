<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane name="firTab">
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'firTab' ? 'potActive' : ''"
            ></span>
            <span>表单</span>
          </div>
          1111
        </el-tab-pane>
        <el-tab-pane label="流程进度" name="secTab">
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'secTab' ? 'potActive' : ''"
            ></span>
            <span> 流程进度</span>
          </div>
          1111112222
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 附件区域 -->
    <el-card class="uploadContent"> </el-card>
  </div>
</template>

<script>
// import FixedBtns from "@/components/fixedBtns";

export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
    };
  },
  created() {},
  methods: {
    handleClick() {
      console.log(this.activeTab);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
</style>
