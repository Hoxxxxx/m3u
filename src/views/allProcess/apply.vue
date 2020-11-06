<template>
  <div class="workSpace">
    <!-- 签批 -->
    <el-card class="formContent">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane name="firTab">
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'firTab' ? 'potActive' : ''"
            ></span>
            <span>签批</span>
          </div>
          <div class="title">固定资产付款</div>
          <div class="workName">
            <span class="code">业务日期：{{oaa02}}</span>
            <span class="name">申请单编号：{{oaa01}}</span>
          </div>
          <!-- 步骤 -->
          <div class="processBox">
            <!-- 当前步骤 -->
            <div class="curProcess">
              <div class="processName">
                <img src="../../assets/img/step.png" />
                <span>当前步骤：</span>
                <div class="mainPeo">第1步：申请人发起申请</div>
              </div>
              <div class="processPeo">
                <img src="../../assets/img/person.png" />
                <span>主办人员：</span>
                <div class="mainPeo">某某人</div>
              </div>
            </div>
            <img class="arrowImg" src="../../assets/img/jiantou.png" />
            <!-- 下一步骤 -->
            <div class="curProcess">
              <div class="processName">
                <img src="../../assets/img/step.png" />
                <span>下一步骤：</span>
                <div class="mainSelect">
                  <el-select
                    v-model="uploadData.workFlow"
                    class="memeberSelect"
                    placeholder="请选择下一步骤"
                  >
                    <el-option
                      v-for="(item,index) in fixedData.workFlows"
                      :key="index"
                      :label="item.title"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="processPeo">
                <img src="../../assets/img/person.png" />
                <span>主办人员：</span>
                <div class="mainSelect">
                  <el-select
                    v-model="uploadData.member"
                    class="memeberSelect"
                    placeholder="请选择主办人员"
                  >
                    <el-option
                      v-for="(item,index) in fixedData.members"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <!-- 流程审批意见 -->
          <div class="opinion">
            <div class="top">
              <div class="opinionName">流程审批意见</div>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  常用语<img src="../../assets/img/more.png" class="moreImg" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in fixedData.msgs"
                    :key="index"
                    :command="item"
                    >{{ item.label }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="note">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入流程审批意见"
                v-model="uploadData.content"
              >
              </el-input>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-card class="messageCont">
      <div class="remindMember">
        <div class="opinionName">提醒相关人员</div>
        <div class="checks">
          <el-checkbox
            v-model="uploadData.sms_next"
            class="check"
            :true-label="1"
            :false-label="0"
            label="下一步办理人员"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.sms_notice_user"
            class="check"
            :true-label="1"
            :false-label="0"
            label="当前步骤通知人员"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.sms_user"
            class="check"
            :true-label="1"
            :false-label="0"
            label="发起人"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.sms_mana"
            class="check"
            :true-label="1"
            :false-label="0"
            label="当前步骤办理人员"
            border
          ></el-checkbox>
        </div>
      </div>
      <div class="remindMember">
        <div class="opinionName">提醒方式</div>
        <div class="checks">
          <el-checkbox
            v-model="uploadData.sms_box"
            class="check"
            :true-label="1"
            :false-label="0"
            label="内部短消息"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.sms_phone"
            class="check"
            :true-label="1"
            :false-label="0"
            label="手机短信"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.sms_mail"
            class="check"
            :true-label="1"
            :false-label="0"
            label="邮件"
            border
          ></el-checkbox>
        </div>
      </div>
      <div class="remindMember">
        <div class="opinionName">消息内容</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          v-model="uploadData.sms_content"
        >
        </el-input>
      </div>
      <div class="btns">
        <el-button @click="$router.go(-1)">返回</el-button>
        <el-button type="primary" @click="submit()">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {usersList,workflowsList} from "@/api/basic.js"
export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      oaa01: '', // 申请单编号
      oaa02: '', // 业务日期
      flowid: '', // 流水号
      flowname: '', // 流程名称
      // 页面固定数据
      fixedData: {
        members: [],
        workFlows:[],
        msgs: [
          { label: "同意", value: 0 },
          { label: "拒绝", value: 1 },
        ],
      },
      // 需上传的数据
      uploadData: {
        workFlow:"",//下一步骤内容
        member: "", //下一步的审批人员
        content: "", //流程审批意见
        sms_content:"您有新的流程需要办理，流水号：20201102133656，流程名称：借款申请2222(No:20201102133656)分公司(2)系统管理员",//消息内容
        sms_next: 1,//下一步办理人员
        sms_notice_user: 1,//当前步骤通知人员
        sms_user: "",//发起人
        sms_mana: "",//当前步骤办理人员
        sms_box: 1,//内部短消息
        sms_phone: "",//手机短信
        sms_mail: "",//邮件
        pertype:1,//审批类型，1：通过，2：拒绝，3：驳回
        next_userid:"",//下一步审批人id
      },
    };
  },
  created() {
    this.getUsers()
    this.getworkflows()
  },
  methods: {
    // ***********获取下拉列表信息************
    getUsers () {
      usersList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.users = result.data
        } else {
          this.$message.error("获取用户列表失败：" + result.error.message);
        }
      })
    },
    // *******************************************
    handleClick() {},
    // 常用语选择
    handleCommand(command) {
      console.log(command);
      this.uploadData.content = command.label;
    },
    submit(){
      console.log(this.uploadData)
    },
    // 获取基础数据
    getUsers(){
      usersList().then(res=>{
        if(res.status == 200){
          this.fixedData.members = res.data
        }else{
          this.$message.error(res.error);
        }
      })
    },
    getworkflows(){
      workflowsList().then(res=>{
        if(res.status == 200){
          this.fixedData.workFlows = res.data
        }else{
          this.$message.error(res.error);
        }
      })
    },
  },
};
</script>

<style lang="less">
@import "../../assets/style/public.less";
.formContent {
  .title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  .mainSelect {
    .el-input {
      font-size: 16px;
      .el-input__inner {
        padding-left: 15px;
        &::-webkit-input-placeholder {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
