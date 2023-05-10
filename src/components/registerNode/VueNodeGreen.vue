<template>
  <div :class="otherTheme ? 'uml-wrapper' : 'uml-wrapper_two'">
    <div class="uml-head">
      Siemens
      <div style="margin-left: 15px">
        <button @click.stop="addNumber($event)">
          +
        </button> {{nodeNumber}}</div>
    </div>
    <div class="uml-body">
      <div>
        <el-image
        style="width: 100px; height: 85px"
        :src="url"
        :fit="fit"></el-image>
      </div>
      <div style="display: flex;align-items: center;justify-content: center;">
        酶标仪
      </div>
    </div>
    <!-- <div class="uml-footer">
      <div>Head</div>
      <div>Body</div>
    </div> -->
  </div>
</template>

<script>
import mby from '../../assets/mby.jpg'

export default {
  props: {
    properties: {
      type: Object,
      default: () => ({
        t: 1,
        style: {}
      })
    },
    text: String,
  },
  data () {
    return {
      fit: 'fill',
      url: mby,
      showTitle: '',
      increaseFactor: 0,
      nodeNumber: 12,
      otherTheme: true
    }
  },
  emits: ['btnClick'],
  mounted () {
    console.log(this);
  },
  methods: {
    addNumber(ev) {
      console.log("🚀 ~ file: VueNodeGreen.vue ~ line 40 ~ addNumber ~ ev", ev)
      ev.stopPropagation();
      this.nodeNumber ++;
      this.otherTheme = !this.otherTheme
    }
  },
  watch: {
    'properties.t': {
      handler (val) {
        this.increaseFactor = val
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.uml-wrapper {
  background: #68fce2;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid #838382;
  box-sizing: border-box;
}
.uml-wrapper_two {
  background: #38ce24;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid #838382;
  box-sizing: border-box;
}
.uml-head {
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.uml-body {
  border-top: 1px solid #838382;
  border-bottom: 1px solid #838382;
  padding: 5px 10px;
  font-size: 28px;
  color: #0a4a78;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.uml-footer {
  padding: 5px 10px;
  font-size: 14px;
}
</style>