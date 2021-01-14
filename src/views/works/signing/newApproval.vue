<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button
          v-for="(link, index) in more"
          :key="index"
          type="primary"
          class="saveBtn"
          @click="seeMore(link.url)"
          >{{ link.name }}</el-button
        >
        <el-button type="primary" class="save" @click="editNewFlow()"
          >保存</el-button
        >
        <el-button
          v-if="workclass_personnel.perid.flownum == 1"
          type="primary"
          class="next"
          @click="nextStep('/apply')"
          >下一步</el-button
        >
        <!-- <el-button class="normal" style="margin-left: 50px">委托</el-button> -->
        <!-- <el-button class="normal">挂起</el-button> -->
        <!-- <el-button class="normal">增加会签人</el-button> -->
        <!-- <el-button class="normal" style="margin-right: 70px">抛转</el-button> -->
        <el-button
          v-if="workclass_personnel.perid.flownum !== 1"
          type="primary"
          class="agree"
          @click="nextStep('/agree')"
          >同意</el-button
        >
        <el-button
          v-if="workclass_personnel.perid.flownum !== 1"
          type="primary"
          class="reject"
          @click="nextStep('/reject')"
          >拒绝</el-button
        >
        <el-button
          v-if="workclass_personnel.perid.flownum !== 1"
          type="primary"
          class="back"
          @click="nextStep('/back')"
          >退回</el-button
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
            <div class="title">{{ workName }}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa03') ? 'redPot' : ''">经办人</span>
                </div>
                <div
                  class="infobox middlebox editNot"
                  v-if="!table_able.includes('oaa03')"
                >
                  {{ tableData.oaa03_show }}
                </div>
                <div
                  class="infobox selectbox"
                  v-if="table_able.includes('oaa03')"
                >
                  <div class="selector" @click="selectDialog('JBR')">
                    {{ tableData.oaa03_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div
                  class="infobox selectbox editNot"
                  v-if="!table_able.includes('oaa04')"
                >
                  {{ tableData.oaa04_show }}
                </div>
                <div
                  class="infobox selectbox"
                  v-if="table_able.includes('oaa04')"
                >
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ tableData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa06') ? 'redPot' : ''">所属部门</span>
                </div>
                <div
                  class="infobox selectbox editNot last_row"
                  v-if="!table_able.includes('oaa06')"
                >
                  {{ tableData.oaa06_show }}
                </div>
                <div
                  class="infobox selectbox last_row"
                  v-if="table_able.includes('oaa06')"
                >
                  <div class="selector" @click="selectDialog('BM')">
                    {{ tableData.oaa06_show }}
                  </div>
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div
                  class="infobox selectbox longbox editNot"
                  v-if="!table_able.includes('oaa05')"
                >
                  {{ tableData.oaa05 }}
                </div>
                <div
                  class="infobox selectbox longbox last_row"
                  v-if="table_able.includes('oaa05')"
                >
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <!-- 签约方信息 -->
              <div class="title_line">签约方信息</div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa10') ? 'redPot' : ''"
                    >签约方</span
                  >
                </div>
                <div class="infobox longbox selectbox">
                  <el-radio-group
                    class="radioGroup"
                    style="margin-right: 120px"
                    v-model="tableData.oaa10"
                  >
                    <el-radio :label="1" :disabled="table_able.includes('oaa10') ? false : true">供应商</el-radio>
                    <el-radio :label="2" :disabled="table_able.includes('oaa10') ? false : true">客户</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div>
                <div v-if="tableData.oaa10 == 1">
                  <div class="title_line">供应商信息</div>
                  <div class="form_line">
                    <div class="titlebox">
                      <span :class="form_must_able.includes('oab01') ? 'redPot' : ''"
                        >厂商简称</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oab01')">
                      {{ tableData.oab01 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oab01')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oab01"
                        placeholder="请输入厂商简称"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oab02') ? 'redPot' : ''"
                        >厂商全称</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oab02')">
                      {{ tableData.oab01 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oab02')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oab02"
                        placeholder="请输入厂商全称"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oab03') ? 'redPot' : ''"
                        >惯用税种</span
                      >
                    </div>
                    <div class="infobox selectbox editNot last_row" v-if="!table_able.includes('oab03')">
                      {{ tableData.oab03 }}
                    </div>
                    <div class="infobox selectbox last_row" v-if="table_able.includes('oab03')">
                      <div class="selector" @click="selectDialog('SZ_GYS')">
                        {{ tableData.oab03 }}
                      </div>
                    </div>
                  </div>
                  <div class="title_line">
                    <el-button
                      type="primary"
                      size="small"
                      style="position: absolute; right: 4px; top: 4px"
                      @click="addBank()"
                      v-if="table_able.includes('oac')"
                      >新增银行信息</el-button
                    >
                    银行信息
                  </div>
                  <div
                    class="form_line"
                    v-for="(line, index) in tableData.oac"
                    :key="index"
                    style="position:relative;"
                  >
                    <i
                      @click="deleteBank(index)"
                      class="el-icon-remove"
                      style="position:absolute;left:10px;top:10px;color: #f56c6c; width: 30px; cursor: pointer;font-size:20px"
                      v-if="table_able.includes('oac')"
                    ></i>
                    <div class="titlebox">
                      <span :class="form_must_able.includes('oac') ? 'redPot' : ''"
                        >账户名称</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oac01')">
                      {{ tableData.oac01 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oac01')">
                      <input
                        class="abstracInput"
                        v-model="line.oac01"
                        placeholder="请输入账户名称"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oac') ? 'redPot' : ''"
                        >银行账号</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oac02')">
                      {{ tableData.oac02 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oac02')">
                      <input
                        class="abstracInput"
                        v-model="line.oac02"
                        placeholder="请输入合同名称"
                        :disabled="table_able.includes('oac02') ? false : true"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oac') ? 'redPot' : ''"
                        >开户行名称</span
                      >
                    </div>
                    <div class="infobox selectbox editNot last_row" v-if="!table_able.includes('oac03')">
                      {{ tableData.oac03 }}
                    </div>
                    <div class="infobox selectbox last_row" v-if="table_able.includes('oac03')">
                      <input
                        class="abstracInput"
                        v-model="line.oac03"
                        placeholder="请输入合同金额"
                        :disabled="table_able.includes('oac03') ? false : true"
                      />
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="title_line">客户信息</div>
                  <div class="form_line">
                    <div class="titlebox">
                      <span :class="form_must_able.includes('oad01') ? 'redPot' : ''"
                        >客户简称</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oad01')">
                      {{ tableData.oad01 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oab03')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad01"
                        placeholder="请输入客户简称"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oad02') ? 'redPot' : ''"
                        >客户全称</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oad02')">
                      {{ tableData.oad02 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oab03')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad02"
                        placeholder="请输入客户全称"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oad03') ? 'redPot' : ''"
                        >惯用税种</span
                      >
                    </div>
                    <div class="infobox selectbox editNot last_row" v-if="!table_able.includes('oad03')">
                      {{ tableData.oad03 }}
                    </div>
                    <div class="infobox selectbox last_row" v-if="table_able.includes('oab03')">
                      <div class="selector" @click="selectDialog('SZ_KH')">
                        {{ tableData.oad03 }}
                      </div>
                    </div>
                  </div>
                  <div class="title_line">开票信息</div>
                  <div class="form_line">
                    <div class="titlebox">
                      <span :class="form_must_able.includes('oad04') ? 'redPot' : ''"
                        >名称</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oad04')">
                      {{ tableData.oad04 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oad04')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad04"
                        placeholder="请输入名称"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oad05') ? 'redPot' : ''"
                        >纳税人识别号</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oad05')">
                      {{ tableData.oad05 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oad05')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad05"
                        placeholder="请输入纳税人识别号"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oad06') ? 'redPot' : ''"
                        >地址</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oad06')">
                      {{ tableData.oad06 }}
                    </div>
                    <div class="infobox selectbox last_row" v-if="table_able.includes('oad06')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad06"
                        placeholder="请输入地址"
                      />
                    </div>
                  </div>
                  <div class="form_line">
                    <div class="titlebox">
                      <span :class="form_must_able.includes('oad07') ? 'redPot' : ''"
                        >银行账号</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oad07')">
                      {{ tableData.oad07 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oad07')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad07"
                        placeholder="请输入银行账号"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oad08') ? 'redPot' : ''"
                        >开户行</span
                      >
                    </div>
                    <div class="infobox selectbox editNot" v-if="!table_able.includes('oad08')">
                      {{ tableData.oad08 }}
                    </div>
                    <div class="infobox selectbox" v-if="table_able.includes('oad08')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad08"
                        placeholder="请输入开户行"
                      />
                    </div>
                    <div class="titlebox required">
                      <span :class="form_must_able.includes('oad08') ? 'redPot' : ''"
                        >电话</span
                      >
                    </div>
                    <div class="infobox selectbox editNot last_row" v-if="!table_able.includes('oad09')">
                      {{ tableData.oad09 }}
                    </div>
                    <div class="infobox selectbox last_row" v-if="table_able.includes('oad09')">
                      <input
                        class="abstracInput"
                        v-model="tableData.oad09"
                        placeholder="请输入电话"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox required">
                  <span :class="form_must_able.includes('oaa11') ? 'redPot' : ''">合同文件</span>
                </div>
                <div
                  class="infobox longbox selectbox"
                  style="padding: 10px 20px"
                >
                  <!-- 已有文件部分 -->
                  <div class="saveList">
                    <div
                      class="saveItem"
                      v-for="(item, index) in fileList_down"
                      :key="index"
                    >
                      <i class="el-icon-document" style="margin-right: 7px"></i>
                      <a
                        style="cursor: pointer"
                        @click="download(item.id, item.name)"
                        ><span>{{ item.name }}</span></a
                      >
                      <div class="">
                        <!-- <el-button type="text">预览</el-button> -->
                        <el-button
                          type="text"
                          @click="download(item.id, item.name)"
                          >下载</el-button
                        >
                      </div>
                    </div>
                  </div>
                  <el-upload
                    v-if="table_able.includes('oaa11')"
                    class="upload_annex"
                    :action="$store.state.upload_url"
                    :on-success="handleSuccess"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeAvatarUpload"
                    :before-remove="beforeRemove"
                    multiple
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.png,.jpg,.jpeg,.zip,.rar"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa12') ? 'redPot' : ''">说明</span>
                </div>
                <div
                  class="infobox longbox infoShow"
                  v-if="!table_able.includes('oaa12')"
                >
                  {{ tableData.oaa12 }}
                </div>
                <div
                  class="infobox longbox areabox"
                  style="width: 100%"
                  v-if="table_able.includes('oaa12')"
                >
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa12"
                    placeholder="请输入说明"
                    maxlength="255"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa13') ? 'redPot' : ''">备注</span>
                </div>
                <div
                  class="infobox longbox infoShow"
                  v-if="!table_able.includes('oaa13')"
                >
                  {{ tableData.oaa13 }}
                </div>
                <div class="longbox" v-if="table_able.includes('oaa13')">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa13"
                    placeholder="请输入备注"
                    maxlength="255"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <!-- 财务信息 -->
              <!--  v-if="workclass_personnel.perid.flownum==3 && oazShow == 1" -->
              <div>
                <div class="title_line">
                  抛转信息
                  <el-button
                    type="primary"
                    size="small"
                    style="position: absolute; right: 4px; top: 4px"
                    @click="generate()"
                    >生成签约方</el-button
                  >
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaz01') ? 'redPot' : ''">日期</span>
                  </div>
                  <div class="infobox middlebox datebox ">
                    <el-date-picker
                      v-model="oaz.oaz01"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaz02') ? 'redPot' : ''">签约方编号</span>
                  </div>
                  <div class="infobox selectbox middlebox editNot last_row">
                    {{ oaz.oaz02 }}
                  </div>
                </div>
              </div>
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
        <!-- 已有文件部分 -->
        <div class="saveList">
          <div
            class="saveItem"
            v-for="(item, index) in fileList_user"
            :key="index"
          >
            <i class="el-icon-document" style="margin-right: 7px"></i>
            <a style="cursor: pointer" @click="download(item.id, item.name)"
              ><span>{{ item.name }}</span></a
            >
            <div class="btnBox">
              <el-button type="text" @click="download(item.id, item.name)"
                >下载</el-button
              >
            </div>
          </div>
        </div>
        <!-- 上传部分 -->
        <el-upload
          class="upload_annex"
          :action="$store.state.upload_url"
          :on-success="handleSuccess_sec"
          :on-preview="handlePreview_sec"
          :on-remove="handleRemove_sec"
          :before-upload="beforeAvatarUpload_sec"
          :before-remove="beforeRemove_sec"
          multiple
          :on-exceed="handleExceed_sec"
          :file-list="fileList_sec"
          accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.png,.jpg,.jpeg,.zip,.rar"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </el-card>

    <el-card class="secContentCard" v-if="activeTab == 'secTab'">
      <div class="tabContent">
        <div class="title">流程办理进度</div>
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="(item, index) in workclass_perflow"
            :key="index"
            :timestamp="item.date"
            placement="top"
          >
            <el-card>
              <p class="step">第{{ index + 1 }}步：{{ item.title }}</p>
              <p class="result">
                <template>
                  <p v-if="item.pertype == '99'">通过</p>
                  <p v-if="item.pertype == '0'" class="handling">审批中</p>
                  <p v-if="item.pertype == '2'">拒绝</p>
                  <p v-if="item.pertype == '3'">退回</p>
                  <p v-if="item.pertype == '5'">审批结束</p>
                </template>
              </p>
              <p class="admin">{{ item.name }} {{ item.date }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="dataSelect.selectLoading"
      :dialogTitle.sync="dataSelect.dialogTitle"
      :dialogVisible.sync="dataSelect.dialogVisible"
      :headList.sync="dataSelect.headList"
      :bodyData.sync="dataSelect.bodyData"
      :choosedData="dataSelect.choosedData"
      :editType.sync="dataSelect.editType"
      :searchApi="dataSelect.searchApi"
      :searchType="dataSelect.searchType"
      :searchParams="dataSelect.searchParams"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
  </div>
</template>

<script>
import SelectData from "@/components/selectData";
// api
import {
  workflowsList,
  editFlow,
  transfer,
  addFlow,
} from "@/api/process_new.js";
import { dateFmt,OpenLoading } from "@/utils/utils.js";

export default {
  components: { SelectData },
  data() {
    return {
      overloading: "", //加载定时器
      workid: "",
      workName: "新增签约方申请单",
      more: [], //查看更多
      activeTab: "firTab",
      form_must_able: [],
      tableData: {},
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //部门编号
        oaa03_show: "", //经办人
        oaa06_show: "", //部门
        oab03_show: "",
        oad03_show:"",
      },
      //财务信息
      oaz: {
        oaz01: dateFmt(new Date()), //日期
        oaz02: "", //签约方编号
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      table_able: [], //表格可编辑项
      fileList_user: [],
      fileList: [],
      file_HT: [],
      fileList_sec: [], //附件文件
      fileList_down: [], //合同文件下载
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8984,
      },
      workclass_personnel: { perid: { flownum: "" } }, //流程详情
      workclass_perflow: [], //已流转流程进度
      //数据选择弹出框
      dataSelect: {
        editType: "entry",
        selectLoading: false,
        cur_input: "", // 当前点击的输入框
        dialogTitle: "数据选择", //当前弹框的title
        dialogVisible: false, //控制显示隐藏弹框
        headList: [], //表头
        bodyData: [], //表格数据
        choosedData: [], //选中的数据
        searchApi: "", //搜索框的接口地址
        searchParams: {}, //搜索接口自带参数
        searchType: "", //搜索类型
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
      },
      // 弹出框表头数据
      tableHead: {
        // 申请人
        head_SQR: [
          { name: "id", title: "用户ID" },
          { name: "name", title: "用户名称" },
        ],
        head_XM: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        head_BM: [
          { name: "name", title: "部门名称" },
          { name: "id", title: "ID" },
        ],
        head_GYS: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        head_KH: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
        head_SB: [
          { name: "gec01", title: "税别编号" },
          { name: "gec02", title: "税别名称" },
          { name: "gec011", title: "进/销项" },
          { name: "gec03", title: "会计科目编号" },
          { name: "gec04", title: "税率" },
          { name: "gec06", title: "1.應稅 2.零稅率 3.免稅" },
          { name: "gec07", title: "單價含稅否" },
          { name: "gec08", title: "媒體申報格式" },
        ],
      },
    };
  },
  created() {
    this.workid = this.$route.query.workid ? this.$route.query.workid : 4886;
    this.getworkflows();
  },
  watch:{
    'tableData.oab02':{
      handler(newVal,oldVal){
        this.tableData.oac.forEach(item=>{
          item.oac01 = newVal
        })
      },
      deep:true
    },
    'tableData.oad02':{
      handler(newVal,oldVal){
        this.tableData.oad04 = newVal
      },
      deep:true
    }
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // 查看更多
    seeMore(url) {
      window.open(url, "_blank");
    },
    // ***********获取流程信息************
    getworkflows() {
      const loading = OpenLoading(this, 1);
      const params = {
        workid: this.workid,
      };
      workflowsList(params).then((res) => {
        if (res.status == 200) {
          loading.close();
          clearTimeout(this.overloading);
          this.form_must_able = res.data.workclass_info.form_must_able
          this.tableData = res.data.workclass_info.from_data;
          this.workName = res.data.workclass_info.title;
          this.workclass_personnel = res.data.workclass_personnel;
          this.workclass_perflow = res.data.workclass_perflow;
          this.table_able = res.data.workclass_info.form_able;
          this.more = res.data.workclass_info.more;
          this.tableData.oaa10 = 1
          this.tableData.oac = [{}]
          if (res.data.file !== null) {
            res.data.file.forEach((item) => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr,
              });
            });
          }
          let res_oaa11_show = res.data.workclass_info.from_data.oaa11_show
          if (res_oaa11_show && res_oaa11_show.length > 0) {
            res_oaa11_show.forEach((item) => {
              this.fileList_down.push({
                id: item.id,
                name: item.name,
              });
            });
          }
        } else {
          loading.close();
          clearTimeout(this.overloading);
          this.$message.error("获取流程信息失败：" + res.error.message);
        }
      });
    },
    // *******************************************
    // *******************************************
    // 限制格式
    beforeAvatarUpload(file) {
      const isDoc = file.type === "application/msword";
      const isDocx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX =
        file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isPDF = file.type === "application/pdf";
      const isTXT = file.type === "text/plain";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isJPEG = file.type === "image/jpeg";
      const isZIP = file.type === "application/zip";
      const isRAR = file.type === "application/x-rar";
      const isNull = file.type === "";
      const isLt200M = file.size / 1024 / 1024 < 200;

      if (
        !isDoc &&
        !isDocx &&
        !isXls &&
        !isXlsx &&
        !isPPT &&
        !isPPTX &&
        !isPDF &&
        !isTXT &&
        !isPNG &&
        !isJPG &&
        !isJPEG &&
        !isZIP &&
        !isRAR
      ) {
        this.$message.warning(
          "上传文件仅限 doc / docx / xls / xlsx / ppt / pptx / pdf / txt / png / jpg / jpeg / zip / rar 格式!"
        );
        return false;
      }
      if (!isLt200M) {
        this.$message.warning("上传文件大小不能超过 200MB!");
        return false;
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.file_HT.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path,
      });
      let temp = [];
      this.file_HT.forEach((item) => {
        temp.push(item.id);
      });
      this.tableData.oaa11 = temp.join(",");
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.file_HT.forEach((item, index) => {
        if (item.filename == file.name) {
          this.file_HT.splice(index, 1);
        }
      });
      let temp = [];
      this.file_HT.forEach((item) => {
        temp.push(item.id);
      });
      this.tableData.oaa11 = temp.join(",");
    },
    handlePreview(file) {
      // console.log(file);
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
    // *******************************************
    // ****************附件上传*****************
    // 限制格式
    beforeAvatarUpload_sec(file) {
      const isDoc = file.type === "application/msword";
      const isDocx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX =
        file.type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isPDF = file.type === "application/pdf";
      const isTXT = file.type === "text/plain";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isJPEG = file.type === "image/jpeg";
      const isZIP = file.type === "application/zip";
      const isRAR = file.type === "application/x-rar";
      const isNull = file.type === "";
      const isLt200M = file.size / 1024 / 1024 < 200;

      if (
        !isDoc &&
        !isDocx &&
        !isXls &&
        !isXlsx &&
        !isPPT &&
        !isPPTX &&
        !isPDF &&
        !isTXT &&
        !isPNG &&
        !isJPG &&
        !isJPEG &&
        !isZIP &&
        !isRAR
      ) {
        this.$message.warning(
          "上传文件仅限 doc / docx / xls / xlsx / ppt / pptx / pdf / txt / png / jpg / jpeg / zip / rar 格式!"
        );
        return false;
      }
      if (!isLt200M) {
        this.$message.warning("上传文件大小不能超过 200MB!");
        return false;
      }
    },
    // 上传成功
    handleSuccess_sec(response, file, fileList) {
      this.addParams.annexurlid.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path,
      });
    },
    // 移除上传项
    handleRemove_sec(file, fileList) {
      this.addParams.annexurlid.forEach((item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice(index, 1);
        }
      });
    },
    handlePreview_sec(file) {
      console.log(file);
    },
    handleExceed_sec(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files_sec.length
        } 个文件，共选择了 ${files_sec.length + fileList_sec.length} 个文件`
      );
    },
    beforeRemove_sec(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 下载文件流
    async download(id, filename) {
      const { data: res } = await this.axios({
        method: "get",
        url: `files/download/${id}`,
        responseType: "blob",
      });
      let fileName = filename;
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
        type: fileType.type,
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
    },
    // ******************************************
    // ****************其他操作*******************
    // 保存
    editNewFlow() {
      this.tableData = { ...this.tableData, ...this.oaz };
      this.addParams.from_data = this.tableData;
      this.addParams.workid = this.workid;
      const loading = OpenLoading(this, 1)
      if (this.fileList_user.length > 0) {
        this.fileList_user.forEach((item) => {
          this.addParams.annexurlid.push({
            id: item.id,
            filename: item.name,
            fileaddr: item.url,
          });
        });
      }
      editFlow(this.addParams).then((result) => {
        if (result.status == 200) {
          this.$message.success("编辑成功！");
        } else {
          this.$message.error("编辑失败：" + result.error.message);
        }
        loading.close();
        clearTimeout(this.overloading)
      });
    },
    // 下一步
    nextStep(url) {
      if (
        url == "/agree" &&
        this.oazShow == 1 &&
        this.workclass_personnel.perid.flownum == 3
      ) {
        this.nextFuns(url);
      } else if(url == "/reject" || url == "/back"){
        this.$router.push({
          path: url,
          query: {
            url_type: 'signing',
            workid: this.workid,
            workName: this.workName,
            oaa01: this.tableData.oaa01,
            oaa02: this.tableData.oaa02,
          },
        });
      }
      else {
        this.nextFuns(url);
      }
    },
    nextFuns(url) {
      const loading = OpenLoading(this, 1)
      this.tableData = { ...this.tableData, ...this.oaz };
      this.addParams.from_data = this.tableData;
      this.addParams.workid = this.workid;
      if (this.fileList_user.length > 0) {
        this.fileList_user.forEach((item) => {
          this.addParams.annexurlid.push({
            id: item.id,
            filename: item.name,
            fileaddr: item.url,
          });
        });
      }
      editFlow(this.addParams).then((result) => {
        if (result.status == 200) {
          this.$message.success("编辑成功！");
          this.$router.push({
            path: url,
            query: {
              url_type: "signing",
              workid: this.workid,
              workName: this.workName,
              oaa01: this.tableData.oaa01,
              oaa02: this.tableData.oaa02,
            },
          });
        } else {
          this.$message.error("编辑失败：" + result.error.message);
        }
        loading.close();
        clearTimeout(this.overloading)
      });
    },
    // ******************************************
    // 数据选择
    selectDialog(type, rowIndex) {
      this.rowIndex = rowIndex;
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "SQR":
          let filter_SQR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SQR;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/users";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "申请人列表";
          break;
        case "JBR":
          let filter_JBR = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_JBR;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/users";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "经办人列表";
          break;
        case "BM":
          let filter_WBS = [{ label: "", model_key_search: "name" }];
          this.dataSelect.filter = filter_WBS;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/departments";
          this.dataSelect.headList = this.tableHead.head_BM;
          this.dataSelect.dialogTitle = "部门列表";
          break;
        case "GYS":
          let filter_GYS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_GYS;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_GYS;
          this.dataSelect.dialogTitle = "供应商列表";
          break;
        case "KH":
          let filter_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KH;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_KH;
          this.dataSelect.dialogTitle = "客户列表";
          break;
        case "SZ_GYS":
          let filter_SZ_GYS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SZ_GYS;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_SB;
          this.dataSelect.dialogTitle = "税别列表";
          break;
        case "SZ_KH":
          let filter_SZ_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SZ_KH;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_SB;
          this.dataSelect.dialogTitle = "税别列表";
          break;
        default:
          return;
          break;
      }
    },
    selectCancel(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = val;
      this.dataSelect.choosedData = val;
    },
    selectSure(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = [];
      this.dataSelect.choosedData = val;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "SQR":
            this.tableData.oaa04 = val[0].id;
            this.showData.oaa04_show = val[0].name;
            break;
          case "JBR":
            this.tableData.oaa03 = val[0].id;
            this.showData.oaa03_show = val[0].name;
            break;
          case "BM":
            this.tableData.oaa06 = val[0].id;
            this.showData.oaa06_show = val[0].name;
            break;
          case "GYS":
            this.tableData.oaa14 = val[0].pmc01;
            this.showData.oaa14_show = val[0].pmc03;
            break;
          case "KH":
            this.tableData.oaa14 = val[0].occ01;
            this.showData.oaa14_show = val[0].occ02;
            break;
          case "SZ_GYS":
            this.tableData.oab03 = val[0].gec01;
            this.showData.oab03_show = val[0].gec02;
            break;
          case "SZ_KH":
            this.tableData.oad03 = val[0].gec01;
            this.showData.oad03_show = val[0].gec02;
            break;
          default:
            return;
            break;
        }
      }
    },
    // 签约方
    addBank() {
      let line = {
        oac01: this.tableData.oab02,
        oac02: "",
        oac03: "",
      };
      this.tableData.oac.push(line);
    },
    deleteBank(val){
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oac.splice(val, 1);
        if (this.tableData.oac.length == 0) {
          this.addBank();
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
.infobox {
  position: relative;
  .columLine {
    position: absolute;
    height: 40px;
    width: 1px;
    left: 278px;
    background: #cccccc;
  }
}
.saveList {
  color: #606266;
  .saveItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25px;
    line-height: 25px;
    div {
      margin-left: 10px;
    }
  }
}
</style>
