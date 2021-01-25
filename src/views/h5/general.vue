<template>
  <div class="h5Home">
    <div class="head">
      <header>{{ formData.workName }}</header>
      <div class="store-list-shortcut">
        <van-tabs
          v-model="currentIndex"
          :title-active-color="'#409EFD'"
          :color="'#409EFD'"
          @click="scrollTarget"
        >
          <van-tab
            v-for="(sub, sub_index) in formData.subTitles"
            :title="sub"
            :key="sub_index"
          >
          </van-tab>
        </van-tabs>
      </div>
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
    </div>
    <div class="cont">
      <div class="storeList" ref="storeScroll">
        <ul>
          <li
            v-for="(group, grop_index) in formData.grops"
            class="store-list-group"
            :key="grop_index"
            ref="storeListGroup"
          >
            <h2 class="store-list-group-title">{{ group.subTitle }}</h2>
            <van-cell-group>
              <van-field
                v-for="(item, index) in group.form_layout"
                :key="index"
                v-model="item.default"
                :label="item.column_label"
                :value="item.default"
                input-align="right"
                label-class="label"
                clearable
                :readonly="!item.edit_able"
              />
            </van-cell-group>
          </li>
          <li>
            <h2 class="store-list-group-title">流程信息</h2>
            <van-steps direction="vertical" :active="0" active-color="#969799">
              <van-step>
                <p>2016-07-12 12:40</p>
                <div class="stepInner">
                  <h5 class="stepLabel">第一步：申请人提交申请</h5>
                  <h5 class="stepState">通过</h5>
                  <h5 class="stepMember">
                    分公司(2)系统管理员 2020-11-02 13:37:42
                  </h5>
                </div>
              </van-step>
              <van-step>
                <p>2016-07-12 12:40</p>
                <div class="stepInner">
                  <h5 class="stepLabel">第一步：申请人提交申请</h5>
                  <h5 class="stepState">通过</h5>
                  <h5 class="stepMember">
                    分公司(2)系统管理员 2020-11-02 13:37:42
                  </h5>
                </div>
              </van-step>
            </van-steps>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <van-popover v-model="showMore" trigger="click" placement="top-start">
        <div class="linkBox" v-for="(link, link_index) in actions"
          :key="link_index">
          <van-icon name="info-o" />
          <span>{{ link.title }}</span>
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
        ],
      },
      // 底部操作栏
      showMore: false, //其他
      actions: [
        {
          title: "查看更多",
          url: "www.baidu.com",
        },
      ],
      // BScroll数据
      scrollY: 0,
      currentIndex: 0, //当前选中项
      itemHeigth: [], //每一个分区高度的集合
    };
  },
  created() {
    let that = this;
    that.$nextTick(() => {
      //dom渲染完成后初始化BScroll
      that.initStorelistScroll();
      that.calculateHeight();
    });
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
    // 底部操作按钮区域
    showMoreBtn() {
      this.showMore = true;
    },
  },
};
</script>

<style lang="less" scoped>
</style>