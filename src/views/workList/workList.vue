<template>
  <div class="workList">
    <div class="contentBox">
      <!-- 菜单栏 -->
      <div class="menu">
        <span class="menuTitle">财务会计</span>
        <ul class="menuList">
          <li class="menuItem">作业管理</li>
        </ul>
      </div>
      <div class="cardBox">
        <!-- 作业列表 -->
        <el-card class="content">
          <ul class="workUl">
            <li class="workItem" v-for="(item, index) in workList" :key="index">
              <span class="workName">{{ item.name }}</span>
              <span class="runBtn" @click="detail(item)">运行</span>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      workList: [
        {
          name: "新建流程",
          path: "/newPro",
        },
        {
          name: "审批流程",
          path: "/approvalPro",
        },
        {
          name: "查看",
          path: "/check",
        },
        {
          name: "外地差旅报销单",
          path: "/travelExpense",
        },
      ]
    };
  },
  created() {
  },

  methods: {
    detail(item) {
      this.$router.push(item.path);
    },
  },
};
</script>

<style lang="less">
.workList {
  padding: 0 30px;
  .contentBox {
    padding-top: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // 菜单栏
    .menu {
      min-width: 230px;
      .menuTitle {
        font-size: 14px;
        color: #999;
        font-weight: bold;
      }
      .menuList {
        margin-top: 20px;
        .menuItem {
          height: 42px;
          color: #409efd;
          font-size: 16px;
          background: rgba(64, 158, 253, 0.2);
          font-weight: bold;
          line-height: 42px;
          padding: 0 20px;
          border-radius: 8px;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }
    .cardBox {
      .company {
        min-width: 700px;
        .el-card__body {
          padding: 20px 0;
        }
        .companySelect {
          width: 100%;
          .el-input__inner {
            border: none;
            color: #409efd;
            font-size: 16px;
            font-weight: bold;
            padding: 0 50px;
            &::placeholder {
              font-size: 16px;
              font-weight: bold;
            }
          }
          .el-input__suffix {
            right: 50px;
          }
          .el-select-dropdown__item {
            padding: 0 50px !important;
          }
        }
      }

      // 作业列表
      .content {
        min-width: 700px;
        background: #fff;
        .workUl {
          .workItem {
            height: 54px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            border-bottom: 1px solid #f0f3f7;
            .workName {
              font-size: 16px;
              color: #333333;
              font-weight: 600;
            }
            .runBtn {
              font-size: 14px;
              color: #409efd;
              font-weight: 600;
              cursor: pointer;
            }
          }
        }
      }
    }

    &::after {
      content: "";
      display: block;
      visibility: hidden;
      width: 230px;
    }
  }
}
</style>