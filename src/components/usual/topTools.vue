<template>
  <div>
    <div class="topTools" :class="className">
      <el-tooltip
        class="item"
        effect="dark"
        content="复制"
        placement="top"
      >
        <div
          class="tool copy"
          @click="add_Item(index, sec_Index, thr_Index)"
        ></div>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="删除"
        placement="top"
      >
        <div
          class="tool delete"
          @click="del_Item(index, sec_Index, thr_Index)"
        ></div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: String, //动态类名
    index: Number, //第一级序号
    sec_Index: Number, //第二序号
    thr_Index: Number, //第三序号
  },
  methods: {
    add_Item(index, sec_Index, thr_Index){
      const add_params = {
        index: index,
        sec_Index: sec_Index,
        thr_Index: thr_Index
      }
      this.$emit("add_Item", add_params);
    },
    del_Item(index, sec_Index, thr_Index){
      const del_params = {
        index: index,
        sec_Index: sec_Index,
        thr_Index: thr_Index
      }
      this.$emit("del_Item", del_params);
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/style/usualPage.less"; // 组件样式
</style>