<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
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
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox ">
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
                    {{ tableData.oaa04_show }}
                </div>
                <div class="titlebox">员工编号</div>
                <div class="infobox ">
                  {{ tableData.oaa04_gen01 }}
                </div>
                <div class="titlebox">所属部门</div>
                <div class="infobox  last_row">
                  {{ tableData.oaa04_gen04 }}
                </div>
              </div>
              <!-- 付款信息 -->
              <div class="title_line">付款信息</div>
              <div class="form_line">
                <div class="titlebox">付款申请单</div>
                <div class="infobox longbox selectbox">
                    {{ tableData.oaa10_show }}
                </div>
              </div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">付款编号</div>
                <div class="infobox ">
                  {{ tableData.oaa10_oaa01 }}
                </div>
                <div class="titlebox">预付厂商</div>
                <div class="infobox ">
                  {{ tableData.oaa10_oaa11 }}
                </div>
                <div class="titlebox">厂商简称</div>
                <div class="infobox  last_row">
                  {{ tableData.oaa10_oaa11_show }}
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox  selectbox">
                  {{tableData.oaa10_oaa13}}
                </div>
                <div class="titlebox">汇率</div>
                <div class="infobox  selectbox">
                  {{tableData.oaa10_oaa14}}
                </div>
                <div class="titlebox">发票金额</div>
                <div class="infobox last_row  last_row">
                  {{ tableData.oaa10_oaa17 }}
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">折合汇率金额</div>
                <div class="infobox ">
                  {{ oaa10_ZHHLJE }}
                </div>
                <div class="titlebox">折合汇率金额大写</div>
                <div class="infobox ">
                  {{ oaa10_ZHHLJEDX }}
                </div>
                <div class="titlebox">本次支付金额</div>
                <div class="infobox selectbox last_row">
                  {{tableData.oaa09}}
                </div>
              </div>
              <!-- 5 -->
              <div class="form_line last_line">
                <div class="titlebox">说明</div>
                <div
                  class="infobox last_row longbox "
                  style="width: 100%"
                >
                  {{tableData.oaa18}}
                </div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">收款方式</div>
                <div class="infobox selectbox">
                  {{tableData.oaa16_show}}
                </div>
                <div class="titlebox">收款人</div>
                <div class="infobox  selectbox">
                  {{ tableData.oaa21 }}
                </div>
                <div class="titlebox">开户行</div>
                <div class="infobox selectbox  last_row">
                  {{ tableData.oaa22 }}
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">收款账号</div>
                <div class="infobox selectbox  middlebox">
                  {{ tableData.oaa23 }}
                </div>
                <div class="titlebox">支票号</div>
                <div class="infobox middlebox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa24"
                    disabled
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
                >
                  <el-table-column
                    prop="oaf01_show"
                    label="付款方式"
                    min-width="180px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf02"
                    label="银行编号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf03"
                    label="科目编号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf03_show"
                    label="科目名称"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf04"
                    label="异动码"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf05_show"
                    label="币种"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf06"
                    label="汇率"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf07"
                    label="本次支付金额（原币）"
                    min-width="200px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf07"
                    label="本次支付金额（本币）"
                    min-width="200px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <!-- 冲销信息 -->
              <div class="title_line">
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
                >
                  <el-table-column
                    prop="oae01"
                    label="账款编号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oae03"
                    label="账款未付金额（原币）"
                    min-width="110px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oae04"
                    label="账款未付金额（本币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oae02"
                    label="本次支付金额（原币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oae05"
                    label="本次支付金额（本币）"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <!-- 财务信息 -->
              <div v-if="oazShow == 1">
                <div class="title_line">
                  财务信息
                </div>
                <div class="form_line">
                  <div class="titlebox">银行</div>
                  <div class="infobox selectbox editNot">
                    <div class="" >
                      {{ tableData.oaz01 }}
                    </div>
                  </div>
                  <div class="titlebox">异动码</div>
                  <div class="infobox selectbox editNot">
                    <div class="" >
                      {{ tableData.oaz02 }}
                    </div>
                  </div>
                  <div class="titlebox">记账日期</div>
                  <div class="infobox middlebox datebox last_row">
                    <el-date-picker
                      v-model="tableData.oaz03"
                      type="date"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      disabled
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">账款类型</div>
                  <div class="infobox selectbox editNot">
                    <div class="editNot" >
                      {{ tableData.oaz04 }}
                    </div>
                  </div>
                  <div class="titlebox">凭证编号</div>
                  <div class="infobox selectbox editNot">
                    {{ tableData.oaz06 }}
                  </div>
                  <div class="titlebox">支付方式</div>
                  <div class="infobox middlebox selectbox last_row editNot">
                    {{ tableData.oaz05 }}
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
            <div class="title">{{workname}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
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
          <div class="saveItem" v-for="(item, index) in fileList_user" :key="index">
            <i class="el-icon-document" style="margin-right: 7px"></i>
            <span>{{ item.name }}</span>
            <div class="btnBox">
              <!-- <el-button type="text">预览</el-button> -->
              <el-button type="text" @click="download(item.id, item.name)">下载</el-button>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
import { workflowsList, } from "@/api/process_new.js"
import { number_chinese, OpenLoading } from "@/utils/utils.js";

export default {
  data() {
    return {
      overloading: '', //加载定时器
      workid: '',
      workname: '付款冲账申请单',
      activeTab: "firTab",
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        // 付款信息
        oaa10:"",//付款申请单
        oaa18:"",//说明
        // 收款信息
        oaa16:"",//收款方式
        oaa21:"",//收款人
        oaa22:"",//开户行
        oaa23:"",//收款账号
        oaa24:"",//支票号
        oaf:[],//银行信息
        oae:[],//冲销信息
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      showData: {
        oaa04_show: "", //申请人
        expenseMoneyF: "", //报销金额大写
        oaa10_show:"",//付款申请单
      },
      fileList_user: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8936
      },
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4390
    this.getworkflows()
  },
  computed: {
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
  methods: {
    handleClick() {
      // console.log(this.activeTab);
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
          this.workname = res.data.workclass_info.title
          this.workclass_perflow = res.data.workclass_perflow
          this.oazShow = res.data.workclass_flow.erp_turn
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
          this.$message.error('获取流程信息失败：', res.error.message);
        }
      })
    },
    // *******************************************
    // ***************附件上传******************
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.addParams.annexurlid.push({
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


  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
.summry {
  display: flex;
  flex-direction: row;
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
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        flex: 1 1 auto;
        line-height: 40px;
        text-align: center;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
