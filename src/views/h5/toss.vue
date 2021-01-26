<template>
  <div class="h5Home">
    <!-- 头部区域 -->
    <div class="head">
      <header>{{ formData.workName }}</header>
      <div class="tossName agree">{{tossName}}</div>
    </div>
    <!-- 内容区域 -->
    <div class="cont_toss">
      
    </div>
    <!-- 底部区域 -->
    <footer>
      <van-popover v-model="showMore" trigger="click" placement="top-start">
        <div class="linkBox" v-for="(link, link_index) in actions"
          :key="link_index">
          <van-icon name="info-o" />
          <span>{{ link.title }}</span>
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
import BScroll from "better-scroll";
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
          title: "查看更多",
          url: "www.baidu.com",
        },
      ],
      // BScroll数据
      scrollY: 0,
      currentIndex: 0, //当前选中项
      itemHeigth: [], //每一个分区高度的集合
    };
  },
  created() {
    let that = this;
    that.$nextTick(() => {
      //dom渲染完成后初始化BScroll
      // that.initStorelistScroll();
    });
  },
  watch: {
    scrollY(newVal) {
      if (newVal > 0) {
        return (this.currentIndex = 0);
      }
      for (let i = 0; i < this.itemHeigth.length; i++) {
        let heigth1 = this.itemHeigth[i];
        let height2 = this.itemHeigth[i + 1];
        if (!height2 || (-newVal >= heigth1 && -newVal < height2)) {
          return (this.currentIndex = i);
        }
      }
    },
  },
  methods: {
    //********* BScroll *********
    initStorelistScroll() {
      let that = this;
      that.storeScroll = new BScroll(that.$refs.storeScroll, {
        click: true,
        probeType: 3,
      });
      that.storeScroll.on("scroll", (pos) => {
        that.scrollY = pos.y;
      });
    },
    //********* BScroll *********
    // 底部操作按钮区域
    showMoreBtn() {
      this.showMore = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>