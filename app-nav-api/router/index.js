// 封装用户信息相关的路由模块

import express from "express"
const router = express.Router()
// 导入自封装的模块
import data from "../controller/index.js"
// 管理员登录
router.post("/login_admin", data.loginAdmin)

// 用户注册
router.post("/reguser", data.reguser)
// 用户登录
router.post("/login", data.login)
// 用户列表
router.get("/user_list", data.user_list)
// 删除用户
router.post("/del_user", data.del_user)
// 修改用户
router.post("/update_user", data.update_user)

// 应用列表
router.get("/list", data.list)
// 添加应用
router.post("/add", data.add)
// 删除应用
router.post("/delete", data.delete)
// 修改应用
router.post("/update", data.update)
// 根据分类查询应用
router.get("/list_class", data.list_class)
// 下载量排行
router.get("/hot_list", data.hot_list)

// 获取分类
router.get("/classify", data.classify)
// 添加分类
router.post("/add_classify", data.addClassify)
// 删除分类
router.post("/del_classify", data.delClassify)
// 修改分类
router.post("/update_classify", data.updateClassify)

// 网站信息
router.get("/set", data.set)
// 网站信息修改
router.post("/set_web", data.setWebInfo)

// 获取轮播
router.get("/swiper_list", data.swiperList)
// 添加轮播
router.post("/add_swiper", data.addSwiper)
// 删除轮播
router.post("/del_swiper", data.delSwiper)
// 修改轮播
router.post("/update_swiper", data.updateSwiper)

// 分页查询
router.get("/getAll", data.allList)

export default router