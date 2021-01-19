// 此组件用于生成选中的小组件
<script>
export default {
  data() {
    return {};
  },
  props: {
    tag: {
      type: Object,
      default: {},
    },
  },
  methods: {},
  render(h) {
    let self = this;
    switch (self.tag.item_tag) {
      case "el-input":
        return h("el-input", {
          props: {
            value: self.tag.prop_name,
          },
          class: {
            W100: true,
          },
          on: {
            input: (val) => {
              self.tag.prop_name = val;
            },
          },
        });
        break;
      case "el-button":
        return h("el-button", {
          props: {
            innertext: self.tag.text,
          },
          class: {
            W100: true,
          },
          on: {
            input: (val) => {
              self.tag.prop_name = val;
            },
          },
        });
        break;
      case "el-date-picker":
        return h("el-date-picker", {
          props: {
            value: self.tag.prop_val,
          },
          class: {
            W100: true,
          },
          on: {
            input: (val) => {
              self.tag.prop_val = val;
            },
          },
        });
        break;
      case "el-select":
        // 下拉选项的集合数组
        let options = self.tag.options.map((item) => {
          return h("el-option", {
            props: {
              value: item.value,
              label: item.label,
            },
          });
        });
        return h(
          "el-select",
          {
            props: {
              value: self.tag.prop_val,
            },
            class: {
              W100: true,
            },
            on: {
              input: (val) => {
                self.tag.prop_val = val;
              },
            },
            scopedSlots:{
              default: props => h('span', options)
            }
          },
          // [
          //   h(
          //     "span",
          //     {
          //       props: {},
          //     },
          //     options
          //   ),
          // ]
        );
        break;
      default:
        break;
    }
  },
};
</script>