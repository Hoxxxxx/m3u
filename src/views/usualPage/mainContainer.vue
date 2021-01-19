<template>
  <div class="centerContainner">
    <!-- 无内容 -->
    <div class="emptyMsg" v-if="containList.layouts.length==0">
      <span>请选择左侧控件</span>
    </div>
    <!-- 有内容 -->
    <div v-else>
      <div v-for="(item, index) in containList.layouts" :key="index">
        <!-- 表格控件 -->
        <div v-if="item.type=='layout_Form'" class="handleBox layout_Form">
          <!-- 内容行 -->
          <div v-for="(line_item, line_index) in item.InnerInfo" :key="line_index">
            <!-- 顶部工具栏 -->
            <div v-if="line_item.active_status" class="topTools">
              <el-tooltip class="item" effect="dark" content="复制" placement="top">
                <div class="tool copy" @click="add_FormLine(index, line_index)"></div>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <div class="tool delete" @click="del_FormLine(index, line_index)"></div>
              </el-tooltip>
            </div>
            <!-- 行内容 -->
            <div class="Form_line"
                    :class="line_item.active_status?'Form_line_active':''"
                    @click="choose_FormLine(index, line_index)">
              <div class="formline_inner">
                
              </div>
            </div>
          </div>
        </div>
        <!-- 其他控件 -->
        <!-- 。。。 -->
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
      containList: {
        formRef: "elForm",
        formModel: "formData",
        layouts: []
      },
    }
  },
  methods: {
    // 清空选中状态
    cleanActive() {
      this.containList.layouts.forEach( item => {
        item.InnerInfo.forEach( subItem => {
          if (subItem.active_status) {
            subItem.active_status = !subItem.active_status
          }
        })
      })
    },
    // 选择表格行
    choose_FormLine(index, line_index) {
      this.cleanActive()
      // 选中行赋值
      this.containList.layouts[index].InnerInfo[line_index].active_status = true
    },
    // 新增表格行
    add_FormLine(index, line_index) {
      this.containList.layouts[index].InnerInfo.splice(line_index+1, 0, {
        active_status: false,   // 此行被选中状态
        InnerInfo: [   // 此行内容
          {
            title: '111'
          },{
            title: '222'
          },{
            title: '333'
          }],
        })
        // console.log(this.containList)
    },
    // 删除表格行
    del_FormLine(index, line_index) {
      this.containList.layouts[index].InnerInfo.splice(line_index, 1)
    },


  },
  watch: {
    // 用户每点击一次按钮，都触发添加组件动作
    addCount(newVal) {
      // 此处判断用户添加的按钮类型
      // 依据类型向containList（内容列表）中添加其格式的预设参数
      switch (this.addBtn) {
        // *****基础控件*****
        // 输入框
        case 'basic_Input':
          this.containList.layouts.push({
            type: 'basic_Input',
          })
        break;
        // *****布局控件*****
        // 表格控件
        case 'layout_Form':
          this.containList.layouts.push({
            type: 'layout_Form',
            InnerInfo: [{
              active_status: false,   // 此行被选中状态
              InnerInfo: [   // 此行内容
                {
                  title: '111'
                },{
                  title: '222'
                },{
                  title: '333'
                }
              ],
            }]
          })
        break;
        default:
        break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/usualPage.less";   // 组件样式

.centerContainner{
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  .emptyMsg{
    width: 140px;
    margin: 0 auto;
    line-height: 918px;
    font-size: 20px;
    color: #666666;
  }
}
</style>