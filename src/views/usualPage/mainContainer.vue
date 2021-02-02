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
            v-for="(area_item, area_Index) in item.form_areas"
            :key="area_Index"
            :class="area_item.active_status ? 'area_item_active' : ''"
            class="area_item"
          >
            <!-- 行内容start -->
            <!-- 当前内容块标题 -->
            <div
              class="area_title"
              v-if="area_item.title"
              @click.capture="choose_areaItem(index, area_Index)"
            >
              <h2>{{ area_item.title }}</h2>
              <!-- 顶部工具栏_area -->
              <Top-Tools
                v-if="area_item.active_status"
                :className="'topTools_area_title'"
                :index="index"
                :sec_Index="area_Index"
                @add_Item="add_areaItem"
                @del_Item="del_areaItem"
              >
              </Top-Tools>
            </div>
            <!-- 内容行  -->
            <div
              v-for="(line, line_Index) in area_item.form_lines"
              :key="line_Index"
              class="Form_line"
              :class="line.active_status ? 'Form_line_active' : ''"
              @click.stop="choose_FormLine(index, area_Index, line_Index)"
            >
              <!-- 顶部工具栏_Form_line -->
              <Top-Tools
                v-if="line.active_status"
                :className="'topTools_Form_line'"
                :index="index"
                :sec_Index="area_Index"
                :thr_Index="line_Index"
                @add_Item="add_FormLine"
                @del_Item="del_FormLine"
              >
              </Top-Tools>
              <div class="formline_inner layout_row">
                <!-- 每一个分栏 -->
                <div
                  class="layout_td"
                  v-for="(layout_td, td_key) in line.form_tds"
                  :key="td_key"
                  :class="[
                    `rows_${line.layout}`,
                    layout_td.active_status ? 'layout_td_active' : '',
                  ]"
                  @click.stop="
                    choose_layout_td(index, area_Index, line_Index, td_key)
                  "
                >
                  <!-- 分栏标题 -->
                  <div class="layout_td_title">
                    <span>{{ layout_td.item_title }}</span>
                  </div>
                  <!-- 分栏内容/组件 -->
                  <div class="layout_td_cont">
                    <render :tag="layout_td" v-if="layout_td.item_tag"></render>
                    <div class="layout_td_cont_none" v-else>请选择左侧控件</div>
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
// utils
import TopTools from "../../components/usual/topTools";
import render from "./render/render";
// js
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    addCount: Number,
    addBtn: String,
    layoutCount: Number,
    layoutBtn: String,
  },
  components: {
    render,
    TopTools,
  },
  data() {
    return {
      // 内容列表
      containList: {
        formRef: "elForm",
        formModel: "formData",
        layouts: [
          // {
          //   type: "layout_Form", //布局控件类型
          //   form_areas: [
          //     {
          //       title: "基本信息（内容区域1）",
          //       active_status: false, // 此行被选中状态
          //       form_lines: [
          //         {
          //           active_status: false, // 此行被选中状态
          //           layout: 3,
          //           form_tds: [
          //             //当前行组件集合
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "1", //单项label
          //               item_tag: "el-input", //组件标签
          //               prop_name: "one", //model属性名称
          //               item_prop: "", //model属性值
          //             },
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "2", //单项label
          //               item_tag: "el-date-picker", //组件标签
          //               prop_name: "two", //model属性名称
          //               item_prop: "", //model属性值
          //               prop_val: "2021-01-01",
          //             },
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "3", //单项label
          //               item_tag: "el-select", //组件标签
          //               prop_name: "three", //model属性名称
          //               item_prop: "", //model属性值
          //               prop_val: 1,
          //               options: [
          //                 {
          //                   value: 1,
          //                   label: "黄金糕123456",
          //                 },
          //                 {
          //                   value: "2",
          //                   label: "双皮奶789456",
          //                 },
          //               ],
          //             },
          //           ],
          //         },
          //         {
          //           active_status: false, // 此行被选中状态
          //           layout: 3,
          //           form_tds: [
          //             //当前行组件集合
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "1", //单项label
          //               item_tag: "el-input", //组件标签
          //               prop_name: "one", //model属性名称
          //               item_prop: "", //model属性值
          //             },
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "2", //单项label
          //               item_tag: "el-date-picker", //组件标签
          //               prop_name: "two", //model属性名称
          //               item_prop: "", //model属性值
          //               prop_val: "2021-01-31",
          //             },
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "3", //单项label
          //               item_tag: "el-select", //组件标签
          //               prop_name: "three", //model属性名称
          //               item_prop: "", //model属性值
          //               prop_val: 1,
          //               options: [
          //                 {
          //                   value: 1,
          //                   label: "黄金糕",
          //                 },
          //                 {
          //                   value: "2",
          //                   label: "双皮奶",
          //                 },
          //               ],
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //     {
          //       title: "学历信息（内容区域2）",
          //       active_status: false, // 此行被选中状态
          //       form_lines: [
          //         {
          //           active_status: false, // 此行被选中状态
          //           layout: 3,
          //           form_tds: [
          //             //当前行组件集合
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "1", //单项label
          //               item_tag: "el-input", //组件标签
          //               prop_name: "one", //model属性名称
          //               item_prop: "", //model属性值
          //             },
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "2", //单项label
          //               item_tag: "el-date-picker", //组件标签
          //               prop_name: "two", //model属性名称
          //               item_prop: "", //model属性值
          //               prop_val: "2021-01-01",
          //             },
          //             {
          //               active_status: false, // 此行被选中状态
          //               item_title: "3", //单项label
          //               item_tag: "el-select", //组件标签
          //               prop_name: "three", //model属性名称
          //               item_prop: "", //model属性值
          //               prop_val: 1,
          //               options: [
          //                 {
          //                   value: 1,
          //                   label: "黄金糕123456",
          //                 },
          //                 {
          //                   value: "2",
          //                   label: "双皮奶789456",
          //                 },
          //               ],
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //   ],
          // },
        ],
      },
    };
  },
  watch: {
    // 用户每点击一次基础控件，都触发添加组件动作
    addCount(newVal) {
      // 此处判断用户添加的按钮类型
      // 依据类型向containList（内容列表）中添加其格式的预设参数
      // 当前选中
      let form_Index = this.choosedTd.form_Index,
        area_Index = this.choosedTd.area_Index,
        line_Index = this.choosedTd.line_Index,
        td_Index = this.choosedTd.td_Index;
      let obj = this.containList.layouts[form_Index].form_areas[area_Index].form_lines[line_Index].form_tds;
      switch (this.addBtn) {
        // *****基础控件*****
        // 输入框
        case "basic_Input":
          let data_basic_Input = {
            active_status: true, // 此行被选中状态
            item_title: "输入label", //单项label
            item_tag: "el-input", //组件标签
            prop_name: "one", //model属性名称
            item_prop: "", //model属性值
          };
          this.$set(obj, td_Index, data_basic_Input); //不采用push方法添加数据，避免v-model失效
          this.$forceUpdate(); //强制更新DOM
          break;
        // 日期选择
        case "basic_DatePicker":
          let data_basic_DatePicker = {
            active_status: true, // 此行被选中状态
            item_title: "日期选择label", //单项label
            item_tag: "el-date-picker", //组件标签
            prop_name: "two", //model属性名称
            item_prop: "", //model属性值
            prop_val: "2021-01-01",
          };
          this.$set(obj, td_Index, data_basic_DatePicker);
          this.$forceUpdate();
          break;
        default:
          break;
      }
    },
    // *****布局控件*****
    layoutCount(newVal) {
      switch (this.layoutBtn) {
        // 表格控件
        case "layout_Form":
          this.init_layout_Form();
          break;
        default:
          break;
      }
    },
  },
  computed: {
    ...mapState(["form", "choosedTd"]),
  },
  created() {
    // this.init_layout_Form();
  },
  methods: {
    ...mapMutations(["CHANGE_FORM", "CHANGE_CHOOSEDTD"]),
    // ************初始化控件**************
    // 初始化表格控件
    init_layout_Form() {
      this.containList.layouts.push({
        type: "layout_Form", //布局控件类型
        form_areas: [
          {
            title: "默认标题（内容区域1）",
            active_status: false, // 此行被选中状态
            form_lines: [
              {
                active_status: false, // 此行被选中状态
                layout: 3,
                form_tds: [
                  //当前行组件集合
                  {
                    active_status: false, // 此行被选中状态
                    item_title: "1", //单项label
                    // item_tag: "el-input", //组件标签
                    prop_name: "one", //model属性名称
                    item_prop: "", //model属性值
                  },
                  {
                    active_status: false, // 此行被选中状态
                    item_title: "2", //单项label
                    item_tag: "el-date-picker", //组件标签
                    prop_name: "two", //model属性名称
                    item_prop: "", //model属性值
                    prop_val: "2021-01-01",
                  },
                  {
                    active_status: false, // 此行被选中状态
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
      });
      this.CHANGE_FORM(this.containList);
    },
    // ***************************************

    //********表格控件layout_Form**********
    //***** 内容区域 *****
    // 清空内容区域选择状态
    cleanActive_areaItem() {
      this.containList.layouts.forEach((item) => {
        item.form_areas.forEach((ele) => {
          if (ele.active_status) {
            ele.active_status = false;
          }
        });
      });
    },
    // 选择内容区域
    choose_areaItem(index, area_Index) {
      if(this.containList.layouts[index].form_areas[area_Index]){
        this.cleanActive_areaItem()
        this.cleanActive_FormLine()
        this.cleanActive_layout_td()
        this.containList.layouts[index].form_areas[area_Index].active_status = true;
        this.$emit('choose_Form', {
          type: 'area',
          index: index,
          area_Index: area_Index
        })
      }
    },
    // 复制内容区域
    add_areaItem(params) {
      const index = params.index;
      const area_Index = params.sec_Index;
      // 深拷贝复制对象
      const new_areaItem = JSON.parse(
        JSON.stringify(this.containList.layouts[index].form_areas[area_Index])
      );
      new_areaItem.active_status = false;
      // 复制
      this.containList.layouts[index].form_areas.splice(
        area_Index + 1,
        0,
        new_areaItem
      );
    },
    // 删除内容区域
    del_areaItem(params) {
      const index = params.index;
      const area_Index = params.sec_Index;
      this.containList.layouts[index].form_areas.splice(area_Index, 1);
    },
    //***** 表格行 *****
    // 清空表格行选中状态
    cleanActive_FormLine() {
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
    choose_FormLine(index, area_Index, line_Index) {
      if (this.containList.layouts[index].form_areas[area_Index]) {
        this.cleanActive_areaItem();
        this.cleanActive_FormLine();
        this.cleanActive_layout_td();
        // 选中行赋值
        this.containList.layouts[index].form_areas[area_Index].form_lines[
          line_Index
        ].active_status = true;
        // console.log(index, area_Index, line_Index);
        this.$emit('choose_Form', {
          type: 'line',
          index: index,
          area_Index: area_Index,
          line_Index: line_Index
        })
      }
    },
    // 复制表格行
    add_FormLine(params) {
      const index = params.index;
      const area_Index = params.sec_Index;
      const line_Index = params.thr_Index;
      // 深拷贝复制对象
      const new_lineItem = JSON.parse(
        JSON.stringify(
          this.containList.layouts[index].form_areas[area_Index].form_lines[
            line_Index
          ]
        )
      );
      new_lineItem.active_status = false;
      // 复制
      this.containList.layouts[index].form_areas[area_Index].form_lines.splice(
        line_Index + 1,
        0,
        new_lineItem
      );
    },
    // 删除表格行
    del_FormLine(params) {
      const index = params.index;
      const area_Index = params.sec_Index;
      const line_Index = params.thr_Index;
      if (
        this.containList.layouts[index].form_areas[area_Index].form_lines
          .length > 1
      ) {
        this.containList.layouts[index].form_areas[
          area_Index
        ].form_lines.splice(line_Index, 1);
      } else {
        this.del_areaItem(params);
      }
    },
    //***** 单个表格td *****
    // 清空td选中状态
    cleanActive_layout_td() {
      this.containList.layouts.forEach((item) => {
        item.form_areas.forEach((ele) => {
          ele.form_lines.forEach((line) => {
            line.form_tds.forEach((td) => {
              td.active_status = false;
            });
          });
        });
      });
    },
    // 选中单个td
    choose_layout_td(index, area_Index, line_Index, td_key) {
      this.cleanActive_areaItem()
      this.cleanActive_FormLine()
      this.cleanActive_layout_td()
      this.containList.layouts[index].form_areas[area_Index].form_lines[
        line_Index
      ].form_tds[td_key].active_status = true;
      let data = {
        form_Index: index, //单元格所在的最外层控件
        area_Index: area_Index, //单元格所在的内容块
        line_Index: line_Index, //单元格所在的行
        td_Index: td_key, //当前选中的单元格
      };
      this.CHANGE_CHOOSEDTD(data);
      this.$emit('choose_Form', {
        type: 'td',
        index: index,
        area_Index: area_Index,
        line_Index: line_Index,
        td_Index: td_key
      })
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
}
</style>