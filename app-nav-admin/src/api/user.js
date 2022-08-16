import axios from '@/http/http.js'
import Qs from 'qs'

const userApi = {
    // 管理员登录
    loginAdmin(data) {
        return axios.post("/login_admin", Qs.stringify(data))
    },

    // 用户登录
    login(data) {
        return axios.post("/login", Qs.stringify(data))
    },
    // 用户注册
    reguser(data) {
        return axios.post("/reguser", Qs.stringify(data))
    },
    // 用户列表
    userList(data) {
        return axios.get("/user_list", data)
    },
    // 删除用户
    delUser(data) {
        return axios.post("/del_user", Qs.stringify(data))
    },
    // 修改用户
    edit_user(data) {
        return axios.post("/update_user", Qs.stringify(data))
    },

    // 获取应用
    get_apps(data) {
        return axios.get("/getAll", data)
    },
    // 添加应用
    add_app(data) {
        return axios.post('/add', Qs.stringify(data))
    },
    // 修改应用
    edit_app(data) {
        return axios.post("/update", Qs.stringify(data))
    },
    // 删除应用
    delete_app(data) {
        return axios.post("/delete", Qs.stringify(data))
    },
    
    // 获取分类
    getClassify(data) {
        return axios.get("/classify", data)
    },
    // 添加分类
    addClassify(data) {
        return axios.post("/add_classify", Qs.stringify(data))
    },
    // 删除分类
    delClassify(data) {
        return axios.post("/del_classify", Qs.stringify(data))
    },
    // 修改分类
    editClassify(data) {
        return axios.post("/update_classify", Qs.stringify(data))
    },

    // 获取网站信息
    getWebInfo(data) {
        return axios.get("/set", data)
    },
    // 修改网站信息
    setWebInfo(data) {
        return axios.post("/set_web", Qs.stringify(data))
    },

    // 获取轮播
    getSwiper(data) {
        return axios.get("/swiper_list", data)
    },
    // 添加轮播
    addSwipwe(data) {
        return axios.post("/add_swiper", Qs.stringify(data))
    },
    // 删除轮播
    delSwiper(data) {
        return axios.post("/del_swiper", Qs.stringify(data))
    },
    // 修改轮播
    editSwiper(data) {
        return axios.post("/update_swiper", Qs.stringify(data))
    }
}

export default userApi