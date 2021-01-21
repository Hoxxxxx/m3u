<template>
  <div class="printSpace">
    <!-- 页眉 -->
    <div class="pageHead">
      <span class="company">华录新媒</span>
      <span class="Date">{{timeNow}}</span>
    </div>
    <!-- 表单区域 -->
    <div class="printContent">
      <!-- 内容 -->
      <div class="tabContent" id="tabContent">
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
            <div class="infobox middlebox">{{ tableData.oaa03_show }}</div>
            <div class="titlebox">联系电话</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa05 }}</div>
          </div>
          <div class="form_line lastline">
            <div class="titlebox">申请人</div>
            <div class="infobox">{{ tableData.oaa04_show }}</div>
            <div class="titlebox">员工编号</div>
            <div class="infobox">{{ tableData.oaa04 }}</div>
            <div class="titlebox">所属部门</div>
            <div class="infobox last_row">{{ tableData.oaa04_gen04 }}</div>
          </div>
          <!-- 付款信息 -->
          <div class="title_line">开票信息</div>
          <div class="form_line">
            <div class="titlebox">销售方名称</div>
            <div class="infobox middlebox">{{tableData.oaa10_show}}</div>
            <div class="titlebox">销售方纳税人识别号</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa11 }}</div>
          </div>
          <div class="form_line lastline">
            <div class="titlebox">购买方名称</div>
            <div class="infobox middlebox">{{tableData.oaa12}}</div>
            <div class="titlebox">购买方纳税人识别号</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa13 }}</div>
          </div>
          <!-- 发票明细行 -->
          <div class="title_line">发票明细行</div>

          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_invoice" :key="F_index">
            <!-- 有几个表头 -->
            <div class="tDataBox" v-for="(S_item, S_index) in F_item.theadList" :key="S_index">
              <div class="thead">{{S_item.label}}</div>
              <!-- 有几组内容 -->
              <div class="tdata" v-if="tableData.oab.length == 0"></div>
              <div class="tdata" v-for="(content_item, content_index) in tableData.oab" :key="content_index">
                {{content_item[S_item.value]}}
              </div>
            </div>
          </div>

          <div class="title_line">发票明细行合计</div>
          <div class="summry">
            <ul class="summryUl">
              <li class="summryLi">
                <div class="summryName">税前金额（原币）</div>
                <div class="summryCont">{{ tableData.oaa14 }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">税额（原币）</div>
                <div class="summryCont">{{ tableData.oaa15 }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">含税合计（原币）</div>
                <div class="summryCont">{{ tableData.oaa16 }}</div>
              </li>
            </ul>
          </div>

          <!-- 财务信息 -->
          <div v-if="oazShow == 1">
            <div class="title_line">
              财务信息
            </div>
            <div class="form_line">
              <!-- <div class="titlebox">银行</div>
              <div class="infobox selectbox editNot">
                <div class="" >
                  {{ tableData.oaz01_show }}
                </div>
              </div>
              <div class="titlebox">异动码</div>
              <div class="infobox selectbox editNot">
                <div class="" >
                  {{ tableData.oaz02 }}
                </div>
              </div> -->
              <div class="titlebox">记账日期</div>
              <div class="infobox middlebox last_row">{{tableData.oaz03}}</div>
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
              <!-- <div class="titlebox">支付方式</div>
              <div class="infobox middlebox last_row">
                {{ tableData.oaz05_show }}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 流程区域 -->
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

  </div>
</template>

<script>
import { timeFmt, OpenLoading } from "@/utils/utils.js";
// api
import { workflowsList, editFlow  } from "@/api/process_new";
import { azisList, pmasList, } from "@/api/basic";

export default {
  components: {},
  data() {
    return {
      timeNow: timeFmt(),
      // 指定表格（发票明细行）
      overloading: '', //加载定时器
      activeTab: "firTab",
      workid: '',
      workName:"红字发票申请单",//流程名
      tableBox_invoice: [
        // 表格一
        {
          theadList: [
            {
              label: '商品名',
              value: 'oab01'
            },
            {
              label: '数量',
              value: 'oab02'
            },
            {
              label: '含税单价',
              value: 'oab03'
            },
            {
              label: '税前金额',
              value: 'oab03_show'
            },
            {
              label: '税别',
              value: 'oab05'
            },
            {
              label: '税率',
              value: 'oab05_show'
            },
            {
              label: '税额',
              value: 'oab06'
            },
            {
              label: '含税金额',
              value: 'oab07'
            }
          ],
          tData: []
        },
        // 表格二
        {
          theadList: [
            {
              label: '含税金额（原币）',
              value: 'oab07'
            },
            {
              label: '税前金额（本币）',
              value: 'sqjeBB'
            },
            {
              label: '税额（本币）',
              value: 'seBB'
            },
            {
              label: '含税金额（本币）',
              value: 'hsjeBB'
            },
          ],
          tData: []
        },
      ],
      
      overloading: '', //加载定时器
      activeTab: "firTab",
      workid: '',
      workname:"固定资产付款",//流程名
      tableData: {
        // 表格部分
        oab: [], // 发票明细
      },
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
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      fileList_user: [],
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid ? this.$route.query.workid : 5624;
    // this.workid = 4374
    this.getAzi()
    this.getPma()
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
          setTimeout(() => {
            // 打印
            window.print()
          },500)
        }else{
          loading.close()
          clearTimeout(this.overloading)
          this.$message.error('获取流程信息失败：', res.error.message);
        }
      })
    },
    // *******************************************
    // ***********获取下拉列表信息************
    getAzi () {
      azisList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      })
    },
    getPma() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.payTypes = res.data;
        } else {
          this.$message.error("获取支付方式列表失败：" + result.error.message);
        }
      });
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
</style>
