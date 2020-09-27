import Vue from 'vue'
import App from './App.vue'

import store from './store';
import router from './router'
import VueAxios from 'vue-axios'
import Axios from 'axios';
import i18n from './lang';
import './mock';
// 字体图标
import './assets/styles/icon.css';
import './assets/styles/gobal.scss';
// 数组不重复
import './utils/push';
import './utils/createApi';

Vue.config.productionTip = false

Vue.use(VueAxios,Axios)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
