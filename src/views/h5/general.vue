<template>
  <div class="h5Home">
    <van-skeleton round :row="20" animate :loading="noDATA">
      <div class="head">
        <header>{{ formData.work_name }}</header>
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
              <span class="serial_cont">{{ formData.business_date }}</span>
            </div>
            <div>
              <span class="serial_label">申请单编号:</span>
              <span class="serial_cont">{{ formData.number }}</span>
            </div>
          </div>
          <van-tab
            v-for="(group, grop_index) in formData.form_layout"
            :key="grop_index"
            :title="group.sub_title"
          >
            <h2 class="store-list-group-title">{{ group.sub_title }}</h2>
            <van-cell-group v-for="(item, index) in group.groups" :key="index">
              <van-field
                v-if="item.form_type == 'input'"
                v-model="item.show"
                :label="item.label"
                :name="item.name"
                input-align="right"
                label-class="label"
                clearable
                :required="item.required"
                :readonly="!item.editable"
                :placeholder="`请输入${item.label}`"
              />
              <div v-if="item.form_type == 'datetime'">
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
              <div v-if="item.form_type == 'select'">
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
              <div v-if="item.form_type == 'table'" class="table">
                <van-collapse v-model="item.son">
                  <van-collapse-item
                    :title="`${group.sub_title}表${index + 1}`"
                    :name="`${index + 1}`"
                  >
                    <van-field
                      v-for="(td, td_index) in item.son"
                      :key="td_index"
                      v-model="td.show"
                      :name="td.name"
                      :label="td.label"
                      input-align="right"
                      label-class="label"
                      clearable
                      :required="td.required"
                      :readonly="!td.editable"
                      :placeholder="`请输入${item.label}`"
                    />
                  </van-collapse-item>
                </van-collapse>
              </div>
            </van-cell-group>
            <van-steps
              v-if="group.sub_title == '流程信息'"
              direction="vertical"
              :active="group.groups.length - 1"
              active-color="#F56C6C"
            >
              <van-step
                v-for="(step, step_index) in group.groups"
                :key="step_index"
              >
                <p>{{ step.date }}</p>
                <div class="stepInner">
                  <h5 class="stepLabel">
                    {{ `第${step_index + 1}步 ${step.title}` }}
                  </h5>
                  <h5 class="stepState">
                    <template>
                      <span v-if="step.pertype == '99'">通过</span>
                      <span v-if="step.pertype == '0'" class="handling">审批中</span>
                      <span v-if="step.pertype == '2'">拒绝</span>
                      <span v-if="step.pertype == '3'">退回</span>
                      <span v-if="step.pertype == '5'">审批结束</span>
                    </template>
                  </h5>
                  <h5 class="stepMember">{{ step.name }} {{ step.date }}</h5>
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
    </van-skeleton>
  </div>
</template>

<script>
import { h5Data } from "@/api/process_new";
import { Toast } from "vant";
export default {
  data() {
    return {
      formData: {
        // workName: "出差申请单",
        // tplid: "8950",
        // work_type: "unique",
        // subTitles: [
        //   "基本信息",
        //   "财务信息",
        //   "教育信息",
        //   "学历信息",
        //   "工作信息",
        //   "交际信息",
        //   "附件信息",
        //   "流程信息",
        // ],
        // grops: [],
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
      type: "check",
      noDATA: true,
    };
  },
  created() {
    this.geth5Data();
  },
  mounted() {},
  watch: {},
  methods: {
    // 获取当前页面数据
    geth5Data() {
      let params = {
        workid: 5908,
        type: 1,
      };
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      h5Data(params).then((res) => {
        if (res.status == 200) {
          this.noDATA = false;
          let flow = {
            sub_title: "流程信息",
            groups: [],
          };
          flow.groups = res.data.workclass_perflow;
          res.data.form_layout.push(flow);
          let copy = JSON.parse(JSON.stringify(res.data.form_layout[3].groups[0]))
          res.data.form_layout[3].groups.push(copy)
          this.formData = res.data;
          console.log(this.formData)
        } else {
          Notify({ type: "danger", message: "数据获取失败" });
        }
        Toast.clear();
      });
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
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
    openSelect(val) {
      this.$set(val, "show", true);
    },
    onConfirm_select(item, $event) {
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
    agree() {
      console.log(this.formData);
    },
  },
};
</script>

<style lang="less" scoped>
</style>