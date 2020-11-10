<template>
  <div>
    <el-dialog
      :visible.sync="dialogShow"
      width="900px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="selectTitle">{{ dialogTitle }}</div>
      <div class="filterBox" v-if="filter.length > 0">
        <div class="filter">
          <el-input
            v-for="(item, index) in filter"
            :key="index"
            @clear="search_all"
            :clearable="true"
            v-model="filter_key[item.model_key_search]"
            :placeholder="`请输入关键词${item.label}`"
            class="searchInput"
          ></el-input>
          <el-button class="searchBtn" @click="search_single()"
            >搜 索</el-button
          >
        </div>
      </div>
      <div class="msgOutter" v-if="keyMsg.length > 0">
        <div class="msg" v-for="(item, index) in keyMsg" :key="index">
          <label class="label">{{ item.label }}</label>
          <div class="msgBox">{{ msg_key[item.model_key_msg] }}</div>
        </div>
      </div>
      <div class="selectData">
        <el-table
          ref="selectData"
          max-height="400"
          :data="tableData"
          v-loading="showLoading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
          element-loading-text="数据正在加载中"
          element-loading-spinner="el-icon-loading"
          :highlight-current-row="editType == 'search' ? false : true"
          @selection-change="handleSelectionChange"
          @current-change="handleCurrentChange"
          @row-click="rowClick"
          :header-cell-style="{ background: '#F3F5F9', color: '#333333' }"
        >
          <el-table-column
            v-if="editType == 'search' && tableData.length > 0"
            :type="editType == 'search' ? 'selection' : ''"
            width="55"
          >
          </el-table-column>
          <el-table-column
            v-for="(item, index) in tableHead"
            :key="index"
            :prop="item.name"
            :label="item.title"
            align="center"
            min-width="120px"
          ></el-table-column>
        </el-table>
      </div>
      <div class="extraBtns">
        <div>
          <el-button style="width: 110px" @click="selectCancel()"
            >取 消</el-button
          >
          <el-button style="width: 110px" @click="selectSure()" type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import axios from "axios";
export default {
  props: {
    // 加载效果
    isLoading: Boolean,
    // title
    dialogTitle: {
      type: String,
      default: "数据选择",
    },
    // 显示弹框
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 表头
    headList: {
      type: Array,
      default: [],
    },
    // 表格数据
    bodyData: {
      type: Array,
      default: [],
    },
    // 选中的数据
    choosedData: {
      type: Array,
      default: [],
    },
    // 当前编辑状态：录入、更改、查询
    editType: {
      type: String,
      default: "",
    },
    // 搜索框的api地址
    searchApi: {
      type: String,
      default: "",
    },
    // 搜索类型
    searchType: {
      type: String,
      default: "single",
    },
    // 搜索时需要携带的固定值参数
    searchParams: {
      type: Object,
    },
    // 筛选条件
    filter: Array,
    // 重点信息显示
    keyMsg: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      showLoading:false,
      dialogShow: false,
      filter_key: {}, //条件筛选的值
      msg_key: {}, //需要显示的数据
      choosed: [], //返回选择的数据
      tableHead: [], //表头
      tableData: [], //表格数据
    };
  },
  watch: {
    isLoading:{
      handler(newval,oldval){
        this.showLoading = newval
      },
      immediate:true
    },
    dialogVisible: {
      handler(newval, oldval) {
        this.dialogShow = newval;
      },
      immediate: true,
    },
    choosedData: {
      handler(newval, oldval) {
        this.choosed = newval;
      },
      immediate: true,
    },
    headList: {
      handler(newval, oldval) {
        this.tableHead = newval;
      },
      immediate: true,
      deep: true,
    },
    bodyData: {
      handler(newval, oldval) {
        this.tableData = newval;
      },
      immediate: true,
      deep: true,
    },
    filter: {
      handler(newval, oldval) {
        // 通过过滤条件数组的length判断是否需要通过点击才执行数据获取
        if (newval.length == 0) {
          this.search_single();
        } else {
          let res = {};
          newval.forEach((ele) => {
            let temp = ele.model_key_search;
            res[temp] = "";
          });
          this.filter_key = res;
        }
      },
      deep:true
    },
    keyMsg: {
      handler(newval, oldval) {
        let res = {};
        newval.forEach((ele) => {
          let temp = ele.model_key_msg;
          res[temp] = "";
        });
        this.msg_key = res;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.choosed = val;
    },
    // 单选
    handleCurrentChange(val) {
      this.choosed = [];
      val == null ? (this.choosed = []) : this.choosed.push(val);
    },
    // 取消/确定
    selectCancel() {
      this.$refs.selectData.setCurrentRow();
      this.$emit("selectCancel", this.choosed);
    },
    selectSure() {
      this.$emit("selectSure", this.choosed);
    },
    // 单选的搜索功能
    search_single() {
      this.showLoading = true;
      if (this.searchType == "mixed") {
        let workParams = {};
        Object.keys(this.filter_key).forEach((key) => {
          workParams["filter[" + key + "]"] = this.filter_key[key];
        });
        request.get(this.searchApi, {}, { params: workParams }).then((res) => {
          if (res.status == 200) {
            this.showLoading = false;
            this.tableData = res.data;
          }
        });
      } else {
        let temp = this.searchParams ? this.searchParams : {}
        let params = { ...temp, ...this.filter_key };
        request.get(this.searchApi, {}, { params }).then((res) => {
          if (res.status == 200 || res.code == 0) {
            this.showLoading = false;
            this.tableData = res.data;
          }
        });
      }
    },
    // 清空时重新搜索所有值
    search_all() {
      request.get(this.searchApi, {}, {}).then((res) => {
        if (res.status == 200) {
          this.tableData = res.data;
        }
      });
    },
    // 表格行点击
    rowClick(row) {
      for (let key in this.msg_key) {
        this.msg_key[key] = row[key];
      }
    },
  },
};
</script>

<style lang="less" scoped>
.selectTitle {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #000;
}
.filter {
  border-bottom: 1px solid #ebeef5;
}
.filter {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .searchInput {
    max-width: 270px;
    min-width: 200px;
    flex: 1 1 auto;
    margin: 0 10px 10px 0;
  }
}
.extraBtns {
  width: 100%;
  margin: 30px 0 20px 0;
  div {
    width: 240px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
.searchBtn {
  width: 95px;
  margin-bottom: 10px;
  border: 1px solid #409efd;
  color: #409efd;
}
.msgOutter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .msg {
    width: 270px;
    margin: 0 10px 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .label {
      width: 80px;
      margin-right: 10px;
      font-size: 14px;
      color: #666666;
      font-weight: 400;
    }
    .msgBox {
      width: 190px;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid #e4e7ed;
      color: #333333;
      font-size: 14px;
    }
  }
}
</style>