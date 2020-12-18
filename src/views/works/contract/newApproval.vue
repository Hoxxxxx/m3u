<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button
          v-for="(link, index) in more"
          :key="index"
          type="primary"
          class="saveBtn"
          @click="seeMore(link.url)"
          >{{ link.name }}</el-button
        >
        <el-button type="primary" class="save" @click="editNewFlow()"
          >保存</el-button
        >
        <el-button
          v-if="workclass_personnel.perid.flownum == 1"
          type="primary"
          class="next"
          @click="nextStep('/apply')"
          >下一步</el-button
        >
        <!-- <el-button class="normal" style="margin-left: 50px">委托</el-button> -->
        <!-- <el-button class="normal">挂起</el-button> -->
        <!-- <el-button class="normal">增加会签人</el-button> -->
        <!-- <el-button class="normal" style="margin-right: 70px">抛转</el-button> -->
        <el-button
          v-if="workclass_personnel.perid.flownum !== 1"
          type="primary"
          class="agree"
          @click="nextStep('/agree')"
          >同意</el-button
        >
        <el-button
          v-if="workclass_personnel.perid.flownum !== 1"
          type="primary"
          class="reject"
          @click="nextStep('/reject')"
          >拒绝</el-button
        >
        <el-button
          v-if="workclass_personnel.perid.flownum !== 1"
          type="primary"
          class="back"
          @click="nextStep('/back')"
          >退回</el-button
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
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa03') ? 'redPot' : ''">经办人</span>
                </div>
                <div
                  class="infobox middlebox editNot"
                  v-if="!table_able.includes('oaa03')"
                >
                  {{ tableData.oaa03_show }}
                </div>
                <div
                  class="infobox selectbox"
                  v-if="table_able.includes('oaa03')"
                >
                  <div class="selector" @click="selectDialog('JBR')">
                    {{ tableData.oaa03_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div
                  class="infobox selectbox editNot"
                  v-if="!table_able.includes('oaa04')"
                >
                  {{ tableData.oaa04_show }}
                </div>
                <div
                  class="infobox selectbox"
                  v-if="table_able.includes('oaa04')"
                >
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ tableData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa06') ? 'redPot' : ''">所属部门</span>
                </div>
                <div
                  class="infobox selectbox editNot last_row"
                  v-if="!table_able.includes('oaa06')"
                >
                  {{ tableData.oaa06_show }}
                </div>
                <div
                  class="infobox selectbox last_row"
                  v-if="table_able.includes('oaa06')"
                >
                  <div class="selector" @click="selectDialog('BM')">
                    {{ tableData.oaa06_show }}
                  </div>
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div
                  class="infobox selectbox longbox editNot"
                  v-if="!table_able.includes('oaa05')"
                >
                  {{ tableData.oaa05 }}
                </div>
                <div
                  class="infobox selectbox longbox last_row"
                  v-if="table_able.includes('oaa05')"
                >
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
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa16') ? 'redPot' : ''">合同编号</span>
                </div>
                <div class="infobox selectbox editNot">
                  {{ tableData.oaa16 }}
                </div>
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa11') ? 'redPot' : ''">合同名称</span>
                </div>
                <div
                  class="infobox selectbox editNot"
                  v-if="!table_able.includes('oaa11')"
                >
                  {{ tableData.oaa11 }}
                </div>
                <div
                  class="infobox selectbox"
                  v-if="table_able.includes('oaa11')"
                >
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
                    placeholder="请输入合同名称"
                  />
                </div>
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa12') ? 'redPot' : ''">合同金额</span>
                </div>
                <div
                  class="infobox selectbox last_row editNot"
                  v-if="!table_able.includes('oaa12')"
                >
                  {{ tableData.oaa12 }}
                </div>
                <div
                  class="infobox selectbox last_row"
                  v-if="table_able.includes('oaa12')"
                >
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa12"
                    placeholder="请输入合同金额"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa13') ? 'redPot' : ''">签约方</span>
                </div>
                <div class="infobox middlebox selectbox">
                  <el-radio-group
                    class="radioGroup"
                    style="margin-right: 120px"
                    v-model="tableData.oaa13"
                  >
                    <el-radio
                      :label="1"
                      :disabled="table_able.includes('oaa13') ? false : true"
                      >供应商</el-radio
                    >
                    <el-radio
                      :label="2"
                      :disabled="table_able.includes('oaa13') ? false : true"
                      >客户</el-radio
                    >
                  </el-radio-group>
                </div>
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa14') ? 'redPot' : ''">签约方名称</span>
                </div>
                <div class="infobox selectbox middlebox last_row">
                  <div
                    class=""
                    style="background-position: 99%"
                    v-if="!table_able.includes('oaa14')"
                  >
                    {{ tableData.oaa14_show }}
                  </div>
                  <div
                    class="selector"
                    style="background-position: 99%"
                    @click="selectType()"
                    v-if="table_able.includes('oaa14')"
                  >
                    {{ tableData.oaa14_show }}
                  </div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa15') ? 'redPot' : ''">合同类型</span>
                </div>
                <div
                  class="infobox selectbox"
                  v-if="!table_able.includes('oaa15')"
                >
                  {{ tableData.oaa15_show }}
                </div>
                <div
                  class="infobox selectbox"
                  v-if="table_able.includes('oaa15')"
                >
                  <el-select
                    v-model="tableData.oaa15"
                    class="select"
                    placeholder="请选择合同类型"
                  >
                    <el-option
                      v-for="item in fixedData.htList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa17') ? 'redPot' : ''">合同开始日期</span>
                </div>
                <div class="infobox selectbox">
                  <el-date-picker
                    v-model="tableData.oaa17"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    :disabled="table_able.includes('oaa17') ? false : true"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa18') ? 'redPot' : ''">合同结束日期</span>
                </div>
                <div class="infobox selectbox last_row">
                  <el-date-picker
                    v-model="tableData.oaa18"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    :disabled="table_able.includes('oaa18') ? false : true"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa19') ? 'redPot' : ''">合同文件</span>
                </div>
                <div
                  class="infobox longbox selectbox"
                  style="padding: 10px 20px"
                >
                  <!-- 已有文件部分 -->
                  <div class="saveList">
                    <div
                      class="saveItem"
                      v-for="(item, index) in fileList_down"
                      :key="index"
                    >
                      <i class="el-icon-document" style="margin-right: 7px"></i>
                      <a
                        style="cursor: pointer"
                        @click="download(item.id, item.name)"
                        ><span>{{ item.name }}</span></a
                      >
                      <div class="">
                        <!-- <el-button type="text">预览</el-button> -->
                        <el-button
                          type="text"
                          @click="download(item.id, item.name)"
                          >下载</el-button
                        >
                      </div>
                    </div>
                  </div>
                  <el-upload
                    v-if="table_able.includes('oaa19')"
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
                  <span :class="form_must_able.includes('oaa21') ? 'redPot' : ''">说明</span>
                </div>
                <div
                  class="infobox longbox infoShow"
                  v-if="!table_able.includes('oaa21')"
                >
                  {{ tableData.oaa21 }}
                </div>
                <div
                  class="infobox longbox areabox"
                  style="width: 100%"
                  v-if="table_able.includes('oaa21')"
                >
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa21"
                    placeholder="请输入说明"
                    maxlength="80"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa20') ? 'redPot' : ''">备注</span>
                </div>
                <div
                  class="infobox longbox infoShow"
                  v-if="!table_able.includes('oaa20')"
                >
                  {{ tableData.oaa20 }}
                </div>
                <div class="longbox" v-if="table_able.includes('oaa20')">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa20"
                    placeholder="请输入备注"
                    maxlength="80"
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
        <!-- 已有文件部分 -->
        <div class="saveList">
          <div
            class="saveItem"
            v-for="(item, index) in fileList_user"
            :key="index"
          >
            <i class="el-icon-document" style="margin-right: 7px"></i>
            <a style="cursor: pointer" @click="download(item.id, item.name)"
              ><span>{{ item.name }}</span></a
            >
            <div class="btnBox">
              <el-button type="text" @click="download(item.id, item.name)"
                >下载</el-button
              >
            </div>
          </div>
        </div>
        <!-- 上传部分 -->
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
          <el-timeline-item
            v-for="(item, index) in workclass_perflow"
            :key="index"
            :timestamp="item.date"
            placement="top"
          >
            <el-card>
              <p class="step">第{{ index + 1 }}步：{{ item.title }}</p>
              <p class="result">
                <template>
                  <p v-if="item.pertype == '99'">通过</p>
                  <p v-if="item.pertype == '0'" class="handling">审批中</p>
                  <p v-if="item.pertype == '2'">拒绝</p>
                  <p v-if="item.pertype == '3'">退回</p>
                  <p v-if="item.pertype == '5'">审批结束</p>
                </template>
              </p>
              <p class="admin">{{ item.name }} {{ item.date }}</p>
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
import {
  workflowsList,
  editFlow,
  transfer,
  addFlow,
} from "@/api/process_new.js";
import { htList } from "@/api/basic";
import { OpenLoading } from "@/utils/utils.js";

export default {
  components: { SelectData },
  data() {
    return {
      overloading: "", //加载定时器
      workid: "",
      workName: "借款申请",
      more: [], //查看更多
      activeTab: "firTab",
      form_must_able: [],
      tableData: {},
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //部门编号
        oaa03_show: "", //经办人
        oaa06_show: "", //部门
        oaa14_show: "",
      },
      table_able: [], //表格可编辑项
      fixedData: {
        // 币种列表
        htList: [],
      },
      fileList_user: [],
      fileList: [],
      file_HT: [],
      fileList_sec: [], //附件文件
      fileList_down: [], //合同文件下载
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8954,
      },
      workclass_personnel: { perid: { flownum: "" } }, //流程详情
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
        searchParams: {}, //搜索接口自带参数
        searchType: "", //搜索类型
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
      },
      // 弹出框表头数据
      tableHead: {
        // 申请人
        head_SQR: [
          { name: "id", title: "用户ID" },
          { name: "name", title: "用户名称" },
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
          { name: "id", title: "ID" },
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
    this.workid = this.$route.query.workid ? this.$route.query.workid : 4886;
    this.getworkflows();
    this.getHT();
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
    getworkflows() {
      const loading = OpenLoading(this, 1);
      const params = {
        workid: this.workid,
      };
      workflowsList(params).then((res) => {
        if (res.status == 200) {
          loading.close();
          clearTimeout(this.overloading);
          this.form_must_able = res.data.form_must_able
          this.tableData = res.data.workclass_info.from_data;
          this.workName = res.data.workclass_info.title;
          this.workclass_personnel = res.data.workclass_personnel;
          this.workclass_perflow = res.data.workclass_perflow;
          this.table_able = res.data.workclass_info.form_able;
          this.more = res.data.workclass_info.more;
          this.tableData.oaa15 = parseInt(this.tableData.oaa15);
          if (res.data.file !== null) {
            res.data.file.forEach((item) => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr,
              });
            });
          }
          if (res.data.workclass_info.from_data.oaa19_show.length > 0) {
            res.data.workclass_info.from_data.oaa19_show.forEach((item) => {
              this.fileList_down.push({
                id: item.id,
                name: item.name,
              });
            });
          }
        } else {
          loading.close();
          clearTimeout(this.overloading);
          this.$message.error("获取流程信息失败：" + res.error.message);
        }
      });
    },
    // *******************************************
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
      let temp = [];
      this.file_HT.forEach((item) => {
        temp.push(item.id);
      });
      this.tableData.oaa19 = temp.join(",");
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.file_HT.forEach((item, index) => {
        if (item.filename == file.name) {
          this.file_HT.splice(index, 1);
        }
      });
      let temp = [];
      this.file_HT.forEach((item) => {
        temp.push(item.id);
      });
      this.tableData.oaa19 = temp.join(",");
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
    handleSuccess_sec(response, file, fileList) {
      this.addParams.annexurlid.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path,
      });
    },
    // 移除上传项
    handleRemove_sec(file, fileList) {
      this.addParams.annexurlid.forEach((item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice(index, 1);
        }
      });
    },
    handlePreview_sec(file) {
      console.log(file);
    },
    handleExceed_sec(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files_sec.length
        } 个文件，共选择了 ${files_sec.length + fileList_sec.length} 个文件`
      );
    },
    beforeRemove_sec(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 下载文件流
    async download(id, filename) {
      const { data: res } = await this.axios({
        method: "get",
        url: `files/download/${id}`,
        responseType: "blob",
      });
      let fileName = filename;
      let fileType = {
        doc: "application/msword",
        docx:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx:
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        pdf: "application/pdf",
        txt: "text/plain",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        zip: "application/zip",
        rar: "application/x-rar",
      };
      let type = fileName.split(".")[1]; //获取文件后缀名
      let blob = new Blob([res], {
        type: fileType.type,
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    // ******************************************
    // ****************其他操作*******************
    // 保存
    editNewFlow() {
      this.tableData = { ...this.tableData, ...this.oaz };
      this.addParams.from_data = this.tableData;
      this.addParams.workid = this.workid;
      if (this.fileList_user.length > 0) {
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
        } else {
          this.$message.error("编辑失败：" + result.error.message);
        }
      });
    },
    // 下一步
    nextStep(url) {
      if (
        url == "/agree" &&
        this.oazShow == 1 &&
        this.workclass_personnel.perid.flownum == 3
      ) {
        this.nextFuns(url);
      } else {
        this.nextFuns(url);
      }
    },
    nextFuns(url) {
      this.tableData = { ...this.tableData, ...this.oaz };
      this.addParams.from_data = this.tableData;
      this.addParams.workid = this.workid;
      if (this.fileList_user.length > 0) {
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
              url_type: "contract",
              workid: this.workid,
              workName: this.workName,
              oaa01: this.tableData.oaa01,
              oaa02: this.tableData.oaa02,
            },
          });
        } else {
          this.$message.error("编辑失败：" + result.error.message);
        }
      });
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
          this.dataSelect.searchApi = "oa/users";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "申请人列表";
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
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
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
            this.tableData.oaa04 = val[0].id;
            this.showData.oaa04_show = val[0].name;
            break;
          case "JBR":
            this.tableData.oaa03 = val[0].id;
            this.showData.oaa03_show = val[0].name;
            break;
          case "BM":
            this.tableData.oaa06 = val[0].id;
            this.tableData.oaa06_show = val[0].name;
            break;
          case "GYS":
            this.tableData.oaa14 = val[0].pmc01;
            this.tableData.oaa14_show = val[0].pmc03;
            break;
          case "KH":
            this.tableData.oaa14 = val[0].occ01;
            this.tableData.oaa14_show = val[0].occ02;
            break;
          default:
            return;
            break;
        }
      }
    },
    // 签约方
    selectType() {
      let type = this.tableData.oaa13;
      if (!type) {
        this.$message.warning("请先选择签约方类型！");
      } else {
        let selectType = type == 1 ? "GYS" : "KH";
        this.selectDialog(selectType);
      }
    },
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
.saveList {
  color: #606266;
  .saveItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25px;
    line-height: 25px;
    div {
      margin-left: 10px;
    }
  }
}
</style>
