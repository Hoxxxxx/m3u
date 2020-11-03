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
        <!-- 公司 -->
        <el-card class="company">
          <el-select
            v-model="company"
            class="companySelect"
            placeholder="请选择公司"
            @change="selected('change')"
          >
            <el-option
              v-for="item in companys"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-card>
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
import { mapMutations } from "vuex";
import { sobsList } from "@/api/basic";

export default {
  data() {
    return {
      workList: [
        {
          name: "一般凭证维护作业aglt110",
          path: "/aglt110",
          pathName: "aglt110",
          workName: "aglt110",
        },
        {
          name: "杂项应付款请款作业aapt120",
          path: "/aapt120",
          pathName: "aapt120",
          workName: "aapt120",
        },
        {
          name: "厂商预付款作业aapt150",
          path: "/aapt150",
          pathName: "aapt150",
          workName: "aapt150",
        },
        {
          name: "付款冲账作业aapt330",
          path: "/aapt330",
          pathName: "aapt330",
          workName: "aapt330",
        },
        {
          name: "借支单维护作业aapt151",
          path: "/aapt151",
          pathName: "aapt151",
          workName: "aapt151",
        },
        {
          name: "报销还款维护作业aapt121",
          path: "/aapt121",
          pathName: "aapt121",
          workName: "aapt121",
        },
        {
          name: "应收账款维护作业axrt300",
          path: "/axrt300",
          pathName: "axrt300",
          workName: "axrt300",
        },
        {
          name: "收款冲账单维护作业axrt400",
          path: "/axrt400",
          pathName: "axrt400",
          workName: "axrt400",
        },
        {
          name: "银行存款收支维护作业anmt302",
          path: "/anmt302",
          pathName: "anmt302",
          workName: "anmt302",
        },
        {
          name: "固定资产维护作业afai100",
          path: "/afai100",
          pathName: "afai100",
          workName: "afai100",
        },
        {
          name: "折旧分录维护作业afai104",
          path: "/afai104",
          pathName: "afai104",
          workName: "afai104",
        },
      ],
      // 公司
      companys: [
        {
          id: 2,
          name: '北京'
        }
      ],
      company: 2,
      userInfo: {
        name: "test",
        id: "007",
        root: true,
      }, //用户信息
    };
  },
  created() {
    this.getCompanyList();
    sessionStorage.setItem("roleId", this.company);
    this.CHANGE_USER_INFO(this.userInfo); //保存用户信息到vuex
    // 清空暂存数据
    sessionStorage.removeItem('nowTheadList')
    sessionStorage.removeItem("allWorksList");
    sessionStorage.removeItem("operation_code");
  },

  methods: {

    ...mapMutations([
      "CHANGE_WORK_INFO",
      "CHANGE_USER_INFO",
      "CHANGE_COMPANY_INFO",
    ]),

    detail(item) {
      this.CHANGE_WORK_INFO(item); //保存当前点击的作业信息到vuex
      this.$router.push({
        name: item.pathName,
        params: {
          workName: item.workName,
        },
      });
    },

    getCompanyList() {
      sobsList()
      .then(result => {
        if (result.status == '200') {
          this.companys = result.data
          this.selected('init')
        } else {
          this.$message.error("获取账套列表失败：" + result.error.message);
        }
      })
    },

    selected(info) {
      sessionStorage.setItem("roleId", this.company);
      this.companys.forEach(item => {
        if (item.id == this.company) {
          let info = {
            name: item.name,
            id: this.company,
          };
          this.CHANGE_COMPANY_INFO(info); //保存当前选中的公司信息到vuex
        }
      })
      if (info == 'change') {
        this.$message.success("切换公司成功！");
      }
    },
  },
};
</script>

<style lang="less">
.headContainer{
  box-shadow: 0px 2px 6px 0px rgba(0, 21, 41, 0.12);
}
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
        min-height: 500px;
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