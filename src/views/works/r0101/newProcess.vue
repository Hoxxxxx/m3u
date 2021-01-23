<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
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
            <div class="title">{{workName}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
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
              <!-- 预付信息 -->
              <div class="title_line">预付信息</div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa11') ? 'redPot' : ''">预付厂商</span>
                </div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('YFCS')">{{tableData.oaa11}}</div>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa11') ? 'redPot' : ''">厂商简称</span>
                </div>
                <div class="infobox disabledbox">{{showData.oaa11_show}}</div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa16') ? 'redPot' : ''">支付方式</span>
                </div>
                <div class="infobox last_row selectbox">
                  <el-select
                    v-model="tableData.oaa16"
                    class="select"
                    placeholder="请选择支付方式"
                  >
                    <el-option
                      v-for="(item, index) in fixedData.pmasList"
                      :key="index"
                      :label="item.pma02"
                      :value="item.pma01"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa13') ? 'redPot' : ''">币种</span>
                </div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa13"
                    class="select"
                    placeholder="请选择币种"
                  >
                    <el-option
                      v-for="item in fixedData.azisList"
                      :key="item.azi01"
                      :label="item.azi02"
                      :value="item.azi01"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa14') ? 'redPot' : ''">汇率</span>
                </div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa14"
                    placeholder="请输入汇率"
                    @input="getExchangeRate()"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa12') ? 'redPot' : ''">预付金额</span>
                </div>
                <div class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa12"
                    placeholder="请输入预付金额"
                    @input="getExchangeRate()"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">折合汇率金额</div>
                <div class="infobox middlebox disabledbox">{{exchange}}</div>
                <div class="titlebox">折合汇率金额大写</div>
                <div class="infobox middlebox disabledbox last_row">{{exchange_Cap}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa27') ? 'redPot' : ''">项目</span>
                </div>
                <div class="infobox middlebox selectbox">
                  <div class="selector" @click="selectDialog('XM')">
                  {{ showData.oaa27_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa28') ? 'redPot' : ''">项目WBS</span>
                </div>
                <div class="infobox middlebox selectbox last_row">
                  <div class="selector" @click="selectDialog('WBS')">
                  {{ showData.oaa28_show }}
                  </div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa18') ? 'redPot' : ''">说明</span>
                </div>
                <div class="infobox areabox longbox" style="width: 100%">
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
                  <span :class="form_must.includes('oaa21') ? 'redPot' : ''">收款人</span>
                </div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa21"
                    placeholder="请输入收款人"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa22') ? 'redPot' : ''">开户行</span>
                </div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa22"
                    placeholder="请输入开户行"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa23') ? 'redPot' : ''">收款账号</span>
                </div>
                <div class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa23"
                    placeholder="请输入收款账号"
                  />
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa24') ? 'redPot' : ''">支票号</span>
                </div>
                <div class="infobox last_row longbox selectbox" style="width: 100%">
                  <input
                    class="abstracInput"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="tableData.oaa24"
                    placeholder="请输入支票号"
                  />
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
                <p class="admin">分公司(2)系统管理员	2020-11-02 13:37:42</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <p class="step">第二步：部门主管审批 (主办：部门主管)</p>
                <p class="result handling">流程办理中</p>
                <p class="admin">分公司(2)系统管理员	2020-11-02 13:37:42</p>
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
import { azisList, pmasList, mustItem, userInfo  } from "@/api/basic";
import { addFlow, editFlow, } from "@/api/process_new";
import {OpenLoading} from "@/utils/utils"

export default {
  components: {SelectData},
  data() {
    return {
      activeTab: "firTab",
      workid: '',
      workName:"预付款申请单",//流程名
      tableData: {
        oaa01: '',
        oaa02: '',
        oaa03: '',
        oaa04: '',
        oaa05: '',
        oaa11: '',
        oaa12: '0',
        oaa13: 'RMB',
        oaa14: '1',
        oaa16: 'TT',
        oaa18: '',
        oaa99:"",//备注
        oaa21: '',
        oaa22: '',
        oaa23: '',
        oaa24: '',
        oaa27: '',
        oaa28: '',
      },
      form_must:[],
      //财务信息
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: '', //记账日期
        oaz04: 9000, //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //部门编号
        oaa11_show: "", //厂商简称
        oaa27_show: "", //项目名
        oaa28_show: "", //WBS名
      },
      // 汇率数据
      exchange: '', //折合汇率
      exchange_Cap: '', //折合汇率大写
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      // 表单数据
      fixedData: {
        // 币种列表
        azisList: [],
        // 付款方式列表
        pmasList: [],
      },
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8951
      },
      //数据选择弹出框
      dataSelect: {
        editType:"entry",
        selectLoading:false,
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
        head_YFCS: [
          { name: "pmc01", title: "厂商编号" },
          // { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          // { name: "pmc04", title: "付款厂商编号" },
          // { name: "pmc30", title: "厂商性质" },
          // { name: "pmc47", title: "税别" },
          { name: "pmc56", title: "银行账号" },
          { name: "pmcud01", title: "开户银行" },
          { name: "pmcud04", title: "账户名称" },
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
      },
    };
  },
  created() {
    this.addParams.tplid = this.$route.query.tplid ? this.$route.query.tplid : 8951
    this.initOAuserInfo()
    this.getAzis()
    this.getPmas()
    this.getMustItem()
  },
  methods: {
    initOAuserInfo() {
      let oauserinfo = JSON.parse(sessionStorage.getItem('oauserinfo'))
      this.tableData.oaa03 = oauserinfo.oauserid ? oauserinfo.oauserid : ''
      this.tableData.oaa03_show = oauserinfo.oaname
      if(oauserinfo.oauserid) {
        userInfo(oauserinfo.oauserid)
        .then(res => {
          if(res.status == 200){
            this.tableData.oaa05 = res.data.phone
          }else{
            this.$message.warning("用户信息获取失败！" + result.error.message);
          }
        })
      }
    },
    getMustItem(){
      let params={
        tplid:this.addParams.tplid
      }
      mustItem(params).then(res=>{
        if(res.status == 200){
          this.form_must = res.data.form_able
        }else{
          console.log('必填项获取失败！')
        }
      })
    },
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取下拉列表信息************
    // 支付方式列表
    getPmas() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.pmasList = res.data;
        } else {
          this.$message.error("获取支付方式列表失败：" + result.error.message);
        }
      });
    },
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
    // *******************************************
    // ****************附件上传*****************
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
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // *******************************************
    // ****************其他操作*******************
    // 计算折合汇率
    getExchangeRate() {
      this.exchange = Number(this.tableData.oaa14) * Number(this.tableData.oaa12)
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
    // 新增（暂存）表单
    addNewFlow(type) {
      this.tableData = {...this.tableData,...this.oaz}
      this.addParams.from_data = this.tableData
      const loading = OpenLoading(this, 1)
      if (this.workid == '') {
        addFlow(this.addParams)
        .then( result => {
          if (result.status == 200) {
            this.workid = result.data.workid
            this.tableData.oaa01 = result.data.oaa01
            this.tableData.oaa02 = result.data.oaa02
            if (type == 'add') {
              this.$message.success("保存成功！");
            } else if (type == 'next') {
              this.$router.push(
                {
                  path:'/apply',
                  query: {
                    url_type: 'r0101',
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
        })
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
                    url_type: 'r0101',
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
    // ******************************************
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
        case "YFCS":
          let filter_YFCS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YFCS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_YFCS;
          this.dataSelect.dialogTitle = "厂商列表";
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
          case "YFCS":
          this.tableData.oaa11 = val[0].pmc01;
          this.showData.oaa11_show = val[0].pmc03;
          this.tableData.oaa21 = val[0].pmc03;
          this.tableData.oaa22 = val[0].pmcud01;
          this.tableData.oaa23 = val[0].pmc56;
          break;
          case "XM":
            this.tableData.oaa27 = val[0].pja01;
            this.showData.oaa27_show = val[0].pja02;
          break;
          case "WBS":
            this.tableData.oaa28 = val[0].pjb02;
            this.showData.oaa28_show = val[0].pjb03;
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
.infobox{
  position: relative;
  .columLine{
    position: absolute;
    height: 40px;
    width: 1px;
    left: 230px;
    background: #CCCCCC;
  }
}

</style>
