<template>
  <div class="tableBox">
    <div class="tableTitle">付款部分</div>
    <el-table
      :data="countSum.tableData"
      v-loading="false"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%"
      :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
      :cell-style="{ background: '#FCFDFF', color: '#666666' }"
    >
      <el-table-column
        v-if="countSum.tableEdit == true && countSum.tableData.length > 0"
        prop="id"
        label="增 / 删"
        fixed="left"
        min-width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div style="font-size: 24px; width: 100%; height: 100%">
              <i
                v-if="scope.$index == countSum.tableData.length - 1"
                @click="addRow()"
                class="el-icon-circle-plus"
                style="color: #409efd; width: 30px; cursor: pointer"
              ></i>
              <i
                @click="deleteRow(scope.$index)"
                class="el-icon-remove"
                style="color: #f56c6c; width: 30px; cursor: pointer"
              ></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph02"
        label="项次"
        fixed="left"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input v-model="scope.row.aph02" placeholder="项次"></el-input>
            </div>
            <div v-else>{{ scope.row.aph02 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph03"
        label="类型"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-select v-model="scope.row.aph03" placeholder="类型">
                <el-option
                  v-for="item in headData.typeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  <span style="float: left; color: #8492a6; font-size: 13px">{{
                    item.value
                  }}</span>
                  <span style="float: right; margin-left: 10px">{{
                    item.label
                  }}</span>
                </el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.aph03 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph08"
        label="银行"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('aph08', scope.$index)"
            >
              {{ scope.row.aph08 }}
            </div>
            <div v-else>{{ scope.row.aph08 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph04"
        label="科目或账款"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('aph04', scope.$index)"
            >
              {{ scope.row.aph04 }}
            </div>
            <div v-else>{{ scope.row.aph04 }}</div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop=""
        label="子账期项次"
        min-width="150px"
        align="center"
      >
      </el-table-column> -->
      <el-table-column
        prop="aph16"
        label="银行异动码"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('aph16', scope.$index)"
            >
              {{ scope.row.aph16 }}
            </div>
            <div v-else>{{ scope.row.aph16 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="nmc02"
        label="核算项名称"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('nmc02', scope.$index)"
            >
              {{ scope.row.nmc02 }}
            </div>
            <div v-else>{{ scope.row.nmc02 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph07"
        label="到期日"
        min-width="170px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <el-date-picker
              v-model="scope.row.aph07"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-if="countSum.tableEdit"
              class="date"
            >
            </el-date-picker>
            <div v-else>{{ scope.row.aph07 }}</div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop=""
        label="转票据"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-checkbox v-model="scope.row.apa13" :true-label="Y"></el-checkbox>
            </div>
            <div v-else><el-checkbox v-model="scope.row.apa13" disabled :false-label="N"></el-checkbox></div>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="aph13"
        label="币种"
        min-width="140px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('aph13', scope.$index)"
            >
              {{ scope.row.aph13 }}
            </div>
            <div v-else>{{ scope.row.aph13 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph14"
        label="汇率"
        min-width="140px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input v-model="scope.row.aph14" placeholder="汇率"></el-input>
            </div>
            <div v-else>{{ scope.row.aph14 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph05f"
        label="原币付款金额"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.aph05f"
                placeholder="原币付款金额"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.aph05f }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="aph05"
        label="本币付款金额"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.aph05"
                placeholder="本币付款金额"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.aph05 }}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="btnBox">
      <el-button
        type="primary"
        class="sureBtn"
        v-if="countSum.tableEdit"
        @click="cancel"
        >取消
      </el-button>
      <el-button
        type="primary"
        class="sureBtn"
        v-if="countSum.tableEdit"
        @click="sure"
        >确定
      </el-button>
    </div>
    

    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="dataSelect.selectLoading"
      :dialogTitle.sync="dataSelect.dialogTitle"
      :dialogVisible.sync="dataSelect.dialogVisible"
      :headList.sync="dataSelect.headList"
      :bodyData.sync="dataSelect.bodyData"
      :choosedData="dataSelect.choosedData"
      :searchApi="dataSelect.searchApi"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
  </div>
</template>

<script>
import SelectData from "@/components/selectData_normal";
import { nmasList, nmcsList, aagsList, azisList } from "../../api/basic";
export default {
  components: {
    SelectData,
  },
  props: {
    // 表格内容
    paymentList: Array,
    //表格是否为编辑状态
    paymentEdit: {
      type: Boolean,
      default: false,
    },
    operation_code: "", //账款编号
  },
  watch: {
    paymentEdit: {
      handler(newval, oldval) {
        this.countSum.tableEdit = newval;
      },
      immediate: true,
      deep: true,
    },
    paymentList: {
      handler(newval, oldval) {
        this.countSum.tableData = newval;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      countSum: {
        tableData: [],
        tableEdit: false, //表格是否为编辑状态
      },
      rowIndex: "", //当前点击的行数
      //数据选择弹出框
      dataSelect: {
        cur_input: "", // 当前点击的输入框
        dialogTitle: "数据选择", //当前弹框的title
        dialogVisible: false, //控制显示隐藏弹框
        headList: [], //表头
        bodyData: [], //表格数据
        choosedData: [], //选中的数据
        searchApi: "", //搜索框的接口地址
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
        selectLoading: true, // 弹窗组件表格加载状态
      },
      // 弹出框表格数据
      headData: {
        // 类型下拉框数据
        typeData: [
          {
            value: "0",
            label: "應收",
          },
          {
            value: "1",
            label: "支票",
          },
          {
            value: "2",
            label: "轉帳",
          },
          {
            value: "3",
            label: "郵資",
          },
          {
            value: "4",
            label: "匯盈",
          },
          {
            value: "5",
            label: "匯損",
          },
          {
            value: "6",
            label: "折讓沖帳",
          },
          {
            value: "7",
            label: "D.M.沖帳",
          },
          {
            value: "8",
            label: "預付沖帳",
          },
          {
            value: "9",
            label: "暫付沖帳",
          },
          {
            value: "A",
            label: "手續費",
          },
          {
            value: "B",
            label: "轉帳手續費",
          },
          {
            value: "C",
            label: "應付電匯款",
          },
          {
            value: "Z",
            label: "代付匯票 ",
          },
        ],
        // *** 单身表格-表头 ***
        // 银行
        head_aph08: [
          { name: "nma01", title: "银行编号" },
          { name: "nma02", title: "银行名称" },
          { name: "nma28", title: "1.支存 2.活存 3.其他" },
          { name: "nma04", title: "银行账号" },
          { name: "nma09", title: "存款类别" },
          { name: "nma10", title: "存款币别" },
        ],
        // 银行异动码
        head_aph16: [
          { name: "nmc01", title: "银行异动码编号" },
          { name: "nmc02", title: "核算项名称" },
          { name: "nmc03", title: "存提款" },
        ],
        // 科目
        head_aph04: [
          { name: "aag01", title: "科目编号" },
          { name: "aag02", title: "科目名称" },
          { name: "aag03", title: "科目性质" },
          { name: "aag13", title: "额外名称" },
          { name: "aag04", title: "资产损益别" },
          { name: "aag07", title: "统制明细别" },
          { name: "aag24", title: "科目层级" },
        ],
        // 币种
        head_aph13: [
          { name: "azi01", title: "币种代码" },
          { name: "azi02", title: "币种说明" },
        ],
      },
    };
  },
  methods: {
    // 增加一行
    addRow() {
      let data = {
        id:"",
        aph01:this.operation_code,
        aph02: "", //项次
        aph03: "", //类型
        aph08: "", //银行
        aph04: "", //科目或账款
        aph16: "", //银行异动码
        nmc02: "", //核算项名称
        aph07: "", //到期日
        aph13: "RMD", //币种
        aph14: "1", //汇率
        aph05f: "", //原币付款金额
        aph05: "", //本币付款金额
      };
      this.countSum.tableData.push(data);
    },
    // 删除当前行
    deleteRow(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.countSum.tableData.splice(val, 1);
        if(this.countSum.tableData.length == 0){
          this.addRow()
        }
      });
    },
    sure() {
      this.$emit("paymentSure", this.countSum.tableEdit, this.countSum.tableData);
    },
    cancel() {
      this.countSum.tableEdit = false;
      this.$emit("paymentCancel", this.countSum.tableEdit);
    },

    // 数据选择弹出框相关操作
    // 数据选择
    selectDialog(type, rowIndex) {
      // console.log(rowIndex);
      this.rowIndex = rowIndex
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "aph08":
          this.getAprsList();
          this.dataSelect.headList = this.headData.head_aph08;
          let filter_aph08 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_aph08;
          this.dataSelect.searchApi = "meta/nmas"
          this.dataSelect.dialogTitle = "银行";
          break;
        case "aph16":
          this.getNmcsList();
          this.dataSelect.headList = this.headData.head_aph16;
          let filter_aph16 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_aph16;
          this.dataSelect.searchApi = "meta/nmcs"
          this.dataSelect.dialogTitle = "银行异动码";
          break;
        case "aph04":
          this.getAagsList();
          this.dataSelect.headList = this.headData.head_aph04;
          let filter_aph04 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_aph04;
          this.dataSelect.searchApi = "meta/aags"
          this.dataSelect.dialogTitle = "科目";
          break;
        case "aph13":
          this.getCoinTypes();
          this.dataSelect.headList = this.headData.head_aph13;
          let filter_aph13 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_aph13;
          this.dataSelect.searchApi = "meta/azis"
          this.dataSelect.dialogTitle = "币种";
          break;
          case "nmc02":
          this.getNmcsList();
          this.dataSelect.headList = this.headData.head_aph16;
          let filter_nmc02 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_nmc02;
          this.dataSelect.searchApi = "meta/nmcs "
          this.dataSelect.dialogTitle = "核算项名称";
          break;
        default:
          return;
          break;
      }
    },
    selectCancel(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = val;
      this.dataSelect.choosedData = val;
      this.dataSelect.selectLoading = true;
    },
    selectSure(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = val;
      this.dataSelect.choosedData = val;
      this.dataSelect.selectLoading = true;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "aph08":
            console.log(this.countSum.tableData)
          if(val.length == 1){
              this.countSum.tableData[this.rowIndex].aph08 = val[0].nma01
            }else{
            }
          break;
        case "aph16":
          if(val.length == 1){
              this.countSum.tableData[this.rowIndex].aph16 = val[0].nmc01
            }else{
            }
          break;
        case "aph04":
          if(val.length == 1){
              this.countSum.tableData[this.rowIndex].aph04 = val[0].aag01
            }else{
            }
          break;
        case "aph13":
          if(val.length == 1){
              this.countSum.tableData[this.rowIndex].aph13 = val[0].azi01
            }else{
            }
          break;
        case "nmc02":
          if(val.length == 1){
              this.countSum.tableData[this.rowIndex].nmc02 = val[0].nmc01
            }else{
            }
          break;
          default:
            return;
            break;
        }
      }
    },
    // *** 获取数据 ***
    // 获取银行列表
    getAprsList() {
      nmasList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取银行列表失败：" + res.error.message);
        }
      });
    },
    // 银行异动码
    getNmcsList() {
      nmcsList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取银行异动码列表失败：" + res.error.message);
        }
      });
    },
    // 科目
    getAagsList() {
      aagsList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取科目列表失败：" + res.error.message);
        }
      });
    },
    // 获取币种
    getCoinTypes() {
      azisList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tableBox {
  overflow: hidden;
  .tableTitle {
    height: 22px;
    line-height: 22px;
    font-size: 15px;
    color: #000000;
    margin-bottom: 16px;
  }
  .countBox {
    float: right;
    right: 0;
    width: 270px;
    height: 32px;
    margin-top: 15px;
    display: flex;
    .line1 {
      height: 32px;
      width: 112px;
      margin-right: 8px;
      // .row1{
      //   height: 16px;
      //   width: 42px;
      //   margin-bottom: 7px;
      // }
      .row2 {
        height: 32px;
        width: 112px;
        color: #666666;
        font-size: 14px;
        line-height: 32px;
      }
    }
    .line2 {
      height: 32px;
      width: 150px;
      // .row1{
      //   height: 16px;
      //   width: 120px;
      //   margin-bottom: 7px;
      //   color: #333333;
      //   font-size: 14px;
      //   line-height: 16px;
      // }
      .row2 {
        height: 32px;
        width: 150px;
        .el-input /deep/ .el-input__inner {
          width: 150px;
          height: 32px;
        }
        .showData {
          height: 32px;
          width: 150px;
          border: 1px solid #e4e7ed;
          border-radius: 4px;
          line-height: 32px;
          text-align: right;
          box-sizing: border-box;
          padding-right: 8px;
        }
      }
    }
  }
  .edit {
    text-align: left;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
  }
  .date {
    width: 100%;
  }
  .sureBtn {
    float: left;
    margin-top: 20px;
    width: 100px;
  }
}
</style>