<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button
          v-for="(link,index) in more" :key="index"
          type="primary"
          class="saveBtn"
          @click="seeMore(link.url)"
          >{{link.name}}</el-button
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
            <div class="title">{{ workname }}</div>
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
                <div class="infobox middlebox editNot">
                  {{ tableData.oaa03_show }}
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div
                  class="infobox selectbox middlebox last_row"
                  v-if="!table_able.includes('oaa05')"
                >
                  {{ tableData.oaa05 }}
                </div>
                <div
                  class="infobox selectbox middlebox last_row"
                  v-if="table_able.includes('oaa05')"
                >
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div
                  class="infobox selectbox"
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
                  <span :class="form_must_able.includes('oaa04') ? 'redPot' : ''">员工编号</span>
                </div>
                <div class="infobox editNot">{{ tableData.oaa04_gen01 }}</div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa04') ? 'redPot' : ''">所属部门</span>
                </div>
                <div class="infobox editNot last_row">
                  {{ tableData.oaa04_gen04 }}
                </div>
              </div>
              <!-- 合同信息 -->
              <div class="title_line">合同信息</div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oay01') ? 'redPot' : ''">合同名称</span>
                </div>
                <div
                  class="infobox selectbox middlebox"
                  v-if="table_able.includes('oay01')"
                >
                  {{ tableData.oay01 }}
                </div>
                <div class="infobox selectbox middlebox"
                  v-if="!table_able.includes('oay01')">
                  <div class="selector" @click="selectDialog('HT')">
                    {{ tableData.oay01 }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oay02') ? 'redPot' : ''">合同编号</span>
                </div>
                <div class="infobox middlebox editNot last_row">
                  {{ tableData.oay02 }}
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oay03') ? 'redPot' : ''">合同金额</span>
                </div>
                <div class="infobox middlebox editNot">
                  {{ tableData.oay03 }}
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa01') ? 'redPot' : ''">合同状态</span>
                </div>
                <div class="infobox middlebox editNot last_row">
                  {{ tableData.oay_status }}
                </div>
              </div>
              <!-- 发货信息 -->
              <div class="title_line">发货信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa11') ? 'redPot' : ''">客户名称</span>
                </div>
                <div
                  class="infobox selectbox middlebox editNot"
                  v-if="!table_able.includes('oaa11')"
                >
                  {{ tableData.oaa11_show }}
                </div>
                <div
                  class="infobox selectbox middlebox"
                  v-if="table_able.includes('oaa11')"
                >
                  <div class="selector" @click="selectDialog('KH')">
                    {{ tableData.oaa11_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa12') ? 'redPot' : ''">总金额</span>
                </div>
                <div
                  class="infobox middlebox editNot last_row"
                  v-if="!table_able.includes('oaa12')"
                >
                  {{ tableData.oaa12 }}
                </div>
                <div
                  class="infobox selectbox middlebox last_row"
                  v-if="table_able.includes('oaa12')"
                >
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa12"
                    placeholder="请输入总金额"
                  />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa13') ? 'redPot' : ''">税别</span>
                </div>
                <div
                  class="infobox selectbox middlebox editNot"
                  v-if="!table_able.includes('oaa13')"
                >
                  {{ tableData.oaa13_show }}
                </div>
                <div
                  class="infobox selectbox middlebox"
                  v-if="table_able.includes('oaa13')"
                >
                  <div class="selector" @click="selectDialog('SB')">
                    {{ tableData.oaa13_show }}
                  </div>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa14') ? 'redPot' : ''">税额</span>
                </div>
                <div
                  class="infobox last_row middlebox editNot"
                  v-if="!table_able.includes('oaa14')"
                >
                  {{ tableData.oaa14 }}
                </div>
                <div
                  class="infobox last_row middlebox"
                  v-if="table_able.includes('oaa14')"
                >
                  <input v-model="tableData.oaa14" placeholder="请输入税额" />
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa40') ? 'redPot' : ''">业务大类</span>
                </div>
                <div class="infobox selectbox middlebox">
                  <el-select v-model="tableData.oaa40" class="select"
                    :disabled="!table_able.includes('oaa40')">
                    <el-option
                      v-for="item in fixedData.gjaList"
                      :key="item.gja01"
                      :label="item.gja02"
                      :value="item.gja01">
                    </el-option>
                  </el-select>
                </div>
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa41') ? 'redPot' : ''">业务明细</span>
                </div>
                <div class="infobox middlebox editNot"
                  v-if="!table_able.includes('oaa41')" >
                  {{ tableData.oaa41_show }}
                </div>
                <div class="infobox last_row middlebox selectbox"
                  v-if="table_able.includes('oaa41')">
                  <div class="selector" @click="selectDialog('YWMX')">
                    {{ showData.oaa41_show }}
                  </div>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa15') ? 'redPot' : ''">备注</span>
                </div>
                <div
                  class="infobox last_row longbox areabox"
                  style="width: 100%"
                >
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa15"
                    placeholder="请输入备注"
                    maxlength="255"
                    show-word-limit
                    :disabled="table_able.includes('oaa15') ? false : true"
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must_able.includes('oaa98') ? 'redPot' : ''">说明</span>
                </div>
                <div
                  class="infobox last_row longbox areabox"
                  style="width: 100%"
                >
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa98"
                    placeholder="请输入说明"
                    maxlength="255"
                    show-word-limit
                    :disabled="table_able.includes('oaa98') ? false : true"
                  >
                  </el-input>
                </div>
              </div>
              <!-- 开票信息 -->
              <div v-if="tableData.oaa16 == 1">
                <div class="title_line">开票信息</div>
                <div class="form_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa21') ? 'redPot' : ''">名称</span>
                  </div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa21')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa21"
                      placeholder="请输入名称"
                      :disabled="table_able.includes('oaa21') ? false : true"
                    />
                  </div>
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa22') ? 'redPot' : ''">纳税人识别号</span>
                  </div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa22')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa22"
                      placeholder="请输入纳税人识别号"
                      :disabled="table_able.includes('oaa22') ? false : true"
                    />
                  </div>
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa23') ? 'redPot' : ''">地址</span>
                  </div>
                  <div
                    class="infobox selectbox last_row"
                    :class="table_able.includes('oaa23') ? '' : 'disabledbox'"
                  >
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa23"
                      placeholder="请输入地址"
                      :disabled="table_able.includes('oaa23') ? false : true"
                    />
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa24') ? 'redPot' : ''">银行账号</span>
                  </div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa24')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa24"
                      placeholder="请输入银行账号"
                      :disabled="table_able.includes('oaa24') ? false : true"
                    />
                  </div>
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa25') ? 'redPot' : ''">开户行</span>
                  </div>
                  <div class="infobox selectbox" :class="table_able.includes('oaa25')?'':'disabledbox'">
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa25"
                      placeholder="请输入开户行"
                      :disabled="table_able.includes('oaa25') ? false : true"
                    />
                  </div>
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa26') ? 'redPot' : ''">电话</span>
                  </div>
                  <div
                    class="infobox selectbox last_row"
                    :class="table_able.includes('oaa26') ? '' : 'disabledbox'"
                  >
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa26"
                      placeholder="请输入电话"
                      :disabled="table_able.includes('oaa26') ? false : true"
                    />
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa27') ? 'redPot' : ''">开票种类</span>
                  </div>
                  <div class="infobox longbox selectbox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa27"
                    >
                      <el-radio
                        :label="1"
                        :disabled="table_able.includes('oaa27') ? false : true"
                        >增值税发票</el-radio
                      >
                      <el-radio
                        :label="2"
                        :disabled="table_able.includes('oaa27') ? false : true"
                        >普通发票</el-radio
                      >
                      <el-radio
                        :label="3"
                        :disabled="table_able.includes('oaa27') ? false : true"
                        >服务发票</el-radio
                      >
                      <el-radio
                        :label="4"
                        :disabled="table_able.includes('oaa27') ? false : true"
                        >资金往来发票</el-radio
                      >
                    </el-radio-group>
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
                    prop="oac02_show"
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
                  :header-cell-class-name="must_oac"
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
                    prop="oac02_show"
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
                          {{ scope.row.oac02_show }}
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
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa31') ? 'redPot' : ''">货款回收情况</span>
                  </div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa31"
                    >
                      <el-radio
                        :label="1"
                        :disabled="table_able.includes('oaa31') ? false : true"
                        >货款已收</el-radio
                      >
                      <el-radio
                        :label="2"
                        :disabled="table_able.includes('oaa31') ? false : true"
                        >尚未回款</el-radio
                      >
                    </el-radio-group>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa32') ? 'redPot' : ''">回款日期</span>
                  </div>
                  <div
                    class="infobox last_row middlebox selectbox"
                    style="width: 100%"
                    :class="table_able.includes('oaa32') ? '' : 'disabledbox'"
                  >
                    <el-date-picker
                      v-model="tableData.oaa32"
                      style="width: 100%"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      placeholder=""
                      :disabled="table_able.includes('oaa32') ? false : true"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa33') ? 'redPot' : ''">回款方式</span>
                  </div>
                  <div class="infobox middlebox" style="width: 100%">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa33"
                    >
                      <el-radio
                        :label="1"
                        :disabled="table_able.includes('oaa33') ? false : true"
                        >现金</el-radio
                      >
                      <el-radio
                        :label="2"
                        :disabled="table_able.includes('oaa33') ? false : true"
                        >转账支票</el-radio
                      >
                      <el-radio
                        :label="3"
                        :disabled="table_able.includes('oaa33') ? false : true"
                        >电汇</el-radio
                      >
                      <el-radio
                        :label="4"
                        :disabled="table_able.includes('oaa33') ? false : true"
                        >汇票</el-radio
                      >
                    </el-radio-group>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa34') ? 'redPot' : ''">发货时间</span>
                  </div>
                  <div
                    class="infobox last_row middlebox selectbox"
                    style="width: 100%"
                    :class="table_able.includes('oaa34') ? '' : 'disabledbox'"
                  >
                    <el-date-picker
                      v-model="tableData.oaa34"
                      style="width: 100%"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      placeholder=""
                      :disabled="table_able.includes('oaa34') ? false : true"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa36') ? 'redPot' : ''">发票号码</span>
                  </div>
                  <div
                    class="infobox last_row longbox selectbox"
                    style="width: 100%"
                    :class="table_able.includes('oaa36') ? '' : 'disabledbox'"
                  >
                    <input
                      class="abstracInput"
                      v-model="tableData.oaa36"
                      placeholder="请输入发票号码"
                      :disabled="table_able.includes('oaa36') ? false : true"
                    />
                  </div>
                </div>
              </div>
              <!-- 应收明细 -->
              <div class="title_line">应收明细</div>
              <div v-if="!table_able.includes('oab')">
                <el-table
                  :data="tableData.oab"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oab01_show"
                    label="会计科目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab02_show"
                    label="项目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab03_show"
                    label="项目WBS"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab04"
                    label="摘要"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab05"
                    label="金额"
                    min-width="180px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab06"
                    label="数量"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab07"
                    label="单价"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab11"
                    label="核算项一"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab12"
                    label="核算项二"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
                <div class="form_line last_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa16') ? 'redPot' : ''">是否开票</span>
                  </div>
                  <div class="infobox longbox">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa16"
                    >
                      <el-radio :label="1" disabled>是</el-radio>
                      <el-radio :label="2" disabled>否</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <div v-if="table_able.includes('oab')">
                <el-table
                  :data="tableData.oab"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                  :header-cell-class-name="must_oab"
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
                            v-if="scope.$index == tableData.oab.length - 1"
                            @click="addRow2()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i>
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
                    prop="oab01_show"
                    label="会计科目"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('KJKM', scope.$index)"
                        >
                          {{ scope.row.oab01_show }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab02_show"
                    label="项目"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('XM', scope.$index)"
                        >
                          {{ scope.row.oab02_show }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab03_show"
                    label="项目WBS"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('WBS', scope.$index)"
                        >
                          {{ scope.row.oab03_show }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab04"
                    label="摘要"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab04"
                          placeholder="摘要"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab05"
                    label="金额"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab05"
                          placeholder="金额"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab06"
                    label="数量"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab06"
                          placeholder="数量"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab07"
                    label="单价"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab07"
                          placeholder="单价"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab11"
                    label="核算项一"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div class="mixInput">
                          <input
                            type="text"
                            placeholder="请输入核算项一"
                            v-model="scope.row.oab11"
                          />
                          <i
                            class="el-icon-search"
                            @click="selectObc11(scope.$index)"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab12"
                    label="核算项二"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div class="mixInput">
                          <input
                            type="text"
                            placeholder="请输入核算项二"
                            v-model="scope.row.oab12"
                          />
                          <i
                            class="el-icon-search"
                            @click="selectObc12(scope.$index)"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="form_line last_line">
                  <div class="titlebox">
                    <span :class="form_must_able.includes('oaa16') ? 'redPot' : ''">是否开票</span>
                  </div>
                  <div class="infobox longbox">
                    <el-radio-group
                      class="radioGroup"
                      v-model="tableData.oaa16"
                    >
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              <!-- 财务信息 -->
              <div v-if="oazShow == 1">
                <div class="title_line">
                  财务信息
                  <el-button
                    type="primary"
                    size="small"
                    style="position: absolute; right: 4px; top: 4px"
                    @click="generate()"
                    >生成凭证</el-button
                  >
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">记账日期</div>
                  <div class="infobox middlebox datebox">
                    <el-date-picker
                      v-model="oaz.oaz03"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                  </div>
                  <div class="titlebox">凭证编号</div>
                  <div class="infobox middlebox selectbox editNot last_row">
                    {{ oaz.oaz06 }}
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
            <div class="title">{{ workname }}</div>
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
              <!-- <el-button type="text">预览</el-button> -->
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
import {
  workflowsList,
  transfer,
  editFlow,
  addFlow,
} from "@/api/process_new.js";
import {
  number_chinese,
  dateFmt,
  OpenLoading,
  fomatFloat,
} from "@/utils/utils.js";
import {
  gensList,
  azisList,
  pmasList,
  pjbsList,
  aagsList,
  pjasList,
  custInfo,
  gjaList,
} from "@/api/basic.js";

export default {
  components: { SelectData },
  data() {
    return {
      overloading: "", //加载定时器
      workid: "",
      workname: "发货申请单",
      activeTab: "firTab",
      more: [], //查看更多
      showData: {
        oaa04_show: "", //申请人
        expenseMoneyF: "", //报销金额大写
        oaa13_rate: 0, //税率
      },
      form_must_able: [],
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        // 合同信息
        oay01: "", //名称
        oay02: "", //编号
        oay03: "", //金额
        //发货信息
        oaa11: "", //客户名称
        oaa12: "", //总金额
        oaa13: "", //税别
        oaa13_show: "",
        oaa14: "", //税额
        oaa15: "", //备注
        oaa98: "", //说明
        // 表格部分
        oab: [], //应收明细
        oaa16: 1, //是否开票
        // 开票信息
        oaa21: "", //名称
        oaa22: "", //纳税人识别号
        oaa23: "", //地址
        oaa24: "", //银行账号
        oaa25: "", //开户行
        oaa26: "", //电话
        oaa27: "", //开票种类
        oac: [], // 发票明细
        oaa31: "", //货款回收情况
        oaa32: "", //回款日期
        oaa33: "", //回款方式
        oaa34: "", //发货时间
        oaa36: "", //发票号码
      },
      oabType: "", //核算项类型
      fixedData: {
        // 币种列表
        cointypes: [],
        //支付方式
        payTypes: [],
        // gja
        gjaList: [],
      },
      table_able: [], //表格可编辑项
      oab_must:[],//差旅明细必填项
      oac_must:[],//费用明细必填项
      financialData: {
        bank_show: "", //银行回显数据
        num_show: "", //异动码回显数据
        // oaz05_show: "", //支付方式回显数据
        // oaz04_show: "", //账款类型回显数据
      },
      //财务信息
      oaz: {
        // oaz01: "", //银行
        // oaz02: "", //异动码
        oaz03: dateFmt(new Date()), //记账日期
        // oaz04: "", //账款类型
        // oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      workclass_personnel: {
        perid: { flownum: "" },
      }, //流程详情
      workclass_perflow: [], //已流转流程进度
      fileList_user: [],
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8952,
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
      firstLoad:{
        oaa12:'',
        oaa13:'',
        oaa14:''
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
        head_HT: [
          { name: "title", title: "合同名称" },
          { name: "number", title: "合同编号" },
          { name: "contract_value", title: "合同金额" },
          { name: "status", title: "合同状态" },
        ],
        head_KJKM: [
          { name: "aag01", title: "科目编号" },
          { name: "aag02", title: "科目名称" },
          { name: "aag03", title: "科目性质" },
          { name: "aag04", title: "资产损益别" },
          { name: "aag07", title: "统制明细别" },
          { name: "aag13", title: "额外名称" },
          { name: "aag24", title: "科目层级" },
        ],
        head_XM: [
          { name: "pja01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
          { name: "pja08", title: "项目负责人" },
          { name: "pja09", title: "负责部门" },
          { name: "pja13", title: "项目预计总额" },
        ],
        head_WBS: [
          { name: "pjb02", title: "WBS编号" },
          { name: "pjb03", title: "WBS名称" },
          { name: "pjb01", title: "项目编号" },
          { name: "pja02", title: "项目名称" },
        ],
        head_WQX: [
          { name: "id", title: "待抵账款编号" },
          { name: "original_amount", title: "本币未冲金额" },
          { name: "date", title: "日期" },
          { name: "rid", title: "借款人编号" },
          { name: "rname", title: "借款人名称" },
          { name: "voucher_code", title: "凭证编号" },
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
        head_SPMC: [
          { name: "id", title: "商品编号" },
          { name: "name", title: "商品名称" },
        ],
        head_pmcs: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        head_occs: [
          { name: "occ01", title: "客户编号" },
          { name: "occ02", title: "客户名称" },
        ],
        head_nmas: [
          { name: "nma01", title: "银行编号" },
          { name: "nma02", title: "银行名称" },
          { name: "nma28", title: "1.支存 2.活存 3.其他" },
          { name: "nma04", title: "银行账号" },
          { name: "nma09", title: "存款类别" },
          { name: "nma10", title: "存款币别" },
        ],
        head_gecs: [
          { name: "gec01", title: "税别编号" },
          { name: "gec02", title: "税别名称" },
          { name: "gec03", title: "会计科目编号" },
          { name: "gec04", title: "税率" },
          { name: "gec06", title: "税种" },
          { name: "gec07", title: "单价含税否" },
          { name: "gec08", title: "媒体申报格式" },
          { name: "gec11", title: "进 / 销项" },
        ],
        head_pjas: [
          { name: "gja01", title: "项目编号" },
          { name: "gja02", title: "项目名称" },
        ],
      },
    };
  },
  created() {
    this.workid = this.$route.query.workid ? this.$route.query.workid : 5400;
    this.getworkflows();
    this.getAzi(); //币种列表
    this.getPma(); //支付方式
    this.getGja()
  },
  watch: {
    // 税别
    "tableData.oaa13": {
      handler(newval, oldval) {
        if(this.firstLoad.oaa13 == this.tableData.oaa13){
          let sum = this.tableData.oab.reduce((prev, cur) => {
            return prev + Number(cur.oab05);
          }, 0);
          this.tableData.oaa14 = Number(this.firstLoad.oaa14) 
        }else{
          this.tableData.oaa14 = (
          ((Number(this.tableData.oaa12) / (1 + this.showData.oaa13_rate / 100)) * this.showData.oaa13_rate) /100).toFixed(2);
        }
      },
      deep: true,
    },
    // 总金额
    "tableData.oaa12": {
      handler(newval, oldval) {
        if(this.firstLoad.oaa12 == this.tableData.oaa12){
          let sum = this.tableData.oab.reduce((prev, cur) => {
            return prev + Number(cur.oab05);
          }, 0);
          this.tableData.oaa14 = Number(this.firstLoad.oaa14) 
        }else{
          this.tableData.oaa14 = (
            ((Number(this.tableData.oaa12) /
              (1 + this.showData.oaa13_rate / 100)) *
              this.showData.oaa13_rate) /
            100
          ).toFixed(2);
        }
      },
      deep: true,
    },
    "tableData.oab": {
      handler(newval, oldval) {
        this.tableData.oab.forEach((item) => {
          item.oab05 = Number(item.oab06) * Number(item.oab07);
        });
      },
      deep: true,
    },
    "tableData.oac": {
      handler(newval, oldval) {
        this.tableData.oac.forEach((item) => {
          item.oac06 = Number(item.oac04) * Number(item.oac05);
        });
      },
      deep: true,
    },
  },
  methods: {
    must_oab(obj) {
      if (this.oab_must.includes(obj.column.property)) {
        return "must";
      }
    },
    must_oac(obj) {
      if (this.oac_must.includes(obj.column.property)) {
        return "must";
      }
    },
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
          this.oab_must = res.data.workclass_info.form_view_must_able.oab ? res.data.workclass_info.form_view_must_able.oab : []
          this.oac_must = res.data.workclass_info.form_view_must_able.oac ? res.data.workclass_info.form_view_must_able.oac : []
          this.tableData = res.data.workclass_info.from_data;
          this.workname = res.data.workclass_info.title;
          this.workclass_personnel = res.data.workclass_personnel;
          this.workclass_perflow = res.data.workclass_perflow;
          this.table_able = res.data.workclass_info.form_able;
          this.oazShow = res.data.workclass_flow.erp_turn;
          this.more = res.data.workclass_info.more;
          this.firstLoad = {
            oaa12:res.data.workclass_info.from_data.oaa12,
            oaa13:res.data.workclass_info.from_data.oaa13,
            oaa14:res.data.workclass_info.from_data.oaa14
          }
          this.showData.oaa13_rate =
            res.data.workclass_info.from_data.oaa13_show;
          this.oaz = {
            oaz03: res.data.workclass_info.from_data.oaz03
              ? res.data.workclass_info.from_data.oaz03
              : dateFmt(new Date()), //记账日期
            oaz06: res.data.workclass_info.from_data.oaz06, //凭证编号
          };
          if (res.data.file !== null) {
            res.data.file.forEach((item) => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr,
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
    // ***************附件上传******************
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
      this.addParams.annexurlid.push({
        id: response.data.id,
        filename: response.data.filename,
        fileaddr: response.data.path,
      });
    },
    // 移除上传项
    handleRemove(file, fileList) {
      this.addParams.annexurlid.forEach((item, index) => {
        if (item.filename == file.name) {
          this.addParams.annexurlid.splice(index, 1);
        }
      });
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
      if (this.fileList_user.length > 0) {
        this.fileList_user.forEach((item) => {
          this.addParams.annexurlid.push({
            id: item.id,
            filename: item.name,
            fileaddr: item.url,
          });
        });
      }
      let sum = this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab05);
      }, 0);
      let sums = (Number(this.tableData.oaa14) + Number(sum)).toFixed(2)
      if (this.tableData.oaa16 == 1) {
        if (Number(this.tableData.oaa28) != Number(this.tableData.oaa12)) {
          this.$message.warning("开票金额与总金额不相等，请重新填写！");
        } else {
          if (Number(this.tableData.oaa12) != sums) {
            this.$message.warning("总金额有误：总金额 = 税额 + 应收明细中的金额之和");
          } else {
            const loading = OpenLoading(this, 1)
            editFlow(this.addParams).then((result) => {
              if (result.status == 200) {
                this.$message.success("编辑成功！");
              } else {
                this.$message.error("编辑失败：" + result.error.message);
              }
              loading.close();
        clearTimeout(this.overloading)
            });
          }
        }
      } else {
        if (Number(this.tableData.oaa12) != sums) {
          this.$message.warning("总金额有误：总金额 = 税额 + 应收明细中的金额之和");
        } else {
          const loading = OpenLoading(this, 1)
          editFlow(this.addParams).then((result) => {
            if (result.status == 200) {
              this.$message.success("编辑成功！");
            } else {
              this.$message.error("编辑失败：" + result.error.message);
            }
            loading.close();
        clearTimeout(this.overloading)
          });
        }
      }
    },
    // 下一步
    nextStep(url) {
      if (url == "/agree" && this.oazShow == 1 ) {
        // console.log(this.oaz, this.oazShow);
        if (this.oaz.oaz06 == "" || this.oaz.oaz06 == null) {
          this.$message.error("请先生成凭证！");
        } else {
          this.nextFuns(url);
        }
      } else if(url == "/reject" || url == "/back"){
        this.$router.push({
          path: url,
          query: {
            url_type: 'invoice',
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
      let sum = this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab05);
      }, 0);
      let sums = (Number(this.tableData.oaa14) + Number(sum)).toFixed(2)
      if (this.tableData.oaa16 == 1) {
        if (Number(this.tableData.oaa28) != Number(this.tableData.oaa12)) {
          this.$message.warning("开票金额与总金额不相等，请重新填写！");
        } else {
          if (Number(this.tableData.oaa12) != sums) {
            this.$message.warning("总金额有误：总金额 = 税额 + 应收明细中的金额之和");
          } else {
            const loading = OpenLoading(this, 1)
            editFlow(this.addParams).then((result) => {
              if (result.status == 200) {
                this.$message.success("编辑成功！");
                this.$router.push({
                  path: url,
                  query: {
                    url_type: "invoice",
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
          }
        }
      } else {
        if (Number(this.tableData.oaa12) != sums) {
          this.$message.warning("总金额有误：总金额 = 税额 + 应收明细中的金额之和");
        } else {
          const loading = OpenLoading(this, 1)
          editFlow(this.addParams).then((result) => {
            if (result.status == 200) {
              this.$message.success("编辑成功！");
              this.$router.push({
                path: url,
                query: {
                  url_type: "invoice",
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
        }
      }
    },
    // *******************************************
    // 生成凭证
    generate() {
      const loading = OpenLoading(this, 2 , 50000);
      this.addParams.from_data = { ...this.tableData, ...this.oaz };
      this.addParams.workid = this.workid;
      editFlow(this.addParams).then((res) => {
        if (res.status == 200) {
          let params = {
            workid: this.workid,
          };
          transfer(params).then((res) => {
            if (res.status == 200) {
              loading.close();
              clearTimeout(this.overloading);
              this.$message.success("抛转成功！");
              this.oaz.oaz03 = res.data.oaz03;
              this.oaz.oaz06 = res.data.oaz06;
            } else {
              loading.close();
              clearTimeout(this.overloading);
              this.$message.error("抛转失败:" + res.error.message);
            }
          });
        } else {
          loading.close();
          clearTimeout(this.overloading);
          this.$message.error("抛转失败:" + res.error.message);
        }
      });
    },
    //
    // 表格部分
    // 费用明细行项目表格
    addRow1() {
      let data = {
        oac02: "", //商品id
        oac02_show: "", //商品名称
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
    addRow2() {
      let data = {
        oab01: "", //会计科目
        oab02: "0000", //项目
        oab02_show:"公用项目",//
        oab03: "0000-0000", //项目wbs
        oab03_show:"0000",//
        oab04: "", //摘要
        oab05: "", //金额
        oab06: 1, //数量
        oab07: "", //单价
        oab11: "", //核算项1
        oab12: "", //核算项2
      };
      this.tableData.oab.push(data);
    },
    // 删除当前行
    deleteRow2(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oab.splice(val, 1);
        if (this.tableData.oab.length == 0) {
          this.addRow2();
        }
      });
    },
    // 获取基础数据*******
    // 币种列表
    getAzi() {
      azisList().then((res) => {
        if (res.status == 200) {
          this.fixedData.cointypes = res.data;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // 支付方式列表
    getPma() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.payTypes = res.data;
        } else {
          this.$message.error(res.error);
        }
      });
    },
    // gja列表
    getGja() {
      const params = {
        keyword: ''
      }
      gjaList(params).then((res) => {
        if (res.status == 200) {
          this.fixedData.gjaList = res.data;
        } else {
          this.$message.error(res.error.message);
        }
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
        case "HT":
          let filter_HT = [{ label: "", model_key_search: "filter[number]" }];
          this.dataSelect.filter = filter_HT;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/contracts";
          this.dataSelect.headList = this.tableHead.head_HT;
          this.dataSelect.dialogTitle = "合同列表";
          break;
        case "KJKM":
          let filter_KJKM = [
            { label: "科目名称", model_key_search: "keyword" },
            {
              label: "",
              model_key_search: "aag00",
              disabled: true,
              value: "01",
              hide: true,
            },
          ];
          this.dataSelect.filter = filter_KJKM;
          this.dataSelect.searchType = "mixed";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/aags";
          this.dataSelect.headList = this.tableHead.head_KJKM;
          this.dataSelect.dialogTitle = "会计科目";
          break;
        case "XM":
          let filter_XM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_XM;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/pjas";
          this.dataSelect.headList = this.tableHead.head_XM;
          this.dataSelect.dialogTitle = "项目";
          break;
        case "WBS":
          let filter_WBS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_WBS;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/pjbs";
          this.dataSelect.headList = this.tableHead.head_WBS;
          this.dataSelect.dialogTitle = "WBS列表";
          break;
        case "YWMX":
          let filter_YWMX = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YWMX;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/pjbs";
          this.dataSelect.headList = this.tableHead.head_WBS;
          this.dataSelect.dialogTitle = "业务明细";
          break;
        case "KH":
          let filter_KH = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KH;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/occs";
          this.dataSelect.headList = this.tableHead.head_KH;
          this.dataSelect.dialogTitle = "客户列表";
          break;
        case "SB":
          let filter_SB = [
            { label: "", model_key_search: "keyword" },
            {
              label: "",
              model_key_search: "gec011",
              disabled: true,
              value: "2",
              hide: true,
            },
          ];
          this.dataSelect.filter = filter_SB;
          this.dataSelect.searchType = "mixed";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_SB;
          this.dataSelect.dialogTitle = "税别列表";
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
        case "getpmcsList":
          let filter_pmcs = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_pmcs;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_pmcs;
          this.dataSelect.dialogTitle = "供应商列表";
          break;
        case "getgensList":
          let filter_gens = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_gens;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gens";
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "getoccsList":
          let filter_occs = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_occs;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/occs";
          this.dataSelect.headList = this.tableHead.head_occs;
          this.dataSelect.dialogTitle = "客户列表";
          break;
        case "getnmasList":
          let filter_nmas = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_nmas;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/nmas";
          this.dataSelect.headList = this.tableHead.head_nmas;
          this.dataSelect.dialogTitle = "银行列表";
          break;
        case "getgecsList":
          let filter_gecs = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_gecs;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_gecs;
          this.dataSelect.dialogTitle = "税别列表";
          break;
        case "getpjasList":
          let filter_pjas = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_pjas;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/gjas";
          this.dataSelect.headList = this.tableHead.head_pjas;
          this.dataSelect.dialogTitle = "项目列表";
          break;
        case "getpjbsList":
          let filter_pjbs = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_pjbs;
          this.dataSelect.searchType = "single";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "meta/pjbs";
          this.dataSelect.headList = this.tableHead.head_WBS;
          this.dataSelect.dialogTitle = "WBS列表";
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
          case "HT":
            this.tableData.oay01 = val[0].title;
            this.tableData.oay02 = val[0].number;
            this.tableData.oay03 = val[0].contract_value;
            this.showData.oaa_status = val[0].status;
            custInfo(val[0].opposite_id)
            .then( res=> {
              if (res.status == 200) {
                this.tableData.oaa11 = res.data.occ01
                this.tableData.oaa11_show = res.data.occ02
                this.tableData.oaa13 = res.data.tax_number
                this.tableData.oaa13_show = res.data.tax_name
                this.showData.oaa13_rate = res.data.tax_value
              } else {
                this.$message.warning('获取客户详情失败')
              }
            })
            break;
          case "KJKM":
            this.tableData.oab[this.rowIndex].oab01 = val[0].aag01;
            this.tableData.oab[this.rowIndex].oab01_show = val[0].aag02;
            this.tableData.oab[this.rowIndex].oab01_aag15 = val[0].aag15;
            this.tableData.oab[this.rowIndex].oab01_aag151 = val[0].aag151;
            this.tableData.oab[this.rowIndex].oab01_aag16 = val[0].aag16;
            this.tableData.oab[this.rowIndex].oab01_aag161 = val[0].aag161;
            break;
          case "XM":
            this.tableData.oab[this.rowIndex].oab02 = val[0].pja01;
            this.tableData.oab[this.rowIndex].oab02_show = val[0].pja02;
            break;
          case "WBS":
            this.tableData.oab[this.rowIndex].oab03 = val[0].pjb02;
            this.tableData.oab[this.rowIndex].oab03_show = val[0].pjb03;
            break;
          case "YWMX":
            this.tableData.oaa41 = val[0].pjb02;
            this.showData.oaa41_show = val[0].pjb03;
            break;
          case "KH":
            this.tableData.oaa11 = val[0].occ01;
            this.tableData.oaa11_show = val[0].occ02;
            custInfo(val[0].code)
            .then( res=> {
              if (res.status == 200) {
                this.tableData.oaa13 = res.data.tax_number
                this.tableData.oaa13_show = res.data.tax_name
                this.showData.oaa13_rate = res.data.tax_value
              } else {
                this.$message.warning('获取客户详情失败')
              }
            })
            break;
          case "SB":
            this.tableData.oaa13 = val[0].gec01;
            this.tableData.oaa13_show = val[0].gec02;
            this.showData.oaa13_rate = val[0].gec04;
            break;
          case "SPMC":
            this.tableData.oac[this.rowIndex].oac02 = val[0].id;
            this.tableData.oac[this.rowIndex].oac02_show = val[0].name;
            break;
          case "getpmcsList":
            console.log(this.oabType);
            console.log(val);
            if (this.oabType == "oab11") {
              this.tableData.oab[this.rowIndex].oab11 = val[0].pmc01;
            } else {
              console.log(this.oabType);
              this.tableData.oab[this.rowIndex].oab12 = val[0].pmc01;
            }
            break;
          case "getgensList":
            console.log(this.oabType);
            if (this.oabType == "oab11") {
              this.tableData.oab[this.rowIndex].oab11 = val[0].gen01;
            } else {
              this.tableData.oab[this.rowIndex].oab12 = val[0].gen01;
            }
            break;
          case "getoccsList":
            console.log(this.oabType);
            if (this.oabType == "oab11") {
              this.tableData.oab[this.rowIndex].oab11 = val[0].occ01;
            } else {
              this.tableData.oab[this.rowIndex].oab12 = val[0].occ01;
            }
            break;
          case "getnmasList":
            console.log(this.oabType);
            if (this.oabType == "oab11") {
              this.tableData.oab[this.rowIndex].oab11 = val[0].nma01;
            } else {
              this.tableData.oab[this.rowIndex].oab12 = val[0].nma01;
            }
            break;
          case "getgecsList":
            console.log(this.oabType);
            if (this.oabType == "oab11") {
              this.tableData.oab[this.rowIndex].oab11 = val[0].gec01;
            } else {
              this.tableData.oab[this.rowIndex].oab12 = val[0].gec01;
            }
            break;
          case "getpjasList":
            console.log(this.oabType);
            if (this.oabType == "oab11") {
              this.tableData.oab[this.rowIndex].oab11 = val[0].gja01;
            } else {
              this.tableData.oab[this.rowIndex].oab12 = val[0].gja01;
            }
            break;
          case "getpjbsList":
            console.log(this.oabType);
            if (this.oabType == "oab11") {
              this.tableData.oab[this.rowIndex].oab11 = val[0].pjb02;
            } else {
              this.tableData.oab[this.rowIndex].oab12 = val[0].pjb02;
            }
            break;
          default:
            return;
            break;
        }
      }
    },
    //
    selectObc11(val) {
      let row = this.tableData.oab[val];
      this.oabType = "oab11";
      if (!this.tableData.oab[val].oab01) {
        this.$message.warning("请先选择会计科目！");
      } else if (
        this.tableData.oab[val].oab01 &&
        !this.tableData.oab[val].oab01_aag15
      ) {
        this.$message.warning("此科目无核算项一，请手动输入！");
      } else {
        switch (row.oab01_aag15) {
          case "003" || "N01":
            this.selectDialog("getpmcsList", val);
            break;
          case "N02":
            this.selectDialog("getgensList", val);
            break;
          case "N03":
            this.selectDialog("getoccsList", val);
            break;
          case "N04":
            this.selectDialog("getnmasList", val);
            break;
          case "N20":
            this.selectDialog("getgecsList", val);
            break;
          case "N23":
            this.selectDialog("getpjasList", val);
            break;
          case "N24":
            this.selectDialog("getpjbsList", val);
            break;
          default:
            break;
        }
      }
    },
    selectObc12(val) {
      let row = this.tableData.oab[val];
      this.oabType = "obc12";
      if (!this.tableData.oab[val].oab01) {
        this.$message.warning("请先选择会计科目！");
      } else if (
        this.tableData.oab[val].oab01 &&
        !this.tableData.oab[val].oab01_aag16
      ) {
        this.$message.warning("此科目无核算项二，请手动输入！");
      } else {
        switch (row.oab01_aag16) {
          case "003" || "N01":
            this.selectDialog("getpmcsList", val);
            break;
          case "N02":
            this.selectDialog("getgensList", val);
            break;
          case "N03":
            this.selectDialog("getoccsList", val);
            break;
          case "N04":
            this.selectDialog("getnmasList", val);
            break;
          case "N20":
            this.selectDialog("getgecsList", val);
            break;
          case "N23":
            this.selectDialog("getpjasList", val);
            break;
          case "N24":
            this.selectDialog("getpjbsList", val);
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
