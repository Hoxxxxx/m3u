<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary" class="save" @click="addNewFlow()"
          >保存</el-button
        >
        <el-button type="primary" class="next" @click="nextStep()"
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
            <div class="title">{{ workname }}</div>
            <div class="table_Info">
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox editNot">
                  {{ tableData.oaa03 }}
                </div>
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ showData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox">联系电话</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <!-- 报销信息 -->
              <div class="title_line">报销信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox">币种</div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa06"
                    class="select"
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
                <div class="titlebox">汇率</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa08"
                    placeholder="请输入汇率"
                  />
                </div>
                <div class="titlebox">支付金额</div>
                <div class="infobox last_row editNot">
                  {{ payMoney }}
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox">报销金额</div>
                <div class="infobox editNot">
                  {{ expenseMoney }}
                </div>
                <div class="titlebox">报销金额大写</div>
                <div class="infobox editNot">
                  {{ tableData.expenseMoneyF }}
                </div>
                <div class="titlebox">支付方式</div>
                <div class="infobox last_row selectbox">
                  <el-select
                    v-model="tableData.oaa12"
                    class="select"
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
                <div class="titlebox">发票张数</div>
                <div class="infobox longbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa14"
                    placeholder="请输入发票张数"
                  />
                </div>
              </div>
              <!-- 4 -->
              <div class="form_line">
                <div class="titlebox">出差申请单</div>
                <div class="infobox longbox selectbox">
                  <div class="selector" style="padding-right:0;background-position:right center;" @click="selectDialog('CCSQD')">
                    {{ showData.oaa15_show }}
                  </div>
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
                    v-model="tableData.oaa16"
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
                    v-model="tableData.oaa09"
                    placeholder="请输入收款人"
                  />
                </div>
                <div class="titlebox">开户行</div>
                <div class="infobox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa10"
                    placeholder="请输入开户行"
                  />
                </div>
                <div class="titlebox">收款账号</div>
                <div class="infobox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa11"
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
                    v-model="tableData.oaa17"
                    placeholder="请输入支票号"
                  />
                </div>
              </div>
              <!-- 差旅明细 -->
              <div class="title_line">差旅明细</div>
              <div>
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
                      <div class="summryName">费用合计</div>
                      <div class="summryCont">{{ totalCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">车船费合计</div>
                      <div class="summryCont">{{ carCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">住宿费</div>
                      <div class="summryCont">{{ accomCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">室内交通费</div>
                      <div class="summryCont">{{ tansportCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">会议费</div>
                      <div class="summryCont">{{ conferCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">交际费</div>
                      <div class="summryCont">{{ commuCost }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">其他</div>
                      <div class="summryCont">{{ others }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">补助合计</div>
                      <div class="summryCont">{{ subside }}</div>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 费用明细行项目 -->
              <div class="title_line">费用明细行项目</div>
              <div>
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
                          placeholder="单位"
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
                    prop="oac11"
                    label="核算项一"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oac11"
                          placeholder="请选择核算项一"
                        >
                          <el-option
                            v-for="(item, index) in fixedData.options_04"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oac12"
                    label="核算项二"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oac12"
                          placeholder="请选择核算项二"
                        >
                          <el-option
                            v-for="(item, index) in fixedData.options_05"
                            :key="index.value"
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
              <div class="title_line">
                <el-button type="primary" size="small" style="position:absolute;left:0;top:4px;" @click="selectDialog('WQX')">选择未清项</el-button>
                冲销信息
              </div>
              <div>
                <el-table
                  :data="tableData.oad"
                  v-loading="false"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  element-loading-text="数据正在加载中"
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  :cell-style="{ background: '#fff', color: '#666666' }"
                >
                  <!-- <el-table-column
                    prop=""
                    label="增 / 删"
                    fixed="left"
                    width="100px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div style="font-size: 24px; width: 100%; height: 100%">
                          <i
                            v-if="scope.$index == tableData.oad.length - 1"
                            @click="addRow3()"
                            class="el-icon-circle-plus"
                            style="color: #409efd; width: 30px; cursor: pointer"
                          ></i>
                          <i
                            @click="deleteRow3(scope.$index)"
                            class="el-icon-remove"
                            style="color: #f56c6c; width: 30px; cursor: pointer"
                          ></i>
                        </div>
                      </div>
                    </template>
                  </el-table-column> -->
                  <el-table-column
                    prop="id"
                    label="待抵单号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.id"
                          placeholder="请输入待抵单号"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="借款日期"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.date"
                          style="width: 100%"
                          type="date"
                          disabled
                          placeholder="选择借款日期"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="rname"
                    label="借款人"
                    min-width="110px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.rname"
                          placeholder="请输入借款人"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="original_amount"
                    label="借款总金额"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.original_amount"
                          placeholder="请输入借款总金额"
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
                    prop="voucher_code"
                    label="凭证号"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.voucher_code"
                          placeholder="请输入凭证号"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
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
        <el-upload
          class="upload_annex"
          :action="$store.state.upload_url"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
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
import { dateFmt,number_chinese } from "@/utils/utils.js";
import { addFlow,workflows,openitems } from "@/api/process_new";
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
      workname: "外地差旅报销单",
      activeTab: "firTab",
      workid: "",
      workName: "外地差旅报销单（华录新媒）", //流程名
      showData: {
        oaa04_show: "", //申请人
        oaa15_show:"",//出差申请单
      },
      tableData: {
        // 基本信息
        oaa02: "", //业务日期
        oaa01: "", //申请单编号
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        //报销信息
        oaa06: "RMB", //币种
        oaa08: "1", //汇率
        oaa12: "TT", //支付方式
        oaa14: "", //发票张数
        oaa15: "", //出差申请单
        oaa16: "", //说明
        payMoney: "", //支付金额
        expenseMoney: "", //报销金额
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
      fixedData: {
        // 币种列表
        cointypes: [],
        //支付方式
        payTypes: [],
        // 表格部分
        // 会计科目
        options_01: [],
        //项目
        options_02: [],
        //项目WBS
        options_03: [],
        // 核算项一
        options_04: [
          {
            value: "0",
            label: "核算项1",
          },
          {
            value: "1",
            label: "核算项2",
          },
        ],
        // 核算项二
        options_05: [
          {
            value: "0",
            label: "核算项1",
          },
          {
            value: "1",
            label: "核算项2",
          },
        ],
      },
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8943,
      },

      rowIndex: "", //当前点击的行数
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
        searchParams:{},//搜索接口自带参数
        searchType:"",//搜索类型
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
          { name: "rid", title: "供应商编号/借款人编号" },
          { name: "rname", title: "供应商名称/借款人名称" },
          { name: "voucher_code", title: "凭证编号" },
        ]
      },
    };
  },
  computed: {
    totalCost() {
      let sum = this.carCost +
        this.accomCost +
        this.tansportCost +
        this.conferCost +
        this.commuCost +
        this.others
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
    expenseMoney(){
      let sum =  this.tableData.oac.reduce((prev, cur) => {
        return prev + Number(cur.oac07);
      }, 0);
      this.tableData.expenseMoney = sum
      this.tableData.expenseMoneyF = number_chinese(sum)
      return sum
    },
    // 支付金额
    payMoney(){
      // 还款金额总和
      let sum = this.tableData.oad.reduce((prev, cur) => {
        return prev + Number(cur.oad02);
      }, 0);
      // 支付金额
      let res = this.expenseMoney - sum
      this.tableData.payMoney = res
      return res
    }
  },
  created() {
    this.addParams.tplid = this.$route.query.tplid
    this.addRow1();
    this.addRow2();
    this.addRow3();
    this.getAzi(); //币种列表
    this.getPma(); //支付方式
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ****************附件上传*****************
    // 上传成功
    handleSuccess(response, file, fileList) {
      this.addParams.annexurlid.push({
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
    // *******************************************
    // ****************其他操作*******************
    // 新增表单
    addNewFlow() {
      this.addParams.from_data = this.tableData;
      addFlow(this.addParams).then((result) => {
        if (result.status == 200) {
          this.workid = result.data.workid;
          this.tableData.oaa01 = result.data.oaa01;
          this.tableData.oaa02 = result.data.oaa02;
          this.$message.success("保存成功！");
        } else {
          this.$message.error("保存失败：" + result.error.message);
        }
      });
    },
    // 下一步
    nextStep() {
      this.addParams.from_data = this.tableData;
      addFlow(this.addParams)
        .then((result) => {
          if (result.status == 200) {
            this.workid = result.data.workid;
            this.tableData.oaa01 = result.data.oaa01;
            this.tableData.oaa02 = result.data.oaa02;
            // this.$message.success("保存成功！");
          } else {
            this.$message.error("保存失败：" + result.error.message);
          }
        })
        .then(() => {
          this.$router.push({
            path: "/apply",
            query: {
              workName: this.workName,
              workid: this.workid,
              workname: this.workname,
              oaa01: this.tableData.oaa01,
              oaa02: this.tableData.oaa02,
            },
          });
        });
    },
    // *******************************************
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
    // 冲销信息表格
    addRow3() {
      let data = {
        oad02: "", //还款金额
      };
      this.tableData.oad.push(data);
    },
    // 删除当前行
    deleteRow3(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oad.splice(val, 1);
        if (this.tableData.oad.length == 0) {
          this.addRow3();
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
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gens";
          this.selectLoading = false;
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
          break;
        case "KJKM":
          let filter_KJKM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_KJKM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/aags";
          this.selectLoading = false;
          this.dataSelect.headList = this.tableHead.head_KJKM;
          this.dataSelect.dialogTitle = "会计科目";
          break;
        case "XM":
          let filter_XM = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_XM;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pjas";
          this.selectLoading = false;
          this.dataSelect.headList = this.tableHead.head_XM;
          this.dataSelect.dialogTitle = "项目";
          break;
        case "WBS":
          let filter_WBS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_WBS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pjbs";
          this.selectLoading = false;
          this.dataSelect.headList = this.tableHead.head_WBS;
          this.dataSelect.dialogTitle = "WBS列表";
          break;
        case "CCSQD":
          let filter_CCSQD = [{ label: "", model_key_search: "title" }];
          this.dataSelect.filter = filter_CCSQD;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "oa/workflows";
          this.selectLoading = false;
          this.dataSelect.headList = this.tableHead.head_CCSQD;
          this.dataSelect.dialogTitle = "出差申请单列表";
          break;
        case "WQX":
          // let filter_WQX = [{ label: "", model_key_search: "type" }];
          let params = {
            type:1,
            number:this.tableData.oaa04
          }
          this.dataSelect.editType = "search"
          this.dataSelect.searchParams = params
          this.dataSelect.filter = [];
          this.dataSelect.searchType = "single"
          this.dataSelect.searchApi = "oa/openitems";
          this.selectLoading = false;
          this.dataSelect.headList = this.tableHead.head_WQX;
          this.dataSelect.dialogTitle = "未清项列表";
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
            break;
          case "KJKM":
            this.tableData.oac[this.rowIndex].oac01 = val[0].aag01;
            break;
          case "XM":
            this.tableData.oac[this.rowIndex].oac04 = val[0].pja01;
            break;
          case "WBS":
            this.tableData.oac[this.rowIndex].oac05 = val[0].pjb02;
            break;
          case "CCSQD":
            this.tableData.oaa15 = val[0].id;
            this.showData.oaa15_show = val[0].title;
            break;
          case "WQX":
            val.forEach(item=>{
              item.oad02 = ''
            })
            this.tableData.oad = val
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
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        width: 74px;
        // flex: 1 1 auto;
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
