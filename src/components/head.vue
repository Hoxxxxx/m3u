<template>
  <div class="headContainer">
    <div class="head">
      <img src="../assets/img/Logo.png" class="logo" @click="goHome()" />
      <div class="info">
        <div class="companyInfo" v-if="title != '华录集团财务系统'">
          <img src="../assets/img/company.png" />
          <span>{{ companyName }}</span>
        </div>
        <div class="userInfo">
          <img src="../assets/img/user.png" />
          <span>{{ userName }}</span>
        </div>
      </div>
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  props: {
    title: {
      type: String,
      default: "华录集团财务系统",
    },
    userName: {
      type: String,
      default: "用户名",
    },
    companyName: {
      type: String,
      default: "公司名称",
    },
  },
  computed:{
    ...mapState(['workInfo'])
  },
  watch:{
    '$route':{
      // 监听路由：回到列表页的话需要重置vuex的workinfo
      handler(newval,oldval){
        if(newval.name == 'workList'){
          this.CHANGE_WORK_INFO()
        }
      },
      immediate:true
    }
  },
  methods: {
    ...mapMutations(["CHANGE_WORK_INFO"]),
    goHome() {
      // 清空暂存数据
      sessionStorage.removeItem('nowTheadList')
      sessionStorage.removeItem("allWorksList");
      sessionStorage.removeItem("operation_code");

      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.headContainer {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .head {
    min-width: 1440px;
    margin: 0 auto;
    height: 60px;
    padding: 0 30px;
    background: #fff;
    // box-shadow: 0px 2px 6px 0px rgba(0, 21, 41, 0.12);
    .logo {
      height: 30px;
      margin-top: 15px;
      cursor: pointer;
      float: left;
    }
    .title {
      display: block;
      width: 1000px;
      height: 60px;
      margin: 0 auto;
      text-align: center;
      line-height: 60px;
      font-size: 16px;
      font-weight: bold;
    }
    .info {
      height: 60px;
      float: right;
      display: flex;
      align-items: center;
      .userInfo,
      .companyInfo {
        img {
          width: 26px;
        }
        span {
          margin-left: 10px;
          line-height: 26px;
        }
      }
      .companyInfo{
        margin-right: 20px;
      }
    }
  }
}
</style>