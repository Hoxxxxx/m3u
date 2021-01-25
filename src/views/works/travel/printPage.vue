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
          <div class="title_line">报销信息</div>
          <!-- 1 -->
          <div class="form_line">
            <div class="titlebox">币种</div>
            <div class="infobox">{{tableData.oaa06_show}}</div>
            <div class="titlebox">汇率</div>
            <div class="infobox">{{tableData.oaa08}}</div>
            <div class="titlebox">支付金额</div>
            <div class="infobox last_row">{{payMoney}}</div>
          </div>
          <!-- 2 -->
          <div class="form_line">
            <div class="titlebox">报销金额</div>
            <div class="infobox">{{expenseMoney}}</div>
            <div class="titlebox">报销金额大写</div>
            <div class="infobox selectbox">{{tableData.expenseMoneyF}}</div>
            <div class="titlebox">支付方式</div>
            <div class="infobox last_row">{{tableData.oaa12_show}}</div>
          </div>
          <!-- 3 -->
          <div class="form_line">
            <div class="titlebox">发票张数</div>
            <div class="infobox longbox">{{tableData.oaa14}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">出差地点</div>
            <div class="infobox longbox">
              <span class="radioItem" v-if="tableData.oaa81==1">一般地区</span>
              <span class="radioItem" v-if="tableData.oaa81==2">特殊地区</span>
              <span class="radioItem" v-if="tableData.oaa81==3">沿海 / 省会地区</span>
              {{tableData.oaa82}}
            </div>
          </div>
          <!-- 4 -->
          <div class="form_line">
            <div class="titlebox">出差申请单</div>
            <div class="infobox longbox">{{tableData.oaa15}}</div>
          </div>
          <!-- 5 -->
          <div class="form_line">
            <div class="titlebox">说明</div>
            <div class="infobox longbox" style="width: 100%">{{tableData.oaa16}}</div>
          </div>
          <!-- 收款信息 -->
          <div class="title_line">收款信息</div>
          <div class="form_line">
            <div class="titlebox">收款人</div>
            <div class="infobox selectbox">{{tableData.oaa09}}</div>
            <div class="titlebox">开户行</div>
            <div class="infobox selectbox">{{tableData.oaa10}}</div>
            <div class="titlebox">收款账号</div>
            <div class="infobox selectbox last_row">{{tableData.oaa11}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">支票号</div>
            <div class="infobox last_row longbox selectbox" style="width: 100%">{{tableData.oaa17}}</div>
          </div>
          <!-- 发票明细行 -->
          <div class="title_line">差旅明细</div>

          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_oab" :key="'oab'+F_index">
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

          <div class="title_line">合计</div>
          <div class="summry">
            <ul class="summryUl">
              <li class="summryLi">
                <div class="summryName">费用合计</div>
                <div class="summryCont">{{ totalCost }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">车船费合计</div>
                <div class="summryCont">{{ carCost }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">住宿费</div>
                <div class="summryCont">{{ accomCost }}</div>
              </li>
            </ul>
          </div>
          <div class="summry">
            <ul class="summryUl">
              <li class="summryLi">
                <div class="summryName ">室内交通费</div>
                <div class="summryCont editNot">{{ tansportCost }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">会议费</div>
                <div class="summryCont editNot">{{ conferCost }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">交际费</div>
                <div class="summryCont editNot">{{ commuCost }}</div>
              </li>
            </ul>
          </div>
          <div class="summry">
            <ul class="summryUl">
              <li class="summryLi">
                <div class="summryName ">其他</div>
                <div class="summryCont editNot">{{ others }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">补助合计</div>
                <div class="summryCont editNot">{{ subside }}</div>
              </li>
            </ul>
          </div>

          <!-- 费用明细行项目 -->
          <div class="title_line">费用明细行项目</div>

          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_oac" :key="'oac'+F_index">
            <!-- 有几个表头 -->
            <div class="tDataBox" v-for="(S_item, S_index) in F_item.theadList" :key="S_item+S_index">
              <div class="thead">{{S_item.label}}</div>
              <!-- 有几组内容 -->
              <div class="tdata" v-if="tableData.oac.length == 0"></div>
              <div class="tdata" v-for="(content_item, content_index) in tableData.oac" :key="content_item+content_index">
                {{content_item[S_item.value]}}
              </div>
            </div>
          </div>

          <!-- 冲销信息 -->
          <div class="title_line">冲销信息</div>

          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_oad" :key="'oad'+F_index">
            <!-- 有几个表头 -->
            <div class="tDataBox" v-for="(S_item, S_index) in F_item.theadList" :key="S_item+S_index">
              <div class="thead">{{S_item.label}}</div>
              <!-- 有几组内容 -->
              <div class="tdata" v-if="tableData.oad.length == 0"></div>
              <div class="tdata" v-else v-for="(content_item, content_index) in tableData.oad" :key="content_item+content_index">
                {{content_item[S_item.value]}}
              </div>
            </div>
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
              <div class="titlebox">支付方式</div>
              <div class="infobox middlebox last_row">
                {{ tableData.oaz05_show }}
              </div>
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
import { workflowsList, } from "@/api/process_new.js"
import { timeFmt, dateFmt, number_chinese, OpenLoading } from "@/utils/utils.js";

export default {
  data() {
    return {
      timeNow: timeFmt(),
      // 差旅明细
      tableBox_oab: [
        // 表格一
        {
          theadList: [
            {
              label: '开始日期',
              value: 'oab01'
            },
            {
              label: '结束日期',
              value: 'oab02'
            },
            {
              label: '单据号',
              value: 'oab03'
            },
            {
              label: '出发地',
              value: 'oab04'
            },
            {
              label: '目的地',
              value: 'oab05'
            },
            {
              label: '车船费',
              value: 'oab06'
            },
          ],
        },
        // 表格二
        {
          theadList: [
            {
              label: '车补',
              value: 'oab07'
            },
            {
              label: '住宿费',
              value: 'oab08'
            },
            {
              label: '住补',
              value: 'oab09'
            },
            {
              label: '市内交通费',
              value: 'oab10'
            },
            {
              label: '市补',
              value: 'oab11'
            },
            {
              label: '会议费',
              value: 'oab12'
            },
          ],
        },
        // 表格三
        {
          theadList: [
            {
              label: '交际费',
              value: 'oab13'
            },
            {
              label: '其他',
              value: 'oab14'
            },
            {
              label: '伙食补助',
              value: 'oab15'
            },
          ],
        },
      ],
      // 费用明细
      tableBox_oac: [
        // 表格一
        {
          theadList: [
            {
              label: '会计科目',
              value: 'oac01'
            },
            {
              label: '项目',
              value: 'oac04_show'
            },
            {
              label: '项目WBS',
              value: 'oac05_show'
            },
            {
              label: '摘要',
              value: 'oac06'
            },
            {
              label: '金额（不含税）',
              value: 'oac07'
            },
            {
              label: '折合后金额',
              value: 'apb25'
            },
          ],
        },
        // 表格二
        {
          theadList: [
            {
              label: '核算项一',
              value: 'oac11'
            },
            {
              label: '核算项二',
              value: 'oac12'
            },
          ],
        },
      ],
      // 冲销信息
      tableBox_oad: [
        // 表格一
        {
          theadList: [
            {
              label: '待抵单号',
              value: 'oad01'
            },
            {
              label: '借款日期',
              value: 'oad03'
            },
            {
              label: '借款人',
              value: 'oad04_show'
            },
            {
              label: '借款总金额',
              value: 'oad05'
            },
            {
              label: '还款金额',
              value: 'oad02'
            },
            {
              label: '凭证号',
              value: 'oad06'
            },
          ],
        },
      ],


      overloading: '', //加载定时器
      workid: '',
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
        oaa81: "", //出差地点类型
        oaa82: "", //出差地点
        oaa15: "", //出差申请单
        oaa16: "", //说明
        payMoney: "", //支付金额
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
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      workclass_perflow:[],//流程进度
      fileList_user: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8936
      },
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4605
    this.getworkflows()
  },
  computed: {
    totalCost() {
      let sum = this.carCost +
        this.accomCost +
        this.tansportCost +
        this.conferCost +
        this.commuCost +
        this.others
      return sum;
    },
    // 车船费
    carCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab06);
      }, 0);
    },
    //住宿费
    accomCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab08);
      }, 0);
    },
    // 室内交通费
    tansportCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab10);
      }, 0);
    },
    // 会议费
    conferCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab12);
      }, 0);
    },
    //交际费
    commuCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab13);
      }, 0);
    },
    // 其他
    others() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab14);
      }, 0);
    },
    // 补助合计
    subside() {
      return this.tableData.oab.reduce((prev, cur) => {
        return (
          prev +
          (Number(cur.oab07) +
            Number(cur.oab09) +
            Number(cur.oab11) +
            Number(cur.oab15))
        );
      }, 0);
    },
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
      this.tableData.payMoney = res
      return res
    }
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
</style>
