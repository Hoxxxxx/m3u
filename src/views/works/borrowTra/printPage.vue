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
          <div class="form_line">
            <div class="titlebox">申请人</div>
            <div class="infobox">{{ tableData.oaa04_show }}</div>
            <div class="titlebox">员工编号</div>
            <div class="infobox">{{ tableData.oaa04 }}</div>
            <div class="titlebox">所属部门</div>
            <div class="infobox last_row">{{ tableData.oaa04_gen04 }}</div>
          </div>
          <!-- 付款信息 -->
          <div class="title_line">出差信息</div>
          <!-- 1 -->
          <div class="form_line">
            <div class="titlebox">预计开始时间</div>
            <div class="infobox middlebox">{{ tableData.oaa31 }}</div>
            <div class="titlebox">预计结束时间</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa32 }}</div>
          </div>
          <!-- 3 -->
          <div class="form_line">
            <div class="titlebox">出差目的</div>
            <div class="infobox longbox" style="width: 100%">{{tableData.oaa30}}</div>
          </div>
          <!-- 4 -->
          <div class="form_line">
            <div class="titlebox">出差地点</div>
            <div class="infobox longbox">
              <span class="radioItem" v-if="tableData.oaa35==1">一般地区</span>
              <span class="radioItem" v-if="tableData.oaa35==2">特殊地区</span>
              <span class="radioItem" v-if="tableData.oaa35==3">沿海 / 省会地区</span>
              {{tableData.oaa36}}
            </div>
          </div>
          <!-- 5 -->
          <div class="form_line">
            <div class="titlebox">交通工具</div>
            <div class="infobox longbox">
              <span class="radioItem" v-if="tableData.oaa37==1">飞机</span>
              <span class="radioItem" v-if="tableData.oaa37==2">火车</span>
              <span class="radioItem" v-if="tableData.oaa37==3">汽车</span>
              <span class="radioItem" v-if="tableData.oaa37==4">其它</span>
            </div>
          </div>
          <!-- 5 -->
          <div class="form_line">
            <div class="titlebox">是否需要借款</div>
            <div class="infobox longbox">
              <span class="radioItem" v-if="tableData.oaa39==1">是</span>
              <span class="radioItem" v-if="tableData.oaa39==2">否</span>
            </div>
          </div>
          <!-- 借款信息 -->
          <div v-if="tableData.oaa39==1">
            <div  class="title_line">借款信息</div>
            <div class="form_line">
              <div class="titlebox">项目</div>
              <div class="infobox middlebox">{{ tableData.oaa14_show }}</div>
              <div class="titlebox">项目WBS</div>
              <div class="infobox middlebox last_row">{{ tableData.oaa15_show }}</div>
            </div>
            <div class="form_line">
              <div class="titlebox">币种</div>
              <div class="infobox">{{ tableData.oaa06_show }}</div>
              <div class="titlebox">借款金额</div>
              <div class="infobox">{{ tableData.oaa07 }}</div>
              <div class="titlebox">汇率</div>
              <div class="infobox last_row">{{ tableData.oaa08 }}</div>
            </div>
            <div class="form_line">
              <div class="titlebox">收款人</div>
              <div class="infobox">{{ tableData.oaa09 }}</div>
              <div class="titlebox">账号</div>
              <div class="infobox">{{ tableData.oaa10 }}</div>
              <div class="titlebox">开户行</div>
              <div class="infobox last_row">{{ tableData.oaa11 }}</div>
            </div>
            <div class="form_line">
              <div class="titlebox">支付方式</div>
              <div class="infobox longbox">{{tableData.oaa12_show}}</div>
            </div>
            <div class="form_line">
              <div class="titlebox">折合汇率金额</div>
              <div class="infobox middlebox">{{ exchange }}</div>
              <div class="titlebox">折合汇率金额大写</div>
              <div class="infobox middlebox last_row">{{ exchange_Cap }}</div>
            </div>
            <div class="form_line">
              <div class="titlebox">借款事由</div>
              <div class="infobox longbox">{{tableData.oaa13}}</div>
            </div>
          </div>

          <!-- 交际信息 -->
          <div  class="title_line">交际信息</div>
          <div class="form_line">
            <div class="titlebox">支出项目</div>
            <div class="infobox middlebox">{{ tableData.oaa20 }}</div>
            <div class="titlebox">实施时间</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa21 }}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">我方参加部门</div>
            <div class="infobox middlebox">{{ tableData.oaa22 }}</div>
            <div class="titlebox">对方参加部门</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa23 }}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">我方参加人员</div>
            <div class="infobox middlebox">{{ tableData.oaa24 }}</div>
            <div class="titlebox">对方参加人员</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa25 }}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">付款预算金额</div>
            <div class="infobox middlebox">{{ tableData.oaa26 }}</div>
            <div class="titlebox">区分</div>
            <div class="infobox middlebox last_row">
              <span class="radioItem" v-if="tableData.oaa27==1">交际费</span>
              <span class="radioItem" v-if="tableData.oaa27==2">会议费</span>
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
import { timeFmt, OpenLoading } from "@/utils/utils.js";
// api
import { workflowsList, } from "@/api/process_new.js"

export default {
  components: {},
  data() {
    return {
      timeNow: timeFmt(),
      overloading: '', //加载定时器
      workid: '',
      workname: '出差申请',
      activeTab: "firTab",
      tableData: {},
      // 汇率数据
      exchange: '', //折合汇率
      exchange_Cap: '', //折合汇率大写
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      fixedData: {
        selectLoading: true,
        // 申请人列表
        genList: [],
        // 币种列表
        azisList: [],
        // 付款方式列表
        pmasList: [],
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
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
          this.getExchangeRate()
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
    // 计算折合汇率
    getExchangeRate() {
      this.exchange = Number(this.tableData.oaa07) * Number(this.tableData.oaa08)
      this.exchange = this.exchange.toFixed(2)
      this.NumberToChinese(this.exchange)
    },
    //阿拉伯数字转换函数
    toDx(n) {
      switch (n) {
          case "0":
              return "零";
          case "1":
              return "壹";
          case "2":
              return "贰";
          case "3":
              return "叁";
          case "4":
              return "肆";
          case "5":
              return "伍";
          case "6":
              return "陆";
          case "7":
              return "柒";
          case "8":
              return "捌";
          case "9":
              return "玖";
      }
    },
    // 转大写
    NumberToChinese(m){
      m *= 100;
      m += "";
      var length = m.length;

      var result = "";
      for (var i = 0; i < length; i++) {
          if (i == 2) {
            result = "元" + result;
          } else if (i == 6) {
            result = "万" + result;
          } else if (i == 10) {
            result = "亿" + result;
          }
          if (m.charAt(length - i - 1) == 0) {
              if (i != 0 && i != 1) {
                  if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                      result = "零" + result;
                  }
              }
              continue;
          }
          result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
      }
      result += result.charAt(result.length - 1) == '元' ? "整" : "";
      this.exchange_Cap = result;
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
