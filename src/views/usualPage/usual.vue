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
    </div>
    <div class="mainContainer">
      <div class="main">
        <!-- 左侧边栏 -->
        <div class="leftContainer">
          <left-Btns></left-Btns>
        </div>
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
import leftBtns from './leftBtns'

export default {
  components: {
    leftBtns
  },

  data() {
    return {
      
    }
  },
  
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
        overflow: hidden;
        .btns{
          width: fit-content;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          height: 43px;
          margin: 7px auto;
          display: flex;
          .btn {
            height: 43px;
            margin-right: 29px;
            .icon{
              height: 18px;
              font-size: 18px;
              text-align: center;
              color: #666666;
              margin-bottom: 6px;
            }
            .btnName{
              height: 20px;
              text-align: center;
              font-size: 14px;
              color: #666666;
            }
          }
          .btn:last-child{
            margin-right: 0;
          }
          .btn:hover{
            cursor: pointer;
            .icon,
            .btnName{
              color: #409EFD;
            }
          }
        }
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
        padding: 0 5px 0 15px;
        box-sizing: border-box;
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