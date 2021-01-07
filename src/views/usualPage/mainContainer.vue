<template>
  <div class="centerContainner">
    <!-- 无内容 -->
    <div class="emptyMsg" v-if="containList.length==0">
      <span>请选择左侧控件</span>
    </div>
    <div v-else>
      <div v-for="(item, index) in containList" :key="index">
        {{item.value}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addCount: Number,
    addBtn: String,
  },
  data() {
    return {
      // 内容列表
      containList: [],
    }
  },
  methods: {
    
  },
  watch: {
    // 用户每点击一次按钮，都触发添加组件动作
    addCount(newVal, oldVal) {
      // 此处判断用户添加的按钮类型
      // 依据类型向containList（内容列表）中添加其格式的预设参数
      // 以输入框为例
      if (this.addBtn == 'basic_Input') {
        this.containList.push({
          value: 'basic_Input',
          
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.centerContainner{
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  padding: 10px;
  box-sizing: border-box;
  .emptyMsg{
    width: 140px;
    margin: 0 auto;
    line-height: 918px;
    font-size: 20px;
    color: #666666;
  }
}
</style>