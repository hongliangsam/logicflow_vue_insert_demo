import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lf: null,
  },
  mutations: {
    SET_INSTANCE(state, data) {
      state.lf = null;
      state.lf = data;
    },
  }
})

export default store