<template>
  <div class="h5Home">
    <div class="head">
      <header>{{ formData.workName }}</header>
    </div>
    <div class="cont">
      <van-tabs
        scrollspy
        sticky
        :offset-top="'0.8rem'"
        :color="'#409EFD'"
        :title-active-color="'#409EFD'"
      >
        <div class="serial">
          <div>
            <span class="serial_label">业务日期:</span>
            <span class="serial_cont">2021/01/25</span>
          </div>
          <div>
            <span class="serial_label">申请单编号:</span>
            <span class="serial_cont">123124124123423423</span>
          </div>
        </div>
        <van-tab
          v-for="(group, grop_index) in formData.grops"
          :key="grop_index"
          :title="group.subTitle"
        >
          <h2 class="store-list-group-title">{{ group.subTitle }}</h2>
          <van-cell-group
            v-for="(item, index) in group.form_layout"
            :key="index"
          >
            <van-field
              v-if="item.formType == 'input'"
              v-model="item.default"
              :label="item.column_label"
              :value="item.default"
              input-align="right"
              label-class="label"
              clearable
              :readonly="!item.edit_able"
            />
            <div v-if="item.formType == 'datetime'">
              <van-cell
                :title="item.column_label"
                :value="item.default"
                @click="openDate(item)"
              />
              <van-calendar
                v-model="item.show"
                @confirm="onConfirm(item, $event)"
                color="#409EFD"
              />
            </div>
            <div v-if="item.formType == 'select'">
              <van-field
                readonly
                clickable
                label="部门"
                :value="item.default"
                is-link
                placeholder="选择部门"
                @click="openSelect(item)"
              />
              <van-popup v-model="item.show" round position="bottom">
                <van-picker
                  show-toolbar
                  :columns="item.options"
                  @cancel="item.show = false"
                  @confirm="onConfirm_select(item, $event)"
                />
              </van-popup>
            </div>
          </van-cell-group>
          <van-steps
            v-if="group.subTitle == '流程信息'"
            direction="vertical"
            :active="0"
            active-color="#969799"
          >
            <van-step
              v-for="(step, step_index) in group.form_layout"
              :key="step_index"
            >
              <p>{{ step.stepTime }}</p>
              <div class="stepInner">
                <h5 class="stepLabel">{{ step.stepLabel }}</h5>
                <h5 class="stepState">{{ step.stepState }}</h5>
                <h5 class="stepMember">
                  {{ step.stepMember }}
                </h5>
              </div>
            </van-step>
          </van-steps>
        </van-tab>
      </van-tabs>
    </div>
    <footer>
      <van-popover v-model="showMore" trigger="click" placement="top-start">
        <div
          class="linkBox"
          v-for="(link, link_index) in actions"
          :key="link_index"
        >
          <van-cell :title="link.title" is-link @click="toLink(link.url)" />
        </div>
        <template #reference>
          <van-button
            class="btn_operation"
            size="small"
            color=""
            plain
            type="info"
            >其他
          </van-button>
        </template>
      </van-popover>
      <van-button
        class="btn_operation"
        size="small"
        color="#F56C6C"
        type="default"
        >退回</van-button
      >
      <van-button
        class="btn_operation"
        size="small"
        color="#FBD951"
        type="warning"
        >拒绝</van-button
      >
      <van-button
        class="btn_operation"
        size="small"
        color="#6DD400"
        type="danger"
        @click="agree()"
        >同意</van-button
      >
    </footer>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      formData: {
        workName: "出差申请单",
        subTitles: [
          "基本信息",
          "财务信息",
          "教育信息",
          "学历信息",
          "工作信息",
          "交际信息",
          "附件信息",
          "流程信息",
        ],
        grops: [
          {
            subTitle: "基本信息",
            form_layout: [
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: true,
                show: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "select",
                default: "张三",
                edit_able: false,
                options: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
              },
              {
                column_label: "日期1",
                columnName: "oaa01",
                formType: "datetime",
                default: "2020/1/26",
                edit_able: false,
              },
              {
                column_label: "日期2",
                columnName: "oaa01",
                formType: "datetime",
                default: "2020/1/26",
                edit_able: false,
              },
              {
                column_label: "部门",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
            ],
          },
          {
            subTitle: "财务信息",
            form_layout: [
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
            ],
          },
          {
            subTitle: "教育信息",
            form_layout: [
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
            ],
          },
          {
            subTitle: "学历信息",
            form_layout: [
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
            ],
          },
          {
            subTitle: "工作信息",
            form_layout: [
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
            ],
          },
          {
            subTitle: "交际信息",
            form_layout: [
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
            ],
          },
          {
            subTitle: "附件信息",
            form_layout: [
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
              {
                column_label: "姓名",
                columnName: "oaa01",
                formType: "input",
                default: "张三",
                edit_able: false,
              },
            ],
          },
          {
            subTitle: "流程信息",
            form_layout: [
              {
                stepLabel: "第一步：申请人提交申请",
                stepState: "通过",
                stepMember: "分公司(2)系统管理员 2020-11-02 13:37:42",
                stepTime: "2016-07-12 12:40",
              },
              {
                stepLabel: "第二步：申请人提交申请",
                stepState: "通过",
                stepMember: "分公司(2)系统管理员 2020-11-02 13:37:42",
                stepTime: "2016-07-12 12:40",
              },
            ],
          },
        ],
      },
      // 底部操作栏
      showMore: false, //其他
      actions: [
        {
          title: "查看申请单详细信息1",
          url: "https://www.baidu.com/",
        },
        {
          title: "查看申请单详细信息2",
          url: "https://www.baidu.com/",
        },
        {
          title: "查看申请单详细信息3",
          url: "https://www.baidu.com/",
        },
      ],
      // BScroll数据
      scrollY: 0,
      currentIndex: 0, //当前选中项
      itemHeigth: [], //每一个分区高度的集合
    };
  },
  created() {
    // let that = this;
    // that.$nextTick(() => {
    //   //dom渲染完成后初始化BScroll
    //   that.initStorelistScroll();
    //   that.calculateHeight();
    // });
  },
  watch: {
    scrollY(newVal) {
      if (newVal > 0) {
        return (this.currentIndex = 0);
      }
      for (let i = 0; i < this.itemHeigth.length; i++) {
        let heigth1 = this.itemHeigth[i];
        let height2 = this.itemHeigth[i + 1];
        if (!height2 || (-newVal >= heigth1 && -newVal < height2)) {
          return (this.currentIndex = i);
        }
      }
    },
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear() + 1}/${
        date.getMonth() + 1
      }/${date.getDate()}`;
    },
    //********* BScroll *********
    initStorelistScroll() {
      let that = this;
      that.storeScroll = new BScroll(that.$refs.storeScroll, {
        click: true,
        probeType: 3,
      });
      that.storeScroll.on("scroll", (pos) => {
        that.scrollY = pos.y;
      });
    },
    // 计算分区高度
    calculateHeight() {
      let list = this.$refs.storeListGroup;
      let height = 0;
      this.itemHeigth.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.itemHeigth.push(height);
      }
    },
    // 点击滚动到指定项
    scrollTarget(index) {
      let itemList = this.$refs.storeListGroup;
      let el = itemList[index];
      this.storeScroll.scrollToElement(el, 200);
    },
    //********* BScroll *********
    //********* 内容区域操作 *****
    openDate(val) {
      this.$set(val, "show", true);
    },
    // 日期选择确认
    onConfirm(item, $event) {
      item.show = false;
      item.default = this.formatDate($event);
    },
    // 单选框
    openSelect(val){
      this.$set(val, "show", true);
    },
    onConfirm_select(item, $event){
      item.show = false;
      item.default = $event;
    },
    // 底部操作按钮区域
    showMoreBtn() {
      this.showMore = true;
    },
    toLink(link) {
      console.log(123);
      window.open(link);
    },
    agree(){
      console.log(this.formData.grops)
    },
  },
};
</script>

<style lang="less" scoped>
</style>