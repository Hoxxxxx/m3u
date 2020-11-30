<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button  v-if="more != null" type="primary" class="save" @click="seeMore()">查看更多</el-button>
        <el-button type="primary" class="save" @click="editNewFlow()">保存</el-button>
        <el-button v-if="workclass_personnel.perid.flownum==1" type="primary" class="next" @click="nextStep('/apply')">下一步</el-button>
        <!-- <el-button class="normal" style="margin-left: 50px">委托</el-button> -->
        <!-- <el-button class="normal">挂起</el-button> -->
        <!-- <el-button class="normal">增加会签人</el-button> -->
        <!-- <el-button class="normal" style="margin-right: 70px">抛转</el-button> -->
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary" class="agree" @click="nextStep('/agree')">同意</el-button>
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary"  class="reject" @click="nextStep('/reject')">拒绝</el-button>
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary" class="back" @click="nextStep('/back')">退回</el-button>
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
            <div class="title">{{workname}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox middlebox editNot">{{ tableData.oaa03_show }}</div>
                <div class="titlebox">联系电话</div>
                <div class="infobox selectbox middlebox last_row" v-if="!table_able.includes('oaa05')">{{ tableData.oaa05 }}</div>
                <div class="infobox selectbox middlebox last_row" v-if="table_able.includes('oaa05')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox" v-if="!table_able.includes('oaa04')">{{ tableData.oaa04_show }}</div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa04')">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ tableData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">员工编号</div>
                <div class="infobox editNot">{{ tableData.oaa04_gen01 }}</div>
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot last_row">{{ tableData.oaa04_gen04 }}</div>
              </div>
              
              <!-- 发货单 -->
              <div class="title_line">发货单信息
                <el-button v-if="table_able.includes('oaf')" type="primary" size="small" style="position:absolute;left:4px;top:4px;" @click="selectDialog('FHD')">选择发货单</el-button>
              </div>
              <el-table
                  v-if="!table_able.includes('oaf')"
                  :data="tableData.oaf"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oaf01"
                    label="发货单号"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf02"
                    label="客户名称"
                    min-width="200px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf03"
                    label="发货单日期"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf04"
                    label="未开票金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf05"
                    label="本次开票金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
              </el-table>
              <el-table
                  v-if="table_able.includes('oaf')"
                  :data="tableData.oaf"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                  prop="id"
                  label="删除"
                  fixed="left"
                  width="100px"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div>
                      <div style="font-size: 24px; width: 100%; height: 100%">
                        <!-- <i
                            v-if="scope.$index == tableData.oac.length - 1"
                            @click="addRow2()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i> -->
                        <i
                          @click="deleteRow2(scope.$index)"
                          class="el-icon-remove"
                          style="color: #f56c6c; width: 30px; cursor: pointer"
                        ></i>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                  <el-table-column
                    prop="oaf01"
                    label="发货单号"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf02"
                    label="客户名称"
                    min-width="200px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf03"
                    label="发货单日期"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf04"
                    label="未开票金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oaf05"
                    label="本次开票金额"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf05"
                          placeholder="本次开票金额"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
              </el-table>
              <!-- <div class="title_line">发货单</div>
              <div class="form_line">
                <div class="titlebox">选择发货单</div>
                <div class="infobox selectbox longbox" v-if="!table_able.includes('oaa16')">
                    {{ tableData.oaa16_show }}
                </div>
                <div class="infobox selectbox longbox selector" v-if="table_able.includes('oaa16')">
                  <div class="selector" @click="selectDialog('FHD')">
                    {{ tableData.oaa16_show }}
                  </div>
                </div>
              </div> -->

              <!-- 开票信息 -->
              <div>
                <div class="title_line">开票信息</div>
                <div class="form_line">
                  <div class="titlebox">名称</div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa21')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa21"
                      placeholder="请输入名称"
                      :disabled="table_able.includes('oaa21')?false:true"
                    />
                  </div>
                  <div class="titlebox">纳税人识别号</div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa22')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa22"
                      placeholder="请输入纳税人识别号"
                      :disabled="table_able.includes('oaa22')?false:true"
                    />
                  </div>
                  <div class="titlebox">地址</div>
                  <div class="infobox selectbox last_row" :class="table_able.includes('oaa23')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa23"
                      placeholder="请输入地址"
                      :disabled="table_able.includes('oaa23')?false:true"
                    />
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">银行账号</div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa24')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa24"
                      placeholder="请输入银行账号"
                      :disabled="table_able.includes('oaa24')?false:true"
                    />
                  </div>
                  <div class="titlebox">开户行</div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa25')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa25"
                      placeholder="请输入开户行"
                      :disabled="table_able.includes('oaa25')?false:true"
                    />
                  </div>
                  <div class="titlebox">电话</div>
                  <div class="infobox selectbox last_row" :class="table_able.includes('oaa26')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa26"
                      placeholder="请输入电话"
                      :disabled="table_able.includes('oaa26')?false:true"
                    />
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">开票种类</div>
                  <div class="infobox longbox selectbox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa27"
                    >
                      <el-radio :label="1" :disabled="table_able.includes('oaa27')?false:true">增值税发票</el-radio>
                      <el-radio :label="2" :disabled="table_able.includes('oaa27')?false:true">普通发票</el-radio>
                      <el-radio :label="3" :disabled="table_able.includes('oaa27')?false:true">服务发票</el-radio>
                      <el-radio :label="4" :disabled="table_able.includes('oaa27')?false:true">资金往来发票</el-radio>
                    </el-radio-group>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">开票金额</div>
                  <div
                    class="infobox last_row longbox selectbox"
                    style="width: 100%"
                    :class="table_able.includes('oaa28')?'':'disabledbox'"
                  >
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa28"
                      placeholder="请输入开票金额"
                      :disabled="table_able.includes('oaa28')?false:true"
                    />
                  </div>
                </div>
                <div class="title_line">发票明细</div>
                <el-table
                  v-if="!table_able.includes('oac')"
                  :data="tableData.oac"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oac01"
                    label="序号"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac02"
                    label="商品名称"
                    min-width="200px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac03"
                    label="规格"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac04"
                    label="数量"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac05"
                    label="含税单价"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac06"
                    label="金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
                <el-table
                v-if="table_able.includes('oac')"
                  :data="tableData.oac"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="id"
                    label="增 / 删"
                    fixed="left"
                    width="100px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div style="font-size: 24px; width: 100%; height: 100%">
                          <i
                            v-if="scope.$index == tableData.oac.length - 1"
                            @click="addRow1()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i>
                          <i
                            @click="deleteRow1(scope.$index)"
                            class="el-icon-remove"
                            style="color: #f56c6c; width: 30px; cursor: pointer"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac01"
                    label="序号"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac01"
                          placeholder="序号"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac02"
                    label="商品名称"
                    min-width="200px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('SPMC', scope.$index)"
                        >
                          {{ scope.row.oac02 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac03"
                    label="规格"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac03"
                          placeholder="规格"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac04"
                    label="数量"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac04"
                          placeholder="数量"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac05"
                    label="含税单价"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac05"
                          placeholder="含税单价"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac06"
                    label="金额"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac06"
                          placeholder="金额"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="form_line">
                  <div class="titlebox">货款回收情况</div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa31"
                    >
                      <el-radio :label="1" :disabled="table_able.includes('oaa31')?false:true">货款已收</el-radio>
                      <el-radio :label="2" :disabled="table_able.includes('oaa31')?false:true">尚未回款</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="titlebox">回款日期</div>
                  <div
                    class="infobox last_row middlebox selectbox"
                    style="width: 100%"
                    :class="table_able.includes('oaa32')?'':'disabledbox'"
                  >
                    <el-date-picker
                      v-model="tableData.oaa32"
                      style="width: 100%"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      placeholder=""
                      :disabled="table_able.includes('oaa32')?false:true"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">回款方式</div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa33"
                    >
                      <el-radio :label="1" :disabled="table_able.includes('oaa33')?false:true">现金</el-radio>
                      <el-radio :label="2" :disabled="table_able.includes('oaa33')?false:true">转账支票</el-radio>
                      <el-radio :label="3" :disabled="table_able.includes('oaa33')?false:true">电汇</el-radio>
                      <el-radio :label="4" :disabled="table_able.includes('oaa33')?false:true">汇票</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="titlebox">发货时间</div>
                  <div
                    class="infobox last_row middlebox selectbox"
                    :class="table_able.includes('oaa34')?'':'disabledbox'"
                    style="width: 100%"
                  >
                    <el-date-picker
                      v-model="tableData.oaa34"
                      style="width: 100%"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      placeholder=""
                      :disabled="table_able.includes('oaa34')?false:true"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">是否签订合同</div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa35"
                    >
                      <el-radio :label="1" :disabled="table_able.includes('oaa35')?false:true">是</el-radio>
                      <el-radio :label="2" :disabled="table_able.includes('oaa35')?false:true">否</el-radio>
                    </el-radio-group>
                  </div>
                  <div class="titlebox">发票号码</div>
                  <div
                    class="infobox last_row middlebox selectbox"
                    style="width: 100%"
                    :class="table_able.includes('oaa36')?'':'disabledbox'"
                  >
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa36"
                      placeholder="请输入发票号码"
                      :disabled="table_able.includes('oaa36')?false:true"
                    />
                  </div>
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
            <div class="title">{{workname}}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
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
          <div class="saveItem" v-for="(item,index) in fileList_user" :key="index">
            <i class="el-icon-document" style="margin-right: 7px"></i>
            <a style="cursor: pointer;" @click="download(item.id, item.name)"><span>{{item.name}}</span></a>
            <div class="btnBox">
              <!-- <el-button type="text">预览</el-button> -->
              <el-button type="text" @click="download(item.id, item.name)">下载</el-button>
            </div>
          </div>
        </div>
        <!-- 上传部分 -->
        <el-upload
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
    </el-card>

    <el-card class="secContentCard" v-if="activeTab == 'secTab'">
      <div class="tabContent">
        <div class="title">流程办理进度</div>
          <el-timeline class="timeline">
            <el-timeline-item 
              v-for="(item, index) in workclass_perflow"
              :key="index"
              :timestamp="item.date" 
              placement="top">
              <el-card>
                <p class="step">第{{index+1}}步：{{item.title}}</p>
                <p class="result">
                  <template>
                    <p v-if="item.pertype == '99'">通过</p>
                    <p v-if="item.pertype == '0'" class="handling">审批中</p>
                    <p v-if="item.pertype == '2'">拒绝</p>
                    <p v-if="item.pertype == '3'">退回</p>
                    <p v-if="item.pertype == '5'">审批结束</p>
                  </template>
                </p>
                <p class="admin">{{item.name}}  {{item.date}}</p>
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
import { workflowsList, transfer,editFlow,addFlow,} from "@/api/process_new.js"
import { number_chinese, dateFmt, OpenLoading } from "@/utils/utils.js";
import {
  gensList,
  azisList,
  pmasList,
  pjbsList,
  aagsList,
  pjasList,
} from "@/api/basic.js";

export default {
  components: {SelectData},
  data() {
    return {
      overloading: '', //加载定时器
      workid: '',
      workname: '发货单',
      activeTab: "firTab",
      more:"",//查看更多
      showData: {
        oaa04_show: "", //申请人
        expenseMoneyF: "", //报销金额大写
        oaa13_rate:0,//税率
      },
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        oaa16: "", //发货单
        oaa16_show: "", //发货单
        oaf:[],//发货单信息
        // 开票信息
        oaa21:"",//名称
        oaa22:"",//纳税人识别号
        oaa23:"",//地址
        oaa24:"",//银行账号
        oaa25:"",//开户行
        oaa26:"",//电话
        oaa27:"",//开票种类
        oaa28:"",//开票金额
        oac: [], // 发票明细
        oaa31:"",//货款回收情况
        oaa32:"",//回款日期
        oaa33:"",//回款方式
        oaa34:"",//发货时间
        oaa35:"",//是否签订合同
        oaa36:"",//发票号码
      },
      table_able:[],//表格可编辑项
      //财务信息
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: dateFmt(new Date()), //记账日期
        oaz04: "", //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      workclass_personnel: {
        perid: {flownum: ''}
      }, //流程详情
      workclass_perflow: [], //已流转流程进度
      fileList_user: [],
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8953
      },
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
          { name: "gen01", title: "员工编号" },
          { name: "gen02", title: "员工名称" },
          { name: "gen03", title: "所属部门编号" },
          { name: "gen04", title: "所属部门" },
        ],
        head_SPMC: [
          { name: "id", title: "商品编号" },
          { name: "name", title: "商品名称" },
        ],
        head_FHD:[
          { name: "id", title: "id" },
          { name: "title", title: "流程名称" },
        ]
      },
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4515
    this.getworkflows()
  },
  watch:{
    'tableData.oac':{
      handler(newval,oldval){
        this.tableData.oac.forEach(item=>{
          item.oac06 = Number(item.oac04) * Number(item.oac05)
        })
      },
      deep:true
    },
  },
  computed: {
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // 查看更多
    seeMore(){
      window.open(this.more, '_blank');
    },
    // ***********获取流程信息************
    getworkflows(){
      const loading = OpenLoading(this, 1)
      const params = {
        workid: this.workid
      }
      workflowsList(params).then(res=>{
        if(res.status == 200){
          loading.close()
          clearTimeout(this.overloading)
          this.tableData = res.data.workclass_info.from_data
          this.workname = res.data.workclass_info.title
          this.workclass_personnel = res.data.workclass_personnel;
          this.workclass_perflow = res.data.workclass_perflow
          this.more = res.data.workclass_info.more
          this.table_able = res.data.workclass_info.form_able
          if (res.data.file !== null) {
            res.data.file.forEach( item => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr
              })
            })
          }
        }else{
          loading.close()
          clearTimeout(this.overloading)
          this.$message.error('获取流程信息失败：' + res.error.message);
        }
      })
    },
    // *******************************************
    // ***************附件上传******************
    // 限制格式
    beforeAvatarUpload(file) {
      const isDoc = file.type === "application/msword";
      const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const isXls = file.type === "application/vnd.ms-excel";
      const isXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const isPPT = file.type === "application/vnd.ms-powerpoint";
      const isPPTX = file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      const isPDF = file.type === "application/pdf";
      const isTXT = file.type === "text/plain";
      const isPNG = file.type === "image/png";
      const isJPG = file.type === "image/jpeg";
      const isJPEG = file.type === "image/jpeg";
      const isZIP = file.type === "application/zip";
      const isRAR = file.type === "application/x-rar";
      const isNull = file.type === '';
      const isLt200M = file.size / 1024 / 1024 < 200;

      if (!isDoc && !isDocx && !isXls && !isXlsx && !isPPT && !isPPTX && !isPDF && !isTXT && !isPNG && !isJPG && !isJPEG && !isZIP && !isRAR ) {
        this.$message.warning("上传文件仅限 doc / docx / xls / xlsx / ppt / pptx / pdf / txt / png / jpg / jpeg / zip / rar 格式!");
        return false;
      }
      if (!isLt200M) {
        this.$message.warning("上传文件大小不能超过 200MB!");
        return false;
      }
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.addParams.annexurlid.push({
        id: response.data.id,
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
    // 点击上传项回调
    handlePreview(file) {
      console.log(file);
    },
    // 超出上传限制回调
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 移除前回调
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 下载文件流
    async download(id, filename) {
      const { data: res } = await this.axios({
          method: 'get',
          url: `files/download/${id}`,
          responseType: "blob",
      })
      let fileName = filename;
      let fileType = {
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pdf: 'application/pdf',
        txt: 'text/plain',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        zip: 'application/zip',
        rar: 'application/x-rar',
      }
      let type=fileName.split('.')[1];//获取文件后缀名
      let blob = new Blob([res],{
        type:fileType.type
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    // ******************************************
    // ****************其他操作*******************
    // 保存
    editNewFlow() {
      this.tableData = {...this.tableData,...this.oaz}
      this.addParams.from_data = this.tableData;
      this.addParams.workid = this.workid;
      if(this.fileList_user.length > 0){
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
      });
    },
    // 下一步
    nextStep(url) {
      this.nextFuns(url);
    },
    nextFuns(url) {
        this.tableData = {...this.tableData,...this.oaz}
        this.addParams.from_data = this.tableData;
        this.addParams.workid = this.workid;
        if(this.fileList_user.length > 0){
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
                url_type: 'invoiceApply',
                workid: this.workid,
                workName: this.workName,
                oaa01: this.tableData.oaa01,
                oaa02: this.tableData.oaa02,
              },
            });
          } else {
            this.$message.error("编辑失败：" + result.error.message);
          }
        });
    },
    // *******************************************
    // 
    // 表格部分
    // 费用明细行项目表格
    addRow1() {
      let data = {
        oac01: "", //序号
        oac02: "", //商品名称
        oac03: "", //规格
        oac04: "", //数量
        oac05: "", //含税单价
        oac06: "", //金额
      };
      this.tableData.oac.push(data);
    },
    // 删除当前行
    deleteRow1(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oac.splice(val, 1);
        if (this.tableData.oac.length == 0) {
          this.addRow1();
        }
      });
    },
    deleteRow2(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oaf.splice(val, 1);
      });
    },
    // ******************
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
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "FHD":
          let filter_FHD = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_FHD;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "search"
          this.dataSelect.searchApi = "finance/receivables/uncovered";
          this.dataSelect.headList = this.tableHead.head_FHD;
          this.dataSelect.dialogTitle = "发货单列表";
          break;
        case "SPMC":
          let filter_SPMC = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_SPMC;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/invoicetypes";
          this.dataSelect.headList = this.tableHead.head_SPMC;
          this.dataSelect.dialogTitle = "商品列表";
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
            this.tableData.oaa04 = val[0].gen01;
            this.showData.oaa04_show = val[0].gen02;
            this.showData.oaa04_gen01 = val[0].gen01;
            this.showData.oaa04_gen04 = val[0].gen04;
            break;
          case "SPMC":
            this.tableData.oac[this.rowIndex].oac02 = val[0].id;
            break;
          case "FHD":
            let data = [];
            val.forEach(item=>{
              let obj = {
                oaf01:item.fhd00,
                oaf02:item.fhd05,
                oaf03:item.fhd02,
                oaf04:item.fhd11,
                oaf05:item.fhd11,
              }
              data.push(obj)
            })
            this.tableData.oaf = data
            break;
          default:
            return;
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
.summry {
  display: flex;
  flex-direction: row;
  .summryUl {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #666;
    .summryLi {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 1 1 auto;
      border-right: 1px solid #cccccc;
      .summryName {
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        flex: 1 1 auto;
        line-height: 40px;
        text-align: center;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
