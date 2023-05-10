<template>
  <div class="node-panel">
    <!-- <div id="app">
      <input type="text" placeholder="请输入您需要查询的内容" v-model="searchText">
      <ul>
        <li v-for="item in searchList" :key="item">{{item}}</li>
      </ul>
    </div> -->
    <el-input v-model="searchText" placeholder="请输入查询内容" style="margin-bottom: 15px;"></el-input>
    <div class="node-item"
      v-for="item in searchList"
      :key="item.text"
      @mousedown="$_dragNode(item)"
      @click="clickToSelect(item)"
      >
      <div class="node-item-icon" :class="item.class">
        <div v-if="item.type === 'user' || item.type === 'time'" class="shape"></div>
      </div>
      <span class="node-label">{{item.text}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NodePanel',
  props: {
    lf: Object,
    nodeList: Array,
  },
  data() {
    return {
      searchText: "",
    }
  },
  computed: {
    searchList: function(){
      return this.nodeList.filter((item) => {
        return item.text.match(this.searchText);
      })
    }
  },
  methods: {
    $_dragNode (item) {
      this.$props.lf.dnd.startDrag({
        type: item.type,
      })
    },
    clickToSelect(item) {
      if (item.type === 'select') {
        let _this = this;
        this.lf.openSelectionSelect();
        this.lf.once("selection:selected", () => {
          _this.lf.closeSelectionSelect();
        });
      }
      
    }
  }
}
</script>
<style>
.node-panel {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 140px;
  padding: 20px 10px;
  background-color: white;
  box-shadow: 0 0 10px 1px rgb(228, 224, 219);
  border-radius: 6px;
  text-align: center;
  z-index: 101;
}
.node-item {
  margin-bottom: 20px;
  user-select: none;
}
.node-item-icon {
  width: 30px;
  height: 30px;
  margin-left: 55px;
  background-size: cover;
}
.node-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}
.node-vue {
  background: url('../background/huoquwuliao.png') no-repeat;
  background-size: cover;
}
.node-html {
  background: url('../background/wuliao.png') no-repeat;
  background-size: cover;
}
.custom-selection {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAApxJREFUWEftmM1u00AQx2eMJbjhOtwBKY7EifIG8ASUJ6Ac4xxo3sB5gqSH2kfCE8AjlCcgN6Q4UsOduO6tElYGzeaja9exvXI2oVL24jhez/zyn8zO7qDth9cAYMFixJHrHC0/a7mo+kPbD0kmiVwH5XvbD/sEcCx9FxMm3bj9airPs4JfL5DMvvRjAQFGket0M/YK/WVVKQcMJgMkWgPOEWKC5CwXEMyBQetoACGOonbzrC5gDABPl0ZuItdZhVtXiJX8pcKphaim0QNgTQE50f7vIQDtYDLgazbjdKGr+BOADT+85OvMdd7qgpLtqvg7AOZFRFnBoyD8zoau287JLkKs4k+EmOuo2Clk6qsuWBV/D2OZ0aXUNuweFKyr4sNIEpW0r6sIv6/i71BJtlJJVEqPaoiti/Fx3GmN5PeeBaHYlPxpO2KTUjS0b7cWp0aaIhjezG1+LQPKPte+Dtr+eAiAH9kxAVw+QuhVUW4Fqh2QQ2wg/pSVYVDC5FOV2o9sABAXx06im+z/RTUkefNtP+T/4Ot7zxCHc/jbKwItPbhvA7BxMT4lxC8bbMWAMJjfmudx9yWfmVOjFDDTSxEvz4neZJW+F0qCXtRxvJU32w/lA3seawxEXtRpncsPSwHZsWlgqtuQ3Jqj7K+1+leW+SRZt0gSSKZy6MRBiehzeUTSGY/84qr3ktdLKTdYbQZvUg0yr6rNvst47VksA3ENRoL3VSER4MdOARv+5ISAvlUA/I1E3qzTGu4UkMFsP+S+4vM8SKEYgicv5PsA5H4hNzrTywngh5nbFKfLVBZXkHurUzjbjccJt53Xg5Xb1NXYuYKLMN/VZ743EN5tqs97AZQX9SL1GH4vgMtkEfW5SL29AnJ9BsTTso7aP9GfT0LnGEEPAAAAAElFTkSuQmCC") !important;
}
.isSelect .custom-selection .lf-dnd-shape {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAo1JREFUWEftmM11m0AQx2eAW0SiVCBRQZwOnAriVBCEc4/cAapA8t3CpIKkBKuCqAOggmCj3CQmb1fIXjYg2MeHn97TXtDHsvPb/zAz7GDomH8AYAj7EY+95H32uZOLqj0MHZNEkrGXoPg9cgZzIrx4/g0hplS/sfw4FOcF9nCM2m4O9LxZQKT1yNvciPOq7MmqVANOBgvCF0BEiNOdPi0C1PTdgkRAovXofjNtChgDwLtskcexlxzc3ZWLlezl3NkJUcNFz4ANBYTTUDCaDBZsp3LENd192f0q9riCoWM+sOvYSy67gpJSTW17Z8Aij6h4jCsYXZu/+DO4TK76cLGKPQ7I6ii7yuWrK1gVe6eRZrpSqo11zwo2VfE0gkQl7JsqoprWzpWklUqiUnpUXRzYby4s/+86d8D6NuAvJdbdhr80HBv7Utfh61Z2igsJwbWWyY8qIPn/zvNgNDF9QvjKDRM8kE6zOsodQDsHZC5GTfudU4aBkj6pU/uRLQCI+2Mn0aP8vKi6pCQo2DP4ocB9fprqs2OglQf3NgADx7QR4L5krRiBFmlq3Fp+zM7MuVEJKPVS9kKn6cf/IlNyJQHOLO/JPVgLHVM8sBexxoToWsunW/HPSkD+CBiY7zZsjbW828AeDsHYvvRwtkYouo5lCkL8XsMjuYjH7Ea+MBb0UmosWGtK1lwKak0WIr7zKBaBWM0ngs+1IQFWvQIG1+YVEvysARgRgGt5id8rIAMLHZP1FUclkCvSyBUTee+AgfN2ikBzGZAQvljLhJ8uc1FcQ+5Wp7BoR23H2s7iWJV1NXpXkFHl6jPLqxp9KqvPrwIo1edS9Xjqa9V/CouFjsnr8zH1XhUwq892VUftHwI0W9arhlJjAAAAAElFTkSuQmCC") !important;
}
.node-start{
  background: url('../background/start.png') no-repeat;
  background-size: cover;
}
.node-rect{
  border: 1px solid black;
}
.node-user{
  background: url('../background/user.png') no-repeat;
  background-size: cover;
}
.node-time{
  background: url('../background/time.png') no-repeat;
  background-size: cover;
}
.node-push{
  background: url('../background/push.png') no-repeat;
  background-size: cover;
}
.node-download{
  background: url('../background/download.png') no-repeat;
  background-size: cover;
}
.node-click{
  background: url('../background/click.png') no-repeat;
  background-size: cover;
}
.node-end{
  background: url('../background/end.png') no-repeat;
  background-size: cover;
}
.bpmn-start {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==) center center no-repeat;
  cursor: grab;
}
.bpmn-end {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC) center center no-repeat;
  cursor: grab;
}
.bpmn-user {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==) center center no-repeat;
  cursor: grab;
}
.bpmn-exclusiveGateway {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=) center center no-repeat;
  cursor: grab;
}
</style>
