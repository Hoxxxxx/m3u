<template>
  <div class="Container">
    <!-- 顶栏 -->
    <div class="headContainer">
      <div class="main">
        <!-- 上层 -->
        <div class="topBox">
          <div class="logoBox"></div>
          <div class="titleBox">自定义表单设置</div>
        </div>
        <!-- 下层 -->
        <div class="bottomBox"></div>
      </div>
    </div>
    <div class="mainContainer">
      <div class="main">
        <!-- 左侧边栏 -->
        <div class="leftContainer"></div>
        <!-- 右侧边栏 -->
        <div class="rightContainer"></div>
        <!-- 中间内容栏 -->
        <div class="middleContainer">
          <!-- 无内容 -->
          <div class="emptyMsg"><span>请选择左侧控件</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.Container {
  width: 100%;
  background: #F5F5F5;
  .headContainer{
    width: 100%;
    height: 96px;
    background: lightskyblue;
    .main{
      width: 1440px;
      height: 96px;
      margin: 0 auto;
      background: #FFFFFF;
      .topBox{
        width: 100%;
        height: 40px;
        display: flex;
        overflow: hidden;
        .logoBox{
          width: 90px;
          height: 24px;
          margin-top: 8px;
          margin-left: 24px;
          background: url(../../assets/usual/img/logo.png) no-repeat;
          background-size: 90px 24px;
        }
        .titleBox{
          width: 98px;
          height: 20px;
          margin: 10px 0 10px 557px;
          font-size: 14px;
          line-height: 20px;
          color: #333333;
          font-weight: bolder;
        }
      }
      .bottomBox{
        width: 100%;
        height: 56px;
        background: lightyellow;
        overflow: hidden;
      }
    }
  }
  .mainContainer{
    width: 100%;
    background: #F5F5F5;
    margin-top: 10px;
    .main{
      width: 1440px;
      margin: 0 auto;
      background: #F5F5F5;
      position: relative;
      .leftContainer{
        width: 260px;
        height: 918px;
        background:  #FFFFFF;
        position: absolute;
        left: 0;
      }
      .rightContainer{
        width: 260px;
        height: 918px;
        background:  #FFFFFF;
        position: absolute;
        right: 0;
      }
      .middleContainer{
        width: 920px;
        min-height: 918px;
        margin-left: 260px;
        .emptyMsg{
          width: 140px;
          margin: 0 auto;
          line-height: 918px;
          font-size: 20px;
          color: #666666;
        }
      }
    }
  }
}
</style>