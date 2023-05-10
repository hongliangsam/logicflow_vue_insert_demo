<template>
  <div>
     <el-button-group>
      <el-button type="plain" size="small" @click="$_zoomIn">放大</el-button>
      <el-button type="plain" size="small" @click="$_zoomOut">缩小</el-button>
      <el-button type="plain" size="small" @click="$_zoomReset">大小适应</el-button>
      <el-button type="plain" size="small" @click="$_translateRest">定位还原</el-button>
      <el-button type="plain" size="small" @click="$_reset">还原(大小&定位)</el-button>
      <el-button type="plain" size="small" @click="$_undo" :disabled="undoDisable">上一步(ctrl+z)</el-button>
      <el-button type="plain" size="small" @click="$_redo" :disabled="redoDisable">下一步(ctrl+y)</el-button>
      <el-button type="plain" size="small" @click="$_download">下载图片</el-button>
      <el-button type="plain" size="small" @click="$_load">加载上次保存的HTML图</el-button>
      <el-button type="plain" size="small" @click="$_run">运行</el-button>
      <el-button type="plain" size="small" @click="$_catData">查看数据</el-button>
      <el-button v-if="catTurboData" type="plain" size="small" @click="$_catTurboData">查看turbo数据</el-button>
      <el-button type="plain" size="small" @click="$_showMiniMap">查看缩略图</el-button>
    </el-button-group>
  </div>
</template>
<script>
/* eslint-disable */
import { lfJson2Xml, lfXml2Json} from '@logicflow/extension';
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean
  },
  data () {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
    }
  },
  mounted () {
    this.$props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
      this.$data.undoDisable = !undoAble
      this.$data.redoDisable = !redoAble
    });
  },
  methods: {
    $_zoomIn(){
      this.$props.lf.zoom(true);
    },
    $_zoomOut(){
      this.$props.lf.zoom(false);
    },
    $_zoomReset(){
      this.$props.lf.resetZoom();
    },
    $_translateRest(){
      this.$props.lf.resetTranslate();
    },
    $_reset(){
      this.$props.lf.resetZoom();
      this.$props.lf.resetTranslate();
    },
    $_undo(){
      this.$props.lf.undo();
    },
    $_redo(){
      this.$props.lf.redo();
    },
    $_download(){
      this.$props.lf.getSnapshot();

      const json = this.$props.lf.getGraphData()
      console.log("🚀 ~ file: Control.vue ~ line 70 ~ $_download ~ json", json)
    },
    $_load(){
      // this.$props.lf.getSnapshot();
      // const data = lfJson2Xml(jsonData)
      // this.$props.lf.render(data);
      // const xml = lfJson2Xml(this.$props.lf.getGraphData())
      // console.log("🚀 ~ file: Control.vue ~ line 69 ~ $_download ~ this.$props.lf.getGraphData()", this.$props.lf.getGraphData())
      // console.log("🚀 ~ file: Control.vue ~ line 69 ~ $_download ~ xml", xml)
      let data =       {
        "nodes": [
        {
        "id": "742356ea-762b-4899-b96a-bd567e3c4361",
        "type": "start",
        "x": 220,
        "y": 170,
        "properties": {
        },
        "text": {
        "x": 220,
        "y": 205,
        "value": "sdfasf"
        }
        },
        {
        "id": "dacda6b6-48d3-4dff-911d-287704eb23d8",
        "type": "rect",
        "x": 350,
        "y": 170,
        "properties": {
        },
        "text": {
        "x": 350,
        "y": 170,
        "value": "基础节点"
        }
        },
        {
        "id": "49106603-2b88-4b2c-b1e8-723c1f2210bd",
        "type": "user",
        "x": 530,
        "y": 170,
        "properties": {
        },
        "text": {
        "x": 530,
        "y": 220,
        "value": "自定义节点"
        }
        },
        {
        "id": "647fa2bc-98ee-40cf-99c5-4756c0bc130d",
        "type": "push",
        "x": 690,
        "y": 170,
        "properties": {
        },
        "text": {
        "x": 690,
        "y": 220,
        "value": "自定义节点 可添加下一个节点/节点组"
        }
        },
        {
        "id": "37e7bac3-8804-4237-abe9-7b6065c207e9",
        "type": "download",
        "x": 690,
        "y": 320,
        "properties": {
        }
        },
        {
        "id": "6bb4396f-54c9-4b1c-b34c-87ef004f2e29",
        "type": "user",
        "x": 840,
        "y": 320,
        "properties": {
        }
        },
        {
        "id": "abf76937-63b8-493c-a978-a4a58bc4f6b8",
        "type": "push",
        "x": 840,
        "y": 470,
        "properties": {
        }
        },
        {
        "id": "b119f24f-2669-4a90-a837-afd853b2ffcc",
        "type": "end",
        "x": 990,
        "y": 320,
        "properties": {
        }
        },
        {
        "id": "60326ad9-cae2-4a85-ae98-d340fb7bd67f",
        "type": "end",
        "x": 990,
        "y": 470,
        "properties": {
        }
        },
        {
        "id": "414fe028-3609-4450-b0f4-e5aca7705e8c",
        "type": "download",
        "x": 860,
        "y": 170,
        "properties": {
        },
        "text": {
        "x": 860,
        "y": 220,
        "value": "自定义节点-设置颜色"
        }
        },
        {
        "id": "df0f8025-fa10-44f8-8cc1-464a5e1ade7b",
        "type": "VueHtmlNode",
        "x": 370,
        "y": 410,
        "properties": {
        }
        },
        {
        "id": "b8bcd64e-b63d-4538-8b7d-228befe317dc",
        "type": "VueHtmlNode",
        "x": 680,
        "y": 670,
        "properties": {
        }
        },
        {
        "id": "c6c0ef3e-7430-4efc-a0fc-5ea9a09ef5c7",
        "type": "connect",
        "x": 1410,
        "y": 610,
        "properties": {
        }
        }
        ],
        "edges": [
        {
        "id": "00f55245-513e-43a2-9cb0-adb61b01adc8",
        "type": "polyline",
        "sourceNodeId": "742356ea-762b-4899-b96a-bd567e3c4361",
        "targetNodeId": "dacda6b6-48d3-4dff-911d-287704eb23d8",
        "startPoint": {
        "x": 240,
        "y": 170
        },
        "endPoint": {
        "x": 300,
        "y": 170
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 240,
        "y": 170
        },
        {
        "x": 300,
        "y": 170
        }
        ]
        },
        {
        "id": "bbf9754f-603e-48e4-85fe-84ed44459a6a",
        "type": "polyline",
        "sourceNodeId": "dacda6b6-48d3-4dff-911d-287704eb23d8",
        "targetNodeId": "49106603-2b88-4b2c-b1e8-723c1f2210bd",
        "startPoint": {
        "x": 400,
        "y": 170
        },
        "endPoint": {
        "x": 495,
        "y": 170
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 400,
        "y": 170
        },
        {
        "x": 495,
        "y": 170
        }
        ]
        },
        {
        "id": "12bb443b-4070-4a08-ad4d-2755ee856f0d",
        "type": "polyline",
        "sourceNodeId": "49106603-2b88-4b2c-b1e8-723c1f2210bd",
        "targetNodeId": "647fa2bc-98ee-40cf-99c5-4756c0bc130d",
        "startPoint": {
        "x": 565,
        "y": 170
        },
        "endPoint": {
        "x": 655,
        "y": 170
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 565,
        "y": 170
        },
        {
        "x": 655,
        "y": 170
        }
        ]
        },
        {
        "id": "33fa3c09-9c29-4cb7-8373-67d537b8b623",
        "type": "polyline",
        "sourceNodeId": "647fa2bc-98ee-40cf-99c5-4756c0bc130d",
        "targetNodeId": "37e7bac3-8804-4237-abe9-7b6065c207e9",
        "startPoint": {
        "x": 690,
        "y": 205
        },
        "endPoint": {
        "x": 690,
        "y": 295
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 690,
        "y": 205
        },
        {
        "x": 690,
        "y": 295
        }
        ]
        },
        {
        "id": "2b5a5e89-005e-4fda-9a44-dc795050534f",
        "type": "polyline",
        "sourceNodeId": "37e7bac3-8804-4237-abe9-7b6065c207e9",
        "targetNodeId": "6bb4396f-54c9-4b1c-b34c-87ef004f2e29",
        "startPoint": {
        "x": 715,
        "y": 320
        },
        "endPoint": {
        "x": 805,
        "y": 320
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 715,
        "y": 320
        },
        {
        "x": 805,
        "y": 320
        }
        ]
        },
        {
        "id": "62b54f8a-bcfd-494b-9144-5aeb09ca77a1",
        "type": "polyline",
        "sourceNodeId": "6bb4396f-54c9-4b1c-b34c-87ef004f2e29",
        "targetNodeId": "b119f24f-2669-4a90-a837-afd853b2ffcc",
        "startPoint": {
        "x": 875,
        "y": 320
        },
        "endPoint": {
        "x": 970,
        "y": 320
        },
        "properties": {
        },
        "text": {
        "x": 920,
        "y": 310,
        "value": "Y"
        },
        "pointsList": [
        {
        "x": 875,
        "y": 320
        },
        {
        "x": 970,
        "y": 320
        }
        ]
        },
        {
        "id": "ba816d4a-5785-4911-9f78-03933f1463a1",
        "type": "polyline",
        "sourceNodeId": "6bb4396f-54c9-4b1c-b34c-87ef004f2e29",
        "targetNodeId": "abf76937-63b8-493c-a978-a4a58bc4f6b8",
        "startPoint": {
        "x": 840,
        "y": 355
        },
        "endPoint": {
        "x": 840,
        "y": 435
        },
        "properties": {
        },
        "text": {
        "x": 850,
        "y": 400,
        "value": "N"
        },
        "pointsList": [
        {
        "x": 840,
        "y": 355
        },
        {
        "x": 840,
        "y": 435
        }
        ]
        },
        {
        "id": "2b3007ed-7a13-4db7-a1ea-6691d7564c34",
        "type": "polyline",
        "sourceNodeId": "abf76937-63b8-493c-a978-a4a58bc4f6b8",
        "targetNodeId": "60326ad9-cae2-4a85-ae98-d340fb7bd67f",
        "startPoint": {
        "x": 875,
        "y": 470
        },
        "endPoint": {
        "x": 970,
        "y": 470
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 875,
        "y": 470
        },
        {
        "x": 970,
        "y": 470
        }
        ]
        },
        {
        "id": "262e2263-6c8c-4a38-b223-97848e9b5767",
        "type": "polyline",
        "sourceNodeId": "647fa2bc-98ee-40cf-99c5-4756c0bc130d",
        "targetNodeId": "414fe028-3609-4450-b0f4-e5aca7705e8c",
        "startPoint": {
        "x": 725,
        "y": 170
        },
        "endPoint": {
        "x": 835,
        "y": 170
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 725,
        "y": 170
        },
        {
        "x": 835,
        "y": 170
        }
        ]
        },
        {
        "id": "dce25f2e-9329-4a2e-ad2e-05f2c7038d66",
        "type": "polyline",
        "sourceNodeId": "dacda6b6-48d3-4dff-911d-287704eb23d8",
        "targetNodeId": "df0f8025-fa10-44f8-8cc1-464a5e1ade7b",
        "startPoint": {
        "x": 350,
        "y": 210
        },
        "endPoint": {
        "x": 370,
        "y": 345
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 350,
        "y": 210
        },
        {
        "x": 350,
        "y": 277.5
        },
        {
        "x": 370,
        "y": 277.5
        },
        {
        "x": 370,
        "y": 345
        }
        ]
        },
        {
        "id": "03fb3f61-a917-48cd-8bdf-0af2afdb5743",
        "type": "polyline",
        "sourceNodeId": "df0f8025-fa10-44f8-8cc1-464a5e1ade7b",
        "targetNodeId": "b8bcd64e-b63d-4538-8b7d-228befe317dc",
        "startPoint": {
        "x": 370,
        "y": 475
        },
        "endPoint": {
        "x": 680,
        "y": 605
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 370,
        "y": 475
        },
        {
        "x": 370,
        "y": 575
        },
        {
        "x": 680,
        "y": 575
        },
        {
        "x": 680,
        "y": 605
        }
        ]
        },
        {
        "id": "56e51906-7135-4fa9-8d35-d63c09139a92",
        "type": "polyline",
        "sourceNodeId": "b8bcd64e-b63d-4538-8b7d-228befe317dc",
        "targetNodeId": "60326ad9-cae2-4a85-ae98-d340fb7bd67f",
        "startPoint": {
        "x": 830,
        "y": 670
        },
        "endPoint": {
        "x": 970,
        "y": 470
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 830,
        "y": 670
        },
        {
        "x": 940,
        "y": 670
        },
        {
        "x": 940,
        "y": 470
        },
        {
        "x": 970,
        "y": 470
        }
        ]
        },
        {
        "id": "2906550e-85ee-4049-84e6-25b7e75794fe",
        "type": "polyline",
        "sourceNodeId": "b8bcd64e-b63d-4538-8b7d-228befe317dc",
        "targetNodeId": "c6c0ef3e-7430-4efc-a0fc-5ea9a09ef5c7",
        "startPoint": {
        "x": 680,
        "y": 735
        },
        "endPoint": {
        "x": 1110,
        "y": 610
        },
        "properties": {
        },
        "pointsList": [
        {
        "x": 680,
        "y": 735
        },
        {
        "x": 680,
        "y": 765
        },
        {
        "x": 1080,
        "y": 765
        },
        {
        "x": 1080,
        "y": 610
        },
        {
        "x": 1110,
        "y": 610
        }
        ]
        }
        ]
      }
      this.$props.lf.render(data);
    },
    $_run(){
      let graphData = this.$props.lf.getGraphData();
      console.log("🚀 ~ file: Control.vue ~ line 236 ~ $_run ~ graphData", graphData)
      graphData.edges.forEach(({ id }) => {
        this.$props.lf.openEdgeAnimation(id);
      });
    },
    $_catData(){
      this.$emit('catData');
    },
    $_catTurboData(){
      this.$emit('catTurboData');
    },
    $_showMiniMap() {
      const { lf } = this.$props;
      lf.extension.miniMap.show(lf.graphModel.width - 150, 40)
    }
  }
}
</script>
<style scoped>
</style>
