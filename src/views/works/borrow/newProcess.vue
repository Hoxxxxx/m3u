<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
        <el-button type="primary" class="save" @click="addNewFlow()">保存</el-button>
        <el-button type="primary" class="next" @click="nextStep()">下一步</el-button>
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
            <div class="title">出差借款申请</div>
            <div class="table_Info">
              <span class="code">业务日期：{{tableData.oaa02}}</span>
              <span class="name">申请单编号：{{tableData.oaa01}}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line  last_line">
                <div class="titlebox">经办人</div>
                <div class="infobox">{{tableData.oaa03}}</div>
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa04"
                    class="select"
                    placeholder="请选择申请人"
                    :loading="fixedData.selectLoading"
                  >
                    <el-option
                      v-for="item in fixedData.genList"
                      :key="item.gen01"
                      :label="item.gen02"
                      :value="item.gen01"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <!-- 出差信息 -->
              <div class="title_line">出差信息</div>
              <div class="form_line">
                <div class="titlebox">预计开始时间</div>
                <div class="infobox middlebox databox">
                  <el-date-picker
                    v-model="tableData.oaa31"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">预计结束时间</div>
                <div class="infobox middlebox databox">
                  <el-date-picker
                    v-model="tableData.oaa32"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">实际开始时间</div>
                <div class="infobox middlebox databox">
                  <el-date-picker
                    v-model="tableData.oaa33"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
                <div class="titlebox">实际结束时间</div>
                <div class="infobox middlebox databox last_row">
                  <el-date-picker
                    v-model="tableData.oaa34"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">出差目的</div>
                <div class="infobox longbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa30"
                    placeholder="请输入出差目的"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">出差地点</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa35">
                    <el-radio :label="1">一般地区</el-radio>
                    <el-radio :label="2">特殊地区</el-radio>
                  </el-radio-group>
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa36"
                    placeholder="请输入出差地点"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">交通工具</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa37">
                    <el-radio :label="1">飞机</el-radio>
                    <el-radio :label="2">火车</el-radio>
                    <el-radio :label="3">汽车</el-radio>
                    <el-radio :label="4">其它</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">访问单位</div>
                <div class="infobox longbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa38"
                    placeholder="请输入访问单位"
                  />
                </div>
              </div>
              <div class="form_line  last_line">
                <div class="titlebox">是否需要借款</div>
                <div class="infobox longbox">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa39">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <!-- 借款信息 -->
              <div class="title_line">借款信息</div>
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa06"
                    class="select"
                    placeholder="请选择币种"
                    :loading="fixedData.selectLoading"
                  >
                    <el-option
                      v-for="item in fixedData.azisList"
                      :key="item.azi01"
                      :label="item.azi02"
                      :value="item.azi01"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">借款金额</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa07"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">汇率</div>
                <div class="infobox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa08"
                    placeholder="请输入访问单位"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">收款人</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa09"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">账号</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa10"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">开户行</div>
                <div class="infobox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
                    placeholder="请输入访问单位"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">支付方式</div>
                <div class="infobox longbox  selectbox">
                  <el-select
                    v-model="tableData.oaa12"
                    class="select"
                    placeholder="请选择支付方式"
                    :loading="fixedData.selectLoading"
                  >
                    <el-option
                      v-for="item in fixedData.pmasList"
                      :key="item.pma01"
                      :label="item.pma02"
                      :value="item.pma01"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">借款事由</div>
                <div class="infobox longbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa13"
                    placeholder="请输入访问单位"
                  />
                </div>
              </div>
              <!-- 交际信息 -->
              <div class="title_line">交际信息</div>
              <div class="form_line">
                <div class="titlebox">支出项目</div>
                <div class="infobox middlebox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa20"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">实施时间</div>
                <div class="infobox middlebox databox last_row">
                  <el-date-picker
                    v-model="tableData.oaa21"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">我方参加部门</div>
                <div class="infobox middlebox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa22"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">对方参加部门</div>
                <div class="infobox middlebox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa23"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">我方参加人员</div>
                <div class="infobox middlebox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa24"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">对方参加人员</div>
                <div class="infobox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa25"
                    placeholder="请输入访问单位"
                  />
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">付款预算金额</div>
                <div class="infobox middlebox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa26"
                    placeholder="请输入访问单位"
                  />
                </div>
                <div class="titlebox">区分</div>
                <div class="infobox middlebox last_row">
                  <el-radio-group class="radioGroup" v-model="tableData.oaa27">
                    <el-radio :label="1">交际费</el-radio>
                    <el-radio :label="2">会议费</el-radio>
                  </el-radio-group>
                </div>
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
              <span class="name">流程名称：固定资产付款(No:20201102134630)张康成</span>
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
          :action="$store.state.upload_url"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
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
                <p class="admin">分公司(2)系统管理员	2020-11-02 13:37:42</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <p class="step">第二步：部门主管审批 (主办：部门主管)</p>
                <p class="result handling">流程办理中</p>
                <p class="admin">分公司(2)系统管理员	2020-11-02 13:37:42</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
      </div>
    </el-card>

  </div>
</template>

<script>
// api
import { gensList, azisList, pmasList,  } from "@/api/basic";
import { addFlow,  } from "@/api/process_new";

export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      workid: '',
      tableData: {
        oaa01: '',
        oaa02: '',
        oaa03: '',
        oaa04: '',
        oaa05: '',
        oaa06: 'RMB',
        oaa07: '',
        oaa08: '1',
        oaa09: '',
        oaa10: '',
        oaa11: '',
        oaa12: '',
        oaa13: '',
        oaa20: '',
        oaa21: '',
        oaa22: '',
        oaa23: '',
        oaa24: '',
        oaa25: '',
        oaa26: '',
        oaa27: '',
        oaa30: '',
        oaa31: '',
        oaa32: '',
        oaa33: '',
        oaa34: '',
        oaa35: '',
        oaa36: '',
        oaa38: '',
        oaa39: ''
      },
      fixedData: {
        selectLoading: true,
        // 申请人列表
        genList: [],
        // 币种列表
        azisList: [],
        // 付款方式列表
        pmasList: [],
      },
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8941
      },
    };
  },
  created() {
    this.getGens()
    this.getAzis()
    this.getPmas()
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取下拉列表信息************
    getGens () {
      gensList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.genList = result.data;
          this.fixedData.selectLoading = false;
        } else {
          this.$message.error("获取员工列表失败：" + result.error.message);
        }
      })
    },
    getAzis () {
      azisList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
          this.fixedData.selectLoading = false;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      })
    },
    getPmas () {
      pmasList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.pmasList = result.data;
          this.fixedData.selectLoading = false;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      })
    },
    // *******************************************
    // ****************附件上传*****************
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.addParams.annexurlid.push({
        filename: response.data.filename,
        fileaddr: response.data.path
      })
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.addParams.annexurlid.forEach( (item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice( index, 1 )
        }
      })
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // *******************************************
    // ****************其他操作*******************
    // 新增表单
    addNewFlow() {
      this.addParams.from_data = this.tableData
      addFlow(this.addParams)
      .then( result => {
        this.workid = result.data.workid
        this.tableData.oaa01 = result.data.oaa01
        this.tableData.oaa02 = result.data.oaa02
      })
    },
    // 下一步
    nextStep() {
      this.addParams.from_data = this.tableData
      addFlow(this.addParams)
      .then( result => {
        this.workid = result.data.workid
        this.tableData.oaa01 = result.data.oaa01
        this.tableData.oaa02 = result.data.oaa02
      })
      .then(() => {
        this.$router.push(
          {
            path:'/apply',
            query: {
              workid: this.workid,
              oaa01: this.tableData.oaa01,
              oaa02: this.tableData.oaa02
            }
          }
        )
      });
    }

  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
</style>
