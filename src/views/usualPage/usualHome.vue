<template>
  <div class="Container">
    <!-- 顶栏 -->
    <div class="headContainer">
      <!-- 上层 -->
      <div class="topBox">
        <div class="logoBox"></div>
        <div class="titleBox">自定义表单设置</div>
      </div>
      <!-- 下层 -->
      <div class="bottomBox">
        <div class="btns">
          <!-- btn -->
          <div class="btn">
            <div class="icon">
              <i class="el-icon-document-add"></i>
            </div>
            <div class="btnName">
              <span>暂存</span>
            </div>
          </div>
          <!-- btn -->
          <div class="btn">
            <div class="icon">
              <i class="el-icon-view"></i>
            </div>
            <div class="btnName">
              <span>预览</span>
            </div>
          </div>
          <!-- btn -->
          <div class="btn">
            <div class="icon">
              <i class="el-icon-files"></i>
            </div>
            <div class="btnName">
              <span>导入</span>
            </div>
          </div>
          <!-- btn -->
          <div class="btn">
            <div class="icon">
              <i class="el-icon-tickets"></i>
            </div>
            <div class="btnName">
              <span>生成json</span>
            </div>
          </div>
          <!-- btn -->
          <div class="btn">
            <div class="icon">
              <i class="el-icon-connection"></i>
            </div>
            <div class="btnName">
              <span>生成代码</span>
            </div>
          </div>
          <!-- btn -->
          <div class="btn">
            <div class="icon">
              <i class="el-icon-refresh"></i>
            </div>
            <div class="btnName">
              <span>清空</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainContainer">
      <!-- 左侧边栏 -->
      <div class="LEFT">
        <left-Container @activeBtn="getActiveBtn"> </left-Container>
      </div>
      <!-- 右侧边栏 -->
      <div class="RIGHT">
        <right-Container :addCount="addCount" 
                                    :addBtn="addBtn">
        </right-Container>
      </div>
      <!-- 中间内容栏 -->
      <div class="MAIN">
        <!-- houxin -->
        <!-- <main-Container :addCount="addCount" :addBtn="addBtn" :layout="layout"> </main-Container> -->
        <!-- limeiqi -->
        <main-Container :addCount="addCount" :addBtn="addBtn"></main-Container>
      </div>
    </div>
  </div>
</template>

<script>
import leftContainer from "./leftContainer";
import rightContainer from "./rightContainer";
import mainContainer from "./mainContainer";

export default {
  components: {
    leftContainer,
    mainContainer,
    rightContainer,
  },

  data() {
    return {
      // 左侧传入数据
      addCount: 0, //添加按钮计数
      addBtn: "", //用户点击的按钮值
      layout:{},//布局数据
      // 右侧传入数据
    };
  },

  methods: {
    getActiveBtn(btn) {
      this.addBtn = btn;
      this.addCount++;
    },
  },
};
</script>

<style lang="less" scoped>
.Container {
  width: 100%;
  height: 100%;
  min-height: 1024px;
  background: #f0f2f5;
  .headContainer {
    width: 100%;
    height: 96px;
    background: #ffffff;
    .topBox {
      width: 100%;
      height: 40px;
      overflow: hidden;
      position: relative;
      .logoBox {
        width: 90px;
        height: 24px;
        background: url(../../assets/usual/img/logo.png) no-repeat;
        background-size: 90px 24px;
        position: absolute;
        left: 24px;
        top: 8px;
      }
      .titleBox {
        width: 100%;
        height: 20px;
        text-align: center;
        margin: 8px auto;
        font-size: 14px;
        line-height: 20px;
        color: #333333;
        font-weight: bolder;
      }
    }
    .bottomBox {
      width: 100%;
      height: 56px;
      overflow: hidden;
      .btns {
        width: fit-content;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        height: 43px;
        margin: 7px auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .btn {
          width: 80px;
          height: 43px;
          .icon {
            height: 18px;
            font-size: 18px;
            text-align: center;
            color: #666666;
            margin-bottom: 6px;
          }
          .btnName {
            height: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
          }
        }
        .btn:hover {
          cursor: pointer;
          .icon,
          .btnName {
            color: #409efd;
          }
        }
      }
    }
  }
  .mainContainer {
    width: 100%;
    height: calc(100% - 106px);
    min-height: 918px;
    margin-top: 10px;
    position: relative;
    .LEFT {
      width: 260px;
      min-height: 918px;
      height: 100%;
      background: #ffffff;
      position: absolute;
      left: 0;
      padding: 0 5px 0 5px;
      box-sizing: border-box;
      overflow: auto;
    }
    .RIGHT {
      width: 260px;
      min-height: 918px;
      height: 100%;
      background: #ffffff;
      position: absolute;
      right: 0;
      padding: 0 5px 0 5px;
      // box-sizing: border-box;
    }
    .MAIN {
      background: #ffffff;
      width: calc(100% - 550px);
      min-height: 918px;
      height: 100%;
      margin-left: 270px;
      overflow: auto;
    }
  }
}
</style>