<template>
  <div class="workDetail">
    <!-- 顶部菜单 -->
    <div class="menuOuter">
      <div class="menuList">
        <ul v-if="displayType == 'show'">
          <!-- 均可 -->
          <li @click="$router.push('/')">
            <span class="iconfont backList">&#xe664;</span>
            <span>回到列表</span>
          </li>
          <li @click="entryClick()">
            <span class="iconfont">&#xe797;</span>
            <span>录入</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe791;</span>
            <span>更改</span>
          </li>
          <li v-if="menuClickable" @click="changeClick()">
            <span class="iconfont">&#xe791;</span>
            <span>更改</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7c3;</span>
            <span>删除</span>
          </li>
          <li v-if="menuClickable" @click="deleteClick()">
            <span class="iconfont">&#xe7c3;</span>
            <span>删除</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7bc;</span>
            <span>复制</span>
          </li>
          <li v-if="menuClickable" @click="copyClick()">
            <span class="iconfont">&#xe7bc;</span>
            <span>复制</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7b9;</span>
            <span>单身</span>
          </li>
          <li v-if="menuClickable" @click="editSingleAccount">
            <span class="iconfont">&#xe7b9;</span>
            <span>单身</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7d8;</span>
            <span>打印</span>
          </li>
          <li v-if="menuClickable">
            <span class="iconfont">&#xe7d8;</span>
            <span>打印</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable" class="unclick">
            <span class="iconfont">&#xe7de;</span>
            <span>汇出</span>
          </li>
          <li v-if="menuClickable">
            <span class="iconfont">&#xe7de;</span>
            <span>汇出</span>
          </li>
          <!-- 均可 -->
          <li @click="searchClick()">
            <span class="iconfont">&#xe8ef;</span>
            <span>查询</span>
          </li>
          <!-- 新增成功后；查询成功后 -->
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7ed;</span>
            <span>上笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <input type="text" class="numInput" disabled />
            <span>指定笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li v-if="!menuClickable || !changePage" class="unclick">
            <span class="iconfont">&#xe7eb;</span>
            <span>末一笔</span>
          </li>
          <!-- 可点击 -->
          <li v-if="menuClickable && changePage" @click="firstWork">
            <span class="iconfont">&#xe7ea;</span>
            <span>第一笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="prevWork">
            <span class="iconfont">&#xe7ed;</span>
            <span>上笔</span>
          </li>
          <li v-if="menuClickable && changePage">
            <input
              type="text"
              class="numInput"
              v-model="bindVal"
              @keyup.enter="searchAssign"
              @blur="blur"
              @focus="focus"
              onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
            />
            <span>指定笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="nextWork">
            <span class="iconfont">&#xe7ec;</span>
            <span>下笔</span>
          </li>
          <li v-if="menuClickable && changePage" @click="lastWork">
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
                <label class="label"> 账款编号 </label>
                <el-input
                  v-model="theadList.apa01"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  :disabled="editType == 'search' ? false : true"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apa01 }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >账款日期</label
                >
                <el-date-picker
                  v-model="theadList.apa02"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit' && editType !== 'directPay'"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <!-- 点击直接付款时显示此内容 -->
                <el-date-picker
                  v-model="theadList.apa02"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-else-if="displayType == 'edit' && editType == 'directPay'"
                  ref="apa02Date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ theadList.apa02 }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >请款厂商</label
                >
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('QKCS')"
                  >
                    {{ theadList.apa05 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.apa05 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ thead_BringOut_List.apa05_pmc03 }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >付款厂商</label
                >
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('FKCS')"
                  >
                    {{ theadList.apa06 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.apa06 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ theadList.apa07 }}
                  </div>
                </div>
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
                  >人员</label
                >
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('RY')"
                  >
                    {{ theadList.apa21 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.apa21 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ thead_BringOut_List.apa21_gen02 }}
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
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('BM')"
                  >
                    {{ theadList.apa22 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.apa22 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ thead_BringOut_List.apa22_gem02 }}
                  </div>
                </div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right">
              <li>
                <ul style="width: 245px">
                  <li>
                    <label class="label">凭证编号</label>
                    <el-input
                      v-model="theadList.apa44"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                      :disabled="editType == 'search' ? false : true"
                    ></el-input>
                    <div class="shortInput msgBox" v-else>
                      {{ theadList.apa44 }}
                    </div>
                  </li>
                  <li>
                    <label class="label">状态码</label>
                    <el-input
                      v-model="status"
                      class="shortInput"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="shortInput msgBox" v-else>{{ status }}</div>
                  </li>
                </ul>
                <div class="img" :class="theadList.apa41 == 'Y' ? 'imgY': ''">
                  <img v-if="theadList.apa41 == 'Y'" src="../../assets/img/audit.png">
                </div>
              </li>
              <li>
                <label class="label">集团代付单号</label>
                <el-input
                  v-model="groupNumber"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ taxRate }}</div>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label">签核</label>
                  <el-checkbox
                    v-model="audit"
                    id="audit"
                    true-label="Y"
                    false-label="N"
                    disabled
                  ></el-checkbox>
                </div>
                <div class="checkBox">
                  <label class="label">作废</label>
                  <el-checkbox
                    v-model="theadList.apa42"
                    true-label="Y"
                    false-label="N"
                    :disabled="editType == 'search' ? false : true"
                  ></el-checkbox>
                </div>
                <div class="checkBox">
                  <label class="label">审核</label>
                  <el-checkbox
                    v-model="theadList.apa41"
                    true-label="Y"
                    false-label="N"
                    :disabled="editType == 'search' ? false : true"
                  ></el-checkbox>
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
        <!-- 请款资料 -->
        <el-tab-pane label="请款资料" name="0">
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
                  >类型</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('QKZL_LX')"
                >
                  {{ theadList.apa36 }}
                </div>
                <div class="elInput msgBox" v-else>{{ theadList.apa36 }}</div>
              </li>
              <li>
                <label class="label">说明</label>
                <el-input
                  v-model="thead_BringOut_List.apa36_apr02"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ thead_BringOut_List.apa36_apr02 }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >币种</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('QKZL_BZ')"
                >
                  {{ theadList.apa13 }}
                </div>
                <div class="elInput msgBox" v-else>{{ theadList.apa13 }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >汇率</label
                >
                <el-input
                  v-model="theadList.apa14"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  placeholder="请输入汇率"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apa14 }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >税种</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('QKZL_SZ')"
                >
                  {{ theadList.apa15 }}
                </div>
                <div class="elInput msgBox" v-else>{{ theadList.apa15 }}</div>
              </li>
              <li>
                <label class="label">税率%</label>
                <el-input
                  v-model="theadList.apa16"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apa16 }}</div>
              </li>
              <li>
                <label class="label">发票号码</label>
                <el-input
                  v-model="invoiceNum"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ invoiceNum }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label">折让性质</label>
                <el-input
                  v-model="discount"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ discount }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >付款条件</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('QKZL_FKTJ')"
                >
                  {{ theadList.apa11 }}
                </div>
                <div class="elInput msgBox" v-else>{{ theadList.apa11 }}</div>
              </li>
              <li>
                <label class="label">类型</label>
                <el-input
                  v-model="paymentType"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >付款日</label
                >
                <el-date-picker
                  v-model="theadList.apa12"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ theadList.apa12 }}</div>
              </li>
              <li>
                <label class="label">允许票期</label>
                <el-input
                  v-model="allowTicket"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ allowTicket }}</div>
              </li>
              <li>
                <label class="label">票到期日</label>
                <el-date-picker
                  v-model="paymentDeadDate"
                  type="date"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  disabled
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ paymentDeadDate }}</div>
              </li>
              <li>
                <label class="label">付款处理</label>
                <el-input
                  v-model="theadList.apa55"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apa55 }}</div>
              </li>
              <li>
                <label class="label">支付类型</label>
                <el-select
                  v-model="paymentType"
                  placeholder=""
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
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
                <div></div>
                <div class="shortBoxs">
                  <div class="doubleTitle">原币</div>
                  <div class="doubleTitle">本币</div>
                </div>
              </li>
              <li>
                <label class="label">
                  <span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >税前 +
                </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="theadList.apa31f"
                      @input="comput_apa31f"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa31f }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="theadList.apa31"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa31 == 0 ? '' : theadList.apa31}}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label">
                  <span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >税额 +
                </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="theadList.apa32f"
                      @input="comput_apa32f"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa32f }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="theadList.apa32"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa32 == 0 ? '' : theadList.apa32 }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label"> 折让 - </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label"> 折税 - </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label"> 冲账 - </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label"> 应付 = </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="theadList.apa34f"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa34f }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="theadList.apa34"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa34 }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label"> 已付 + </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="theadList.apa35f"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa35f }}
                    </div>
                  </div>
                  <div>
                    <el-input
                      v-model="theadList.apa35"
                      class="doubleBox"
                      :disabled="editType == 'search' ? false : true"
                      v-if="displayType == 'edit'"
                    ></el-input>
                    <div class="doubleBox doubles" v-else>
                      {{ theadList.apa35 }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label"> 未付 = </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
                  </div>
                </div>
              </li>
              <li>
                <label class="label"> 汇差 </label>
                <div class="shortBoxs">
                  <div>
                    <el-input
                      v-model="discount"
                      class="doubleBox"
                      v-if="displayType == 'edit'"
                      disabled
                    ></el-input>
                    <div class="doubleBox doubles" v-else>{{ discount }}</div>
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
                <label class="label">留置</label>
                <!-- <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('ZWZL_LZ')"
                >
                  {{ cashIn_type }}
                </div> -->
                <el-input
                  v-model="cashIn_type"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入说明' : ''"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ cashIn_type }}</div>
              </li>
              <li>
                <label class="label">说明</label>
                <el-input
                  v-model="cashIn_msg"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入说明' : ''"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ cashIn_msg }}</div>
              </li>
              <li>
                <label class="label">留置金额</label>
                <el-input
                  v-model="taxRate"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  :placeholder="editType == 'search' ? '请输入留置金额' : ''"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ taxRate }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center">
              <li>
                <label class="label">差异</label>
                <el-select
                  v-model="paymentTerm"
                  :placeholder="editType == 'search' ? '请选择差异类型' : ''"
                  class="elInput"
                  v-if="displayType == 'edit'"
                  disabled
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
                <label class="label">差异说明</label>
                <el-input
                  v-model="paymentType"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入差异说明' : ''"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
              <li>
                <label class="label">本币差异</label>
                <el-input
                  v-model="paymentType"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入本币差异金额' : ''
                  "
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
              <li>
                <label class="label">项目编号</label>
                <!-- <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('ZWZL_XMBH')"
                >
                  {{ paymentType }}
                </div> -->
                <el-input
                  v-model="paymentType"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入说明' : ''"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
              </li>
              <li>
                <label class="label">备注</label>
                <el-input
                  v-model="theadList.apa25"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入备注' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apa25 }}</div>
              </li>
              <li>
                <label class="label">资料来源工厂</label>
                <!-- <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('ZWZL_ZLLYGC')"
                >
                  {{ paymentType }}
                </div> -->
                <el-input
                  v-model="paymentType"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入说明' : ''"
                  v-if="displayType == 'edit'"
                  disabled
                ></el-input>
                <div class="elInput msgBox" v-else>{{ paymentType }}</div>
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
                  class="elInput"
                  v-if="displayType == 'edit'"
                  ref="serialDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  disabled
                >
                </el-date-picker>
                <!-- 点击直接付款时显示此内容 -->
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择日期"
                  class="elInput"
                  v-else-if="editType == 'directPay'"
                  ref="serialDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  disabled
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ serialDate }}</div>
              </li>
              <li>
                <label class="label">多角序号</label>
                <el-input
                  v-model="theadList.apa99"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  :placeholder="editType == 'search' ? '请输入多角序号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ theadList.apa99 }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 会计资料 -->
        <el-tab-pane label="会计资料" name="2">
          <div class="forms states">
            <ul class="center">
              <li>
                <label class="label">税前科目</label>
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('KJZL_SQKM')"
                  >
                    {{ theadList.apa51 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.apa51 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ thead_BringOut_List.apa51_aag02 }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label">税额科目</label>
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('KJZL_SEKM')"
                  >
                    {{ theadList.apa52 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.apa52 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ thead_BringOut_List.apa52_aag02 }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label">合计金额科目</label>
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('KJZL_HJJEKM')"
                  >
                    {{ theadList.apa54 }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ theadList.apa54 }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ thead_BringOut_List.apa54_aag02 }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="tableCard">
      <Table
        :displayType="displayType"
        :editType="editType"
        :accountsEdit.sync="accountsEdit"
        :accountsList.sync="accountsList"
        :operation_code="operation_code"
        @accountSure="accountSure"
        @accountCancel="accountCancel"
      ></Table>
    </el-card>
    <!-- 数据选择弹出框 -->
    <SelectData
      :isLoading="selectLoading"
      :dialogTitle.sync="dataSelect.dialogTitle"
      :dialogVisible.sync="dataSelect.dialogVisible"
      :headList.sync="dataSelect.headList"
      :bodyData.sync="dataSelect.bodyData"
      :choosedData="dataSelect.choosedData"
      :editType.sync="editType"
      :searchApi="dataSelect.searchApi"
      :filter="dataSelect.filter"
      :keyMsg="dataSelect.keyMsg"
      @selectSure="selectSure"
      @selectCancel="selectCancel"
    ></SelectData>
    <!-- 右边浮窗 -->
    <FixedBtns
      v-if="displayType == 'show' && menuClickable"
      :Btns_List="Btns_List"
      @writeOff="writeOff"
      @directPay="directPay"
      @handleAccount="handleAccount"
      @entryPapers="entryPapers"
      @invoices="invoices"
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
      @cancelSuccess="cancelSuccess"
      @sureSuccess="sureSuccess"
      @cancelFail="cancelFail"
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
      @cancel_aduditSuccess="cancel_aduditSuccess"
      @sure_auditSuccess="sure_auditSuccess"
      @cancel_auditFail="cancel_auditFail"
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
      @cancel_accEntrySuc="cancel_accEntrySuc"
      @sure_accEntrySuc="sure_accEntrySuc"
      @cancel_accEntryFail="cancel_accEntryFail"
      @sure_accEntryFail="sure_accEntryFail"
      @cancel_again="cancel_again"
      @sure_again="sure_again"
    ></AccountEntry>
    <!-- 多发票 -->
    <InvoicesDialog
      :invoiceDialogVisible="invoiceDialogVisible"
      :invoiceData="invoiceData"
      :operation_type="operation_type"
      :operation_code="operation_code"
      @invoiceClose="invoiceClose"
    >
    </InvoicesDialog>
  </div>
</template>

<script>
// components
import FixedBtns from "@/components/fixedBtns";
import Audit from "@/components/audit";
import CancelAudit from "@/components/auditCancel";
import TurnCredent from "@/components/turnCredent";
import ReductCredent from "@/components/reductCredent";
import AccountEntry from "@/components/accountEntry";
import SelectData from "@/components/selectData_normal";
import Table from "./Table";
import InvoicesDialog from "@/components/invoicesDialog";
import { dateFmt } from "../../utils/utils";
// api
import { payDebitList, updatePayDebit } from "@/api/payment_debit";
import {
  paymentList,
  paymentSingle,
  addPayment,
  editPayment,
  delPayment,
} from "@/api/aapt120";
import {
  gensList,
  gemsList,
  pmcsList,
  aprsList,
  azisList,
  gecsList,
  pmasList,
  aagsList,
} from "@/api/basic";
import { invoiceList, updateInvoice } from "@/api/invoice";
import {
  createEntry,
  examine,
  examine_cancel,
  tossVoucher,
  tossVoucher_cancel,
} from "@/api/public";
import { payDueList, updatePayDue } from "@/api/payment_due";

export default {
  components: {
    FixedBtns,
    Audit,
    CancelAudit,
    TurnCredent,
    ReductCredent,
    AccountEntry,
    Table,
    SelectData,
    InvoicesDialog,
  },
  data() {
    return {
      operation_type: "aapt120",
      operation_code: "",
      curPane: 0, //上部当前tabs页
      curPane1: 0, //中部当前tabs页
      displayType: "show", // 展示类型：show:显示状态  edit:编辑状态
      editType: "", //编辑类型： entry:录入  change:更改  search:查询
      menuClickable: false, //顶部菜单栏显隐控制
      // 指定笔作业输入框相关数据
      changePage: '',
      assignWork: "", //指定笔作业(默认值为 1)
      bindVal: "",
      blurVal: "",
      focusVal: "",
      // 表头列表
      theadList: {},
      // 带出内容列表
      thead_BringOut_List: {},
      invoiceDialogVisible: false, //多发票弹窗组件可见状态
      invoiceLoading: true,
      invoiceData: [], //发票内容
      selectLoading: true, // 弹窗组件表格加载状态
      // 查询作业传参（作业id）
      searchParams: {
        keyword: "",
      },

      serialDate: "", //(暂定)
      status: "", //状态码g(暂定)
      audit: false, //签核(暂定)
      groupNumber: "", //集团代付单号(暂定)

      // 单身表格
      accountsList: [], //账款单身
      accountsEdit: false, //账款单身表格是否可编辑

      // 中间部分表单
      cashIn_type: "", //（暂定）
      cashIn_msg: "", //（暂定）
      taxRate: "", //（暂定）
      invoiceNum: "", //发票号码（暂定）
      discount: "", //折让性质（暂定）
      paymentTerm: "", //（暂定）
      paymentType: "", //付款类型（暂定）
      paymentDate: "", // （暂定）
      allowTicket: "", //允许票期（暂定）
      paymentDeadDate: "", //票到期日（暂定）
      paymentType: "", //（暂定）

      paymentTerms: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      paymentTypes: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
      // 状态栏数据
      dataOwner: "", //资料所有者（暂定）
      dataOwnerGroup: "", //资料所有群（暂定）
      dataChanger: "", //资料更改者（暂定）
      dataChangeTime: "", //资料更改日（暂定）
      latestChange: "", //最近修改日（暂定）
      dataValidCode: "", //有效码（暂定）
      OANum: "", //OA表单号码（暂定）
      // 右侧浮窗
      Btns_List: [
        { name: "冲账", method: "writeOff" },
        { name: "直接付款", method: "directPay" },
        { name: "会计分录生成", method: "handleAccount" },
        { name: "多发票", method: "invoices" },
        { name: "分录底稿", method: "entryPapers" },
        { name: "审核", method: "handAudit" },
        { name: "取消审核", method: "auditCancel" },
        // { name: "抛转凭证", method: "handleTurn" },
        // { name: "抛转凭证还原", method: "handleReduct" },
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

      //数据选择弹出框
      dataSelect: {
        cur_input: "", // 当前点击的输入框
        dialogTitle: "数据选择", //当前弹框的title
        dialogVisible: false, //控制显示隐藏弹框
        headList: [], //表头
        bodyData: [], //表格数据
        choosedData: [], //选中的数据
        searchApi: "", //搜索框的接口地址
        filter: [], //筛选条件
        keyMsg: [], //需要显示在顶部的数据
      },
      // 弹出框表格数据
      tableData: {
        // 以下为单身表格数据
        // 人员
        head_gens: [
          { name: "gen01", title: "员工编号" },
          { name: "gen02", title: "员工姓名" },
          { name: "gen03", title: "所属部门编号" },
        ],
        bodyData_gens: [],
        // 部门
        head_gems: [
          { name: "gem01", title: "部门编号" },
          { name: "gem02", title: "部门姓名" },
        ],
        bodyData_gems: [],
        // 厂商
        head_pmcs: [
          { name: "pmc01", title: "供应厂商编号" },
          { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商名称" },
          { name: "pmc04", title: "付款厂商编号" },
          { name: "pmc30", title: "厂商性质" },
          { name: "pmc47", title: "税别" },
        ],
        bodyData_pmcs: [],
        // 账款类型
        head_aprs: [
          { name: "apr01", title: "账款类型编号" },
          { name: "apr02", title: "账款类型名称" },
        ],
        bodyData_aprs: [],
        // 币种
        head_azis: [
          { name: "azi01", title: "币别编号" },
          { name: "azi02", title: "币别名称" },
        ],
        bodyData_azis: [],
        // 税种
        head_gecs: [
          { name: "gec01", title: "税别编号" },
          { name: "gec02", title: "税别名称" },
          { name: "gec011", title: "进/销项" },
          { name: "gec03", title: "会计科目编号" },
          { name: "gec04", title: "税率" },
          { name: "gec06", title: "1.應稅 2.零稅率 3.免稅" },
          { name: "gec07", title: "單價含稅否" },
          { name: "gec08", title: "媒體申報格式" },
        ],
        bodyData_gecs: [],
        // 付款方式
        head_pmas: [
          { name: "pma01", title: "付款方式编号" },
          { name: "pma02", title: "付款方式名称" },
          { name: "pma03", title: "应付起算日基准" },
          { name: "pma08", title: "起算日加几天" },
          { name: "pma09", title: "起算日加几月" },
          { name: "pma10", title: "票据起算日起加几天" },
          { name: "pma12", title: "票据到期日起算基准" },
          { name: "pma13", title: "票据起算日起加几月" },
        ],
        bodyData_pmas: [],
        // 科目
        head_aags: [
          { name: "aag01", title: "科目编号" },
          { name: "aag02", title: "科目名称" },
          { name: "aag03", title: "科目性质" },
          { name: "aag04", title: "资产损益别" },
          { name: "aag07", title: "统制明细别" },
          { name: "aag13", title: "额外名称" },
          { name: "aag24", title: "科目层级" },
        ],
        bodyData_aags: [],
      },
    };
  },
  watch:{
    'theadList.apa15':{
      handler(newval,oldval){
        this.comput_apa31f()
      },
      immediate:true,
      deep:true
    },
    'theadList.apa31f':{
      handler(newval,oldval){
        this.comput_apa32f()
      },
      immediate:true,
      deep:true
    }
  },
  created() {
    this.fillTheadList();
    this.fill_operation_code();
  },
  methods: {
    // 刷新后重新赋值operation_code
    fill_operation_code() {
      let operation_code = sessionStorage.getItem("operation_code")
        ? JSON.parse(sessionStorage.getItem("operation_code"))
        : "";
      this.operation_code = operation_code;
      console.log("初始code：", this.operation_code);
    },
    // ***指定笔搜索***
    searchAssign() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      let index = this.assignWork - 1; //这个值为数组的下标值
      let params = {
        id: allWorksList[index].id,
      };
      paymentSingle(params)
      .then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem(
            "nowTheadList",
            JSON.stringify(result.data[0])
          );
          sessionStorage.setItem(
            "operation_code",
            JSON.stringify(result.data[0].apa01)
          );
          this.changePage = true;
          this.fillTheadList();
          this.$message.success("查询成功！");
        } else {
          this.menuClickable = false;
          this.$message({
            message: "无此数据",
            type: "warning",
          });
        }
      })
      .then(() => {
        this.singleAccount();
      });
    },
    blur() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      if (this.bindVal > allWorksList.length) {
        this.bindVal = allWorksList.length;
      } else if (this.bindVal <= 0) {
        this.bindVal = 1;
      }
      this.assignWork = this.bindVal;
      this.blurVal = `${this.bindVal}/${allWorksList.length}`;
      this.bindVal = this.blurVal;
      this.searchAssign();
    },
    focus() {
      if (typeof this.blurVal == "string") {
        this.focusVal = this.blurVal.split("/")[0];
        this.bindVal = this.focusVal;
      } else {
        this.bindVal = this.assignWork;
      }
    },
    // 第一笔
    firstWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      this.assignWork = 1;
      this.bindVal = `${this.assignWork}/${allWorksList.length}`;
      this.blurVal = `${this.assignWork}/${allWorksList.length}`;
      this.searchAssign();
    },
    // 上一笔
    prevWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      let index = this.assignWork;
      if (index == 1) {
        this.$message.error("当前已是第一笔！");
        index = 1;
      } else if (index < 1) {
        index = 1;
      } else {
        index--;
      }
      this.assignWork = index;
      this.bindVal = `${this.assignWork}/${allWorksList.length}`;
      this.blurVal = `${this.assignWork}/${allWorksList.length}`;
      this.searchAssign();
    },
    // 下一笔
    nextWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      let index = this.assignWork;
      if (index == allWorksList.length) {
        this.$message.error("当前已是最后笔！");
      } else {
        index++;
        this.assignWork = index;
        this.bindVal = `${this.assignWork}/${allWorksList.length}`;
        this.blurVal = `${this.assignWork}/${allWorksList.length}`;
        this.searchAssign();
      }
    },
    // 末一笔
    lastWork() {
      let allWorksList = sessionStorage.getItem("allWorksList")
        ? JSON.parse(sessionStorage.getItem("allWorksList"))
        : {};
      this.assignWork = allWorksList.length;
      this.bindVal = `${this.assignWork}/${allWorksList.length}`;
      this.blurVal = `${this.assignWork}/${allWorksList.length}`;
      this.searchAssign();
    },
    // ********

    // 切换Tab
    handleClick() {},
    handleClick1() {},
    // *** 单身表格 ***
    // 单身按钮点击
    editSingleAccount() {
      this.menuClickable = false;
      if (this.accountsList.length == 0) {
        let data = [
          {
            apb01: this.operation_code, //账款编号（同作业编码）
            apb02: "", //项次
            apb08: "", //本币单价
            apb09: "", //数量
            apb10: "", //本币金额
            apb23: "", //原币单价
            apb24: "", //原币金额
            apb25: "", //科目
            apb26: "", //部门
            apb27: "", //品名
            apb28: "", //单位
          },
        ];
        this.accountsList = data;
      }
      this.accountsEdit = true;
    },
    // 借方单身确认修改
    accountSure(val, data) {
      let params = {
        operation_code: this.operation_code,
        operation_type: this.operation_type,
        records: data,
      };
      updatePayDue(params).then((res) => {
        if (res.status == 200) {
          this.$message.success("修改成功！");
        } else {
          this.$message.error(res.message);
        }
        this.accountsEdit = !val;
        this.singleAccount();
        this.menuClickable = true;
      });
    },
    // 借方单身取消修改
    accountCancel(val) {
      this.accountsEdit = val;
      this.menuClickable = true;
      this.singleAccount();
    },
    // 获取借方单身列表
    singleAccount() {
      let params = {
        operation_code: this.operation_code,
        operation_type: this.operation_type,
      };
      payDueList(params).then((res) => {
        if (res.status == 200) {
          this.accountsList = res.data;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // ***********
    // 录入
    entryClick() {
      this.displayType = "edit";
      this.editType = "entry";
      this.cleanAllList();
      this.theadList.apa02 = new Date()
      this.theadList.apa41 = "N"
      this.theadList.apa42 = "N"
      this.theadList.apa13 = "RMB"
      this.theadList.apa14 = "1.0000"
      this.theadList.apa11 = "TT"
      this.theadList.apa15 = "J06";
      this.theadList.apa16 ="0.0000"
      this.theadList.apa12 = new Date()
    },
    // 更改
    changeClick() {
      this.displayType = "edit";
      this.editType = "change";
    },
    // 删除
    deleteClick() {
      this.displayType = "show";
      this.editType = "delete";
      this.deletePaymentList();
    },
    // 复制
    copyClick() {
      this.displayType = "edit";
      this.editType = "copy";
    },
    // 查询
    searchClick() {
      this.displayType = "edit";
      this.editType = "search";
      // 清空数据
      this.cleanTheadData()
    },
    // 取消
    cancel() {
      this.displayType = "show";
      this.editType = ""
      this.fillTheadList();
    },
    // 确定
    sure() {
      if (this.editType == "entry") {
        this.addPaymentList();
      } else if (this.editType == "change") {
        this.editPaymentList();
      } else if (this.editType == "search") {
        this.getAllTheadList();
      } else if (this.editType == "copy") {
        this.addPaymentList();
      } else if (this.editType == "directPay") {
        this.$router.push({
          path: "directPay",
          query: {
            operation_type: this.operation_type,
            operation_code: this.operation_code,
            apa31f: this.theadList.apa31f, //税前（原币）
            apa31: this.theadList.apa31, //税前（本币）
          },
        });
      }
    },

    // 右边悬浮功能区域点击事件
    // 冲账
    writeOff() {
      this.$router.push({
        path: "writeOff",
        query: {
          operation_type: this.operation_type,
          operation_code: this.operation_code,
        },
      });
    },
    // 直接付款
    directPay() {
      this.displayType = "edit";
      this.editType = "directPay";
      this.$nextTick(function () {
        this.$refs.apa02Date.focus();
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
        query: {
          operation_type: this.operation_type,
          operation_code: this.operation_code,
        },
      });
    },
    // 多发票
    invoices() {
      this.invoiceDialogVisible = true;
      this.getInvoiceList();
    },
    invoiceClose(data) {
      this.invoiceDialogVisible = data;
      this.invoiceLoading = true;
    },
    handAudit() {
      this.auditVisible = true;
    },
    auditCancel() {
      this.auditCancelVisible = true;
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
      // 发起审核
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      examine(params).then((result) => {
        if (result.status == 200) {
          this.auditVisible = false;
          // this.auditSuccessVisible = true;
          // 调用接口回显审核码及状态
          let params = {
            id: this.theadList.id,
          };
          paymentSingle(params)
          .then((result) => {
            if (result.status == 200) {
              sessionStorage.setItem(
                "nowTheadList",
                JSON.stringify(result.data[0])
              );
              sessionStorage.setItem(
                "operation_code",
                JSON.stringify(result.data[0].apa01)
              );
              this.changePage = true;
              this.fillTheadList();
              this.$message.success("提交审核成功！");
            } else {
              this.menuClickable = false;
              this.$message.error("获取审核数据失败：" + result.error.message);
            }
          })
          .then(() => {
            this.singleAccount();
          });

        } else {
          this.auditVisible = false;
          // this.auditCancelFailVisible = true;
          this.$message.error("提交审核失败：" + result.error.message);
        }
      });
    },
    // 关闭成功弹框的事件
    cancelSuccess() {
      this.auditSuccessVisible = false;
    },
    sureSuccess() {
      this.auditSuccessVisible = false;
    },
    // 关闭失败弹框的事件
    cancelFail() {
      this.auditFailVisible = false;
    },
    sureFail() {
      this.auditFailVisible = false;
    },
    // ******************END*******************

    // *************取消审核弹出框的事件************
    auditcancel_Cancel() {
      this.auditCancelVisible = false;
    },
    auditCancel_Sure(val) {
      // 取消审核
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      examine_cancel(params).then((result) => {
        if (result.status == 200) {
          this.auditCancelVisible = false;
          // this.auditCancelSuccessVisible = true;
          this.$message.success("取消审核成功！");
        } else {
          this.auditCancelVisible = false;
          // this.auditCancelFailVisible = true;
          this.$message.error("取消审核失败：" + result.error.message);
        }
      });
    },
    // 关闭成功弹框的事件
    cancel_aduditSuccess() {
      this.auditCancelSuccessVisible = false;
    },
    sure_auditSuccess() {
      this.auditCancelSuccessVisible = false;
    },
    // 关闭失败弹框的事件
    cancel_auditFail() {
      this.auditCancelFailVisible = false;
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
      // 抛转凭证
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      tossVoucher(params).then((result) => {
        if (result.status == 200) {
          this.turnCredentVisible = false;
          this.credentSuccessVisible = true;
        } else {
          this.$message.error("抛转凭证失败：" + result.error.message);
        }
      });
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
      // 抛转还原
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      tossVoucher_cancel(params).then((result) => {
        if (result.status == 200) {
          this.reductCreVis = false;
          this.reductCreFailVis = true;
        } else {
          this.$message.error("抛转凭证还原失败：" + result.error.message);
        }
      });
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
      // 生成分录
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      createEntry(params).then((result) => {
        if (result.status == 200) {
          let that = this;
          this.accEntryVis = false;
          // this.accEntrySucVis = true;
          this.$message.success("生成分录成功！");
        } else {
          this.accEntryVis = false;
          // this.accEntryFailVis = true;
          this.$message.error("生成分录失败：" + result.error.message);
        }
      });
      // that.accEntryAgain = true;  //创建结果重复时激活
    },
    // 弹出成功框时的事件
    cancel_accEntrySuc() {
      this.accEntrySucVis = false;
    },
    sure_accEntrySuc() {
      this.accEntrySucVis = false;
    },
    // 弹出失败框时的事件
    cancel_accEntryFail() {
      this.accEntryFailVis = false;
    },
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

    // *******数据选择弹出框相关操作********
    // 打开弹框
    selectDialog(type) {
      this.dataSelect.dialogVisible = true;
      this.dataSelect.cur_input = type;
      this.dataSelect.choosedData = [];
      switch (type) {
        case "RY":
          // this.getGensList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_gens;
          let filter_RY = [
            { label: "", model_key_search: "keyword" },
          ]
          this.dataSelect.filter = filter_RY;
          this.dataSelect.searchApi = "meta/gens"
          this.dataSelect.dialogTitle = "人员列表";
          break;
        case "BM":
          // this.getGemsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_gems;
          let filter_BM = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_BM;
          this.dataSelect.searchApi = "meta/gems"
          this.dataSelect.dialogTitle = "部门列表";
          break;
        case "QKCS":
          // this.getPmcsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_pmcs;
          let filter_QKCS = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_QKCS;
          this.dataSelect.searchApi = "meta/pmcs"
          this.dataSelect.dialogTitle = "请款厂商列表";
          break;
        case "FKCS":
          // this.getPmcsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_pmcs;
          let filter_FKCS = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_FKCS;
          this.dataSelect.searchApi = "meta/pmcs"
          this.dataSelect.dialogTitle = "付款厂商列表";
          break;
        case "QKZL_LX":
          // this.getAprsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_aprs;
          let filter_LX = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_LX;
          this.dataSelect.searchApi = "meta/aprs"
          this.dataSelect.dialogTitle = "账款类型列表";
          break;
        case "QKZL_BZ":
          // this.getAazisList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_azis;
          let filter_azis = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_azis;
          this.dataSelect.searchApi = "meta/azis"
          this.dataSelect.dialogTitle = "币种类型列表";
          break;
        case "QKZL_SZ":
          // this.getGecsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_gecs;
          let filter_SZ = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_SZ;
          this.dataSelect.searchApi = "meta/gecs"
          this.dataSelect.dialogTitle = "税种类型列表";
          break;
        case "QKZL_FKTJ":
          // this.getPmasList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_pmas;
          let filter_FKTJ = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_FKTJ;
          this.dataSelect.searchApi = "meta/pmas"
          this.dataSelect.dialogTitle = "付款条件列表";
          break;
        case "KJZL_SQKM":
          // this.getAagsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_aags;
          let filter_SQKM = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_SQKM;
          this.dataSelect.searchApi = "meta/aags"
          this.dataSelect.dialogTitle = "科目列表";
          break;
        case "KJZL_SEKM":
          // this.getAagsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_aags;
          let filter_SEKM = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_SEKM;
          this.dataSelect.searchApi = "meta/aags"
          this.dataSelect.dialogTitle = "科目列表";
          break;
        case "KJZL_HJJEKM":
          // this.getAagsList();
          this.selectLoading = false;
          this.dataSelect.headList = this.tableData.head_aags;
          let filter_HJJEKM = [
            { label: "", model_key_search: "keyword" }
          ]
          this.dataSelect.filter = filter_HJJEKM;
          this.dataSelect.searchApi = "meta/aags"
          this.dataSelect.dialogTitle = "科目列表";
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
      this.selectLoading = true;
    },
    selectSure(val) {
      this.dataSelect.dialogVisible = false;
      this.dataSelect.bodyData = [];
      this.dataSelect.choosedData = val;
      this.selectLoading = true;
      if (val.length > 0) {
        switch (this.dataSelect.cur_input) {
          case "RY":
            if (val.length == 1) {
              this.theadList.apa21 = val[0].gen01;
              this.thead_BringOut_List.apa21_gen02 = val[0].gen02;
            } else {
            }
            break;
          case "BM":
            if (val.length == 1) {
              this.theadList.apa22 = val[0].gem01;
              this.thead_BringOut_List.apa22_gem02 = val[0].gem02;
            } else {
            }
            break;
          case "QKCS":
            if (val.length == 1) {
              // 请款厂商
              this.theadList.apa05 = val[0].pmc01;
              this.thead_BringOut_List.apa05_pmc03 = val[0].pmc03;
              // 付款厂商
              this.theadList.apa06 = val[0].pmc01;
              this.theadList.apa07 = val[0].pmc03;
            } else {
            }
            break;
          case "FKCS":
            if (val.length == 1) {
              this.theadList.apa06 = val[0].pmc01;
              this.theadList.apa07 = val[0].pmc03;
            } else {
            }
            break;
          case "QKZL_LX":
            if (val.length == 1) {
              this.theadList.apa36 = val[0].apr01;
              this.thead_BringOut_List.apa36_apr02 = val[0].apr02;
            } else {
            }
            break;
          case "QKZL_BZ":
            if (val.length == 1) {
              this.theadList.apa13 = val[0].azi01;
            } else {
            }
            break;
          case "QKZL_SZ":
            if (val.length == 1) {
              this.theadList.apa15 = val[0].gec01;
              this.theadList.apa16 = val[0].gec04; //自动带出税率
            } else {
            }
            break;
          case "QKZL_FKTJ":
            if (val.length == 1) {
              this.theadList.apa11 = val[0].pma01;
            } else {
            }
            break;
          case "KJZL_SQKM":
            if (val.length == 1) {
              this.theadList.apa51 = val[0].aag01;
              this.thead_BringOut_List.apa51_aag02 = val[0].aag02;
            } else {
            }
            break;
          case "KJZL_SEKM":
            if (val.length == 1) {
              this.theadList.apa52 = val[0].aag01;
              this.thead_BringOut_List.apa52_aag02 = val[0].aag02;
            } else {
            }
            break;
          case "KJZL_HJJEKM":
            if (val.length == 1) {
              this.theadList.apa54 = val[0].aag01;
              this.thead_BringOut_List.apa54_aag02 = val[0].aag02;
            } else {
            }
            break;

          default:
            return;
            break;
        }
      }
    },
    // ******************END*******************

    // *************作业内容触发事件************
    // 赋值表单
    fillTheadList() {
      // 新增成功、编辑成功后回显表单数据
      let nowTheadList = sessionStorage.getItem("nowTheadList")
        ? JSON.parse(sessionStorage.getItem("nowTheadList"))
        : {};
      if (JSON.stringify(nowTheadList) !== "{}") {
        this.menuClickable = true;
        this.operation_code = nowTheadList.apa01;
        this.singleAccount();
        console.log("当前有待显示数据：", this.operation_code);
        // 表头列表
        this.theadList = {
          id: nowTheadList.id,
          // 基本资料
          apa01: nowTheadList.apa01,
          apa02: nowTheadList.apa02,
          apa05: nowTheadList.apa05,
          apa06: nowTheadList.apa06,
          apa07: nowTheadList.apa07,
          apa21: nowTheadList.apa21,
          apa22: nowTheadList.apa22,
          apa44: nowTheadList.apa44,
          apa42: nowTheadList.apa42,
          apa41: nowTheadList.apa41,
          // 请款资料
          apa36: nowTheadList.apa36,
          apa13: nowTheadList.apa13,
          apa14: nowTheadList.apa14,
          apa15: nowTheadList.apa15,
          apa16: nowTheadList.apa16,
          apa11: nowTheadList.apa11,
          apa12: nowTheadList.apa12,
          apa55: nowTheadList.apa55,
          apa31f: nowTheadList.apa31f,
          apa31: nowTheadList.apa31,
          apa32f: nowTheadList.apa32f,
          apa32: nowTheadList.apa32,
          apa34f: nowTheadList.apa34f,
          apa34: nowTheadList.apa34,
          apa35f: nowTheadList.apa35f,
          apa35: nowTheadList.apa35,
          // 账务资料
          apa25: nowTheadList.apa25,
          apa99: nowTheadList.apa99,
          // 会计资料
          apa51: nowTheadList.apa51,
          apa52: nowTheadList.apa52,
          apa54: nowTheadList.apa54,
        };
        // 带出内容列表
        this.thead_BringOut_List = {
          apa05_pmc03: nowTheadList.apa05_pmc03,
          apa21_gen02: nowTheadList.apa21_gen02,
          apa22_gem02: nowTheadList.apa22_gem02,
          apa36_apr02: nowTheadList.apa36_apr02,
          apa51_aag02: nowTheadList.apa51_aag02,
          apa52_aag02: nowTheadList.apa52_aag02,
          apa54_aag02: nowTheadList.apa54_aag02,
        };
      } else {
        console.log("赋空白初始值");
        this.cleanAllList();
      }
    },
    //清空现存数据
    cleanAllList() {
      this.menuClickable = false;
      this.changePage = false;
      sessionStorage.removeItem("nowTheadList");
      sessionStorage.removeItem("allWorksList");
      sessionStorage.removeItem("operation_code");
      this.operation_code = ''
      this.cleanTheadData()
    },

    cleanTheadData() {
      // 表头列表
      this.theadList = {
        id: "",
        // 基本资料
        apa01: "", //账款编号
        apa02: "", //账款日期
        apa05: "", //请款厂商（编号）
        apa06: "", //付款厂商（编号）
        apa07: "", //付款厂商（带出文字）
        apa21: "", //人员（编号）
        apa22: "", //部门（编号）
        apa44: "", //凭证编号
        apa42: "", //作废
        apa41: "", //审核
        // 请款资料
        apa36: "", //类型
        apa13: "", //币种
        apa14: "", //汇率
        apa15: "", //税种
        apa16: "", //税率
        apa11: "", //付款条件
        apa12: "", //付款日
        apa55: "", //付款处理
        apa31f: "", //税前（原币）
        apa31: "", //税前（本币）
        apa32f: "", //税额（原币）
        apa32: "", //税额（本币）
        apa34f: "", //原币合计（原币）
        apa34: "", //原币合计（原币）
        apa35f: "", //原币已付（原币）
        apa35: "", //原币已付（原币）
        // 账务资料
        apa25: "", //备注
        apa99: "", //多角序号
        // 会计资料
        apa51: "", //税前科目（编号）
        apa52: "", //税额科目（编号）
        apa54: "", //合计金额科目（编号）
      },
      // 带出内容列表
      this.thead_BringOut_List = {
        apa05_pmc03: "", //请款厂商（带出文字）
        apa21_gen02: "", //人员（带出文字）
        apa22_gem02: "", //部门（带出文字）
        apa36_apr02: "", //类型名称（带出文字）
        apa51_aag02: "", //税前科目（带出文字）
        apa52_aag02: "", //税额科目（带出文字）
        apa54_aag02: "", //合计金额科目（带出文字）
      }
    },

    // *****获取下拉框列表事件*****
    // 获取员工列表
    getGensList() {
      gensList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_gens = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_gens;
          this.selectLoading = false;
        } else {
          this.$message.error("获取员工列表失败：" + result.error.message);
        }
      });
    },
    // 获取部门列表
    getGemsList() {
      gemsList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_gems = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_gems;
          this.selectLoading = false;
        } else {
          this.$message.error("获取部门列表失败：" + result.error.message);
        }
      });
    },
    // 获取厂商列表
    getPmcsList() {
      pmcsList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_pmcs = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_pmcs;
          this.selectLoading = false;
        } else {
          this.$message.error("获取厂商列表失败：" + result.error.message);
        }
      });
    },
    // 获取账款类型列表
    getAprsList() {
      aprsList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_aprs = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_aprs;
          this.selectLoading = false;
        } else {
          this.$message.error("获取账款类型列表失败：" + result.error.message);
        }
      });
    },
    // 获取币种列表
    getAazisList() {
      azisList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_azis = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_azis;
          this.selectLoading = false;
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      });
    },
    // 获取税种列表
    getGecsList() {
      gecsList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_gecs = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_gecs;
          this.selectLoading = false;
        } else {
          this.$message.error("获取税种列表失败：" + result.error.message);
        }
      });
    },
    // 获取付款条件列表
    getPmasList() {
      pmasList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_pmas = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_pmas;
          this.selectLoading = false;
        } else {
          this.$message.error("获取付款条件列表失败：" + result.error.message);
        }
      });
    },
    // 获取科目列表
    getAagsList() {
      aagsList(this.searchParams).then((result) => {
        if (result.status == 200) {
          this.tableData.bodyData_aags = result.data;
          this.dataSelect.bodyData = this.tableData.bodyData_aags;
          this.selectLoading = false;
        } else {
          this.$message.error("获取科目列表失败：" + result.error.message);
        }
      });
    },
    // *****基础事件*****
    // 新增、复制作业
    addPaymentList() {
      addPayment(this.theadList).then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem("nowTheadList", JSON.stringify(result.data));
          sessionStorage.setItem(
            "operation_code",
            JSON.stringify(result.data.apa01)
          );
          this.menuClickable = true;
          this.changePage = false;
          this.displayType = "show";
          this.fillTheadList();
          if (this.editType == "entry") {
            this.$message.success("新增杂项应付款请款作业成功！");
          } else if (this.editType == "copy") {
            this.$message.success("复制杂项应付款请款作业成功！");
          }
        } else {
          if (this.editType == "entry") {
            this.$message.error(
              "新增杂项应付款请款作业失败：" + result.error.message
            );
          } else if (this.editType == "copy") {
            this.$message.error(
              "复制杂项应付款请款作业失败：" + result.error.message
            );
          }
        }
      });
    },
    // 编辑作业
    editPaymentList() {
      editPayment(this.theadList).then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem("nowTheadList", JSON.stringify(result.data));
          sessionStorage.setItem(
            "operation_code",
            JSON.stringify(result.data.apa01)
          );
          this.menuClickable = true;
          this.changePage = false;
          this.displayType = "show";
          this.fillTheadList();
          this.$message.success("编辑杂项应付款请款作业成功！");
        } else {
          this.$message.error("编辑杂项应付款请款作业失败：" + result.error.message);
        }
      });
    },
    // 获取所有笔数作业id及账款编号列表
    getAllTheadList() {
      const workParams = {};
      Object.keys(this.theadList).forEach((key) => {
        workParams["filter[" + key + "]"] = this.theadList[key];
      });
      paymentList(workParams).then((result) => {
        if (result.status == 200) {
          sessionStorage.setItem("allWorksList", JSON.stringify(result.data));
          this.menuClickable = true;
          this.displayType = "show";
          // 查询完数据后直接进行第一个数据的展示
          if (result.data.length == 0) {
            this.menuClickable = false;
            this.$message.warning("暂无符合条件的作业");
          } else {
            this.bindVal = 1;
            this.blur();
          }
        } else {
          this.$message.error(
            "获取杂项应付款请款作业列表失败：" + result.error.message
          );
        }
      });
    },
    deletePaymentList() {
      this.$confirm("此操作将永久删除本作业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPayment(this.theadList.id).then((result) => {
            if (result.status == 200) {
              this.cleanAllList();
              this.$message.success("删除成功！");
            } else {
              this.$message.error("删除失败：" + result.error.message);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 获取发票列表
    getInvoiceList() {
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      invoiceList(params).then((result) => {
        if (result.status == 200) {
          this.invoiceData = result.data;
          this.invoiceLoading = false;
        } else {
          this.$message.error("删除失败：" + result.error.message);
        }
      });
    },
    // 更新发票
    updateInvoiceList() {
      const params = {
        operation_type: this.operation_type,
        operation_code: this.operation_code,
      };
      updateInvoice(params).then((result) => {
        if (result.status == 200) {
          this.$message.success("更新成功！");
        } else {
          this.$message.error("更新失败：" + result.error.message);
        }
      });
    },
    // ******************END*******************

    // 工具方法
    // 根据汇率计算输入值
    // 税前（原币）带f:原币  不带f:本币
    comput_apa31f(){
      this.theadList.apa31 = 1 * this.theadList.apa31f
    },
    // 税额（原币）
    comput_apa32f(){
      this.theadList.apa32f = (this.theadList.apa31f * this.theadList.apa16 ) / 100
      this.theadList.apa32 = this.theadList.apa32f * 1
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/style/public.less";
.workDetail {
  // 内容区域
  .content {
    width: 1202px;
    margin: 0 auto;
    margin-top: 20px;
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
        width: 342px;
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
                width: 152px !important;
              }
              .msgBox {
                width: 152px !important;
              }
            }
          }
          .shortBoxs {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 280px;
            .doubleBox {
              width: 130px;
            }
            .doubleTitle {
              width: 130px;
              height: 40px;
              line-height: 40px;
            }
          }
          .img {
            width: 86px;
            height: 86px;
            background: #f5f7fa;
            border: 1px solid #e4e7ed;
            &.imgY{
              background:#fff
            }
            img{
              width: 86px;
              height: 86px;
            }
          }
        }
      }
    }
  }
}
</style>
