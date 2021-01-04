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
            <div class="title">{{workname}}</div>
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
                <div v-if="!table_able.includes('oaa05')" class="infobox selectbox middlebox last_row editNot">
                    {{ tableData.oaa05 }}
                </div>
                <div v-if="table_able.includes('oaa05')" class="infobox selectbox middlebox last_row">
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
                <div v-if="!table_able.includes('oaa04')" class="infobox selectbox editNot">
                  {{ tableData.oaa04_show }}
                </div>
                <div v-if="table_able.includes('oaa04')" class="infobox selectbox">
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
              <!-- 构建信息 -->
              <div class="title_line">构建信息</div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa11') ? 'redPot' : ''">购置类别</span>
                </div>
                <div class="infobox longbox selectbox" :class="!table_able.includes('oaa11')?'disabledbox':''">
                  <el-select
                    v-model="tableData.oaa11"
                    class="select"
                    placeholder="请选择购置类别"
                    :disabled="!table_able.includes('oaa11')"
                  >
                    <el-option
                      v-for="item in fixedData.buyList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa12') ? 'redPot' : ''">固定资产名称</span>
                </div>
                <div v-if="!table_able.includes('oaa12')" class="infobox middlebox editNot">
                  {{tableData.oaa12}}
                </div>
                <div v-if="table_able.includes('oaa12')" class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa12"
                    placeholder="请输入固定资产名称"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa13') ? 'redPot' : ''">规格型号</span>
                </div>
                <div v-if="!table_able.includes('oaa13')" class="infobox middlebox last_row editNot">
                  {{tableData.oaa13}}
                </div>
                <div v-if="table_able.includes('oaa13')" class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa13"
                    placeholder="请输入规格型号"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa14') ? 'redPot' : ''">计量单位</span>
                </div>
                <div v-if="!table_able.includes('oaa14')" class="infobox middlebox editNot">
                  {{tableData.oaa14}}
                </div>
                <div v-if="table_able.includes('oaa14')" class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa14"
                    placeholder="请输入计量单位"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa15') ? 'redPot' : ''">构建数量</span>
                </div>
                <div v-if="!table_able.includes('oaa15')" class="infobox middlebox last_row editNot">
                  {{tableData.oaa15}}
                </div>
                <div v-if="table_able.includes('oaa15')" class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa15"
                    placeholder="请输入构建数量"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa16') ? 'redPot' : ''">计划金额</span>
                </div>
                <div v-if="!table_able.includes('oaa16')" class="infobox middlebox editNot">
                  {{tableData.oaa16}}
                </div>
                <div v-if="table_able.includes('oaa16')" class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa16"
                    placeholder="请输入计划金额"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa17') ? 'redPot' : ''">生产厂家</span>
                </div>
                <div v-if="!table_able.includes('oaa17')" class="infobox middlebox last_row editNot">
                  {{tableData.oaa17}}
                </div>
                <div v-if="table_able.includes('oaa17')" class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa17"
                    placeholder="请输入生产厂家"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa18') ? 'redPot' : ''">构建时间</span>
                </div>
                <div class="infobox middlebox datebox">
                  <el-date-picker
                    v-model="tableData.oaa18"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    :disabled="!table_able.includes('oaa18')"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa19') ? 'redPot' : ''">使用部门</span>
                </div>
                <div v-if="!table_able.includes('oaa19')" class="infobox middlebox last_row editNot">
                  {{tableData.oaa19}}
                </div>
                <div v-if="table_able.includes('oaa19')" class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa19"
                    placeholder="请输入使用部门"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa20') ? 'redPot' : ''">计划内外</span>
                </div>
                <div v-if="!table_able.includes('oaa20')" class="infobox middlebox editNot">
                  {{tableData.oaa20}}
                </div>
                <div v-if="table_able.includes('oaa20')" class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa20"
                    placeholder="请输入计划内外"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa21') ? 'redPot' : ''">采购金额</span>
                </div>
                <div v-if="!table_able.includes('oaa21')" class="infobox middlebox last_row editNot">
                  {{tableData.oaa21}}
                </div>
                <div v-if="table_able.includes('oaa21')" class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa21"
                    placeholder="请输入采购金额"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa22') ? 'redPot' : ''">主要参数配置</span>
                </div>
                <div v-if="!table_able.includes('oaa22')" class="infobox longbox editNot">
                  {{tableData.oaa22}}
                </div>
                <div v-if="table_able.includes('oaa22')" class="infobox longbox areabox">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa22"
                    placeholder="请输入主要参数配置"
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa23') ? 'redPot' : ''">构建依据</span>
                </div>
                <div v-if="!table_able.includes('oaa23')" class="infobox longbox editNot">
                  {{tableData.oaa23}}
                </div>
                <div v-if="table_able.includes('oaa23')" class="infobox longbox areabox">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa23"
                    placeholder="请输入构建依据"
                  >
                  </el-input>
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
            <div class="title">{{workname}}</div>
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
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
  </div>
</template>

<script>
import SelectData from "@/components/selectData";
import { OpenLoading } from "@/utils/utils.js";
// api
import { workflowsList, } from "@/api/process_new.js"
import { editFlow  } from "@/api/process_new";

export default {
  components: {SelectData},
  data() {
    return {
      overloading: '', //加载定时器
      activeTab: "firTab",
      workid: '',
      workname:"固定资产申请",//流程名
      more:[],//查看更多
      tableData: {},
      table_able: [],
      form_must:[],//必填项
      // 表单数据
      fixedData: {
        // 购置列表
        buyList: [
          {
            id: 1,
            label: '全新购置'
          },
          {
            id: 2,
            label: '升级更换'
          }
        ],
      },
      fileList_user: [],
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8946
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
      },
      workclass_personnel: {perid: {flownum: ''}}, //流程详情
      workclass_perflow: [], //已流转流程进度
    };
  },
  created() {
    this.workid = this.$route.query.workid ? this.$route.query.workid : 3963
    this.getworkflows()
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
          this.table_able = res.data.workclass_info.form_able
          this.form_must = res.data.workclass_info.form_must_able
          this.workname = res.data.workclass_info.title
          this.workclass_personnel = res.data.workclass_personnel;
          this.workclass_perflow = res.data.workclass_perflow
          this.more = res.data.workclass_info.more
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
          clearTimeout(this.overloading)
          this.$message.error('获取流程信息失败：' + res.error.message);
        }
      })
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
          default:
            return;
            break;
        }
      }
    },
    // ****************其他操作*******************
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
      if(url == "/reject" || url == "/back"){
        this.$router.push({
          path: url,
          query: {
            url_type: 'fixedApp',
            workid: this.workid,
            workName: this.workName,
            oaa01: this.tableData.oaa01,
            oaa02: this.tableData.oaa02,
          },
        });
      }else{
        this.nextFuns(url);
      }
    },

    nextFuns(url) {
      const loading = OpenLoading(this, 1)
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
              url_type: 'fixedApp',
              workid: this.workid,
              workname: this.workname,
              oaa01: this.tableData.oaa01,
              oaa02: this.tableData.oaa02
            }
          })
        } else {
          this.$message.error("编辑失败：" + result.error.message);
        }
        loading.close();
        clearTimeout(this.overloading)
      })
    }
    // ******************************************


  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
</style>
