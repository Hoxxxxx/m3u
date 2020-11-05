<template>
  <div class="workSpace">
    <div class="agreeMsg">
      同意流程
    </div>
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
            <div>编号:2020110213463</div>
            <div>流程名称：固定资产付款(No:20201102134630)张康成</div>
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
                <div class="mainPeo">部门主管审批</div>
              </div>
              <div class="processPeo">
                <img src="../../assets/img/person.png" />
                <span>主办人员：</span>
                <div class="mainSelect">
                  <!-- <el-select
                    v-model="uploadData.member"
                    class="memeberSelect"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in fixedData.members"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select> -->
                  <el-dropdown
                    class="memberSelect"
                    trigger="click"
                    @command="memberSelect"
                  >
                    <div class="el-dropdown-link">
                      <span>{{fixedData.memberMsg}}</span
                      ><img src="../../assets/img/more.png" class="moreImg" />
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item, index) in fixedData.members"
                        :key="index"
                        :command="item"
                        >{{ item.label }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
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
                v-model="uploadData.note"
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
            v-model="uploadData.checked1"
            class="check"
            label="备选项1"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.checked2"
            class="check"
            label="备选项1"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.checked3"
            class="check"
            label="备选项1"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.checked4"
            class="check"
            label="备选项1"
            border
          ></el-checkbox>
        </div>
      </div>
      <div class="remindMember">
        <div class="opinionName">提醒方式</div>
        <div class="checks">
          <el-checkbox
            v-model="uploadData.checked5"
            class="check"
            label="站内信"
            border
          ></el-checkbox>
          <el-checkbox
            v-model="uploadData.checked6"
            class="check"
            label="短信息"
            border
          ></el-checkbox>
        </div>
      </div>
      <div class="remindMember">
        <div class="opinionName">消息内容</div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          v-model="uploadData.msgNote"
        >
        </el-input>
      </div>
      <div class="btns">
        <el-button @click="$router.push('/approvalPro')">返回</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      // 页面固定数据
      fixedData: {
        members: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        memberMsg:"请选择主办人员",
        msgs: [
          { label: "第一个常用语", value: 0 },
          { label: "第二个常用语", value: 0 },
          { label: "第三个常用语", value: 0 },
        ],
      },
      // 需上传的数据
      uploadData: {
        member: "", //下一步的审批人员
        note: "", //流程审批意见
        msgNote:"您有新的流程需要办理，流水号：20201102133656，流程名称：借款申请2222(No:20201102133656)分公司(2)系统管理员",//消息内容
        checked1: "",
        checked2: "",
        checked3: "",
        checked4: "",
        checked5: "",
        checked6: "",
      },
    };
  },
  created() {},
  methods: {
    handleClick() {},
    // 主办人员选择
    memberSelect(command){
      this.fixedData.memberMsg = command.label
    },
    // 常用语选择
    handleCommand(command) {
      console.log(command);
      this.uploadData.note = command.label
    },
  },
};
</script>

<style lang="less">
@import "../../../assets/style/public.less";
.formContent {
  .title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
}
</style>
