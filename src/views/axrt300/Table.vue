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
        label="来源类型"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="date"
        label="参考单号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="参考项次"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="产品编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="品名规格"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="原因码"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="单位"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="数量"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="WBS编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="科目"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="原币单价"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="原币税前金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="原币含税金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="本币单价"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="本币税前金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="本币含税金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发票单价"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发票税前金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发票含税金额"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-1"
        min-width="120px">
      </el-table-column>
    </el-table>
    <!-- 合计 -->
    <div class="countBox">
      <div class="line1">
        <div class="row2">本币单身合计税前金额</div>
      </div>
      <div class="line2">
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
        <div class="row2">本币单身合计含税金额</div>
      </div>
      <div class="line4">
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
      <div class="line5">
        <div class="row2">非MISC数量合计</div>
      </div>
      <div class="line6">
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
    width: 940px;
    height: 32px;
    margin-top: 15px;
    display: flex;
    // 输入框label
    .line1, .line3 ,.line5{
      height: 32px;
      width: 140px;
      margin-right: 8px;
      // .row1{
      //   height: 32px;
      //   width: 140px;
      //   margin-bottom: 7px;
      // }
      .row2{
        height: 32px;
        width: 140px;
        color: #666666;
        font-size: 14px;
        line-height: 32px;
      }
    }
    .line5{
      width: 105px;
      .row2{
        width: 105px;
      }
    }
    // 输入框
    .line2, .line4, .line6{
      height: 55px;
      width: 150px;
      margin-right: 40px;
      // .row1{
      //   height: 16px;
      //   width: 120px;
      //   margin-bottom: 7px;
      //   color: #333333;
      //   font-size: 14px;
      //   line-height: 16px;
      // }
      .row2{
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
    }
  }
}
</style>