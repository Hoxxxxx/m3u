<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" @click="$router.push('/')"
          >回到首页</el-button
        >
        <el-button type="primary" class="save">保存</el-button>
        <el-button type="primary" class="next" @click="$router.push('/apply')"
          >下一步</el-button
        >
      </div>
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane name="firTab">
          <!-- tab标签 -->
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'firTab' ? 'potActive' : ''"
            ></span>
            <span>表单</span>
          </div>
          <!-- 内容 -->
          <div class="tabContent">
            <div class="title">外地差旅报销单（华录新媒）</div>
            <div class="table_Info">
              <span class="code">编号：20201102134</span>
              <span class="name"
                >流程名称：固定资产付款(No:20201102134630)张康成</span
              >
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox">
                  {{ tableData.name }}
                </div>
                <div class="titlebox">申请人</div>
                <div class="infobox">
                  <el-select
                    v-model="tableData.apply"
                    class="select"
                    placeholder="请选择申请人"
                  >
                    <el-option
                      v-for="item in fixedData.applys"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">员工编号</div>
                <div class="infobox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.name"
                    placeholder="请输入员工编号"
                  />
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot">
                  {{ tableData.company }}
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.name"
                    placeholder="请输入联系电话"
                  />
                </div>
                <div class="titlebox"></div>
                <div class="infobox last_row"></div>
              </div>
              <!-- 报销信息 -->
              <div class="title_line">报销信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox">
                  <el-select
                    v-model="tableData.cointype"
                    class="select"
                    placeholder="请选择币种"
                  >
                    <el-option
                      v-for="item in fixedData.cointypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">汇率</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.rate"
                    placeholder="请输入汇率"
                  />
                </div>
                <div class="titlebox">支付金额</div>
                <div class="infobox last_row editNot">
                  {{ tableData.payMoney }}
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">报销金额</div>
                <div class="infobox editNot">
                  {{ tableData.expenseMoney }}
                </div>
                <div class="titlebox">报销金额大写</div>
                <div class="infobox editNot">
                  {{ tableData.expenseMoneyF }}
                </div>
                <div class="titlebox">支付方式</div>
                <div class="infobox last_row">
                  <el-select
                    v-model="tableData.payType"
                    class="select"
                    placeholder="请选择支付方式"
                  >
                    <el-option
                      v-for="item in fixedData.payTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <!-- 3 -->
              <div class="form_line">
                <div class="titlebox">发票张数</div>
                <div class="infobox longbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.rate"
                    placeholder="请输入发票张数"
                  />
                </div>
              </div>
              <!-- 4 -->
              <div class="form_line">
                <div class="titlebox">出差申请单</div>
                <div class="infobox longbox">
                  <el-select
                    v-model="tableData.applyType"
                    class="select"
                    placeholder="请选择出差申请单"
                  >
                    <el-option
                      v-for="item in fixedData.applyTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <!-- 5 -->
              <div class="form_line last_line">
                <div class="titlebox">说明</div>
                <div class="infobox last_row longbox" style="width: 100%">
                  <input
                    class="abstracInput"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="tableData.rate"
                    placeholder="请输入说明"
                  />
                </div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">收款人</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.name"
                    placeholder="请输入收款人"
                  />
                </div>
                <div class="titlebox">开户行</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.name"
                    placeholder="请输入开户行"
                  />
                </div>
                <div class="titlebox">收款账号</div>
                <div class="infobox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.name"
                    placeholder="请输入收款账号"
                  />
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">支票号</div>
                <div class="infobox last_row longbox" style="width: 100%">
                  <input
                    class="abstracInput"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="tableData.rate"
                    placeholder="请输入支票号"
                  />
                </div>
              </div>
              <!-- 费用明细行项目 -->
              <div class="title_line">费用明细行项目</div>
              <div>
                <el-table
                  :data="tableData.formData"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="id"
                    label="增 / 删"
                    fixed="left"
                    min-width="100px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div style="font-size: 24px; width: 100%; height: 100%">
                          <i
                            v-if="scope.$index == tableData.formData.length - 1"
                            @click="addRow()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i>
                          <i
                            @click="deleteRow(scope.$index)"
                            class="el-icon-remove"
                            style="color: #f56c6c; width: 30px; cursor: pointer"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb02"
                    label="会计科目"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select v-model="scope.row.apb02" placeholder="请选择会计科目">
                          <el-option
                            v-for="item in fixedData.options_01"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb09"
                    label="项目"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select v-model="scope.row.apb09" placeholder="请选择项目">
                          <el-option
                            v-for="item in fixedData.options_02"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb28"
                    label="项目WBS"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select v-model="scope.row.apb09" placeholder="请选择项目WBS">
                          <el-option
                            v-for="item in fixedData.options_03"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb35"
                    label="摘要"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="单位"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb36"
                    label="金额（不含税）"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="单位"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb25"
                    label="折合后金额"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="单位"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb26"
                    label="核算项一"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select v-model="scope.row.apb26" placeholder="请选择项目WBS">
                          <el-option
                            v-for="item in fixedData.options_04"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb23"
                    label="核算项二"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select v-model="scope.row.apb23" placeholder="请选择项目WBS">
                          <el-option
                            v-for="item in fixedData.options_05"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 冲销信息 -->
              <div class="title_line">冲销信息</div>
              <div>
                <el-table
                  :data="tableData.formData"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="id"
                    label="增 / 删"
                    fixed="left"
                    min-width="100px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div style="font-size: 24px; width: 100%; height: 100%">
                          <i
                            v-if="scope.$index == tableData.formData.length - 1"
                            @click="addRow()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i>
                          <i
                            @click="deleteRow(scope.$index)"
                            class="el-icon-remove"
                            style="color: #f56c6c; width: 30px; cursor: pointer"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb02"
                    label="待抵单号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb02"
                          placeholder="项次"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb09"
                    label="借款日期"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb09"
                          placeholder="数量"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb28"
                    label="借款人"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="单位"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb35"
                    label="借款总金额"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="单位"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb36"
                    label="还款金额"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="单位"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb25"
                    label="凭证号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="单位"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="流程进度" name="secTab">
          <!-- tab标签 -->
          <div slot="label" class="potBox">
            <span
              class="pot"
              :class="activeTab == 'secTab' ? 'potActive' : ''"
            ></span>
            <span> 流程进度</span>
          </div>
          <!-- 内容 -->
          <div class="tabContent">
            <div class="title">固定资产付款</div>
            <div class="table_Info">
              <span class="code">编号：20201102134</span>
              <span class="name"
                >流程名称：固定资产付款(No:20201102134630)张康成</span
              >
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 附件区域 -->
    <el-card class="secContentCard" v-if="activeTab == 'firTab'">
      <!-- 内容 -->
      <div class="tabContent">
        <div class="title">附件内容</div>
        <el-upload
          class="upload_annex"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-card>

    <el-card class="secContentCard" v-if="activeTab == 'secTab'">
      <div class="tabContent">
        <div class="title">流程办理进度</div>
        <el-timeline class="timeline">
          <el-timeline-item timestamp="2018/4/12" placement="top">
            <el-card>
              <p class="step">第一步：申请人提交申请</p>
              <p class="result">通过</p>
              <p class="admin">分公司(2)系统管理员 2020-11-02 13:37:42</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2018/4/3" placement="top">
            <el-card>
              <p class="step">第二步：部门主管审批 (主办：部门主管)</p>
              <p class="result handling">流程办理中</p>
              <p class="admin">分公司(2)系统管理员 2020-11-02 13:37:42</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
// import FixedBtns from "@/components/fixedBtns";

export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      tableData: {
        name: "张明",
        apply: "", //申请人
        company: "",
        cointype: "", //币种
        rate: "", //汇率
        payMoney: "", //支付金额
        payType: "", //支付方式
        applyType: "", //出差申请单
        formData: [{}],
      },
      fixedData: {
        // 申请人列表
        applys: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        // 币种列表
        cointypes: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        payTypes: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        applyTypes: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        // 表格部分
        // 会计科目
        options_01:[
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        //项目
        options_02:[
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        //项目WBS
        options_03:[
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        // 核算项一
        options_04:[
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        // 核算项二
        options_05:[
          {
            value: "选项1",
            label: "黄金糕",
          },
        ]
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  created() {},
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
</style>
