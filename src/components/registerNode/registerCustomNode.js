/* eslint-disable */
import { HtmlNode, HtmlNodeModel } from "@logicflow/core";

// class ButtonNode extends HtmlNode {
//   setHtml(rootEl) {
//     const { properties } = this.props.model;

//     const el = document.createElement("div");
//     el.className = "uml-wrapper";
//     const html = `
//       <div>
//         <div class="uml-head">Head</div>
//         <div class="uml-body">
//           <div><button onclick="setData()" onmousedown="stop(arguments[0])">+</button> ${properties.name}</div>
//           <div>${properties.body}</div>
//         </div>
//         <div class="uml-footer">
//           <div>setHead(Head $head)</div>
//           <div>setBody(Body $body)</div>
//         </div>
//       </div>
//     `;
//     el.innerHTML = html;
//     rootEl.innerHTML = "";
//     rootEl.appendChild(el);
//     window.stop = (ev) => {
//       ev.stopPropagation();
//     };
//     window.setData = () => {
//       const { graphModel, model } = this.props;
//       graphModel.eventCenter.emit("custom:button-click", model);
//     };
//   }
// }

// class ButtonNodeModel extends HtmlNodeModel {
//   setAttributes() {
//     this.width = 300;
//     this.height = 130;
//     this.text.editable = false;
//   }
// }

// export default {
//   type: "button-node",
//   view: ButtonNode,
//   model: ButtonNodeModel
// };

export default function registerCustomNode (lf) {
  lf.register('customNode', ({ PolygonNode, PolygonNodeModel, h }) => {
    class ButtonNode extends HtmlNode {
      setHtml(rootEl) {
        // const { properties } = this.props.model;
        let properties = {
          name: "hello",
          body: "world"
        };
    
        const el = document.createElement("div");
        el.className = "uml-wrapper";
        const html = `
          <div>
            <div class="uml-head">Head</div>
            <div class="uml-body">
              <div><button onclick="setData()" onmousedown="stop(arguments[0])">+</button> ${properties.name}</div>
              <div>${properties.body}</div>
            </div>
            <div class="uml-footer">
              <div>setHead(Head $head)</div>
              <div>setBody(Body $body)</div>
            </div>
          </div>
        `;
        el.innerHTML = html;
        rootEl.innerHTML = "";
        rootEl.appendChild(el);
        window.stop = (ev) => {
          ev.stopPropagation();
        };
        window.setData = () => {
          properties.body = 'LogicFlow';
          el.innerHTML = html;
          rootEl.innerHTML = "";
          rootEl.appendChild(el);
          
          console.log("🚀 ~ file: registerCustomNode.js ~ line 188 ~ ButtonNode ~ setHtml ~ properties", properties)
          const { graphModel, model } = this.props;
          graphModel.eventCenter.emit("custom:button-click", model);
        };
      }
    }
    
    class ButtonNodeModel extends HtmlNodeModel {
      setAttributes() {
        this.width = 300;
        this.height = 130;
        this.text.editable = false;
      }
    }

    return {
      type: "button-node",
      view: ButtonNode,
      model: ButtonNodeModel
    }
  })
}

