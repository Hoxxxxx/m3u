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
            <div class="infobox last_row">{{ tableData.oaa06_show }}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">联系电话</div>
            <div class="infobox longbox">{{ tableData.oaa05 }}</div>
          </div>
          <!-- 借款信息 -->
          <div class="title_line">合同信息</div>
          <div class="form_line">
            <div class="titlebox">合同编号</div>
            <div class="infobox">{{ tableData.oaa16 }}</div>
            <div class="titlebox">合同名称</div>
            <div class="infobox">{{ tableData.oaa11 }}</div>
            <div class="titlebox">合同金额</div>
            <div class="infobox last_row">{{ tableData.oaa12 }}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">签约方</div>
            <div class="infobox longbox selectbox">
              <el-radio-group
                class="radioGroup"
                style="margin-right: 120px"
                v-model="tableData.oaa13"
              >
                <el-radio :label="1" disabled>供应商</el-radio>
                <el-radio :label="2" disabled>客户</el-radio>
              </el-radio-group>
            </div>
            <div class="columLine"></div>
            <div class="infobox last_row">{{ tableData.oaa14_show }}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">合同类型</div>
            <div class="infobox">{{ tableData.oaa15_show }}</div>
            <div class="titlebox">合同开始日期</div>
            <div class="infobox">{{ tableData.oaa17 }}</div>
            <div class="titlebox">合同结束日期</div>
            <div class="infobox last_row">{{ tableData.oaa18 }}</div>
          </div>
          <!-- <div class="form_line">
            <div class="titlebox">合同文件</div>
            <div class="infobox longbox">{{ tableData.oaa12_show }}</div>
          </div> -->
          <div class="form_line">
            <div class="titlebox">说明</div>
            <div class="infobox longbox infoShow_print">{{ tableData.oaa21 }}</div>
          </div>
          <div class="form_line last_line">
            <div class="titlebox">备注</div>
            <div class="infobox longbox infoShow_print">{{ tableData.oaa20 }}</div>
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
import { azisList, pmasList } from "@/api/basic";
import { workflowsList } from "@/api/process_new.js";

export default {
  components: {},
  data() {
    return {
      timeNow: timeFmt(),
      overloading: "", //加载定时器
      workid: "",
      workname: "借款申请",
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
    goPrint() {
      let routeUrl = this.$router.resolve({
        path: "printPage",
        query: {
          workid: this.workid,
        },
      });
      window.open(routeUrl.href, "_blank");
    },
    handleClick() {
      // console.log(this.activeTab);
    },
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
