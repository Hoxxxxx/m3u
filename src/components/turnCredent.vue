<template>
  <div>
    <el-dialog
      :visible.sync="turnCredentVisible"
      width="470px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <span class="tips">是否抛转凭证？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()" class="btn">取 消</el-button>
        <el-button type="primary" @click="sure()" class="btn">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="credentSuccessVisible"
      width="470px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="success">
        <img src="../assets/img/success.png" />
        <span>抛转成功</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureSuccess()" class="btn"
          >确 认</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="credentFailVisible"
      width="670px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="fail">
        <img src="../assets/img/fail.png" />
        <div class="tableData">
          <el-table
            :data="credentFileData"
            style="width: 100%"
            :stripe="true"
            :header-cell-style="headClass"
          >
            <el-table-column
              property="date"
              label="日期"
              width="150"
            ></el-table-column>
            <el-table-column
              property="name"
              label="姓名"
              width="200"
            ></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
        </div>
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
    turnCredentVisible: {
      type: Boolean,
    },
    credentSuccessVisible: {
      type: Boolean,
    },
    credentFailVisible: {
      type: Boolean,
    },
    // 失败时显示的表格数据
    credentFileData: {
      type: Array,
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
      this.$emit("credent_Cancel");
    },
    // 确定
    sure() {
      this.$emit("credent_Sure");
    },

    // 成功弹窗的相关事件
    // 确定
    sureSuccess() {
      this.$emit("sure_credentSuccess");
    },

    // 失败时弹窗的相关事件
    // 确定
    sureFail() {
      this.$emit("sure_credentFail");
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
.success {
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
.fail {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 44px;
    height: 44px;
    margin: 0 auto;
  }
  .tableData {
    width: 100%;
    max-height: 300px;
    overflow: auto;
    margin-top: 20px;
  }
}
</style>
