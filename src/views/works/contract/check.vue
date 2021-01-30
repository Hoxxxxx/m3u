<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary" @click="goPrint">打印</el-button>
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
                <div class="infobox middlebox editNot">
                  {{ tableData.oaa03_show }}
                </div>
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">{{ tableData.oaa04_show }}</div>
                <div class="titlebox">所属部门</div>
                <div class="infobox selectbox middlebox last_row">
                  {{ tableData.oaa06_show }}
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox longbox last_row">
                  {{ tableData.oaa05 }}
                </div>
              </div>
              <!-- 合同信息 -->
              <div class="title_line">合同信息</div>
              <div class="form_line">
                <div class="titlebox">合同编号</div>
                <div class="infobox selectbox">{{ tableData.oaa16 }}</div>
                <div class="titlebox">合同名称</div>
                <div class="infobox">{{ tableData.oaa11 }}</div>
                <div class="titlebox">合同金额</div>
                <div class="infobox last_row">{{ tableData.oaa12 }}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">签约方</div>
                <div class="infobox middlebox selectbox">
                  <el-radio-group
                    class="radioGroup"
                    style="margin-right: 120px"
                    v-model="tableData.oaa13"
                  >
                    <el-radio :label="1" disabled>供应商</el-radio>
                    <el-radio :label="2" disabled>客户</el-radio>
                  </el-radio-group>
                </div>
                <div class="titlebox">签约方名称</div>
                <div class="infobox middlebox last_row">{{ tableData.oaa14_show }}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">合同类型</div>
                <div class="infobox selectbox">
                  {{ tableData.oaa15_show }}
                </div>
                <div class="titlebox">合同开始日期</div>
                <div class="infobox selectbox">
                  <el-date-picker
                    v-model="tableData.oaa17"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    disabled
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">合同结束日期</div>
                <div class="infobox selectbox last_row">
                  <el-date-picker
                    v-model="tableData.oaa18"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    disabled
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">合同文件</div>
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
                </div>
              </div>
              <div class="form_line ">
                <div class="titlebox">说明</div>
                <div class="longbox infoShow">
                  {{ tableData.oaa21 }}
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">备注</div>
                <div class="longbox infoShow">
                  {{ tableData.oaa20 }}
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
              <!-- <el-button type="text">预览</el-button> -->
              <el-button type="text" @click="download(item.id, item.name)"
                >下载</el-button
              >
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
  </div>
</template>

<script>
import { OpenLoading } from "@/utils/utils.js";
// api
import { azisList, pmasList } from "@/api/basic";
import { workflowsList } from "@/api/process_new.js";

export default {
  components: {},
  data() {
    return {
      overloading: "", //加载定时器
      workid: "",
      workname: "合同申请",
      activeTab: "firTab",
      tableData: {},
      // 汇率数据
      fixedData: {
        // 币种列表
        azisList: [],
        // 付款方式列表
        pmasList: [],
      },
      fileList_user: [],
      fileList_down: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8954,
      },
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid ? this.$route.query.workid : 1174;
    this.getworkflows();
    this.getAzis();
  },
  methods: {
    goPrint() {
      let routeUrl = this.$router.resolve({
        path: "printPage",
        query: {
          workid: this.workid,
        },
      });
      window.open(routeUrl.href, "_blank");
    },
    handleClick() {
      // console.log(this.activeTab);
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
          this.tableData = res.data.workclass_info.from_data;
          this.workname = res.data.workclass_info.title;
          this.workclass_perflow = res.data.workclass_perflow;
          this.oazShow = res.data.workclass_flow.erp_turn;
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
          this.$message.error("获取流程信息失败：", res.error.message);
        }
      });
    },
    // ***********获取下拉列表信息************
    getAzis() {
      azisList().then((result) => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      });
    },
    // *******************************************
    // ***************附件上传******************
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
    // ******************************************
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
