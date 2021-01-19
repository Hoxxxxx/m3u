<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" class="save" @click="addNewFlow('add')">保存</el-button>
        <el-button type="primary" class="next" @click="addNewFlow('next')">下一步</el-button>
      </div>
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane name="firTab">
          <!-- tab标签 -->
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'firTab' ? 'potActive' : ''"
            ></span>
            <span>表单</span>
          </div>
          <!-- 内容 -->
          <div class="tabContent">
            <div class="title">{{ workname }}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa03') ? 'redPot' : ''">经办人</span>
                </div>
                <div class="infobox middlebox editNot">
                  {{ tableData.oaa03_show }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div class="infobox selectbox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ showData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">员工编号</span>
                </div>
                <div class="infobox editNot">
                  {{ showData.oaa04_gen01 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">所属部门</span>
                </div>
                <div class="infobox editNot last_row">
                  {{ showData.oaa04_gen04 }}
                </div>
              </div>
              <!-- 付款信息 -->
              <div class="title_line">付款信息</div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa10') ? 'redPot' : ''">付款申请单</span>
                </div>
                <div class="infobox longbox selectbox">
                  <div
                    class="selector"
                    style="padding-right: 0; background-position: right center"
                    @click="selectDialog('FKSQD')"
                  >
                    {{ tableData.oaa10_show }}
                  </div>
                </div>
              </div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa10_oaa01') ? 'redPot' : ''">付款编号</span>
                </div>
                <div class="infobox disabledbox editNot">
                  {{ tableData.oaa10_oaa01 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa10_oaa11') ? 'redPot' : ''">预付厂商</span>
                </div>
                <div class="infobox disabledbox editNot">
                  {{ tableData.oaa10_oaa11 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa10_oaa11') ? 'redPot' : ''">厂商简称</span>
                </div>
                <div class="infobox disabledbox last_row editNot">
                  {{ tableData.oaa10_oaa11_show }}
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa10_oaa13') ? 'redPot' : ''">币种</span>
                </div>
                <div class="infobox disabledbox selectbox editNot">
                  {{ tableData.oaa10_oaa13_show }}
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa10_oaa14') ? 'redPot' : ''">汇率</span>
                </div>
                <div class="infobox disabledbox selectbox editNot">
                  {{ tableData.oaa10_oaa14 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa10_oaa17') ? 'redPot' : ''">发票金额</span>
                </div>
                <div class="infobox last_row editNot last_row">
                  {{ tableData.oaa10_oaa17 }}
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">折合汇率金额</div>
                <div class="infobox editNot">
                  {{ oaa10_ZHHLJE }}
                </div>
                <div class="titlebox">折合汇率金额大写</div>
                <div class="infobox editNot">
                  {{ oaa10_ZHHLJEDX }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa09') ? 'redPot' : ''">本次支付金额</span>
                </div>
                <div class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa09"
                    placeholder="请输入本次支付金额"
                  />
                </div>
              </div>
              <!-- 5 -->
              <div class="form_line ">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa18') ? 'redPot' : ''">说明</span>
                </div>
                <div
                  class="infobox last_row longbox areabox"
                  style="width: 100%"
                >
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa18"
                    placeholder="请输入说明"
                    maxlength="80"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa99') ? 'redPot' : ''">备注</span>
                </div>
                <div class="infobox areabox longbox" style="width: 100%">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa99"
                    placeholder="请输入备注"
                    maxlength="80"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa16') ? 'redPot' : ''">收款方式</span>
                </div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa16"
                    class="select"
                    placeholder="请选择收款方式"
                  >
                    <el-option
                      v-for="(item, index) in fixedData.payTypes"
                      :key="index"
                      :label="item.pma02"
                      :value="item.pma01"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa21') ? 'redPot' : ''">收款人</span>
                </div>
                <div class="infobox disabledbox selectbox">
                  {{ tableData.oaa21 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa22') ? 'redPot' : ''">开户行</span>
                </div>
                <div class="infobox selectbox disabledbox last_row">
                  {{ tableData.oaa22 }}
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa23') ? 'redPot' : ''">收款账号</span>
                </div>
                <div class="infobox selectbox disabledbox middlebox">
                  {{ tableData.oaa23 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa24') ? 'redPot' : ''">支票号</span>
                </div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa24"
                    placeholder="请输入支票号"
                  />
                </div>
              </div>
              <!-- 银行信息 -->
              <div class="title_line">银行信息</div>
              <div>
                <el-table
                  :data="tableData.oaf"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                  :header-cell-class-name="must_oaf"
                >
                  <el-table-column
                    prop="id"
                    label="增 / 删"
                    fixed="left"
                    width="100px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div style="font-size: 24px; width: 100%; height: 100%">
                          <i
                            v-if="scope.$index == tableData.oaf.length - 1"
                            @click="addRow2()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i>
                          <i
                            @click="deleteRow2(scope.$index)"
                            class="el-icon-remove"
                            style="color: #f56c6c; width: 30px; cursor: pointer"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf01_show"
                    label="付款方式"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="selectBorder">
                        <el-select
                          v-model="scope.row.oaf01"
                          class="select"
                          placeholder="请选择付款方式"
                        >
                          <el-option
                            v-for="(item, index) in fixedData.payTypes"
                            :key="index"
                            :label="item.pma02"
                            :value="item.pma01"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf02"
                    label="银行编号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('YHBH', scope.$index)"
                        >
                          {{ scope.row.oaf02 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf03"
                    label="科目编号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('KM', scope.$index)"
                        >
                          {{ scope.row.oaf03 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf03_show"
                    label="科目名称"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div class="selectorInfo selectBorder">
                          {{ scope.row.oaf03_show }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf04"
                    label="异动码"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('YDM', scope.$index)"
                        >
                          {{ scope.row.oaf04 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf05"
                    label="币种"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="selectBorder">
                        <el-select
                          v-model="scope.row.oaf05"
                          class="select"
                          placeholder="请选择币种"
                        >
                          <el-option
                            v-for="(item, index) in fixedData.cointypes"
                            :key="index"
                            :label="item.azi02"
                            :value="item.azi01"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf06"
                    label="汇率"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf06"
                          placeholder="汇率"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf07"
                    label="本次支付金额（原币）"
                    min-width="200px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf07"
                          placeholder="本次支付金额（原币）"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf07_local"
                    label="本次支付金额（本币）"
                    min-width="200px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf07_local"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 冲销信息 -->
              <div class="title_line">
                <el-button
                  type="primary"
                  size="small"
                  style="position: absolute; left: 0; top: 4px"
                  @click="selectDialog('WQX')"
                  >选择未清项</el-button
                >
                冲销信息
              </div>
              <div>
                <el-table
                  :data="tableData.oae"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                  :header-cell-class-name="must_oae"
                >
                  <el-table-column
                    prop="oae01"
                    label="账款编号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input v-model="scope.row.oae01" disabled></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oae03"
                    label="账款未付金额（原币）"
                    min-width="110px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input v-model="scope.row.oae03" disabled></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oae04"
                    label="账款未付金额（本币）"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oae04"
                          placeholder=""
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oae02"
                    label="本次支付金额（原币）"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oae02"
                          placeholder="请输入还款金额"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oae05"
                    label="本次支付金额（本币）"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oae05"
                          placeholder="请输入还款金额"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 附件区域 -->
    <el-card class="secContentCard" v-if="activeTab == 'firTab'">
      <!-- 内容 -->
      <div class="tabContent">
        <div class="title">附件内容</div>
        <el-upload
          class="upload_annex"
          :action="$store.state.upload_url"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
          accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.png,.jpg,.jpeg,.zip,.rar"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </el-card>

    <el-card class="secContentCard" v-if="activeTab == 'secTab'">
      <div class="tabContent">
        <div class="title">流程办理进度</div>
        <el-timeline class="timeline">
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <p class="step">第一步：申请人提交申请</p>
              <p class="result">通过</p>
              <p class="admin">分公司(2)系统管理员 2020-11-02 13:37:42</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <p class="step">第二步：部门主管审批 (主办：部门主管)</p>
              <p class="result handling">流程办理中</p>
              <p class="admin">分公司(2)系统管理员 2020-11-02 13:37:42</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
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
      :editType.sync="dataSelect.editType"
      :searchApi="dataSelect.searchApi"
      :searchType="dataSelect.searchType"
      :searchParams="dataSelect.searchParams"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
  </div>
</template>

<script>
import SelectData from "@/components/selectData";
import { dateFmt, number_chinese,OpenLoading } from "@/utils/utils.js";
import { addFlow, editFlow, workflows, openitems } from "@/api/process_new";
import { azisList, pmasList, mustItem } from "@/api/basic.js";
import {mapState} from 'vuex'
export default {
  components: { SelectData },
  data() {
    return {
      workname: "付款冲账申请单",
      activeTab: "firTab",
      workid: "",
      workName: "付款冲账申请单（华录新媒）", //流程名
      showData: {
        oaa04_show: "", //申请人
        expenseMoneyF: "", //报销金额大写
        oaa10_show: "", //付款申请单
      },
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        // 付款信息
        oaa10: "", //付款申请单
        oaa10_oaa01: "",
        oaa10_oaa11: "",
        oaa10_oaa11_show: "",
        oaa10_oaa13: "",
        oaa10_oaa13_show: "", //
        oaa10_oaa14: "",
        oaa10_oaa17: "",
        oaa09:"",//本次支付金额
        oaa18: "", //说明
        oaa99:"",//备注
        // 收款信息
        oaa16: "", //收款方式
        oaa21: "", //收款人
        oaa22: "", //开户行
        oaa23: "", //收款账号
        oaa24: "", //支票号
        oaf: [], //银行信息
        oae: [], //冲销信息
      },
      form_must:[],
      oae_must:[],//费用明细必填项
      oaf_must:[],//冲销信息必填项
      //财务信息
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: "", //记账日期
        oaz04: "", //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      fixedData: {
        // 币种列表
        cointypes: [],
        //支付方式
        payTypes: [],
      },
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8949,
      },
      rowIndex: "", //当前点击的行数
      //数据选择弹出框
      dataSelect: {
        editType: "entry",
        selectLoading: false,
        cur_input: "", // 当前点击的输入框
        dialogTitle: "数据选择", //当前弹框的title
        dialogVisible: false, //控制显示隐藏弹框
        headList: [], //表头
        bodyData: [], //表格数据
        choosedData: [], //选中的数据
        searchApi: "", //搜索框的接口地址
        searchParams: {}, //搜索接口自带参数
        searchType: "", //搜索类型
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
      },
      // 弹出框表头数据
      tableHead: {
        // 申请人
        head_SQR: [
          { name: "gen01", title: "员工编号" },
          { name: "gen02", title: "员工名称" },
          { name: "gen03", title: "所属部门编号" },
          { name: "gen04", title: "所属部门" },
        ],
        head_WQX: [
          { name: "id", title: "待抵账款编号" },
          { name: "original_amount", title: "本币未冲金额" },
          // { name: "date", title: "日期" },
          // { name: "rid", title: "借款人编号" },
          // { name: "rname", title: "借款人名称" },
          // { name: "voucher_code", title: "凭证编号" },
        ],
        head_bank: [
          { name: "nma01", title: "银行编号" },
          { name: "nma02", title: "银行名称" },
          { name: "nma28", title: "1.支存 2.活存 3.其他" },
          { name: "nma04", title: "银行账号" },
          { name: "nma09", title: "存款类别" },
          { name: "nma10", title: "存款币别" },
        ],
        head_KM: [
          { name: "aag01", title: "科目编号" },
          { name: "aag02", title: "科目名称" },
          { name: "aag03", title: "科目性质" },
          { name: "aag13", title: "额外名称" },
          { name: "aag04", title: "资产损益别" },
          { name: "aag07", title: "统制明细别" },
          { name: "aag24", title: "科目层级" },
        ],
        head_YDM: [
          { name: "nmc01", title: "银行异动码编号" },
          { name: "nmc02", title: "核算项名称" },
          { name: "nmc03", title: "存提款" },
        ],
        head_FKSQD: [
          { name: "id", title: "id" },
          { name: "title", title: "流程名称" },
          { name: "oaa10_oaa01", title: "付款编号" },
          { name: "oaa10_oaa11", title: "厂商编号" },
          { name: "oaa10_oaa11_show", title: "厂商简称" },
          { name: "oaa10_oaa13", title: "币种编号" },
          { name: "oaa10_oaa13_show", title: "币种名称" },
          { name: "oaa10_oaa14", title: "汇率" },
          { name: "oaa10_oaa17", title: "发票金额" },
          { name: "oaa10_oaa21", title: "收款人" },
          { name: "oaa10_oaa22", title: "开户行" },
          { name: "oaa10_oaa23", title: "收款账号" },
        ],
      },
    };
  },
  computed: {
    ...mapState(['filter_tplid']),
    // 报销金额（不含税）
    oaa10_ZHHLJE() {
      let sum =
        Number(this.tableData.oaa10_oaa17) * Number(this.tableData.oaa10_oaa14);
      this.oaa10_ZHHLJEDX = number_chinese(sum);
      return sum;
    },
  },
  watch: {
    "tableData.oaf": {
      handler(newval, oldval) {
        this.tableData.oaf.forEach((item) => {
          item.oaf07_local = (item.oaf07 * item.oaf06).toFixed(2);
        });
      },
      deep: true,
    },
    "tableData.oae": {
      handler(newval, oldval) {
        this.tableData.oae.forEach((item) => {
          item.oae05 = (item.oae02 * this.tableData.oaa10_oaa14).toFixed(2);
          console.log(newval);
        });
      },
      deep: true,
    },
  },
  created() {
    this.addParams.tplid = this.$route.query.tplid ? this.$route.query.tplid : 8949;
    let oauserinfo = JSON.parse(sessionStorage.getItem('oauserinfo'))
    this.tableData.oaa03 = oauserinfo.oauserid ? oauserinfo.oauserid : ''
    this.tableData.oaa03_show = oauserinfo.oaname
    // this.addParams.tplid = 8949;
    this.addRow2();
    this.getAzi(); //币种列表
    this.getPma(); //支付方式
    this.getMustItem()
    console.log('process.env:')
    console.log(process.env,this.filter_tplid)
  },
  methods: {
    getMustItem(){
      let params={
        tplid:this.addParams.tplid
      }
      mustItem(params).then(res=>{
        if(res.status == 200){
          this.form_must = res.data.form_able
          this.oae_must = res.data.form_must_able.oae ? res.data.form_must_able.oae : []
          this.oaf_must = res.data.form_must_able.oaf ? res.data.form_must_able.oaf : []
        }else{
          console.log('必填项获取失败！')
        }
      })
    },
    must_oae(obj) {
      if (this.oae_must.includes(obj.column.property)) {
        return "must";
      }
    },
    must_oaf(obj) {
      if (this.oaf_must.includes(obj.column.property)) {
        return "must";
      }
    },
    handleClick() {
      // console.log(this.activeTab);
    },
    // ****************附件上传*****************
    // 限制格式
    beforeAvatarUpload(file) {
      const isDoc = file.type === "application/msword";
      const isDocx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX =
        file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isPDF = file.type === "application/pdf";
      const isTXT = file.type === "text/plain";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isJPEG = file.type === "image/jpeg";
      const isZIP = file.type === "application/zip";
      const isRAR = file.type === "application/x-rar";
      const isNull = file.type === "";
      const isLt200M = file.size / 1024 / 1024 < 200;

      if (
        !isDoc &&
        !isDocx &&
        !isXls &&
        !isXlsx &&
        !isPPT &&
        !isPPTX &&
        !isPDF &&
        !isTXT &&
        !isPNG &&
        !isJPG &&
        !isJPEG &&
        !isZIP &&
        !isRAR
      ) {
        this.$message.warning(
          "上传文件仅限 doc / docx / xls / xlsx / ppt / pptx / pdf / txt / png / jpg / jpeg / zip / rar 格式!"
        );
        return false;
      }
      if (!isLt200M) {
        this.$message.warning("上传文件大小不能超过 200MB!");
        return false;
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.addParams.annexurlid.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path,
      });
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.addParams.annexurlid.forEach((item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice(index, 1);
        }
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //
    // *******************************************
    // ****************其他操作*******************
    // 新增（暂存）表单
    addNewFlow(type) {
      this.tableData = { ...this.tableData, ...this.oaz };
      this.addParams.from_data = this.tableData;
      const loading = OpenLoading(this, 1)
      if (this.workid == "") {
        addFlow(this.addParams).then((result) => {
          if (result.status == 200) {
            this.workid = result.data.workid;
            this.tableData.oaa01 = result.data.oaa01;
            this.tableData.oaa02 = result.data.oaa02;
            if (type == 'add') {
              this.$message.success("保存成功！");
            } else if (type == 'next') {
              this.$router.push(
                {
                  path:'/apply',
                  query: {
                    url_type: 'r0103',
                    workName:this.workName,
                    workid: this.workid,
                    workName: this.workName,
                    oaa01: this.tableData.oaa01,
                    oaa02: this.tableData.oaa02
                  }
                }
              )
            }
          } else {
            this.$message.error("保存失败：" + result.error.message);
          }
          loading.close();
        clearTimeout(this.overloading)
        });
      } else {
        this.addParams.workid = this.workid;
        editFlow(this.addParams).then((result) => {
          if (result.status == 200) {
            if (type == 'add') {
              this.$message.success("保存成功！");
            } else if (type == 'next') {
              this.$router.push(
                {
                  path:'/apply',
                  query: {
                    url_type: 'r0103',
                    workName:this.workName,
                    workid: this.workid,
                    workName: this.workName,
                    oaa01: this.tableData.oaa01,
                    oaa02: this.tableData.oaa02
                  }
                }
              )
            }
          } else {
            this.$message.error("保存失败：" + result.error.message);
          }
          loading.close();
        clearTimeout(this.overloading)
        });
      }
    },
    // *******************************************
    // 表格部分
    // 银行信息
    addRow2() {
      let data = {
        oaf01: "", //付款方式
        oaf02: "", //银行编号
        oaf03: "", //科目编号
        oaf04: "", //异动码
        oaf05: "RMB", //币种
        oaf06: 1, //汇率
        oaf07: "", //本次支付金额（原币）
      };
      this.tableData.oaf.push(data);
    },
    // 删除当前行
    deleteRow2(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oaf.splice(val, 1);
        if (this.tableData.oaf.length == 0) {
          this.addRow2();
        }
      });
    },
    // 获取基础数据*******
    // 币种列表
    getAzi() {
      azisList().then((res) => {
        if (res.status == 200) {
          this.fixedData.cointypes = res.data;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // 支付方式列表
    getPma() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.payTypes = res.data;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // ******************
    // 数据选择
    selectDialog(type, rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "FKSQD":
          let filter_FKSQD = [
            { label: "", model_key_search: "keyword" },
            {
              label: "tplid",
              model_key_search: "tplid",
              disabled: true,
              value: this.filter_tplid.FILTER_FKSQD,
              hide: true,
            },
          ];
          this.dataSelect.filter = filter_FKSQD;
          this.dataSelect.searchType = "mixed";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/workflows";
          this.dataSelect.headList = this.tableHead.head_FKSQD;
          this.dataSelect.dialogTitle = "付款申请单列表";
          break;
        case "SQR":
          let filter_SQR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SQR;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "YHBH":
          let filter_bank = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_bank;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/nmas";
          this.dataSelect.headList = this.tableHead.head_bank;
          this.dataSelect.dialogTitle = "银行";
          break;
        case "KM":
          let filter_KM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KM;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/aags";
          this.dataSelect.headList = this.tableHead.head_KM;
          this.dataSelect.dialogTitle = "科目";
          break;
        case "YDM":
          let filter_YDM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YDM;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/nmcs";
          this.dataSelect.headList = this.tableHead.head_YDM;
          this.dataSelect.dialogTitle = "异动码";
          break;
        case "WQX":
          this.dataSelect.dialogVisible = false;
          if (this.tableData.oaa10 == "") {
            this.$message.warning("请先选择付款申请单！");
          } else {
            this.dataSelect.dialogVisible = true;
            let params = {
              type: 2,
              number: this.tableData.oaa10_oaa11,
              currency:this.tableData.oaa10_oaa13
            };
            this.dataSelect.editType = "search";
            this.dataSelect.searchParams = params;
            this.dataSelect.filter = [];
            this.dataSelect.searchType = "single";
            this.dataSelect.searchApi = "oa/openitems";
            this.selectLoading = false;
            this.dataSelect.headList = this.tableHead.head_WQX;
            this.dataSelect.dialogTitle = "未清项列表";
          }
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
          case "SQR":
            this.tableData.oaa04 = val[0].gen01;
            this.showData.oaa04_show = val[0].gen02;
            this.showData.oaa04_gen01 = val[0].gen01;
            this.showData.oaa04_gen04 = val[0].gen04;
            break;
          case "FKSQD":
            this.tableData.oaa10 = val[0].id;
            this.tableData.oaa10_show = val[0].title;
            this.tableData.oaa10_oaa01 = val[0].oaa10_oaa01;
            this.tableData.oaa10_oaa11 = val[0].oaa10_oaa11;
            this.tableData.oaa10_oaa11_show = val[0].oaa10_oaa11_show;
            this.tableData.oaa10_oaa13 = val[0].oaa10_oaa13;
            this.tableData.oaa10_oaa13_show = val[0].oaa10_oaa13_show;
            this.tableData.oaa10_oaa14 = val[0].oaa10_oaa14;
            this.tableData.oaa10_oaa17 = val[0].oaa10_oaa17;
            this.tableData.oaa21 = val[0].oaa10_oaa21;
            this.tableData.oaa22 = val[0].oaa10_oaa22;
            this.tableData.oaa23 = val[0].oaa10_oaa23;
            break;
          case "YHBH":
            this.tableData.oaf[this.rowIndex].oaf02 = val[0].nma01;
            break;
          case "YDM":
            this.tableData.oaf[this.rowIndex].oaf04 = val[0].nmc01;
            break;
          case "KM":
            this.tableData.oaf[this.rowIndex].oaf03 = val[0].aag01;
            this.tableData.oaf[this.rowIndex].oaf03_show = val[0].aag02;
            break;
          case "WQX":
            let temp = [];
            val.forEach((item) => {
              let obj = {
                oae01: item.id,
                oae02: "",
                oae03: item.original_amount,
                oae04: item.amount,
                oae05: "",
              };
              temp.push(obj);
            });
            this.tableData.oae = temp;
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
.summry {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  .summryUl {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #666;
    .summryLi {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 1 1 auto;
      border-right: 1px solid #cccccc;
      .summryName {
        background: #fcfdff;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        width: 73px;
        // flex: 1 1 auto;
        line-height: 40px;
        text-align: center;
      }
      &:last-child {
        border-right: none;
        .summryCont {
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
