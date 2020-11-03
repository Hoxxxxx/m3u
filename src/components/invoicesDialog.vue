<template>
  <div class="root">
    <el-dialog
      class="invoiceDialog"
      width="1012px"
      center
      :visible.sync="invoiceDialogVisible"
      :before-close="handleClose">
      <!-- 表单区域 -->
      <el-table
        :data="invoiceData"
        v-loading="invoiceLoading"
        element-loading-background = "rgba(0, 0, 0, 0.5)"
        element-loading-text = "数据正在加载中"
        element-loading-spinner = "el-icon-loading"
        :header-cell-style="{background:'#F3F5F9',color:'#333333'}"
        :cell-style="{background:'#FCFDFF',color:'#666666'}">
        <el-table-column
          prop="apk02"
          label="项次"
          fixed="left" 
          min-width="120px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="apk03"
          label="发票票号"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk05"
          label="发票日期"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk29"
          label="税率"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk08f"
          label="原币税前金额"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk08"
          label="本币税前金额"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk07f"
          label="原币税额"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk07"
          label="本币税额"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk06f"
          label="原币含税金额"
          min-width="120px">
        </el-table-column>
        <el-table-column
          prop="apk06"
          label="本币含税金额"
          min-width="120px">
        </el-table-column>
      </el-table>
      <div class="sum">
        <div class="sumTitle">合计</div>
        <div class="sumItem"></div>
        <div class="sumItem"></div>
        <div class="sumItem"></div>
        <div class="sumItem"></div>
        <div class="sumItem"></div>
        <div class="sumItem"></div>
      </div>
      <!-- 页脚 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateInvoice } from '@/api/invoice'

export default {
  props: {
    invoiceDialogVisible: Boolean,
    invoiceLoading: Boolean,
    invoiceData: Array,
    operation_type: String,
    operation_code: String
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose() {
      this.$emit('invoiceClose', false)
    },
    
    // 更新发票
    updateInvoiceList() {
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code
      }
      updateInvoice(params)
      .then( result => {
        if (result.status == 200 ){
          this.invoiceData = result.data
          this.$message.success('更新成功！')
        }else{
          this.$message.error("更新失败：" + result.error.message);
        }
      })
    },

  },
}
</script>

<style lang="less" scoped>
.invoiceDialog{
  .sum{
    width: 800px;
    height: 32px;
    display: flex;
    float: right;
    margin-top: 10px;
    margin-bottom: 10px;
    inline-size: inherit;
    .sumTitle{
      width: 28px;
      height: 32px;
      line-height: 32px;
      margin-right: 10px;
    }
    .sumItem{
      width: 122px;
      height: 32px;
      background: #F5F7FA;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      margin-right: 6px;
    }
    .sumItem:last-child{
      margin-right: 0;
    }
  }
  /deep/ .el-dialog--center .el-dialog__footer {
    display: inline-block;
  }
}
</style>