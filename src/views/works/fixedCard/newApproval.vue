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
                <div class="infobox middlebox editNot">{{ tableData.oaa03 }}</div>
                <div class="titlebox">联系电话</div>
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
                <div class="titlebox">申请人</div>
                <div v-if="!table_able.includes('oaa04')" class="infobox selectbox editNot">
                  {{ tableData.oaa04_show }}
                </div>
                <div v-if="table_able.includes('oaa04')" class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ tableData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">员工编号</div>
                <div class="infobox editNot">{{ tableData.oaa04 }}</div>
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot last_row">{{ tableData.oaa04_gen04 }}</div>
              </div>
              <!-- 卡片信息 -->
              <div class="title_line">卡片信息</div>
              <div class="form_line">
                <div class="titlebox">财产编号</div>
                <div v-if="!table_able.includes('oaa11')" class="infobox editNot">
                  {{tableData.oaa11}}
                </div>
                <div v-if="table_able.includes('oaa11')" class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
                    placeholder="请输入财产编号"
                  />
                </div>
                <div class="titlebox">资产主类别</div>
                <div v-if="!table_able.includes('oaa12')" class="infobox editNot">
                  {{tableData.oaa12_show}}
                </div>
                <div v-if="table_able.includes('oaa12')" class="infobox selectbox">
                  <div class="selector" @click="selectDialog('ZCZLB')">{{tableData.oaa12_show}}</div>
                </div>
                <div class="titlebox">资产次类别</div>
                <div v-if="!table_able.includes('oaa13')" class="infobox last_row editNot">
                  {{tableData.oaa13_show}}
                </div>
                <div v-if="table_able.includes('oaa13')" class="infobox selectbox last_row">
                  <div class="selector" @click="selectDialog('ZCCLB')">{{tableData.oaa13_show}}</div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">资产中文名称</div>
                <div v-if="!table_able.includes('oaa14')" class="infobox editNot">
                  {{tableData.oaa14}}
                </div>
                <div v-if="table_able.includes('oaa14')" class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa14"
                    placeholder="请输入资产中文名称"
                  />
                </div>
                <div class="titlebox">资产英文名称</div>
                <div v-if="!table_able.includes('oaa15')" class="infobox editNot">
                  {{tableData.oaa15}}
                </div>
                <div v-if="table_able.includes('oaa15')" class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa15"
                    placeholder="请输入资产英文名称"
                  />
                </div>
                <div class="titlebox">规格型号</div>
                <div v-if="!table_able.includes('oaa16')" class="infobox last_row editNot">
                  {{tableData.oaa16}}
                </div>
                <div v-if="table_able.includes('oaa16')" class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa16"
                    placeholder="请输入规格型号"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">供应商编号</div>
                <div v-if="!table_able.includes('oaa17')" class="infobox editNot">
                  {{tableData.oaa17}}
                </div>
                <div v-if="table_able.includes('oaa17')" class="infobox selectbox">
                  <div class="selector" @click="selectDialog('GYS')">{{tableData.oaa17}}</div>
                </div>
                <div class="titlebox">本币单价</div>
                <div v-if="!table_able.includes('oaa18')" class="infobox editNot">
                  {{tableData.oaa18}}
                </div>
                <div v-if="table_able.includes('oaa18')" class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa18"
                    placeholder="请输入本币单价"
                  />
                </div>
                <div class="titlebox">本币成本</div>
                <div v-if="!table_able.includes('oaa19')" class="infobox last_row editNot">
                  {{tableData.oaa19}}
                </div>
                <div v-if="table_able.includes('oaa19')" class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa19"
                    placeholder="请输入本币成本"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox" :class="!table_able.includes('oaa19')?'disabledbox':''">
                  <el-select
                    v-model="tableData.oaa20"
                    class="select"
                    :disabled="!table_able.includes('oaa20')"
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
                <div class="titlebox">原币成本</div>
                <div v-if="!table_able.includes('oaa21')" class="infobox selectbox editNot">
                  {{tableData.oaa21}}
                </div>
                <div v-if="table_able.includes('oaa21')" class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa21"
                    placeholder="请输入原币成本"
                  />
                </div>
                <div class="titlebox">数量</div>
                <div v-if="!table_able.includes('oaa22')" class="infobox selectbox last_row editNot">
                  {{tableData.oaa22}}
                </div>
                <div v-if="table_able.includes('oaa22')" class="infobox selectbox disabledbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa22"
                    placeholder="请输入数量"
                    disabled
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">计量单位</div>
                <div v-if="!table_able.includes('oaa23')" class="infobox editNot">
                  {{tableData.oaa23_show}}
                </div>
                <div v-if="table_able.includes('oaa23')" class="infobox selectbox">
                  <div class="selector" @click="selectDialog('JLDW')">{{tableData.oaa23_show}}</div>
                </div>
                <div class="titlebox">保管人</div>
                <div v-if="!table_able.includes('oaa24')" class="infobox editNot">
                  {{tableData.oaa24}}
                </div>
                <div v-if="table_able.includes('oaa24')" class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa24"
                    placeholder="请输入保管人"
                  />
                </div>
                <div class="titlebox">保管部门</div>
                <div v-if="!table_able.includes('oaa25')" class="infobox last_row editNot">
                  {{tableData.oaa25_show}}
                </div>
                <div v-if="table_able.includes('oaa25')" class="infobox selectbox last_row">
                  <div class="selector" @click="selectDialog('BGBM')">{{tableData.oaa25_show}}</div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">存放位置</div>
                <div v-if="!table_able.includes('oaa26')" class="infobox editNot">
                  {{tableData.oaa26_show}}
                </div>
                <div class="infobox selectbox">
                  <div v-if="table_able.includes('oaa26')" class="selector" @click="selectDialog('WZ')">{{tableData.oaa26_show}}</div>
                </div>
                <div class="titlebox">分摊方式</div>
                <div class="infobox selectbox" :class="!table_able.includes('oaa27')?'disabledbox':''">
                  <el-select
                    v-model="tableData.oaa27"
                    class="select"
                    :disabled="!table_able.includes('oaa27')"
                  >
                    <el-option
                      v-for="item in fixedData.shareList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">分摊部门</div>
                <div v-if="!table_able.includes('oaa28')" class="infobox last_row editNot">
                  {{tableData.oaa28_show}}
                </div>
                <div v-if="table_able.includes('oaa28')" class="infobox selectbox last_row">
                  <div class="selector" @click="selectDialog('FTBM')">{{tableData.oaa28_show}}</div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">取得日期</div>
                <div class="infobox datebox">
                  <el-date-picker
                    v-model="tableData.oaa29"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="!table_able.includes('oaa29')"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">项目编号</div>
                <div v-if="!table_able.includes('oaa30')" class="infobox editNot">
                  {{tableData.oaa30}}
                </div>
                <div v-if="table_able.includes('oaa30')" class="infobox selectbox">
                  <div class="selector" @click="selectDialog('XM')">{{tableData.oaa30}}</div>
                </div>
                <div class="titlebox">WBS编号</div>
                <div v-if="!table_able.includes('oaa31')" class="infobox last_row editNot">
                  {{tableData.oaa31}}
                </div>
                <div v-if="table_able.includes('oaa31')" class="infobox selectbox last_row">
                  <div class="selector" @click="selectDialog('WBS')">{{tableData.oaa31}}</div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">入账日期</div>
                <div class="infobox middlebox datebox">
                  <el-date-picker
                    v-model="tableData.oaa32"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :disabled="!table_able.includes('oaa32')"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">耐用月数</div>
                <div v-if="!table_able.includes('oaa33')" class="infobox middlebox last_row editNot">
                  {{tableData.oaa33}}
                </div>
                <div v-if="table_able.includes('oaa33')" class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa33"
                    placeholder="请输入耐用月数"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">构建编号</div>
                <div v-if="!table_able.includes('oaa34')" class="infobox longbox last_row editNot">
                  {{tableData.oaa34_show}}
                </div>
                <div v-if="table_able.includes('oaa34')" class="infobox longbox selectbox last_row">
                  <div class="selector" style="padding-right:0;background-position:right center;" @click="selectDialog('SQD')">
                    {{ tableData.oaa34_show }}
                  </div>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">说明</div>
                <div class="infobox longbox areabox last_row">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa35"
                    maxlength="80"
                    show-word-limit
                    :disabled="!table_able.includes('oaa35')"
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
import { workflowsList, editFlow  } from "@/api/process_new";
import { azisList,  } from "@/api/basic";

export default {
  components: {SelectData},
  data() {
    return {
      activeTab: "firTab",
      workid: '',
      workName:"固定资产卡片",//流程名
      tableData: {},
      table_able: [],
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
      fileList_user: [],
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8947
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
        head_ZCZLB: [
          { name: "fab01", title: "资产主类别编号" },
          { name: "fab02", title: "资产主类别名称" },
        ],
        head_ZCCLB: [
          { name: "fac01", title: "资产次类别编号" },
          { name: "fac02", title: "资产次类别名称" },
        ],
        head_GYS: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        head_JLDW: [
          { name: "gfe01", title: "计量单位编号" },
          { name: "gfe02", title: "计量单位名称" },
        ],
        head_BM: [
          { name: "gem01", title: "部门编号" },
          { name: "gem02", title: "部门名称" },
        ],
        head_WZ: [
          { name: "faf01", title: "位置编号" },
          { name: "faf02", title: "位置名称" },
        ],
        head_XM: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        head_WBS: [
          { name: "pjb01", title: "项目编号" },
          { name: "pjb02", title: "WBS编号" },
          { name: "pjb08", title: "WBS名称" },
          { name: "pja02", title: "项目名称" },
        ],
        head_SQD: [
          { name: "id", title: "申请单id" },
          { name: "title", title: "申请单名称" },
        ]
      },
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 3965
    this.getAzis()
    this.getworkflows()
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取流程信息************
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
          this.table_able = res.data.workclass_info.form_able
          this.workName = res.data.workclass_info.title
          this.workclass_perflow = res.data.workclass_perflow
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
        case "ZCZLB":
          let filter_ZCZLB = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_ZCZLB;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/fabs";
          this.dataSelect.headList = this.tableHead.head_ZCZLB;
          this.dataSelect.dialogTitle = "资产主类别列表";
        break;
        case "ZCCLB":
          let filter_ZCCLB = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_ZCCLB;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/facs";
          this.dataSelect.headList = this.tableHead.head_ZCCLB;
          this.dataSelect.dialogTitle = "资产次类别列表";
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
        case "JLDW":
          let filter_JLDW = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_JLDW;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gfes";
          this.dataSelect.headList = this.tableHead.head_JLDW;
          this.dataSelect.dialogTitle = "计量单位列表";
        break;
        case "BGBM":
          let filter_BGBM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_BGBM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gems";
          this.dataSelect.headList = this.tableHead.head_BM;
          this.dataSelect.dialogTitle = "保管部门列表";
        break;
        case "FTBM":
          let filter_FTBM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_FTBM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gems";
          this.dataSelect.headList = this.tableHead.head_BM;
          this.dataSelect.dialogTitle = "分摊部门列表";
        break;
        case "WZ":
          let filter_WZ = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_WZ;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/fafs";
          this.dataSelect.headList = this.tableHead.head_WZ;
          this.dataSelect.dialogTitle = "存放位置列表";
        break;
        case "XM":
          let filter_XM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_XM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pjas";
          this.dataSelect.headList = this.tableHead.head_XM;
          this.dataSelect.dialogTitle = "项目列表";
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
        case "SQD":
          let filter_SQD = [
            { label: "模板类型", model_key_search: "typeid" },
            { label: "流程模板id", model_key_search: "tplid" },
            { label: "流程流水号", model_key_search: "number" },
            { label: "流程名称", model_key_search: "title" },
            { label: "流程建立时间段（开始时间）", model_key_search: "startdate" },
            { label: "流程建立时间段（结束时间）", model_key_search: "enddate" },
            { label: "经办人", model_key_search: "uid" },
          ];
          this.dataSelect.filter = filter_SQD;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "oa/workflows";
          this.dataSelect.headList = this.tableHead.head_SQD;
          this.dataSelect.dialogTitle = "申请单列表";
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
          case "ZCZLB":
            this.tableData.oaa12 = val[0].fab01;
            this.tableData.oaa12_show = val[0].fab02;
          break;
          case "ZCCLB":
            this.tableData.oaa13 = val[0].fac01;
            this.tableData.oaa13_show = val[0].fac02;
          break;
          case "GYS":
            this.tableData.oaa17 = val[0].pmc01;
          break;
          case "JLDW":
            this.tableData.oaa23 = val[0].gfe01;
            this.tableData.oaa23_show = val[0].gfe02;
          break;
          case "BGBM":
            this.tableData.oaa25 = val[0].gem01;
            this.tableData.oaa25_show = val[0].gem02;
          break;
          case "FTBM":
            this.tableData.oaa28 = val[0].gem01;
            this.tableData.oaa28_show = val[0].gem02;
          break;
          case "WZ":
            this.tableData.oaa26 = val[0].faf01;
            this.tableData.oaa26_show = val[0].faf02;
          break;
          case "XM":
            this.tableData.oaa30 = val[0].pja01;
          break;
          case "WBS":
            this.tableData.oaa31 = val[0].pjb01;
          break;
          case "SQD":
            this.tableData.oaa34 = val[0].id;
            this.tableData.oaa34_show = val[0].title;
          break;
          default:
          return;
          break;
        }
      }
    },
    // ****************其他操作*******************
    // 下一步
    nextStep(url) {
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
    },
    // ******************************************


  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
</style>
