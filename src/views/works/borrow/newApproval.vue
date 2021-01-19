<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button
          v-for="(link,index) in more" :key="index"
          type="primary"
          class="saveBtn"
          @click="seeMore(link.url)"
          >{{link.name}}</el-button
        >
        <el-button type="primary" class="save" @click="editNewFlow()">保存</el-button>
        <el-button v-if="workclass_personnel.perid.flownum==1" type="primary" class="next" @click="nextStep('/apply')">下一步</el-button>
        <!-- <el-button class="normal" style="margin-left: 50px">委托</el-button> -->
        <!-- <el-button class="normal">挂起</el-button> -->
        <!-- <el-button class="normal">增加会签人</el-button> -->
        <!-- <el-button class="normal" style="margin-right: 70px">抛转</el-button> -->
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary" class="agree" @click="nextStep('/agree')">同意</el-button>
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary"  class="reject" @click="nextStep('/reject')">拒绝</el-button>
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary" class="back" @click="nextStep('/back')">退回</el-button>
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
            <div class="title">{{workName}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox editNot">{{ tableData.oaa03_show }}</div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div class="infobox selectbox middlebox last_row editNot" v-if="!table_able.includes('oaa05')">{{ tableData.oaa05 }}</div>
                <div class="infobox selectbox middlebox last_row" v-if="table_able.includes('oaa05')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div class="infobox selectbox editNot" v-if="!table_able.includes('oaa04')">{{ tableData.oaa04_show }}</div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa04')">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ tableData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">员工编号</span>
                </div>
                <div class="infobox editNot">{{ tableData.oaa04 }}</div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">所属部门</span>
                </div>
                <div class="infobox editNot last_row">{{ tableData.oaa04_gen04 }}</div>
              </div>
              <!-- 借款信息 -->
              <div class="title_line">借款信息</div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa14') ? 'redPot' : ''">项目</span>
                </div>
                <div class="infobox middlebox selectbox editNot" v-if="!table_able.includes('oaa14')">{{tableData.oaa14_show}}</div>
                <div class="infobox middlebox selectbox" v-if="table_able.includes('oaa14')">
                  <div class="selector" @click="selectDialog('XM')">
                  {{ tableData.oaa14_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa15') ? 'redPot' : ''">项目WBS</span>
                </div>
                <div class="infobox middlebox selectbox last_row editNot" v-if="!table_able.includes('oaa15')">{{tableData.oaa15_show}}</div>
                <div class="infobox middlebox selectbox last_row" v-if="table_able.includes('oaa15')">
                  <div class="selector" @click="selectDialog('WBS')">
                  {{ tableData.oaa15_show }}
                  </div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa06') ? 'redPot' : ''">币种</span>
                </div>
                <!-- <div class="infobox selectbox">{{tableData.oaa06_show}}</div> -->
                <div class="infobox selectbox " :class="table_able.includes('oaa06')? '' : 'disabledbox'">
                  <el-select
                    v-model="tableData.oaa06"
                    class="select"
                    :disabled="table_able.includes('oaa06')?false:true"
                    placeholder="请选择币种"
                  >
                    <el-option
                      v-for="(item, index) in fixedData.azisList"
                      :key="index"
                      :label="item.azi02"
                      :value="item.azi01"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa07') ? 'redPot' : ''">借款金额</span>
                </div>
                <div class="infobox editNot" v-if="!table_able.includes('oaa07')">{{tableData.oaa07}}</div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa07')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa07"
                    placeholder="请输入借款金额"
                    @input="getExchangeRate()"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa08') ? 'redPot' : ''">汇率</span>
                </div>
                <div class="infobox last_row editNot" v-if="!table_able.includes('oaa08')">{{tableData.oaa08}}</div>
                <div class="infobox selectbox last_row" v-if="table_able.includes('oaa08')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa08"
                    placeholder="请输入汇率"
                    @input="getExchangeRate()"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa09') ? 'redPot' : ''">收款人</span>
                </div>
                <div class="infobox editNot" v-if="!table_able.includes('oaa09')">{{tableData.oaa09}}</div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa09')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa09"
                    placeholder="请输入收款人"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa10') ? 'redPot' : ''">账号</span>
                </div>
                <div class="infobox editNot" v-if="!table_able.includes('oaa10')">{{tableData.oaa10}}</div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa10')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa10"
                    placeholder="请输入账号"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa11') ? 'redPot' : ''">开户行</span>
                </div>
                <div class="infobox last_row editNot" v-if="!table_able.includes('oaa11')">{{tableData.oaa11}}</div>
                <div class="infobox selectbox last_row" v-if="table_able.includes('oaa11')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
                    placeholder="请输入开户行"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa12') ? 'redPot' : ''">支付方式</span>
                </div>
                <div class="infobox longbox selectbox" :class="table_able.includes('oaa12')? '' : 'disabledbox'">
                  <el-select
                    v-model="tableData.oaa12"
                    class="select"
                    :disabled="table_able.includes('oaa12')?false:true"
                    placeholder="请选择支付方式"
                  >
                    <el-option
                      v-for="item in fixedData.pmasList"
                      :key="item.pma01"
                      :label="item.pma02"
                      :value="item.pma01"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">折合汇率金额</div>
                <div class="infobox middlebox disabledbox">{{exchange}}</div>
                <div class="titlebox">折合汇率金额大写</div>
                <div class="infobox middlebox disabledbox last_row">{{exchange_Cap}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa17') ? 'redPot' : ''">出差单</span>
                </div>
                <div class="infobox longbox editNot" v-if="!table_able.includes('oaa17')">{{tableData.oaa17_show}}</div>
                <div class="infobox longbox selectbox" v-if="table_able.includes('oaa17')">
                  <div class="selector" style="padding-right:0;background-position:right center;" @click="selectDialog('CCSQD')">
                    {{ tableData.oaa17_show }}
                  </div>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa13') ? 'redPot' : ''">借款事由</span>
                </div>
                <div class="infobox longbox editNot" v-if="!table_able.includes('oaa13')">{{tableData.oaa13}}</div>
                <div class="infobox longbox selectbox" v-if="table_able.includes('oaa13')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa13"
                    placeholder="请输入借款事由"
                  />
                </div>
              </div>
              <!-- 财务信息 -->
              <div v-if="workclass_personnel.perid.flownum==3 && oazShow == 1">
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
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz01') ? 'redPot' : ''">银行</span>
                  </div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('bank')">
                      {{ financialData.bank_show }}
                    </div>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz02') ? 'redPot' : ''">异动码</span>
                  </div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('YDM')">
                      {{ financialData.num_show }}
                    </div>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz03') ? 'redPot' : ''">记账日期</span>
                  </div>
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
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz04') ? 'redPot' : ''">账款类型</span>
                  </div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('ZKLX')">
                      {{ financialData.oaz04_show }}
                    </div>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz06') ? 'redPot' : ''">凭证编号</span>
                  </div>
                  <div class="infobox selectbox editNot">
                    {{ oaz.oaz06 }}
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz05') ? 'redPot' : ''">支付方式</span>
                  </div>
                  <div class="infobox middlebox selectbox last_row">
                    {{ financialData.oaz05_show }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="流程进度" name="secTab">
          <!-- tab标签 -->
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'secTab' ? 'potActive' : ''"
            ></span>
            <span> 流程进度</span>
          </div>
          <!-- 内容 -->
          <div class="tabContent">
            <div class="title">{{workName}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
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
import { workflowsList, editFlow ,transfer,addFlow,} from "@/api/process_new.js"
import { azisList, pmasList,  } from "@/api/basic";
import { dateFmt, number_chinese, OpenLoading } from "@/utils/utils.js";
import {mapState} from 'vuex'
export default {
  components: {SelectData},
  data() {
    return {
      overloading: '', //加载定时器
      workid: '',
      workName: '借款申请',
      more:[],//查看更多
      activeTab: "firTab",
      tableData: {},
      // 汇率数据
      exchange: '', //折合汇率
      exchange_Cap: '', //折合汇率大写
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      table_able:[],//表格可编辑项
      form_must:[],//必填项
      financialData: {
        bank_show: "", //银行回显数据
        num_show: "", //异动码回显数据
        oaz05_show: "", //支付方式回显数据
        oaz04_show:"",//账款类型回显数据
      },
      fixedData: {
        // 币种列表
        azisList: [],
        // 付款方式列表
        pmasList: [],
      },
      //财务信息
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: dateFmt(new Date()), //记账日期
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
        tplid: 8944
      },
      workclass_personnel: {perid: {flownum: ''}}, //流程详情
      workclass_perflow: [], //已流转流程进度
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
        searchParams:{},//搜索接口自带参数
        searchType:"",//搜索类型
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
        head_XM: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        head_WBS: [
          { name: "pjb02", title: "WBS编号" },
          { name: "pjb03", title: "WBS名称" },
          { name: "pjb01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
        ],
        head_CCSQD:[
          { name: "id", title: "id" },
          { name: "title", title: "流程名称" },
        ],
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
    this.workid = this.$route.query.workid ? this.$route.query.workid : 4358
    this.getworkflows()
    this.getAzis()
    this.getPmas()
    console.log(process.env,this.filter)
  },
  computed: {
    ...mapState(['filter']),
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // 查看更多
    seeMore(url) {
      window.open(url, "_blank");
    },
    // ***********获取流程信息************
    getworkflows(){
      const loading = OpenLoading(this, 1)
      const params = {
        workid: this.workid
      }
      workflowsList(params).then(res=>{
        if(res.status == 200){
          loading.close()
          clearTimeout(this.overloading)
          this.tableData = res.data.workclass_info.from_data
          this.workName = res.data.workclass_info.title
          this.workclass_personnel = res.data.workclass_personnel;
          this.workclass_perflow = res.data.workclass_perflow
          this.table_able = res.data.workclass_info.form_able
          this.form_must = res.data.workclass_info.form_must_able
          this.oazShow = res.data.workclass_flow.erp_turn
          this.more = res.data.workclass_info.more
          this.oaz = {
            oaz01: res.data.workclass_info.from_data.oaz01, //银行
            oaz02: res.data.workclass_info.from_data.oaz02, //异动码
            oaz03: res.data.workclass_info.from_data.oaz03 ? res.data.workclass_info.from_data.oaz03 : dateFmt(new Date()), //记账日期
            oaz04: 3001, //账款类型
            oaz05: res.data.workclass_info.from_data.oaz05 ? res.data.workclass_info.from_data.oaz05 : res.data.workclass_info.from_data.oaa12, //支付方式
            oaz06: res.data.workclass_info.from_data.oaz06, //凭证编号
          }
          this.financialData ={
            bank_show: res.data.workclass_info.from_data.oaz01_show, //银行回显数据
            num_show: res.data.workclass_info.from_data.oaz02_show, //异动码回显数据
            oaz04_show: "员工借款",//账款类型回显数据
            oaz05_show: res.data.workclass_info.from_data.oaz05_show ? res.data.workclass_info.from_data.oaz05_show : res.data.workclass_info.from_data.oaa12_show, //支付方式回显数据
          }
          if (res.data.file !== null) {
            res.data.file.forEach( item => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr
              })
            })
          }
          this.getExchangeRate()
        }else{
          loading.close()
          clearTimeout(this.overloading)
          this.$message.error('获取流程信息失败：' + res.error.message);
        }
      })
    },
    // *******************************************
    // ***********获取下拉列表信息************
    getAzis () {
      azisList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      })
    },
    getPmas () {
      pmasList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.pmasList = result.data;
        } else {
          this.$message.error("获取付款方式列表失败：" + result.error.message);
        }
      })
    },
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
      console.log(file);
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
    // 计算折合汇率
    getExchangeRate() {
      this.exchange = Number(this.tableData.oaa07) * Number(this.tableData.oaa08)
      this.exchange = this.exchange.toFixed(2)
      this.NumberToChinese(this.exchange)
    },
    //阿拉伯数字转换函数
    toDx(n) {
      switch (n) {
          case "0":
              return "零";
          case "1":
              return "壹";
          case "2":
              return "贰";
          case "3":
              return "叁";
          case "4":
              return "肆";
          case "5":
              return "伍";
          case "6":
              return "陆";
          case "7":
              return "柒";
          case "8":
              return "捌";
          case "9":
              return "玖";
      }
    },
    // 转大写
    NumberToChinese(m){
      m *= 100;
      m += "";
      var length = m.length;

      var result = "";
      for (var i = 0; i < length; i++) {
          if (i == 2) {
            result = "元" + result;
          } else if (i == 6) {
            result = "万" + result;
          } else if (i == 10) {
            result = "亿" + result;
          }
          if (m.charAt(length - i - 1) == 0) {
              if (i != 0 && i != 1) {
                  if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                      result = "零" + result;
                  }
              }
              continue;
          }
          result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
      }
      result += result.charAt(result.length - 1) == '元' ? "整" : "";
      this.exchange_Cap = result;
    },
    // 保存
    editNewFlow() {
      this.tableData = {...this.tableData,...this.oaz}
      this.addParams.from_data = this.tableData;
      this.addParams.workid = this.workid;
      if(this.fileList_user.length > 0){
        this.fileList_user.forEach((item) => {
        this.addParams.annexurlid.push({
          id: item.id,
          filename: item.name,
          fileaddr: item.url,
        });
      });
      }
      const loading = OpenLoading(this, 1)
      editFlow(this.addParams).then((result) => {
        if (result.status == 200) {
          this.$message.success("编辑成功！");
        } else {
          this.$message.error("编辑失败：" + result.error.message);
        }
        loading.close();
        clearTimeout(this.overloading)
      });
    },
    // 下一步
    nextStep(url) {
      if (url == "/agree" && this.oazShow == 1 && this.workclass_personnel.perid.flownum == 3) {
        console.log(this.oaz,this.oazShow)
        if (this.oaz.oaz06 == "" || this.oaz.oaz06 == null) {
          this.$message.error("请先生成凭证！");
        } else if(url == "/reject" || url == "/back"){
        this.$router.push({
          path: url,
          query: {
            url_type: 'borrow',
            workid: this.workid,
            workName: this.workName,
            oaa01: this.tableData.oaa01,
            oaa02: this.tableData.oaa02,
          },
        });
      }
        else {
          this.nextFuns(url);
        }
      } else {
        this.nextFuns(url);
      }
    },
    nextFuns(url) {
        const loading = OpenLoading(this, 1)
        this.tableData = {...this.tableData,...this.oaz}
        this.addParams.from_data = this.tableData;
        this.addParams.workid = this.workid;
        if(this.fileList_user.length > 0){
          this.fileList_user.forEach((item) => {
          this.addParams.annexurlid.push({
            id: item.id,
            filename: item.name,
            fileaddr: item.url,
          });
        });
        }
        editFlow(this.addParams).then((result) => {
          if (result.status == 200) {
            this.$message.success("编辑成功！");
            this.$router.push({
              path: url,
              query: {
                url_type: 'borrow',
                workid: this.workid,
                workName: this.workName,
                oaa01: this.tableData.oaa01,
                oaa02: this.tableData.oaa02,
              },
            });
          } else {
            this.$message.error("编辑失败：" + result.error.message);
          }
          loading.close();
        clearTimeout(this.overloading)
        });
    },
    // ******************************************
    // 生成凭证
    generate() {
      const loading = OpenLoading(this, 2 , 50000)
      this.addParams.from_data = {...this.tableData,...this.oaz};
      this.addParams.workid = this.workid;
      editFlow(this.addParams).then((res) => {
        if (res.status == 200) {
          let params = {
            workid: this.workid,
          };
          transfer(params).then((res) => {
            if (res.status == 200) {
              loading.close();
              clearTimeout(this.overloading)
              this.$message.success("抛转成功！");
              this.oaz.oaz03 = res.data.oaz03;
              this.oaz.oaz06 = res.data.oaz06;
            } else {
              loading.close();
              clearTimeout(this.overloading)
              this.$message.error("抛转失败:" + res.error.message);
            }
          });
        } else {
          loading.close();
          clearTimeout(this.overloading)
          this.$message.error("抛转失败:" + res.error.message);
        }
      });
    },
    // 数据选择
    selectDialog(type,rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "SQR":
          let filter_SQR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SQR;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "XM":
          let filter_XM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_XM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pjas";
          this.dataSelect.headList = this.tableHead.head_XM;
          this.dataSelect.dialogTitle = "项目";
          break;
        case "WBS":
          let filter_WBS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_WBS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pjbs";
          this.dataSelect.headList = this.tableHead.head_WBS;
          this.dataSelect.dialogTitle = "WBS列表";
          break;
        case "CCSQD":
          let filter_CCSQD = [{ label: "", model_key_search: "keyword" },{ label: "tplid", model_key_search: "tplid", disabled:true , value:this.filter.FILTER_CCSQD, hide:true }];
          this.dataSelect.filter = filter_CCSQD;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "oa/workflows";
          this.dataSelect.headList = this.tableHead.head_CCSQD;
          this.dataSelect.dialogTitle = "出差申请单列表";
          break;
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
          case "SQR":
            this.tableData.oaa04 = val[0].gen01;
            this.tableData.oaa04_show = val[0].gen02;
            this.tableData.oaa04_gen04 = val[0].gen04;
            break;
          case "XM":
            this.tableData.oaa14 = val[0].pja01;
            this.tableData.oaa14_show = val[0].pja02;
            break;
          case "WBS":
            this.tableData.oaa15 = val[0].pjb02;
            this.tableData.oaa15_show = val[0].pjb03;
            break;
          case "CCSQD":
            this.tableData.oaa17 = val[0].id;
            this.tableData.oaa17_show = val[0].title;
            break;
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
</style>
