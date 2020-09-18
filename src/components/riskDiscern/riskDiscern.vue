<template>
  <div class="authorityAdmin">
    <div class="thisHeader">
      <h1>风险详情</h1>
      <el-divider content-position="right"></el-divider>
    </div>

    <div class="riskTree">
      <div class="treeTitle">风控对象树</div>
      <el-tree :data="data" node-key="levelId" :props="defaultProps" highlight-current check-strictly
        @node-click="handleNodeClick" ref="tree">
      </el-tree>
    </div>
    <div class="riskRight">
      <div class="treeTitle">指标详情</div>
      <div class="riskShow" v-if="isHide" style="font-size: 16px;color: #606266;">-----暂无信息----</div>
      <div class="riskShow" v-if="isShow">
        <el-form :inline="true" :model="dataquery" class="demo-ruleForm">
          <!-- <el-form-item label="指标一级分类">
                        <el-input v-model="dataquery.indexAcqFreqId" disabled placeholder="指标一级分类"></el-input>
                    </el-form-item>
                    <el-form-item label="指标二级分类">
                        <el-input v-model="dataquery.indexAcqFreqId" disabled placeholder="指标二级分类"></el-input>
                    </el-form-item>
                    <el-form-item label="指标三级分类" prop="indexAcqFreqId">
                        <el-input v-model="dataquery.indexAcqFreqId" disabled placeholder="指标三级分类"></el-input>
                    </el-form-item> -->
          <el-form-item label="指标中文" prop="kpiName">
            <el-input v-model="dataquery.kpiName" readonly placeholder="指标中文"></el-input>
          </el-form-item>
          <el-form-item label="当前数值" prop="kpiValue">
            <el-input v-model="dataquery.kpiValue" readonly placeholder="当前值"></el-input>
          </el-form-item>
          <el-form-item label="风险阈值" prop="">
            <el-input v-model="dataquery.indexEn" disabled placeholder="风险阈值"></el-input>
          </el-form-item>
          <el-form-item label="指标英文" prop="indexEn">
            <el-input v-model="dataquery.indexEn" disabled placeholder="指标英文"></el-input>
          </el-form-item>
          <el-form-item label="指标编号" prop="indexNo">
            <el-input v-model="dataquery.indexNo" disabled placeholder="指标编号"></el-input>
          </el-form-item>
          <el-form-item label="采集频率" prop="indexAcqFreq">
            <el-input v-model="dataquery.indexAcqFreq" disabled placeholder="采集频率"></el-input>
          </el-form-item>
          <el-form-item label="指标单位" prop="indexUnit">
            <el-input v-model="dataquery.indexUnit" disabled placeholder="指标单位"></el-input>
          </el-form-item>
          <el-form-item label="指标描述" prop="indexDesc">
            <el-input v-model="dataquery.indexDesc" disabled type="textarea" placeholder="指标描述"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    riskDis,
    queryKpiValue
  } from "./api";
  export default {
    name: 'authorityAdmin',
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'levelName',
        },
        dataquery: {},
        isShow: false,
        isHide: true
      }
    },
    created() {
      this.handleTree();
    },
    methods: {
      //获取树
      handleTree() {
        riskDis(this.formInline).then(res => {
          const navList = [];
          res.data.forEach((item, index) => {
            const levelList = [];
            item.level2List.forEach((iten, indexn) => {
              const piptteObjList1 = [];
              iten.piptteObjList.forEach((itea, indexa) => {
                const indexAcqFreqList1 = [];
                itea.indexAcqFreqList.forEach((ita, ind) => {
                  indexAcqFreqList1.push({
                    levelId: ita.indexAcqFreqId,
                    levelName: ita.indexAcqFreqName
                  })
                })
                piptteObjList1.push({
                  levelId: itea.objId,
                  levelName: itea.objName,
                  children: indexAcqFreqList1
                })
              })
              levelList.push({
                levelId: iten.level2Id,
                levelName: iten.level2Name,
                children: piptteObjList1
              })
            });
            navList.push({
              levelId: item.level1Id,
              levelName: item.levelName,
              children: levelList
            })
          });
          this.data = navList;
        });
      },
      //获取某对象下的指标信息
      handleQuery(key, data) {
        let params = Object.assign({
          objId: data,
          indexAcqFreqId: key
        })
        queryKpiValue(params).then(res => {
          if (res.data.length > 0) {
            this.dataquery = Object.assign(...res.data);
            this.isShow = true;
            this.isHide = false;
          } else {
            this.dataquery = {};
            this.isShow = false;
            this.isHide = true;
          }
        })
      },
      handleNodeClick(data, checked, indeterminate) {
        if (checked.isLeaf && checked.level == 4) {
          this.handleQuery(checked.key, checked.parent.key);
        } else {
          this.isShow = false;
          this.isHide = true;
        }

      }
    }
  }

</script>

<style scoped>
  .thisHeader {
    width: 100%;
    clear: both;
  }

  .riskTree {
    float: left;
    width: 48%;
    box-shadow: 0px 0px 2px #888888;
    height: 400px;
  }

  .treeTitle {
    font-size: 15px;
    background: gainsboro;
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
  }

  .riskRight {
    float: right;
    text-align: center;
    box-shadow: 2px 2px 5px #888888;
    width: 50%;
  }

  .riskRight .riskShow {
    margin-top: 10px;
  }

.el-tree {
    background: #fff;
  }
 
  .tree-com .el-icon-caret-right:before {
    content: "";
    display: inline-block;
    background-size: 7px 14px;
    width: 7px;
    height: 14px;
  }
 
  .tree-com .is-leaf.el-icon-caret-right:before {
    background: none;
  }
</style>
