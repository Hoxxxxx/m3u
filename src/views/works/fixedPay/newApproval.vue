<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <!-- <el-button type="primary" class="save" @click="editNewFlow()">保存</el-button> -->
        <!-- <el-button class="normal" style="margin-left: 50px">委托</el-button> -->
        <!-- <el-button class="normal">挂起</el-button> -->
        <!-- <el-button class="normal">增加会签人</el-button> -->
        <!-- <el-button class="normal" style="margin-right: 70px">抛转</el-button> -->
        <el-button type="primary" class="agree" @click="nextStep('/agree')">同意</el-button>
        <el-button type="primary"  class="reject" @click="nextStep('/reject')">拒绝</el-button>
        <el-button type="primary" class="back" @click="nextStep('/back')">退回</el-button>
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
            <div class="title">{{ workName }}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox editNot">{{ tableData.oaa03 }}</div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row">{{ tableData.oaa05 }}</div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">{{ tableData.oaa04_show }}</div>
                <div class="titlebox">员工编号</div>
                <div class="infobox editNot">{{ tableData.oaa04 }}</div>
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot last_row">{{ tableData.oaa04_gen04 }}</div>
              </div>
              <!-- 付款信息 -->
              <div class="title_line">付款信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">预付厂商</div>
                <div class="infobox selectbox">{{tableData.oaa11}}</div>
                <div class="titlebox">厂商简称</div>
                <div class="infobox disabledbox">{{tableData.oaa11_show}}</div>
                <div class="titlebox">本次支付金额</div>
                <div class="infobox selectbox last_row">{{tableData.oaa12}}</div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox disabledbox">
                  <el-select
                    v-model="tableData.oaa13"
                    class="select"
                    placeholder="请选择币种"
                    disabled
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
                <div class="titlebox">汇率</div>
                <div class="infobox selectbox">{{tableData.oaa14}}</div>
                <div class="titlebox">应付金额</div>
                <div class="infobox selectbox disabledbox last_row">{{com_YFJE}}</div>
              </div>
              <!-- 3 -->
              <div class="form_line">
                <div class="titlebox">税别</div>
                <div class="infobox selectbox">{{tableData.oaa15}}</div>
                <div class="titlebox">税率</div>
                <div class="infobox editNot">{{tableData.oaa15_show}}</div>
                <div class="titlebox">支付方式</div>
                <div class="infobox last_row selectbox disabledbox">
                  <el-select
                    v-model="tableData.oaa16"
                    class="select"
                    placeholder="请选择支付方式"
                    disabled
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
              </div>
              <!-- 4 -->
              <!-- <div class="form_line">
                <div class="titlebox">报销金额</div>
                <div class="infobox middlebox editNot">
                  {{ expenseMoney }}
                </div>
                <div class="titlebox">报销金额大写</div>
                <div class="infobox middlebox editNot">
                  {{ tableData.expenseMoneyF }}
                </div>
              </div> -->
              <!-- 4 -->
              <div class="form_line">
                <div class="titlebox">固定资产申请单</div>
                <div class="infobox longbox selectbox">{{tableData.oaa17_show}}</div>
              </div>
              <!-- 5 -->
              <div class="form_line">
                <div class="titlebox">说明</div>
                <div class="infobox longbox" style="width: 100%">{{tableData.oaa18}}</div>
              </div>
              <!-- 5 -->
              <div class="form_line last_line">
                <div class="titlebox">验收信息</div>
                <div class="infobox last_row longbox" style="width: 100%">{{tableData.oaa19}}</div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">收款人</div>
                <div class="infobox selectbox">{{tableData.oaa21}}</div>
                <div class="titlebox">开户行</div>
                <div class="infobox selectbox">{{tableData.oaa22}}</div>
                <div class="titlebox">收款账号</div>
                <div class="infobox selectbox last_row">{{tableData.oaa23}}</div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">支票号</div>
                <div class="infobox last_row longbox selectbox" style="width: 100%">{{tableData.oaa24}}</div>
              </div>
              <!-- 发票明细行 -->
              <div class="title_line">发票明细行</div>
              <div>
                <el-table
                  :data="tableData.oaf"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oaf01"
                    label="发票号码"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf02"
                    label="发票日期"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf03"
                    label="税别"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                   <el-table-column
                    prop="oaf03_show"
                    label="税率"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf05"
                    label="税前金额（原币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf06"
                    label="税额（原币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf07"
                    label="含税金额（原币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="sqjeBB"
                    label="税前金额（本币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="seBB"
                    label="税额（本币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="hsjeBB"
                    label="含税金额（本币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName">税前金额（原币）</div>
                      <div class="summryCont editNot">{{ com_SQJEyb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">税额（原币）</div>
                      <div class="summryCont editNot">{{ com_SEyb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">含税合计（原币）</div>
                      <div class="summryCont editNot">{{ com_HSHJyb }}</div>
                    </li>
                  </ul>
                </div>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName ">税前金额（本币）</div>
                      <div class="summryCont editNot">{{ com_SQJEbb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">税额（本币）</div>
                      <div class="summryCont editNot">{{ com_SEbb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">含税合计（本币）</div>
                      <div class="summryCont editNot">{{ com_HSHJbb }}</div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 费用明细行项目 -->
              <div class="title_line">费用明细行项目</div>
              <div>
                <el-table
                  :data="tableData.oac"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oac01"
                    label="会计科目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac04"
                    label="项目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac05"
                    label="项目WBS"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac08"
                    label="资产卡片"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac07"
                    label="金额（不含税）"
                    min-width="180px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac11"
                    label="核算项一"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oac11"
                          placeholder="请选择核算项一"
                          disabled
                        >
                          <el-option
                            v-for="(item, index) in fixedData.options_04"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac12"
                    label="核算项二"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oac12"
                          placeholder="请选择核算项二"
                          disabled
                        >
                          <el-option
                            v-for="(item, index) in fixedData.options_05"
                            :key="index.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 冲销信息 -->
              <div class="title_line">
                冲销信息
              </div>
              <div>
                <el-table
                  :data="tableData.oad"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oad01"
                    label="待抵单号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="借款日期"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="rname"
                    label="借款人"
                    min-width="110px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="original_amount"
                    label="借款总金额"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oad02"
                    label="还款金额"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="voucher_code"
                    label="凭证号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <!-- 财务信息 -->
              <div v-if="oazShow == 1">
                <div class="title_line">
                  财务信息
                  <el-button
                    type="primary"
                    size="small"
                    style="position: absolute; right: 4px; top: 4px"
                    @click="generate()"
                    >生成凭证</el-button
                  >
                </div>
                <div class="form_line">
                  <div class="titlebox">银行</div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('bank')">
                      {{ financialData.bank_show }}
                    </div>
                  </div>
                  <div class="titlebox">异动码</div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('YDM')">
                      {{ financialData.num_show }}
                    </div>
                  </div>
                  <div class="titlebox">记账日期</div>
                  <div class="infobox middlebox datebox last_row">
                    <el-date-picker
                      v-model="oaz.oaz03"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">账款类型</div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('ZKLX')">
                      {{ financialData.oaz04_show }}
                    </div>
                  </div>
                  <div class="titlebox">凭证编号</div>
                  <div class="infobox selectbox editNot">
                    {{ oaz.oaz06 }}
                  </div>
                  <div class="titlebox">支付方式</div>
                  <div class="infobox middlebox selectbox last_row">
                    {{ financialData.oaz05_show }}
                  </div>
                </div>
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
        <!-- 已有文件部分 -->
        <div class="saveList">
          <div class="saveItem" v-for="(item,index) in fileList_user" :key="index">
            <i class="el-icon-document" style="margin-right: 7px"></i>
            <a style="cursor: pointer;" @click="download(item.id, item.name)"><span>{{item.name}}</span></a>
            <div class="btnBox">
              <!-- <el-button type="text">预览</el-button> -->
              <el-button type="text" @click="download(item.id, item.name)">下载</el-button>
            </div>
          </div>
        </div>
        <!-- 上传部分 -->
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
            <el-timeline-item 
              v-for="(item, index) in workclass_perflow"
              :key="index"
              :timestamp="item.date" 
              placement="top">
              <el-card>
                <p class="step">第{{index+1}}步：{{item.title}}</p>
                <p class="result">
                  <template>
                    <p v-if="item.pertype == '99'">通过</p>
                    <p v-if="item.pertype == '0'" class="handling">审批中</p>
                    <p v-if="item.pertype == '2'">拒绝</p>
                    <p v-if="item.pertype == '3'">退回</p>
                    <p v-if="item.pertype == '5'">审批结束</p>
                  </template>
                </p>
                <p class="admin">{{item.name}}  {{item.date}}</p>
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
// api
import { workflowsList, editFlow, transfer, addFlow } from "@/api/process_new";
import { azisList, pmasList, } from "@/api/basic";

export default {
  components: {SelectData},
  data() {
    return {
      activeTab: "firTab",
      workid: '',
      workName:"固定资产卡片",//流程名
      tableData: {
        // 表格部分
        oaf: [], // 发票明细
        oac: [], // 费用明细行项目
        oad: [], // 冲销信息
      },
      // 表单数据
      fixedData: {
        // 币种列表
        azisList: [],
        // 分摊列表
        shareList: [
          {
            id: 1,
            label: '单一部门分摊'
          },{
            id: 2,
            label: '多部门分摊'
          }
        ],
      },
      financialData: {
        bank_show: "", //银行回显数据
        num_show: "", //异动码回显数据
        oaz05_show: "", //支付方式回显数据
        oaz04_show: "", //账款类型回显数据
      },
      //财务信息
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: new Date(), //记账日期
        oaz04: "", //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      fileList_user: [],
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8948
      },
      // 当前流程列表
      workclass_perflow: [],
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
        head_bank: [
          { name: "nma01", title: "银行编号" },
          { name: "nma02", title: "银行名称" },
          { name: "nma28", title: "1.支存 2.活存 3.其他" },
          { name: "nma04", title: "银行账号" },
          { name: "nma09", title: "存款类别" },
          { name: "nma10", title: "存款币别" },
        ],
        head_YDM: [
          { name: "nmc01", title: "银行异动码编号" },
          { name: "nmc02", title: "核算项名称" },
          { name: "nmc03", title: "存提款" },
        ],
        head_ZKLX: [
          { name: "apr01", title: "账款类型编号" },
          { name: "apr02", title: "账款类型名称" },
        ],
      },
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4064
    this.getAzi() //币种列表
    this.getPma() //支付方式
    this.getworkflows()
  },
  computed: {
    // 应付金额
    com_YFJE(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf07);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 税前金额（原币）
    com_SQJEyb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf05);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 税额（原币）
    com_SEyb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf06);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 含税合计（原币）
    com_HSHJyb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf07);
        }, 0);
        return sum.toFixed(2)
      }
    },
     // 税前金额（本币）
    com_SQJEbb(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.sqjeBB);
      }, 0);
      return sum.toFixed(2)
    },
    // 税额（本币）
    com_SEbb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.seBB);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 含税合计（本币）
    com_HSHJbb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.hsjeBB);
        }, 0);
        return sum.toFixed(2)
      }
    },
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取流程信息************
    change_SB(rowIndex) {
      this.tableData.oaf[rowIndex].sqjeBB = (this.tableData.oaf[rowIndex].oaf03_show * this.tableData.oaf[rowIndex].oaf05).toFixed(2)
      this.tableData.oaf[rowIndex].seBB = (this.tableData.oaf[rowIndex].oaf03_show * this.tableData.oaf[rowIndex].oaf06).toFixed(2)
      this.tableData.oaf[rowIndex].hsjeBB = (this.tableData.oaf[rowIndex].oaf03_show * this.tableData.oaf[rowIndex].oaf07).toFixed(2)
    },
    change_HSJE(rowIndex) {
      this.tableData.oaf[rowIndex].oaf05 = (this.tableData.oaf[rowIndex].oaf07 / 1.06).toFixed(2)
      this.tableData.oaf[rowIndex].oaf06 = (this.tableData.oaf[rowIndex].oaf07 / 1.06 * 0.06).toFixed(2)
      this.change_SB(rowIndex)
    },
    getworkflows(){
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const params = {
        workid: this.workid
      }
      workflowsList(params).then(res=>{
        if(res.status == 200){
          loading.close()
          this.tableData = res.data.workclass_info.from_data
          this.tableData.oaf.forEach((item, index) => {
            this.change_HSJE(index)
          })
          this.workName = res.data.workclass_info.title
          this.workclass_perflow = res.data.workclass_perflow
          this.oazShow = 1
          // res.data.workclass_flow.erp_turn
          this.oaz.oaz05 = res.data.workclass_info.from_data.oaa16;
          this.financialData.oaz05_show =
            res.data.workclass_info.from_data.oaa16_show;
          if (res.data.file !== null) {
            res.data.file.forEach( item => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr
              })
            })
          }
        }else{
          loading.close()
          this.$message.error('获取流程信息失败：' + res.error.message);
        }
      })
    },
    
    // *******************************************
    // ***********获取下拉列表信息************
    getAzi () {
      azisList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      })
    },
    getPma() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.payTypes = res.data;
        } else {
          this.$message.error("获取支付方式列表失败：" + result.error.message);
        }
      });
    },
    // *******************************************
    // ***************附件上传******************
    // 限制格式
    beforeAvatarUpload(file) {
      const isDoc = file.type === "application/msword";
      const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX = file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isPDF = file.type === "application/pdf";
      const isTXT = file.type === "text/plain";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isJPEG = file.type === "image/jpeg";
      const isZIP = file.type === "application/zip";
      const isRAR = file.type === "application/x-rar";
      const isNull = file.type === '';
      const isLt200M = file.size / 1024 / 1024 < 200;

      if (!isDoc && !isDocx && !isXls && !isXlsx && !isPPT && !isPPTX && !isPDF && !isTXT && !isPNG && !isJPG && !isJPEG && !isZIP && !isRAR ) {
        this.$message.warning("上传文件仅限 doc / docx / xls / xlsx / ppt / pptx / pdf / txt / png / jpg / jpeg / zip / rar 格式!");
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
        fileaddr: response.data.path
      })
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.addParams.annexurlid.forEach( (item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice( index, 1 )
        }
      })
    },
    // 点击上传项回调
    handlePreview(file) {
      // console.log(file);
    },
    // 超出上传限制回调
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 移除前回调
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 下载文件流
    async download(id, filename) {
      const { data: res } = await this.axios({
          method: 'get',
          url: `files/download/${id}`,
          responseType: "blob",
      })
      let fileName = filename;
      let fileType = {
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pdf: 'application/pdf',
        txt: 'text/plain',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        zip: 'application/zip',
        rar: 'application/x-rar',
      }
      let type=fileName.split('.')[1];//获取文件后缀名
      let blob = new Blob([res],{
        type:fileType.type
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    // ******************************************
    // ****************其他操作*******************
    // 编辑表单
    editNewFlow() {
      this.tableData = {...this.tableData,...this.oaz}
      this.addParams.from_data = this.tableData
      editFlow(this.addParams)
      .then( result => {
        this.workid = result.data.workid
        this.tableData.oaa01 = result.data.oaa01
        this.tableData.oaa02 = result.data.oaa02
      })
    },
    // 下一步
    nextStep(url) {
      if (url == "/agree" && this.oazShow == 1) {
        console.log(this.oaz, this.oazShow);
        if (this.oaz.oaz06 == "") {
          this.$message.error("请先生成凭证！");
        } else {
          this.nextFuns(url);
        }
      } else {
        this.nextFuns(url);
      }
      
    },
    nextFuns(url){
      if (this.addParams.annexurlid.length !== 0) {
        this.addParams.from_data = this.tableData
        this.addParams.workid = this.workid
        this.fileList_user.forEach(item => {
          this.addParams.annexurlid.push({
            id: item.id,
            filename: item.name,
            fileaddr: item.url
          })
        })
        editFlow(this.addParams)
        .then( result => {
          if (result.status == 200) {
            this.$message.success("编辑成功！");
            this.$router.push({
              path: url,
              query: {
                workid: this.workid,
                workName: this.workName,
                oaa01: this.tableData.oaa01,
                oaa02: this.tableData.oaa02
              }
            })
          } else {
            this.$message.error("编辑失败：" + result.error.message);
          }
        })
      } else {
        this.$router.push({
          path: url,
          query: {
            workid: this.workid,
            workName: this.workName,
            oaa01: this.tableData.oaa01,
            oaa02: this.tableData.oaa02
          }
        })
      }
    },
    // ******************************************

    // 生成凭证
    generate() {
      const loading = this.$loading({
        lock: true,
        text: "抛转中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.addParams.from_data = {...this.tableData,...this.oaz};
      addFlow(this.addParams).then((res) => {
        if (res.status == 200) {
          let params = {
            workid: res.data.workid,
          };
          transfer(params).then((res) => {
            if (res.status == 200) {
              loading.close();
              this.$message.success("抛转成功！");
              this.oaz.oaz03 = res.data.oaz03;
              this.oaz.oaz06 = res.data.oaz06;
            } else {
              loading.close();
              this.$message.error("抛转失败:" + res.error.message);
            }
          });
        } else {
          loading.close();
          this.$message.error("抛转失败:" + res.error.message);
        }
      });
    },
    // **************************
    // 数据选择
    selectDialog(type, rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "bank":
          let filter_bank = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_bank;
          this.dataSelect.searchApi = "meta/nmas";
          this.dataSelect.headList = this.tableHead.head_bank;
          this.dataSelect.dialogTitle = "银行";
          break;
        case "YDM":
          let filter_YDM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YDM;
          this.dataSelect.searchApi = "meta/nmcs";
          this.dataSelect.headList = this.tableHead.head_YDM;
          this.dataSelect.dialogTitle = "异动码";
          break;
        case "ZKLX":
          let filter_ZKLX = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_ZKLX;
          this.dataSelect.searchApi = "meta/aprs";
          this.dataSelect.headList = this.tableHead.head_ZKLX;
          this.dataSelect.dialogTitle = "账款类型";
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
          case "bank":
            this.oaz.oaz01 = val[0].nma01;
            this.financialData.bank_show = val[0].nma02;
            break;
          case "YDM":
            this.oaz.oaz02 = val[0].nmc01;
            this.financialData.num_show = val[0].nmc02;
            break;
          case "ZKLX":
            this.oaz.oaz04 = val[0].apr01;
            this.financialData.oaz04_show = val[0].apr02;
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
@import "../../../assets/style/public.less";
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
        background: #FCFDFF;
        min-width: 80px;
        height: 40px;
        line-height: 40px;
        padding: 0 5px 0 5px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        width: 300px;
        height: 40px;
        flex: 1 1 auto;
        line-height: 40px;
        text-align: center;
      }
      &:last-child {
        border-right: none;
        .summryCont{
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
