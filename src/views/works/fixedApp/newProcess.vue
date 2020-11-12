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
                <div class="infobox">{{tableData.oaa03}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">{{showData.oaa04_show}}</div>
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <!-- 构建信息 -->
              <div class="title_line">构建信息</div>
              <div class="form_line">
                <div class="titlebox">购置类别</div>
                <div class="infobox longbox selectbox">
                  <el-select
                    v-model="tableData.oaa11"
                    class="select"
                    placeholder="请选择购置类别"
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
                <div class="titlebox">固定资产名称</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa12"
                    placeholder="请输入固定资产名称"
                  />
                </div>
                <div class="titlebox">规格型号</div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa13"
                    placeholder="请输入规格型号"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">计量单位</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa14"
                    placeholder="请输入计量单位"
                  />
                </div>
                <div class="titlebox">构建数量</div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa15"
                    placeholder="请输入构建数量"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">计划金额</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa16"
                    placeholder="请输入计划金额"
                  />
                </div>
                <div class="titlebox">生产厂家</div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa17"
                    placeholder="请输入生产厂家"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">构建时间</div>
                <div class="infobox middlebox datebox">
                  <el-date-picker
                    v-model="tableData.oaa18"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">使用部门</div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa19"
                    placeholder="请输入使用部门"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">计划内外</div>
                <div class="infobox middlebox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa20"
                    placeholder="请输入计划内外"
                  />
                </div>
                <div class="titlebox">采购金额</div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa21"
                    placeholder="请输入采购金额"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">主要参数配置</div>
                <div class="infobox longbox areabox">
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
                <div class="titlebox">构建依据</div>
                <div class="infobox longbox areabox">
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
import { gensList,  } from "@/api/basic";
import { addFlow,  } from "@/api/process_new";

export default {
  components: {SelectData},
  data() {
    return {
      activeTab: "firTab",
      workid: '',
      workName:"固定资产申请",//流程名
      tableData: {
        oaa01: '',
        oaa02: '',
        oaa03: '',
        oaa04: '',
        oaa05: '',
        oaa11: '',
        oaa12: '',
        oaa13: '',
        oaa14: '',
        oaa15: '',
        oaa16: '',
        oaa17: '',
        oaa18: '',
        oaa19: '',
        oaa20: '',
        oaa21: '',
        oaa22: '',
        oaa23: '',
      },
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
      },
      // 表单数据
      fixedData: {
        selectLoading: true,
        // 申请人列表
        genList: [],
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
        ],
      },
    };
  },
  created() {
    // this.addParams.tplid = this.$route.query.tplid
    this.getGens()
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
          case "CCSQD":
            this.tableData.oaa17 = val[0].id;
            this.showData.oaa17_show = val[0].title;
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
