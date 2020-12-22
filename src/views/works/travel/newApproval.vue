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
        <el-button type="primary" class="save" @click="editNewFlow()">保存</el-button>
        <el-button v-if="workclass_personnel.perid.flownum==1" type="primary" class="next" @click="nextStep('/apply')">下一步</el-button>
        <!-- <el-button class="normal" style="margin-left: 50px">委托</el-button> -->
        <!-- <el-button class="normal">挂起</el-button> -->
        <!-- <el-button class="normal">增加会签人</el-button> -->
        <!-- <el-button class="normal" style="margin-right: 70px">抛转</el-button> -->
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary" class="agree" @click="nextStep('/agree')"
          >同意</el-button
        >
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary" class="reject" @click="nextStep('/reject')"
          >拒绝</el-button
        >
        <el-button v-if="workclass_personnel.perid.flownum!==1" type="primary" class="back" @click="nextStep('/back')"
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
                  经办人
                </div>
                <div class="infobox middlebox editNot">{{ tableData.oaa03_show }}</div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa05') ? 'redPot' : ''">联系电话</span>
                </div>
                <div class="infobox selectbox middlebox last_row" v-if="table_able.includes('oaa05')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
                <div class="infobox selectbox middlebox last_row" v-else>{{ tableData.oaa05 }}</div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">申请人</span>
                </div>
                <div class="infobox selectbox" v-if="!table_able.includes('oaa04')">{{ tableData.oaa04_show }}</div>
                <div class="selector selectbox infobox" v-if="table_able.includes('oaa04')" @click="selectDialog('SQR')">
                    {{ tableData.oaa04_show }}
                  </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">员工编号</span>
                </div>
                <div class="infobox editNot">{{ tableData.oaa04 }}</div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa04') ? 'redPot' : ''">所属部门</span>
                </div>
                <div class="infobox editNot last_row">{{ tableData.oaa04_gen04 }}</div>
              </div>
              <!-- 报销信息 -->
              <div class="title_line">报销信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa06') ? 'redPot' : ''">币种</span>
                </div>
                <!-- <div class="infobox selectbox" v-if="!table_able.includes('oaa06')">
                  {{ tableData.oaa06_show }}
                </div> -->
                <div class="infobox selectbox " :class="table_able.includes('oaa06')? '' : 'disabledbox'">
                  <el-select
                    v-model="tableData.oaa06"
                    class="select"
                    :disabled="table_able.includes('oaa06')?false:true"
                    placeholder="请选择币种"
                  >
                    <el-option
                      v-for="(item, index) in fixedData.cointypes"
                      :key="index"
                      :label="item.azi02"
                      :value="item.azi01"
                    >
                    </el-option>
                  </el-select>
                </div>

                <div class="titlebox">
                  <span :class="form_must.includes('oaa08') ? 'redPot' : ''">汇率</span>
                </div>
                <div class="infobox" v-if="!table_able.includes('oaa08')">
                  {{ tableData.oaa08 }}
                </div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa08')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa08"
                    placeholder="请输入汇率"
                  />
                </div>

                <div class="titlebox">
                  <span >支付金额</span>
                </div>
                <div class="infobox last_row editNot">
                  {{ payMoney }}
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">
                  <span >报销金额</span>
                </div>
                <div class="infobox editNot">
                  {{ expenseMoney }}
                </div>
                <div class="titlebox">
                  <span >报销金额大写</span>
                </div>
                <div class="infobox editNot">
                  {{ tableData.expenseMoneyF }}
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa12') ? 'redPot' : ''">支付方式</span>
                </div>
                <!-- <div class="infobox last_row selectbox">
                  {{ tableData.oaa12_show }}
                </div> -->
                <div class="infobox last_row selectbox" :class="table_able.includes('oaa12')? '' : 'disabledbox'">
                  <el-select
                    v-model="tableData.oaa12"
                    class="select"
                    :disabled="table_able.includes('oaa12')?false:true"
                    placeholder="请选择支付方式"
                  >
                    <el-option
                      v-for="(item, index) in fixedData.payTypes"
                      :key="index"
                      :label="item.pma02"
                      :value="item.pma01"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
              <!-- 3 -->
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa14') ? 'redPot' : ''">发票张数</span>
                </div>
                <div class="infobox longbox" v-if="!table_able.includes('oaa14')">
                  {{ tableData.oaa14 }}
                </div>
                <div class="infobox selectbox longbox" v-if="table_able.includes('oaa14')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa14"
                    placeholder="请输入发票张数"
                  />
                </div>
              </div>
              <!-- 4 -->
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa15') ? 'redPot' : ''">出差申请单</span>
                </div>
                <div class="infobox longbox selectbox" v-if="!table_able.includes('oaa15')">
                  {{ tableData.oaa15_show }}
                </div>
                <div class="infobox longbox selectbox" v-if="table_able.includes('oaa15')">
                  <div class="selector" style="padding-right:0;background-position:right center;" @click="selectDialog('CCSQD')">
                    {{ tableData.oaa15_show }}
                  </div>
                </div>
              </div>
              <!-- 5 -->
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa16') ? 'redPot' : ''">说明</span>
                </div>
                <div class="infobox last_row longbox" style="width: 100%" v-if="!table_able.includes('oaa16')">
                  {{ tableData.oaa16 }}
                </div>
                <div class="infobox areabox last_row longbox" style="width: 100%" v-if="table_able.includes('oaa16')">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa16"
                    placeholder="请输入说明"
                    maxlength="80"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa09') ? 'redPot' : ''">收款人</span>
                </div>
                <div class="infobox" v-if="!table_able.includes('oaa09')">
                  {{ tableData.oaa09 }}
                </div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa09')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa09"
                    placeholder="请输入收款人"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa10') ? 'redPot' : ''">开户行</span>
                </div>
                <div class="infobox" v-if="!table_able.includes('oaa10')">
                  {{ tableData.oaa10 }}
                </div>
                <div class="infobox selectbox" v-if="table_able.includes('oaa10')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa10"
                    placeholder="请输入开户行"
                  />
                </div>
                <div class="titlebox">
                  <span :class="form_must.includes('oaa11') ? 'redPot' : ''">收款账号</span>
                </div>
                <div class="infobox last_row" v-if="!table_able.includes('oaa11')">
                  {{ tableData.oaa11 }}
                </div>
                <div class="infobox selectbox last_row" v-if="table_able.includes('oaa11')">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
                    placeholder="请输入收款账号"
                  />
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">
                  <span :class="form_must.includes('oaa17') ? 'redPot' : ''">支票号</span>
                </div>
                <div class="infobox last_row longbox" style="width: 100%" v-if="!table_able.includes('oaa17')">
                  {{ tableData.oaa17 }}
                </div>
                <div class="infobox last_row longbox selectbox" style="width: 100%" v-if="table_able.includes('oaa17')">
                  <input
                    class="abstracInput"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="tableData.oaa17"
                    placeholder="请输入支票号"
                  />
                </div>
              </div>
              <!-- 差旅明细 -->
              <div class="title_line">差旅明细</div>
              <div v-if="!table_able.includes('oab')">
                <el-table
                  :data="tableData.oab"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="oab01"
                    label="开始日期"
                    min-width="160px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oab01"
                          style="width: 100%"
                          disabled
                          type="date"
                          placeholder="开始日期"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab02"
                    label="结束日期"
                    min-width="160px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oab02"
                          style="width: 100%"
                          disabled
                          type="date"
                          placeholder="结束日期"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab03"
                    label="单据号"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab04"
                    label="出发地"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab05"
                    label="目的地"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab06"
                    label="车船费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab07"
                    label="车补"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab08"
                    label="住宿费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab09"
                    label="住补"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab10"
                    label="市内交通费"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab11"
                    label="市补"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab12"
                    label="会议费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab13"
                    label="交际费"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab14"
                    label="其他"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oab15"
                    label="伙食补助"
                    min-width="120px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName">费用合计</div>
                      <div class="summryCont editNot">{{ totalCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">车船费合计</div>
                      <div class="summryCont editNot">{{ carCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">住宿费</div>
                      <div class="summryCont editNot">{{ accomCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">室内交通费</div>
                      <div class="summryCont editNot">{{ tansportCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">会议费</div>
                      <div class="summryCont editNot">{{ conferCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">交际费</div>
                      <div class="summryCont editNot">{{ commuCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">其他</div>
                      <div class="summryCont editNot">{{ others }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">补助合计</div>
                      <div class="summryCont editNot">{{ subside }}</div>
                    </li>
                  </ul>
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
                    prop="oab01"
                    label="开始日期"
                    min-width="160px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oab01"
                          style="width: 100%"
                          type="date"
                          placeholder="开始日期"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab02"
                    label="结束日期"
                    min-width="160px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oab02"
                          style="width: 100%"
                          type="date"
                          placeholder="结束日期"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab03"
                    label="单据号"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab03"
                          placeholder="单据号"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab04"
                    label="出发地"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab04"
                          placeholder="出发地"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab05"
                    label="目的地"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab05"
                          placeholder="目的地"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab06"
                    label="车船费"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab06"
                          placeholder="车船费"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab07"
                    label="车补"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab07"
                          placeholder="车补"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab08"
                    label="住宿费"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab08"
                          placeholder="住宿费"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab09"
                    label="住补"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab09"
                          placeholder="住补"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab10"
                    label="市内交通费"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab10"
                          placeholder="市内交通费"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab11"
                    label="市补"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab11"
                          placeholder="市补"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab12"
                    label="会议费"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab12"
                          placeholder="会议费"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab13"
                    label="交际费"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab13"
                          placeholder="交际费"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab14"
                    label="其他"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab14"
                          placeholder="其他"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oab15"
                    label="伙食补助"
                    min-width="120px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oab15"
                          placeholder="伙食补助"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName ">费用合计</div>
                      <div class="summryCont editNot">{{ totalCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">车船费合计</div>
                      <div class="summryCont editNot">{{ carCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">住宿费</div>
                      <div class="summryCont editNot">{{ accomCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">室内交通费</div>
                      <div class="summryCont editNot">{{ tansportCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">会议费</div>
                      <div class="summryCont editNot">{{ conferCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">交际费</div>
                      <div class="summryCont editNot">{{ commuCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">其他</div>
                      <div class="summryCont editNot">{{ others }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">补助合计</div>
                      <div class="summryCont editNot">{{ subside }}</div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 费用明细行项目 -->
              <div class="title_line">费用明细行项目</div>
              <div v-if="!table_able.includes('oac')">
                <el-table
                  :data="tableData.oac"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="oac01"
                    label="会计科目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac04_show"
                    label="项目"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac05_show"
                    label="项目WBS"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac06"
                    label="摘要"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac07"
                    label="金额（不含税）"
                    min-width="180px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="apb25"
                    label="折合后金额"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac11"
                    label="核算项一"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oac12"
                    label="核算项二"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div v-if="table_able.includes('oac')">
                <el-table
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
                    prop="oac01"
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
                          {{ scope.row.oac01 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac04"
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
                          {{ scope.row.oac04 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac05"
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
                          {{ scope.row.oac05 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac06"
                    label="摘要"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac06"
                          placeholder="摘要"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac07"
                    label="金额（不含税）"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac07"
                          placeholder="金额（不含税）"
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
                          placeholder="折合后金额"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac11"
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
                            v-model="scope.row.oac11"
                          />
                          <i
                            class="el-icon-search"
                            @click="selectOac11(scope.$index)"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac12"
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
                            v-model="scope.row.oac12"
                          />
                          <i
                            class="el-icon-search"
                            @click="selectOac12(scope.$index)"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 冲销信息不可编辑 -->
              <div class="title_line" v-if="!table_able.includes('oad')">冲销信息</div>
              <div v-if="!table_able.includes('oad')">
                <el-table
                  :data="tableData.oad"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
                >
                  <el-table-column
                    prop="oad01"
                    label="待抵单号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oad03"
                    label="借款日期"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oad03"
                          style="width: 100%"
                          disabled
                          type="date"
                          placeholder="选择借款日期"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oad04_show"
                    label="借款人"
                    min-width="110px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oad05"
                    label="借款总金额"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oad02"
                    label="还款金额"
                    min-width="130px"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="oad06"
                    label="凭证号"
                    min-width="150px"
                    align="center"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <!-- 冲销信息可编辑 -->
              <div class="title_line" v-if="table_able.includes('oad')">
                <el-button type="primary" size="small" style="position:absolute;left:4px;top:4px;" @click="selectDialog('WQX')">选择未清项</el-button>
                冲销信息
              </div>
              <div v-if="table_able.includes('oad')">
                <el-table
                  :data="tableData.oad"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <el-table-column
                    prop="oad01"
                    label="待抵单号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oad01"
                          placeholder=""
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oad03"
                    label="借款日期"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oad03"
                          style="width: 100%"
                          type="date"
                          disabled
                          placeholder=""
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oad04_show"
                    label="借款人"
                    min-width="110px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oad04_show"
                          placeholder=""
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oad05"
                    label="借款总金额"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oad05"
                          placeholder=""
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oad02"
                    label="还款金额"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oad02"
                          placeholder="请输入还款金额"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oad06"
                    label="凭证号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oad06"
                          placeholder=""
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 财务信息 -->
              <div v-if="workclass_personnel.perid.flownum==3 && oazShow == 1">
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
                <div class="form_line">
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz01') ? 'redPot' : ''">银行</span>
                  </div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('bank')">
                      {{ financialData.bank_show }}
                    </div>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz02') ? 'redPot' : ''">异动码</span>
                  </div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('YDM')">
                      {{ financialData.num_show }}
                    </div>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz03') ? 'redPot' : ''">记账日期</span>
                  </div>
                  <div class="infobox middlebox datebox last_row">
                    <el-date-picker
                      v-model="oaz.oaz03"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    >
                    </el-date-picker>
                  </div>
                </div>
                <div class="form_line last_line">
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz04') ? 'redPot' : ''">账款类型</span>
                  </div>
                  <div class="infobox selectbox">
                    <div class="selector" @click="selectDialog('ZKLX')">
                      {{ financialData.oaz04_show }}
                    </div>
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz06') ? 'redPot' : ''">凭证编号</span>
                  </div>
                  <div class="infobox selectbox editNot">
                    {{ oaz.oaz06 }}
                  </div>
                  <div class="titlebox">
                    <span :class="form_must.includes('oaz05') ? 'redPot' : ''">支付方式</span>
                  </div>
                  <div class="infobox middlebox selectbox last_row">
                    {{ financialData.oaz05_show }}
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
import { workflowsList, editFlow, transfer, addFlow } from "@/api/process_new";
import { dateFmt, number_chinese, OpenLoading } from "@/utils/utils.js";
import {
  gensList,
  azisList,
  pmasList,
  pjbsList,
  aagsList,
  pjasList,
} from "@/api/basic.js";

export default {
  components: { SelectData },
  data() {
    return {
      overloading: '', //加载定时器
      workid: "",
      workname: "外地差旅报销单",
      activeTab: "firTab",
      more:[],//查看更多
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人
        oaa05: "", //联系电话
        //报销信息
        oaa06: "", //币种
        oaa08: "", //汇率
        oaa12: "", //支付方式
        oaa14: "", //发票张数
        oaa15: "", //出差申请单
        oaa16: "", //说明
        payMoney: "", //支付金额
        expenseMoneyF: "", //报销金额大写
        // 收款信息
        oaa09: "", //收款人
        oaa10: "", //开户行
        oaa11: "", //收款账号
        oaa17: "", //支票号
        // 表格部分
        oab: [], // 差旅明细
        oac: [], // 费用明细行项目
        oad: [], // 冲销信息
      },
      oacType: "", //核算项类型
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //申请人部门
        oaa15_show:"",//出差申请单
      },
      table_able:[],//表格可编辑项
      form_must:[],//必填项
      oab_must:[],//差旅明细必填项
      oac_must:[],//费用明细必填项
      oad_must:[],//冲销信息必填项
      financialData: {
        bank_show: "", //银行回显数据
        num_show: "", //异动码回显数据
        oaz05_show: "", //支付方式回显数据
        oaz04_show: "", //账款类型回显数据
      },
      //财务信息
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: "", //记账日期
        oaz04: "", //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      workclass_personnel: {perid: {flownum: ''}}, //流程详情
      workclass_perflow: [], //已流转流程进度
      fixedData: {
        // 币种列表
        cointypes: [],
        //支付方式
        payTypes: [],
      },
      fileList_user: [],
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8943,
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
        head_CCSQD:[
          { name: "id", title: "id" },
          { name: "title", title: "流程名称" },
        ],
        head_WQX:[
          { name: "id", title: "待抵账款编号" },
          { name: "original_amount", title: "本币未冲金额" },
          { name: "date", title: "日期" },
          { name: "rid", title: "借款人编号" },
          { name: "rname", title: "借款人名称" },
          { name: "voucher_code", title: "凭证编号" },
        ],
        head_bank: [
          { name: "nma01", title: "银行编号" },
          { name: "nma02", title: "银行名称" },
          { name: "nma28", title: "1.支存 2.活存 3.其他" },
          { name: "nma04", title: "银行账号" },
          { name: "nma09", title: "存款类别" },
          { name: "nma10", title: "存款币别" },
        ],
        head_YDM: [
          { name: "nmc01", title: "银行异动码编号" },
          { name: "nmc02", title: "核算项名称" },
          { name: "nmc03", title: "存提款" },
        ],
        head_ZKLX: [
          { name: "apr01", title: "账款类型编号" },
          { name: "apr02", title: "账款类型名称" },
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
    this.workid = this.$route.query.workid ? this.$route.query.workid : 5044;
    this.getworkflows();
    this.getAzi(); //币种列表
    this.getPma(); //支付方式
  },
  computed: {
    totalCost() {
      let sum =
        this.carCost +
        this.accomCost +
        this.tansportCost +
        this.conferCost +
        this.commuCost +
        this.others;
      return sum;
    },
    // 车船费
    carCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab06);
      }, 0);
    },
    //住宿费
    accomCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab08);
      }, 0);
    },
    // 室内交通费
    tansportCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab10);
      }, 0);
    },
    // 会议费
    conferCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab12);
      }, 0);
    },
    //交际费
    commuCost() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab13);
      }, 0);
    },
    // 其他
    others() {
      return this.tableData.oab.reduce((prev, cur) => {
        return prev + Number(cur.oab14);
      }, 0);
    },
    // 补助合计
    subside() {
      return this.tableData.oab.reduce((prev, cur) => {
        return (
          prev +
          (Number(cur.oab07) +
            Number(cur.oab09) +
            Number(cur.oab11) +
            Number(cur.oab15))
        );
      }, 0);
    },
    // 报销金额（不含税）
    expenseMoney() {
      let sum = this.tableData.oac.reduce((prev, cur) => {
        return prev + Number(cur.oac07);
      }, 0);
      this.tableData.expenseMoneyF = number_chinese(sum);
      return sum;
    },
    // 支付金额
    payMoney() {
      // 还款金额总和
      let sum = this.tableData.oad.reduce((prev, cur) => {
        return prev + Number(cur.oad02);
      }, 0);
      // 支付金额
      let res = this.expenseMoney - sum;
      this.tableData.payMoney = res;
      return res;
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
    must_oad(obj) {
      if (this.oad_must.includes(obj.column.property)) {
        return "must";
      }
    },
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取流程信息************
    getworkflows() {
      const loading = OpenLoading(this, 1)
      const params = {
        workid: this.workid,
      };
      workflowsList(params).then((res) => {
        if (res.status == 200) {
          loading.close();
          clearTimeout(this.overloading)
          this.tableData = res.data.workclass_info.from_data;
          this.workname = res.data.workclass_info.title;
          this.workclass_personnel = res.data.workclass_personnel;
          this.workclass_perflow = res.data.workclass_perflow;
          this.table_able = res.data.workclass_info.form_able
          this.form_must = res.data.workclass_info.form_must_able
          this.oab_must = res.data.workclass_info.form_view_must_able.oab ? res.data.workclass_info.form_view_must_able.oab : []
          this.oac_must = res.data.workclass_info.form_view_must_able.oac ? res.data.workclass_info.form_view_must_able.oac : []
          this.oad_must = res.data.workclass_info.form_view_must_able.oad ? res.data.workclass_info.form_view_must_able.oad : []
          this.more = res.data.workclass_info.more
          this.oazShow = res.data.workclass_flow.erp_turn
          this.oaz = {
            oaz01: res.data.workclass_info.from_data.oaz01, //银行
            oaz02: res.data.workclass_info.from_data.oaz02, //异动码
            oaz03: res.data.workclass_info.from_data.oaz03 ? res.data.workclass_info.from_data.oaz03 : dateFmt(new Date()), //记账日期
            oaz04: 3002, //账款类型
            oaz05: res.data.workclass_info.from_data.oaz05 ? res.data.workclass_info.from_data.oaz05 : res.data.workclass_info.from_data.oaa12, //支付方式
            oaz06: res.data.workclass_info.from_data.oaz06, //凭证编号
          }
          this.financialData ={
            bank_show: res.data.workclass_info.from_data.oaz01_show, //银行回显数据
            num_show: res.data.workclass_info.from_data.oaz02_show, //异动码回显数据
            oaz04_show: "员工报销",//账款类型回显数据
            oaz05_show: res.data.workclass_info.from_data.oaz05_show ? res.data.workclass_info.from_data.oaz05_show : res.data.workclass_info.from_data.oaa12_show, //支付方式回显数据
          }
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
          clearTimeout(this.overloading)
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
    // 表格部分
    // 增加一行
    // 差旅明细表格
    addRow1() {
      let data = {
        oab01: "", //开始日期
        oab02: "", //结束日期
        oab03: "", //单据号
        oab04: "", //出发地
        oab05: "", //目的地
        oab06: "", //车船费
        oab07: "", //车补
        oab08: "", //住宿费
        oab09: "", //住补
        oab10: "", //市内交通费
        oab11: "", //市补
        oab12: "", //会议费
        oab13: "", //交际费
        oab14: "", //其他
        oab15: "", //伙食补助
      };
      this.tableData.oab.push(data);
    },
    // 删除当前行
    deleteRow1(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oab.splice(val, 1);
        if (this.tableData.oab.length == 0) {
          this.addRow1();
        }
      });
    },
    // 费用明细行项目表格
    addRow2() {
      let data = {
        oac01: "", //会计科目
        oac04: "", //项目、
        oac05: "", //项目wbs
        oac06: "", //摘要
        oac07: "", //金额不含税
        oac11: "", //核算项1
        oac12: "", //核算项2
      };
      this.tableData.oac.push(data);
    },
    // 删除当前行
    deleteRow2(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oac.splice(val, 1);
        if (this.tableData.oac.length == 0) {
          this.addRow2();
        }
      });
    },
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
      if (url == "/agree" && this.oazShow == 1 && this.workclass_personnel.perid.flownum == 3) {
        if (this.oaz.oaz06 == "" || this.oaz.oaz06 == null) {
          this.$message.error("请先生成凭证！");
        } else {
          this.nextFuns(url);
        }
      } else if(url == "/reject" || url == "/back"){
        this.$router.push({
          path: url,
          query: {
            url_type: 'travel',
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
              url_type: 'travel',
              workid: this.workid,
              workname: this.workname,
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
    // 生成凭证
    generate() {
      const loading = OpenLoading(this, 2)
      this.addParams.from_data = {...this.tableData,...this.oaz};
      this.addParams.workid = this.workid;
      editFlow(this.addParams).then((res) => {
        if (res.status == 200) {
          let params = {
            workid: this.workid,
          };
          transfer(params).then((res) => {
            if (res.status == 200) {
              loading.close();
              clearTimeout(this.overloading)
              this.$message.success("抛转成功！");
              this.oaz.oaz03 = res.data.oaz03;
              this.oaz.oaz06 = res.data.oaz06;
            } else {
              loading.close();
              clearTimeout(this.overloading)
              this.$message.error("抛转失败:" + res.error.message);
            }
          });
        } else {
          loading.close();
          clearTimeout(this.overloading)
          this.$message.error("抛转失败:" + res.error.message);
        }
      });
    },
    // 查看更多
    seeMore(url) {
      window.open(url, "_blank");
    },
    // **************************
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
    // ******************
    // 数据选择
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
        case "CCSQD":
          let filter_CCSQD = [
            { label: "", model_key_search: "keyword" },
            {
              label: "tplid",
              model_key_search: "tplid",
              disabled: true,
              value: 8941,
              hide: true,
            },
          ];
          this.dataSelect.filter = filter_CCSQD;
          this.dataSelect.searchType = "mixed";
          this.dataSelect.editType = "entry";
          this.dataSelect.searchApi = "oa/workflows";
          this.dataSelect.headList = this.tableHead.head_CCSQD;
          this.dataSelect.dialogTitle = "出差申请单列表";
          break;
        case "WQX":
          this.dataSelect.dialogVisible = false;
          if (this.tableData.oaa04 == "") {
            this.$message.warning("请先选择申请人！");
          } else {
            this.dataSelect.dialogVisible = true;
            let params_WQX = {
              type: 1,
              number: this.tableData.oaa04,
            };
            this.dataSelect.editType = "search";
            this.dataSelect.searchParams = params_WQX;
            this.dataSelect.filter = [];
            this.dataSelect.searchType = "single";
            this.dataSelect.searchApi = "oa/openitems";
            this.selectLoading = false;
            this.dataSelect.headList = this.tableHead.head_WQX;
            this.dataSelect.dialogTitle = "未清项列表";
          }
          break;
        case "bank":
          let filter_bank = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_bank;
          this.dataSelect.searchApi = "meta/nmas";
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.headList = this.tableHead.head_bank;
          this.dataSelect.dialogTitle = "银行";
          break;
        case "YDM":
          let filter_YDM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YDM;
          this.dataSelect.searchApi = "meta/nmcs";
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.headList = this.tableHead.head_YDM;
          this.dataSelect.dialogTitle = "异动码";
          break;
        case "ZKLX":
          let filter_ZKLX = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_ZKLX;
          this.dataSelect.searchApi = "meta/aprs";
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.headList = this.tableHead.head_ZKLX;
          this.dataSelect.dialogTitle = "账款类型";
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
            this.tableData.oaa04 = val[0].gen01;
            this.tableData.oaa04_show = val[0].gen02;
            this.tableData.oaa04_gen04 = val[0].gen04;
            break;
          case "KJKM":
            this.tableData.oac[this.rowIndex].oac01 = val[0].aag01;
            this.tableData.oac[this.rowIndex].oac01_aag15 = val[0].aag15;
            this.tableData.oac[this.rowIndex].oac01_aag151 = val[0].aag151;
            this.tableData.oac[this.rowIndex].oac01_aag16 = val[0].aag16;
            this.tableData.oac[this.rowIndex].oac01_aag161 = val[0].aag161;
            break;
          case "XM":
            this.tableData.oac[this.rowIndex].oac04 = val[0].pja01;
            break;
          case "WBS":
            this.tableData.oac[this.rowIndex].oac05 = val[0].pjb02;
            break;
          case "CCSQD":
            this.tableData.oaa15 = val[0].id;
            this.tableData.oaa15_show = val[0].title;
            break;
          case "WQX":
            val.forEach((item) => {
              this.$set(item, "oad01", item.id);
              this.$set(item, "oad02", "");
              this.$set(item, "oad03", item.date);
              this.$set(item, "oad04", item.rid);
              this.$set(item, "oad04_show", item.rname);
              this.$set(item, "oad05", item.original_amount);
              this.$set(item, "oad06", item.voucher_code);
            });
            this.tableData.oad = val;
            break;
          case "bank":
            this.oaz.oaz01 = val[0].nma01;
            this.financialData.bank_show = val[0].nma02;
            break;
          case "YDM":
            this.oaz.oaz02 = val[0].nmc01;
            this.financialData.num_show = val[0].nmc02;
            break;
          case "ZKLX":
            this.oaz.oaz04 = val[0].apr01;
            this.financialData.oaz04_show = val[0].apr02;
            break;
          case "getpmcsList":
            console.log(this.oacType);
            console.log(val)
            if(this.oacType == 'oac11'){
              this.tableData.oac[this.rowIndex].oac11 = val[0].pmc01;
            }else{
              console.log(this.oacType)
              this.tableData.oac[this.rowIndex].oac12 = val[0].pmc01;
            }
            break;
          case "getgensList":
            
            console.log(this.oacType);
            if(this.oacType == 'oac11'){
              this.tableData.oac[this.rowIndex].oac11 = val[0].gen01;
            }else{
              this.tableData.oac[this.rowIndex].oac12 = val[0].gen01;
            }
            break;
          case "getoccsList":
            console.log(this.oacType);
            if(this.oacType == 'oac11'){
              this.tableData.oac[this.rowIndex].oac11 = val[0].occ01;
            }else{
              this.tableData.oac[this.rowIndex].oac12 = val[0].occ01;
            }
            break;
          case "getnmasList":
            console.log(this.oacType);
            if(this.oacType == 'oac11'){
              this.tableData.oac[this.rowIndex].oac11 = val[0].nma01;
            }else{
              this.tableData.oac[this.rowIndex].oac12 = val[0].nma01;
            }
            break;
          case "getgecsList":
            console.log(this.oacType);
            if(this.oacType == 'oac11'){
              this.tableData.oac[this.rowIndex].oac11 = val[0].gec01;
            }else{
              this.tableData.oac[this.rowIndex].oac12 = val[0].gec01;
            }
            break;
          case "getpjasList":
            console.log(this.oacType);
            if(this.oacType == 'oac11'){
              this.tableData.oac[this.rowIndex].oac11 = val[0].gja01;
            }else{
              this.tableData.oac[this.rowIndex].oac12 = val[0].gja01;
            }
            break;
          case "getpjbsList":
            console.log(this.oacType);
            if(this.oacType == 'oac11'){
              this.tableData.oac[this.rowIndex].oac11 = val[0].pjb02;
            }else{
              this.tableData.oac[this.rowIndex].oac12 = val[0].pjb02;
            }
            break;
          
          default:
            return;
            break;
        }
      }
    },
    //
    selectOac11(val) {
      let row = this.tableData.oac[val];
      this.oacType = "oac11";
      if (!this.tableData.oac[val].oac01) {
        this.$message.warning("请先选择会计科目！");
      } else if(this.tableData.oac[val].oac01 && !this.tableData.oac[val].oac01_aag15){
        this.$message.warning("此科目无核算项一，请手动输入！");
      } 
      else {
        switch (row.oac01_aag15) {
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
    selectOac12(val) {
      let row = this.tableData.oac[val];
      this.oacType = "oac12";
      if (!this.tableData.oac[val].oac01) {
        this.$message.warning("请先选择会计科目！");
      } else if(this.tableData.oac[val].oac01 && !this.tableData.oac[val].oac01_aag16){
        this.$message.warning("此科目无核算项二，请手动输入！");
      } 
      else {
        switch (row.oac01_aag16) {
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
</style>
