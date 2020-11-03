<template>
  <div class="tableBox">
    <el-table
      :data="tableData"
      v-loading = "false"
      element-loading-background = "rgba(0, 0, 0, 0.5)"
      element-loading-text = "数据正在加载中"
      element-loading-spinner = "el-icon-loading"
      style="width: 100%"
      :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
      :cell-style="{background:'#FCFDFF',color:'#666666'}">
      <el-table-column
        v-if="displayType == 'edit' && tableData.length > 0 "
        prop="id"
        label="增 / 删"
        fixed="left"
        min-width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <div style="font-size: 24px; width: 100%; height: 100%">
              <i v-if="scope.$index == tableData.length - 1"
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
        prop="id"
        label="项次"
        fixed="left" 
        min-width="120px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="异动别"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="date"
        label="存提异动"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="存提款异动码说明"
        min-width="140px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="银行编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="币种"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="汇率"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="原币金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="本币金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="科目编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="对方科目编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="摘要"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="关系人核算项"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项1"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="部门"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="WBS"
        min-width="120px">
      </el-table-column>
    </el-table>
    <!-- 合计 -->
    <div class="countBox">
      <div class="line1">
        <div class="row1">原币入账金额</div>
        <div class="row2">原币出账合计</div>
      </div>
      <div class="line2">
        <div class="row1">
          <el-input
            v-model="countSum.dibet"
            id="bill"
            class="elInput"
            :disabled="editType == 'search' ? false : true"
            v-if="displayType == 'edit'"
          ></el-input>
          <div class="showData" v-else>
           {{countSum.dibet}} 
          </div>
        </div>
        <div class="row2">
          <el-input
            v-model="countSum.dibet"
            id="bill"
            class="elInput"
            :disabled="editType == 'search' ? false : true"
            v-if="displayType == 'edit'"
          ></el-input>
          <div class="showData" v-else>
           {{countSum.dibet}} 
          </div>
        </div>
      </div>
      <div class="line3">
        <div class="row1">原币已冲合计</div>
        <div class="row2"></div>
      </div>
      <div class="line4">
        <div class="row1">
          <el-input
            v-model="countSum.credit"
            id="bill"
            class="elInput"
            :disabled="editType == 'search' ? false : true"
            v-if="displayType == 'edit'"
          ></el-input>
          <div class="showData" v-else>
            {{countSum.credit}}
          </div>
        </div>
        <div class="row2">
          <div class="showData"></div>
        </div>
      </div>
      <div class="line5">
        <div class="row1">本币入账金额</div>
        <div class="row2">本币出账合计</div>
      </div>
      <div class="line6">
        <div class="row1">
          <el-input
            v-model="countSum.credit"
            id="bill"
            class="elInput"
            :disabled="editType == 'search' ? false : true"
            v-if="displayType == 'edit'"
          ></el-input>
          <div class="showData" v-else>
            {{countSum.credit}}
          </div>
        </div>
        <div class="row2">
          <el-input
            v-model="countSum.credit"
            id="bill"
            class="elInput"
            :disabled="editType == 'search' ? false : true"
            v-if="displayType == 'edit'"
          ></el-input>
          <div class="showData" v-else>
            {{countSum.credit}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 展示类型：show:显示状态  edit:编辑状态
      displayType: String,
      // 编辑类型： entry:录入  change:更改  search:查询
      editType: String,
      // 表格内容
      // tableData: Array,
      // 总金额
      // countSum: Object,
    },
    data() {
      return {
        tableData: [{
          id: '1',
          date: '2016-05-02',
          name: '王小虎'
        }, {
          id: '2',
          date: '2016-05-04',
          name: '王小虎'
        }, {
          id: '3',
          date: '2016-05-01',
          name: '王小虎'
        }, {
          id: '4',
          date: '2016-05-03',
          name: '王小虎'
        }],
        countSum:{
          dibet: '2000.00',
          credit: '1000.00'
        }
      }
    },
    methods:{
    // 增加一行
    addRow(){},
    // 删除当前行
    deleteRow(val){
      console.log(val)
    }
  }
  }
</script>

<style lang="less" scoped>
.tableBox{
  overflow: hidden;
  .countBox{
    float: right;
    right: 0;
    width: 806px;
    height: 72px;
    margin-top: 15px;
    display: flex;
    // 输入框label
    .line1, .line3 ,.line5{
      height: 72px;
      width: 84px;
      margin-right: 8px;
      .row1, .row2{
        height: 32px;
        width: 84px;
        color: #666666;
        font-size: 14px;
        line-height: 32px;
      }
      .row1{
        margin-bottom: 8px;
      }
    }
    // 输入框
    .line2, .line4, .line6{
      height: 72px;
      width: 150px;
      margin-right: 40px;
      .row1, .row2{
        height: 32px;
        width: 150px;
        .el-input /deep/ .el-input__inner{
          width: 150px;
          height: 32px;
        }
        .showData{
          height: 32px;
          width: 150px;
          border: 1px solid #E4E7ED;
          border-radius: 4px;
          line-height: 32px;
          text-align: right;
          box-sizing: border-box;
          padding-right: 8px;
        }
      }
      .row1{
        margin-bottom: 8px;
      }
    }
    .line4{
      .row2{
        .showData{
          border: none;
        }
      }
    }
    .line6{
      margin-right: 0;
    }
  }
}
</style>