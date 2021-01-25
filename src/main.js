import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(element)

//默认样式修改
import '../src/assets/style/global.css'
import '../src/assets/style/icon-font/iconfont.css'
import "../src/assets/style/public.less";
import "../src/assets/style/h5.less";


import '@/utils/rem.js';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


Vue.config.productionTip = false
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
