<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" @click="$router.push('/')"
          >回到首页</el-button
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
            <div class="title">外地差旅报销单（华录新媒）</div>
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
              <!-- 报销信息 -->
              <div class="title_line">报销信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox">
                  {{ tableData.oaa06_show }}
                </div>
                <div class="titlebox">汇率</div>
                <div class="infobox">
                  {{ tableData.oaa08 }}
                </div>
                <div class="titlebox">支付金额</div>
                <div class="infobox last_row editNot">
                  {{ tableData.payMoney }}
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">报销金额</div>
                <div class="infobox editNot">
                  {{ tableData.expenseMoney }}
                </div>
                <div class="titlebox">报销金额大写</div>
                <div class="infobox editNot">
                  {{ tableData.expenseMoneyF }}
                </div>
                <div class="titlebox">支付方式</div>
                <div class="infobox last_row selectbox">
                  {{ tableData.oaa12_show }}
                </div>
              </div>
              <!-- 3 -->
              <div class="form_line">
                <div class="titlebox">发票张数</div>
                <div class="infobox longbox">
                  {{ tableData.oaa14 }}
                </div>
              </div>
              <!-- 4 -->
              <div class="form_line">
                <div class="titlebox">出差申请单</div>
                <div class="infobox longbox selectbox">
                  {{ tableData.oaa15 }}
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
              <!-- 差旅明细 -->
              <div class="title_line">差旅明细</div>
              <div>
                <el-table
                  :data="tableData.oab"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="oab01"
                    label="开始日期"
                    min-width="160px"
                    align="center"
                  >
                  <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oab01"
                          style="width: 100%"
                          disabled
                          type="date"
                          placeholder="开始日期"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab02"
                    label="结束日期"
                    min-width="160px"
                    align="center"
                  >
                  <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oab02"
                          style="width: 100%"
                          disabled
                          type="date"
                          placeholder="结束日期"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab03"
                    label="单据号"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab04"
                    label="出发地"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab05"
                    label="目的地"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab06"
                    label="车船费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab07"
                    label="车补"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab08"
                    label="住宿费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab09"
                    label="住补"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab10"
                    label="市内交通费"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab11"
                    label="市补"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab12"
                    label="会议费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab13"
                    label="交际费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab14"
                    label="其他"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab15"
                    label="伙食补助"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName">费用合计</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">车船费合计</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">住宿费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">室内交通费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">会议费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">交际费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">其他</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">补助合计</div>
                      <div class="summryCont">0</div>
                    </li>
                  </ul>
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
                    prop="oac01"
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
            <div class="title">固定资产付款</div>
            <div class="table_Info">
              <span class="code">编号：20201102134</span>
              <span class="name"
                >流程名称：固定资产付款(No:20201102134630)张康成</span
              >
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
  </div>
</template>

<script>
import { workflowsList, } from "@/api/process_new.js"

export default {
  data() {
    return {
      workid: '3893',
      workname: '外地差旅报销单',
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
        oaa14: "", //发票张数
        oaa15: "", //出差申请单
        oaa16: "", //说明
        payMoney: "", //支付金额
        expenseMoney: "", //报销金额
        expenseMoneyF: "", //报销金额大写
        // 收款信息
        oaa09: "", //收款人
        oaa10: "", //开户行
        oaa11: "", //收款账号
        oaa17: "", //支票号
        // 表格部分
        oab: [], // 差旅明细
        oac: [], // 费用明细行项目
        oad: [], // 冲销信息
      },
      fileList_user: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8936
      },
    };
  },
  created() {
    this.getworkflows()
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取流程信息************
    getworkflows(){
      const params = {
        workid: this.workid
      }
      workflowsList(params).then(res=>{
        if(res.status == 200){
          this.tableData = res.data.workclass_info.from_data
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
    async download(viewId, viewName) {
      const { data: res } = await this.axios({
          method: 'get',
          url: `files/download/27`,
          responseType: "blob",
      })
      let fileName = '测试pdf1.pdf';
      let fileType = {
        docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        pdf:'application/pdf',
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
