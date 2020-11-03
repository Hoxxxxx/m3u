<template>
  <div class="workDetail">
    <!-- 顶部菜单 -->
    <div class="menuOuter">
      <div class="menuList">
        <ul v-if="displayType == 'show'">
          <li @click="entryClick()">
            <span class="iconfont">&#xe797;</span>
            <span>录入</span>
          </li>
          <li @click="changeClick()">
            <span class="iconfont">&#xe791;</span>
            <span>更改</span>
          </li>
          <li>
            <span class="iconfont">&#xe7c3;</span>
            <span>删除</span>
          </li>
          <li>
            <span class="iconfont">&#xe7bc;</span>
            <span>复制</span>
          </li>
          <li>
            <span class="iconfont">&#xe7b9;</span>
            <span>单身</span>
          </li>
          <li>
            <span class="iconfont">&#xe7d8;</span>
            <span>打印</span>
          </li>
          <li>
            <span class="iconfont">&#xe7de;</span>
            <span>汇出</span>
          </li>
          <li @click="searchClick()">
            <span class="iconfont">&#xe8ef;</span>
            <span>查询</span>
          </li>
          <li>
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li>
            <span class="iconfont">&#xe7ed;</span>
            <span>上笔</span>
          </li>
          <li>
            <input type="text" class="numInput" />
            <span>指定笔</span>
          </li>
          <li>
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li>
            <span class="iconfont">&#xe7eb;</span>
            <span>末一笔</span>
          </li>
        </ul>
        <div v-else class="saveBtns">
          <el-button class="cancel" @click="cancel()">取消</el-button>
          <el-button class="sure" type="primary" @click="sure()"
            >确定</el-button
          >
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <el-card class="content">
      <!-- 切换按钮 -->
      <el-tabs v-model="curPane" @tab-click="handleClick">
        <!-- 基本资料 -->
        <el-tab-pane label="基本资料" name="0">
          <!-- 表单区 -->
          <div class="forms">
            <!-- left -->
            <ul class="left">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >收支单号</label
                >
                <!-- <el-select
                  v-model="systemNum"
                  placeholder="请选择凭证编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in serialNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="shortInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ systemNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ systemNum }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >收支日期</label
                >
                <el-date-picker
                  v-model="num"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ num }}</div>
              </li>
              <li>
                <label class="label">部门编号</label>
                <!-- <el-select
                  v-model="numData"
                  placeholder="请选择凭证编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in serialNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="shortInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ numData }}
                </div>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
              <li>
                <label class="label">部门简称</label>
                <el-input
                  v-model="numData"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
              <li>
                <label class="label">现金变动码</label>
                <!-- <el-select
                  v-model="numData"
                  placeholder="请选择凭证编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in serialNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="shortInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ numData }}
                </div>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
              <li>
                <label class="label">变动码说明</label>
                <el-input
                  v-model="numData"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >入账类型</label
                >
                <el-select
                  v-model="type"
                  placeholder="请选择凭证编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in serialNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ type }}</div>
              </li>
              <li>
                <label class="label">客户编号</label>
                <!-- <el-input
                  v-model="numData"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input> -->
                <div
                  class="shortInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ typeMsg }}
                </div>
                <div class="elInput msgBox" v-else>{{ typeMsg }}</div>
              </li>
              <li>
                <label class="label">客户简称</label>
                <el-input
                  v-model="changeDate"
                  class="elInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ changeDate }}</div>
              </li>
              <li>
                <label class="label">Invoice NO.</label>
                <!-- <el-select
                  v-model="numData"
                  placeholder="请选择凭证编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in serialNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="shortInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ numData }}
                </div>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
              <li>
                <label class="label">审核码</label>
                <el-select
                  v-model="numData"
                  placeholder="请选择凭证编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  :disabled="editType == 'search' ? false : true"
                >
                  <el-option
                    v-for="item in serialNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
              <li>
                <label class="label">支付类型</label>
                <el-select
                  v-model="numData"
                  placeholder="请选择凭证编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in serialNumbers"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <ul>
                  <li>
                    <div class="checkBox">
                      <label class="label" style="margin-right: 12px"
                        >暂收</label
                      >
                      <el-checkbox
                        v-model="creDate"
                        :disabled="editType == 'search' ? false : true"
                      ></el-checkbox>
                    </div>
                  </li>
                  <li>
                    <label class="label" style="width: 100px">暂收科目</label>
                    <!-- <el-select
                      v-model="creDate"
                      placeholder="请选择凭证编号"
                      class="elInput"
                      v-if="displayType == 'edit'"
                    >
                      <el-option
                        v-for="item in serialNumbers"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select> -->
                    <div
                      class="shortInput msgBox edit"
                      v-if="displayType == 'edit'"
                      @click="selectDialog('serialNumber')"
                    >
                      {{ creDate }}
                    </div>
                    <div class="shortInput msgBox" v-else>{{ creDate }}</div>
                  </li>
                </ul>
                <div class="img"></div>
              </li>
              <li>
                <label class="label">科目名称</label>
                <el-input
                  v-model="accountDate"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ accountDate }}</div>
              </li>
              <li>
                <label class="label">凭证编号</label>
                <el-input
                  v-model="numData"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
              <li>
                <label class="label">凭证日期</label>
                <el-date-picker
                  v-model="numData"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  :disabled="editType == 'search' ? false : true"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ numData }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 状态 -->
        <el-tab-pane label="状态" name="1">
          <div class="forms states">
            <ul class="left">
              <li>
                <label class="label">资料录入者</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataOwner }}
                </div>
              </li>
              <li>
                <label class="label">资料更改者</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataChanger }}
                </div>
              </li>
              <li>
                <label class="label">资料有效码</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataOwnerDepart }}
                </div>
              </li>
              <li>
                <label class="label">资料录入部门</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataChangeTime }}
                </div>
              </li>
              <li>
                <label class="label">资料录入日期</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataChangeTime }}
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="tableCard">
      <Table :displayType="displayType" :editType="editType"></Table>
    </el-card>

    <!-- 右边浮窗 -->
    <FixedBtns
      v-if="displayType == 'show'"
      :Btns_List="Btns_List"
      @handAudit="handAudit"
      @auditCancel="auditCancel"
      @entryPapers="entryPapers"
      @proofPosting="proofPosting"
      @reductPosting="reductPosting"
      @sourceQuery="sourceQuery"
    ></FixedBtns>
    <!-- 审核弹窗 -->
    <Audit
      :auditVisible.sync="auditVisible"
      :auditSuccessVisible.sync="auditSuccessVisible"
      :auditFailVisible.sync="auditFailVisible"
      :failData="failData"
      @auditDialogCancel="auditDialogCancel"
      @auditDialogSure="auditDialogSure"
      @sureSuccess="sureSuccess"
      @sureFail="sureFail"
    ></Audit>
    <!-- 取消审核弹窗 -->
    <CancelAudit
      :auditCancelVisible.sync="auditCancelVisible"
      :auditCancelSuccessVisible.sync="auditCancelSuccessVisible"
      :auditCancelFailVisible.sync="auditCancelFailVisible"
      :auditCancel_fileData="auditCancel_fileData"
      @auditcancel_Cancel="auditcancel_Cancel"
      @auditCancel_Sure="auditCancel_Sure"
      @sure_auditSuccess="sure_auditSuccess"
      @sure_auditFail="sure_auditFail"
    ></CancelAudit>
  </div>
</template>

<script>
import FixedBtns from "@/components/fixedBtns";
import Audit from "@/components/audit";
import CancelAudit from "@/components/auditCancel";
import Table from "./Table";
import { dateFmt } from "../../utils/utils";
export default {
  components: {
    FixedBtns,
    Audit,
    CancelAudit,
    Table,
  },
  data() {
    return {
      serialNumbers: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      curPane: 0, //当前tabs页
      displayType: "show", // 展示类型：show:显示状态  edit:编辑状态
      editType: "change", //编辑类型： entry:录入  change:更改  search:查询
      systemNum: "", //系统
      num: "", //编号
      numData: "", //序号
      type: "", //类型
      typeMsg: "", //类型说明
      changeDate: "", //异动日
      creNum: "", //凭证编号
      creDate: "", //凭证日期
      accountDate: "", //会计年月
      // 状态栏数据
      dataOwner: "", //资料所有者
      dataChanger: "", //资料更改者
      dataChangeTime: "", //资料更改日
      dataOwnerDepart: "", //资料所有部门
      // 右侧浮窗
      Btns_List: [
        { name: "审核", method: "handAudit" },
        { name: "取消审核", method: "auditCancel" },
        { name: "分录底稿", method: "entryPapers" },
        { name: "凭证过账", method: "proofPosting" },
        { name: "过账还原", method: "reductPosting" },
        { name: "抛转来源查询", method: "sourceQuery" },
      ],
      // 审核弹出框
      auditVisible: false,
      auditSuccessVisible: false, //成功弹窗
      auditFailVisible: false, //失败弹窗
      failData: [], //失败时的表格数据
      // 取消审核弹出框
      auditCancelVisible: false,
      auditCancelSuccessVisible: false, //成功弹窗
      auditCancelFailVisible: false, //失败弹窗
      auditCancel_fileData: [], //失败时的表格数据
    };
  },
  watch: {
    serialDate(val) {
      this.serialDate = dateFmt(val);
    },
  },
  methods: {
    // tabs切换
    handleClick(tab, event) {},
    // 录入
    entryClick() {
      this.displayType = "edit";
      this.editType = "entry";
    },
    // 修改
    changeClick() {
      this.displayType = "edit";
      this.editType = "change";
    },
    // 查询
    searchClick() {
      this.displayType = "edit";
      this.editType = "search";
    },
    // 取消
    cancel() {
      this.displayType = "show";
    },
    // 确定
    sure() {
      this.displayType = "show";
    },
    // 右边悬浮功能区域点击事件
    // 分录底稿
    entryPapers() {
      this.$router.push({
        path: "entryPapers",
      });
    },
    handAudit() {
      this.auditVisible = true;
      console.log("审核");
    },
    auditCancel() {
      this.auditCancelVisible = true;
      console.log("取消审核");
    },
    proofPosting() {
      console.log("凭证过账");
    },
    reductPosting() {
      console.log("过账还原");
    },
    sourceQuery() {
      console.log("抛转来源查询");
    },
    // *************审核弹出框的事件************
    auditDialogCancel() {
      this.auditVisible = false;
    },
    auditDialogSure(val) {
      this.auditVisible = false;
      this.auditSuccessVisible = true;
      console.log(val);
    },
    // 弹出框成功时的事件
    sureSuccess() {
      this.auditSuccessVisible = false;
    },
    // 弹出框失败时的事件
    sureFail() {
      this.auditFailVisible = false;
    },
    // ******************END*******************

    // *************取消审核弹出框的事件************
    auditcancel_Cancel() {
      this.auditCancelVisible = false;
    },
    auditCancel_Sure(val) {
      this.auditCancelVisible = false;
      this.auditCancelFailVisible = true;
      console.log(val);
    },
    // 弹出框成功时的事件
    sure_auditSuccess() {
      this.auditCancelSuccessVisible = false;
    },
    // 弹出框失败时的事件
    sure_auditFail() {
      this.auditCancelFailVisible = false;
    },
    // ******************END*******************
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
.workDetail {
  // 内容区域
  .content {
    width: 1440px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 0 30px;
    // 表单区域
    .forms {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f3f7;
      .left,
      .center,
      .right {
        width: 370px;
        > li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          .checkBox {
            display: flex;
            flex-direction: row;
            align-items: center;
            .label {
              margin-right: 12px;
            }
          }
          > ul {
            width: 260px;
            > li {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
              &:last-child {
                margin-bottom: 0;
              }
              .shortInput {
                width: 180px !important;
              }
              .msgBox {
                width: 180px !important;
              }
            }
          }
          .img {
            width: 86px;
            height: 86px;
            background: #f5f7fa;
            border: 1px solid #e4e7ed;
          }
        }
      }
    }
  }
}
</style>
