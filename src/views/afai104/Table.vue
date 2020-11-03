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
        label="科目"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="date"
        label="科目名称"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="部门"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="部门名称"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="借/贷"
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
        label="客户 厂商 员工"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户简称 厂商简称 员工姓名"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="参考单号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="项目编号"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-9（WEB）"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-10（费用原因）"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-1"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-2"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-3"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-4"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="核算项-关系人"
        min-width="120px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="摘要"
        min-width="120px">
      </el-table-column>
    </el-table>
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
