import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/fonts/iconfont.css'; // 字体图标
import './plugins/element.js'; // element-ui 按需引入

// 引入 api 统一处理的模块
import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
