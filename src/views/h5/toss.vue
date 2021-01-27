<template>
  <div class="h5Home">
    <!-- 头部区域 -->
    <div class="head">
      <header>{{ formData.workName }}</header>
      <div class="tossName agree">{{tossName}}</div>
    </div>
    <!-- 内容区域 -->
    <div class="cont_toss">
      <!-- 当前步骤 -->
      <div class="flowBox">
        <div class="processName">
          <img src="../../assets/img/step.png" />
          <span>当前步骤：</span>
          <div class="mainPeo">第{{fixedData.now_workFlows.flownum}}步：{{fixedData.now_workFlows.flowname}}</div>
        </div>
        <div class="processPeo">
          <img src="../../assets/img/person.png" />
          <span>主办人员：</span>
          <div class="mainPeo">{{fixedData.now_workFlows.flowuser}}</div>
        </div>
      </div>

      <div class="arrowImg"></div>

      <!-- 下一步骤 -->
      <div class="flowBox">
        <div class="processName">
          <img src="../../assets/img/step.png" />
          <span>下一步骤：</span>
          <div class="mainSelect">
            <el-select
              v-model="uploadData.next_flowid"
              class="memeberSelect"
              placeholder="请选择下一步骤"
              @change="checkNextFlow()"
            >
              <el-option
                v-for="(item,index) in fixedData.next_workFlows"
                :key="index"
                :label="item.flowname"
                :value="item.fid"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="processPeo">
          <img src="../../assets/img/person.png" />
          <span>主办人员：</span>
          <div class="mainSelect">
            <!-- 未选择流程 -->
            <div v-if="uploadData.next_flowid == ''">
              <el-select
                v-model="uploadData.next_userid"
                class="memeberSelect"
                placeholder="请先选择下一步骤"
                disabled
              >
              </el-select>
            </div>
            <div v-if="uploadData.next_flowid !== ''">
              <!-- 可选所有 -->
              <div 
                v-if="fixedData.next_workFlows[showData.nextInfo_index].changetype == '1'"
                class="selector" 
                @click="selectDialog('SQR')">
                  {{showData.oaa04_show}}
              </div>
              <!-- 条件内可选 -->
              <el-select
                v-if="fixedData.next_workFlows[showData.nextInfo_index].changetype == '2'"
                v-model="uploadData.next_userid"
                class="memeberSelect"
                placeholder="请选择主办人员"
              >
                <el-option
                  v-for="(item,index) in fixedData.next_workFlows[showData.nextInfo_index].flowuser"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <!-- 不可选 -->
              <el-select
                v-if="fixedData.next_workFlows[showData.nextInfo_index].changetype == '3'"
                v-model="uploadData.next_userid"
                class="memeberSelect"
                disabled
              >
                <el-option
                  v-for="(item,index) in fixedData.next_workFlows[showData.nextInfo_index].flowuser"
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

      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 审批意见/常用语 -->
      <div class="sugg">
        <div class="top">
          <div class="opinionName">审批意见</div>
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
        <!-- 文字区域 -->
        <div class="note">
          <el-input
            placeholder="请输入流程审批意见"
            v-model="uploadData.content"
          >
          </el-input>
        </div>
      </div>
      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 提醒相关人员 -->
      <div class="remind">
        <div class="remindMember">
          <div class="opinionName">提醒相关人员</div>
          <div class="checks">
            <el-checkbox
              v-model="uploadData.sms_next"
              class="check"
              size="mini"
              :true-label="1"
              :false-label="0"
              label="下一步办理人员"
              border
            ></el-checkbox>
            <el-checkbox
              v-model="uploadData.sms_notice_user"
              size="mini"
              class="check"
              :true-label="1"
              :false-label="0"
              label="当前步骤通知人员"
              border
              style="margin-left: 0.2rem"
            ></el-checkbox>
            <el-checkbox
              v-model="uploadData.sms_user"
              size="mini"
              class="check"
              :true-label="1"
              :false-label="0"
              label="发起人"
              border
            ></el-checkbox>
            <el-checkbox
              v-model="uploadData.sms_mana"
              size="mini"
              class="check"
              :true-label="1"
              :false-label="0"
              label="当前步骤办理人员"
              border
              style="margin-left: 0.2rem"
            ></el-checkbox>
          </div>
        </div>
      </div>
      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 提醒方式 -->
      <div class="remind">
        <div class="remindMember">
          <div class="opinionName">提醒方式</div>
          <div class="checks">
            <el-checkbox
              v-model="uploadData.sms_box"
              size="mini"
              class="check"
              :true-label="1"
              :false-label="0"
              label="内部短消息"
              border
              
            ></el-checkbox>
            <el-checkbox
              v-model="uploadData.sms_phone"
              size="mini"
              class="check"
              :true-label="1"
              :false-label="0"
              label="手机短信"
              border
              style="margin-left: 0.2rem"
            ></el-checkbox>
            <el-checkbox
              v-model="uploadData.sms_mail"
              size="mini"
              class="check"
              :true-label="1"
              :false-label="0"
              label="邮件"
              border
            ></el-checkbox>
          </div>
        </div>
      </div>
      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 消息内容 -->
      <div class="msg">
        <div class="opinionName">消息内容</div>
        <van-field
          class="note"
          v-model="uploadData.sms_content"
          autosize
          type="textarea"
        />
      </div>
      
    </div>
    <!-- 底部区域 -->
    <footer>
      <van-button
        class="btn_return"
        plain
        size="small"
        color="#409EFD"
        type="info"
        >返回</van-button
      >
      <van-button
        class="btn_nextUp"
        size="small"
        color="#409EFD"
        type="info"
        >提交</van-button
      >
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tossName: '同意流程',
      formData: {
        workName: "出差申请单",
      },
      // 流程信息
      fixedData: {
        members: [],
        is_last: '',
        now_workFlows: {
          flownum: 1,
          flowname: "当前步骤名",
          flowuser: "刘芳菲"
        },
        next_workFlows:[],
        memberMsg: "请选择主办人员",
        msgs: [
          { label: "同意", value: 0 },
          { label: "拒绝", value: 1 },
        ],
      },
      // 需上传的数据
      uploadData: {
        workid: '',
        content: "", //流程审批意见
        sms_content: "", //消息内容
        sms_next: 1, //下一步办理人员
        sms_notice_user: 1, //当前步骤通知人员
        sms_user: "", //发起人
        sms_mana: "", //当前步骤办理人员
        sms_box: 1, //内部短消息
        sms_phone: "", //手机短信
        sms_mail: "", //邮件
        pertype: 1, //审批类型，1：通过，2：拒绝，3：驳回
        next_userid:"",//下一步审批人id
        next_flowid:"",//下一步流程id
      },
      showData:{
        oaa04_show: "", //申请人
        nextInfo_index: ''
      },
      // 底部操作栏
      showMore: false, //其他
      actions: [
        {
          title: "查看申请单详细信息1",
          url: "https://www.baidu.com/",
        },
        {
          title: "查看申请单详细信息2",
          url: "https://www.baidu.com/",
        },
        {
          title: "查看申请单详细信息3",
          url: "https://www.baidu.com/",
        },
      ],
    };
  },
  created() {
  },
  watch: {
  },
  methods: {
    //********* Content *********
    handleClick() {},
    // 常用语选择
    handleCommand(command) {
      this.uploadData.content = command.label;
    },
    // 底部操作按钮区域
    
    
  },
};
</script>

<style lang="less" scoped>
</style>