import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Down from '../views/Down.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: "应用导航首页" }
  },
  {
    path: "/download",
    name: "download",
    component: Down,
    meta: { title: "应用导航下载页" }
  }
]

const router = new VueRouter({
  routes
})

export default router
