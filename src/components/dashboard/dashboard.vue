<template>
  <div class="numView">
    <div class="nav-numview">风险工作监督</div>
    <div class="box-wrap">
      <div v-for="item in datas" class="box-flex">
        <div class="box-flex-top">
          <div v-if="item.istrue" class="box-flex-status" style="float:left">未整改<br>{{item.value1num}}</div>
          <div v-if="item.istrue" class="box-flex-status" style="float:right">已整改<br>{{item.value2num}}</div>
        </div>
        <div class="num-Class">{{item.value}}</div>
        <div class="box-flex-bottom">{{item.text}}</div>
      </div>
    </div>

    <div style="width:60%;float:left">
      <div class="nav-numview">业务系统运行状态</div>
      <div>
        <el-table :data="tableData" :row-style="{height:'20px'}" :cell-style="{padding:'3px'}">
          <el-table-column prop="name" label="信息系统" width="130">
          </el-table-column>
          <el-table-column prop="tradolume" label="日均交易量" width="100">
          </el-table-column>
          <el-table-column prop="tradolumeTop" label="交易峰值">
          </el-table-column>
          <el-table-column prop="successRate" label="成功率">
          </el-table-column>
          <el-table-column prop="Availability" label="可用率">
          </el-table-column>
          <el-table-column prop="tag" label="状态" width="100"
            :filters="[{ text: '正常', value: '正常' }, { text: '异常', value: '异常' }]" :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag :type="scope.row.stauts === '异常' ? 'primary' : 'success'" disable-transitions>{{scope.row.stauts}}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
    <div style="width:38%;margin-left:2%;float:left;marggin-bottom:50px">
      <div class="nav-numview">一周风险事件数量曲线</div>
      <div id="myChart" :style="{width: '100%', height: '350px'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'numView',
    data() {
      return {
        tableData: [{
          name: '核心业务系统',
          tradolume: '1339',
          tradolumeTop: '1988',
          successRate: '96%',
          Availability: '94',
          stauts: '正常'
        }, {
          name: '信用卡',
          tradolume: '1288',
          tradolumeTop: '1458',
          successRate: '96%',
          Availability: '94',
          stauts: '正常'
        }, {
          name: '信用卡',
          tradolume: '1569',
          tradolumeTop: '1798',
          successRate: '96%',
          Availability: '94',
          stauts: '正常'
        }, {
          name: '网上银行',
          tradolume: '1781',
          tradolumeTop: '2018',
          successRate: '96%',
          Availability: '94',
          stauts: '异常'
        }, {
          name: '柜面',
          tradolume: '911',
          tradolumeTop: '989',
          successRate: '96%',
          Availability: '94',
          stauts: '正常'
        }, {
          name: '手机银行',
          tradolume: '2190',
          tradolumeTop: '2178',
          successRate: '96%',
          Availability: '94',
          stauts: '正常'
        }],
        datas: [{
            istrue: true,
            value1: '已整改',
            value1num: 102,
            value2: '未整改',
            value2num: 27,
            value: '97.1%',
            text: '监管问题整改率'
          },
          {
            istrue: true,
            value1: '已整改',
            value1num: 102,
            value2: '未整改',
            value2num: 27,
            value: '98.3%',
            text: '生产问题整效率'
          },
          {
            istrue: false,
            value1: '已整改',
            value1num: '',
            value2: '未整改',
            value2num: '',
            value: '203',
            text: '风险指标数量'
          },
          {
            istrue: false,
            value1: '已整改',
            value1num: '',
            value2: '未整改',
            value2num: '',
            value: '3',
            text: '风险指标异常数'
          },
          {
            istrue: true,
            value1: '进行中',
            value1num: 102,
            value2: '已完成',
            value2num: 27,
            value: '97.1%',
            text: '整改任务完成率'
          },
          {
            istrue: true,
            value1: '进行中',
            value1num: 102,
            value2: '已完成',
            value2num: 27,
            value: '98.3%',
            text: '自查任务完成率'
          }
        ],
        msg: '风险管理总视图'
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      filterTag(){},
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            "triggerOn": "click"
          },
          xAxis: [{
            type: 'category',
            data: ['01', '02', '03', '04', '05', '06', '07'],
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            }
          }],
          yAxis: [{
            type: 'value',
            splitNumber: 4,
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#DDD'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#333"
              },
            },
            nameTextStyle: {
              color: "#999"
            },
            splitArea: {
              show: false
            }
          }],
          series: [{
            name: '事件数量',
            type: 'line',
            data: [23, 60, 20, 36, 23, 85, 70],
            lineStyle: {
              normal: {
                width: 8,
                color: {
                  type: 'linear',

                  colorStops: [{
                    offset: 0,
                    color: '#A9F387' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#48D8BF' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 10,
                shadowOffsetY: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#fff',
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 100,*/
                borderColor: "#A9F387"
              }
            },
            smooth: true
          }]
        });
      }
    }
  }

</script>

<style scoped>


  .num-top {
    margin-top: 50px
  }

  .nav-numview {
    background: #409EFF;
    color: #fff;
    height: 35px;
    margin-top: 10px;
    line-height: 35px;
    padding-left: 10px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  .box-wrap {
    height: 160px;
    border: 0.5px solid rgb(200, 200, 200);
    padding: 1%;
    border-top: 0;
  }

  .box-flex {
    width: 130px;
    height: 130px;
    border: 0.5px solid rgb(200, 200, 200);
    margin: 13px;
    float: left;
    font-size: 14px;
    box-shadow: 2px 2px 5px #888888;
  }

  .num-Class {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    padding-bottom: 28px
  }

  .box-flex-top {
    height: 40px
  }

  .box-flex-status {
    width: 60px;
    text-align: center;
    font-size: 10px;
  }

  .box-flex-bottom {
    background: rgb(200, 200, 200);
    height: 30px;
    text-align: center;
    line-height: 30px;
  }

</style>
