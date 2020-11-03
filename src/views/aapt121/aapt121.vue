<template>
  <div class="workDetail">
    <!-- 顶部菜单 -->
    <div class="menuOuter">
      <div class="menuList">
        <ul v-if="displayType == 'show'">
          <li @click="entryClick()">
            <span class="iconfont">&#xe797;</span>
            <span>录入</span>
          </li>
          <li @click="changeClick()">
            <span class="iconfont">&#xe791;</span>
            <span>更改</span>
          </li>
          <li>
            <span class="iconfont">&#xe7c3;</span>
            <span>删除</span>
          </li>
          <li>
            <span class="iconfont">&#xe7bc;</span>
            <span>复制</span>
          </li>
          <li>
            <span class="iconfont">&#xe7b9;</span>
            <span>单身</span>
          </li>
          <li>
            <span class="iconfont">&#xe7d8;</span>
            <span>打印</span>
          </li>
          <li>
            <span class="iconfont">&#xe7de;</span>
            <span>汇出</span>
          </li>
          <li @click="searchClick()">
            <span class="iconfont">&#xe8ef;</span>
            <span>查询</span>
          </li>
          <li>
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li>
            <span class="iconfont">&#xe7ed;</span>
            <span>上笔</span>
          </li>
          <li>
            <input type="text" class="numInput" />
            <span>指定笔</span>
          </li>
          <li>
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li>
            <span class="iconfont">&#xe7eb;</span>
            <span>末一笔</span>
          </li>
        </ul>
        <div v-else class="saveBtns">
          <el-button class="cancel" @click="cancel()">取消</el-button>
          <el-button class="sure" type="primary" @click="sure()"
            >确定</el-button
          >
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <el-card class="content">
      <!-- 上半部分表单区域 -->
      <el-tabs v-model="curPane" @tab-click="handleClick">
        <!-- 基本资料 -->
        <el-tab-pane label="基本资料" name="0">
          <!-- 表单区 -->
          <div class="forms">
            <!-- left -->
            <ul class="left">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >款帐编号</label
                >
                <!-- <el-select
                  v-model="account"
                  placeholder="请选择款帐编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in accounts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ account }}
                </div>
                <div class="elInput msgBox" v-else>{{ account }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >款帐日期</label
                >
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  ref="serialDate"
                >
                </el-date-picker>
                <!-- 点击直接付款时显示此内容 -->
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-else-if="displayType == 'directPay'"
                  ref="serialDate"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ serialDate }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >请款人员</label
                >
                <!-- <el-select
                  v-model="member"
                  placeholder="请选择人员"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in members"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ member }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ member }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ member }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ member }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >请款部门</label
                >
                <!-- <el-select
                  v-model="depart"
                  placeholder="请选择部门"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in departs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ depart }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ depart }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ depart }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ depart }}
                  </div>
                </div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <ul>
                  <li>
                    <label class="label">凭证编号</label>
                    <el-input
                      v-model="accountNum"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="shortInput msgBox" v-else>{{ accountNum }}</div>
                  </li>
                  <li>
                    <label class="label">状态码</label>
                    <el-input
                      v-model="status"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="shortInput msgBox" v-else>{{ status }}</div>
                  </li>
                </ul>
                <div class="img"></div>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label">签核否</label>
                  <el-checkbox v-model="audit" id="audit"></el-checkbox>
                </div>
                <div class="checkBox">
                  <label class="label">作废码</label>
                  <el-checkbox v-model="auditNum"></el-checkbox>
                </div>
                <div class="checkBox">
                  <label class="label">审核码</label>
                  <el-checkbox v-model="Posting"></el-checkbox>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 状态 -->
        <el-tab-pane label="状态" name="1">
          <div class="forms states">
            <ul class="left">
              <li>
                <label class="label">资料所有者</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataOwner }}
                </div>
              </li>
              <li>
                <label class="label">资料更改者</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataChanger }}
                </div>
              </li>
              <li>
                <label class="label">资料有效码</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataValidCode }}
                </div>
              </li>
              <li>
                <label class="label">资料所有群</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataOwnerGroup }}
                </div>
              </li>
              <li>
                <label class="label">最近更改日</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ latestChange }}
                </div>
              </li>
              <li>
                <label class="label">OA表单号码</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ OANum }}
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 中间部分表单区域 -->
      <el-tabs
        v-model="curPane1"
        @tab-click="handleClick1"
        style="margin-top: 10px"
      >
        <!-- 报销资料 -->
        <el-tab-pane label="报销资料" name="0">
          <!-- 表单区 -->
          <div class="forms">
            <!-- left -->
            <ul class="left">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >账款类型</label
                >
                <!-- <el-select
                  v-model="cashIn_type"
                  placeholder="请选择借款类型"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in cashIn_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ cashIn_type }}
                </div>
                <div class="elInput msgBox" v-else>{{ cashIn_type }}</div>
              </li>
              <li>
                <label class="label">类型名称</label>
                <el-input
                  v-model="cashIn_msg"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ cashIn_msg }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >币种</label
                >
                <!-- <el-select
                  v-model="currency"
                  placeholder="请选择币种"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in currencys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ currency }}
                </div>
                <div class="elInput msgBox" v-else>{{ currency }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >汇率</label
                >
                <!-- <el-select
                  v-model="exchangeRate"
                  placeholder="请选择汇率"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in exchangeRates"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ exchangeRate }}
                </div>
                <div class="elInput msgBox" v-else>{{ exchangeRate }}</div>
              </li>
              <li>
                <label class="label">发票号码</label>
                <el-input
                  v-model="invoiceNum"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  placeholder="请输入发票号码"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ invoiceNum }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >付款方式</label
                >
                <!-- <el-select
                  v-model="paymentWay"
                  placeholder="请选择付款方式"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentWays"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ paymentWay }}
                </div>
                <div class="elInput msgBox" v-else>{{ paymentWay }}</div>
              </li>
              <li>
                <label class="label">付款类型</label>
                <el-select
                  v-model="paymentTerm"
                  :placeholder="editType == 'search' ? '请选择付款条件' : ''"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTerms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ paymentTerm }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >应付款日</label
                >
                <el-date-picker
                  v-model="paymentDate"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ paymentDate }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >允许票期</label
                >
                <el-input
                  v-model="allowTicket"
                  class="elInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ allowTicket }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >票到期日</label
                >
                <el-date-picker
                  v-model="paymentDeadDate"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ paymentDeadDate }}</div>
              </li>
              <li>
                <label class="label">付款处理</label>
                <el-input
                  v-model="paymentDeal"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentDeal }}</div>
              </li>
              <li>
                <label class="label">支付类型</label>
                <el-select
                  v-model="paymentType"
                  placeholder="请选择支付类型"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <label class="shortLabel"></label>
                <div class="shortBoxs">
                  <div class="doubleTitle">原币</div>
                  <div class="doubleTitle">本币</div>
                </div>
              </li>
              <li>
                <label class="label shortLabel">
                  <span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >报销 +
                </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="borrow_money_local"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ borrow_money_local }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="borrow_money_cur"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ borrow_money_cur }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label shortLabel"> 冲借款 - </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="strike_money_local"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ strike_money_local }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="strike_money_cur"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ strike_money_cur }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label shortLabel"> 归还借款 + </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="return_money_local"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ return_money_local }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="return_money_cur"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ return_money_cur }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label shortLabel"> 应付 = </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="cope_money_local"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ cope_money_local }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="cope_money_cur"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ cope_money_cur }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label shortLabel"> 已付 - </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="prepaid_local"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ prepaid_local }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="prepaid_cur"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ prepaid_cur }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label shortLabel"> 未付 = </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="unpaid_local"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ unpaid_local }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="unpaid_cur"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ unpaid_cur }}</div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label shortLabel"> 汇差 </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="rate_cur"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ rate_cur }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 账务资料 -->
        <el-tab-pane label="账务资料" name="1">
          <!-- 表单区 -->
          <div class="forms">
            <!-- left -->
            <ul class="left">
              <li>
                <label class="label">留置原因</label>
                <el-select
                  v-model="cashIn_type"
                  :placeholder="editType == 'search' ? '请选择留置原因' : ''"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in cashIn_types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ cashIn_type }}</div>
              </li>
              <li>
                <label class="label">留置原因</label>
                <el-input
                  v-model="cashIn_msg"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  :placeholder="editType == 'search' ? '请输入留置原因' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ cashIn_msg }}</div>
              </li>
              <li>
                <label class="label">留置金额</label>
                <el-input
                  v-model="lienMoney"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                  :placeholder="editType == 'search' ? '请输入留置金额' : ''"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ lienMoney }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label">项目编号</label>
                <!-- <el-select
                  v-model="paymentType"
                  :placeholder="editType == 'search' ? '请选择项目编号' : ''"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ paymentType }}
                </div>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
              <li>
                <label class="label">备注</label>
                <el-input
                  v-model="paymentType"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入备注' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
              <li>
                <label class="label" style="width: 90px"
                  >来源营运中心代码</label
                >
                <!-- <el-select
                  v-model="paymentType"
                  :placeholder="
                    editType == 'search' ? '请选择来源营运中心代码' : ''
                  "
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ paymentType }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ paymentType }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ paymentType }}
                  </div>
                </div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <label class="label">录入日期</label>
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  :placeholder="editType == 'search' ? '请选择录入日期' : ''"
                  :disabled="editType == 'search' ? false : true"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  ref="serialDate"
                >
                </el-date-picker>
                <!-- 点击直接付款时显示此内容 -->
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-else-if="displayType == 'directPay'"
                  ref="serialDate"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ serialDate }}</div>
              </li>
              <li>
                <label class="label">多角序号</label>
                <el-input
                  v-model="paymentType"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  :placeholder="editType == 'search' ? '请输入多角序号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 会计资料 -->
        <el-tab-pane label="会计资料" name="2">
          <div class="forms states">
            <ul class="center">
              <!-- <li>
                <label class="label">借方科目</label>
                <el-select
                  v-model="paymentTerm"
                  placeholder="请选择借方科目"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTerms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ paymentTerm }}</div>
              </li>
              <li>
                <label class="label">贷方科目</label>
                <el-select
                  v-model="paymentType"
                  placeholder="请选择贷方科目"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li> -->
              <li>
                <label class="label">借方科目</label>
                <!-- <el-select
                  v-model="paymentTerm"
                  placeholder="请选择借方科目"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTerms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ paymentTerm }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ paymentTerm }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ paymentTerm }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ paymentTerm }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label">贷方科目</label>
                <!-- <el-select
                  v-model="paymentType"
                  placeholder="请选择贷方科目"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in paymentTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ paymentType }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ paymentType }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ paymentType }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="还款资料" name="3">
          <div class="forms states">
            <ul class="center">
              <li>
                <label class="label">还款银行</label>
                <!-- <el-select
                  v-model="returnBank"
                  placeholder="请选择还款银行"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in returnBank"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ returnBank }}
                </div>
                <div class="elInput msgBox" v-else>{{ returnBank }}</div>
              </li>
              <li>
                <label class="label">还款异动码</label>
                <!-- <el-select
                  v-model="returnNum"
                  placeholder="请选择还款异动码"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in returnNums"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ returnNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ returnNum }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="tableCard">
      <Table :displayType="displayType" :editType="editType"></Table>
    </el-card>

    <!-- 右边浮窗 -->
    <FixedBtns
      v-if="displayType == 'show'"
      :Btns_List="Btns_List"
      @writeOff="writeOff"
      @directPay="directPay"
      @handleAccount="handleAccount"
      @entryPapers="entryPapers"
      @handAudit="handAudit"
      @auditCancel="auditCancel"
      @handleTurn="handleTurn"
      @handleReduct="handleReduct"
    ></FixedBtns>
    <!-- 审核弹窗 -->
    <Audit
      :auditVisible.sync="auditVisible"
      :auditSuccessVisible.sync="auditSuccessVisible"
      :auditFailVisible.sync="auditFailVisible"
      :failData="failData"
      @auditDialogCancel="auditDialogCancel"
      @auditDialogSure="auditDialogSure"
      @sureSuccess="sureSuccess"
      @sureFail="sureFail"
    ></Audit>
    <!-- 取消审核弹窗 -->
    <CancelAudit
      :auditCancelVisible.sync="auditCancelVisible"
      :auditCancelSuccessVisible.sync="auditCancelSuccessVisible"
      :auditCancelFailVisible.sync="auditCancelFailVisible"
      :auditCancel_fileData="auditCancel_fileData"
      @auditcancel_Cancel="auditcancel_Cancel"
      @auditCancel_Sure="auditCancel_Sure"
      @sure_auditSuccess="sure_auditSuccess"
      @sure_auditFail="sure_auditFail"
    ></CancelAudit>
    <!-- 抛转凭证 -->
    <TurnCredent
      :turnCredentVisible.sync="turnCredentVisible"
      :credentSuccessVisible.sync="credentSuccessVisible"
      :credentFailVisible.sync="credentFailVisible"
      :credentFileData="credentFileData"
      @credent_Cancel="credent_Cancel"
      @credent_Sure="credent_Sure"
      @sure_credentSuccess="sure_credentSuccess"
      @sure_credentFail="sure_credentFail"
    ></TurnCredent>
    <!-- 抛转凭证还原 -->
    <ReductCredent
      :reductCreVis.sync="reductCreVis"
      :reductCreSucVis.sync="reductCreSucVis"
      :reductCreFailVis.sync="reductCreFailVis"
      @reductCre_Cancel="reductCre_Cancel"
      @reductCre_Sure="reductCre_Sure"
      @sure_reductCreSuc="sure_reductCreSuc"
      @sure_reductCreFail="sure_reductCreFail"
    ></ReductCredent>
    <!-- 会计分录生成 -->
    <AccountEntry
      :accEntryVis.sync="accEntryVis"
      :accEntrySucVis.sync="accEntrySucVis"
      :accEntryFailVis.sync="accEntryFailVis"
      :accEntryAgain.sync="accEntryAgain"
      @accEntryCancel="accEntryCancel"
      @accEntrySure="accEntrySure"
      @sure_accEntrySuc="sure_accEntrySuc"
      @sure_accEntryFail="sure_accEntryFail"
      @cancel_again="cancel_again"
      @sure_again="sure_again"
    ></AccountEntry>
  </div>
</template>

<script>
import FixedBtns from "@/components/fixedBtns";
import Audit from "@/components/audit";
import CancelAudit from "@/components/auditCancel";
import TurnCredent from "@/components/turnCredent";
import ReductCredent from "@/components/reductCredent";
import AccountEntry from "@/components/accountEntry";
import Table from "./Table";
import { dateFmt } from "../../utils/utils";
export default {
  components: {
    FixedBtns,
    Audit,
    CancelAudit,
    TurnCredent,
    ReductCredent,
    AccountEntry,
    Table,
  },
  data() {
    return {
      curPane: 0, //上部当前tabs页
      curPane1: 0, //中部当前tabs页
      displayType: "show", // 展示类型：show:显示状态  edit:编辑状态
      editType: "change", //编辑类型： entry:录入  change:更改  search:查询
      workName: "", //控制集团代付单号是否显示
      // 上面部分表单
      accounts: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      account: "", //款帐编号
      serialDate: "", //款帐日期
      members: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      member: "", //请款人员
      departs: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      depart: "", //请款部门
      accountNum: "", //凭证编号
      status: "", //状态码g
      audit: false, //签核
      auditNum: false, //审核
      Posting: false, //作废
      // 中间部分表单
      cashIn_types: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      cashIn_type: "", //借款资料左边的账款类型
      cashIn_msg: "", //类型名称
      currencys: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      currency: "", //币种
      exchangeRates: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      exchangeRate: "", //汇率
      invoiceNum: "", //发票号码
      paymentWays: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      paymentWay: "", //付款方式
      paymentTerms: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      paymentTerm: "", //付款类型
      paymentDate: "", //应付款日
      allowTicket: "", //允许票期
      paymentDeadDate: "", //票到期日
      paymentDeal: "", //付款处理
      paymentTypes: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      paymentType: "", //支付类型
      borrow_money_local: "", //报销原币
      borrow_money_cur: "", //报销本币
      strike_money_local: "", //冲借款原币
      strike_money_cur: "", //冲借款本币
      return_money_local: "", //归还借款原币
      return_money_cur: "", //归还借款本币
      cope_money_local: "", //应付原币
      cope_money_cur: "", //应付本币
      prepaid_local: "", //已付原币
      prepaid_cur: "", //已付本币
      unpaid_local: "", //未付原币
      unpaid_cur: "", //未付本币
      rate_cur: "", //汇差本币
      // 状态栏数据
      dataOwner: "", //资料所有者
      dataOwnerGroup: "", //资料所有群
      dataChanger: "", //资料更改者
      dataChangeTime: "", //资料更改日
      latestChange: "", //最近修改日
      dataValidCode: "", //有效码
      OANum: "", //OA表单号码
      // 账务资料
      lienMoney: "", //留置金额
      // 会计资料
      // 还款资料
      returnBanks: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      returnBank: "", //还款银行
      returnNums: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      returnNum: "", //还款异动码
      // 右侧浮窗
      Btns_List: [
        { name: "冲账", method: "writeOff" },
        { name: "还款查询", method: "returnQuery" },
        { name: "直接付款", method: "directPay" },
        { name: "会计分录生成", method: "handleAccount" },
        { name: "分录底稿", method: "entryPapers" },
        { name: "审核", method: "handAudit" },
        { name: "取消审核", method: "auditCancel" },
        { name: "抛转凭证", method: "handleTurn" },
        { name: "抛转凭证还原", method: "handleReduct" },
      ],
      // 审核弹出框
      auditVisible: false,
      auditSuccessVisible: false, //成功弹窗
      auditFailVisible: false, //失败弹窗
      failData: [], //失败时的表格数据
      // 取消审核弹出框
      auditCancelVisible: false,
      auditCancelSuccessVisible: false, //成功弹窗
      auditCancelFailVisible: false, //失败弹窗
      auditCancel_fileData: [], //失败时的表格数据
      // 抛转凭证弹框
      turnCredentVisible: false,
      credentSuccessVisible: false, //成功弹窗
      credentFailVisible: false, //失败弹窗
      credentFileData: [], //失败时的表格数据
      // 抛转凭证还原弹框
      reductCreVis: false,
      reductCreSucVis: false, //成功弹窗
      reductCreFailVis: false, //失败弹窗
      // 会计分录生成弹窗
      accEntryVis: false,
      accEntrySucVis: false, //成功弹窗
      accEntryFailVis: false, //失败弹窗
      accEntryAgain: false, //重新生成弹窗
    };
  },
  created() {
    this.workName = this.$route.params.workName;
  },
  watch: {
    serialDate(val) {
      this.serialDate = dateFmt(val);
    },
    paymentDate(val) {
      this.paymentDate = dateFmt(val);
    },
    paymentDeadDate(val) {
      this.paymentDeadDate = dateFmt(val);
    },
  },
  methods: {
    // tabs切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClick1(tab, event) {
      console.log(tab, event);
    },
    // 录入
    entryClick() {
      this.displayType = "edit";
      this.editType = "entry";
    },
    // 修改
    changeClick() {
      this.displayType = "edit";
      this.editType = "change";
    },
    // 查询
    searchClick() {
      this.displayType = "edit";
      this.editType = "search";
    },
    // 取消
    cancel() {
      this.displayType = "show";
    },
    // 确定
    sure() {
      if (this.displayType == "directPay") {
        this.$router.push({
          path: "/directPay",
        });
      } else {
        this.displayType = "show";
      }
    },

    // 右边悬浮功能区域点击事件
    //冲账
    writeOff() {
      this.$router.push({
        path: "writeOff",
      });
    },
    // 还款查询
    returnQuery() {},
    // 直接付款
    directPay() {
      this.displayType = "directPay";
      this.$nextTick(function () {
        this.$refs.serialDate.focus();
      });
    },
    // 会计分录生成
    handleAccount() {
      this.accEntryVis = true;
    },
    // 分录底稿
    entryPapers() {
      this.$router.push({
        path: "entryPapers",
      });
    },
    handAudit() {
      this.auditVisible = true;
      console.log("审核");
    },
    auditCancel() {
      this.auditCancelVisible = true;
      console.log("取消审核");
    },
    // 抛转凭证
    handleTurn() {
      this.turnCredentVisible = true;
    },
    // 抛转凭证还原
    handleReduct() {
      this.reductCreVis = true;
    },
    // *************审核弹出框的事件************
    auditDialogCancel() {
      this.auditVisible = false;
    },
    auditDialogSure(val) {
      this.auditVisible = false;
      this.auditSuccessVisible = true;
      console.log(val);
    },
    // 弹出框成功时的事件
    sureSuccess() {
      this.auditSuccessVisible = false;
    },
    // 弹出框失败时的事件
    sureFail() {
      this.auditFailVisible = false;
    },
    // ******************END*******************

    // *************取消审核弹出框的事件************
    auditcancel_Cancel() {
      this.auditCancelVisible = false;
    },
    auditCancel_Sure(val) {
      this.auditCancelVisible = false;
      this.auditCancelFailVisible = true;
      console.log(val);
    },
    // 弹出框成功时的事件
    sure_auditSuccess() {
      this.auditCancelSuccessVisible = false;
    },
    sure_auditFail() {
      this.auditCancelFailVisible = false;
    },
    // ******************END*******************
    // *************抛转凭证弹出框的事件************
    credent_Cancel() {
      this.turnCredentVisible = false;
    },
    credent_Sure(val) {
      this.turnCredentVisible = false;
      this.credentSuccessVisible = true;
    },
    // 弹出框成功时的事件
    sure_credentSuccess() {
      this.credentSuccessVisible = false;
    },
    // 弹出框失败时的事件
    sure_credentFail() {
      this.credentFailVisible = false;
    },
    // ******************END*******************
    // *************抛转凭证还原弹出框的事件************
    reductCre_Cancel() {
      this.reductCreVis = false;
    },
    reductCre_Sure(val) {
      this.reductCreVis = false;
      this.reductCreFailVis = true;
    },
    // 弹出框成功时的事件
    sure_reductCreSuc() {
      this.reductCreSucVis = false;
    },
    // 弹出框失败时的事件
    sure_reductCreFail() {
      this.reductCreFailVis = false;
    },
    // ******************END*******************
    // *************会计分录弹出框的事件************
    accEntryCancel() {
      this.accEntryVis = false;
    },
    accEntrySure(val) {
      let that = this;
      this.accEntryVis = false;
      setTimeout(function () {
        that.accEntryAgain = true;
      }, 500);
    },
    // 弹出框成功时的事件
    sure_accEntrySuc() {
      this.accEntrySucVis = false;
    },
    // 弹出框失败时的事件
    sure_accEntryFail() {
      this.accEntryFailVis = false;
    },
    // 重新生成时的事件
    cancel_again() {
      this.accEntryAgain = false;
    },
    sure_again() {
      this.accEntryAgain = false;
    },
    // ******************END*******************
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
.workDetail {
  // 内容区域
  .content {
    width: 1440px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 0 30px;
    // 表单区域
    .forms {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f3f7;
      .left,
      .center,
      .right {
        width: 370px;
        > li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          // &:last-child {
          //   margin-bottom: 0;
          // }
          .checkBox {
            display: flex;
            flex-direction: row;
            align-items: center;
            .label {
              margin-right: 12px;
            }
          }
          > ul {
            width: 260px;
            > li {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
              &:last-child {
                margin-bottom: 0;
              }
              .shortInput {
                width: 160px !important;
              }
              .msgBox {
                width: 160px !important;
              }
            }
          }
          .shortBoxs {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 300px;
            .doubleBox {
              width: 140px;
            }
            .doubleTitle {
              width: 140px;
              height: 40px;
              line-height: 40px;
            }
          }
          .img {
            width: 86px;
            height: 86px;
            background: #f5f7fa;
            border: 1px solid #e4e7ed;
          }
        }
      }
    }
  }
}
</style>
