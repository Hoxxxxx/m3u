<template>
  <div class="h5Home">
    <!-- 头部区域 -->
    <div class="head">
      <header>{{ formData.workName }}</header>
      <div class="tossName agree">{{tossName}}</div>
    </div>
    <!-- 内容区域 -->
    <div class="cont_toss">
      <!-- 当前步骤 -->
      <div class="flowBox"></div>

      <div class="arrowImg"></div>

      <!-- 下一步骤 -->
      <div class="flowBox"></div>

      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 审批意见/常用语 -->

      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 提醒相关人员 -->

      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 提醒方式 -->

      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 消息内容 -->

      
    </div>
    <!-- 底部区域 -->
    <footer>
      <van-popover v-model="showMore" trigger="click" placement="top-start">
        <div
          class="linkBox"
          v-for="(link, link_index) in actions"
          :key="link_index"
        >
          <van-cell :title="link.title" is-link @click="toLink(link.url)" />
        </div>
        <template #reference>
          <van-button
            class="btn_operation"
            size="small"
            color=""
            plain
            type="info"
            >其他
          </van-button>
        </template>
      </van-popover>
      <van-button
        class="btn_operation"
        size="small"
        color="#F56C6C"
        type="default"
        >退回</van-button
      >
      <van-button
        class="btn_operation"
        size="small"
        color="#FBD951"
        type="warning"
        >拒绝</van-button
      >
      <van-button
        class="btn_operation"
        size="small"
        color="#6DD400"
        type="danger"
        >同意</van-button
      >
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tossName: '同意流程',
      formData: {
        workName: "出差申请单",
      },
      // 底部操作栏
      showMore: false, //其他
      actions: [
        {
          title: "查看申请单详细信息1",
          url: "https://www.baidu.com/",
        },
        {
          title: "查看申请单详细信息2",
          url: "https://www.baidu.com/",
        },
        {
          title: "查看申请单详细信息3",
          url: "https://www.baidu.com/",
        },
      ],
    };
  },
  created() {
  },
  watch: {
  },
  methods: {
    // 底部操作按钮区域
    showMoreBtn() {
      this.showMore = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>