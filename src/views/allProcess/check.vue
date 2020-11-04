<template>
  <div class="workSpace">
    
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
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
            <div class="title">固定资产付款</div>
            <div class="table_Info">
              <span class="code">编号：20201102134</span>
              <span class="name">流程名称：固定资产付款(No:20201102134630)张康成</span>
            </div>
            <div class="tableBox">
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.company == '' ? 'nulldata' : ''">{{tableData.company}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox last_row" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.company == '' ? 'nulldata' : ''">{{tableData.company}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox last_row" :class="tableData.company == '' ? 'nulldata' : ''">{{tableData.company}}</div>
              </div>
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox last_row" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox" :class="tableData.name == '' ? 'nulldata' : ''">{{tableData.name}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox last_row" :class="tableData.company == '' ? 'nulldata' : ''">{{tableData.company}}</div>
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
              <span class="name">流程名称：固定资产付款(No:20201102134630)张康成</span>
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
          <div class="saveItem" v-for="(item,index) in fileList" :key="index">
            <i class="el-icon-document" style="margin-right: 7px"></i>
            <span>{{item.name}}</span>
            <div class="btnBox">
              <el-button type="text">预览</el-button>
              <el-button type="text">下载</el-button>
            </div>
          </div>
        </div>
        <!-- 上传部分 -->
        <el-upload
          class="upload_annex"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
                <p class="admin">分公司(2)系统管理员	2020-11-02 13:37:42</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <p class="step">第二步：部门主管审批 (主办：部门主管)</p>
                <p class="result handling">流程办理中</p>
                <p class="admin">分公司(2)系统管理员	2020-11-02 13:37:42</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
      </div>
    </el-card>

  </div>
</template>

<script>
// import FixedBtns from "@/components/fixedBtns";

export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      tableData: {
        name: '张明张明张明张明张明张明张明张明张明张明张明张明张明张明张明张明',
        company: ''
      },
      fileList: [
        {
          name: 'food.jpeg', 
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, 
        {
          name: 'food2.jpeg', 
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
    };
  },
  created() {},
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
</style>
