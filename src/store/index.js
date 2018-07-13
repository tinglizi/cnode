import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    mutations
  }
});

export default store;
