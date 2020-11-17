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
          <div class="title">{{workname}}</div>
          <div class="workName">
            <div>业务日期：{{oaa02}}</div>
            <div>申请单编号：{{oaa01}}</div>
          </div>
          <!-- 步骤 -->
          <div class="processBox">
            <!-- 当前步骤 -->
            <div class="curProcess">
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
            <img v-if="fixedData.is_last==1" class="arrowImg" src="../../assets/img/jiantou.png" />
            <!-- 下一步骤 -->
            <div v-if="fixedData.is_last==1" class="curProcess">
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
    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="dataSelect.selectLoading"
      :dialogTitle.sync="dataSelect.dialogTitle"
      :dialogVisible.sync="dataSelect.dialogVisible"
      :headList.sync="dataSelect.headList"
      :bodyData.sync="dataSelect.bodyData"
      :choosedData="dataSelect.choosedData"
      :editType.sync="dataSelect.editType"
      :searchApi="dataSelect.searchApi"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
  </div>
</template>

<script>
import SelectData from "@/components/selectData";
import { usersList,  } from "@/api/basic.js"
import { workflowsList,transact } from "@/api/process_new.js"

export default {
  components: {SelectData},
  data() {
    return {
      workname: '',
      oaa01: '',
      oaa02: '',
      activeTab: "firTab",
      // 页面固定数据
      fixedData: {
        members: [],
        is_last: '',
        now_workFlows: [],
        next_workFlows:[],
        msgs: [
          { label: "同意", value: 0 },
          { label: "拒绝", value: 1 },
        ],
      },
      // 需上传的数据
      uploadData: {
        workid: '',
        content: "", //流程审批意见
        sms_content:"",//消息内容
        sms_next: 1,//下一步办理人员
        sms_notice_user: 1,//当前步骤通知人员
        sms_user: "",//发起人
        sms_mana: "",//当前步骤办理人员
        sms_box: 1,//内部短消息
        sms_phone: "",//手机短信
        sms_mail: "",//邮件
        pertype:2,//审批类型，1：通过，2：拒绝，3：驳回
        next_userid:"",//下一步审批人id
        next_flowid:"",//下一步流程id
      },
      showData:{
        oaa04_show: "", //申请人
        nextInfo_index: ''
      },
      //数据选择弹出框
      dataSelect: {
        editType:"entry",
        selectLoading:false,
        cur_input: "", // 当前点击的输入框
        dialogTitle: "数据选择", //当前弹框的title
        dialogVisible: false, //控制显示隐藏弹框
        headList: [], //表头
        bodyData: [], //表格数据
        choosedData: [], //选中的数据
        searchApi: "", //搜索框的接口地址
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
      },
      // 弹出框表头数据
      tableHead: {
        // 申请人
        head_SQR: [
          { name: "id", title: "员工编号" },
          { name: "name", title: "员工名称" },
        ]
      },
    };
  },
  created() {
    this.initData()
    this.getUsers()
    this.getworkflows()
  },
  methods: {
    // 初始化数据
    initData() {
      this.uploadData.workid =  this.$route.query.workid
      this.workname = this.$route.query.workname
      this.oaa01 =  this.$route.query.oaa01
      this.oaa02 =  this.$route.query.oaa02
    },
    checkNextFlow() {
      if (this.fixedData.next_workFlows.length !== 0) {
        // 获取指定下标的步骤信息
        this.fixedData.next_workFlows.forEach( (item, index) => {
          if (item.fid == this.uploadData.next_flowid) {
            // 获取下标
            this.showData.nextInfo_index = index
            // 如果只有一个审批人，默认选中
            if (this.fixedData.next_workFlows[index].changetype !== '1') {
              if (this.fixedData.next_workFlows[index].flowuser.length > 0) {
                this.uploadData.next_userid = this.fixedData.next_workFlows[index].flowuser[0].id
              }
            } else {
              this.uploadData.next_userid = this.fixedData.members[0].id;
              this.showData.oaa04_show = this.fixedData.members[0].name;
            }
          }
        })
      }
    },
    handleClick() {},
    // 常用语选择
    handleCommand(command) {
      this.uploadData.content = command.label
    },
    submit(){
      transact(this.uploadData).then(res=>{
        if(res.status == 200){
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
          this.$router.push({
            path: `${this.$route.query.url_type}/check`,
            query: {
              workName: this.workName,
              workid: this.uploadData.workid
            },
          });
        }else{
          this.$message.error('出错了！');
        }
      })
    },
    // 获取基础数据
    getUsers(){
      usersList().then(res=>{
        if(res.status == 200){
          this.fixedData.members = res.data
        }else{
          this.$message.error("获取用户列表失败：" + result.error.message);
        }
      })
    },
    getworkflows(){
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const params = {
        workid: this.uploadData.workid
      }
      workflowsList(params).then(res=>{
        loading.close()
        if(res.status == 200){
          this.fixedData.is_last = res.data.workclass_personnel.perid.is_last // 是否最终步
          this.fixedData.now_workFlows = res.data.workclass_personnel.perid // 当前步骤
          this.fixedData.next_workFlows = res.data.workclass_personnel.next_perid // 下一步骤
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
    // 数据选择
    selectDialog(type,rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "SQR":
          let filter_SQR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SQR;
          this.dataSelect.searchApi = "oa/users";
          this.selectLoading = false;
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        default:
          return;
          break;
      }
    },
    selectCancel(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = val;
      this.dataSelect.choosedData = val;
    },
    selectSure(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = [];
      this.dataSelect.choosedData = val;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "SQR":
            this.uploadData.next_userid = val[0].id;
            this.showData.oaa04_show = val[0].name;
            break;
          default:
            return;
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" >
@import "../../assets/style/public.less";
.formContent {
  .title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    text-align: center;
  }
  .mainSelect {
    .selector{
      background-color: #f5f5f5;
      width: 228px;
      height: 26px;
      line-height: 28px;
      border-radius: 4px;
      padding: 0 15px;
      font-size: 16px;
      color: #333333;
    }
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
