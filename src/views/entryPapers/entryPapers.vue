<template>
  <div class="workDetail">
    <!-- 顶部菜单 -->
    <div class="menuOuter">
      <div class="menuList">
        <ul v-if="displayType == 'show'">
          <li @click="$router.push('index')">
            <span class="iconfont">&#xe7ed;</span>
            <span>回到上一页</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe797;</span>
            <span>录入</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe791;</span>
            <span>更改</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7c3;</span>
            <span>删除</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7bc;</span>
            <span>复制</span>
          </li>
          <li @click="singlePay()">
            <span class="iconfont">&#xe7b9;</span>
            <span>单身</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7d8;</span>
            <span>打印</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7de;</span>
            <span>汇出</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe8ef;</span>
            <span>查询</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7ed;</span>
            <span>上笔</span>
          </li>
          <li class="unclick">
            <input type="text" class="numInput" disabled="disabled" />
            <span>指定笔</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li class="unclick">
            <span class="iconfont">&#xe7eb;</span>
            <span>末一笔</span>
          </li>
        </ul>
        <div v-else class="saveBtns">
          <el-button class="cancel" @click="cancel()">取消</el-button>
          <el-button class="sure" type="primary" @click="sure()"
            >确定</el-button
          >
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <el-card class="content">
      <!-- 切换按钮 -->
      <el-tabs>
        <!-- 基本资料 -->
        <el-tab-pane label="基本资料" name="0">
          <!-- 表单区 -->
          <div class="forms">
            <!-- left -->
            <ul class="left">
              <li>
                <label class="label">系统</label>
                <div class="elInput msgBox">{{ system }}</div>
              </li>
              <li>
                <label class="label">编号</label>
                <div class="elInput msgBox">{{ systemNum }}</div>
              </li>
              <li>
                <label class="label">序号</label>
                <div class="elInput msgBox">{{ systemIndex }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label">类型</label>
                <div class="elInput msgBox">{{ systemType }}</div>
              </li>
              <li>
                <label class="label">类型说明</label>
                <div class="elInput msgBox">{{ systemMsg }}</div>
              </li>
              <li>
                <label class="label">异动日</label>
                <div class="elInput msgBox">{{ systemDate }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <label class="label">凭证编号</label>
                <div class="elInput msgBox">{{ credentialsNum }}</div>
              </li>
              <li>
                <label class="label">凭证日期</label>
                <div class="elInput msgBox">{{ credentialsDate }}</div>
              </li>
              <li>
                <label class="label">会计年月</label>
                <div class="elInput msgBox">{{ accountingDate }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 单身表格 -->
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
            v-if="displayType == 'edit' && tableData.length > 0"
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
            prop="npq02"
            label="项次"
            fixed="left"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq02"
                    placeholder="项次"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq02 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq03"
            label="科目"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div
                  class="edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('npq03', scope.$index)"
                >
                  {{ scope.row.npq03 }}
                </div>
                <div v-else>{{ scope.row.npq03 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq01"
            label="账款编号"
            min-width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="npq05"
            label="部门"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div
                  class="edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('npq05', scope.$index)"
                >
                  {{ scope.row.npq05 }}
                </div>
                <div v-else>{{ scope.row.npq05 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq05_gem02"
            label="部门名称"
            min-width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="npq06"
            label="借 / 贷"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-select v-model="scope.row.npq06" placeholder="借贷别">
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
                <div v-else>{{ scope.row.npq06 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq24"
            label="币种"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div
                  class="edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('npq24', scope.$index)"
                >
                  {{ scope.row.npq24 }}
                </div>
                <div v-else>{{ scope.row.npq24 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq25"
            label="汇率"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq25"
                    placeholder="汇率"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq25 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq07f"
            label="原币金额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq07f"
                    placeholder="原币金额"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq07f }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq07"
            label="本币金额"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq07"
                    placeholder="本币金额"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq07 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq21"
            label="客户 / 厂商 / 员工"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div
                  class="edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('npq21', scope.$index)"
                >
                  {{ scope.row.npq21 }}
                </div>
                <div v-else>{{ scope.row.npq21 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq22"
            label="客户简称 / 厂商简称"
            min-width="150px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="npq08"
            label="项目编号"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div
                  class="edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('npq08', scope.$index)"
                >
                  {{ scope.row.npq08 }}
                </div>
                <div v-else>{{ scope.row.npq08 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq35"
            label="核算项-9（WBS）"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq35"
                    placeholder="核算项-9（WBS）"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq35 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq36"
            label="核算项-10（费用原因）"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq36"
                    placeholder="核算项-10（WBS）"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq36 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq11"
            label="核算项-1"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq11"
                    placeholder="核算项-1"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq11 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq12"
            label="核算项-2"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq12"
                    placeholder="核算项-2"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq12 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq13"
            label="核算项-3"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq13"
                    placeholder="核算项-3"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq13 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq14"
            label="核算项-4"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq14"
                    placeholder="核算项-4"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq14 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq37"
            label="核算项-关系人"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq37"
                    placeholder="核算项-关系人"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq37 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="npq04"
            label="摘要"
            min-width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <div v-if="displayType == 'edit'">
                  <el-input
                    v-model="scope.row.npq04"
                    placeholder="摘要"
                  ></el-input>
                </div>
                <div v-else>{{ scope.row.npq04 }}</div>
              </div>
              <!-- <div>
                <div
                  class="edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('npq04', scope.$index)"
                >
                  {{ scope.row.npq04 }}
                </div>
                <div v-else>{{ scope.row.npq04 }}</div>
              </div> -->
            </template>
          </el-table-column>
        </el-table>
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
import { entryList, updateEntry } from "@/api/entry";
import { gemsList, azisList, aagsList, pmcsList, pjasList } from "@/api/basic";

export default {
  components: {
    SelectData,
  },
  data() {
    return {
      displayType: "show", // 展示类型：show:显示状态  edit:编辑状态
      system: "", //系统
      systemNum: "", //编号
      systemIndex: "", //序号
      systemType: "", //类型
      systemMsg: "", //类型说明
      systemDate: "", //异动日
      credentialsNum: "", //凭证编号
      credentialsDate: "", //凭证日期
      accountingDate: "", //会计年月
      tableLoading: true,
      tableData: [],
      entryParams: {
        operation_type: this.$route.query.operation_type,
        operation_code: this.$route.query.operation_code,
      },

      rowIndex: "", //当前点击的行数
      // 数据选择框
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
        head_npq03: [
          { name: "aag01", title: "科目编号" },
          { name: "aag02", title: "科目名称" },
          { name: "aag03", title: "科目性质" },
          { name: "aag13", title: "额外名称" },
          { name: "aag04", title: "资产损益别" },
          { name: "aag07", title: "统制明细别" },
          { name: "aag24", title: "科目层级" },
        ],
        // 部门
        head_npq05: [
          { name: "gem01", title: "部门编号" },
          { name: "gem02", title: "部门名称" },
        ],
        // 币种
        head_npq24: [
          { name: "azi01", title: "币种代码" },
          { name: "azi02", title: "币种说明" },
        ],
        // 客户
        head_npq21: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商名称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        // 项目编号
        head_npq08: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        // 摘要
        // head_npq04:[
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
  created() {
    this.getEntryList();
  },
  methods: {
    singlePay() {
      this.displayType = "edit";
      if (this.tableData.length == 0) {
        this.addRow();
      }
    },
    // 增加一行
    addRow() {
      let data = {
        id: "",
        npq01: this.entryParams.operation_code, //账款编号（同作业编码）
        npq02: "", //项次
        npq03: "", //科目
        npq04: "", //摘要
        npq05: "", //部门
        npq06: "", //借贷别
        npq07: "", //本币金额
        npq07f: "", //原币金额
        npq08: "", //项目编号
        npq11: "", //核算项1
        npq12: "", //核算项2
        npq13: "", //核算项3
        npq14: "", //核算项4
        npq21: "", //客户/厂商编号
        npq22: "", //客户/厂商简称
        npq23: "", //
        npq24: "", //币种
        npq25: "", //汇率
        npq35: "", //核算项9
        npq36: "", //核算项10
        npq37: "", //核算项-关系人
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
    // 取消
    cancel() {
      this.displayType = "show";
    },
    // 确定
    sure() {
      let params = {
        operation_code: this.entryParams.operation_code,
        operation_type: this.entryParams.operation_type,
        records: this.tableData,
      };
      updateEntry(params).then((res) => {
        if (res.status == 200) {
          this.$message.success("修改成功！");
          this.displayType = "show";
          this.$router.push("index");
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 获取分录列表
    getEntryList() {
      entryList(this.entryParams).then((result) => {
        if (result.status == 200) {
          this.tableData = result.data;
          this.tableLoading = false;
        } else {
          this.$message.error("获取冲账列表失败：" + result.error.message);
        }
      });
    },
    // 更新分录列表
    updateEntryList() {
      updateEntry(this.tableData).then((result) => {
        if (result.status == 200) {
          this.tableData = result.data;
          this.$message.error("更新冲账列表成功！");
        } else {
          this.$message.error("更新冲账列表失败：" + result.error.message);
        }
      });
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
        case "npq03":
          this.getAagsList();
          this.dataSelect.headList = this.headData.head_npq03;
          let filter_npq03 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_npq03;
          this.dataSelect.searchApi = "meta/aags"
          this.dataSelect.dialogTitle = "科目";
          break;
        case "npq05":
          this.getGemsList();
          this.dataSelect.headList = this.headData.head_npq05;
          let filter_npq05 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_npq05;
          this.dataSelect.searchApi = "meta/gems"
          this.dataSelect.dialogTitle = "部门";
          break;
        case "npq24":
          this.getAzisList();
          this.dataSelect.headList = this.headData.head_npq24;
          let filter_npq24 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_npq24;
          this.dataSelect.searchApi = "meta/azis"
          this.dataSelect.dialogTitle = "币种";
          break;
        case "npq21":
          this.getPmcsList();
          this.dataSelect.headList = this.headData.head_npq21;
          let filter_npq21 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_npq21;
          this.dataSelect.searchApi = "meta/pmcs"
          this.dataSelect.dialogTitle = "客户 / 厂商 / 员工";
          break;
        case "npq08":
          this.getPjasList();
          this.dataSelect.headList = this.headData.head_npq08;
          let filter_npq08 = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_npq08;
          this.dataSelect.searchApi = "meta/pjas"
          this.dataSelect.dialogTitle = "项目编号";
          break;
        // case "npq04":
        //   // this.getPjbsList();
        //   this.dataSelect.headList = this.headData.head_npq04;
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
          case "npq03":
            this.tableData[this.rowIndex].npq03 = val[0].aag01;
            break;
          // 部门
          case "npq05":
            this.tableData[this.rowIndex].npq05 = val[0].gem01;
            this.tableData[this.rowIndex].npq05_gem02 = val[0].gem02;
            break;
          // 币种
          case "npq24":
            this.tableData[this.rowIndex].npq24 = val[0].azi01;
            break;
          // 供应商
          case "npq21":
            this.tableData[this.rowIndex].npq21 = val[0].pmc01;
            this.tableData[this.rowIndex].npq22 = val[0].pmc03;
            break;
          // 项目编号
          case "npq08":
            this.tableData[this.rowIndex].npq08 = val[0].pja01;
            break;
          // case "npq04":
          //   break;
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
    // 供应商
    getPmcsList() {
      pmcsList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.selectLoading = false;
          this.dataSelect.bodyData = res.data;
        } else {
          this.$message.error("获取供应商列表失败：" + res.error.message);
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
      border-bottom: 1px solid #f0f3f7;
      .left,
      .center,
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
          .checkBox {
            display: flex;
            flex-direction: row;
            align-items: center;
            .label {
              margin-right: 12px;
            }
          }
          > ul {
            width: 260px;
            > li {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
              &:last-child {
                margin-bottom: 0;
              }
              .shortInput {
                width: 180px !important;
              }
              .msgBox {
                width: 180px !important;
              }
            }
          }
          .img {
            width: 86px;
            height: 86px;
            background: #f5f7fa;
            border: 1px solid #e4e7ed;
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
