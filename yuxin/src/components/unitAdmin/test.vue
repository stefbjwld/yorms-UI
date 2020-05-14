<template>
  <div>
    <div id="myDiagramDiv"></div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>点击节点的id: {{clickItemId}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import insertCss from "insert-css";
import go from "gojs";
const data = {
  nodes: [
    {
      id: "0",
      label: "0"
    },
    {
      id: "1",
      label: "1"
    },
    {
      id: "2",
      label: "2"
    },
    {
      id: "3",
      label: "3"
    },
    {
      id: "4",
      label: "4"
    },
    {
      id: "5",
      label: "5"
    },
    {
      id: "6",
      label: "6"
    },
    {
      id: "7",
      label: "7"
    },
    {
      id: "8",
      label: "8"
    },
    {
      id: "9",
      label: "9"
    },
    {
      id: "10",
      label: "10"
    },
    {
      id: "11",
      label: "11"
    },
    {
      id: "12",
      label: "12"
    },
    {
      id: "13",
      label: "13"
    },
    {
      id: "14",
      label: "14"
    },
    {
      id: "15",
      label: "15"
    }
  ],
  edges: [
    {
      source: "0",
      target: "1"
    },
    {
      source: "0",
      target: "2"
    },
    {
      source: "0",
      target: "3"
    },
    {
      source: "0",
      target: "4"
    },
    {
      source: "0",
      target: "5"
    },
    {
      source: "0",
      target: "7"
    },
    {
      source: "0",
      target: "8"
    },
    {
      source: "0",
      target: "9"
    },
    {
      source: "0",
      target: "10"
    },
    {
      source: "0",
      target: "11"
    },
    {
      source: "0",
      target: "13"
    },
    {
      source: "0",
      target: "14"
    },
    {
      source: "0",
      target: "15"
    },
    {
      source: "2",
      target: "3"
    },
    {
      source: "4",
      target: "5"
    },
    {
      source: "4",
      target: "6"
    },
    {
      source: "5",
      target: "6"
    },
    {
      source: "7",
      target: "13"
    },
    {
      source: "8",
      target: "14"
    },
    {
      source: "9",
      target: "10"
    },
    {
      source: "10",
      target: "14"
    },
    {
      source: "10",
      target: "12"
    },
    {
      source: "11",
      target: "14"
    },
    {
      source: "12",
      target: "13"
    }
  ]
};
export default {
  name: "unitAdmin",
  data() {
    return {
      data: data,
      dialogVisible: false,
      clickItemId: ""
    };
  },
  mounted() {
    const that = this;
    G6.registerNode(
      "sql",
      {
        drawShape(cfg, group) {
          const rect = group.addShape("rect", {
            attrs: {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 10,
              stroke: "#5B8FF9",
              fill: "#C6E5FF",
              lineWidth: 3
            },
            name: "rect-shape"
          });
          if (cfg.name) {
            group.addShape("text", {
              attrs: {
                text: cfg.name,
                x: 0,
                y: 0,
                fill: "#00287E",
                fontSize: 14,
                textAlign: "center",
                textBaseline: "middle",
                fontWeight: "bold"
              },
              name: "text-shape"
            });
          }
          return rect;
        }
      },
      "single-node"
    );

    const width = document.getElementById("myDiagramDiv").scrollWidth;
    const height = document.getElementById("myDiagramDiv").scrollHeight || 500;
    const graph = new G6.Graph({
      container: "myDiagramDiv",
      width,
      height,
      fitView: true,
      modes: {
        default: ["drag-canvas", "drag-node"]
      },
      layout: {
        type: "dagre",
        rankdir: "LR",
        align: "DL",
        ranksep: 200,
        nodesepFunc: () => 1,
        ranksepFunc: () => 1
      },
      defaultNode: {
        size: [30, 20],
        type: "rect",
        style: {
          lineWidth: 2,
          stroke: "#5B8FF9",
          fill: "#C6E5FF"
        }
      },
      defaultEdge: {
        type: "polyline",
        style: {
          radius: 0,
          offset: 15,
          endArrow: true,
          lineWidth: 4,
          stroke: "#C2C8D5"
        }
      }
    });
    graph.data(data);
    graph.render();
    graph.on("node:click", function(event) {
      const { item } = event;
      const shape = event.target;
      console.log(item);
      that.dialogVisible = true;
      that.clickItemId = item.defaultCfg.id;

      // if (shape.get("className") === INNER_CIRCLE_CLASS) {
      //   // 如果点击是发生在节点里面的小圆上，则更新对应的label
      //   graph.updateItem(item, {
      //     label: "点击了圆",
      //     labelCfg: {
      //       style: {
      //         fill: "#003a8c",
      //         fontSize: 16
      //       }
      //     }
      //   });
      // }
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
</style>
