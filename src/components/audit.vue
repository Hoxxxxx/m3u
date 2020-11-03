<template>
  <div>
    <el-dialog
      :visible.sync="auditVisible"
      width="670px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="current" :class="radio == 1 ? 'choosed' : ''">
        <el-radio v-model="radio" label="1">仅本笔账款审核 </el-radio>
      </div>
      <div class="filter" :class="radio == 2 ? 'choosed' : ''">
        <div class="title">
          <el-radio v-model="radio" label="2" disabled>依照范围条件审核 </el-radio>
        </div>
        <ul class="selects">
          <li>
            <label>日期范围</label>
            <el-date-picker
              v-model="dateTimeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="datePicker"
              v-if="radio == 2"
            >
            </el-date-picker>
            <div class="dateTimeNull datePicker" v-else></div>
          </li>
          <li>
            <label>编号范围</label>
            <el-select
              v-model="indexRange"
              placeholder="请选择编号范围"
              class="Picker"
              v-if="radio == 2"
            >
              <el-option
                v-for="item in indexRanges"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="Picker selectNull" v-else></div>
          </li>
          <li>
            <label>人员范围</label>
            <el-select
              v-model="memberRange"
              placeholder="请选择人员范围"
              class="Picker"
              v-if="radio == 2"
            >
              <el-option
                v-for="item in memberRanges"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="Picker selectNull" v-else></div>
          </li>
          <li>
            <label>部门范围</label>
            <el-select
              v-model="departRange"
              placeholder="请选择部门范围"
              class="Picker"
              v-if="radio == 2"
            >
              <el-option
                v-for="item in departRanges"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="Picker selectNull" v-else></div>
          </li>
          <li>
            <label>厂商范围</label>
            <el-select
              v-model="vendorRange"
              placeholder="请选择厂商范围"
              class="Picker"
              v-if="radio == 2"
            >
              <el-option
                v-for="item in vendorRanges"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div class="Picker selectNull" v-else></div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()" class="btn">取消</el-button>
        <el-button type="primary" @click="sure()" class="btn"
          >确认审核</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="auditSuccessVisible"
      width="670px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="success">
        <img src="../assets/img/success.png" />
        <ul>
          <li>
            <span>本预付款已转入待冲帐预付款 </span>
            <span>单号：EL671-200900131</span>
          </li>
          <li>
            <label>总审核应付账款</label>
            <div></div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureSuccess()" class="btn"
          >确 认</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="auditFailVisible"
      width="670px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="fail">
        <img src="../assets/img/fail.png" />
        <div class="tableData">
          <el-table
            :data="failData"
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
    auditVisible: {
      type: Boolean,
    },
    auditSuccessVisible: {
      type: Boolean,
    },
    auditFailVisible: {
      type: Boolean,
    },
    // 失败时显示的表格数据
    failData: {
      type: Array,
    },
  },
  data() {
    return {
      radio: "1",
      dateTimeRange: "", //时间范围
      indexRanges: [
        {
          value: "选项1",
          label: "编号范围",
        },
      ],
      indexRange: "", //编号范围
      memberRanges: [
        {
          value: "选项1",
          label: "人员范围",
        },
      ],
      memberRange: "", //人员范围
      departRanges: [
        {
          value: "选项1",
          label: "部门范围",
        },
      ],
      departRange: "", //部门范围
      vendorRanges: [
        {
          value: "选项1",
          label: "厂商范围",
        },
      ],
      vendorRange: "", //厂商范围
    };
  },
  methods: {
    // 表格背景颜色填充
    headClass() {
      return "background: #F3F5F9;";
    },
    // 条件筛选的弹窗相关事件
    // 取消
    cancel() {
      this.$emit("auditDialogCancel");
    },
    // 确定
    sure() {
      let outPut = {};
      if (this.radio == 1) {
        outPut.radio = 1;
      } else {
        outPut.radio = 2;
        outPut.dateTimeRange = this.dateTimeRange;
        outPut.indexRange = this.indexRange;
        outPut.memberRange = this.memberRange;
        outPut.departRange = this.departRange;
        outPut.vendorRange = this.vendorRange;
      }
      this.$emit("auditDialogSure", outPut);
    },

    // 成功弹窗的相关事件
    // 确定
    sureSuccess() {
      this.$emit("sureSuccess");
    },

    // 失败时弹窗的相关事件
    // 确定
    sureFail() {
      this.$emit("sureFail");
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
.current {
  height: 46px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  line-height: 46px;
  border-radius: 6px;
  padding: 0 20px;
}
.filter {
  margin-top: 30px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  padding: 0 20px;
  .title {
    height: 46px;
    line-height: 46px;
  }
  .selects {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      label {
        font-size: 14px;
        color: #666666;
        margin-right: 20px;
      }
      .datePicker {
        width: 502px;
      }
      .Picker {
        width: 200px;
      }
      .dateTimeNull,
      .selectNull {
        height: 40px;
        line-height: 40px;
        background: #f5f7fa;
        border-radius: 6px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
      }
      &:first-child {
        width: 100%;
        label {
          margin-right: 0;
        }
      }
    }
  }
}
.choosed {
  box-sizing: border-box;
  border: 1px solid #1989fa;
}
.success {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 170px;
  img {
    width: 44px;
    height: 44px;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      display: flex;
      flex-direction: row;
      span {
        color: #409efd;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        &:first-child {
          margin-bottom: 2px;
        }
      }
      label {
        font-size: 14px;
        color: #666666;
        margin-right: 20px;
        line-height: 34px;
      }
      div {
        width: 200px;
        height: 34px;
        line-height: 34px;
        background: #f5f7fa;
        border-radius: 6px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        font-size: 14px;
        color: #333333;
        padding: 0 10px;
      }
      &:first-child {
        flex-direction: column;
        margin-bottom: 14px;
      }
    }
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
