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
                  >款帐类型</label
                >
                <el-select
                  v-model="account"
                  placeholder="请选择款帐类型"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ account }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >账单号码</label
                >
                <!-- <el-select
                  v-model="cashOut"
                  placeholder="请选择账单号码"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in cashOuts"
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
                  {{ cashOut }}
                </div>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >内销/外销</label
                >
                <el-select
                  v-model="saleType"
                  placeholder="请选择内销/外销"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in saleTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >立账日期</label
                >
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择立账日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  ref="serialDate"
                >
                </el-date-picker>
                <!-- 点击直接付款时显示此内容 -->
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择立账日期"
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
                <label class="label">凭证编号</label>
                <el-input
                  v-model="credentNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入凭证编号' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >客户编号</label
                >
                <!-- <el-select
                  v-model="customerNum"
                  placeholder="请选择客户编号"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in customerNums"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ customerNum }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ customerNum }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ customerNum }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ customerNum }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >收款客户</label
                >
                <!-- <el-select
                  v-model="customerIn"
                  placeholder="请选择收款客户"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in customerIns"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ customerIn }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ customerIn }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ customerIn }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ customerIn }}
                  </div>
                </div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <ul>
                  <li>
                    <label class="label">状况</label>
                    <el-select
                      v-model="credentStatus"
                      placeholder="请选择状况"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                    >
                      <el-option
                        v-for="item in credentStatuses"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>

                    <div class="shortInput msgBox" v-else>
                      {{ credentStatus }}
                    </div>
                  </li>
                  <li>
                    <div class="checkBox">
                      <label class="label">签核</label>
                      <el-checkbox v-model="audit"></el-checkbox>
                    </div>
                    <div class="checkBox">
                      <label class="label">作废</label>
                      <el-checkbox v-model="auditNum"></el-checkbox>
                    </div>
                    <div class="checkBox">
                      <label class="label">审核</label>
                      <el-checkbox v-model="Posting"></el-checkbox>
                    </div>
                  </li>
                </ul>
                <div class="img"></div>
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
        <!-- 请款资料 -->
        <el-tab-pane label="请款资料" name="0">
          <!-- 表单区 -->
          <div class="coins">
            <ul>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >收款条件</label
                >
                <!-- <el-select
                  v-model="collection_type"
                  placeholder="请选择收款条件"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in collection_types"
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
                  {{ collection_type }}
                </div>
                <div class="elInput msgBox" v-else>{{ collection_type }}</div>
              </li>
              <li>
                <label class="label">应收款日</label>
                <el-date-picker
                  v-model="reciveDate"
                  type="date"
                  placeholder="选择应收款日"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  ref="reciveDate"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ reciveDate }}</div>
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
                  v-model="deadLineDate"
                  type="date"
                  placeholder="选择票到期日"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  ref="deadLineDate"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ deadLineDate }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >科目类型</label
                >
                <!-- <el-select
                  v-model="subjectType"
                  placeholder="请选择汇率"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in subjectTypes"
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
                  {{ subjectType }}
                </div>
                <div class="elInput msgBox" v-else>{{ subjectType }}</div>
              </li>
              <li>
                <label class="label">科目分类说明</label>
                <el-input
                  v-model="subjectMsg"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  :disabled="editType == 'search' ? false : true"
                  placeholder="请输入科目分类说明"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ subjectMsg }}</div>
              </li>
              <li>
                <label class="label">收款处理</label>
                <el-select
                  v-model="handleRecive"
                  placeholder="请选择汇率"
                  :disabled="editType == 'search' ? false : true"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in handleRecives"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ handleRecive }}</div>
              </li>
            </ul>
            <ul>
              <li>
                <div class="coinsLabel">原币金额</div>
              </li>
              <li>
                <label class="label">币种</label>
                <!-- <el-select
                  v-model="coinType"
                  placeholder="请选择币种"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in coinTypes"
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
                  {{ coinType }}
                </div>
                <div class="coinInput msgBox" v-else>{{ coinType }}</div>
              </li>
              <li>
                <label class="label">订金</label>
                <el-input
                  v-model="deposit_local"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ deposit_local }}</div>
              </li>
              <li>
                <label class="label">税前 +</label>
                <el-input
                  v-model="pre_tax_local"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ pre_tax_local }}</div>
              </li>
              <li>
                <label class="label">税额 +</label>
                <el-input
                  v-model="tax_local"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ tax_local }}</div>
              </li>
              <li>
                <label class="label">冲账 -</label>
                <el-input
                  v-model="strike_local"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ strike_local }}</div>
              </li>
              <li>
                <label class="label">应收 =</label>
                <el-input
                  v-model="should_local"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ should_local }}</div>
              </li>
              <li>
                <label class="label">已收 -</label>
                <el-input
                  v-model="recived_local"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ recived_local }}</div>
              </li>
              <li>
                <label class="label">未收 =</label>
                <el-input
                  v-model="not_recive_local"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>
                  {{ not_recive_local }}
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <div class="coinsLabel">本币金额</div>
              </li>
              <li>
                <label class="label">立账汇率</label>
                <!-- <el-select
                  v-model="taxRate_cur"
                  placeholder="请选择币种"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in taxRate_curs"
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
                  {{ taxRate_cur }}
                </div>
                <div class="coinInput msgBox" v-else>{{ taxRate_cur }}</div>
              </li>
              <li>
                <label class="label">订金</label>
                <el-input
                  v-model="deposit_cur"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ deposit_cur }}</div>
              </li>
              <li>
                <label class="label">税前 +</label>
                <el-input
                  v-model="pre_tax_cur"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ pre_tax_cur }}</div>
              </li>
              <li>
                <label class="label">税额 +</label>
                <el-input
                  v-model="tax_cur"
                  class="coinInput"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ tax_cur }}</div>
              </li>
              <li>
                <label class="label">冲账 -</label>
                <el-input
                  v-model="strike_cur"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ strike_cur }}</div>
              </li>
              <li>
                <label class="label">应收 =</label>
                <el-input
                  v-model="should_cur"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ should_cur }}</div>
              </li>
              <li>
                <label class="label">已收 -</label>
                <el-input
                  v-model="recived_cur"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ recived_cur }}</div>
              </li>
              <li>
                <label class="label">未收 =</label>
                <el-input
                  v-model="not_recive_cur"
                  class="coinInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="coinInput msgBox" v-else>{{ not_recive_cur }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 会计资料 -->
        <el-tab-pane label="会计资料" name="1">
          <div class="forms states">
            <ul class="center">
              <li>
                <label class="label">会计科目</label>
                <!-- <el-select
                  v-model="Accountant"
                  placeholder="请选择税额科目"
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in Accountants"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ Accountant }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ Accountant }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ Accountant }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ Accountant }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 其他 -->
        <el-tab-pane label="其他" name="2">
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
                  >人员</label
                >
                <!-- <el-select
                  v-model="member"
                  :placeholder="editType == 'search' ? '请选择人员' : ''"
                  :disabled="editType == 'search' ? false : true"
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
                  >部门</label
                >
                <!-- <el-select
                  v-model="depart"
                  :placeholder="editType == 'search' ? '请选择部门' : ''"
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
              <li>
                <label class="label">参考单号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入参考单号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ orderNum }}</div>
              </li>
              <li>
                <label class="label">待抵账款</label>
                <el-input
                  v-model="arriveAccount"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入待抵账款' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ arriveAccount }}</div>
              </li>
              <li>
                <label class="label">多角序号</label>
                <el-input
                  v-model="polygonalNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入多角序号' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ polygonalNum }}</div>
              </li>
              <li>
                <label class="label">集团代收单号</label>
                <el-input
                  v-model="groupNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入集团代收单号' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">资料来源工厂</label>
                <!-- <el-select
                  v-model="source"
                  :placeholder="
                    editType == 'search' ? '请选择资料来源工厂' : ''
                  "
                  class="elInput"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in sources"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ source }}</div> -->
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ source }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ source }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ source }}
                  </div>
                </div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <label class="label">Invoice No.</label>
                <el-input
                  v-model="groupNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入Invoice No' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">销售分类一</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">销售分类二</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">项目编号</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">WBS</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">汇差</label>
                <el-input
                  v-model="groupNum"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  :placeholder="editType == 'search' ? '请输入Invoice No' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label" style="margin-right: 12px">关系人</label>
                  <el-checkbox v-model="creDate"></el-checkbox>
                </div>
              </li>
              <li>
                <label class="label">打印次数</label>
                <el-input
                  v-model="groupNum"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  :placeholder="editType == 'search' ? '请输入Invoice No' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 发票资讯 -->
        <el-tab-pane label="发票资讯" name="3">
          <!-- 表单区 -->
          <div class="forms">
            <!-- left -->
            <ul class="left">
              <li>
                <label class="label">发票日期</label>
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择发票日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  ref="serialDate"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ serialDate }}</div>
              </li>
              <li>
                <label class="label">发票别</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入参考单号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ orderNum }}</div>
              </li>
              <li>
                <label class="label">发票号码</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入参考单号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ orderNum }}</div>
              </li>
              <li>
                <label class="label">发票客户</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ source }}
                </div>
                <div class="elInput msgBox" v-else>{{ arriveAccount }}</div>
              </li>
              <li>
                <label class="label">发票客户简称</label>
                <el-input
                  v-model="polygonalNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入多角序号' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ polygonalNum }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label">税种</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">税率</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入税率' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">种类</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入种类' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label" style="margin-right: 12px">含税</label>
                  <el-checkbox v-model="creDate"></el-checkbox>
                </div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >发票汇率</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">发票税前金额</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入发票税前金额' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">发票税额</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入发票税额' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
              <li>
                <label class="label">发票含税金额</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入发票含税金额' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ groupNum }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 自定字段 -->
        <el-tab-pane label="自定字段" name="4">
          <div class="forms states">
            <ul class="center">
              <li>
                <label class="label">备注信息</label>
                <el-input
                  v-model="noteMsg"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入备注信息' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ noteMsg }}</div>
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
      // 上面部分表单
      accounts: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      account: "", //款帐类型
      cashOuts: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      cashOut: "", //账单号码
      saleTypes: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      saleType: "", //内销/外销
      serialDate: "", //立账日期
      credentNum: "", //凭证编号
      customerNums: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      customerNum: "", //客户编号
      customerIns: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      customerIn: "", //收款客户
      credentStatuses: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      credentStatus: "", //状态
      audit: false, //签核
      auditNum: false, //审核
      Posting: false, //作废

      // 中间部分表单
      collection_types: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      collection_type: "", //收款条件
      reciveDate: "", //应收款日
      deadLineDate: "", //票到期日
      subjectTypes: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      subjectType: "", //科目类型
      subjectMsg: "", //科目分类说明
      handleRecives: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      handleRecive: "", //收款处理
      // 原币
      coinTypes: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      coinType: "", //币种
      deposit_local: "", //订金
      pre_tax_local: "", //税前
      tax_local: "", //税额
      strike_local: "", //冲账
      should_local: "", //应收
      recived_local: "", //已收
      not_recive_local: "", //未收
      // 本币
      taxRate_curs: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      taxRate_cur: "", //立账汇率
      deposit_cur: "", //订金
      pre_tax_cur: "", //税前
      tax_cur: "", //税额
      strike_cur: "", //冲账
      should_cur: "", //应收
      recived_cur: "", //已收
      not_recive_cur: "", //未收
      //会计资料
      Accountants: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      Accountant: "", //会计科目

      // 其他
      members: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      member: "", //人员
      departs: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      depart: "", //部门
      orderNum: "", //参考单号
      arriveAccount: "", //待抵账款
      polygonalNum: "", //多角序号
      groupNum: "", //集团代付单号
      sources: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      source: "", //资料来源工厂
      // 发票资讯
      // 自订字段
      noteMsg: "", //备注信息
      // 状态栏数据
      dataOwner: "", //资料所有者
      dataOwnerGroup: "", //资料所有群
      dataChanger: "", //资料更改者
      dataChangeTime: "", //资料更改日
      latestChange: "", //最近修改日
      dataValidCode: "", //有效码
      OANum: "", //OA表单号码
      // 右侧浮窗
      Btns_List: [
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
  created() {},
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
      flex-wrap: wrap;
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
          &:last-child {
            margin-bottom: 0;
          }
          .checkBox {
            height: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .label {
              margin-right: 12px;
            }
          }
          > ul {
            width: 260px;
            height: 88px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
      &::after {
        content: "";
        display: block;
        width: 370px;
        height: 0;
        visibility: hidden;
      }
    }
    .coins {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      ul {
        width: 370px;
        background: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        > li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          .coinInput {
            width: 270px;
          }
          .coinsLabel {
            height: 40px;
            line-height: 40px;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
