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
            <div class="title">{{workname}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox">
                  {{ tableData.oaa03 }}
                </div>
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">
                  {{ tableData.oaa04_show }}
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox">
                  {{ tableData.oaa05 }}
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">费用类别</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa35">
                    <el-radio :label="1" disabled>行政费用</el-radio>
                    <el-radio :label="2" disabled>工会费用</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <!-- 报销信息 -->
              <div class="title_line">报销信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox ">
                  {{ tableData.oaa06_show }}
                </div>
                <div class="titlebox">汇率</div>
                <div class="infobox ">
                  {{ tableData.oaa08 }}
                </div>
                <div class="titlebox">支付金额</div>
                <div class="infobox last_row ">
                  {{ payMoney }}
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">报销金额</div>
                <div class="infobox ">
                  {{ expenseMoney }}
                </div>
                <div class="titlebox">报销金额大写</div>
                <div class="infobox ">
                  {{ tableData.expenseMoneyF }}
                </div>
                <div class="titlebox">支付方式</div>
                <div class="infobox last_row selectbox ">
                  {{ tableData.oaa12_show }}
                </div>
              </div>
              <!-- 5 -->
              <div class="form_line last_line">
                <div class="titlebox">说明</div>
                <div class="infobox last_row longbox" style="width: 100%">
                  {{ tableData.oaa16 }}
                </div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">收款人</div>
                <div class="infobox">
                  {{ tableData.oaa09 }}
                </div>
                <div class="titlebox">开户行</div>
                <div class="infobox">
                  {{ tableData.oaa10 }}
                </div>
                <div class="titlebox">收款账号</div>
                <div class="infobox last_row">
                  {{ tableData.oaa11 }}
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">支票号</div>
                <div class="infobox last_row longbox" style="width: 100%">
                  {{ tableData.oaa17 }}
                </div>
              </div>
              <!-- 费用明细行项目 -->
              <div class="title_line">费用明细行项目</div>
              <div>
                <el-table
                  :data="tableData.oac"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="oac01_show"
                    label="会计科目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac04_show"
                    label="项目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac05_show"
                    label="项目WBS"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac06"
                    label="摘要"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac07"
                    label="金额（不含税）"
                    min-width="180px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="apb25"
                    label="折合后金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac11"
                    label="核算项一"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac12"
                    label="核算项二"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <!-- 冲销信息 -->
              <div class="title_line">冲销信息</div>
              <div>
                <el-table
                  :data="tableData.oad"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="apb02"
                    label="待抵单号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="apb09"
                    label="借款日期"
                    min-width="130px"
                    align="center"
                  >
                  <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.borrowDate"
                          style="width: 100%"
                          disabled
                          type="date"
                          placeholder="选择借款日期"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb28"
                    label="借款人"
                    min-width="110px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="apb35"
                    label="借款总金额"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oad02"
                    label="还款金额"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="apb25"
                    label="凭证号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
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
import { number_chinese } from "@/utils/utils.js";

export default {
  data() {
    return {
      workid: '',
      workname: '其他费用报销单',
      activeTab: "firTab",
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人
        oaa05: "", //联系电话
        //报销信息
        oaa06: "", //币种
        oaa08: "", //汇率
        oaa12: "", //支付方式
        oaa16: "", //说明
        payMoney: "", //支付金额
        expenseMoneyF: "", //报销金额大写
        // 收款信息
        oaa09: "", //收款人
        oaa10: "", //开户行
        oaa11: "", //收款账号
        oaa17: "", //支票号
        // 表格部分
        oac: [], // 费用明细行项目
        oad: [], // 冲销信息
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
    this.getworkflows()
  },
  computed: {
    // 报销金额（不含税）
    expenseMoney(){
      let sum =  this.tableData.oac.reduce((prev, cur) => {
        return prev + Number(cur.oac07);
      }, 0);
      this.tableData.expenseMoneyF = number_chinese(sum)
      return sum
    },
    // 支付金额
    payMoney(){
      // 还款金额总和
      let sum = this.tableData.oad.reduce((prev, cur) => {
        return prev + Number(cur.oad02);
      }, 0);
      // 支付金额
      let res = this.expenseMoney - sum
      return res
    }
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
