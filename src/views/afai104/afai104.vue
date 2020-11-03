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
                <label class="label">系统</label>
                <div class="elInput msgBox">{{ systemNum }}</div>
              </li>
              <li>
                <label class="label">编号</label>
                <div class="elInput msgBox">{{ num }}</div>
              </li>
              <li>
                <label class="label">序号</label>
                <div class="elInput msgBox">{{ numData }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label">类型</label>
                <div class="elInput msgBox">{{ type }}</div>
              </li>
              <li>
                <label class="label">类型说明</label>
                <div class="elInput msgBox">{{ typeMsg }}</div>
              </li>
              <li>
                <label class="label">异动日</label>
                <div class="elInput msgBox">{{ changeDate }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <label class="label">凭证编号</label>
                <div class="elInput msgBox">{{ creNum }}</div>
              </li>
              <li>
                <label class="label">凭证日期</label>
                <div class="elInput msgBox">{{ creDate }}</div>
              </li>
              <li>
                <label class="label">会计年月</label>
                <div class="elInput msgBox">{{ accountDate }}</div>
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
    };
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
        }
      }
    }
  }
}
</style>
