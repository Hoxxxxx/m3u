<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基础控件" name="1">
        <div class="Btns">
          <div
            class="btn"
            v-for="item in basicBtns"
            :key="item.value"
            @click="chooseBtn(item.value)"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="布局" name="2">
        <div class="Btns">
          <div
            class="btn"
            v-for="item in layout"
            :key="item.value"
            @click="chooseLayOut(item.value)"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </div>
        </div>
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeNames: ["1","2"], // 默认激活标签页
      activeBtn: "",
      // 基础控件
      basicBtns: [
        {
          icon: "el-icon-copy-document",
          label: "输入框",
          value: "basic_Input",
        },
        {
          icon: "el-icon-copy-document",
          label: "按钮全名称",
          value: "basic_InputText",
        },
        {
          icon: "el-icon-copy-document",
          label: "下拉选框",
          value: "basic_Select",
        },
        {
          icon: "el-icon-copy-document",
          label: "弹窗选框",
          value: "basic_Dialog",
        },
        {
          icon: "el-icon-copy-document",
          label: "按钮全名称",
          value: "basic_05",
        },
        {
          icon: "el-icon-copy-document",
          label: "按钮全名称",
          value: "basic_06",
        },
      ],
      // 布局方式
      layout: [
        {
          icon: "el-icon-copy-document",
          label: "单行单列",
          value: "row_one",
        },
        {
          icon: "el-icon-copy-document",
          label: "单行两列",
          value: "row_two",
        },
        {
          icon: "el-icon-copy-document",
          label: "单行三列",
          value: "row_three",
        },
        {
          icon: "el-icon-copy-document",
          label: "单行四列",
          value: "row_four",
        },
      ],
    };
  },
  methods: {
    chooseBtn(btn) {
      this.activeBtn = btn;
      this.$emit("activeBtn", this.activeBtn);
    },
    chooseLayOut(val){
    }
  },
};
</script>

<style lang="less" scoped>
.el-collapse {
  padding-left: 10px;
  color: #999999;
  border: none !important;
  .el-collapse-item {
    /deep/ .el-collapse-item__header {
      border: none !important;
      font-size: 14px;
      color: #999999;
    }
    .Btns {
      width: 250px;
      display: flex;
      flex-wrap: wrap;
      .btn {
        width: 110px;
        height: 36px;
        line-height: 36px;
        margin-left: 5px;
        margin-bottom: 10px;
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        border: 1px solid #cccccc;
        border-radius: 4px;
        text-align: center;
        i {
          margin-right: 5px;
          color: #d8d8d8;
        }
        span {
          color: #666666;
        }
      }
      // 鼠标悬浮
      .btn:hover {
        cursor: pointer;
        background: #409efd;
        border-color: #409efd;
        box-shadow: 0px 3px 6px rgba(152, 185, 254, 0.5);
        i {
          color: #ffffff;
        }
        span {
          color: #ffffff;
        }
      }
    }
  }
}
</style>