<template>
  <div class="centerContainner">
    <!-- 无内容 -->
    <div class="emptyMsg" v-if="containList.layouts.length == 0">
      <span>请选择左侧控件</span>
    </div>
    <!-- 有内容 -->
    <div v-else>
      <div v-for="(item, index) in containList.layouts" :key="index">
        <!-- 表格控件 -->
        <div v-if="item.type == 'layout_Form'" class="handleBox layout_Form">
          <!-- 内容行（一个内容块） -->
          <div
            v-for="(area_item, area_index) in item.form_areas"
            :key="area_index"
          >
            <!-- 顶部工具栏  v-if="area_item.active_status"-->
            <div  class="topTools">
              <el-tooltip
                class="item"
                effect="dark"
                content="复制"
                placement="top"
              >
                <div
                  class="tool copy"
                  @click="add_FormLine(index, line_index)"
                ></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <div
                  class="tool delete"
                  @click="del_FormLine(index, line_index)"
                ></div>
              </el-tooltip>
            </div>
            <!-- 行内容start -->
            <!-- 当前内容块标题 -->
            <h2 class="title" v-if="area_item.title">
              {{ area_item.title }}
            </h2>
            <!-- 内容行  -->
            <div
              v-for="(line, line_index) in area_item.form_lines"
              :key="line_index"
              class="Form_line"
              :class="line.active_status ? 'Form_line_active' : ''"
              @click.stop="choose_FormLine(index, area_index, line_index)"
            >
              <div class="formline_inner layout_row">
                <!-- 每一个小的格子 -->
                <div
                  class="layout_td"
                  v-for="(layout_td, td_key) in line.form_tds"
                  :key="td_key"
                  :class="`rows_${line.layout}`"
                >
                  <!-- 小格子标题 -->
                  <div class="layout_td_title">
                    <span>{{ layout_td.item_title }}</span>
                  </div>
                  <!-- 小格子内容/组件 -->
                  <div class="layout_td_cont">
                    <render :tag="layout_td"></render>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 其他控件 -->
        <!-- <div >
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
        </div> -->
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
      default: function () {
        return {};
      },
    },
  },
  components: {
    render,
  },
  data() {
    return {
      // 内容列表
      containList: {
        formRef: "elForm",
        formModel: "formData",
        layouts: [],
      },
    };
  },
  computed: {
    ...mapState(["form"]),
  },
  created() {
    this.initTable();
  },
  methods: {
    ...mapMutations(["CHANGE_FORM"]),
    // 清空选中状态
    cleanActive() {
      this.containList.layouts.forEach((item) => {
        item.form_areas.forEach((subItem) => {
          subItem.form_lines.forEach((ele) => {
            if (ele.active_status) {
              ele.active_status = !ele.active_status;
            }
          });
        });
      });
    },
    // 选择表格行
    choose_FormLine(index, area_index, line_index) {
      this.cleanActive();
      // 选中行赋值
      this.containList.layouts[index].form_areas[area_index].form_lines[
        line_index
      ].active_status = true;
      console.log(index, area_index, line_index);
    },
    // 新增表格行
    add_FormLine(index, line_index) {
      this.containList.layouts[index].InnerInfo.splice(line_index + 1, 0, {
        active_status: false, // 此行被选中状态
        InnerInfo: [
          // 此行内容
          {
            title: "111",
          },
          {
            title: "222",
          },
          {
            title: "333",
          },
        ],
      });
      // console.log(this.containList)
    },
    // 删除表格行
    del_FormLine(index, line_index) {
      this.containList.layouts[index].InnerInfo.splice(line_index, 1);
    },
    initTable() {
      let data = {
        formRef: "elForm",
        formModel: "formData",
        layouts: [
          {
            type: "layout_Form", //布局控件类型
            form_areas: [
              {
                title: "基本信息（内容区域1）",
                form_lines: [
                  {
                    active_status: false, // 此行被选中状态
                    layout: 3,
                    form_tds: [
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
                  {
                    active_status: false, // 此行被选中状态
                    layout: 3,
                    form_tds: [
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
                        prop_val: "2021-01-31",
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
                            label: "黄金糕",
                          },
                          {
                            value: "2",
                            label: "双皮奶",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                title: "学历信息（内容区域2）",
                form_lines: [
                  {
                    active_status: false, // 此行被选中状态
                    layout: 3,
                    form_tds: [
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
            ],
          },
        ],
      };
      this.containList = data;
      this.CHANGE_FORM(data);
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
        case "basic_Input":
          this.containList.layouts.push({
            type: "basic_Input",
          });
          this.initTable();
          // console.log(this.form)
          break;
        // *****布局控件*****
        // 表格控件
        case "layout_Form":
          // this.initTable()
          this.containList.layouts.push({
            type: "layout_Form",
            InnerInfo: [
              {
                active_status: false, // 此行被选中状态
                InnerInfo: [
                  // 此行内容
                  {
                    title: "111",
                  },
                  {
                    title: "222",
                  },
                  {
                    title: "333",
                  },
                ],
              },
            ],
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/usualPage.less"; // 组件样式
.centerContainner {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
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



