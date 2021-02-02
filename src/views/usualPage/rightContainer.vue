<template>
  <div class="rightContainer">
    <!-- 无组件 -->
    <div v-if="formItems.length==0" class="emptyBox">
      <span>请选择左侧控件</span>
    </div>
    <!-- 有组件 -->
    <el-tabs v-else 
                   v-model="activePage">
      <!-- 组件属性 -->
      <el-tab-pane label="组件属性" name="assembly">
        <div class="pageBox">
          <!-- 设置分页 -->
          <el-collapse v-model="activeCollapse">
            <el-collapse-item title="基础设置" name="1">
              <el-form ref="basic_form" 
                              :model="basic_form"
                              label-position="top">
                <el-form-item v-for="(item, index) in formItems" :key="index" 
                                        :label="item.label">
                  <!-- input -->
                  <el-input v-if="item.type=='input'" 
                                  v-model="basic_form[item.name]">
                  </el-input>
                  <!-- slider -->
                  <el-slider v-if="item.type=='slider'"
                                  v-model="basic_form[item.name]"
                                  :step="1"
                                  :max="item.max"
                                  show-stops
                                  style="width: 95%">
                  </el-slider>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="高级设置" name="2">
              222
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <!-- 表单属性 -->
      <el-tab-pane label="表单属性" name="form">
        <div class="pageBox">
          22222
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    addCount: Number,
    addBtn: String,
    layoutCount: Number,
    layoutBtn: String,
  },
  data() {
    return {
      // 属性分页
      activePage: 'assembly',
      // 设置分页
      activeCollapse: ['1', '2'],
      // ****基础属性部分****
      basic_form: {
        name: '',
      },
      formItems: [] //设置项集合
      // **********************

    }
  },
  methods: {
    //表格控件
    init_layout_Form() {
      // 更新赋值属性列表
      this.formItems.push({
        label: '表格行标题',
        type: 'input',
        name: 'line_title',
        value: '',
      },{
        label: '表格分栏',
        type: 'slider',
        name: 'cols',
        value: 3,
        max: 3,
      })
      // 根据属性列表赋值设置表单
      this.formItems.forEach( item => {
        this.$set(this.basic_form, item.name, item.value)
      })
    },
    
  },
  watch: {
    // 用户每点击一次左侧边栏按钮，都触发添加组件动作
    addCount(newVal) {
      // 重置属性及表单
      this.formItems = []
      this.basic_form = {}
      // 依据添加的按钮类型向containList（内容列表）中添加其格式的预设参数
      switch (this.addBtn) {
        // *****基础控件*****
      
        default:
        break;
      }
    },

    layoutCount(newVal) {
      // 重置属性及表单
      this.formItems = []
      this.basic_form = {}
      // 依据添加的按钮类型向containList（内容列表）中添加其格式的预设参数
      switch (this.layoutBtn) {
        // *****布局控件*****
        // 表格控件
        case 'layout_Form':
          this.init_layout_Form()
        break;

        default:
        break;
      }
    },
    
  }
}
</script>

<style lang="less" scoped>
.rightContainer{
  width: 100%;
  height: 100%;
  .emptyBox{
    width: 100%;
    text-align: center;
    line-height: 918px;
    font-size: 16px;
    color: #666666;
  }
  .el-tabs{ 
    /deep/ .el-tabs__item{
      padding: 0;
      width: 130px;
      text-align: center;
      color: #666666;
      font-weight: bold;
      font-size: 14px;
    }
    .pageBox{
      width: 100%;
      .el-collapse{
        padding: 0 10px 0 10px;
        color: #666666;
        border: none !important;
        .el-collapse-item{
          /deep/ .el-collapse-item__header{
            border: none !important;
            font-size: 14px;
            color: #666666;
          }
          .el-form{
            .el-form-item{
              margin-bottom: 20px !important;
              /deep/ .el-form-item__label{
                padding: 0 !important;
                color: #666666 !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>