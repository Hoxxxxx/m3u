<template>
  <div class="workSpace">
    
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary">打印</el-button>
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
            <div class="title">{{workName}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox editNot">{{ tableData.oaa03 }}</div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row">{{ tableData.oaa05 }}</div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">{{ tableData.oaa04_show }}</div>
                <div class="titlebox">员工编号</div>
                <div class="infobox editNot">{{ tableData.oaa04_gen01 }}</div>
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot last_row">{{ tableData.oaa04_gen04 }}</div>
              </div>
              <!-- 卡片信息 -->
              <div class="title_line">卡片信息</div>
              <div class="form_line">
                <div class="titlebox">财产编号</div>
                <div class="infobox">{{tableData.oaa11}}</div>
                <div class="titlebox">资产主类别</div>
                <div class="infobox">{{tableData.oaa12_show}}</div>
                <div class="titlebox">资产次类别</div>
                <div class="infobox last_row">{{tableData.oaa13_show}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">资产中文名称</div>
                <div class="infobox">{{tableData.oaa14}}</div>
                <div class="titlebox">资产英文名称</div>
                <div class="infobox">{{tableData.oaa15}}</div>
                <div class="titlebox">规格型号</div>
                <div class="infobox last_row">{{tableData.oaa16}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">供应商编号</div>
                <div class="infobox">{{tableData.oaa17}}</div>
                <div class="titlebox">本币单价</div>
                <div class="infobox">{{tableData.oaa18}}</div>
                <div class="titlebox">本币成本</div>
                <div class="infobox last_row">{{tableData.oaa19}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox disabledbox">
                  <el-select
                    v-model="tableData.oaa20"
                    class="select"
                    disabled
                  >
                    <el-option
                      v-for="item in fixedData.azisList"
                      :key="item.azi01"
                      :label="item.azi02"
                      :value="item.azi01"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">原币成本</div>
                <div class="infobox selectbox">{{tableData.oaa21}}</div>
                <div class="titlebox">数量</div>
                <div class="infobox selectbox last_row">{{tableData.oaa22}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">计量单位</div>
                <div class="infobox">{{tableData.oaa23_show}}</div>
                <div class="titlebox">保管人</div>
                <div class="infobox">{{tableData.oaa24}}</div>
                <div class="titlebox">保管部门</div>
                <div class="infobox last_row">{{tableData.oaa25_show}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">存放位置</div>
                <div class="infobox">{{tableData.oaa26_show}}</div>
                <div class="titlebox">分摊方式</div>
                <div class="infobox selectbox disabledbox">
                  <el-select
                    v-model="tableData.oaa27"
                    class="select"
                    disabled
                  >
                    <el-option
                      v-for="item in fixedData.shareList"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">分摊部门</div>
                <div class="infobox last_row">{{tableData.oaa28_show}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">取得日期</div>
                <div class="infobox datebox">
                  <el-date-picker
                    v-model="tableData.oaa29"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    disabled
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">项目编号</div>
                <div class="infobox">{{tableData.oaa30}}</div>
                <div class="titlebox">WBS编号</div>
                <div class="infobox last_row">{{tableData.oaa31}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">入账日期</div>
                <div class="infobox middlebox datebox">
                  <el-date-picker
                    v-model="tableData.oaa32"
                    type="date"
                    format="yyyy/MM/dd"
                    value-format="yyyy/MM/dd"
                    disabled
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">耐用月数</div>
                <div class="infobox middlebox last_row">{{tableData.oaa33}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">构建编号</div>
                <div class="infobox longbox last_row">{{tableData.oaa34_show}}</div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">说明</div>
                <div class="infobox longbox areabox last_row">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa35"
                    maxlength="80"
                    show-word-limit
                    disabled
                  >
                  </el-input>
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
// api
import { workflowsList, editFlow  } from "@/api/process_new";
import { azisList,  } from "@/api/basic";

export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      workid: '',
      workName:"固定资产卡片",//流程名
      tableData: {},
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
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
      fileList_user: [],
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 3965
    this.getAzis()
    this.getworkflows()
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
          this.workName = res.data.workclass_info.title
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
    // ***********获取下拉列表信息************
    getAzis () {
      azisList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
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
