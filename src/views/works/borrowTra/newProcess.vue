<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary" class="save" @click="addNewFlow()">保存</el-button>
        <el-button type="primary" class="next" @click="nextStep()">下一步</el-button>
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
                <div class="infobox middlebox editNot">
                  {{ tableData.oaa03 }}
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ showData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">员工编号</div>
                <div class="infobox editNot">
                  {{ showData.oaa04_gen01 }}
                </div>
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot last_row">
                  {{ showData.oaa04_gen04 }}
                </div>
              </div>
              <!-- 出差信息 -->
              <div class="title_line">出差信息</div>
              <div class="form_line">
                <div class="titlebox">预计开始时间</div>
                <div class="infobox middlebox datebox">
                  <el-date-picker
                    v-model="tableData.oaa31"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">预计结束时间</div>
                <div class="infobox middlebox datebox">
                  <el-date-picker
                    v-model="tableData.oaa32"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">实际开始时间</div>
                <div class="infobox middlebox datebox">
                  <el-date-picker
                    v-model="tableData.oaa33"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">实际结束时间</div>
                <div class="infobox middlebox datebox last_row">
                  <el-date-picker
                    v-model="tableData.oaa34"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">出差目的</div>
                <div class="infobox longbox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa30"
                    placeholder="请输入出差目的"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">出差地点</div>
                <div class="infobox longbox selectbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa35">
                    <el-radio :label="1">一般地区</el-radio>
                    <el-radio :label="2">特殊地区</el-radio>
                  </el-radio-group>
                  <div class="columLine"></div>
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa36"
                    placeholder="请输入出差地点"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">交通工具</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa37">
                    <el-radio :label="1">飞机</el-radio>
                    <el-radio :label="2">火车</el-radio>
                    <el-radio :label="3">汽车</el-radio>
                    <el-radio :label="4">其它</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">访问单位</div>
                <div class="infobox longbox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa38"
                    placeholder="请输入访问单位"
                  />
                </div>
              </div>
              <div class="form_line  last_line">
                <div class="titlebox">是否需要借款</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa39">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <!-- 借款信息 -->
              <div v-if="tableData.oaa39 == 1">
                <div class="title_line">借款信息</div>
                <div class="form_line">
                  <div class="titlebox">项目</div>
                  <div class="infobox middlebox selectbox">
                    <div class="selector" @click="selectDialog('XM')">
                    {{ showData.oaa14_show }}
                    </div>
                  </div>
                  <div class="titlebox">项目WBS</div>
                  <div class="infobox middlebox selectbox last_row">
                    <div class="selector" @click="selectDialog('WBS')">
                    {{ showData.oaa15_show }}
                    </div>
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">币种</div>
                  <div class="infobox selectbox">
                    <el-select
                      v-model="tableData.oaa06"
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
                  <div class="titlebox">借款金额</div>
                  <div class="infobox selectbox">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa07"
                      placeholder="请输入借款金额"
                      @input="getExchangeRate()"
                    />
                  </div>
                  <div class="titlebox">汇率</div>
                  <div class="infobox selectbox last_row">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa08"
                      placeholder="请输入汇率"
                      @input="getExchangeRate()"
                    />
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">收款人</div>
                  <div class="infobox selectbox">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa09"
                      placeholder="请输入收款人"
                    />
                  </div>
                  <div class="titlebox">账号</div>
                  <div class="infobox selectbox">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa10"
                      placeholder="请输入账号"
                    />
                  </div>
                  <div class="titlebox">开户行</div>
                  <div class="infobox selectbox last_row">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa11"
                      placeholder="请输入开户行"
                    />
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">支付方式</div>
                  <div class="infobox longbox selectbox disabledbox">
                    <el-select
                      v-model="tableData.oaa12"
                      class="select"
                      placeholder="请选择支付方式"
                      disabled
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
                <div class="form_line last_line">
                  <div class="titlebox">借款事由</div>
                  <div class="infobox selectbox longbox">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa13"
                      placeholder="请输入借款事由"
                    />
                  </div>
                </div>
              </div>
              <!-- 交际信息 -->
              <div class="title_line">交际信息</div>
              <div class="form_line">
                <div class="titlebox">支出项目</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa20"
                    placeholder="请输入支出项目"
                  />
                </div>
                <div class="titlebox">实施时间</div>
                <div class="infobox middlebox datebox last_row">
                  <el-date-picker
                    v-model="tableData.oaa21"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">我方参加部门</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa22"
                    placeholder="请输入我方参加部门"
                  />
                </div>
                <div class="titlebox">对方单位</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa23"
                    placeholder="请输入对方单位"
                  />
                </div>
                <div class="titlebox">我方参加人员</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa24"
                    placeholder="请输入我方参加人员"
                  />
                </div>
                <div class="titlebox">对方参加人员</div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa25"
                    placeholder="请输入对方参加人员"
                  />
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">付款预算金额</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa26"
                    placeholder="请输入付款预算金额"
                  />
                </div>
                <div class="titlebox">区分</div>
                <div class="infobox middlebox last_row">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa27">
                    <el-radio :label="1">交际费</el-radio>
                    <el-radio :label="2">会议费</el-radio>
                  </el-radio-group>
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
import { gensList, azisList, pmasList, pjasList, pjbsList  } from "@/api/basic";
import { addFlow,  } from "@/api/process_new";

export default {
  components: {SelectData},
  data() {
    return {
      activeTab: "firTab",
      workid: '',
      workName:"出差借款申请",//流程名
      showData:{
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //申请人部门
        oaa14_show: "", //项目
        oaa15_show:"",//项目WBS
      },
      tableData: {
        oaa01: '',
        oaa02: '',
        oaa03: '',
        oaa04: '',
        oaa05: '',
        oaa06: 'RMB',
        oaa07: '',
        oaa08: '1',
        oaa09: '',
        oaa10: '',
        oaa11: '',
        oaa12: 'TT',
        oaa13: '',
        oaa14: '',
        oaa15: '',
        oaa20: '',
        oaa21: '',
        oaa22: '',
        oaa23: '',
        oaa24: '',
        oaa25: '',
        oaa26: '',
        oaa27: '',
        oaa30: '',
        oaa31: '',
        oaa32: '',
        oaa33: '',
        oaa34: '',
        oaa35: '',
        oaa36: '',
        oaa38: '',
        oaa39: ''
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
      // 汇率数据
      exchange: '', //折合汇率
      exchange_Cap: '', //折合汇率大写
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      // 表单数据
      fixedData: {
        selectLoading: true,
        // 申请人列表
        genList: [],
        // 币种列表
        azisList: [],
        // 付款方式列表
        pmasList: [],
        // 项目列表
        pjasList: [],
        // WBS列表
        pjbsList: [],
      },
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8941
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
      },
    };
  },
  created() {
    this.addParams.tplid = this.$route.query.tplid
    this.getGens()
    this.getAzis()
    this.getPmas()
    this.getPjas()
    this.getPjbs()
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取下拉列表信息************
    getGens () {
      gensList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.genList = result.data;
        } else {
          this.$message.error("获取员工列表失败：" + result.error.message);
        }
      })
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
    getPjas () {
      pjasList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.pjasList = result.data;
        } else {
          this.$message.error("获取项目列表失败：" + result.error.message);
        }
      })
    },
    getPjbs () {
      pjbsList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.pjbsList = result.data;
        } else {
          this.$message.error("获取WBS列表失败：" + result.error.message);
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
      console.log(file);
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
    // 新增表单
    addNewFlow() {
      this.addParams.from_data = this.tableData
      addFlow(this.addParams)
      .then( result => {
        if (result.status == 200) {
          this.workid = result.data.workid
          this.tableData.oaa01 = result.data.oaa01
          this.tableData.oaa02 = result.data.oaa02
          this.$message.success("保存成功！");
        } else {
          this.$message.error("保存失败：" + result.error.message);
        }
      })
    },
    // 下一步
    nextStep() {
      this.tableData = {...this.tableData,...this.oaz}
      this.addParams.from_data = this.tableData
      addFlow(this.addParams)
      .then( result => {
        if (result.status == 200) {
          this.workid = result.data.workid
          this.tableData.oaa01 = result.data.oaa01
          this.tableData.oaa02 = result.data.oaa02
          // this.$message.success("保存成功！");
        } else {
          this.$message.error("保存失败：" + result.error.message);
        }
      })
      .then(() => {
        this.$router.push(
          {
            path:'/apply',
            query: {
              url_type: 'borrowTra',
              workName:this.workName,
              workid: this.workid,
              workName: this.workName,
              oaa01: this.tableData.oaa01,
              oaa02: this.tableData.oaa02
            }
          }
        )
      });
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
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "XM":
          let filter_XM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_XM;
          this.dataSelect.searchApi = "meta/pjas";
          this.dataSelect.headList = this.tableHead.head_XM;
          this.dataSelect.dialogTitle = "项目";
          break;
        case "WBS":
          let filter_WBS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_WBS;
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
          case "XM":
            this.tableData.oaa14 = val[0].pja01;
            this.showData.oaa14_show = val[0].pja02;
            break;
          case "WBS":
            this.tableData.oaa15 = val[0].pjb02;
            this.showData.oaa15_show = val[0].pjb03;
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
