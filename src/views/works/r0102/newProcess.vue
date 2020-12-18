<template>
  <div class="workSpace">
    <!-- 表单区域 -->
    <el-card class="formContent">
      <div class="btnBox" v-if="activeTab == 'firTab'">
        <!-- <el-button type="primary" @click="$router.push('/')">回到首页</el-button> -->
        <el-button type="primary" class="save" @click="addNewFlow('add')">保存</el-button>
        <el-button type="primary" class="next" @click="addNewFlow('next')">下一步</el-button>
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
                <div class="titlebox required"><span class="redPot">经办人</span></div>
                <div class="infobox middlebox editNot">
                  {{ tableData.oaa03_show }}
                </div>
                <div class="titlebox">
                  <span class="redPot">联系电话</span>
                </div>
                <div class="infobox selectbox middlebox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa05"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div class="form_line lastline">
                <div class="titlebox required"><span class="redPot">申请人</span></div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SQR')">
                    {{ showData.oaa04_show }}
                  </div>
                </div>
                <div class="titlebox required"><span class="redPot">员工编号</span></div>
                <div class="infobox editNot">
                  {{ showData.oaa04_gen01 }}
                </div>
                <div class="titlebox">所属部门</div>
                <div class="infobox editNot last_row">
                  {{ showData.oaa04_gen04 }}
                </div>
              </div>
              <!-- 付款信息 -->
              <div class="title_line">付款信息</div>
              <!-- 1 -->
              <div class="form_line">
                <div class="titlebox required"><span class="redPot">预付厂商</span></div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('YFCS')">{{tableData.oaa11}}</div>
                </div>
                <div class="titlebox">厂商简称</div>
                <div class="infobox disabledbox">{{showData.oaa11_show}}</div>
                <div class="titlebox">本次支付金额</div>
                <div class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa12"
                    placeholder="请输入本次支付金额"
                  />
                </div>
              </div>
              <!-- 2 -->
              <div class="form_line">
                <div class="titlebox required"><span class="redPot">币种</span></div>
                <div class="infobox selectbox">
                  <el-select
                    v-model="tableData.oaa13"
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
                <div class="titlebox required"><span class="redPot">汇率</span></div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa14"
                    placeholder="请输入汇率"
                  />
                </div>
                <div class="titlebox">应付金额</div>
                <div class="infobox selectbox disabledbox last_row">{{com_YFJE}}</div>
              </div>
              <!-- 3 -->
              <div class="form_line">
                <div class="titlebox required"><span class="redPot">税别</span></div>
                <div class="infobox selectbox">
                  <div class="selector" @click="selectDialog('SB')">{{tableData.oaa15}}</div>
                </div>
                <div class="titlebox required"><span class="redPot">税率</span></div>
                <div class="infobox editNot">{{showData.oaa15_show}}</div>
                <div class="titlebox">支付方式</div>
                <div class="infobox last_row selectbox">
                  <el-select
                    v-model="tableData.oaa16"
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
              <div class="form_line">
                <div class="titlebox">报销金额</div>
                <div class="infobox middlebox editNot">
                  {{ showData.expenseMoney }}
                </div>
                <div class="titlebox">报销金额大写</div>
                <div class="infobox middlebox editNot last_row">
                  {{ showData.expenseMoneyF }}
                </div>
              </div>
              <!-- 5 -->
              <div class="form_line">
                <div class="titlebox required"><span class="redPot">说明</span></div>
                <div class="infobox areabox longbox" style="width: 100%">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa18"
                    placeholder="请输入说明"
                    maxlength="80"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <div class="form_line">
                <div class="titlebox">备注</div>
                <div class="infobox areabox longbox" style="width: 100%">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="tableData.oaa99"
                    placeholder="请输入备注"
                    maxlength="80"
                    show-word-limit
                  >
                  </el-input>
                </div>
              </div>
              <!-- 收款信息 -->
              <div class="title_line">收款信息</div>
              <div class="form_line">
                <div class="titlebox">收款人</div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa21"
                    placeholder="请输入收款人"
                  />
                </div>
                <div class="titlebox">开户行</div>
                <div class="infobox selectbox">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa22"
                    placeholder="请输入开户行"
                  />
                </div>
                <div class="titlebox">收款账号</div>
                <div class="infobox selectbox last_row">
                  <input
                    class="abstracInput"
                    v-model="tableData.oaa23"
                    placeholder="请输入收款账号"
                  />
                </div>
              </div>
              <div class="form_line last_line">
                <div class="titlebox">支票号</div>
                <div class="infobox last_row longbox selectbox" style="width: 100%">
                  <input
                    class="abstracInput"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    v-model="tableData.oaa24"
                    placeholder="请输入支票号"
                  />
                </div>
              </div>
              <!-- 发票明细行 -->
              <div class="title_line">发票明细行</div>
              <div>
                <el-table
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
                    label="增 / 删"
                    fixed="left"
                    width="100px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div style="font-size: 24px; width: 100%; height: 100%">
                          <i
                            v-if="scope.$index == tableData.oaf.length - 1"
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
                    prop="oaf01"
                    label="发票号码"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf01"
                          placeholder="发票号码"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf02"
                    label="发票日期"
                    min-width="160px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-date-picker
                          v-model="scope.row.oaf02"
                          style="width: 100%"
                          type="date"
                          placeholder="发票日期"
                          format="yyyy/MM/dd"
                          value-format="yyyy/MM/dd"
                        >
                        </el-date-picker>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf03"
                    label="税别"
                    min-width="130px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <div
                          class="selector selectBorder"
                          @click="selectDialog('FPSB', scope.$index)"
                        >
                          {{ scope.row.oaf03 }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                   <el-table-column
                    prop="oaf03_show"
                    label="税率"
                    min-width="130px"
                    align="center"
                  >
                  <div slot-scope="scope">
                    <el-input
                      v-model="scope.row.oaf03_show"
                      placeholder="税率"
                      disabled
                    ></el-input>
                  </div>
                  </el-table-column>
                  <el-table-column
                    prop="oaf05"
                    label="税前金额（原币）"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf05"
                          placeholder="税前金额（原币）"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf06"
                    label="税额（原币）"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf06"
                          placeholder="税额（原币）"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="oaf07"
                    label="含税金额（原币）"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oaf07"
                          placeholder="含税金额（原币）"
                          @input="change_HSJE(scope.$index)"
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="sqjeBB"
                    label="税前金额（本币）"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.sqjeBB"
                          placeholder="税前金额（本币）"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="seBB"
                    label="税额（本币）"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.seBB"
                          placeholder="税额（本币）"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="hsjeBB"
                    label="含税金额（本币）"
                    min-width="170px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.hsjeBB"
                          placeholder="含税金额（本币）"
                          disabled
                        ></el-input>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName">税前金额（原币）</div>
                      <div class="summryCont editNot">{{ com_SQJEyb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">税额（原币）</div>
                      <div class="summryCont editNot">{{ com_SEyb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">含税合计（原币）</div>
                      <div class="summryCont editNot">{{ com_HSHJyb }}</div>
                    </li>
                  </ul>
                </div>
                <div class="summry">
                  <ul class="summryUl">
                    <li class="summryLi">
                      <div class="summryName ">税前金额（本币）</div>
                      <div class="summryCont editNot">{{ com_SQJEbb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">税额（本币）</div>
                      <div class="summryCont editNot">{{ com_SEbb }}</div>
                    </li>
                    <li class="summryLi">
                      <div class="summryName">含税合计（本币）</div>
                      <div class="summryCont editNot">{{ com_HSHJbb }}</div>
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
                    prop="oac09"
                    label="摘要"
                    min-width="180px"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div>
                        <el-input
                          v-model="scope.row.oac09"
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
                  <el-table-column
                    prop="oad01"
                    label="预付编号"
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
                    label="付款日期"
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
                    label="预付金额（原币）"
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
                    label="还款金额（原币）"
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
import { addFlow,editFlow,workflows,openitems } from "@/api/process_new";
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
      activeTab: "firTab",
      workid: "",
      workName: "付款申请单", //流程名
      showData: {
        oaa04_show: "", //申请人
        oaa04_gen01: "", //申请人编号
        oaa04_gen04: "", //申请人部门
        oaa11_show: "", //厂商简称
        oaa15_show: "", //税率
        expenseMoney: "", //报销金额
        expenseMoneyF: "", //报销金额大写
      },
      tableData: {
        // 基本信息
        oaa01: "", //申请单编号
        oaa02: "", //业务日期
        oaa03: "", //经办人
        oaa04: "", //申请人id
        oaa05: "", //联系电话
        //付款信息
        oaa11: "", //预付厂商
        oaa12: "0", //本次支付金额
        oaa13: "RMB", //币种
        oaa14: "1", //汇率
        oaa15: "", //税别
        oaa16: "TT", //支付方式
        oaa17: "", //应付金额
        oaa18: "", //说明
        // 收款信息
        oaa21: "", //收款人
        oaa22: "", //开户行
        oaa23: "", //收款账号
        oaa24: "", //支票号
        oaa99:"",//备注
        // 表格部分
        oaf: [], // 发票明细
        oac: [], // 费用明细行项目
        oad: [], // 冲销信息
      },
      oacType: "", //核算项类型
      oaz: {
        oaz01: "", //银行
        oaz02: "", //异动码
        oaz03: "", //记账日期
        oaz04: 2001, //账款类型
        oaz05: "", //支付方式
        oaz06: "", //凭证编号
      },
      fixedData: {
        // 币种列表
        cointypes: [],
        //支付方式
        payTypes: [],
      },
      fileList: [],
      addParams: {
        from_data: {},
        annexurlid: [],
        tplid: 8950,
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
          { name: "gen04", title: "所属部门" },
        ],
        head_YFCS: [
          { name: "pmc01", title: "厂商编号" },
          // { name: "pmc02", title: "厂商分类" },
          { name: "pmc03", title: "厂商简称" },
          // { name: "pmc04", title: "付款厂商编号" },
          // { name: "pmc30", title: "厂商性质" },
          // { name: "pmc47", title: "税别" },
          { name: "pmc56", title: "银行账号" },
          { name: "pmcud01", title: "开户银行" },
          { name: "pmcud04", title: "账户名称" },
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
        head_GDZCSQD:[
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
    this.addParams.tplid = this.$route.query.tplid
    let oauserinfo = JSON.parse(sessionStorage.getItem('oauserinfo'))
    this.tableData.oaa03 = oauserinfo.oauserid ? oauserinfo.oauserid : ''
    this.tableData.oaa03_show = oauserinfo.oaname
    this.addRow1();
    this.addRow2();
    this.getAzi(); //币种列表
    this.getPma(); //支付方式
  },
  computed: {
    // 应付金额
    com_YFJE(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.oaf07);
      }, 0);
      this.tableData.oaa17 = sum.toFixed(2)
      return sum.toFixed(2)
    },
    // 税前金额（原币）
    com_SQJEyb(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.oaf05);
      }, 0);
      return sum.toFixed(2)
    },
    // 税额（原币）
    com_SEyb(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.oaf06);
      }, 0);
      return sum.toFixed(2)
    },
    // 含税合计（原币）
    com_HSHJyb(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.oaf07);
      }, 0);
      return sum.toFixed(2)
    },
     // 税前金额（本币）
    com_SQJEbb(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.sqjeBB);
      }, 0);
      return sum.toFixed(2)
    },
    // 税额（本币）
    com_SEbb(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.seBB);
      }, 0);
      return sum.toFixed(2)
    },
    // 含税合计（本币）
    com_HSHJbb(){
      let sum =  this.tableData.oaf.reduce((prev, cur) => {
        return prev + Number(cur.hsjeBB);
      }, 0);
      this.showData.expenseMoney = sum.toFixed(2)
      this.showData.expenseMoneyF = number_chinese(sum.toFixed(2))
      return sum.toFixed(2)
    },
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ****************附件上传*****************
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
    // 新增（暂存）表单
    addNewFlow(type) {
      this.tableData = {...this.tableData,...this.oaz}
      this.addParams.from_data = this.tableData
      if (this.workid == '') {
        addFlow(this.addParams)
        .then( result => {
          if (result.status == 200) {
            this.workid = result.data.workid
            this.tableData.oaa01 = result.data.oaa01
            this.tableData.oaa02 = result.data.oaa02
            if (type == 'add') {
              this.$message.success("保存成功！");
            } else if (type == 'next') {
              this.$router.push(
                {
                  path:'/apply',
                  query: {
                    url_type: 'r0102',
                    workName:this.workName,
                    workid: this.workid,
                    workName: this.workName,
                    oaa01: this.tableData.oaa01,
                    oaa02: this.tableData.oaa02
                  }
                }
              )
            }
          } else {
            this.$message.error("保存失败：" + result.error.message);
          }
        })
      } else {
        this.addParams.workid = this.workid;
        editFlow(this.addParams).then((result) => {
          if (result.status == 200) {
            if (type == 'add') {
              this.$message.success("保存成功！");
            } else if (type == 'next') {
              this.$router.push(
                {
                  path:'/apply',
                  query: {
                    url_type: 'r0102',
                    workName:this.workName,
                    workid: this.workid,
                    workName: this.workName,
                    oaa01: this.tableData.oaa01,
                    oaa02: this.tableData.oaa02
                  }
                }
              )
            }
          } else {
            this.$message.error("保存失败：" + result.error.message);
          }
        });
      }
    },
    // *******************************************
    // 表格部分
    // 增加一行
    // 发票明细表格
    addRow1() {
      let data = {
        oaf01: "", //发票号码
        oaf02: dateFmt(new Date()), //发票日期
        oaf03: "", //税别
        oaf03_show: "1", //税率
        oaf05: "0.00", //税前金额（原币）
        oaf06: "0.00", //税额（原币）
        oaf07: "0.00", //含税金额（原币）
        sqjeBB: "0.00", //税前金额（本币）
        seBB: "0.00", //税额（本币）
        hsjeBB: "0.00", //含税金额（本币）
      };
      this.tableData.oaf.push(data);
    },
    // 删除当前行
    deleteRow1(val) {
      this.$confirm("确认删除本条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData.oaf.splice(val, 1);
        if (this.tableData.oaf.length == 0) {
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
        oac07: "", //金额不含税
        oac09: "", //摘要
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
    change_SB(rowIndex) {
      this.tableData.oaf[rowIndex].sqjeBB = (this.tableData.oaa14 * this.tableData.oaf[rowIndex].oaf05).toFixed(2)
      this.tableData.oaf[rowIndex].seBB = (this.tableData.oaa14 * this.tableData.oaf[rowIndex].oaf06).toFixed(2)
      this.tableData.oaf[rowIndex].hsjeBB = (this.tableData.oaa14 * this.tableData.oaf[rowIndex].oaf07).toFixed(2)
    },
    change_HSJE(rowIndex) {
      this.tableData.oaf[rowIndex].oaf05 = (this.tableData.oaf[rowIndex].oaf07 / (1 + this.tableData.oaf[rowIndex].oaf03_show / 100)).toFixed(2)
      this.tableData.oaf[rowIndex].oaf06 = (this.tableData.oaf[rowIndex].oaf07 / (1 + this.tableData.oaf[rowIndex].oaf03_show / 100) * (this.tableData.oaf[rowIndex].oaf03_show / 100)).toFixed(2)
      this.change_SB(rowIndex)
    },
    // 冲销信息表格
    addRow3() {
      let data = {
        oad01: "", //待抵账款编号
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
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      });
    },
    // 支付方式列表
    getPma() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.payTypes = res.data;
        } else {
          this.$message.error("获取支付方式列表失败：" + result.error.message);
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
          this.dataSelect.headList = this.tableHead.head_SQR;
          this.dataSelect.dialogTitle = "员工列表";
        break;
        case "YFCS":
          let filter_YFCS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_YFCS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pmcs";
          this.dataSelect.headList = this.tableHead.head_YFCS;
          this.dataSelect.dialogTitle = "应付厂商列表";
        break;
        case "SB":
          let filter_SB = [{ label: "", model_key_search: "keyword" },
          {
              label: "",
              model_key_search: "gec011",
              disabled: true,
              value: "1",
              hide: true,
            },];
          this.dataSelect.filter = filter_SB;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_SB;
          this.dataSelect.dialogTitle = "税别列表";
        break;
        case "FPSB":
          let filter_FPSB = [{ label: "", model_key_search: "keyword" },
          {
              label: "",
              model_key_search: "gec011",
              disabled: true,
              value: "1",
              hide: true,
            },];
          this.dataSelect.filter = filter_FPSB;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/gecs";
          this.dataSelect.headList = this.tableHead.head_SB;
          this.dataSelect.dialogTitle = "税别列表";
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
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pjas";
          this.dataSelect.headList = this.tableHead.head_XM;
          this.dataSelect.dialogTitle = "项目";
        break;
        case "WBS":
          let filter_WBS = [{ label: "", model_key_search: "keyword" }];
          this.dataSelect.filter = filter_WBS;
          this.dataSelect.searchType = "single"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "meta/pjbs";
          this.dataSelect.headList = this.tableHead.head_WBS;
          this.dataSelect.dialogTitle = "WBS列表";
        break;
        case "GDZCSQD":
          let filter_GDZCSQD = [{ label: "", model_key_search: "keyword" },{ label: "tplid", model_key_search: "tplid", disabled:true , value:8946, hide:true }];
          this.dataSelect.filter = filter_GDZCSQD;
          this.dataSelect.searchType = "mixed"
          this.dataSelect.editType = "entry"
          this.dataSelect.searchApi = "oa/workflows";
          this.dataSelect.headList = this.tableHead.head_GDZCSQD;
          this.dataSelect.dialogTitle = "申请单列表";
        break;
        case "WQX":
          this.dataSelect.dialogVisible = false;
          if (this.tableData.oaa11 == '') {
            this.$message.warning("请先选择厂商信息！" );
          } else {
            this.dataSelect.dialogVisible = true;
            let params = {
              type:1,
              number:this.tableData.oaa11
            }
            this.dataSelect.editType = "search"
            this.dataSelect.searchParams = params
            this.dataSelect.filter = [];
            this.dataSelect.searchType = "single"
            this.dataSelect.searchApi = "oa/openitems";
            this.selectLoading = false;
            this.dataSelect.headList = this.tableHead.head_WQX;
            this.dataSelect.dialogTitle = "未清项列表";
          }
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
          case "YFCS":
          this.tableData.oaa11 = val[0].pmc01;
          this.showData.oaa11_show = val[0].pmc03;
          this.tableData.oaa21 = val[0].pmc03;
          this.tableData.oaa22 = val[0].pmcud01;
          this.tableData.oaa23 = val[0].pmc56;
          break;
          case "SB":
          this.tableData.oaa15 = val[0].gec01;
          this.showData.oaa15_show = val[0].gec04;
          break;
          case "FPSB":
            this.tableData.oaf[this.rowIndex].oaf03 = val[0].gec01;
            this.tableData.oaf[this.rowIndex].oaf03_show = val[0].gec04;
            this.change_HSJE(this.rowIndex)
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
          case "GDZCSQD":
            this.tableData.oaa17 = val[0].id;
            this.showData.oaa17_show = val[0].title;
          break;
          case "WQX":
            val.forEach(item =>{
              this.$set(item,'oad01',item.id)
              this.$set(item,'oad02','')
              this.$set(item,'oad03',item.date)
              this.$set(item,'oad04',item.rid)
              this.$set(item,'oad04_show',item.rname)
              this.$set(item,'oad05',item.original_amount)
              this.$set(item,'oad06',item.voucher_code)
            })
            this.tableData.oad = val
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
@import "../../../assets/style/public.less";
.summry {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
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
        background: #FCFDFF;
        width: 150px!important;
        height: 40px;
        line-height: 40px;
        padding: 0 5px 0 5px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #cccccc;
      }
      .summryCont {
        width: 230px;
        height: 40px;
        flex: 1 1 auto;
        line-height: 40px;
        text-align: center;
      }
      &:last-child {
        border-right: none;
        .summryCont{
          flex: 1 1 auto;
        }
      }
    }
  }
}
</style>
