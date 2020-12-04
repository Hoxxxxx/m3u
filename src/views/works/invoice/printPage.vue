<template>
  <div class="printSpace">
    <!-- 页眉 -->
    <div class="pageHead">
      <span class="company">华录新媒</span>
      <span class="Date">2020-12-03 13:28</span>
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
          <!-- 发货信息 -->
          <div class="title_line">发货信息</div>
          <!-- 1 -->
          <div class="form_line">
            <div class="titlebox">客户名称</div>
            <div class="infobox middlebox">{{tableData.oaa11_show}}</div>
            <div class="titlebox">总金额</div>
            <div class="infobox middlebox last_row">{{tableData.oaa12}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">税别</div>
            <div class="infobox middlebox">{{tableData.oaa13}}</div>
            <div class="titlebox">税额</div>
            <div class="infobox middlebox last_row">{{tableData.oaa14}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">备注</div>
            <div class="infobox longbox" style="width: 100%">{{tableData.oaa15}}</div>
          </div>
          <!-- 应收明细 -->
          <div class="title_line">应收明细</div>
          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_invoice" :key="'oab'+F_index">
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
          <div class="form_line">
            <div class="titlebox">是否开票</div>
            <div class="infobox longbox">
              <el-radio-group
                class="radioGroup"
                v-model="tableData.oaa16"
              >
                <el-radio :label="1" disabled>是</el-radio>
                <el-radio :label="2" disabled>否</el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- 开票信息 -->
          <div v-if="tableData.oaa16 == 1">
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
                <div class="form_line ">
                  <div class="titlebox">开票金额</div>
                  <div
                    class="infobox last_row longbox selectbox"
                    style="width: 100%"
                  >
                    {{tableData.oaa28}}
                  </div>
                </div>
                <div class="title_line">发票明细</div>
                <div class="inner_Table" v-for="(F_item, F_index) in tableBox_oac" :key="'oac'+F_index">
                  <!-- 有几个表头 -->
                  <div class="tDataBox" v-for="(S_item, S_index) in F_item.theadList" :key="S_index">
                    <div class="thead">{{S_item.label}}</div>
                    <!-- 有几组内容 -->
                    <div class="tdata" v-if="tableData.oac.length == 0"></div>
                    <div class="tdata" v-for="(content_item, content_index) in tableData.oac" :key="content_index">
                      {{content_item[S_item.value]}}
                    </div>
                  </div>
                </div>
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
                    {{tableData.oaa32}}
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
                    {{tableData.oaa34}}
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

          <!-- 财务信息 -->
          <div v-if="oazShow == 1">
            <div class="title_line">
              财务信息
            </div>
            <div class="form_line">
              <div class="titlebox">记账日期</div>
              <div class="infobox middlebox ">{{tableData.oaz03}}</div>
              <div class="titlebox">凭证编号</div>
              <div class="infobox middlebox last_row">
                {{ tableData.oaz06 }}
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
import { number_chinese, OpenLoading } from "@/utils/utils.js";

export default {
  data() {
    return {
      overloading: '', //加载定时器
      workid: '',
      workname: '发货单',
      activeTab: "firTab",
      tableBox_invoice: [
        // 表格一
        {
          theadList: [
            {
              label: '发货单号',
              value: 'oab01_show'
            },
            {
              label: '客户名称',
              value: 'oab02_show'
            },
            {
              label: '发货单日期',
              value: 'oab03_show'
            },
            {
              label: '未开票金额',
              value: 'oab04'
            },
            {
              label: '本次开票金额',
              value: 'oab05'
            },
            {
              label: '本次开票金额',
              value: 'oab06'
            },
            {
              label: '本次开票金额',
              value: 'oab07'
            },
            {
              label: '本次开票金额',
              value: 'oab11'
            },
            {
              label: '本次开票金额',
              value: 'oab12'
            },
          ],
          tData: []
        },
      ],
      tableBox_oac:[
        {
          theadList: [
            {
              label: '序号',
              value: 'oac01'
            },
            {
              label: '商品名称',
              value: 'oac02_show'
            },
            {
              label: '规格',
              value: 'oac03'
            },
            {
              label: '数量',
              value: 'oac04'
            },
            {
              label: '含税单价',
              value: 'oac05'
            },
            {
              label: '金额',
              value: 'oac06'
            }
          ],
          tData: []
        }
      ],
      showData: {
        oaa04_show: "", //申请人
        expenseMoneyF: "", //报销金额大写
        oaa13_rate:0,//税率
      },
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话

        //发货信息
        oaa11: "", //客户名称
        oaa12: "", //总金额
        oaa13: "", //税别
        oaa14: "", //税额
        oaa15: "", //备注
        // 表格部分
        oab: [], //应收明细
        oaa16:1,//是否开票
        // 开票信息
        oaa21:"",//名称
        oaa22:"",//纳税人识别号
        oaa23:"",//地址
        oaa24:"",//银行账号
        oaa25:"",//开户行
        oaa26:"",//电话
        oaa27:"",//开票种类
        oaa28:"",//开票金额
        oac: [], // 发票明细
        oaa31:"",//货款回收情况
        oaa32:"",//回款日期
        oaa33:"",//回款方式
        oaa34:"",//发货时间
        oaa35:"",//是否签订合同
        oaa36:"",//发票号码
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      fileList_user: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8952
      },
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4512
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
</style>
