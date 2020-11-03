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
          <li v-if="menuClickable && changePage" @click="firstWork()">
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="prevWork()">
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
          <li v-if="menuClickable && changePage" @click="nextWork()">
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="lastWork()">
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
                <label class="label">付款单号</label>
                <el-input
                  v-model="theadList.apf01"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  :disabled="editType == 'search' ? false : true"
                ></el-input>
                <div
                  v-else
                  class="elInput msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ theadList.apf01 }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >付款日期</label
                >
                <el-date-picker
                  v-model="theadList.apf02"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ theadList.apf02 }}</div>
              </li>
              <li>
                <label class="label">录入日期</label>
                <el-date-picker
                  v-model="theadList.apfinpd"
                  type="date"
                  class="elInput"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ theadList.apfinpd }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >付款厂商</label
                >
                <div
                  class="shortInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('BASE_INFO_FKCS')"
                >
                  {{ theadList.apf03 }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ theadList.apf03 }}
                </div>
              </li>
              <li>
                <label class="label">厂商简称</label>
                <el-input
                  v-model="theadList.apf12"
                  class="elInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apf12 }}</div>
              </li>
              <li>
                <label class="label">税号</label>
                <el-input
                  v-model="referenceNum"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ referenceNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <ul style="width: 245px">
                  <li>
                    <label class="label">凭证编号</label>
                    <el-input
                      v-model="printTimes"
                      class="shortInput w152"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="shortInput msgBox w152" v-else>
                      {{ printTimes }}
                    </div>
                  </li>
                  <li>
                    <label class="label">集团代付单号</label>
                    <el-input
                      v-model="status"
                      class="shortInput w152"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="shortInput msgBox w152" v-else>
                      {{ status }}
                    </div>
                  </li>
                </ul>
                <div class="img" :class="theadList.apf41 == 'Y' ? 'imgY' : ''">
                  <img v-if="theadList.apf41 == 'Y'" src="../../assets/img/audit.png" />
                </div>
              </li>
              <li>
                <label class="label">审核</label>
                <el-input
                  v-model="theadList.apf41"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apf41 }}</div>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label">签核</label>
                  <el-checkbox v-model="auditCheck" disabled></el-checkbox>
                </div>
                <ul>
                  <li>
                    <label class="label">状况码</label>
                    <el-input
                      v-model="auditNum"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="shortInput msgBox" v-else>{{ auditNum }}</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="coins">
            <ul>
              <li>
                <label class="label"
                  ><span class="redPot" v-if="displayType == 'edit'">*</span
                  >币种</label
                >
                <div
                  class="coinInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('BASE_INFO_BZ')"
                >
                  {{ theadList.apf06 }}
                </div>
                <div class="coinInput msgBox" v-else>
                  {{ theadList.apf06 }}
                </div>
              </li>
              <li>
                <label class="label">付款理由</label>
                <div
                  class="coinInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('BASE_INFO_FKLY')"
                >
                  {{ theadList.apf11 }}
                </div>
                <div class="coinInput msgBox" v-else>{{ theadList.apf11 }}</div>
              </li>
              <li>
                <label class="label">付款说明</label>
                <el-input
                  v-model="theadList_show.apf11_azf03"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>
                  {{ theadList_show.apf11_azf03 }}
                </div>
              </li>
              <li>
                <label class="label">支付类型</label>
                <el-input
                  v-model="paymentType"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ paymentType }}</div>
              </li>
            </ul>
            <ul>
              <li>
                <label class="label">现金异动码</label>
                <div
                  class="coinInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('BASE_INFO_XJYDM')"
                >
                  {{ theadList.apf24 }}
                </div>
                <div class="coinInput msgBox" v-else>{{ theadList.apf24 }}</div>
              </li>
              <li>
                <label class="label"
                  ><span class="redPot" v-if="displayType == 'edit'">*</span
                  >付款人员</label
                >
                <div
                  class="coinInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('BASE_INFO_FKRY')"
                >
                  {{ theadList.apf04 }}
                </div>
                <div class="coinInput msgBox" v-else>
                  {{ theadList.apf04 }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span class="redPot" v-if="displayType == 'edit'">*</span
                  >付款部门</label
                >
                <div
                  class="coinInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('BASE_INFO_FKBM')"
                >
                  {{ theadList.apf05 }}
                </div>
                <div class="coinInput msgBox" v-else>
                  {{ theadList.apf05 }}
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div class="coinsLabel">原币</div>
              </li>
              <li>
                <label class="label">账款金额</label>
                <el-input
                  v-model="theadList.apf08f"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>
                  {{ theadList.apf08f }}
                </div>
              </li>
              <li>
                <label class="label">暂付金额</label>
                <el-input
                  v-model="theadList.apf09f"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>
                  {{ theadList.apf09f }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span class="redPot" v-if="displayType == 'edit'">*</span
                  >付款金额</label
                >
                <el-input
                  v-model="theadList.apf10f"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>
                  {{ theadList.apf10f }}
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div class="coinsLabel">本币</div>
              </li>
              <li>
                <label class="label">账款金额</label>
                <el-input
                  v-model="theadList.apf08"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ theadList.apf08 }}</div>
              </li>
              <li>
                <label class="label">暂付金额</label>
                <el-input
                  v-model="theadList.apf09"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ theadList.apf09 }}</div>
              </li>
              <li>
                <label class="label"
                  ><span class="redPot" v-if="displayType == 'edit'">*</span
                  >付款金额</label
                >
                <el-input
                  v-model="theadList.apf10"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ theadList.apf10 }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 状态 -->
        <el-tab-pane label="状态" name="1">
          <div class="forms states">
            <ul class="left">
              <li>
                <label class="label">资料所有者</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataOwner }}
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
                <label class="label">资料有效码</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataValidCode }}
                </div>
              </li>
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
                <label class="label">最近更改日</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ latestChange }}
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 表格区域_账款部分 -->
    <el-card class="tableCard">
      <AccTable
        :displayType.sync="displayType"
        :editType.sync="editType"
        :accountsEdit.sync="accountsEdit"
        :accountsList.sync="accountsList"
        :operation_code="operation_code"
        @accountSure="accountSure"
        @accountCancel="accountCancel"
      ></AccTable>
    </el-card>
    <!-- 表格区域_付款部分 -->
    <el-card class="tableCard">
      <PayTable
        :displayType.sync="displayType"
        :editTyp.sync="editType"
        :paymentEdit.sync="paymentEdit"
        :paymentList.sync="paymentList"
        :operation_code="operation_code"
        @paymentSure="paymentSure"
        @paymentCancel="paymentCancel"
      ></PayTable>
    </el-card>

    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="dataSelect.selectLoading"
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
    <!-- 右边浮窗 -->
    <FixedBtns
      v-if="displayType == 'show' && menuClickable"
      :Btns_List="Btns_List"
      @singlePay="singlePay"
      @handleAccount="handleAccount"
      @entryPapers="entryPapers"
      @handAudit="handAudit"
      @auditCancel="auditCancel"
      @handleTurn="handleTurn"
      @handleReduct="handleReduct"
    ></FixedBtns>
    <!-- 会计分录生成 -->
    <AccountEntry
      :accEntryVis.sync="accEntryVis"
      :accEntrySucVis.sync="accEntrySucVis"
      :accEntryFailVis.sync="accEntryFailVis"
      :accEntryAgain.sync="accEntryAgain"
      @accEntryCancel="accEntryCancel"
      @accEntrySure="accEntrySure"
      @cancel_accEntrySuc="cancel_accEntrySuc"
      @sure_accEntrySuc="sure_accEntrySuc"
      @cancel_accEntryFail="cancel_accEntryFail"
      @sure_accEntryFail="sure_accEntryFail"
      @cancel_again="cancel_again"
      @sure_again="sure_again"
    ></AccountEntry>
    <!-- 审核弹窗 -->
    <Audit
      :auditVisible.sync="auditVisible"
      :auditSuccessVisible.sync="auditSuccessVisible"
      :auditFailVisible.sync="auditFailVisible"
      :failData="failData"
      @auditDialogCancel="auditDialogCancel"
      @auditDialogSure="auditDialogSure"
      @cancelSuccess="cancelSuccess"
      @sureSuccess="sureSuccess"
      @cancelFail="cancelFail"
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
      @cancel_aduditSuccess="cancel_aduditSuccess"
      @sure_auditSuccess="sure_auditSuccess"
      @cancel_auditFail="cancel_auditFail"
      @sure_auditFail="sure_auditFail"
    ></CancelAudit>
    <!-- 抛转凭证 -->
    <TurnCredent
      :turnCredentVisible.sync="turnCredentVisible"
      :credentSuccessVisible.sync="credentSuccessVisible"
      :credentFailVisible.sync="credentFailVisible"
      :credentFileData="credentFileData"
      @credent_Cancel="credent_Cancel"
      @credent_Sure="credent_Sure"
      @cancel_credentSuccess="cancel_credentSuccess"
      @sure_credentSuccess="sure_credentSuccess"
      @cancel_credentFail="cancel_credentFail"
      @sure_credentFail="sure_credentFail"
    ></TurnCredent>
    <!-- 抛转凭证还原 -->
    <ReductCredent
      :reductCreVis.sync="reductCreVis"
      :reductCreSucVis.sync="reductCreSucVis"
      :reductCreFailVis.sync="reductCreFailVis"
      @reductCre_Cancel="reductCre_Cancel"
      @reductCre_Sure="reductCre_Sure"
      @cancel_reductCreSuc="cancel_reductCreSuc"
      @sure_reductCreSuc="sure_reductCreSuc"
      @cancel_reductCreFail="cancel_reductCreFail"
      @sure_reductCreFail="sure_reductCreFail"
    ></ReductCredent>
  </div>
</template>

<script>
import FixedBtns from "@/components/fixedBtns";
import AccountEntry from "@/components/accountEntry";
import Audit from "@/components/audit";
import CancelAudit from "@/components/auditCancel";
import TurnCredent from "@/components/turnCredent";
import ReductCredent from "@/components/reductCredent";
import SelectData from "@/components/selectData_normal";
import AccTable from "./Table_Accounts";
import PayTable from "./Table_Payment";
import { dateFmt, reset } from "../../utils/utils";
import {
  paymentList,
  addPayment,
  paymentSingle,
  editPayment,
  delPayment,
  accountsList,
} from "../../api/aapt330";
import { payDebitList, updatePayDebit } from "../../api/payment_debit";
import { payCreditList, updatePayCredit } from "../../api/payment_credit";
import { azisList, pmcsList, gensList, gemsList } from "../../api/basic";
import {
  createEntry,
  examine,
  examine_cancel,
  tossVoucher,
  tossVoucher_cancel,
} from "@/api/public";
export default {
  components: {
    FixedBtns,
    AccountEntry,
    Audit,
    CancelAudit,
    TurnCredent,
    ReductCredent,
    SelectData,
    AccTable,
    PayTable,
  },
  data() {
    return {
      curPane: 0, //当前tabs页
      displayType: "show", // 展示类型：show:显示状态  edit:编辑状态
      editType: "change", //编辑类型： entry:录入  change:更改  search:查询
      menuClickable: false, //顶部菜单栏显隐控制
      operation_type: "aapt330",
      operation_code: "",
      // 指定笔作业输入框相关数据
      changePage: false,
      assignWork: "", //指定笔作业(默认值为 1)
      bindVal: "",
      blurVal: "",
      focusVal: "",
      // 表头数据
      theadList: {},
      // 用以展示时的数据
      theadList_show: {},
      // 单身表格
      accountsList: [], //账款单身
      accountsEdit: false, //账款单身表格是否可编辑
      paymentList: [], //付款单身
      paymentEdit: false, //付款单身表格是否可编辑
      referenceNum: "", //税号（暂定）
      printTimes: "", //凭证编号（暂定）
      status: "", //集团代付单号（暂定）
      audit: "", //审核（暂定）
      auditCheck: false, //签核（暂定）
      auditNum: "", //审核码（暂定）
      paymentType: "", //支付类型（暂定）

      // 状态栏数据
      dataOwner: "", //资料所有者（暂定）
      dataOwnerGroup: "", //资料所有群（暂定）
      dataChanger: "", //资料更改者（暂定）
      dataChangeTime: "", //资料更改日（暂定）
      latestChange: "", //最近修改日（暂定）
      dataValidCode: "", //有效码（暂定）
      // 右侧浮窗
      Btns_List: [
        { name: "付款单身", method: "singlePay" },
        { name: "会计分录生成", method: "handleAccount" },
        { name: "分录底稿", method: "entryPapers" },
        { name: "审核", method: "handAudit" },
        { name: "取消审核", method: "auditCancel" },
        // { name: "抛转凭证", method: "handleTurn" },
        // { name: "抛转凭证还原", method: "handleReduct" },
      ],
      // 会计分录生成弹窗
      accEntryVis: false,
      accEntrySucVis: false, //成功弹窗
      accEntryFailVis: false, //失败弹窗
      accEntryAgain: false, //重新生成弹窗
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
        selectLoading: true, // 弹窗组件表格加载状态
      },
      // 弹出框表格数据
      tableData: {
        // *** 基本资料-表头 ***
        // 币种表头
        head_BZ: [
          { name: "azi01", title: "币种代码" },
          { name: "azi02", title: "币种说明" },
        ],
        // 付款厂商表头
        head_FKCS: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商名称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        // 人员表头
        head_RY: [
          { name: "gen01", title: "员工编号" },
          { name: "gen02", title: "员工姓名" },
          { name: "gen03", title: "所属部门编号" },
        ],
        // 部门表头
        head_BM: [
          { name: "gem01", title: "部门编号" },
          { name: "gem02", title: "部门名称" },
        ],
        // *** 单身表格-表头 ***
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
        .then((res) => {
          if (res.status == 200) {
            sessionStorage.setItem("nowTheadList", JSON.stringify(res.data[0]));
            sessionStorage.setItem(
              "operation_code",
              JSON.stringify(res.data[0].apf01)
            );
            this.fillTheadList();
            this.changePage = true;
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
          this.singleAccount(); //获取付款借方单身表格数据
          this.PayCredit(); //获取贷方单身表格数据
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
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 录入
    entryClick() {
      this.displayType = "edit";
      this.editType = "entry";
      // 清空数据
      this.cleanAllList();
      // 设置默认值
      this.theadList.apf02 = new Date(); //付款日期
      this.theadList.apf06 = "RMB"; //录入日期
      this.theadList.apfinpd = new Date(); //录入日期
    },
    // 修改
    changeClick() {
      this.displayType = "edit";
      this.editType = "change";
    },
    // 删除
    deleteClick() {
      this.deletePaymentList();
    },
    // 复制
    copyClick() {
      this.displayType = "edit";
      this.editType = "copy";
    },
    // *** 借方单身 ***
    // 单身按钮点击
    editSingleAccount() {
      this.menuClickable = false;
      if (this.accountsList.length == 0) {
        let data = [
          {
            id: "",
            apg01: this.operation_code,
            apg02: "", //项次
            apg04: "", //账款编号
            apg06: "1", //子账期项次
            apa02: "", //账款日期
            apa13: "RMB", //币种
            apa14: "1", //汇率
            apg05f: "", //原币冲账金额
            apg05: "", //本币冲账金额
          },
        ];
        this.accountsList = data;
      }
      this.accountsEdit = true;
    },
    // 获取借方单身列表
    singleAccount() {
      let params = {
        operation_code: this.operation_code,
        operation_type: this.operation_type,
      };
      payDebitList(params).then((res) => {
        this.accountsList = res.data;
      });
    },
    // 借方单身确认修改
    accountSure(val, data) {
      let params = {
        operation_code: this.operation_code,
        operation_type: this.operation_type,
        records: data,
      };
      updatePayDebit(params).then((res) => {
        if (res.status == 200) {
          this.$message.success("修改成功！");
          this.accountsEdit = !val;
          this.singleAccount();
        } else {
          this.$message.error("修改失败：", res.error.message);
        }
        this.accountsEdit = !val;
        this.singleAccount();
        this.menuClickable = true;
      });
    },
    // 借方单身取消修改
    accountCancel(val) {
      this.accountsEdit = val;
      this.menuClickable = true;
      this.singleAccount();
    },
    // **********
    // *** 贷方单身 ***
    // 获取贷方单身列表
    PayCredit() {
      let params = {
        operation_code: this.operation_code,
        operation_type: this.operation_type,
      };
      payCreditList(params).then((res) => {
        this.paymentList = res.data;
      });
    },
    // 贷方单身，直接付款按钮点击
    singlePay() {
      this.menuClickable = false;
      if (this.paymentList == 0) {
        let data = [
          {
            id: "",
            aph01: this.operation_code,
            aph02: "", //项次
            aph03: "", //类型
            aph08: "", //银行
            aph04: "", //科目或账款
            aph16: "", //银行异动码
            nmc02: "", //核算项名称
            aph07: "", //到期日
            aph13: "", //币种
            aph14: "", //汇率
            aph05f: "", //原币付款金额
            aph05: "", //本币付款金额
          },
        ];
        this.paymentList = data;
      }
      this.paymentEdit = true;
    },
    // 贷方单身确认修改
    paymentSure(val, data) {
      let params = {
        operation_code: this.operation_code,
        operation_type: this.operation_type,
        records: data,
      };
      updatePayCredit(params).then((res) => {
        if (res.status == 200) {
          this.$message.success("修改成功！");
        } else {
          this.$message.error("修改失败：", res.error.message);
        }
        this.paymentEdit = !val;
        this.PayCredit();
        this.menuClickable = true;
      });
    },
    // 贷方单身取消修改
    paymentCancel(val) {
      this.paymentEdit = val;
      this.menuClickable = true;
      this.PayCredit();
    },
    // ********
    // 查询
    searchClick() {
      this.displayType = "edit";
      this.editType = "search";
      // 清空数据
      this.cleanTheadData();
    },
    // 取消
    cancel() {
      this.displayType = "show";
      this.editType = "";
      this.fillTheadList();
      // 点击取消，如果当前有数据时且是修改状态，那么直接返回并查询之前的数据显示，如果是录入或者搜索状态，那么直接清空
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

    // 会计分录生成
    handleAccount() {
      this.accEntryVis = true;
    },
    // *************会计分录弹出框的事件************
    accEntryCancel() {
      this.accEntryVis = false;
    },
    accEntrySure(val) {
      // 生成分录
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      createEntry(params).then((result) => {
        if (result.status == 200) {
          let that = this;
          this.accEntryVis = false;
          // this.accEntrySucVis = true;
          this.$message.success("生成分录成功！");
          console.log("会计分录生成结果：", result);
        } else {
          this.accEntryVis = false;
          // this.accEntryFailVis = true;
          this.$message.error("生成分录失败：" + result.error.message);
        }
      });
      // that.accEntryAgain = true;  //创建结果重复时激活
    },
    // 弹出成功框时的事件
    cancel_accEntrySuc() {
      this.accEntrySucVis = false;
    },
    sure_accEntrySuc() {
      this.accEntrySucVis = false;
    },
    // 弹出失败框时的事件
    cancel_accEntryFail() {
      this.accEntryFailVis = false;
    },
    sure_accEntryFail() {
      this.accEntryFailVis = false;
    },
    // 重新生成时的事件
    cancel_again() {
      this.accEntryAgain = false;
    },
    sure_again() {
      this.accEntryAgain = false;
    },
    // ******************END*******************
    // 分录底稿
    entryPapers() {
      this.$router.push({
        path: "entryPapers",
        query: {
          operation_type: this.operation_type,
          operation_code: this.operation_code,
        },
      });
    },
    handAudit() {
      this.auditVisible = true;
    },
    auditCancel() {
      this.auditCancelVisible = true;
    },
    // 抛转凭证
    handleTurn() {
      this.turnCredentVisible = true;
    },
    // 抛转凭证还原
    handleReduct() {
      this.reductCreVis = true;
    },
    // *************审核弹出框的事件************
    auditDialogCancel() {
      this.auditVisible = false;
    },
    auditDialogSure(val) {
      console.log("审核数据：", val);
      // 发起审核
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      examine(params).then((result) => {
        if (result.status == 200) {
          this.auditVisible = false;
          // this.auditSuccessVisible = true;
          let params = {
            id: this.theadList.id,
          };
          paymentSingle(params)
          .then((res) => {
            if (res.status == 200) {
              sessionStorage.setItem(
                "nowTheadList",
                JSON.stringify(res.data[0])
              );
              sessionStorage.setItem(
                "operation_code",
                JSON.stringify(res.data[0].apf01)
              );
              this.fillTheadList();
              this.changePage = true;
              this.$message.success("提交审核成功！");
            } else {
              this.menuClickable = false;
              this.$message.error("获取审核数据失败：" + result.error.message);
            }
          })
          .then(() => {
            this.singleAccount(); //获取付款借方单身表格数据
            this.PayCredit(); //获取贷方单身表格数据
          });
        } else {
          this.auditVisible = false;
          // this.auditCancelFailVisible = true;
          this.$message.error("提交审核失败：" + result.error.message);
        }
      });
    },
    // 关闭成功弹框的事件
    cancelSuccess() {
      this.auditSuccessVisible = false;
    },
    sureSuccess() {
      this.auditSuccessVisible = false;
    },
    // 关闭失败弹框的事件
    cancelFail() {
      this.auditFailVisible = false;
    },
    sureFail() {
      this.auditFailVisible = false;
    },
    // ******************END*******************

    // *************取消审核弹出框的事件************
    auditcancel_Cancel() {
      this.auditCancelVisible = false;
    },
    auditCancel_Sure(val) {
      console.log("取消审核：", val);
      // 取消审核
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      examine_cancel(params).then((result) => {
        if (result.status == 200) {
          this.auditCancelVisible = false;
          // this.auditCancelSuccessVisible = true;
          this.$message.success("取消审核成功！");
        } else {
          this.auditCancelVisible = false;
          // this.auditCancelFailVisible = true;
          this.$message.error("取消审核失败：" + result.error.message);
        }
      });
    },
    // 弹出成功框时的事件
    cancel_aduditSuccess() {
      this.auditCancelSuccessVisible = false;
    },
    sure_auditSuccess() {
      this.auditCancelSuccessVisible = false;
    },
    // 弹出失败框时的事件
    cancel_auditFail() {
      this.auditCancelFailVisible = false;
    },
    sure_auditFail() {
      this.auditCancelFailVisible = false;
    },
    // ******************END*******************
    // *************抛转凭证弹出框的事件************
    credent_Cancel() {
      this.turnCredentVisible = false;
    },
    credent_Sure(val) {
      // 抛转凭证
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      tossVoucher(params).then((result) => {
        if (result.status == 200) {
          this.turnCredentVisible = false;
          this.credentSuccessVisible = true;
        } else {
          this.credentFailVisible = true;
          this.turnCredentVisible = false;
          this.$message.error("抛转凭证失败：" + result.error.message);
        }
      });
    },
    // 弹出框成功时的事件
    cancel_credentSuccess() {
      this.credentSuccessVisible = false;
    },
    sure_credentSuccess() {
      this.credentSuccessVisible = false;
    },
    // 弹出框失败时的事件
    cancel_credentFail() {
      this.credentFailVisible = false;
    },
    sure_credentFail() {
      this.credentFailVisible = false;
    },
    // ******************END*******************
    // *************抛转凭证还原弹出框的事件************
    reductCre_Cancel() {
      this.reductCreVis = false;
    },
    reductCre_Sure(val) {
      // 抛转还原
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      tossVoucher_cancel(params).then((result) => {
        if (result.status == 200) {
          this.reductCreVis = false;
          this.reductCreSucVis = true;
        } else {
          this.reductCreFailVis = true;
          this.reductCreVis = false;
          this.$message.error("抛转凭证还原失败：" + result.error.message);
        }
      });
    },
    // 弹出框成功时的事件
    cancel_reductCreSuc() {
      this.reductCreSucVis = false;
    },
    sure_reductCreSuc() {
      this.reductCreSucVis = false;
    },
    // 弹出框失败时的事件
    cancel_reductCreFail() {
      this.reductCreFailVis = false;
    },
    sure_reductCreFail() {
      this.reductCreFailVis = false;
    },
    // ******************END*******************

    // 获取币种
    getCoinTypes() {
      azisList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.bodyData = res.data;
          this.dataSelect.selectLoading = false;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      });
    },
    // 获取付款厂商
    getFKCS() {
      pmcsList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.bodyData = res.data;
          this.dataSelect.selectLoading = false;
        } else {
          this.$message.error("获取付款厂商列表失败：" + result.error.message);
        }
      });
    },
    // 获取人员列表
    getRY() {
      gensList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.bodyData = res.data;
          this.dataSelect.selectLoading = false;
        } else {
          this.$message.error("获取人员列表失败：" + result.error.message);
        }
      });
    },
    // 获取部门列表
    getBM() {
      gemsList().then((res) => {
        if (res.status == 200) {
          this.dataSelect.bodyData = res.data;
          this.dataSelect.selectLoading = false;
        } else {
          this.$message.error("获取部门列表失败：" + result.error.message);
        }
      });
    },
    // ***** 基本数据存储相关 *****
    // 表单
    fillTheadList() {
      // 新增成功、编辑成功后回显表单数据
      let nowTheadList = sessionStorage.getItem("nowTheadList")
        ? JSON.parse(sessionStorage.getItem("nowTheadList"))
        : {};
      // 依据结果显示
      if (JSON.stringify(nowTheadList) !== "{}") {
        this.menuClickable = true;
        this.fillData(nowTheadList); //填充数据
        this.singleAccount(); //加载借方单身
        this.PayCredit(); //加载贷方单身
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
      this.cleanTheadData();
    },

    cleanTheadData() {
      // 表头列表
      this.theadList = {
        // 基本资料 需要提交到后端的
        id: "",
        apf01: "", //付款单号
        apf02: "", //付款日期
        apfinpd: "", //录入日期
        apf03: "", //付款厂商
        apf12: "", //厂商简称
        apf06: "", //币种
        apf11: "", //付款理由
        apf24: "", //现金变动码1
        apf04: "", //付款人员
        apf05: "", //付款部门
        apf08f: "", //原币账款金额
        apf09f: "", //原币暂付金额
        apf10f: "", //原币付款金额
        apf08: "", //本币账款金额
        apf09: "", //本币暂付金额
        apf10: "", //本币付款金额
        apf41: "",//审核码
      };
      this.theadList_show = {
        apf11_azf03: "", //付款理由（带出文字）
      };
    },

    // 赋值
    fillData(val) {
      this.theadList = {
        // 基本资料 需要提交到后端的
        id: val.id,
        apf01: val.apf01, //付款单号
        apf02: val.apf02, //付款日期
        apfinpd: val.apfinpd, //录入日期
        apf03: val.apf03, //付款厂商
        apf12: val.apf12, //厂商简称
        apf06: val.apf06, //币种
        apf11: val.apf11, //付款理由
        apf24: val.apf24, //现金变动码
        apf04: val.apf04, //付款人员
        apf05: val.apf05, //付款部门
        apf08f: val.apf08f, //原币账款金额
        apf09f: val.apf09f, //原币暂付金额
        apf10f: val.apf10f, //原币付款金额
        apf08: val.apf08, //本币账款金额
        apf09: val.apf09, //本币暂付金额
        apf10: val.apf10, //本币付款金额
        apf41:val.apf41,//审核码
      };
      this.theadList_show = {
        apf11_azf03: val.apf11_azf03, //付款理由（带出文字）
      };
      this.operation_code = val.apf01;
      console.log("当前有待显示数据：", this.theadList);
    },

    // 获取所有冲账作业
    getAllTheadList() {
      const workParams = {};
      Object.keys(this.theadList).forEach((key) => {
        workParams["filter[" + key + "]"] = this.theadList[key];
      });
      paymentList(workParams).then((res) => {
        if (res.status == 200) {
          sessionStorage.setItem("allWorksList", JSON.stringify(res.data));
          this.menuClickable = true;
          this.displayType = "show";
          // 查询完数据后直接进行第一个数据的展示
          if (res.data.length == 0) {
            this.menuClickable = false;
            this.$message.warning("暂无符合条件的作业");
          } else {
            this.bindVal = 1;
            this.blur();
          }
        } else {
          this.$message.error(
            "获取付款冲账作业请款作业列表失败：" + result.error.message
          );
        }
      });
    },
    // 新增冲账作业
    addPaymentList() {
      addPayment(this.theadList).then((res) => {
        if (res.status == 200) {
          sessionStorage.setItem("nowTheadList", JSON.stringify(res.data));
          sessionStorage.setItem(
            "operation_code",
            JSON.stringify(res.data.apf01)
          );
          this.menuClickable = true;
          this.changePage = false;
          this.displayType = "show";
          this.fillData(res.data); //赋值
          if (this.editType == "entry") {
            this.$message.success("新增付款冲账作业成功！");
          } else if (this.editType == "copy") {
            this.$message.success("复制付款冲账作业成功！");
          }
        } else {
          if (this.editType == "entry") {
            this.$message.error(
              "新增付款冲账作业失败：" + result.error.message
            );
          } else if (this.editType == "copy") {
            this.$message.error(
              "复制付款冲账作业失败：" + result.error.message
            );
          }
        }
      });
    },
    // 编辑冲账作业
    editPaymentList() {
      editPayment(this.theadList).then((res) => {
        if (res.status == 200) {
          sessionStorage.setItem("nowTheadList", JSON.stringify(res.data));
          sessionStorage.setItem(
            "operation_code",
            JSON.stringify(res.data.apf01)
          );
          this.menuClickable = true;
          this.changePage = false;
          this.displayType = "show";
          this.fillTheadList();
          this.$message.success("编辑杂项应付款请款作业成功！");
        } else {
          this.$message.error(
            "编辑杂项应付款请款作业失败：" + res.error.message
          );
        }
      });
    },
    // 删除冲账作业
    deletePaymentList() {
      this.$confirm("此操作将永久删除本作业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: this.theadList.id,
          };
          delPayment(data).then((res) => {
            if (res.status == 200) {
              this.cleanAllList();
              this.$message.success("删除成功！");
            } else {
              this.$message.error("删除失败：" + res.error.message);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 数据选择弹出框相关操作
    // 数据选择
    selectDialog(type) {
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "BASE_INFO_FKCS":
          // this.getFKCS();
          this.dataSelect.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_FKCS;
          let filter_FKCS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_FKCS;
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.dialogTitle = "付款厂商";
          break;
        case "BASE_INFO_BZ":
          // this.getCoinTypes();
          this.dataSelect.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_BZ;
          let filter_BZ = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_BZ;
          this.dataSelect.searchApi = "meta/azis";
          this.dataSelect.dialogTitle = "币种";
          break;
        case "BASE_INFO_FKLY":
          this.dataSelect.dialogTitle = "付款理由";
          break;
        case "BASE_INFO_XJYDM":
          this.dataSelect.dialogTitle = "现金异动码";
          break;
        case "BASE_INFO_FKRY":
          // this.getRY();
          this.dataSelect.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_RY;
          let filter_FKRY = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_FKRY;
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.dialogTitle = "付款人员";
          break;
        case "BASE_INFO_FKBM":
          // this.getBM();
          this.dataSelect.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_BM;
          let filter_FKBM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_FKBM;
          this.dataSelect.searchApi = "meta/gems";
          this.dataSelect.dialogTitle = "付款部门";
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
      this.dataSelect.bodyData = [];
      this.dataSelect.choosedData = val;
      this.dataSelect.selectLoading = true;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "BASE_INFO_FKCS":
            if (val.length == 1) {
              this.theadList.apf03 = val[0].pmc01;
            } else {
            }
            break;
          case "BASE_INFO_BZ":
            console.log(val);
            if (val.length == 1) {
              this.theadList.apf06 = val[0].azi01;
            } else {
            }
            break;
          case "BASE_INFO_FKLY":
            break;
          case "BASE_INFO_XJYDM":
            break;
          case "BASE_INFO_FKRY":
            if (val.length == 1) {
              this.theadList.apf04 = val[0].gen01;
            } else {
            }
            break;
          case "BASE_INFO_FKBM":
            if (val.length == 1) {
              this.theadList.apf05 = val[0].gem01;
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
              .w152 {
                width: 152px !important;
              }
            }
          }
          .img {
            width: 86px;
            height: 86px;
            background: #f5f7fa;
            border: 1px solid #e4e7ed;
            &.imgY {
              background: #fff;
            }
            img {
              width: 86px;
              height: 86px;
            }
          }
        }
      }
    }
    .coins {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      ul {
        width: 260px;
        background: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        > li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          .coinInput {
            width: 163px;
          }
          .coinsLabel {
            height: 40px;
            line-height: 40px;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
