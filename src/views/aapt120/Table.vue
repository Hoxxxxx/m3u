<template>
  <div class="tableBox">
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
        prop="apb02"
        label="项次"
        fixed="left"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input v-model="scope.row.apb02" placeholder="项次"></el-input>
            </div>
            <div v-else>{{ scope.row.apb02 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb27"
        label="品名"
        min-width="150px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="apb09"
        label="数量"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input v-model="scope.row.apb09" placeholder="数量"></el-input>
            </div>
            <div v-else>{{ scope.row.apb09 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb28"
        label="单位"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input v-model="scope.row.apb28" placeholder="单位"></el-input>
            </div>
            <div v-else>{{ scope.row.apb28 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb35"
        label="项目编号"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('apb35', scope.$index)"
            >
              {{ scope.row.apb35 }}
            </div>
            <div v-else>{{ scope.row.apb35 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb36"
        label="WBS编号"
        min-width="180px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('apb36', scope.$index)"
            >
              {{ scope.row.apb36 }}
            </div>
            <div v-else>{{ scope.row.apb36 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb25"
        label="科目"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('apb25', scope.$index)"
            >
              {{ scope.row.apb25 }}
            </div>
            <div v-else>{{ scope.row.apb25 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb26"
        label="部门"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('apb26', scope.$index)"
            >
              {{ scope.row.apb26 }}
            </div>
            <div v-else>{{ scope.row.apb26 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb23"
        label="原币单价"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.apb23"
                placeholder="原币单价"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.apb23 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb24"
        label="原币金额"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.apb24"
                placeholder="原币金额"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.apb24 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb08"
        label="本币单价"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.apb08"
                placeholder="本币单价"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.apb08 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apb10"
        label="本币金额"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.apb10"
                placeholder="本币金额"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.apb10 }}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 合计 -->
    <div class="countBox">
      <div class="line1">
        <div class="row2">本币单身合计金额</div>
      </div>
      <div class="line2">
        <div class="row2">
          <el-input
            v-model="countSum.dibet"
            id="bill"
            class="elInput"
            v-if="displayType == 'edit'"
            disabled
          ></el-input>
          <div class="showData" v-else>
            {{ countSum.dibet }}
          </div>
        </div>
      </div>
    </div>
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
import {  aagsList, gemsList, pjbsList,pjasList} from "../../api/basic";
export default {
  components: {
    SelectData,
  },
  props: {
    // 展示类型：show:显示状态  edit:编辑状态
    displayType: String,
    // 编辑类型： entry:录入  change:更改  search:查询
    editType: String,
    // 表格内容
    accountsList: Array,
    //表格是否为编辑状态
    accountsEdit: {
      type: Boolean,
      default: false,
    },
    operation_code: "", //账款编号
  },
  watch: {
    accountsEdit: {
      handler(newval, oldval) {
        this.countSum.tableEdit = newval;
      },
      immediate: true,
      deep: true,
    },
    accountsList: {
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
        // *** 单身表格-表头 ***
        // 单位
        head_apb28: [
          { name: "apr01", title: "单位" },
          { name: "apr02", title: "说明" },
        ],
        // 项目编号
        head_apb35: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        // WBS编号
        head_apb36: [
          { name: "pjb02", title: "WBS编号" },
          { name: "pjb03", title: "WBS名称" },
          { name: "pjb01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
        ],
        // 科目
        head_apb25: [
          { name: "aag01", title: "科目编号" },
          { name: "aag02", title: "科目名称" },
          { name: "aag03", title: "科目性质" },
          { name: "aag13", title: "额外名称" },
          { name: "aag04", title: "资产损益别" },
          { name: "aag07", title: "统制明细别" },
          { name: "aag24", title: "科目层级" },
        ],
        // 部门
        head_apb26: [
          { name: "gem01", title: "部门编号" },
          { name: "gem02", title: "部门名称" },
        ],
      },
    };
  },
  methods: {
    // 增加一行
    addRow() {
      let data = {
        apb01: this.operation_code,//账款编号（同作业编码）
        apb02: "", //项次
        apb08: "", //本币单价
        apb09: "", //数量
        apb10: "", //本币金额
        apb23: "", //原币单价
        apb24: "", //原币金额
        apb25: "", //科目
        apb26: "", //部门
        apb27: "", //品名
        apb28: "", //单位
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
      this.$emit("accountSure", this.countSum.tableEdit, this.countSum.tableData);
    },
    cancel() {
      this.countSum.tableEdit = false;
      this.$emit("accountCancel", this.countSum.tableEdit);
    },

    // 数据选择弹出框相关操作
    // 数据选择
    selectDialog(type, rowIndex) {
      console.log(rowIndex);
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "apb28":
          this.dataSelect.headList = this.headData.head_apb28;
          this.dataSelect.dialogTitle = "单位";
          break;
        case "apb35":
          this.getPjasList()
          this.dataSelect.headList = this.headData.head_apb35;
          let filter_apb35 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_apb35;
          this.dataSelect.searchApi = "meta/gjas"
          this.dataSelect.dialogTitle = "项目编号";
          break;
        case "apb36":
          this.getPjbsList()
          this.dataSelect.headList = this.headData.head_apb36;
          let filter_apb36 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_apb36;
          this.dataSelect.searchApi = "meta/pjbs"
          this.dataSelect.dialogTitle = "WBS编号";
          break;
        case "apb25":
          this.getAagsList();
          this.dataSelect.headList = this.headData.head_apb25;
          let filter_apb25 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_apb25;
          this.dataSelect.searchApi = "meta/aags"
          this.dataSelect.dialogTitle = "科目";
          break;
        case "apb26":
          this.getGemsList()
          this.dataSelect.headList = this.headData.head_apb26;
          let filter_apb26 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_apb26;
          this.dataSelect.searchApi = "meta/gems"
          this.dataSelect.dialogTitle = "部门";
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
          case "apb28":
            if (val.length == 1) {
              // this.countSum.tableData[this.rowIndex].apg04 = val[0].apr01;
            } else {
            }
            break;
          case "apb35":
            if (val.length == 1) {
              this.countSum.tableData[this.rowIndex].apb35 = val[0].pja01;
            } else {
            }
            break;
          case "apb36":
            if (val.length == 1) {
              this.countSum.tableData[this.rowIndex].apb36 = val[0].pjb02;
            } else {
            }
            break;
          case "apb25":
            if (val.length == 1) {
              this.countSum.tableData[this.rowIndex].apb25 = val[0].aag01;
            } else {
            }
            break;
          case "apb26":
            if (val.length == 1) {
              this.countSum.tableData[this.rowIndex].apb26 = val[0].gem01;
            } else {
            }
            break;
          default:
            return;
            break;
        }
      }
    },
    // *** 获取数据 ***
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
    // 项目
    getPjasList() {
      pjasList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取部门列表失败：" + res.error.message);
        }
      });
    },
    // 部门
    getGemsList() {
      gemsList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取部门列表失败：" + res.error.message);
        }
      });
    },
    // WBS列表
    getPjbsList() {
      pjbsList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取WBS列表失败：" + res.error.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.tableBox {
  overflow: hidden;
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
      //   width: 150px;
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