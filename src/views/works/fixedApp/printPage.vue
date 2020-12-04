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

          <!-- 构建信息 -->
          <div class="form_line">
            <div class="titlebox">购置类别</div>
            <div class="infobox last_row longbox">
              <span class="radioItem" v-if="tableData.oaa18==1">全新购置</span>
              <span class="radioItem" v-if="tableData.oaa18==2">升级更换</span>
            </div>
          </div>
          <div class="title_line">构建信息</div>
          <div class="form_line">
            <div class="titlebox">固定资产名称</div>
            <div class="infobox middlebox">{{tableData.oaa12}}</div>
            <div class="titlebox">规格型号</div>
            <div class="infobox middlebox last_row">{{tableData.oaa13}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">计量单位</div>
            <div class="infobox middlebox">{{tableData.oaa14}}</div>
            <div class="titlebox">构建数量</div>
            <div class="infobox middlebox last_row">{{tableData.oaa15}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">计划金额</div>
            <div class="infobox middlebox">{{tableData.oaa16}}</div>
            <div class="titlebox">生产厂家</div>
            <div class="infobox middlebox last_row">{{tableData.oaa17}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">构建时间</div>
            <div class="infobox middlebox">{{tableData.oaa18}}</div>
            <div class="titlebox">使用部门</div>
            <div class="infobox middlebox last_row">{{tableData.oaa19}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">计划内外</div>
            <div class="infobox middlebox">{{tableData.oaa20}}</div>
            <div class="titlebox">采购金额</div>
            <div class="infobox middlebox last_row">{{tableData.oaa21}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">主要参数配置</div>
            <div class="infobox longbox last_row">{{tableData.oaa22}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">构建依据</div>
            <div class="infobox longbox last_row">{{tableData.oaa23}}</div>
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
      activeTab: "firTab",
      workid: '',
      workname:"固定资产申请",//流程名
      tableData: {},
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
      },
      // 表单数据
      fixedData: {
        // 购置列表
        buyList: [
          {
            id: 1,
            label: '全新购置'
          },
          {
            id: 2,
            label: '升级更换'
          }
        ],
      },
      fileList_user: [],
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
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
