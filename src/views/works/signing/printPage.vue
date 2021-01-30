<template>
  <div class="printSpace">
    <!-- 页眉 -->
    <div class="pageHead">
      <span class="company">华录新媒</span>
      <span class="Date">{{ timeNow }}</span>
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
            <div class="infobox">{{ tableData.oaa03_show }}</div>
            <div class="titlebox">申请人</div>
            <div class="infobox">{{ tableData.oaa04_show }}</div>
            <div class="titlebox">所属部门</div>
            <div class="infobox last_row">{{ tableData.oaa04_gen04 }}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">联系电话</div>
            <div class="infobox longbox">{{ tableData.oaa05 }}</div>
          </div>
          <div class="title_line">签约方信息</div>
          <div class="form_line">
            <div class="titlebox">签约方</div>
            <div class="infobox longbox">
              <span class="radioItem" v-if="tableData.oaa10 == 1">供应商</span>
              <span class="radioItem" v-if="tableData.oaa10 == 2">客户</span>
            </div>
          </div>
          <div>
            <div v-if="tableData.oaa10 == 1">
              <div class="title_line">供应商信息</div>
              <div class="form_line">
                <div class="titlebox">厂商简称</div>
                <div class="infobox">{{ tableData.oab01 }}</div>
                <div class="titlebox">厂商全称</div>
                <div class="infobox">{{ tableData.oab02 }}</div>
                <div class="titlebox">惯用税种</div>
                <div class="infobox last_row">{{ tableData.oab03 }}</div>
              </div>
              <div class="title_line">银行信息</div>
              <div
                class="form_line"
                v-for="(line, index) in tableData.oac"
                :key="index"
                style="position: relative"
              >
                <div class="titlebox">账户名称></div>
                <div class="infobox">{{ line.oac01 }}</div>
                <div class="titlebox">银行账号</div>
                <div class="infobox">{{ line.oac02 }}</div>
                <div class="titlebox">开户行名称</div>
                <div class="infobox last_row">{{ line.oac03 }}</div>
              </div>
            </div>
            <div v-else>
              <div class="title_line">客户信息</div>
              <div class="form_line">
                <div class="titlebox">客户简称</div>
                <div class="infobox">{{ tableData.oad01 }}</div>
                <div class="titlebox">客户全称</div>
                <div class="infobox">{{ tableData.oad02 }}</div>
                <div class="titlebox">惯用税种</div>
                <div class="infobox last_row">{{ tableData.oad03 }}</div>
              </div>
              <div class="title_line">开票信息</div>
              <div class="form_line">
                <div class="titlebox">名称</div>
                <div class="infobox">{{ tableData.oad04 }}</div>
                <div class="titlebox">纳税人识别号</div>
                <div class="infobox">{{ tableData.oad05 }}</div>
                <div class="titlebox">地址</div>
                <div class="infobox last_row">{{ tableData.oad06 }}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">银行账号</div>
                <div class="infobox">{{ tableData.oad07 }}</div>
                <div class="titlebox">开户行</div>
                <div class="infobox">{{ tableData.oad08 }}</div>
                <div class="titlebox">电话</div>
                <div class="infobox last_row">{{ tableData.oad09 }}</div>
              </div>
            </div>
          </div>
          <div class="form_line">
            <div class="titlebox">说明</div>
            <div class="infobox longbox infoShow_print">{{ tableData.oaa12 }}</div>
          </div>
          <div class="form_line last_line">
            <div class="titlebox">备注</div>
            <div class="infobox longbox infoShow_print">{{ tableData.oaa13 }}</div>
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
          placement="top"
        >
          <el-card>
            <p class="step">第{{ index + 1 }}步：{{ item.title }}</p>
            <p class="result">
              <template>
                <p v-if="item.pertype == '99'">通过</p>
                <p v-if="item.pertype == '0'" class="handling">审批中</p>
                <p v-if="item.pertype == '2'">拒绝</p>
                <p v-if="item.pertype == '3'">退回</p>
                <p v-if="item.pertype == '5'">审批结束</p>
              </template>
            </p>
            <p class="admin">{{ item.name }} {{ item.date }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { timeFmt, OpenLoading } from "@/utils/utils.js";
// api
import { workflowsList } from "@/api/process_new.js";

export default {
  components: {},
  data() {
    return {
      timeNow: timeFmt(),
      overloading: "", //加载定时器
      workid: "",
      workname: "供应商和客户维护申请单",
      activeTab: "firTab",
      tableData: {},
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid;
    this.getworkflows();
  },
  methods: {
    // ***********获取流程信息************
    getworkflows() {
      const loading = OpenLoading(this, 1);
      const params = {
        workid: this.workid,
      };
      workflowsList(params).then((res) => {
        if (res.status == 200) {
          loading.close();
          clearTimeout(this.overloading);
          this.tableData = res.data.workclass_info.from_data;
          this.workname = res.data.workclass_info.title;
          this.workclass_perflow = res.data.workclass_perflow;
          this.oazShow = res.data.workclass_flow.erp_turn;
          setTimeout(() => {
            // 打印
            window.print();
          }, 500);
        } else {
          loading.close();
          clearTimeout(this.overloading);
          this.$message.error("获取流程信息失败：", res.error.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
.infobox {
  position: relative;
  .columLine {
    position: absolute;
    height: 40px;
    width: 1px;
    left: 278px;
    background: #cccccc;
  }
}
</style>
