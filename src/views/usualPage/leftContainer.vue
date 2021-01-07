<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基础控件" name="1">
        <div class="Btns">
          <div class="btn"
                  v-for="item in basicBtns" :key="item.value"
                  @click="chooseBtn(item.value)">
            <i :class="item.icon"></i>
            <span>{{item.label}}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="布局控件" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1'], // 默认激活标签页
      activeBtn: '',
      // 基础控件
      basicBtns: [{
        icon: 'el-icon-copy-document',
        label: '按钮全名称',
        value: 'basic_01'
      },{
        icon: 'el-icon-copy-document',
        label: '按钮全名称',
        value: 'basic_02'
      },{
        icon: 'el-icon-copy-document',
        label: '按钮全名称',
        value: 'basic_03'
      },{
        icon: 'el-icon-copy-document',
        label: '按钮全名称',
        value: 'basic_04'
      },{
        icon: 'el-icon-copy-document',
        label: '按钮全名称',
        value: 'basic_05'
      },{
        icon: 'el-icon-copy-document',
        label: '按钮全名称',
        value: 'basic_06'
      }],
    }
  },
  methods: {
    chooseBtn(btn) {
      this.activeBtn = btn
    }
  },
}
</script>

<style lang="less" scoped>
.el-collapse{
  padding-left: 10px;
  color: #999999;
  border: none !important;
  .el-collapse-item{
    /deep/ .el-collapse-item__header{
      border: none !important;
      font-size: 14px;
      color: #999999;
    }
    .Btns{
      width: 250px;
      display: flex;
      flex-wrap: wrap;
      .btn{
        width: 110px;
        height: 36px;
        line-height: 36px;
        margin-left: 5px;
        margin-bottom: 10px;
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        text-align: center;
        i{
          margin-right: 5px;  
          color: #D8D8D8;
        }
        span{
          color: #666666;
        }
      }
      // 鼠标悬浮
      .btn:hover{
        cursor: pointer;
        background: #409EFD;
        border-color: #409EFD;
        box-shadow: 0px 3px 6px rgba(152, 185, 254, 0.5);
        i{
          color: #FFFFFF;
        }
        span{
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>