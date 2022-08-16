import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入组件
import Login from '../components/Login';
import Home from '../views/Home';
import Welcome from '../components/Welcome';
import Users from '../views/Users';
import Classify from '../views/Classify'
import Apps from '../views/Apps';
import Slides from '../views/Slides';
import Setting from '../views/Setting';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        // 重定向路由规则
        {
            path: '*',
            redirect: '/login',
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: Welcome,
                    meta: { title: "Welcome" },
                },
                {
                    path: '/users',
                    component: Users,
                    meta: { title: "用户列表" },
                },
                {
                    path: '/classify',
                    component: Classify,
                    meta: { title: "分类列表" },
                },
                {
                    path: '/apps',
                    component: Apps,
                    meta: { title: "应用列表" },
                },
                {
                    path: '/slides',
                    component: Slides,
                    meta: { title: "轮播设置" },
                },
                {
                    path: '/setting',
                    component: Setting,
                    meta: { title: "网站设置" },
                },
            ],
        },
    ],
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router;
