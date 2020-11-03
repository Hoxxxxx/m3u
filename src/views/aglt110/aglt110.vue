<template>
  <div class="workDetail">
    <!-- 顶部菜单 -->
    <div class="menuOuter">
      <div class="menuList">
        <ul v-if="displayType == 'show'">
          <!-- 均可 -->
          <li @click="$router.push('/')">
            <span class="iconfont backList">&#xe664;</span>
            <span>回到列表</span>
          </li>
          <li @click="entryClick()">
            <span class="iconfont">&#xe797;</span>
            <span>录入</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe791;</span>
            <span>更改</span>
          </li>
          <li v-if="menuClickable" @click="changeClick()">
            <span class="iconfont">&#xe791;</span>
            <span>更改</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7c3;</span>
            <span>删除</span>
          </li>
          <li v-if="menuClickable" @click="deleteClick()">
            <span class="iconfont">&#xe7c3;</span>
            <span>删除</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7bc;</span>
            <span>复制</span>
          </li>
          <li v-if="menuClickable" @click="copyClick()">
            <span class="iconfont">&#xe7bc;</span>
            <span>复制</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7b9;</span>
            <span>单身</span>
          </li>
          <li v-if="menuClickable" @click="editSingleAccount">
            <span class="iconfont">&#xe7b9;</span>
            <span>单身</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7d8;</span>
            <span>打印</span>
          </li>
          <li v-if="menuClickable">
            <span class="iconfont">&#xe7d8;</span>
            <span>打印</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7de;</span>
            <span>汇出</span>
          </li>
          <li v-if="menuClickable">
            <span class="iconfont">&#xe7de;</span>
            <span>汇出</span>
          </li>
          <!-- 均可 -->
          <li @click="searchClick()">
            <span class="iconfont">&#xe8ef;</span>
            <span>查询</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7ed;</span>
            <span>上笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <input type="text" class="numInput" disabled />
            <span>指定笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7eb;</span>
            <span>末一笔</span>
          </li>
          <!-- 可点击 -->
          <li v-if="menuClickable && changePage" @click="firstWork">
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="prevWork">
            <span class="iconfont">&#xe7ed;</span>
            <span>上笔</span>
          </li>
          <li v-if="menuClickable && changePage">
            <input
              type="text"
              class="numInput"
              v-model="bindVal"
              @keyup.enter="searchAssign"
              @blur="blur"
              @focus="focus"
              onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
            />
            <span>指定笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="nextWork">
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="lastWork">
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
      <el-tabs v-model="curPane" @tab-click="handleClick">
        <!-- 基本资料 -->
        <el-tab-pane label="基本资料" name="0">
          <!-- 表单区 -->
          <div class="forms">
            <!-- left -->
            <ul class="left">
              <li>
                <label class="label">账套</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('ZT')"
                >
                  {{ theadList.aba00 }}
                </div>
                <div class="elInput msgBox" v-else>{{ theadList.aba00 }}</div>
              </li>
              <li>
                <label class="label">凭证编号</label>
                <el-input
                  v-model="theadList.aba01"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  :disabled="editType == 'search' ? false : true"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.aba01 }}</div>
              </li>
              <li>
                <label class="label">凭证日期</label>
                <el-date-picker
                  v-model="theadList.aba02"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="editType == 'search' ? false : true"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ theadList.aba02 }}</div>
              </li>
              <li>
                <label class="label">会计年度</label>
                <div class="doubleOuter">
                  <el-input
                    v-model="theadList.aba03"
                    class="elInput"
                    :disabled="editType == 'search' ? false : true"
                    v-if="displayType == 'edit'"
                  ></el-input>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType == 'show'"
                  >
                    {{ theadList.aba03 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType == 'show'"
                    style="margin-right: 0"
                  >
                    {{ theadList.aba04 }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label">录入日期</label>
                <el-date-picker
                  v-model="theadList.aba05"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="editType == 'search' ? false : true"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ theadList.aba05 }}</div>
              </li>
              <li>
                <label class="label">录入人员</label>
                <div class="theadList.abauser">
                  <el-input
                    v-model="dataOwner"
                    class="elInput"
                    :disabled="editType == 'search' ? false : true"
                    v-if="displayType == 'edit'"
                  ></el-input>
                  <div class="elInput msgBox" v-if="displayType !== 'edit'">
                    {{ theadList.abauser }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >申请人</label
                >
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('SQR')"
                  >
                    {{ theadList.aba24 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.aba24 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ thead_BringOut_List.aba24_gen02 }}
                  </div>
                </div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label">版本</label>
                <el-input
                  v-model="version"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ version }}</div>
              </li>
              <li>
                <label class="label">收支科目</label>
                <el-input
                  v-model="version"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ subject }}</div>
              </li>
              <li>
                <label class="label">科目名称</label>
                <el-input
                  v-model="subjectName"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ subjectName }}</div>
              </li>
              <li>
                <label class="label">来源码</label>
                <el-input
                  v-model="originNum"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ originNum }}</div>
              </li>
              <li>
                <label class="label">附件张数</label>
                <el-input
                  v-model="attachmentNum"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ attachmentNum }}</div>
              </li>
              <li>
                <label class="label">参考号码</label>
                <el-input
                  v-model="referenceNum"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ referenceNum }}</div>
              </li>
              <li>
                <label class="label">总号</label>
                <el-input
                  v-model="allNum"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ allNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <ul style="width: 245px">
                  <li>
                    <label class="label">打印次数</label>
                    <el-input
                      v-model="printTimes"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="shortInput msgBox" v-else>{{ printTimes }}</div>
                  </li>
                  <li>
                    <label class="label">状态码</label>
                    <el-input
                      v-model="status"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="shortInput msgBox" v-else>{{ status }}</div>
                  </li>
                </ul>
                <div class="img" :class="audit == 'Y' ? 'imgY': ''">
                  <img v-if="audit == 'Y'" src="../../assets/img/audit.png">
                </div>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label">签核否</label>
                  <el-checkbox
                    v-model="auditLevel"
                    id="audit"
                    true-label="Y"
                    false-label="N"
                    disabled
                  >
                  </el-checkbox>
                </div>
                <ul>
                  <li>
                    <label class="label">签核等级</label>
                    <el-input
                      v-model="auditLevel"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="shortInput msgBox" v-else>{{ auditLevel }}</div>
                  </li>
                </ul>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label">审核码</label>
                  <el-checkbox
                    v-model="theadList.aba19"
                    id="audit"
                    true-label="Y"
                    false-label="N"
                    :disabled="editType == 'search' ? false : true"
                  >
                  </el-checkbox>
                </div>
                <ul>
                  <li>
                    <label class="label">审核人员</label>
                    <el-input
                      v-model="theadList.aba37"
                      class="shortInput"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="shortInput msgBox" v-else>
                      {{ theadList.aba37 }}
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label">过账码</label>
                  <el-checkbox
                    v-model="theadList.abapost"
                    id="audit"
                    true-label="Y"
                    false-label="N"
                    :disabled="editType == 'search' ? false : true"
                  >
                  </el-checkbox>
                </div>
                <ul>
                  <li>
                    <label class="label">过账人员</label>
                    <el-input
                      v-model="theadList.aba38"
                      class="shortInput"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="shortInput msgBox" v-else>
                      {{ theadList.aba38 }}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 状态 -->
        <el-tab-pane label="状态" name="1">
          <div class="forms states">
            <ul class="left">
              <li>
                <label class="label">资料所有群</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataOwnerGroup }}
                </div>
              </li>
              <li>
                <label class="label">资料更改者</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataChanger }}
                </div>
              </li>
              <li>
                <label class="label">最近更改日</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataChangeTime }}
                </div>
              </li>
              <li>
                <label class="label">资料有效码</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataValidCode }}
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="selectLoading"
      :dialogTitle.sync="dataSelect.dialogTitle"
      :dialogVisible.sync="dataSelect.dialogVisible"
      :headList.sync="dataSelect.headList"
      :bodyData.sync="dataSelect.bodyData"
      :choosedData="dataSelect.choosedData"
      :editType.sync="editType"
      :searchApi="dataSelect.searchApi"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
    <!-- 表格区域 -->
    <el-card class="tableCard">
      <Table
        :displayType="displayType"
        :editType="editType"
        :accountsEdit.sync="accountsEdit"
        :accountsList.sync="accountsList"
        :operation_code="operation_code"
        @accountSure="accountSure"
        @accountCancel="accountCancel"
      ></Table>
    </el-card>
    <!-- 右边浮窗 -->
    <FixedBtns
      v-if="displayType == 'show' && menuClickable"
      :Btns_List="Btns_List"
      @handAudit="handAudit"
      @auditCancel="auditCancel"
      @proofPosting="proofPosting"
      @reductPosting="reductPosting"
      @sourceQuery="sourceQuery"
    ></FixedBtns>
    <!-- 审核弹窗 -->
    <Audit
      :auditVisible.sync="auditVisible"
      :auditSuccessVisible.sync="auditSuccessVisible"
      :auditFailVisible.sync="auditFailVisible"
      :failData="failData"
      @auditDialogCancel="auditDialogCancel"
      @auditDialogSure="auditDialogSure"
      @sureSuccess="sureSuccess"
      @sureFail="sureFail"
    ></Audit>
    <!-- 取消审核弹窗 -->
    <CancelAudit
      :auditCancelVisible.sync="auditCancelVisible"
      :auditCancelSuccessVisible.sync="auditCancelSuccessVisible"
      :auditCancelFailVisible.sync="auditCancelFailVisible"
      :auditCancel_fileData="auditCancel_fileData"
      @auditcancel_Cancel="auditcancel_Cancel"
      @auditCancel_Sure="auditCancel_Sure"
      @sure_auditSuccess="sure_auditSuccess"
      @sure_auditFail="sure_auditFail"
    ></CancelAudit>
    <!-- 凭证过账 -->
    <TurnCredent
      :turnCredentVisible.sync="turnCredentVisible"
      :credentSuccessVisible.sync="credentSuccessVisible"
      :credentFailVisible.sync="credentFailVisible"
      :credentFileData="credentFileData"
      @credent_Cancel="credent_Cancel"
      @credent_Sure="credent_Sure"
      @sure_credentSuccess="sure_credentSuccess"
      @sure_credentFail="sure_credentFail"
    ></TurnCredent>
    <!-- 过账还原 -->
    <ReductCredent
      :reductCreVis.sync="reductCreVis"
      :reductCreSucVis.sync="reductCreSucVis"
      :reductCreFailVis.sync="reductCreFailVis"
      @reductCre_Cancel="reductCre_Cancel"
      @reductCre_Sure="reductCre_Sure"
      @sure_reductCreSuc="sure_reductCreSuc"
      @sure_reductCreFail="sure_reductCreFail"
    ></ReductCredent>
  </div>
</template>

<script>
import FixedBtns from "@/components/fixedBtns";
import Audit from "@/components/audit";
import CancelAudit from "@/components/auditCancel";
import SelectData from "@/components/selectData_normal";
import TurnCredent from "@/components/turnCredent";
import ReductCredent from "@/components/reductCredent";
import Table from "./Table";
import { dateFmt } from "../../utils/utils";
// api
import {
  paymentList,
  paymentSingle,
  addPayment,
  editPayment,
  delPayment,
  examine,
  examine_cancel,
  postVoucher,
  postVoucher_cancel,
} from "@/api/aglt110";
import { sobsList, gensList } from "@/api/basic";
import { normalList, updatenormal } from "@/api/normalWork";

export default {
  components: {
    FixedBtns,
    Audit,
    CancelAudit,
    SelectData,
    TurnCredent,
    ReductCredent,
    Table,
  },
  data() {
    return {
      operation_type: "aglt110",
      operation_code: "",
      curPane: 0, //当前tabs页
      displayType: "show", // 展示类型：show:显示状态  edit:编辑状态
      editType: "change", //编辑类型： entry:录入  change:更改  search:查询
      menuClickable: false,
      // 指定笔作业输入框相关数据
      changePage: false,
      assignWork: "", //指定笔作业(默认值为 1)
      bindVal: "",
      blurVal: "",
      focusVal: "",
      // 表头列表
      theadList: {},
      // 带出内容列表
      thead_BringOut_List: {},
      // 弹窗组件表格加载状态
      selectLoading: true,
      // 查询作业传参（作业id）
      searchParams: {
        keyword: "",
      },

      // 单身表格
      accountsList: [], //账款单身
      accountsEdit: false, //账款单身表格是否可编辑

      serialNumber: "", //凭证编号(暂定)
      dataOwner: "", //资料所有者(暂定)
      applicant: "", //申请人(暂定)
      version: "", //版本(暂定)
      subject: "", //收支科目(暂定)
      subjectName: "", //科目名称(暂定)
      originNum: "", //来源码(暂定)
      attachmentNum: "", //附件张数(暂定)
      referenceNum: "", //参考号码(暂定)
      allNum: "", //总号(暂定)
      printTimes: "", //打印次数(暂定)
      status: "", //状态码(暂定)
      audit: false, //审核否(暂定)
      auditLevel: "", //审核等级(暂定)
      // 状态栏数据(暂定)
      dataOwnerGroup: "", //资料所有群(暂定)
      dataChanger: "", //资料更改者(暂定)
      dataChangeTime: "", //资料更改日(暂定)
      dataValidCode: "", //有效码(暂定)
      // 右侧浮窗
      Btns_List: [
        { name: "审核", method: "handAudit" },
        { name: "取消审核", method: "auditCancel" },
        { name: "凭证过账", method: "proofPosting" },
        { name: "过账还原", method: "reductPosting" },
        { name: "抛转来源查询", method: "sourceQuery" },
      ],
      // 审核弹出框
      auditVisible: false,
      auditSuccessVisible: false, //成功弹窗
      auditFailVisible: false, //失败弹窗
      failData: [], //失败时的表格数据
      // 取消审核弹出框
      auditCancelVisible: false,
      auditCancelSuccessVisible: false, //成功弹窗
      auditCancelFailVisible: false, //失败弹窗
      auditCancel_fileData: [], //失败时的表格数据
      // 抛转凭证弹框
      turnCredentVisible: false,
      credentSuccessVisible: false, //成功弹窗
      credentFailVisible: false, //失败弹窗
      credentFileData: [], //失败时的表格数据
      // 抛转凭证还原弹框
      reductCreVis: false,
      reductCreSucVis: false, //成功弹窗
      reductCreFailVis: false, //失败弹窗

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
      },
      // 弹出框表格数据
      tableData: {
        // 账套
        head_sobs: [
          { name: "id", title: "账套id" },
          { name: "name", title: "账套名称" },
          { name: "jt_code", title: "集团账套名称" },
        ],
        bodyData_sobs: [],
        // 人员
        head_gens: [
          { name: "gen01", title: "员工编号" },
          { name: "gen02", title: "员工姓名" },
          { name: "gen03", title: "所属部门编号" },
        ],
        bodyData_gens: [],
      },
    };
  },
  created() {
    this.fillTheadList();
    this.fill_operation_code();
  },
  methods: {
    // 刷新后重新赋值operation_code
    fill_operation_code() {
      let operation_code = sessionStorage.getItem("operation_code")
        ? JSON.parse(sessionStorage.getItem("operation_code"))
        : "";
      this.operation_code = operation_code;
      console.log("初始code：", this.operation_code);
    },
    // ***指定笔搜索***
    searchAssign() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      let index = this.assignWork - 1; //这个值为数组的下标值
      let params = {
        id: allWorksList[index].id,
      };
      paymentSingle(params)
      .then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem(
            "nowTheadList",
            JSON.stringify(result.data[0])
          );
          sessionStorage.setItem(
            "operation_code",
            JSON.stringify(result.data[0].aba01)
          );
          this.changePage = true;
          this.fillTheadList();
          this.$message.success("查询成功！");
        } else {
          this.menuClickable = false;
          this.$message({
            message: "无此数据",
            type: "warning",
          });
        }
      })
      .then(() => {
        this.getAccount();
      });
    },
    blur() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      if (this.bindVal > allWorksList.length) {
        this.bindVal = allWorksList.length;
      } else if (this.bindVal <= 0) {
        this.bindVal = 1;
      }
      this.assignWork = this.bindVal;
      this.blurVal = `${this.bindVal}/${allWorksList.length}`;
      this.bindVal = this.blurVal;
      this.searchAssign();
    },
    focus() {
      if (typeof this.blurVal == "string") {
        this.focusVal = this.blurVal.split("/")[0];
        this.bindVal = this.focusVal;
      } else {
        this.bindVal = this.assignWork;
      }
    },
    // 第一笔
    firstWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      this.assignWork = 1;
      this.bindVal = `${this.assignWork}/${allWorksList.length}`;
      this.blurVal = `${this.assignWork}/${allWorksList.length}`;
      this.searchAssign();
    },
    // 上一笔
    prevWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      let index = this.assignWork;
      if (index == 1) {
        this.$message.error("当前已是第一笔！");
        index = 1;
      } else if (index < 1) {
        index = 1;
      } else {
        index--;
      }
      this.assignWork = index;
      this.bindVal = `${this.assignWork}/${allWorksList.length}`;
      this.blurVal = `${this.assignWork}/${allWorksList.length}`;
      this.searchAssign();
    },
    // 下一笔
    nextWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      let index = this.assignWork;
      if (index == allWorksList.length) {
        this.$message.error("当前已是最后笔！");
      } else {
        index++;
        this.assignWork = index;
        this.bindVal = `${this.assignWork}/${allWorksList.length}`;
        this.blurVal = `${this.assignWork}/${allWorksList.length}`;
        this.searchAssign();
      }
    },
    // 末一笔
    lastWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      this.assignWork = allWorksList.length;
      this.bindVal = `${this.assignWork}/${allWorksList.length}`;
      this.blurVal = `${this.assignWork}/${allWorksList.length}`;
      this.searchAssign();
    },
    // ********
    // tabs切换
    handleClick(tab, event) {},
    // 录入
    entryClick() {
      this.displayType = "edit";
      this.editType = "entry";
      this.cleanAllList();
      this.theadList.aba00 = '01'
      this.theadList.aba02 = new Date()
      this.theadList.aba05 = new Date()
      this.theadList.aba09 = 'N'
    },
    // 修改
    changeClick() {
      this.displayType = "edit";
      this.editType = "change";
    },
    // 复制
    copyClick() {
      this.displayType = "edit";
      this.editType = "copy";
    },
    // 查询
    searchClick() {
      this.displayType = "edit";
      this.editType = "search";
      // 清空数据
      this.cleanTheadData()
    },
    // 取消
    cancel() {
      this.displayType = "show";
      this.editType = ""
      this.fillTheadList()
    },
    // 确定
    sure() {
      if (this.editType == "entry") {
        this.addPaymentList();
      } else if (this.editType == "change") {
        this.editPaymentList();
      } else if (this.editType == "search") {
        this.getAllTheadList();
      } else if (this.editType == "copy") {
        this.addPaymentList();
      }
    },
    // 右边悬浮功能区域点击事件
    handAudit() {
      this.auditVisible = true;
    },
    auditCancel() {
      this.auditCancelVisible = true;
    },
    proofPosting() {
      this.turnCredentVisible = true;
    },
    reductPosting() {
      this.reductCreVis = true;
    },
    sourceQuery() {
      console.log("抛转来源查询");
    },

    // *** 单身表格 ***
    //获取单身表格数据
    getAccount() {
      let params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      normalList(params).then((res) => {
        if (res.status == 200) {
          this.accountsList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 单身按钮点击
    editSingleAccount() {
      this.menuClickable = false;
      if (this.accountsList.length == 0) {
        let data = [
          {
            id: "",
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
          },
        ];
        this.operation_code = "1";
        this.accountsList = data;
      }
      this.accountsEdit = true;
    },
    // 借方单身确认修改
    accountSure(val, data) {
      let params = {
        operation_code: this.operation_code,
        operation_type: this.operation_type,
        records: data,
      };
      updatenormal(params).then((res) => {
        if (res.status == 200) {
          this.$message.success("修改成功！");
        } else {
          this.$message.error("修改失败：", res.message);
        }
        this.accountsEdit = !val;
        this.getAccount();
        this.menuClickable = true;
      });
    },
    // 借方单身取消修改
    accountCancel(val) {
      this.accountsEdit = val;
      this.menuClickable = true;
      this.getAccount();
    },

    // *************审核弹出框的事件************
    auditDialogCancel() {
      this.auditVisible = false;
    },
    auditDialogSure(val) {
      // 发起审核
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      examine(params).then((result) => {
        if (result.status == 200) {
          this.auditVisible = false;
          // this.auditSuccessVisible = true;
          // 调用接口回显审核码及状态
          let params = {
            id: this.theadList.id,
          };
          paymentSingle(params)
          .then((result) => {
            if (result.status == 200) {
              sessionStorage.setItem(
                "nowTheadList",
                JSON.stringify(result.data[0])
              );
              sessionStorage.setItem(
                "operation_code",
                JSON.stringify(result.data[0].aba01)
              );
              this.changePage = true;
              this.fillTheadList();
              this.$message.success("提交审核成功！");
            } else {
              this.menuClickable = false;
              this.$message.error("获取审核数据失败：" + result.error.message);
            }
          })
          .then(() => {
            this.getAccount();
          });
        } else {
          this.$message.error("提交审核失败：" + result.error.message);
        }
      });
    },
    // 关闭成功弹框的事件
    sureSuccess() {
      this.auditSuccessVisible = false;
    },
    // 关闭失败弹框的事件
    sureFail() {
      this.auditFailVisible = false;
    },
    // ******************END*******************

    // *************取消审核弹出框的事件************
    auditcancel_Cancel() {
      this.auditCancelVisible = false;
    },
    auditCancel_Sure(val) {
      // console.log("取消审核：", val);
      // 取消审核
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      examine_cancel(params).then((result) => {
        if (result.status == 200) {
          this.auditCancelVisible = false;
          // this.auditCancelFailVisible = true;
          this.$message.success("取消审核成功！");
        } else {
          this.$message.error("取消审核失败：" + result.error.message);
        }
      });
    },
    // 关闭成功弹框的事件
    sure_auditSuccess() {
      this.auditCancelSuccessVisible = false;
    },
    // 关闭失败弹框的事件
    sure_auditFail() {
      this.auditCancelFailVisible = false;
    },
    // ******************END*******************
    // *************凭证过账弹出框的事件************
    credent_Cancel() {
      this.turnCredentVisible = false;
    },
    credent_Sure(val) {
      // 凭证过账
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      postVoucher(params).then((result) => {
        if (result.status == 200) {
          this.turnCredentVisible = false;
          // this.credentSuccessVisible = true;
          this.$message.success("凭证过账成功！");
        } else {
          this.$message.error("凭证过账失败：" + result.error.message);
        }
      });
    },
    // 弹出框成功时的事件
    sure_credentSuccess() {
      this.credentSuccessVisible = false;
    },
    // 弹出框失败时的事件
    sure_credentFail() {
      this.credentFailVisible = false;
    },
    // ******************END*******************
    // *************过账还原弹出框的事件************
    reductCre_Cancel() {
      this.reductCreVis = false;
    },
    reductCre_Sure(val) {
      // 抛转还原
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      postVoucher_cancel(params).then((result) => {
        if (result.status == 200) {
          this.reductCreVis = false;
          // this.reductCreFailVis = true;
          this.$message.success("过账还原成功！");
        } else {
          this.$message.error("过账还原失败：" + result.error.message);
        }
      });
    },
    // 弹出框成功时的事件
    sure_reductCreSuc() {
      this.reductCreSucVis = false;
    },
    // 弹出框失败时的事件
    sure_reductCreFail() {
      this.reductCreFailVis = false;
    },
    // ******************END*******************
    // 数据选择
    selectDialog(type) {
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "ZT":
          this.getSobsList();
          this.dataSelect.headList = this.tableData.head_sobs;
          this.dataSelect.dialogTitle = "账套列表";
          // let a = [
          //   { label: "单据分类", model_key_search: "purchase_04" },
          //   { label: "供应厂商", model_key_search: "purchase_05" },
          //   // { label: "采购员", model_key_search: "purchase_06" },
          // ];
          // let b = [
          //   { label: "采购单号", model_key_msg: "purchase_01" },
          //   { label: "采购日期", model_key_msg: "purchase_03" },
          //   { label: "料号", model_key_msg: "purchase_07" },
          // ];
          // this.dataSelect.filter = a;
          // this.dataSelect.keyMsg = b;
          break;
        case "SQR":
          let filter = [
            { label: "", model_key_search: "keyword" },
          ]
          this.dataSelect.filter = filter;
          this.dataSelect.searchApi = "meta/gens"
          // this.getGensList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_gens;
          this.dataSelect.dialogTitle = "员工列表";
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
    },
    selectSure(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = [];
      this.dataSelect.choosedData = val;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "ZT":
            this.theadList.aba00 = val[0].id;
            break;
          case "SQR":
            this.theadList.aba24 = val[0].gen01;
            this.thead_BringOut_List.aba24_gen02 = val[0].gen02;
            break;
          default:
            return;
            break;
        }
      }
    },
    // *************作业内容触发事件************
    // 赋值表单
    fillTheadList() {
      // 新增成功、编辑成功后回显表单数据
      let nowTheadList = sessionStorage.getItem("nowTheadList")
        ? JSON.parse(sessionStorage.getItem("nowTheadList"))
        : {};
      this.menuClickable = true;
      this.operation_code = nowTheadList.aba01;
      this.getAccount();
      console.log("当前有待显示数据：", nowTheadList);
      if (JSON.stringify(nowTheadList) !== "{}") {
        // 表头列表
        this.theadList = {
          id: nowTheadList.id,
          // 基本资料
          aba00: nowTheadList.aba00,
          aba01: nowTheadList.aba01,
          aba02: nowTheadList.aba02,
          aba03: nowTheadList.aba03,
          aba04: nowTheadList.aba04,
          aba05: nowTheadList.aba05,
          abauser: nowTheadList.abauser,
          aba24: nowTheadList.aba24,
          aba19: nowTheadList.aba19,
          aba37: nowTheadList.aba37,
          abapost: nowTheadList.abapost,
          aba38: nowTheadList.aba38,
        },
        // 带出内容列表
        this.thead_BringOut_List = {
          aba24_gen02: nowTheadList.aba24_gen02,
        };
      } else {
        console.log("赋空白初始值");
        this.cleanAllList();
      }
    },
    //清空表单
    cleanAllList() {
      this.menuClickable = false;
      this.changePage = false;
      sessionStorage.removeItem("nowTheadList");
      sessionStorage.removeItem("allWorksList");
      sessionStorage.removeItem("operation_code");
      this.operation_code = "";
      this.cleanTheadData()
    },

    cleanTheadData() {
      // 表头列表
      this.theadList = {
        id: "",
        // 基本资料
        aba00: "", //账套
        aba01: "", //凭证编号
        aba02: "", //凭证日期
        aba03: "", //会计年期（年份）
        aba04: "", //会计年期（月份）
        aba05: "", //录入日期
        abauser: "", //录入人员编号
        aba24: "", //申请人（编号）
        aba19: "", //审核
        aba37: "", //审核人员（编号）
        abapost: "", //过账
        aba38: "", //过账人员
      },
      // 带出内容列表
      this.thead_BringOut_List = {
        aba24_gen02: "", //申请人（带出名）
      };
    },

    // *****获取下拉框列表事件*****
    // 获取账套列表
    getSobsList() {
      sobsList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_sobs = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_sobs;
          this.selectLoading = false;
        } else {
          this.$message.error("获取员工列表失败：" + result.error.message);
        }
      });
    },
    // 获取员工列表
    getGensList() {
      gensList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_gens = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_gens;
          this.selectLoading = false;
        } else {
          this.$message.error("获取员工列表失败：" + result.error.message);
        }
      });
    },
    // *****基础事件*****
    // 新增、复制作业
    addPaymentList() {
      addPayment(this.theadList).then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem("nowTheadList", JSON.stringify(result.data));
          sessionStorage.setItem("operation_code",JSON.stringify(result.data.aba01));
          this.menuClickable = true;
          this.changePage = false;
          this.displayType = "show";
          this.fillTheadList();
          if (this.editType == "entry") {
            this.$message.success("新增一般凭证维护作业作业成功！");
          } else if (this.editType == "copy") {
            this.$message.success("复制一般凭证维护作业成功！");
          }
        } else {
          if (this.editType == "entry") {
            this.$message.error(
              "新增一般凭证维护作业失败：" + result.error.message
            );
          } else if (this.editType == "copy") {
            this.$message.error(
              "复制一般凭证维护作业失败：" + result.error.message
            );
          }
        }
      });
    },
    // 编辑作业
    editPaymentList() {
      editPayment(this.theadList).then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem("nowTheadList", JSON.stringify(result.data));
          sessionStorage.setItem(
            "operation_code",
            JSON.stringify(result.data.aba01)
          );
          this.menuClickable = true;
          this.changePage = false;
          this.displayType = "show";
          this.fillTheadList();
          this.$message.success("编辑一般凭证维护作业成功！");
        } else {
          this.$message.error("编辑一般凭证维护作业失败：" + result.error.message);
        }
      });
    },
    // 获取所有笔数作业id及账款编号列表
    getAllTheadList() {
      const workParams = {};
      Object.keys(this.theadList).forEach((key) => {
        workParams["filter[" + key + "]"] = this.theadList[key];
      });
      paymentList(workParams).then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem("allWorksList", JSON.stringify(result.data));
          this.menuClickable = true;
          this.displayType = "show";
          // 查询完数据后直接进行第一个数据的展示
          if (result.data.length == 0) {
            this.menuClickable = false;
            this.$message.warning("暂无符合条件的作业");
          } else {
            this.bindVal = 1;
            this.blur();
          }
        } else {
          this.$message.error(
            "获取一般凭证维护作业列表失败：" + result.error.message
          );
        }
      });
    },
    deletePaymentList() {
      this.$confirm("此操作将永久删除本作业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPayment(this.theadList.id).then((result) => {
            if (result.status == 200) {
              this.cleanAllList();
              this.$message.success("删除成功！");
            } else {
              this.$message.error("删除失败：" + result.error.message);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 获取发票列表
    getInvoiceList() {
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      invoiceList(params).then((result) => {
        if (result.status == 200) {
          this.invoiceData = result.data;
          this.invoiceLoading = false;
        } else {
          this.$message.error("删除失败：" + result.error.message);
        }
      });
    },
    // ******************END*******************
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
        width: 342px;
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
                width: 160px !important;
              }
              .msgBox {
                width: 160px !important;
              }
            }
          }
          .img {
            width: 86px;
            height: 86px;
            background: #f5f7fa;
            border: 1px solid #e4e7ed;
            &.imgY{
              background:#fff
            }
            img{
              width: 86px;
              height: 86px;
            }
          }
        }
      }
    }
  }
}
</style>
