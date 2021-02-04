<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary" class="save" @click="addNewFlow('add')"
          >保存</el-button
        >
        <el-button type="primary" class="next" @click="addNewFlow('next')"
          >下一步</el-button
        >
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
                <div class="titlebox required"><span>经办人</span></div>
                <div class="infobox editNot">
                  {{ showData.oaa03_show }}
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ showData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">所属部门</span>
                </div>
                <div class="infobox editNot last_row">
                  {{ showData.oaa04_gen04 }}
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div class="infobox selectbox longbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <!-- 合同信息 -->
              <div class="title_line">合同信息</div>
              <div class="form_line">
                <div class="titlebox ">
                  <span :class="form_must.includes('oaa16') ? 'redPot' : ''">合同编号</span>
                </div>
                <div class="infobox selectbox editNot">
                  {{ tableData.oaa16 }}
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa11') ? 'redPot' : ''">合同名称</span>
                </div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
                    placeholder="请输入合同名称"
                  />
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa12') ? 'redPot' : ''">合同金额</span>
                </div>
                <div class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa12"
                    placeholder="请输入合同金额"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa13') ? 'redPot' : ''">签约方</span>
                </div>
                <div class="infobox selectbox">
                  <el-radio-group
                    class="radioGroup"
                    style="margin-right: 15px"
                    v-model="tableData.oaa13"
                  >
                    <el-radio :label="1">供应商</el-radio>
                    <el-radio :label="2">客户</el-radio>
                  </el-radio-group>
                  
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa14') ? 'redPot' : ''">签约方名称</span>
                </div>
                <div class="infobox selectbox">
                  <div class="selector" style="background-position:99%;" @click="selectType()">
                    {{ showData.oaa14_show }}
                  </div>
                </div>
                <div class="titlebox required"></div>
                <div class="infobox selectbox last_row"></div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa15') ? 'redPot' : ''">合同类型</span>
                </div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa15"
                    class="select"
                    placeholder="请选择合同类型"
                  >
                    <el-option
                      v-for="(item,index) in fixedData.htList"
                      :key="index"
                      :label="item.name"
                      :value="item.number"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa17') ? 'redPot' : ''">合同开始日期</span>
                </div>
                <div class="infobox selectbox">
                  <el-date-picker
                    v-model="tableData.oaa17"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa18') ? 'redPot' : ''">合同结束日期</span>
                </div>
                <div class="infobox selectbox last_row">
                  <el-date-picker
                    v-model="tableData.oaa18"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must.includes('oaa19') ? 'redPot' : ''">合同文件</span>
                </div>
                <div class="infobox longbox selectbox" style="padding:10px 20px;">
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
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa21') ? 'redPot' : ''">说明</span>
                </div>
                <div
                  class="infobox longbox areabox"
                  style="width: 100%"
                >
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa21"
                    placeholder="请输入说明"
                    maxlength="255"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa20') ? 'redPot' : ''">备注</span>
                </div>
                <div class="longbox">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa20"
                    placeholder="请输入备注"
                    maxlength="255"
                    show-word-limit
                  >
                  </el-input>
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
          :on-success="handleSuccess_sec"
          :on-preview="handlePreview_sec"
          :on-remove="handleRemove_sec"
          :before-upload="beforeAvatarUpload_sec"
          :before-remove="beforeRemove_sec"
          multiple
          :on-exceed="handleExceed_sec"
          :file-list="fileList_sec"
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
// api
import { htList, mustItem, userInfo } from "@/api/basic";
import { addFlow, editFlow } from "@/api/process_new";
import {OpenLoading} from "@/utils/utils"

export default {
  components: { SelectData },
  data() {
    return {
      activeTab: "firTab",
      workid: "",
      workName: "合同审批", //流程名
      tableData: {
        oaa01: "",
        oaa02: "",
        oaa03: "",
        oaa04: "",
        oaa05: "",
        oaa06: "",
        oaa11: "",
        oaa12: "",
        oaa13: "",
        oaa14: "",
        oaa15: "",
        oaa16: "",
        oaa17: "",
        oaa18: "",
        oaa19: "",
        oaa20: "",
        oaa21: "",
      },
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //部门编号
        oaa03_show: "", //经办人
        oaa06_show: "", //部门
        oaa14_show:"",
      },
      form_must:[],
      // 表单数据
      fixedData: {
        // 币种列表
        htList: [],
      },
      file_HT:[],
      fileList: [],//合同文件
      fileList_sec: [],//附件文件
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8954,
      },
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
        head_XM: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        head_BM: [
          { name: "name", title: "部门名称" },
          { name: "id", title: "ID" }
        ],
        head_GYS: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        head_KH: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
      },
    };
  },
  created() {
    this.addParams.tplid = this.$route.query.tplid ? this.$route.query.tplid : 8954;
    this.initOAuserInfo()
    this.getHT();
    this.getMustItem()
  },
  methods: {
    initOAuserInfo() {
      let oauserinfo = JSON.parse(sessionStorage.getItem("oauserinfo"));
      this.tableData.oaa03 = oauserinfo.oauserid ? oauserinfo.oauserid : "";
      this.showData.oaa03_show = oauserinfo.oaname;
      this.tableData.oaa04 = oauserinfo.oauserid ? oauserinfo.oauserid : "";
      this.showData.oaa04_show = oauserinfo.oaname;
      if(oauserinfo.oauserid) {
        userInfo(oauserinfo.oauserid)
        .then(res => {
          if(res.status == 200){
            this.tableData.oaa05 = res.data.phone
            this.tableData.oaa06 = res.data.department_id
            this.showData.oaa06_show = res.data.department_show
            this.tableData.oaa04 = res.data.employee_code
            this.tableData.oaa04_show = res.data.employee_show
            this.showData.oaa04_gen01 = res.data.employee_code
            this.showData.oaa04_gen04 = res.data.department_show
          }else{
            this.$message.warning("用户信息获取失败！" + res.error.message);
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
          this.$message.warning("必填项获取失败！" + result.error.message);
        }
      })
    },
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取下拉列表信息************
    getHT() {
      htList().then((result) => {
        if (result.status == 200) {
          this.fixedData.htList = result.data;
        } else {
          this.$message.error("获取合同类型列表失败：" + result.error.message);
        }
      });
    },
    // *******************************************
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
      this.file_HT.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path,
      });
      let temp = []
      this.file_HT.forEach(item=>{
        temp.push(item.id)
      })
      this.tableData.oaa19 = temp.join(',')
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.file_HT.forEach((item, index) => {
        if (item.filename == file.name) {
          this.file_HT.splice(index, 1);
        }
      });
      let temp = []
      this.file_HT.forEach(item=>{
        temp.push(item.id)
      })
      this.tableData.oaa19 = temp.join(',')
    },
    handlePreview(file) {
      // console.log(file);
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
    // *******************************************
    // ****************附件上传*****************
    // 限制格式
    beforeAvatarUpload_sec(file) {
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
    handleSuccess_sec(response, file, fileList) {
      this.addParams.annexurlid.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path
      })
    },
    // 移除上传项
    handleRemove_sec(file, fileList) {
      this.addParams.annexurlid.forEach( (item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice( index, 1 )
        }
      })
    },
    handlePreview_sec(file) {
      console.log(file);
    },
    handleExceed_sec(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files_sec.length} 个文件，共选择了 ${files_sec.length + fileList_sec.length} 个文件`);
    },
    beforeRemove_sec(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
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
            if (type == "add") {
              this.$message.success("保存成功！");
            } else if (type == "next") {
              this.$router.push({
                path: "/apply",
                query: {
                  url_type: "contract",
                  workName: this.workName,
                  workid: this.workid,
                  workName: this.workName,
                  oaa01: this.tableData.oaa01,
                  oaa02: this.tableData.oaa02,
                },
              });
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
            if (type == "add") {
              this.$message.success("保存成功！");
            } else if (type == "next") {
              this.$router.push({
                path: "/apply",
                query: {
                  url_type: "contract",
                  workName: this.workName,
                  workid: this.workid,
                  workName: this.workName,
                  oaa01: this.tableData.oaa01,
                  oaa02: this.tableData.oaa02,
                },
              });
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
    selectDialog(type, rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "SQR":
          let filter_SQR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SQR;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "JBR":
          let filter_JBR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_JBR;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/users";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "经办人列表";
          break;
        case "BM":
          let filter_WBS = [{ label: "", model_key_search: "name" }];
          this.dataSelect.filter = filter_WBS;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/departments";
          this.dataSelect.headList = this.tableHead.head_BM;
          this.dataSelect.dialogTitle = "部门列表";
          break;
        case "GYS":
          let filter_GYS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_GYS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_GYS;
          this.dataSelect.dialogTitle = "供应商列表";
          break;
        case "KH":
          let filter_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KH;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_KH;
          this.dataSelect.dialogTitle = "客户列表";
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
          case "JBR":
            this.tableData.oaa03 = val[0].id;
            this.showData.oaa03_show = val[0].name;
            break;
          case "BM":
            this.tableData.oaa06 = val[0].id;
            this.showData.oaa06_show = val[0].name;
            break;
          case "GYS":
            this.tableData.oaa14 = val[0].pmc01;
            this.showData.oaa14_show = val[0].pmc03;
            break
          case "KH":
            this.tableData.oaa14 = val[0].occ01;
            this.showData.oaa14_show = val[0].occ02;
            break
          default:
            return;
            break;
        }
      }
    },
    // 签约方
    selectType(){
      let type = this.tableData.oaa13
      if(!type ){
        this.$message.warning('请先选择签约方类型！')
      }else{
        let selectType = type == 1 ? 'GYS' : 'KH'
        this.selectDialog(selectType)
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
.infobox {
  position: relative;
  .columLine {
    position: absolute;
    height: 40px;
    width: 1px;
    left: 278px;
    background: #cccccc;
  }
}
</style>
