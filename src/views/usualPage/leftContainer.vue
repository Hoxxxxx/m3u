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
      <el-collapse-item title="布局控件" name="2">
        <div class="Btns">
          <div
            class="btn"
            v-for="item in layoutBtns"
            :key="item.value"
            @click="chooseLayOut(item.value)"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeNames: ["1", "2"], // 默认激活标签页
      activeBtn: "",
      activeLayOut:"",
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
      // 布局控件
      layoutBtns: [
        {
          icon: "el-icon-copy-document",
          label: "表格控件",
          value: "layout_Form",
        },
      ],
    };
  },
  computed: {
    ...mapState(["choosedTd"]),
  },
  methods: {
    chooseBtn(btn) {
      if(JSON.stringify(this.choosedTd) == '{}'){
        this.$message.warning("请先选择需要添加组件的单元格噢！")
      }else{
        this.$message.success(`选中了${btn}组件`)
        this.activeBtn = btn;
        this.$emit("activeBtn", this.activeBtn);
      }
    },
    chooseLayOut(btn) {
      this.activeLayOut = btn;
      this.$emit("activeLayOut", this.activeLayOut);
    },
  },
};
</script>

<style lang="less" scoped>
.el-collapse {
  padding-left: 10px;
  color: #666666;
  border: none !important;
  .el-collapse-item {
    /deep/ .el-collapse-item__header {
      border: none !important;
      font-size: 14px;
      font-weight: bold;
      color: #666666;
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