<template>
  <div class="connect">

    <video v-if="isShow === true" class="video" controls  width="500" height="500" style="margin-top:15px;">
      <source src="../../assets/yy.mp4" type="video/mp4" />
    </video>
    <div v-else-if="isShow === false" class="die">
      你挂了
    </div>
    <p>您好，请问需要买保险吗？</p>
    <div class="button-list">
      <button @mousedown.stop="alive()">有保险了</button>
      <button @mousedown.stop="goDie()">不需要</button>
      <button @mousedown.stop="done(3)">需要</button>
      <button @mousedown.stop="done(4)">特殊</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    done(type) {
      this.$emit('select-button', type)
    },
    goDie() {
      this.isShow = false
    },
    alive() {
      this.isShow = true
    }
  }
}
</script>

<style scoped>
.connect {
  width: 100%;
  height: 100%;
  background: #FFF;
  border: 1px solid #9a9a9b;
  box-sizing: border-box;
  padding: 10px;
}
.connect p {
  margin: 0;
}
.button-list {
  position: absolute;
  bottom: 10px;
}
.video {
  font-size: 166px;
  color: aqua;
  width: 600px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.die {
  font-size: 166px;
  color: red;
  width: 600px;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>