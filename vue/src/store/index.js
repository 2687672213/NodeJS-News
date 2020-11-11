import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 // this.$store.state.loginId; 使用值
  // this.$store.dispatch("changeLogin", this.value);修改值
export default new Vuex.Store({
  state: {
    loginId: null,
  },
  mutations: {
    changeLogin(state, data) {
      state.loginId = data;
    }
  },
  actions: {
    changeLogin({
      commit
    }, data) {
      commit('changeLogin', data);
    }
  }
})