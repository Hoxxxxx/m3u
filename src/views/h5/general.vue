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
                      :placeholder="`请输入${td.label}`"
                    />
                  </van-collapse-item>
                </van-collapse>
              </div>
            </van-cell-group>
            <ul class="files" v-if="group.sub_title == '附件信息'">
              <li
                class="file"
                v-for="(file, file_index) in group.groups"
                :key="file_index"
              >
                <van-icon name="orders-o" size="30" />
                <span @click="download(file)">{{ file.filename }}</span>
              </li>
            </ul>
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
                      <span v-if="step.pertype == '0'" class="handling"
                        >审批中</span
                      >
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
        <!-- 审核/查看显示按钮 -->
        <div class="btn_check" v-if="type != 2">
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
            @click="next(3)"
            >退回</van-button
          >
          <van-button
            class="btn_operation"
            size="small"
            color="#FBD951"
            type="warning"
            @click="next(2)"
            >拒绝</van-button
          >
          <van-button
            class="btn_operation"
            size="small"
            color="#6DD400"
            type="danger"
            @click="next(1)"
            >同意</van-button
          >
        </div>
        <!-- 新增显示按钮 -->
        <div class="btn_add" v-else>
          <van-button
            class="btn_operation w2rem"
            size="small"
            color="#409EFF"
            type="warning"
            >保存</van-button
          >
          <van-button
            class="btn_operation w2rem"
            size="small"
            color="#6DD400"
            type="danger"
            @click="agree()"
            >下一步</van-button
          >
        </div>
      </footer>
    </van-skeleton>
  </div>
</template>

<script>
import { h5Data, h5DataAdd, h5NewProcess } from "@/api/process_new";
import {getUrlParams} from "@/utils/utils.js"
export default {
  data() {
    return {
      formData: {},
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
      type: null, //当前页面类型：查看、新增、审核  type=1就是审核  type=2 新增  type=3 查看
      noDATA: true, //控制显示骨架屏
      type:null,
      workid:"",
    };
  },
  created() {
    let params = getUrlParams(window.location.href)
    this.type = params.type ? params.type : 1;
    this.workid = params.workid
    if (this.type == 2) {
      this.geth5DataAdd();
    } else {
      this.geth5Data();
    }
  },
  methods: {
    // 获取审核/查看页面数据
    geth5Data() {
      let params = {
        workid: this.workid,
        type: this.type,
      };
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      h5Data(params).then((res) => {
        if (res.status == 200) {
          this.noDATA = false;
          let flow1 = {
            sub_title: "附件信息",
            groups: [],
          };
          flow1.groups = res.data.file;
          res.data.form_layout.push(flow1);
          let flow = {
            sub_title: "流程信息",
            groups: [],
          };
          flow.groups = res.data.workclass_perflow;
          res.data.form_layout.push(flow);
          this.formData = res.data;
          console.log(this.formData);
        } else {
          this.$toast({
            type: "fail",
            message: "数据获取失败！",
          });
        }
        this.$toast.clear();
      });
    },
    // 获取新增流程信息
    geth5DataAdd() {
      let params = {
        tplid: 8950,
      };
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
      });
      h5DataAdd(params).then((res) => {
        if (res.status == 200) {
          this.noDATA = false;
          this.formData = res.data;
        } else {
          this.$toast({
            type: "fail",
            message: "数据获取失败！",
          });
        }
        this.$toast.clear();
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
      window.open(link);
    },
    agree() {
      let param = {
        annexurlid: [],
        from_data: {},
        tplid: 8950,
      };
      this.formData.form_layout.forEach((item) => {
        item.groups.forEach((group) => {
          if (group.form_type != "table") {
            param.from_data[group.name] = group.show;
          } else {
            let arrSon = [];
            let arr = {};
            group.son.forEach((ele) => {
              arr[ele.name] = ele.show;
            });
            arrSon.push(arr);
            param.from_data[group.name] = arrSon;
          }
        });
      });
      h5NewProcess(param).then((res) => {
        if (res.status == 200) {
          this.$toast({
            type: "success",
            message: "成功！",
          });
        } else {
          this.$toast({
            type: "fail",
            message: "失败",
          });
        }
      });
    },
    // 文件下载
    async download(file) {
      let u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        //安卓手机
        if (this.formData.work_type == "unique") {
          let url = file.fileaddr; // 绝对地址
          let a = document.createElement("a");
          a.download = file.filename;
          a.href = url;
          a.target = "_blank";
          document.appendChild(a);
          a.click();
          document.removeChild(a);
        } else {
          const { data: res } = await this.axios({
            method: "get",
            url: `files/download/${file.id}`,
            responseType: "blob",
          });
          let fileName = file.filename;
          let fileType = {
            doc: "application/msword",
            docx:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            xls: "application/vnd.ms-excel",
            xlsx:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ppt: "application/vnd.ms-powerpoint",
            pptx:
              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            pdf: "application/pdf",
            txt: "text/plain",
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            zip: "application/zip",
            rar: "application/x-rar",
          };
          let type = fileName.split(".")[1]; //获取文件后缀名
          let blob = new Blob([res], {
            type: fileType[type],
          });
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      } else if (u.indexOf("iPhone") > -1) {
        //苹果手机
        this.$toast({
          type: "fail",
          message: "不支持苹果手机下载文件，请到PC端处理！",
        });
      }
    },
    // 同意拒绝退回
    next(val){
      this.$router.push({
        path:'/h5/toss',
        query:{
          tosstype:val,
          workid:this.workid
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
</style>