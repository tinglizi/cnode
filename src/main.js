// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './store/index'
import { getLocal } from './util/index'

Vue.use(MuseUI);

Vue.config.productionTip = false;


if(getLocal('User')){
  store.dispatch('setUserInfo',JSON.parse(getLocal('User')));
}

if(getLocal('NoRead')){
  store.dispatch('setNoRead',getLocal('NoRead'));
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
