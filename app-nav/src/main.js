import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/iconfont/iconfont.css"

import {
  Swipe,
  SwipeItem,
  Icon,
  Grid,
  GridItem,
  NoticeBar,
  Tab,
  Tabs,
  Pagination,
  NavBar
} from 'vant';

import axios from "axios"
axios.defaults.baseURL = "http://127.0.0.1:3007/api" // 这里更换 api 根地址（127.0.0.1）
Vue.prototype.$http = axios

Vue.config.productionTip = false

// vant
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(NoticeBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Pagination)
Vue.use(NavBar)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})