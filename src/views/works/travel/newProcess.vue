<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <el-button type="primary" @click="$router.push('/')"
          >回到首页</el-button
        >
        <el-button type="primary" class="save" @click="save">保存</el-button>
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
              <span class="code">业务日期：{{ tableData.oaa02 }}</span>
              <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
            </div>
            <div class="tableBox">
              <!-- 基本信息 -->
              <div class="title_line">基本信息</div>
              <div class="form_line">
                <div class="titlebox">经办人</div>
                <div class="infobox">
                  {{ tableData.oaa03 }}
                </div>
                <div class="titlebox">申请人</div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa04"
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
                    v-model="tableData.oaa08"
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
                <div class="infobox last_row selectbox">
                  <el-select
                    v-model="tableData.oaa12"
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
                    v-model="tableData.oaa14"
                    placeholder="请输入发票张数"
                  />
                </div>
              </div>
              <!-- 4 -->
              <div class="form_line">
                <div class="titlebox">出差申请单</div>
                <div class="infobox longbox selectbox">
                  <el-select
                    v-model="tableData.oaa15"
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
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
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
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oab04"
                          placeholder="请选择出发地"
                        >
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
                    prop="oab05"
                    label="目的地"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oab05"
                          placeholder="请选择目的地"
                        >
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
                  <div class="summryTitle">费用合计</div>
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName">车船费合计</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">住宿费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">室内交通费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">会议费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">交际费</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">其他</div>
                      <div class="summryCont">0</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">补助合计</div>
                      <div class="summryCont">0</div>
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
                  :cell-style="{ background: '#FCFDFF', color: '#666666' }"
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
                        <el-select
                          v-model="scope.row.oac01"
                          placeholder="请选择会计科目"
                        >
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
                    prop="oac04"
                    label="项目"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oac04"
                          placeholder="请选择项目"
                        >
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
                    prop="oac05"
                    label="项目WBS"
                    min-width="150px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-select
                          v-model="scope.row.oac05"
                          placeholder="请选择项目WBS"
                        >
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
                  :data="tableData.oad"
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
                          placeholder="请输入待抵单号"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb09"
                    label="借款日期"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.borrowDate"
                          style="width: 100%"
                          type="date"
                          placeholder="选择借款日期"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb28"
                    label="借款人"
                    min-width="110px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="请输入借款人"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="apb35"
                    label="借款总金额"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.apb28"
                          placeholder="请输入借款总金额"
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
                          v-model="scope.row.apb28"
                          placeholder="请输入还款金额"
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
                          placeholder="请输入凭证号"
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
import { dateFmt } from "@/utils/utils.js";
import { gensList } from "@/api/basic.js";

export default {
  components: {},
  data() {
    return {
      activeTab: "firTab",
      tableData: {
        // 基本信息
        oaa02: this.getCurrentTime(), //业务日期
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
        options_01: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        //项目
        options_02: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        //项目WBS
        options_03: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        // 核算项一
        options_04: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
        // 核算项二
        options_05: [
          {
            value: "选项1",
            label: "黄金糕",
          },
        ],
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
  created() {
    this.addRow1();
    this.addRow2();
    this.addRow3();
    gensList().then((res) => {
      console.log(res);
    });
  },
  methods: {
    // 获取当前时间 格式:yyyy-MM-dd HH:MM:SS
    getCurrentTime() {
      var date = new Date(); //当前时间
      var month = this.zeroFill(date.getMonth() + 1); //月
      var day = this.zeroFill(date.getDate()); //日
      var hour = this.zeroFill(date.getHours()); //时
      var minute = this.zeroFill(date.getMinutes()); //分
      var second = this.zeroFill(date.getSeconds()); //秒
      //当前时间
      var curTime =
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return curTime;
    },
    // 补零
    zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return "0" + i;
      } else {
        return i;
      }
    },
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
    // 保存
    save() {
      console.log(this.tableData);
    },
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
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
.summry {
  display: flex;
  flex-direction: row;
  .summryTitle {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #666;
    border-right: 1px solid #cccccc;
  }
  .summryUl {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #666;
    .summryLi {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-right: 1px solid #cccccc;
      .summryName {
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        width: 80px;
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
