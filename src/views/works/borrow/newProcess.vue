<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
        <el-button type="primary" class="save">保存</el-button>
        <el-button type="primary" class="next" @click="$router.push('/apply')">下一步</el-button>
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
            <div class="title">出差借款申请</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line  last_line">
                <div class="titlebox">经办人</div>
                <div class="infobox">{{tableData.oaa03}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox">{{tableData.oaa04}}</div>
                <div class="titlebox">联系电话</div>
                <div class="infobox last_row">{{tableData.oaa05}}</div>
              </div>
              <!-- 出差信息 -->
              <div class="title_line">出差信息</div>
              <div class="form_line">
                <div class="titlebox">预计开始时间</div>
                <div class="infobox middlebox">{{tableData.oaa31}}</div>
                <div class="titlebox">预计结束时间</div>
                <div class="infobox middlebox">{{tableData.oaa32}}</div>
                <div class="titlebox">实际开始时间</div>
                <div class="infobox middlebox">{{tableData.oaa33}}</div>
                <div class="titlebox">实际结束时间</div>
                <div class="infobox middlebox last_row">{{tableData.oaa34}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">出差目的</div>
                <div class="infobox longbox">{{tableData.oaa30}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">出差地点</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa35">
                    <el-radio :label="1">一般地区</el-radio>
                    <el-radio :label="2">特殊地区</el-radio>
                  </el-radio-group>
                  {{tableData.oaa36}}
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">交通工具</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa36">
                    <el-radio :label="1">一般地区</el-radio>
                    <el-radio :label="2">特殊地区</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">访问单位</div>
                <div class="infobox longbox">{{tableData.oaa38}}</div>
              </div>
              <div class="form_line  last_line">
                <div class="titlebox">是否需要借款</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa39">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <!-- 借款信息 -->
              <div class="title_line">借款信息</div>
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox">{{tableData.oaa06}}</div>
                <div class="titlebox">借款金额</div>
                <div class="infobox">{{tableData.oaa07}}</div>
                <div class="titlebox">汇率</div>
                <div class="infobox last_row">{{tableData.oaa08}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">收款人</div>
                <div class="infobox">{{tableData.oaa09}}</div>
                <div class="titlebox">账号</div>
                <div class="infobox">{{tableData.oaa10}}</div>
                <div class="titlebox">开户行</div>
                <div class="infobox last_row">{{tableData.oaa11}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">支付方式</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa12">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">借款事由</div>
                <div class="infobox longbox">{{tableData.oaa13}}</div>
              </div>
              <!-- 交际信息 -->
              <div class="title_line">交际信息</div>
              <div class="form_line">
                <div class="titlebox">支出项目</div>
                <div class="infobox middlebox">{{tableData.oaa20}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox middlebox last_row">{{tableData.oaa21}}</div>
              </div>
              <div class="form_line">
                <div class="titlebox">我方参加部门</div>
                <div class="infobox middlebox">{{tableData.oaa22}}</div>
                <div class="titlebox">对方参加部门</div>
                <div class="infobox middlebox">{{tableData.oaa23}}</div>
                <div class="titlebox">我方参加人员</div>
                <div class="infobox middlebox">{{tableData.oaa24}}</div>
                <div class="titlebox">对方参加人员</div>
                <div class="infobox middlebox last_row">{{tableData.oaa25}}</div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">付款预算金额</div>
                <div class="infobox middlebox">{{tableData.oaa26}}</div>
                <div class="titlebox">区分</div>
                <div class="infobox middlebox last_row">{{tableData.oaa27}}</div>
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
      radio: 3,
      tableData: {
        oaa01: '',
        oaa02: this.getCurrentTime(),
        oaa03: '',
        oaa04: '',
        oaa05: '',
        oaa06: '',
        oaa07: '',
        oaa08: '',
        oaa09: '',
        oaa10: '',
        oaa11: '',
        oaa12: '',
        oaa13: '',
        oaa20: '',
        oaa21: '',
        oaa22: '',
        oaa23: '',
        oaa24: '',
        oaa25: '',
        oaa26: '',
        oaa27: '',
        oaa30: '',
        oaa31: '',
        oaa32: '',
        oaa33: '',
        oaa34: '',
        oaa35: '',
        oaa36: '',
        oaa38: '',
        oaa39: '',
        name: '张明',
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
    
    // 获取当前时间 格式:yyyy-MM-dd HH:MM:SS
    getCurrentTime() {
      var date = new Date();//当前时间
      var month = this.zeroFill(date.getMonth() + 1);//月
      var day = this.zeroFill(date.getDate());//日
      var hour = this.zeroFill(date.getHours());//时
      var minute = this.zeroFill(date.getMinutes());//分
      var second = this.zeroFill(date.getSeconds());//秒
      //当前时间
      var curTime = date.getFullYear() + "-" + month + "-" + day
              + " " + hour + ":" + minute + ":" + second;
      return curTime;
    },
    // 补零
    zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    },

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
@import "../../../assets/style/public.less";
</style>
