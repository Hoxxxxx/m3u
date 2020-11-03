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
            <ul class="left w300">
              <li>
                <label class="label">序号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入序号' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ account }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >类型</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择类型"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label">财产编号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入财产编号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >附号</label
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
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >取得方式</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择取得方式"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >资产类型</label
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
                <label class="label">类型名称</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入类型名称' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label">资产次类型</label>
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
                <label class="label">次类型名称</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入类型名称' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >资产性质</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择资产性质"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center w300">
              <li>
                <label class="label">供应商编号</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <!-- 供应商编号 -->
                <label class="label"></label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入供应商编号' : ''"
                  disabled
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label">制造商编号</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">原产地</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">中文名称-1</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入中文名称-1' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <!-- 中文名称-1 -->
                <label class="label"></label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入中文名称-1' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">英文名称-1</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入英文名称-1' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <!-- 英文名称-1 -->
                <label class="label"></label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入英文名称-1' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">规格型号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入规格型号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >计量单位</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >数量</label
                >
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入数量' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label">在外数量</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入数量' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label">本币单价</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入数量' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >本币成本</label
                >
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入数量' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >原币币种</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >原币成本</label
                >
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入数量' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >资产状态</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择资产状态"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label">税签资产状态</label>
                <el-select
                  v-model="cashOut"
                  :placeholder="
                    editType == 'search' ? '请选择税签资产状态' : ''
                  "
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                >
                  <el-option
                    v-for="item in cashOuts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <div class="checkBox">
                  <label class="label" style="margin-right: 12px">审核否</label>
                  <el-checkbox v-model="creDate"></el-checkbox>
                </div>
              </li>
              <li>
                <label class="label">保管人</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"></label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入保管人' : ''"
                  disabled
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label">保管部门</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label">存放位置</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label">存放营运中心</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >项目编号</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >WBS编号</label
                >
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
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
                <label class="label">资料所有部门</label>
                <div
                  class="msgBox"
                  :class="displayType == 'edit' ? 'editNot' : ''"
                >
                  {{ dataValidCode }}
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
        <!-- 一般资料 -->
        <el-tab-pane label="一般资料" name="0">
          <div class="forms">
            <!-- left -->
            <ul class="left w300">
              <li>
                <label class="label">分摊方式</label>
                <el-select
                  v-model="cashOut"
                  placeholder="请选择分摊方式"
                  :disabled="editType == 'search' ? false : true"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ account }}</div>
              </li>
              <li>
                <label class="label">部门/类型</label>
                <div
                  class="elInput msgBox edit"
                  v-if="displayType == 'edit'"
                  @click="selectDialog('serialNumber')"
                >
                  {{ groupNum }}
                </div>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label">取得日期</label>
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择取得日期"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                  ref="serialDate"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label">入账日期</label>
                <el-date-picker
                  v-model="serialDate"
                  type="date"
                  placeholder="选择入账日期"
                  class="elInput"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                  ref="serialDate"
                >
                </el-date-picker>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label">折旧年月</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入折旧年月' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center w300">
              <li>
                <div class="checkBox">
                  <label class="label" style="margin-right: 12px"
                    >折毕再提否</label
                  >
                  <el-checkbox v-model="creDate"></el-checkbox>
                </div>
              </li>
              <li>
                <label class="label">折毕再提预留残值</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入折毕再提预留残值' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <!-- 供应商编号 -->
                <label class="label">折毕再提年限</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入折毕再提年限' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label">折旧方法</label>
                <el-select
                  v-model="cashOut"
                  placeholder="请选择分摊方式"
                  :disabled="editType == 'search' ? false : true"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">耐用年限（月）</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入折毕再提年限' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">未使用年限（月）</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入折毕再提年限' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <label class="label">预留残值</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入预留残值' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">累计折旧</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入累计折旧' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">本期累折（财签）</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入本期累折' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">未折减额</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入未折减额' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">最近折旧年度</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入最近折旧年度' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">最近折旧期别</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入最近折旧期别' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <label class="label">调整成本</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入调整成本' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">销账数量</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入销账数量' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">销账成本</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入销账成本' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">销账累折</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入销账累折' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">本期销账累折（财签）</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入本期销账累折' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">年折旧额</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入年折旧额' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 税签资料 -->
        <el-tab-pane label="税签资料" name="1">
          <div class="forms">
            <!-- left -->
            <ul class="left w300">
              <li>
                <label class="label">税签成本</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入税签成本' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ account }}</div>
              </li>
              <li>
                <label class="label">税签年折旧额</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签年折旧额      ' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label">税签减值准备</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签减值准备' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label">税签销账减值</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签销账减值' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label">税签预计总工作量</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入折旧年月' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center w300">
              <li>
                <div class="checkBox">
                  <label class="label" style="margin-right: 12px"
                    >税签折毕再提否</label
                  >
                  <el-checkbox v-model="creDate"></el-checkbox>
                </div>
              </li>
              <li>
                <label class="label">税签再提预留残值</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签再提预留残值' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签折毕再提年限</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签折毕再提年限' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>
                  {{ groupNum }}
                </div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >税签折旧方法</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择税签折旧方法"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签耐用年限</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签耐用年限' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签未使用年限（月）</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签未使用年限' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <label class="label">税签预留残值</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签预留残值' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签累计折旧</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签累计折旧' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">本期累折（税签）</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入本期累折' : ''"
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签未折减额</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签未折减额' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">最近税签折旧年度</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入最近税签折旧年度' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">最近折旧期别</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入最近折旧期别' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <label class="label">税签调整成本</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签调整成本' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签销账成本</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签销账成本' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签销账累折</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签销账累折' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">本期销账累折（税签）</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入本期销账累折' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">税签已使用工作量</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签已使用工作量' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 其他资料 -->
        <el-tab-pane label="其他资料" name="2">
          <div class="forms">
            <!-- left -->
            <ul class="left w300">
              <li>
                <div class="checkBox">
                  <label class="label" style="margin-right: 12px"
                    >是否直接资本化</label
                  >
                  <el-checkbox v-model="creDate"></el-checkbox>
                </div>
              </li>
              <li>
                <div class="checkBox">
                  <label class="label" style="margin-right: 12px"
                    >资产停用否</label
                  >
                  <el-checkbox v-model="creDate"></el-checkbox>
                </div>
              </li>
              <li>
                <label class="label">已计提减值准备</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入已计提减值准备' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ account }}</div>
              </li>
              <li>
                <label class="label">销账减值准备</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入销账减值准备' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label">预计总工作量</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入预计总工作量' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
              <li>
                <label class="label">已使用工作量</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签销账减值' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center w300">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >保税否</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择保税否"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >保险否</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择保险否"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >免税否</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择免税否"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >抵押否</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择抵押否"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <label class="label"
                  ><span
                    class="redPot"
                    v-if="displayType == 'edit' && editType != 'search'"
                    >*</span
                  >投资抵减否</label
                >
                <el-select
                  v-model="cashOut"
                  placeholder="请选择投资抵减否"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">本币投资抵减比率</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入本币投资抵减比率' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>

                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">外币投资抵减比率</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入外币投资抵减比率' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">投资抵减补税年限</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入投资抵减补税年限' : ''
                  "
                  :disabled="editType == 'search' ? false : true"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">用途</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="
                    editType == 'search' ? '请输入税签未折减额' : ''
                  "
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <ul class="right w300"></ul>
          </div>
        </el-tab-pane>
        <!-- 发票资讯 -->
        <el-tab-pane label="科目资料" name="3">
          <div class="forms">
            <ul class="left w300">
              <li>
                <label class="label">资产科目</label>
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ serialNumber }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ serialNumber }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ serialNumber }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label">账款编号</label>
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ serialNumber }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ serialNumber }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ serialNumber }}
                  </div>
                </div>
              </li>
              <li>
                <label class="label">收科单号</label>
                <div class="doubleOuter">
                  <div
                    class="elInput msgBox edit"
                    v-if="displayType == 'edit'"
                    @click="selectDialog('serialNumber')"
                  >
                    {{ serialNumber }}
                  </div>
                  <div
                    class="elInput msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                  >
                    {{ serialNumber }}
                  </div>
                  <div
                    class="msgBox short_msgBox"
                    v-if="displayType !== 'edit'"
                    style="margin-right: 0"
                  >
                    {{ serialNumber }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!-- 自定字段 -->
        <el-tab-pane label="凭证资料" name="4">
          <div class="forms">
            <!-- left -->
            <ul class="left w300">
              <li>
                <label class="label">进货营运中心</label>
                <el-select
                  v-model="cashOut"
                  placeholder="请选择进货营运中心"
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
                </el-select>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label">退款编号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入退款编号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ cashOut }}</div>
              </li>
              <li>
                <label class="label">收科单号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入收科单号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ saleType }}</div>
              </li>
            </ul>
            <!-- center -->
            <ul class="center w300">
              <li>
                <label class="label">采购单号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入采购单号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">进口报单</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入进口报单' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">进口单号</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入进口单号' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <!-- right -->
            <ul class="right w300">
              <li>
                <label class="label">发票号码</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入发票号码' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
              <li>
                <label class="label">凭证号码</label>
                <el-input
                  v-model="orderNum"
                  class="elInput"
                  :placeholder="editType == 'search' ? '请输入凭证号码' : ''"
                  v-if="displayType == 'edit'"
                ></el-input>
                <div class="elInput msgBox" v-else>{{ credentNum }}</div>
              </li>
            </ul>
            <ul class="right w300"></ul>
          </div>
        </el-tab-pane>
      </el-tabs>
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
import { dateFmt } from "../../utils/utils";
export default {
  components: {
    FixedBtns,
    Audit,
    CancelAudit,
    TurnCredent,
    ReductCredent,
    AccountEntry,
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
        path: "/entryPapers",
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
      .w300 {
        width: 300px !important;
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
  .elInput {
    width: 200px !important;
  }
  .msgBox {
    width: 200px !important;
  }
  .label {
    width: 90px !important;
  }
}
</style>
