/* eslint-disable */
import { HtmlNode, HtmlNodeModel } from "@logicflow/core";
// import { createApp, h } from 'vue';
import Vue from 'vue'
// import VueNode from './VueNode.vue';
import VueNode from './VueNodeGreen.vue';
import store from '@/store'


let getgraphModel;

class VueHtmlNode extends HtmlNode {
  constructor (props) {
    super(props)
    this.isMounted = false
    // this.r = h(VueNode, {
    //   properties: props.model.getProperties(),
    //   text: props.model.inputData,
    //   onBtnClick: (i) => {
    //     this.r.component.props.text = String(Number(this.r.component.props.text) + Number(i))
    //   }
    // })

    const { graphModel } = props;
    getgraphModel = graphModel

    this.app = new Vue({
      render: h => h(VueNode, {
        properties: props.model.getProperties(),
        text: props.model.inputData,
        onBtnClick: (i) => {
          this.r.component.props.text = String(Number(this.r.component.props.text) + Number(i))
        }
      })
    })
  }
  setHtml(rootEl) {
    if (!this.isMounted) {
      this.isMounted = true
      const node = document.createElement('div')
      rootEl.appendChild(node)
      this.app.$mount(node)
    }
  }
  getText () {
    return null
  }
}

class VueHtmlNodeModel extends HtmlNodeModel {
  // setAttributes() {
  //   this.width = 300;
  //   this.height = 100;
  //   this.text.editable = false;
  //   this.inputData = this.text.value
  // }
  // getOutlineStyle() {
  //   const style = super.getOutlineStyle();
  //   style.stroke = 'none';
  //   style.hover.stroke = 'none';
  //   return style;
  // }
  // getDefaultAnchor() {
  //   return []
  // }
  getData () {
    const data = super.getData()
    // data.text.value = this.inputData
    return data
  }
  setAttributes() {
    this.width = 300;
    this.height = 130;
    this.text.editable = false;

    // this.menu = [
    //   {
    //     text: '侧边栏',
    //     callback: (node) => {
    //       console.log("🚀 ~ file: VueHtmlNode.js ~ line 141 ~ registerCustomNode ~ node", node)
    //       // getgraphModel.deleteNode(node.id);
    //       getgraphModel.eventCenter.emit('vue:click', node);
    //     },
    //   },
    //   {
    //     text: '属性',
    //     callback(node) {
    //       alert(`
    //         节点id：${node.id}
    //         节点类型：${node.type}
    //         节点坐标：(x: ${node.x}, y: ${node.y})`
    //       );
    //     },
    //   },
    // ]
  }
  initNodeData(data) {
    super.initNodeData(data);
    const getEdgeCountValidte = (type = 'source', count) => {
      return (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        const getEdgeKey = type === 'target' ? 'targetNodeId' : 'sourceNodeId';
        const nodeId = type === 'target' ? targetNode.id : sourceNode.id;
        const edges = store.state.lf.getEdgeModels({ [getEdgeKey]: nodeId });
        return edges.length < count;
      };
    };
    const notSelf = {
      message: '连线的起点和终点不能是组件本身',
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return sourceNode.id !== targetNode.id;
      }
    };
    const onceOut = {
      message: "以该组件为起始的连线只允许一条",
      validate: getEdgeCountValidte('source', 1)
    };
    const onceIn = {
      message: '以该组件为终点的连线只允许一条',
      validate: getEdgeCountValidte('target', 1)
    };
    /* 连线规则：入一出一 */
    this.sourceRules.push(notSelf, onceOut);
    this.targetRules.push(onceIn);

    // TODO 解决节点之前不能重叠的问题
    // this.moveRules.push((model, deltaX, deltaY) => {
    //   console.log("🚀 ~ file: index.js:63 ~ NormalNodeModel ~ this.moveRules.push ~ model", model, deltaX, deltaY)
    //   // 不允许移动到坐标为负值的地方
    //   if (
    //     model.x + deltaX - this.width / 2 < 0 ||
    //     model.y + deltaY - this.height / 2 < 0
    //   ) {
    //     return false;
    //   }
    //   return true;
    // });
  }
  getConnectedSourceRules () {
    const rules = super.getConnectedSourceRules()
    // const notAsTarget = {
    //   message: '终止节点不能作为连线的起点',
    //   validate: () => false
    // }
    // rules.push(notAsTarget)

    const geteWayOnlyAsTarget = {
      message: 'Vue节点不能连入HTML节点！',
      validate: (source, target, sourceAnchor, targetAnchor) => {
        console.log("🚀 ~ file: registerEnd.js ~ line 107 ~ EndModel ~ getConnectedSourceRules ~ targetAnchor", targetAnchor)
        console.log("🚀 ~ file: registerEnd.js ~ line 107 ~ EndModel ~ getConnectedSourceRules ~ sourceAnchor", sourceAnchor)
        console.log("🚀 ~ file: registerEnd.js ~ line 107 ~ EndModel ~ getConnectedSourceRules ~ target", target)
        console.log("🚀 ~ file: registerEnd.js ~ line 107 ~ EndModel ~ getConnectedSourceRules ~ source", source)
        let isValid = true;
        if (target.type === "customNode") {
          isValid = false;
        }
        return isValid;
      },
    };
    rules.push(geteWayOnlyAsTarget);
    return rules
  }
}

// export default {
//   type: 'vue-html',
//   model: VueHtmlNodeModel,
//   view: VueHtmlNode
// }

export default function registerVueHtmlNode (lf) {
  // // 为菜单追加选项（必须在 lf.render() 之前设置）
  // lf.extension.menu.addMenuConfig({
  //   nodeMenu: [
  //     {
  //       text: '侧边栏',
  //       callback: (node) => {
  //         console.log("🚀 ~ file: VueHtmlNode.js ~ line 141 ~ registerCustomNode ~ node", node)
  //         // getgraphModel.deleteNode(node.id);
  //         getgraphModel.eventCenter.emit('vue:click', node);
  //       },
  //     },
  //     {
  //       text: '属性',
  //       callback(node) {
  //         alert(`
  //           节点id：${node.id}
  //           节点类型：${node.type}
  //           节点坐标：(x: ${node.x}, y: ${node.y})`
  //         );
  //       },
  //     },
  //   ],
  //   edgeMenu: [
  //     {
  //       text: '属性',
  //       callback(edge) {
  //         alert(`
  //           边id：${edge.id}
  //           边类型：${edge.type}
  //           边坐标：(x: ${edge.x}, y: ${edge.y})
  //           源节点id：${edge.sourceNodeId}
  //           目标节点id：${edge.targetNodeId}`
  //         );
  //       },
  //     },
  //   ],
  //   graphMenu: [
  //     {
  //       text: '分享',
  //       callback() {
  //         alert('分享成功！');
  //       }
  //     },
  //   ],
  // });

  lf.register('VueHtmlNode', ({ PolygonNode, PolygonNodeModel, h }) => {


    return {
      model: VueHtmlNodeModel,
      view: VueHtmlNode
    }
  })
}