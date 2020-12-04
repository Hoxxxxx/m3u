<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" @click="goPrint">打印</el-button>
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
                  {{ tableData.oaa03_show }}
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row">
                  {{tableData.oaa05}}
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
                <div class="infobox ">
                  {{ tableData.oaa04_gen04 }}
                </div>
              </div>
              <!-- 发货单 -->
              <div class="title_line">发货单信息
              </div>
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
                    label="发货单号"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf02"
                    label="客户名称"
                    min-width="200px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf03"
                    label="发货单日期"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf04"
                    label="未开票金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf05"
                    label="本次开票金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
              </el-table>
              <div class="form_line">
                <div class="titlebox">备注</div>
                <div class="infobox longbox" style="width: 100%">{{tableData.oaa99}}</div>
              </div>
              <!-- <div class="title_line">发货单</div>
              <div class="form_line">
                <div class="titlebox">选择发货单</div>
                <div class="infobox selectbox longbox">
                    {{ tableData.oaa16_show }}
                </div>
              </div> -->
              <!-- 开票信息 -->
              <div>
                <div class="title_line">开票信息</div>
                <div class="form_line">
                  <div class="titlebox">名称</div>
                  <div class="infobox selectbox">
                    {{tableData.oaa21}}
                  </div>
                  <div class="titlebox">纳税人识别号</div>
                  <div class="infobox selectbox">
                    {{tableData.oaa22}}
                  </div>
                  <div class="titlebox">地址</div>
                  <div class="infobox selectbox last_row">
                    {{tableData.oaa23}}
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">银行账号</div>
                  <div class="infobox selectbox">
                    {{tableData.oaa24}}
                  </div>
                  <div class="titlebox">开户行</div>
                  <div class="infobox selectbox">
                    {{tableData.oaa25}}
                  </div>
                  <div class="titlebox">电话</div>
                  <div class="infobox selectbox last_row">
                    {{tableData.oaa26}}
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">开票种类</div>
                  <div class="infobox longbox selectbox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa27"
                    >
                      <el-radio :label="1" disabled>增值税发票</el-radio>
                      <el-radio :label="2" disabled>普通发票</el-radio>
                      <el-radio :label="3" disabled>服务发票</el-radio>
                      <el-radio :label="4" disabled>资金往来发票</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">开票金额</div>
                  <div
                    class="infobox last_row longbox selectbox"
                    style="width: 100%"
                  >
                    {{tableData.oaa28}}
                  </div>
                </div>
                <div class="title_line">发票明细</div>
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
                    label="序号"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac02"
                    label="商品名称"
                    min-width="200px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac03"
                    label="规格"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac04"
                    label="数量"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac05"
                    label="含税单价"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac06"
                    label="金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
                <div class="form_line">
                  <div class="titlebox">货款回收情况</div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa31"
                    >
                      <el-radio :label="1" disabled>货款已收</el-radio>
                      <el-radio :label="2" disabled>尚未回款</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="titlebox">回款日期</div>
                  <div
                    class="infobox last_row middlebox selectbox disabledbox"
                    style="width: 100%"
                  >
                    <el-date-picker
                      v-model="tableData.oaa32"
                      style="width: 100%"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      disabled
                      placeholder=""
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">回款方式</div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa33"
                    >
                      <el-radio :label="1" disabled>现金</el-radio>
                      <el-radio :label="2" disabled>转账支票</el-radio>
                      <el-radio :label="3" disabled>电汇</el-radio>
                      <el-radio :label="4" disabled>汇票</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="titlebox">发货时间</div>
                  <div
                    class="infobox last_row middlebox selectbox disabledbox"
                    style="width: 100%"
                  >
                    <el-date-picker
                      v-model="tableData.oaa34"
                      style="width: 100%"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      disabled
                      placeholder=""
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">是否签订合同</div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa35"
                    >
                      <el-radio :label="1" disabled>是</el-radio>
                      <el-radio :label="2" disabled>否</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="titlebox">发票号码</div>
                  <div
                    class="infobox last_row middlebox selectbox"
                    style="width: 100%"
                  >
                    {{tableData.oaa36}}
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
      workname: '开票申请',
      activeTab: "firTab",
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        // oaa16: "", //发货单
        // oaa16_show: "", //发货单
        oaf:[],//发货单信息
        // 开票信息
        oaa21: "", //名称
        oaa22: "", //纳税人识别号
        oaa23: "", //地址
        oaa24: "", //银行账号
        oaa25: "", //开户行
        oaa26: "", //电话
        oaa27: "", //开票种类
        oaa28: "", //开票金额
        oac: [], // 发票明细
        oaa31: "", //货款回收情况
        oaa32: "", //回款日期
        oaa33: "", //回款方式
        oaa34: "", //发货时间
        oaa35: "", //是否签订合同
        oaa36: "", //发票号码
      },
      fileList_user: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8953
      },
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4515
    this.getworkflows()
  },
  methods: {
    goPrint() {
      let routeUrl = this.$router.resolve({
        path: "printPage",
        query: {
          workid: this.workid
        }
      });
      window.open(routeUrl.href, '_blank');
    },
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
