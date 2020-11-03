<template>
  <div class="tableBox">
    <el-table
      :data="tableData"
      v-loading="false"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%"
      :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
      :cell-style="{ background: '#FCFDFF', color: '#666666' }"
    >
      <el-table-column
        v-if="tableEdit == true && tableData.length > 0"
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
                v-if="scope.$index == tableData.length - 1"
                @click="addRow()"
                class="el-icon-circle-plus"
                style="color: #409efd; width: 30px; cursor: pointer"
              ></i>
              <i
                @click="deleteRow(scope.row)"
                class="el-icon-remove"
                style="color: #f56c6c; width: 30px; cursor: pointer"
              ></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb02"
        label="项次"
        fixed="left"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input v-model="scope.row.abb02" placeholder="项次"></el-input>
            </div>
            <div v-else>{{ scope.row.abb02 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb03"
        label="科目编号"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="tableEdit == true"
              @click="selectDialog('abb03', scope.$index)"
            >
              {{ scope.row.abb03 }}
            </div>
            <div v-else>{{ scope.row.abb03 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb03_aag02"
        label="科目名称"
        min-width="170px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="abb05"
        label="部门编号"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="tableEdit == true"
              @click="selectDialog('abb05', scope.$index)"
            >
              {{ scope.row.abb05 }}
            </div>
            <div v-else>{{ scope.row.abb05 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb06"
        label="借贷别"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-select v-model="scope.row.abb06" placeholder="借贷别">
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
            <div v-else>{{ scope.row.abb06 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb24"
        label="原币币种"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="tableEdit == true"
              @click="selectDialog('abb24', scope.$index)"
            >
              {{ scope.row.abb24 }}
            </div>
            <div v-else>{{ scope.row.abb24 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb25"
        label="汇率"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input v-model="scope.row.abb25" placeholder="汇率"></el-input>
            </div>
            <div v-else>{{ scope.row.abb25 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb07f"
        label="原币金额"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb07f"
                placeholder="原币金额"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb07f }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb07"
        label="本币金额"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb07"
                placeholder="本币金额"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb07 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb08"
        label="项目编号"
        min-width="170px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="tableEdit == true"
              @click="selectDialog('abb08', scope.$index)"
            >
              {{ scope.row.abb08 }}
            </div>
            <div v-else>{{ scope.row.abb08 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb35"
        label="核算项-9（WBS）"
        min-width="180px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb35"
                placeholder="核算项-9（WBS）"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb35 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb36"
        label="核算项-10"
        min-width="180px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb36"
                placeholder="核算项-10（WBS）"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb36 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb11"
        label="核算项-1"
        min-width="170px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb11"
                placeholder="核算项-1"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb11 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb12"
        label="核算项-2"
        min-width="170px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb12"
                placeholder="核算项-2"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb12 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb13"
        label="核算项-3"
        min-width="170px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb13"
                placeholder="核算项-3"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb13 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb14"
        label="核算项-4"
        min-width="170px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb14"
                placeholder="核算项-4"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb14 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb37"
        label="核算项-关系人"
        min-width="170px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="tableEdit == true">
              <el-input
                v-model="scope.row.abb37"
                placeholder="核算项-关系人"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.abb37 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="abb04"
        label="摘要"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- <div>
            <div
              class="edit"
              v-if="tableEdit == true"
              @click="selectDialog('abb04', scope.$index)"
            >
              {{ scope.row.abb04 }}
            </div>
            <div v-else>{{ scope.row.abb04 }}</div>
          </div> -->
          <div>
                <div v-if="tableEdit == true">
                  <el-input
                    v-model="scope.row.abb04"
                    placeholder="摘要"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.abb04 }}</div>
              </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 合计 -->
    <div class="countBox">
      <div class="line1">
        <div class="row1"></div>
        <div class="row2">总金额</div>
      </div>
      <div class="line2">
        <div class="row1">借方</div>
        <div class="row2">
          <el-input
            v-model="countSum.dibet"
            class="elInput"
            :disabled="editType == 'search' ? false : true"
            v-if="tableEdit == true"
          ></el-input>
          <div class="showData" v-else>
            {{ countSum.dibet }}
          </div>
        </div>
      </div>
      <div class="line3">
        <div class="row1">贷方</div>
        <div class="row2">
          <el-input
            v-model="countSum.credit"
            class="elInput"
            :disabled="editType == 'search' ? false : true"
            v-if="tableEdit == true"
          ></el-input>
          <div class="showData" v-else>
            {{ countSum.credit }}
          </div>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <el-button
        type="primary"
        class="sureBtn"
        v-if="tableEdit == true"
        @click="cancel"
        >取消
      </el-button>
      <el-button
        type="primary"
        class="sureBtn"
        v-if="tableEdit == true"
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
import { gemsList, azisList, aagsList, pjasList } from "@/api/basic";
export default {
  components: {
    SelectData,
  },
  props: {
    // 展示类型：show:显示状态  edit:编辑状态
    displayType: String,
    // 编辑类型： entry:录入  change:更改  search:查询
    editType: String,
    // 总金额
    // countSum: Object,
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
        this.tableEdit = newval;
      },
      immediate: true,
      deep: true,
    },
    accountsList: {
      handler(newval, oldval) {
        this.tableData = newval;
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      operation_type: "aglt110",
      tableData: [],
      tableEdit: false, //表格是否为编辑状态
      countSum: {
        dibet: "",
        credit: "",
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
        // 科目
        head_abb03: [
          { name: "aag01", title: "科目编号" },
          { name: "aag02", title: "科目名称" },
          { name: "aag03", title: "科目性质" },
          { name: "aag13", title: "额外名称" },
          { name: "aag04", title: "资产损益别" },
          { name: "aag07", title: "统制明细别" },
          { name: "aag24", title: "科目层级" },
        ],
        // 部门
        head_abb05: [
          { name: "gem01", title: "部门编号" },
          { name: "gem02", title: "部门名称" },
        ],
        // 币种
        head_abb24: [
          { name: "azi01", title: "币种代码" },
          { name: "azi02", title: "币种说明" },
        ],
        // 项目编号
        head_abb08: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        // 摘要
        // head_abb04:[
        //   { name: "pja01", title: "常用摘要编号" },
        //   { name: "pja02", title: "常用摘要" },
        // ],
        // 借贷别
        typeData: [
          {
            value: "1",
            label: "借方",
          },
          {
            value: "2",
            label: "贷方",
          },
        ],
      },
    };
  },
  methods: {
    sure() {
      this.$emit("accountSure", this.tableEdit, this.tableData);
    },
    cancel() {
      this.tableEdit = false;
      this.$emit("accountCancel", this.tableEdit);
    },
    // 增加一行
    addRow() {
      let data = {
        id: "",
        npq01: this.operation_code, //账款编号（同作业编码）
        abb02: "", //项次
        abb03: "", //科目编号
        abb03_aag02: "", //科目名称
        abb05: "", //部门编号
        abb06: "", //借贷别
        abb24: "", //原币币种
        abb25: "", //汇率
        abb07f: "", //原币金额
        abb07: "", //本币金额
        abb08: "", //项目编号
        abb35: "", //核算项-9（WBS）
        abb36: "", //核算项-10
        abb11: "", //核算项1
        abb12: "", //核算项2
        abb13: "", //核算项3
        abb14: "", //核算项4
        abb37: "", //核算项-关系人
        abb04: "", //摘要
      };
      this.tableData.push(data);
    },
    // 删除当前行
    deleteRow(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.splice(val, 1);
        if (this.tableData.length == 0) {
          this.addRow();
        }
      });
    },
    // 数据选择弹出框相关操作
    // 数据选择
    selectDialog(type, rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "abb03":
          this.getAagsList();
          this.dataSelect.headList = this.headData.head_abb03;
          let filter_abb03 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_abb03;
          this.dataSelect.searchApi = "meta/aags"
          this.dataSelect.dialogTitle = "科目";
          break;
        case "abb05":
          this.getGemsList();
          this.dataSelect.headList = this.headData.head_abb05;
          let filter_abb05 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_abb05;
          this.dataSelect.searchApi = "meta/gems"
          this.dataSelect.dialogTitle = "部门";
          break;
        case "abb24":
          this.getAzisList();
          this.dataSelect.headList = this.headData.head_abb24;
          let filter_abb24 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_abb24;
          this.dataSelect.searchApi = "meta/azis"
          this.dataSelect.dialogTitle = "币种";
          break;
        case "abb08":
          this.getPjasList();
          this.dataSelect.headList = this.headData.head_abb08;
          let filter_abb08 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_abb08;
          this.dataSelect.searchApi = "meta/gjas"
          this.dataSelect.dialogTitle = "项目编号";
          break;
        // case "abb04":
        //   this.dataSelect.headList = this.headData.head_abb04;
        //   this.dataSelect.dialogTitle = "摘要";
        //   break;
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
          // 科目
          case "abb03":
            this.tableData[this.rowIndex].abb03 = val[0].aag01;
            this.tableData[this.rowIndex].abb03_aag02 = val[0].aag02;
            break;
          // 部门
          case "abb05":
            this.tableData[this.rowIndex].abb05 = val[0].gem01;
            break;
          // 币种
          case "abb24":
            this.tableData[this.rowIndex].abb24 = val[0].azi01;
            break;
          // 项目编号
          case "abb08":
            this.tableData[this.rowIndex].abb08 = val[0].pja01;
            break;
          // 摘要
          // case "abb04":
          //   break;
          default:
            return;
            break;
        }
      }
    },
    // *** 获取数据 ***
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
    // 币种
    getAzisList() {
      azisList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取币种列表失败：" + res.error.message);
        }
      });
    },
    // 项目编号
    getPjasList() {
      pjasList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取项目编号列表失败：" + res.error.message);
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
    width: 328px;
    height: 57px;
    margin-top: 15px;
    display: flex;
    .line1 {
      height: 55px;
      width: 42px;
      margin-right: 36px;
      .row1 {
        height: 16px;
        width: 42px;
        margin-bottom: 7px;
      }
      .row2 {
        height: 32px;
        width: 42px;
        margin-right: 36px;
        color: #666666;
        font-size: 14px;
        line-height: 32px;
      }
    }
    .line2 {
      height: 55px;
      width: 120px;
      margin-right: 8px;
      .row1 {
        height: 16px;
        width: 120px;
        margin-bottom: 7px;
        color: #333333;
        font-size: 14px;
        line-height: 16px;
      }
      .row2 {
        height: 32px;
        width: 120px;
        margin-right: 36px;
        .el-input /deep/ .el-input__inner {
          width: 120px;
          height: 32px;
        }
        .showData {
          height: 32px;
          width: 120px;
          border: 1px solid #e4e7ed;
          border-radius: 4px;
          line-height: 32px;
          text-align: right;
          box-sizing: border-box;
          padding-right: 8px;
        }
      }
    }
    .line3 {
      height: 55px;
      width: 120px;
      margin-right: 8px;
      .row1 {
        height: 16px;
        width: 120px;
        margin-bottom: 7px;
        color: #333333;
        font-size: 14px;
        line-height: 16px;
      }
      .row2 {
        height: 32px;
        width: 120px;
        .el-input /deep/ .el-input__inner {
          width: 120px;
          height: 32px;
        }
        .showData {
          height: 32px;
          width: 120px;
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
  .sureBtn {
    float: left;
    margin-top: 20px;
    width: 100px;
  }
}
</style>