<template>
  <div class="tableBox">
    <div class="tableTitle">账款部分</div>
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
        prop="apg02"
        label="项次"
        fixed="left"
        min-width="120px"
        align="center"
      >
        <!-- <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.apg02"
                placeholder="项次"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.apg02 }}</div>
          </div>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="apg04"
        label="账款编号"
        min-width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('apg04', scope.$index)"
            >
              {{ scope.row.apg04 }}
            </div>
            <div v-else>{{ scope.row.apg04 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apg06"
        label="子账期项次"
        min-width="120px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="apa02"
        label="账款日期"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <el-date-picker
              v-model="scope.row.apa02"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-if="countSum.tableEdit"
              class="date"
            >
            </el-date-picker>
            <div v-else>{{ scope.row.apa02 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apa13"
        label="币种"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div
              class="edit"
              v-if="countSum.tableEdit"
              @click="selectDialog('apa13', scope.$index)"
            >
              {{ scope.row.apa13 }}
            </div>
            <div v-else>{{ scope.row.apa13 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apa14"
        label="汇率"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input v-model="scope.row.apa14" placeholder="汇率"></el-input>
            </div>
            <div v-else>{{ scope.row.apa14 }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apg05f"
        label="原币账款"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.apg05f"
                placeholder="原币账款"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.apg05f }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="apg05"
        label="本币账款"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div v-if="countSum.tableEdit">
              <el-input
                v-model="scope.row.apg05"
                placeholder="本币账款"
              ></el-input>
            </div>
            <div v-else>{{ scope.row.apg05 }}</div>
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
import {aprsList,azisList} from "../../api/basic"
import {getApg} from '@/api/payment_debit'
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
    operation_code:"",//账款编号
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
      rowIndex:"",//当前点击的行数
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
        // 账款编号
        head_apg04: [
          { name: "via02", title: "借方项次" },
          { name: "via04", title: "账款编号" },
          { name: "via06", title: "子账期项次" },
          { name: "via002", title: "账款日期" },
          { name: "via013", title: "币种" },
          { name: "via014", title: "汇率" },
          { name: "via05f", title: "原币冲账金额" },
          { name: "via05", title: "本币冲账金额" },
        ],
        // 币种
        head_apa13: [
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
        apg01:this.operation_code,
        apg02:"",//项次
        apg04:"",//账款编号
        apg06:"",//子账期项次
        apa02:"",//账款日期
        apa13:"",//币种
        apa14:"",//汇率
        apg05f:"",//原币冲账金额
        apg05:""//本币冲账金额
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
      // console.log(rowIndex);
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "apg04":
          this.getApg()
          this.dataSelect.headList = this.headData.head_apg04;
          let filter_apg04 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_apg04;
          this.dataSelect.searchApi = "operations/apg/jtApg"
          this.dataSelect.dialogTitle = "账款编号";
          break;
        case "apa13":
          this.getCoinTypes()
          this.dataSelect.headList = this.headData.head_apa13;
          let filter_apa13 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_apa13;
          this.dataSelect.searchApi = "meta/azis"
          this.dataSelect.dialogTitle = "币种";
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
          case "apg04":
            if(val.length == 1){
              this.countSum.tableData[this.rowIndex].apg02 = val[0].via02
              this.countSum.tableData[this.rowIndex].apg04 = val[0].via04
              this.countSum.tableData[this.rowIndex].apg06 = val[0].via06
              this.countSum.tableData[this.rowIndex].apa02 = val[0].via002
              this.countSum.tableData[this.rowIndex].apa13 = val[0].via013
              this.countSum.tableData[this.rowIndex].apa14 = val[0].via014
              this.countSum.tableData[this.rowIndex].apg05f = val[0].via05f
              this.countSum.tableData[this.rowIndex].apg05 = val[0].via05
            }else{
            }
            break;
          case "apa13":
            if(val.length == 1){
              this.countSum.tableData[this.rowIndex].apa13 = val[0].azi01
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
    // 获取账款类型
    getApg(){
      getApg().then(res=>{
        if(res.status == 200){
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data
        }else{
          this.$message.error("获取账款类型列表失败：" + res.error.message);
        }
      })
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
  .tableTitle {
    height: 22px;
    line-height: 22px;
    font-size: 15px;
    color: #000000;
    margin-bottom: 16px;
  }
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
  .sureBtn{
    float: left;
    margin-top: 20px;
    width: 100px;
  }
}
</style>