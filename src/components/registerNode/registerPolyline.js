/* eslint-disable */
// import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";


export default function registerPolyline (lf) {
  lf.register('polyline', ({ PolylineEdge, PolylineEdgeModel }) => {
    class ConnnectionModel extends PolylineEdgeModel {
      constructor (data, graphModel) {
        super(data, graphModel)
      }
    }

    class CustomEdgeModel extends PolylineEdgeModel {
      // customTextPosition = true;
      initEdgeData(data) {
        super.initEdgeData(data);
        // this.customTextPosition = true;
      }
      // setAttributes() {
      //   this.isAnimation = true;
      // }
      getEdgeAnimationStyle() {
        const style = super.getEdgeAnimationStyle();
        style.strokeDasharray = "5 5";
        style.strokeDashoffset = '100%';
        style.animationDuration = "10s";
        style.stroke = '#ff7f0e';
        style.animationName = 'lf_animate_dash'
        console.log("🚀 ~ file: registerPolyline.js ~ line 28 ~ CustomEdgeModel ~ getEdgeAnimationStyle ~ style", style)
        // style.animationTimingFunction = 'ease'
        return style;
      }
      getEdgeStyle() {
        const style = super.getEdgeStyle();
        style.strokeWidth = 2;
        style.stroke = '#999';
        return style;
      }
      // getEdgeStyle() {
      //   const style = super.getEdgeStyle();
      //   style.stroke = 'blue';
      //   style.strokeDasharray = '3 3';
      //   return style;
      // }
    }
    
    class CustomEdge extends PolylineEdge {}
    return {
      view: CustomEdge,
      model: CustomEdgeModel
    }
  })
}
