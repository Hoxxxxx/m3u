<template>
  <div class="h5Home">
    <!-- 头部区域 -->
    <div class="head">
      <header>{{ workname }}</header>
      <div class="tossname"
              :class="tosstype=='1'?'agree':tosstype=='2'?'reject':'back' ">
        {{tossname}}
      </div>
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

      <div class="arrowImg" v-if="tosstype!=='2'"></div>

      <!-- 下一步骤 -->
      <div class="flowBox" v-if="tosstype!=='2'">
        <div class="processName">
          <img src="../../assets/img/step.png" />
          <span>下一步骤：</span>
          <div class="mainSelect">
            <van-dropdown-menu>
              <van-dropdown-item
                v-model="uploadData.next_flowid" 
                :options="fixedData.next_workFlowsList"
                @change="checkNextFlow()"/>
            </van-dropdown-menu>
          </div>
        </div>
        <div class="processPeo">
          <img src="../../assets/img/person.png" />
          <span>主办人员：</span>
          <div class="mainSelect">
            <!-- 未选择流程 -->
            <div v-if="uploadData.next_flowid == ''">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="uploadData.next_userid" 
                  title="请先选择下一步骤"
                  disabled/>
              </van-dropdown-menu>
            </div>
            <div v-if="uploadData.next_flowid !== ''">
              <!-- 可选所有 -->
              <van-dropdown-menu 
                v-if="fixedData.next_workFlows[showData.nextInfo_index].changetype == '1'">
                <van-dropdown-item
                  v-model="uploadData.next_userid" 
                  :options="fixedData.next_memberList"/>
              </van-dropdown-menu>
              <!-- 条件内可选 -->
              <van-dropdown-menu 
                v-if="fixedData.next_workFlows[showData.nextInfo_index].changetype == '2'">
                <van-dropdown-item
                  v-model="uploadData.next_userid" 
                  :options="fixedData.flowuser_memberList"/>
              </van-dropdown-menu>
              <!-- 不可选 -->
              <van-dropdown-menu 
                v-if="fixedData.next_workFlows[showData.nextInfo_index].changetype == '3'">
                <van-dropdown-item
                  v-model="uploadData.next_userid" 
                  disabled
                  :options="fixedData.flowuser_memberList"/>
              </van-dropdown-menu>
            </div>
          </div>
        </div>
      </div>

      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 审批意见/常用语 -->
      <div class="sugg">
        <div class="top">
          <div class="opinionName">审批意见</div>
          <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item 
                v-model="fixedData.content_value" 
                :options="fixedData.msgs"
                title="常用语"
                @change="handleCommand" />
          </van-dropdown-menu>
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
            <van-checkbox 
              v-model="uploadData.sms_next" 
              shape="square"
              checked-color="#409EFD"
              font-size="0.4rem"
              @change="transValue()">下一步办理人员</van-checkbox>
            <van-checkbox 
              v-model="uploadData.sms_notice_user" 
              shape="square"
              checked-color="#409EFD"
              font-size="0.4rem"
              style="margin-left: 0.2rem"
              @change="transValue()">当前步骤通知人员</van-checkbox>
            <van-checkbox 
              v-model="uploadData.sms_user" 
              shape="square"
              checked-color="#409EFD"
              font-size="0.4rem"
              @change="transValue()">发起人</van-checkbox>
            <van-checkbox 
              v-model="uploadData.sms_mana" 
              shape="square"
              checked-color="#409EFD"
              font-size="0.4rem"
              style="margin-left: 0.2rem"
              @change="transValue()">当前步骤办理人员</van-checkbox>
          </div>
        </div>
      </div>
      <hr  style="border:1px solid #F9F9F9;" />
      <!-- 提醒方式 -->
      <div class="remind">
        <div class="remindMember">
          <div class="opinionName">提醒方式</div>
          <div class="checks">
            <van-checkbox 
              v-model="uploadData.sms_box" 
              shape="square"
              checked-color="#409EFD"
              font-size="0.4rem"
              @change="transValue()">内部短消息</van-checkbox>
            <van-checkbox 
              v-model="uploadData.sms_phone" 
              shape="square"
              checked-color="#409EFD"
              font-size="0.4rem"
              style="margin-left: 0.2rem"
              @change="transValue()">手机短信</van-checkbox>
            <van-checkbox 
              v-model="uploadData.sms_mail" 
              shape="square"
              checked-color="#409EFD"
              font-size="0.4rem"
              @change="transValue()">邮件</van-checkbox>
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
      <div class="btn_add">
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
          v-loading.fullscreen.lock="fullscreenLoading"
          @click="submit()"
          >提交</van-button
        >
      </div>
    </footer>
  </div>
</template>

<script>
import SelectData from "@/components/selectData";
import { usersList,  } from "@/api/basic.js"
import { workflowsList,transact } from "@/api/process_new.js"

export default {
  data() {
    return {
      aaa: '',
      fullscreenLoading: false,
      tosstype: '1', // 1:同意；2:拒绝；3:退回
      tossname: '同意流程',
      workname: '',
      // 流程信息
      fixedData: {
        is_last: '',
        now_workFlows: {},
        next_workFlows:[],
        next_workFlowsList: [], // 下一步骤列表
        next_memberList: [], //下一步人员列表(所有)
        flowuser_memberList: [], //下一步人员列表(返回值)
        memberMsg: "请选择主办人员",
        msgs: [
          { text: "同意", value: 0 },
          { text: "拒绝", value: 1 },
        ],
        content_value: '',
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
        pertype: "", //审批类型，1：通过，2：拒绝，3：驳回
        next_userid:"",//下一步审批人id
        next_flowid:"",//下一步流程id
      },
      showData:{
        oaa04_show: "", //申请人
        nextInfo_index: ''
      },
      // 底部操作栏
    };
  },
  created() {
    this.initData()
    this.getUsers()
    // this.getworkflows()
  },
  watch: {
  },
  methods: {
    //********* Content *********
    // 初始化数据
    initData() {
      this.tosstype = this.$route.query.tosstype?this.$route.query.tosstype:''
      this.tossname = this.tosstype=='1'?'同意流程':this.tosstype=='2'?'拒绝流程':'退回流程'
      this.uploadData.workid =  this.$route.query.workid
      this.workname = this.$route.query.workname?this.$route.query.workname:'申请单'
      this.uploadData.pertype = this.tosstype=='1'?'1':this.tosstype=='2'?'2':'3'
    },
    // 获取基础数据
    getUsers(){
      this.fixedData.next_memberList = []
      usersList().then(res=>{
        if(res.status == 200){
          res.data.forEach(item => {
            this.fixedData.next_memberList.push({
              text: item.name,
              value: item.id
            })
          })
        }else{
          this.$message.error("获取用户列表失败：" + result.error.message);
        }
      })
    },
    getworkflows(){
      this.fixedData.next_workFlowsList = []
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const params = {
        workid: this.uploadData.workid,
        type: '1' //手机端
      }
      workflowsList(params)
      .then(res=>{
        loading.close()
        if(res.status == 200){
          this.fixedData.is_last = res.data.workclass_personnel.perid.is_last // 是否最终步
          this.fixedData.now_workFlows = res.data.workclass_personnel.perid // 当前步骤
          // 下一步骤
          if (this.tosstype == '1') {
            this.fixedData.next_workFlows = res.data.workclass_personnel.next_perid // 同意流程
          } else if (this.tosstype == '2') {
            this.fixedData.next_workFlows = [] // 拒绝流程
          } else {
            this.fixedData.next_workFlows = res.data.workclass_personnel.pre_perid // 退回流程
          }
          // 赋值下一步骤列表
          this.fixedData.next_workFlows.forEach( item => {
            this.fixedData.next_workFlowsList.push({
              text: item.flowname,
              value: item.fid
            })
            console.log('1', this.fixedData.next_workFlows)
            console.log('2', this.fixedData.next_workFlowsList)
          })
          this.fixedData.flowuser_memberList
          // 如果下一步骤只有一个可选项，则赋值步骤id
          if (this.fixedData.next_workFlows.length == 1) {
            this.uploadData.next_flowid = this.fixedData.next_workFlows[0].fid
            this.checkNextFlow()
          }
          this.uploadData.sms_content = `您有新的流程需要办理，流水号：${res.data.workclass_info.number}，流程名称：${res.data.workclass_info.title}`
        }else{
          this.$message.error('获取流程信息失败：', res.error.message);
        }
      })
    },
    checkNextFlow() {
      this.flowuser_memberList = []
      if (this.fixedData.next_workFlows.length !== 0) {
        // 获取指定下标（默认选中的下一步骤）的主办人员信息
        this.fixedData.next_workFlows.forEach( (item, index) => {
          if (item.fid == this.uploadData.next_flowid) {
            // 获取下标
            this.showData.nextInfo_index = index
            // 赋值下一步人员列表
            this.fixedData.next_workFlows[index].flowuser.forEach( item => {
              this.fixedData.flowuser_memberList.push({
                text: item.name,
                value: item.id
              })
            })
            console.log('3', this.fixedData.flowuser_memberList)
            // 默认选中审批人列表的第一个审批人
            // changeType：0（取用后端返回人员列表作为下一步备选）/   1 （取用所有公司人员列表作为作为下一步备选）
            if (this.fixedData.next_workFlows[index].changetype !== '1') {
              if (this.fixedData.next_workFlows[index].flowuser.length > 0) {
                this.uploadData.next_userid = this.fixedData.next_workFlows[index].flowuser[0].id
              }
            } else {
              this.uploadData.next_userid = this.fixedData.next_memberList[0].value;
              this.showData.oaa04_show = this.fixedData.next_memberList[0].text;
            }
          }
        })
      }
    },
    
    handleClick() {},
    // 常用语选择
    handleCommand(command) {
      this.uploadData.content = this.fixedData.msgs[command].text;
    },
    transValue(column) {
      this.uploadData.sms_next==true?this.uploadData.sms_next=1:this.uploadData.sms_next=0
      this.uploadData.sms_notice_user==true?this.uploadData.sms_notice_user=1:this.uploadData.sms_notice_user=0
      this.uploadData.sms_user==true?this.uploadData.sms_user=1:this.uploadData.sms_user=0
      this.uploadData.sms_mana==true?this.uploadData.sms_mana=1:this.uploadData.sms_mana=0
      this.uploadData.sms_box==true?this.uploadData.sms_box=1:this.uploadData.sms_box=0
      this.uploadData.sms_phone==true?this.uploadData.sms_phone=1:this.uploadData.sms_phone=0
      this.uploadData.sms_mail==true?this.uploadData.sms_mail=1:this.uploadData.sms_mail=0
    },

    submit() {
      this.fullscreenLoading = true;
      transact(this.uploadData).then(res=>{
        if(res.status == 200){
          this.fullscreenLoading = false;
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.$router.push({
            path: `${this.$route.query.url_type}/check`,
            query: {
              workname: this.workname,
              workid: this.uploadData.workid
            },
          });
        }else{
          this.fullscreenLoading = false;
          this.$message.error('提交失败：'+res.error.message);
        }
      })
    },
    // 底部操作按钮区域
    
    
  },
};
</script>

<style lang="less" scoped>
</style>