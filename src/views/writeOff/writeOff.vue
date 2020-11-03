<template>
  <div class="workDetail">
    <!-- 顶部菜单 -->
    <div class="menuOuter">
      <div class="menuList">
        <div class="saveBtns">
          <el-button class="cancel" @click="cancel()">取消</el-button>
          <el-button class="sure" type="primary" @click="sure()"
            >确定</el-button
          >
        </div>
      </div>
    </div>

    <!-- 冲账表格 -->
    <el-card class="tableCard">
      <div class="tableBox">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          style="width: 100%"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
          :cell-style="{ background: '#FCFDFF', color: '#666666' }"
        >
          <el-table-column
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
                    @click="deleteRow(scope.$index)"
                    class="el-icon-remove"
                    style="color: #f56c6c; width: 30px; cursor: pointer"
                  ></i>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="apv02"
            label="项次"
            min-width="150px"
            align="center"
          >
            <!-- <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.apv02"
                  placeholder="项次"
                ></el-input>
              </div>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="apv03"
            label="待抵账款编号"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div class="edit" @click="selectDialog('apv03', scope.$index)">
                  {{ scope.row.apv03 }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="apv05"
            label="子账期项次"
            min-width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="Show_01"
            label="原币账款金额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.Show_01"
                  placeholder="原币账款金额"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="Show_02"
            label="本币账款金额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.Show_02"
                  placeholder="本币账款金额"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="Show_03"
            label="原币未冲账额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.Show_03"
                  placeholder="原币未冲账额"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="Show_04"
            label="本币未冲账额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.Show_04"
                  placeholder="本币未冲账额"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="apv04f"
            label="原币冲款金额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.apv04f"
                  placeholder="原币冲款金额"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="apv04"
            label="本币冲款金额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.apv04"
                  placeholder="本币冲款金额"
                ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 合计 -->
        <div class="countBox">
          <div class="line1">
            <div class="row1"></div>
            <div class="row2">合计</div>
          </div>
          <div class="line2">
            <div class="row1">原币</div>
            <div class="row2">
              <el-input v-model="countSum.dibet" class="elInput"></el-input>
            </div>
          </div>
          <div class="line3">
            <div class="row1">本币</div>
            <div class="row2">
              <el-input v-model="countSum.credit" class="elInput"></el-input>
            </div>
          </div>
        </div>
      </div>
    </el-card>

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
import { writeOffList, updateWriteOff, getApv } from "@/api/writeOff";
import { aprsList } from "@/api/basic";

export default {
  components: { SelectData },
  data() {
    return {
      writeOffParams: {
        operation_type: this.$route.query.operation_type,
        operation_code: this.$route.query.operation_code,
      },
      tableLoading: true,
      tableData: [],
      countSum: {
        dibet: "",
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
        // 账款类型表头
        head_apv03: [
          { name: "sbi02", title: "项次" },
          { name: "sbi03", title: "待抵账款编号" },
          { name: "sbi04", title: "本币冲款金额" },
          { name: "sbi04f", title: "原币冲款金额" },
          { name: "sbi05", title: "子账期项次" },
        ],
      },
    };
  },
  created() {
    this.getWriteOffList();
  },
  methods: {
    // 取消
    cancel() {
      this.$router.push("index");
    },
    // 确定
    sure() {
      let params = {
        operation_code: this.writeOffParams.operation_code,
        operation_type: this.writeOffParams.operation_type,
        records: this.tableData,
      };
      updateWriteOff(params).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "冲账成功！",
            type: "success",
          });
          this.$router.push("index");
        } else {
          this.$message({
            message: res.message,
            type: "error",
          });
        }
      });
    },
    // 增加一行
    addRow() {
      let data = {
        id: "",
        apv01: this.writeOffParams.operation_code, //待抵账款编号
        apv02: "", //项次
        apv03: "", //待抵账款编号
        apv05: "", //子账期项次
        Show_01: "", //原币账款金额
        Show_02: "", //本币账款金额
        Show_03: "", //原币未冲账额
        Show_04: "", //本币未冲账额
        apv04f: "", //原币冲款金额
        apv04: "", //本币冲款金额
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
      });
    },

    // 获取冲账列表
    getWriteOffList() {
      writeOffList(this.writeOffParams).then((result) => {
        if (result.status == 200) {
          if (result.data.length == 0) {
            this.addRow();
          } else {
            this.tableData = result.data;
          }
          this.tableLoading = false;
        } else {
          this.$message.error("获取冲账列表失败：" + result.error.message);
        }
      });
    },
    // 更新冲账列表
    updateWriteOffList() {
      updateWriteOff(this.tableData).then((result) => {
        if (result.status == 200) {
          this.tableData = result.data;
          this.$message.error("更新冲账列表成功！");
        } else {
          this.$message.error("更新冲账列表失败：" + result.error.message);
        }
      });
    },

    // 获取待抵账款类型列表
    getApvList() {
      getApv().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取账款类型列表失败：" + res.error.message);
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
        case "apv03":
          this.getApvList();
          this.dataSelect.headList = this.headData.head_apv03;
          let filter_apv03 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_apv03;
          this.dataSelect.searchApi = "operations/apv/jtApv"
          this.dataSelect.dialogTitle = "待抵账款编号";
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
          case "apv03":
            if (val.length == 1) {
              this.tableData[this.rowIndex].apv02 = val[0].sbi02;
              this.tableData[this.rowIndex].apv03 = val[0].sbi03;
              this.tableData[this.rowIndex].apv05 = val[0].sbi05;
              this.tableData[this.rowIndex].apv04f = val[0].sbi04f;
              this.tableData[this.rowIndex].apv04 = val[0].sbi04;
            } else {
            }
            break;
          default:
            return;
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
.workDetail {
  // 内容区域
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
}
</style>
