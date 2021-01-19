<template>
  <div class="centerContainner">
    <!-- 无内容 -->
    <div class="emptyMsg" v-if="containList.length == 0">
      <span>请选择左侧控件</span>
    </div>
    <div v-else>
      <!-- <div v-for="(item, index) in containList" :key="index">
        {{item.value}}
      </div> -->
      <div v-for="(item, index) in form.layouts" :key="index">
        <h2 class="title" v-if="item.title">{{ item.title }}</h2>
        <ul class="layout_table">
          <li
            class="layout_row"
            v-for="(layout_item, layout_key) in item.layout_rows"
            :key="layout_key"
          >
            <div
              class="layout_td"
              v-for="(layout_td, td_key) in layout_item.tds"
              :key="td_key"
              :class="`rows_${item.layout}`"
            >
              <div class="layout_td_title">
                <span>{{ layout_td.item_title }}</span>
              </div>
              <div class="layout_td_cont">
                <render :tag="layout_td"></render>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import render from "./render/render";
export default {
  props: {
    addCount: Number,
    addBtn: String,
    layout: {
      type: Object,
      default: {},
    },
  },
  components: {
    render,
  },
  data() {
    return {
      // 内容列表
      containList: [],
    };
  },
  watch: {
    // 用户每点击一次按钮，都触发添加组件动作
    addCount(newVal, oldVal) {
      // 此处判断用户添加的按钮类型
      // 依据类型向containList（内容列表）中添加其格式的预设参数
      // 以输入框为例
      if (this.addBtn == "basic_Input") {
        this.containList.push({
          value: "basic_Input",
        });
      }
      let data = {
        // 表单属性部分
        formRef: "elForm",
        formModel: "formData",
        // 布局组件部分
        layouts: [
          //内容块集合
          {
            title: "内容块1", //内容块标题（可填）
            layout: 3, //布局方式：默认单行三列布局
            layout_rows: [
              //行数集合
              {
                row_id: 0, //当前行标识
                tds: [
                  //当前行组件集合
                  {
                    item_title: "1", //单项label
                    item_tag: "el-input", //组件标签
                    prop_name: "one", //model属性名称
                    item_prop: "", //model属性值
                  },
                  {
                    item_title: "2", //单项label
                    item_tag: "el-date-picker", //组件标签
                    prop_name: "two", //model属性名称
                    item_prop: "", //model属性值
                    prop_val: "2021-01-01",
                  },
                  {
                    item_title: "3", //单项label
                    item_tag: "el-select", //组件标签
                    prop_name: "three", //model属性名称
                    item_prop: "", //model属性值
                    prop_val: 1,
                    options: [
                      {
                        value: 1,
                        label: "黄金糕123456",
                      },
                      {
                        value: "2",
                        label: "双皮奶789456",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "内容块2", //内容块标题（可填）
            layout: 1, //布局方式：默认单行三列布局
            layout_rows: [
              {
                row_id: 0, //当前行标识
                tds: [
                  //当前行组件集合
                  {
                    item_title: "1", //单项label
                    item_tag: "el-input", //组件标签
                    prop_name: "one", //model属性名称
                    item_prop: "", //model属性值
                  },
                  {
                    item_title: "2", //单项label
                    item_tag: "el-input", //组件标签
                    prop_name: "two", //model属性名称
                    item_prop: "", //model属性值
                  },
                  {
                    item_title: "城市名称", //单项label
                    item_tag: "el-select", //组件标签
                    prop_name: "three", //model属性名称
                    item_prop: "", //model属性值
                    prop_val: null,
                    options: [
                      {
                        value: "1",
                        label: "北京",
                      },
                      {
                        value: "2",
                        label: "成都",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      this.CHANGE_FORM(data);
    },
  },
  computed: {
    ...mapState(["form"]),
  },
  methods: {
    ...mapMutations(["CHANGE_FORM"]),
  },
};
</script>

<style lang="less" scoped>
.centerContainner {
  width: 100%;
  height: 100%;
  background: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  .emptyMsg {
    width: 140px;
    margin: 0 auto;
    line-height: 918px;
    font-size: 20px;
    color: #666666;
  }
  .title {
    position: relative;
    width: 100%;
    height: 40px;
    background: #e9f4ff;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    font-weight: bold;
    color: #409efd;
  }
  .layout_table {
    .layout_row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .layout_td {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: auto;
        .layout_td_title {
          border-bottom: 1px solid #f0f3f7;
          width: 133px;
          height: 100%;
          text-align: center;
          border-right: 1px solid #cccccc;
          background: #fcfdff;
          color: #666666;
          font-size: 12px;
          display: table;
          > span {
            display: table-cell;
            vertical-align: middle;
            word-break: break-all;
            padding: 4px;
          }
        }
        .layout_td_cont {
          width: 100%;
          height: 40px;
          border-radius: 0;
          border: none;
          text-align: left;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
  .rows_1 {
    flex: 0 1 100% !important;
  }
  .rows_2 {
    flex: 0 1 50% !important;
  }
  .rows_3 {
    flex: 0 1 33.3% !important;
  }
  .rows_4 {
    flex: 0 1 25% !important;
  }
  .W100 {
    width: 100% !important;
  }
  .W50 {
    width: 50 !important;
  }
}
</style>