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
                    v-model="value"
                    class="memeberSelect"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      value: "",
    };
  },
  created() {},
  methods: {
    handleClick() {
      console.log(this.activeTab);
    },
  },
};
</script>

<style lang="less">
@import "../../assets/style/public.less";
.processBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  .arrowImg {
    width: 27px;
    height: 27px;
    margin: 0 40px;
  }
  .curProcess {
    width: 400px;
    height: 90px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .processName,
    .processPeo {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 0 10px;
      img {
        width: 16px;
        height: 16px;
      }
      span {
        display: block;
        width: 80px;
        line-height: 26px;
        font-size: 16px;
        color: #666666;
      }
      .mainPeo {
        width: 228px;
        height: 26px;
        line-height: 28px;
        background: #f5f5f5;
        padding: 0 15px;
        font-size: 16px;
        color: #333333;
      }
      .mainSelect {
        width: 258px;
        height: 26px;
      }
      .memeberSelect {
        .el-input{
          width: 258px!important;
          .el-select__caret{
            color: #409EFD;
            font-weight: bold;
          }
        }
        .el-input__inner {
          height: 26px;
          line-height: 26px;
          background: #F5F5F5;
        }
        .el-input__icon {
          line-height: 26px;
        }
        .el-input__suffix {
          width: 56px;
        }
      }
    }
  }
}
</style>
