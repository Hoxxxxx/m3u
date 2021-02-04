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
            <div class="title">{{ workName }}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox editNot">{{ tableData.oaa03_show }}</div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row">{{ tableData.oaa05 }}</div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">{{ tableData.oaa04_show }}</div>
                <div class="titlebox">员工编号</div>
                <div class="infobox editNot">{{ tableData.oaa04 }}</div>
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot last_row">{{ tableData.oaa04_gen04 }}</div>
              </div>
              <!-- 付款信息 -->
              <div class="title_line">开票信息</div>
              <div class="form_line">
                <div class="titlebox">销售方名称</div>
                <div class="infobox middlebox">{{tableData.oaa10_show}}</div>
                <div class="titlebox">销售方纳税人识别号</div>
                <div class="infobox middlebox last_row editNot">{{ tableData.oaa11 }}</div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">购买方名称</div>
                <div class="infobox middlebox">{{tableData.oaa12}}</div>
                <div class="titlebox">购买方纳税人识别号</div>
                <div class="infobox middlebox last_row editNot">{{ tableData.oaa13 }}</div>
              </div>
              <!-- 发票明细行 -->
              <div class="title_line">发票明细行</div>
              <div>
                <el-table
                  :data="tableData.oab"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oab01_show"
                    label="商品名称"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab02"
                    label="数量"
                    min-width="160px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab03"
                    label="含税单价"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab07"
                    label="含税金额"
                    min-width="170px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab05"
                    label="税别"
                    min-width="170px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab05_show"
                    label="税率"
                    min-width="170px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab06"
                    label="税额"
                    min-width="170px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab04"
                    label="税前金额"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName">税前金额（原币）</div>
                      <div class="summryCont editNot">{{ tableData.oaa14 }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">税额</div>
                      <div class="summryCont editNot">{{ tableData.oaa15 }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">含税合计（原币）</div>
                      <div class="summryCont editNot">{{ tableData.oaa16 }}</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">说明</div>
                <div class="infobox longbox" style="width: 100%">
                  {{tableData.oaa17}}
                </div>
              </div>
              
              <!-- 财务信息 -->
              <div v-if="oazShow == 1">
                <div class="title_line">
                  财务信息
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">记账日期</div>
                  <div class="infobox datebox">
                    <el-date-picker
                      v-model="oaz.oaz03"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                  </div>
                  <div class="titlebox">账款类型</div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('ZKLX')">
                      {{ financialData.oaz04_show }}
                    </div>
                  </div>
                  <div class="titlebox">凭证编号</div>
                  <div class="infobox selectbox editNot last_row">
                    {{ oaz.oaz06 }}
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
import { dateFmt, OpenLoading } from "@/utils/utils.js";
// api
import { workflowsList, editFlow  } from "@/api/process_new";
import { azisList, pmasList, } from "@/api/basic";

export default {
  components: {},
  data() {
    return {
      overloading: '', //加载定时器
      activeTab: "firTab",
      workid: '',
      workName:"红字发票申请单",//流程名
      tableData: {
        // 表格部分
        oab: [], // 发票明细
        oac: [], // 费用明细行项目
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      fileList_user: [],
      // 当前流程列表
      workclass_perflow: [],
      // 财务信息
      financialData: {
        bank_show: "", //银行回显数据
        num_show: "", //异动码回显数据
        oaz05_show: "", //支付方式回显数据
        oaz04_show: "", //账款类型回显数据
      },
      //财务信息
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: dateFmt(new Date()), //记账日期
        oaz04: "", //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
    };
  },
  created() {
    this.workid = this.$route.query.workid ? this.$route.query.workid : 5692;
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
    // 含税金额计算
    sum_HSJE(rowIndex) {
      // 税前金额 = （含税金额  / （1+税率/100））
      this.tableData.oab[rowIndex].oab07 = (this.tableData.oab[rowIndex].oab02 * this.tableData.oab[rowIndex].oab03).toFixed(2)
      this.change_HSJE(rowIndex)
    },
    // 税额计算
    change_HSJE(rowIndex) {
      // 税前金额 = （含税金额  / （1+税率/100））
      this.tableData.oab[rowIndex].oab04 = (this.tableData.oab[rowIndex].oab07 / (1 + this.tableData.oab[rowIndex].oab05_show / 100)).toFixed(2)
      // 税额 = （含税金额  / （1+税率/100））* （税率 / 100）
      this.tableData.oab[rowIndex].oab06 = (this.tableData.oab[rowIndex].oab07 / (1 + this.tableData.oab[rowIndex].oab05_show / 100) * (this.tableData.oab[rowIndex].oab05_show / 100)).toFixed(2)
    },
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
          // this.tableData.oab.forEach((item, index) => {
          //   this.change_HSJE(index)
          // })
          this.workName = res.data.workclass_info.title
          this.workclass_perflow = res.data.workclass_perflow
          this.oazShow = res.data.workclass_flow.erp_turn
          this.oaz = {
            oaz01: res.data.workclass_info.from_data.oaz01, //银行
            oaz02: res.data.workclass_info.from_data.oaz02, //异动码
            oaz03: res.data.workclass_info.from_data.oaz03 ? res.data.workclass_info.from_data.oaz03 : dateFmt(new Date()), //记账日期
            oaz04: 2001, //账款类型
            oaz05: res.data.workclass_info.from_data.oaz05 ? res.data.workclass_info.from_data.oaz05 : res.data.workclass_info.from_data.oaa16, //支付方式
            oaz06: res.data.workclass_info.from_data.oaz06, //凭证编号
          }
          this.financialData ={
            bank_show: res.data.workclass_info.from_data.oaz01_show, //银行回显数据
            num_show: res.data.workclass_info.from_data.oaz02_show, //异动码回显数据
            oaz04_show: "费用请款",//账款类型回显数据
            oaz05_show: res.data.workclass_info.from_data.oaz05_show ? res.data.workclass_info.from_data.oaz05_show : res.data.workclass_info.from_data.oaa16_show , //支付方式回显数据
          }
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
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
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
        background: #FCFDFF;
        width: 150px!important;
        height: 40px;
        line-height: 40px;
        padding: 0 5px 0 5px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        width: 230px;
        height: 40px;
        flex: 1 1 auto;
        line-height: 40px;
        text-align: center;
      }
      &:last-child {
        border-right: none;
        .summryCont{
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
