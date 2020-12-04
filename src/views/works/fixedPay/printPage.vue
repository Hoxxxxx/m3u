<template>
  <div class="printSpace">
    <!-- 页眉 -->
    <div class="pageHead">
      <span class="company">华录新媒</span>
      <span class="Date">2020-12-03 13:28</span>
    </div>
    <!-- 表单区域 -->
    <div class="printContent">
      <!-- 内容 -->
      <div class="tabContent" id="tabContent">
        <div class="title">{{ workName }}</div>
        <div class="table_Info">
          <span class="code">业务日期：{{ tableData.oaa02 }}</span>
          <span class="name">申请单编号：{{ tableData.oaa01 }}</span>
        </div>
        <div class="tableBox">
          <!-- 基本信息 -->
          <div class="title_line">基本信息</div>
          <div class="form_line">
            <div class="titlebox">经办人</div>
            <div class="infobox middlebox">{{ tableData.oaa03_show }}</div>
            <div class="titlebox">联系电话</div>
            <div class="infobox middlebox last_row">{{ tableData.oaa05 }}</div>
          </div>
          <div class="form_line lastline">
            <div class="titlebox">申请人</div>
            <div class="infobox">{{ tableData.oaa04_show }}</div>
            <div class="titlebox">员工编号</div>
            <div class="infobox">{{ tableData.oaa04 }}</div>
            <div class="titlebox">所属部门</div>
            <div class="infobox last_row">{{ tableData.oaa04_gen04 }}</div>
          </div>
          <!-- 付款信息 -->
          <div class="title_line">付款信息</div>
          <!-- 1 -->
          <div class="form_line">
            <div class="titlebox">预付厂商</div>
            <div class="infobox">{{tableData.oaa11}}</div>
            <div class="titlebox">厂商简称</div>
            <div class="infobox">{{tableData.oaa11_show}}</div>
            <div class="titlebox">本次支付金额</div>
            <div class="infobox last_row">{{tableData.oaa12}}</div>
          </div>
          <!-- 2 -->
          <div class="form_line">
            <div class="titlebox">币种</div>
            <div class="infobox">{{tableData.oaa13_show}}</div>
            <div class="titlebox">汇率</div>
            <div class="infobox selectbox">{{tableData.oaa14}}</div>
            <div class="titlebox">应付金额</div>
            <div class="infobox last_row">{{com_YFJE}}</div>
          </div>
          <!-- 3 -->
          <div class="form_line">
            <div class="titlebox">税别</div>
            <div class="infobox">{{tableData.oaa15}}</div>
            <div class="titlebox">税率</div>
            <div class="infobox editNot">{{tableData.oaa15_show}}</div>
            <div class="titlebox">支付方式</div>
            <div class="infobox last_row">{{tableData.oaa16_show}}</div>
          </div>
          <!-- 4 -->
          <div class="form_line">
            <div class="titlebox">固定资产申请单</div>
            <div class="infobox longbox selectbox">{{tableData.oaa17_show}}</div>
          </div>
          <!-- 5 -->
          <div class="form_line">
            <div class="titlebox">说明</div>
            <div class="infobox longbox" style="width: 100%">{{tableData.oaa18}}</div>
          </div>
          <!-- 5 -->
          <div class="form_line">
            <div class="titlebox">验收信息</div>
            <div class="infobox last_row longbox" style="width: 100%">{{tableData.oaa19}}</div>
          </div>
          <!-- 收款信息 -->
          <div class="title_line">收款信息</div>
          <div class="form_line">
            <div class="titlebox">收款人</div>
            <div class="infobox selectbox">{{tableData.oaa21}}</div>
            <div class="titlebox">开户行</div>
            <div class="infobox selectbox">{{tableData.oaa22}}</div>
            <div class="titlebox">收款账号</div>
            <div class="infobox selectbox last_row">{{tableData.oaa23}}</div>
          </div>
          <div class="form_line">
            <div class="titlebox">支票号</div>
            <div class="infobox last_row longbox selectbox" style="width: 100%">{{tableData.oaa24}}</div>
          </div>
          <!-- 发票明细行 -->
          <div class="title_line">发票明细行</div>

          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_invoice" :key="F_index">
            <!-- 有几个表头 -->
            <div class="tDataBox" v-for="(S_item, S_index) in F_item.theadList" :key="S_index">
              <div class="thead">{{S_item.label}}</div>
              <!-- 有几组内容 -->
              <div class="tdata" v-if="tableData.oaf.length == 0"></div>
              <div class="tdata" v-for="(content_item, content_index) in tableData.oaf" :key="content_index">
                {{content_item[S_item.value]}}
              </div>
            </div>
          </div>

          <div class="title_line">合计</div>
          <div class="summry">
            <ul class="summryUl">
              <li class="summryLi">
                <div class="summryName">税前金额（原币）</div>
                <div class="summryCont">{{ com_SQJEyb }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">税额（原币）</div>
                <div class="summryCont">{{ com_SEyb }}</div>
              </li>
              <li class="summryLi">
                <div class="summryName">含税合计（原币）</div>
                <div class="summryCont">{{ com_HSHJyb }}</div>
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

          <!-- 费用明细行项目 -->
          <div class="title_line">费用明细行项目</div>

          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_oac" :key="'oac'+F_index">
            <!-- 有几个表头 -->
            <div class="tDataBox" v-for="(S_item, S_index) in F_item.theadList" :key="S_item+S_index">
              <div class="thead">{{S_item.label}}</div>
              <!-- 有几组内容 -->
              <div class="tdata" v-if="tableData.oac.length == 0"></div>
              <div class="tdata" v-for="(content_item, content_index) in tableData.oac" :key="content_item+content_index">
                {{content_item[S_item.value]}}
              </div>
            </div>
          </div>

          <!-- 冲销信息 -->
          <div class="title_line">冲销信息</div>

          <!-- 拆分成几组表格 -->
          <div class="inner_Table" v-for="(F_item, F_index) in tableBox_oad" :key="'oad'+F_index">
            <!-- 有几个表头 -->
            <div class="tDataBox" v-for="(S_item, S_index) in F_item.theadList" :key="S_item+S_index">
              <div class="thead">{{S_item.label}}</div>
              <!-- 有几组内容 -->
              <div class="tdata" v-if="tableData.oad.length == 0"></div>
              <div class="tdata" v-else v-for="(content_item, content_index) in tableData.oad" :key="content_item+content_index">
                {{content_item[S_item.value]}}
              </div>
            </div>
          </div>

          <!-- 财务信息 -->
          <div v-if="oazShow == 1">
            <div class="title_line">
              财务信息
            </div>
            <div class="form_line">
              <div class="titlebox">银行</div>
              <div class="infobox selectbox editNot">
                <div class="" >
                  {{ tableData.oaz01 }}
                </div>
              </div>
              <div class="titlebox">异动码</div>
              <div class="infobox selectbox editNot">
                <div class="" >
                  {{ tableData.oaz02 }}
                </div>
              </div>
              <div class="titlebox">记账日期</div>
              <div class="infobox middlebox last_row">{{tableData.oaz03}}</div>
            </div>
            <div class="form_line last_line">
              <div class="titlebox">账款类型</div>
              <div class="infobox selectbox editNot">
                <div class="editNot" >
                  {{ tableData.oaz04 }}
                </div>
              </div>
              <div class="titlebox">凭证编号</div>
              <div class="infobox selectbox editNot">
                {{ tableData.oaz06 }}
              </div>
              <div class="titlebox">支付方式</div>
              <div class="infobox middlebox last_row">
                {{ tableData.oaz05_show }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 流程区域 -->
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

  </div>
</template>

<script>
import { OpenLoading } from "@/utils/utils.js";
// api
import { workflowsList, editFlow  } from "@/api/process_new";
import { azisList, pmasList, } from "@/api/basic";

export default {
  components: {},
  data() {
    return {
      // 指定表格（发票明细行）
      tableBox_invoice: [
        // 表格一
        {
          theadList: [
            {
              label: '发票号码',
              value: 'oaf01'
            },
            {
              label: '发票日期',
              value: 'oaf02'
            },
            {
              label: '税别',
              value: 'oaf03'
            },
            {
              label: '税率',
              value: 'oaf03_show'
            },
            {
              label: '税前金额（原币）',
              value: 'oaf05'
            },
            {
              label: '税额（原币）',
              value: 'oaf06'
            },
          ],
          tData: [
            {
              oaf01: '111',
              oaf02: '111',
              oaf03: '111',
              oaf03_show: '111',
              oaf05: '111',
              oaf06: '111',
            },
            {
              oaf01: '222',
              oaf02: '222',
              oaf03: '222',
              oaf03_show: '222',
              oaf05: '222',
              oaf06: '222',
            }
          ]
        },
        // 表格二
        {
          theadList: [
            {
              label: '含税金额（原币）',
              value: 'oaf07'
            },
            {
              label: '税前金额（本币）',
              value: 'sqjeBB'
            },
            {
              label: '税额（本币）',
              value: 'seBB'
            },
            {
              label: '含税金额（本币）',
              value: 'hsjeBB'
            },
          ],
          tData: [
            {
              oaf07: '333',
              sqjeBB: '333',
              seBB: '333',
              hsjeBB: '333',
            },
            {
              oaf07: '444',
              sqjeBB: '444',
              seBB: '444',
              hsjeBB: '444',
            }
          ]
        },
      ],
      // 费用明细
      tableBox_oac: [
        // 表格一
        {
          theadList: [
            {
              label: '会计科目',
              value: 'oac01'
            },
            {
              label: '项目',
              value: 'oac04'
            },
            {
              label: '项目WBS',
              value: 'oac05'
            },
            {
              label: '资产卡片',
              value: 'oac08'
            },
            {
              label: '金额（不含税）',
              value: 'oac07'
            },
            {
              label: '核算项一',
              value: 'oac11'
            },
          ],
          tData: [
            {
              oaf01: '111',
              oaf02: '111',
              oaf03: '111',
              oaf03_show: '111',
              oaf05: '111',
              oaf06: '111',
            },
            {
              oaf01: '222',
              oaf02: '222',
              oaf03: '222',
              oaf03_show: '222',
              oaf05: '222',
              oaf06: '222',
            }
          ]
        },
        // 表格二
        {
          theadList: [
            {
              label: '核算项二',
              value: 'oac12'
            },
          ],
          tData: [
            {
              oaf07: '333',
            },
            {
              oaf07: '444',
            }
          ]
        },
      ],
      // 冲销信息
      tableBox_oad: [
        // 表格一
        {
          theadList: [
            {
              label: '待抵单号',
              value: 'oad01'
            },
            {
              label: '借款日期',
              value: 'oad03'
            },
            {
              label: '借款人',
              value: 'oad04'
            },
            {
              label: '借款总金额',
              value: 'oad05'
            },
            {
              label: '还款金额',
              value: 'oad02'
            },
            {
              label: '凭证号',
              value: 'oad06'
            },
          ],
          tData: [
            {
              oaf01: '111',
              oaf02: '111',
              oaf03: '111',
              oaf03_show: '111',
              oaf05: '111',
              oaf06: '111',
            }
          ]
        },
      ],
      
      overloading: '', //加载定时器
      activeTab: "firTab",
      workid: '',
      workName:"固定资产付款",//流程名
      tableData: {
        // 表格部分
        oaf: [], // 发票明细
        oac: [], // 费用明细行项目
        oad: [], // 冲销信息
      },
      // 表单数据
      fixedData: {
        // 币种列表
        azisList: [],
        // 分摊列表
        shareList: [
          {
            id: 1,
            label: '单一部门分摊'
          },{
            id: 2,
            label: '多部门分摊'
          }
        ],
      },
      oazShow: 0, //是否显示财务信息（当前人是否是出纳）0：否 1：是
      fileList_user: [],
      // 当前流程列表
      workclass_perflow: [],
    };
  },
  created() {
    this.workid = this.$route.query.workid
    // this.workid = 4587
    this.getAzi()
    this.getPma()
    this.getworkflows()
  },
  computed: {
    // 应付金额
    com_YFJE(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf07);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 税前金额（原币）
    com_SQJEyb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf05);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 税额（原币）
    com_SEyb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf06);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 含税合计（原币）
    com_HSHJyb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.oaf07);
        }, 0);
        return sum.toFixed(2)
      }
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
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.seBB);
        }, 0);
        return sum.toFixed(2)
      }
    },
    // 含税合计（本币）
    com_HSHJbb(){
      if (this.tableData.oaf) {
        let sum =  this.tableData.oaf.reduce((prev, cur) => {
          return prev + Number(cur.hsjeBB);
        }, 0);
        return sum.toFixed(2)
      }
    },
  },
  methods: {
    handleClick() {
      // console.log(this.activeTab);
    },
    // ***********获取流程信息************
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
          this.tableData.oaf.forEach((item, index) => {
            this.change_HSJE(index)
          })
          this.workName = res.data.workclass_info.title
          this.workclass_perflow = res.data.workclass_perflow
          this.oazShow = res.data.workclass_flow.erp_turn
          if (res.data.file !== null) {
            res.data.file.forEach( item => {
              this.fileList_user.push({
                id: item.id,
                name: item.filename,
                url: item.fileaddr
              })
            })
          }
          setTimeout(() => {
            // 打印
            window.print()
          },500)
        }else{
          loading.close()
          clearTimeout(this.overloading)
          this.$message.error('获取流程信息失败：', res.error.message);
        }
      })
    },
    // *******************************************
    // ***********获取下拉列表信息************
    getAzi () {
      azisList()
      .then( result => {
        if (result.status == 200) {
          this.fixedData.azisList = result.data;
          if (this.fixedData.azisList !== null && this.fixedData.azisList !== []){
            this.fixedData.azisList.forEach( item => {
              if (item.azi01 == this.tableData.oaa13) {
                this.tableData.oaa13_show = item.azi02
              }
              if (item.azi01 == this.tableData.oaz05) {
                this.tableData.oaz05_show = item.azi02
              }
            })
          }
        } else {
          this.$message.error("获取币种列表失败：" + result.error.message);
        }
      })
    },
    getPma() {
      pmasList().then((res) => {
        if (res.status == 200) {
          this.fixedData.payTypes = res.data;
          if (this.fixedData.payTypes !== null && this.fixedData.payTypes !== []){
            this.fixedData.payTypes.forEach( item => {
              if (item.pma01 == this.tableData.oaa16) {
                this.tableData.oaa16_show = item.pma02
              }
            })
          }
        } else {
          this.$message.error("获取支付方式列表失败：" + result.error.message);
        }
      });
    },
    // *******************************************
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/style/public.less";
</style>
