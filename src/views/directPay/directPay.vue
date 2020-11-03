<template>
  <div class="workDetail">
    <!-- 顶部菜单 -->
    <div class="menuOuter">
      <div class="menuList">
      <div class="saveBtns">
        <el-button class="cancel" @click="$router.push('index')"
          >取消</el-button
        >
        <el-button class="sure" type="primary" @click="sure()">确定</el-button>
      </div>
    </div>
    </div>
    <!-- 内容区域 -->
    <el-card class="content">
      <div class="forms">
        <!-- right -->
        <ul class="right">
          <li>
            <div></div>
            <div class="shortBoxs">
              <div class="doubleTitle">原币</div>
              <div class="doubleTitle">本币</div>
            </div>
          </li>
          <li>
            <label class="label"> <span class="redPot">*</span>本次付款</label>
            <div class="shortBoxs">
              <div>
                <el-input
                  v-model="discount_original"
                  class="doubleBox"
                ></el-input>
              </div>
              <div>
                <el-input v-model="discount_local" class="doubleBox" @blur="blur"></el-input>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="tableCard">
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
          prop="aph02"
          label="项次"
          fixed="left"
          min-width="120px"
          align="center"
        >
          <template slot-scope="scope">
            <div>
              <div v-if="displayType == 'edit'">
                <el-input
                  v-model="scope.row.aph02"
                  placeholder="项次"
                ></el-input>
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
              <div v-if="displayType == 'edit'">
                <el-select v-model="scope.row.aph03" placeholder="类型">
                  <el-option
                    v-for="item in headData.typeData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    <span
                      style="float: left; color: #8492a6; font-size: 13px"
                      >{{ item.value }}</span
                    >
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
                v-if="displayType == 'edit'"
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
                v-if="displayType == 'edit'"
                @click="selectDialog('aph04', scope.$index)"
              >
                {{ scope.row.aph04 }}
              </div>
              <div v-else>{{ scope.row.aph04 }}</div>
            </div>
          </template>
        </el-table-column>
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
                v-if="displayType == 'edit'"
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
                v-if="displayType == 'edit'"
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
                v-if="displayType == 'edit'"
                class="date"
              >
              </el-date-picker>
              <div v-else>{{ scope.row.aph07 }}</div>
            </div>
          </template>
        </el-table-column>
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
                v-if="displayType == 'edit'"
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
              <div v-if="displayType == 'edit'">
                <el-input
                  v-model="scope.row.aph14"
                  placeholder="汇率"
                ></el-input>
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
              <div v-if="displayType == 'edit'">
                <el-input
                  @input="aph05f_input(scope)"
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
              <div v-if="displayType == 'edit'">
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
    </el-card>

    <!-- 确认弹框 -->
    <el-dialog
      :visible.sync="dialogShow"
      width="470px"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <span class="tips">分录底稿已存在，是否保存？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close(0)" class="btn">取 消</el-button>
        <el-button type="primary" @click="close(1)" class="btn"
          >确 认</el-button
        >
      </span>
    </el-dialog>

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
import { payCreditList, updatePayCredit } from "@/api/payment_credit";
import { updatePayDebit } from "@/api/payment_debit"
export default {
  components: {
    SelectData,
  },
  data() {
    return {
      writeOffParams: {
        operation_type: this.$route.query.operation_type,
        operation_code: this.$route.query.operation_code,
      },
      curPane: 0, //当前tabs页
      displayType: "edit", // 展示类型：show:显示状态  edit:编辑状态
      discount_original: this.$route.query.apa31f, //原币
      discount_local: this.$route.query.apa31, //本币
      dialogShow: false, //确认框
      tableData: [], //表格内容
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
  watch:{

  },
  created() {
    this.getPayCreditList();
  },
  methods: {
    // 确定
    sure() {
      this.updatePayCredit()
    },
    //
    close(val) {
      if (val == 0) {
        this.dialogShow = false;
      } else {
        this.dialogShow = false;
      }
    },
    // 原币部分填完自动提交
    blur(){
      if(this.discount_original != "" && this.discount_local != ""){
        console.log(this.discount_original,this.discount_local)
        let params={
          operation_code:this.writeOffParams.operation_code,
          operation_type:this.writeOffParams.operation_type,
          records:[{
            id:"",
            apg01:this.writeOffParams.operation_code,
            apg02:"",
            apg04:"",
            apg06:"",
            apg05f:this.discount_original,
            apg05:this.discount_local
          }]
        }
        updatePayDebit(params).then(res=>{
          if(res.status == 200){
            this.$message.success('付款成功！请填写表格内容')
          }else{
            this.$message.error(res.error.message)
          }
        })
      }
    },
    // 增加一行
    addRow() {
      let data = {
        id: "",
        aph01: this.writeOffParams.operation_code,
        aph02: 1, //项次
        aph03: "", //类型
        aph08: "", //银行
        aph04: "", //科目或账款
        aph16: "", //银行异动码
        nmc02: "", //核算项名称
        aph07: "", //到期日
        aph13: "", //币种
        aph14: "1", //汇率
        aph05f: "", //原币付款金额
        aph05: "", //本币付款金额
      };
      if(this.tableData.length == 0){
        data.aph02 = 1
        data.aph05f = this.discount_original
        data.aph05 = data.aph05f
      }else{
        data.aph02 = this.tableData[this.tableData.length -1].aph02 + 1 
      }
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
    //获取单身信息列表
    getPayCreditList() {
      let params = {
        operation_code: this.writeOffParams.operation_code,
        operation_type: this.writeOffParams.operation_type,
      };
      payCreditList(params).then((res) => {
        if (res.status == 200) {
          if (res.data.length == 0) {
            this.addRow();
          } else {
            this.tableData = res.data;
          }
        } else {
          this.$message.error("获取获取单身信息列表失败：" + res.error.message);
        }
      });
    },
    // 提交单身信息
    updatePayCredit(){
      let params = {
        operation_code: this.writeOffParams.operation_code,
        operation_type: this.writeOffParams.operation_type,
        records:this.tableData
      }
      console.log('直接付款的单身：', params)
      updatePayCredit(params).then(res=>{
        if (res.status == 200) {
          this.$message.success("更新冲账列表成功！");
          this.$router.push('index')
        } else {
          this.$message.error("更新冲账列表失败：" + res.error.message);
        }
      })
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
          this.dataSelect.searchApi = "meta/nmcs"
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
            console.log(this.tableData);
            if (val.length == 1) {
              this.tableData[this.rowIndex].aph08 = val[0].nma01;
            } else {
            }
            break;
          case "aph16":
            if (val.length == 1) {
              this.tableData[this.rowIndex].aph16 = val[0].nmc01;
            } else {
            }
            break;
          case "aph04":
            if (val.length == 1) {
              this.tableData[this.rowIndex].aph04 = val[0].aag01;
            } else {
            }
            break;
          case "aph13":
            if (val.length == 1) {
              this.tableData[this.rowIndex].aph13 = val[0].azi01;
            } else {
            }
            break;
          case "nmc02":
            if (val.length == 1) {
              this.tableData[this.rowIndex].nmc02 = val[0].nmc01;
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
    // 工具方法
    aph05f_input(scope){
      scope.row.aph05 = scope.row.aph05f
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
.workDetail {
  // 内容区域
  .content {
    width: 1202px;
    margin: 0 auto;
    margin-top: 20px;
    // 表单区域
    .forms {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 20px;
      .right {
        width: 370px;
        > li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          .shortBoxs {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 280px;
            .doubleBox {
              width: 130px;
            }
            .doubleTitle {
              width: 130px;
              height: 40px;
              line-height: 40px;
            }
          }
          .img {
            width: 86px;
            height: 86px;
            background: #f5f7fa;
          }
        }
      }
    }
  }
  .tips {
    display: block;
    width: 100%;
    color: #909399;
    font-size: 14px;
    text-align: center;
  }
  .dialog-footer {
    .btn {
      width: 120px;
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
}
</style>
