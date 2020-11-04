<template>
  <div class="workSpace">
    <div class="rejectMsg">
      拒绝流程
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
                  <el-select
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
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <!-- 流程审批意见 -->
          <div class="opinion">
            <div class="top">
              <div class="opinionName">流程审批意见</div>
              <div>
                <el-select
                  v-model="fixedData.opinion"
                  class="opinionSelect"
                  placeholder="常用语"
                  @change="opinionChange"
                >
                  <el-option
                    v-for="item in fixedData.opinions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
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
        <div class="msgBox">
          您有新的流程需要办理，流水号：20201102133656，流程名称：借款申请2222(No:20201102133656)分公司(2)系统管理员
        </div>
      </div>
      <div class="btns">
        <el-button>返回</el-button>
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
        opinion: "",
        opinions: [
          {
            value: "1",
            label: "黄金糕123",
          },
          {
            value: "2",
            label: "黄金糕456",
          },
        ],
      },
      // 需上传的数据
      uploadData: {
        member: "", //下一步的审批人员
        note: "", //流程审批意见
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
    handleClick() {
      console.log(this.activeTab);
    },
    opinionChange(val) {
      this.fixedData.opinion = "常用语";
      this.uploadData.note = val;
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
}
</style>
