<template>
  <div>
    <el-dialog
      :visible.sync="reductCreVis"
      width="470px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <span class="tips">是否进行抛转凭证还原？？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()" class="btn">取 消</el-button>
        <el-button type="primary" @click="sure()" class="btn">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="reductCreSucVis"
      width="470px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="success">
        <img src="../assets/img/success.png" />
        <span>还原成功</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureSuccess()" class="btn"
          >确 认</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="reductCreFailVis"
      width="470px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="fail">
        <img src="../assets/img/fail.png" />
        <span>无效或尚未审核，不能资料抛转还原</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureFail()" class="btn"
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    reductCreVis: {
      type: Boolean,
    },
    reductCreSucVis: {
      type: Boolean,
    },
    reductCreFailVis: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 表格背景颜色填充
    headClass() {
      return "background: #F3F5F9;";
    },
    // 条件筛选的弹窗相关事件
    // 取消
    cancel() {
      this.$emit("reductCre_Cancel");
    },
    // 确定
    sure() {
      this.$emit("reductCre_Sure");
    },

    // 成功弹窗的相关事件
    // 确定
    sureSuccess() {
      this.$emit("sure_reductCreSuc");
    },

    // 失败时弹窗的相关事件
    // 确定
    sureFail() {
      this.$emit("sure_reductCreFail");
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.btn {
  width: 120px;
  margin: 0 20px;
}

.choosed {
  box-sizing: border-box;
  border: 1px solid #1989fa;
}
.tips {
  display: block;
  width: 100%;
  color: #909399;
  font-size: 14px;
  text-align: center;
}
.success,.fail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  img {
    width: 44px;
    height: 44px;
  }
  span {
    color: #409efd;
    font-weight: 600;
  }
}
</style>
