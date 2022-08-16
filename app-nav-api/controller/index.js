import db from "../db/index.js"

const data = {
    // 管理员登录
    loginAdmin(req, res) {
        // 判断用户名是否存在（根据用户名查询用户的数据）
        const userinfo = req.body
        const sql = "select * from admin where username=?"
        db.query(sql, userinfo.username, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: "未知错误" })
            // 判断用户名和密码是否正确
            if (results.length !== 1 || results[0].password !== userinfo.password) return res.send({ status: 1, message: "用户名或者密码不正确!" })
            // 密码正确
            res.send({
                status: 200,
                message: '登录成功！',
            })
        })
    },

    // 用户注册
    reguser(req, res) {
        // 判断用户名和密码是否合法
        const userinfo = req.body
        if (!userinfo.username || !userinfo.password) {
            return res.send({ status: 1, message: '用户名或密码不能为空！' })
        }
        // 判断用户名是否占用
        const sql = `select * from users where username=?`
        db.query(sql, [userinfo.username], function (err, results) {
            if (err) {
                return res.send({ status: 1, message: err.message })
            }
            if (results.length > 0) {
                return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            }
            // 添加新用户
            const adduser = 'insert into users set ?'
            db.query(adduser, req.body, (err, results) => {
                if (err) return res.dend({ status: 1, message: err.message })
                if (results.affectedRows !== 1) return res.send({ status: 1, message: "注册用户失败,请稍后再试" })
                res.send({ status: 200, message: "注册成功" })
            })
        })
    },
    // 用户登录
    login(req, res) {
        // 判断用户名是否存在
        const userinfo = req.body
        const sql = "select * from users where username=?"
        db.query(sql, userinfo.username, function (err, results) {
            if (err) return res.send({ status: 1, message: "未知错误" })
            if (results.length !== 1 || results[0].password !== userinfo.password) return res.send({ status: 1, message: "用户名或者密码不正确!" })
            // 密码正确
            res.send({
                status: 200,
                message: '登录成功！',
                // token: 'Bearer ' + token, // 将 Token 响应给客户端
            })
        })
    },
    // 获取用户列表
    user_list(req, res) {
        const page_num = req.query.page_num // 页数
        const page_size = req.query.page_size // 每页条数
        const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
        var sql = "select * from users limit ?,?"
        db.query(sql, params, function (err, result) {
            if (err) {
                console.log('err', err.message)
                res.send({
                    code: 1,
                    message: '查询失败'
                })
            } else {
                let sqlTotal = 'select count(*) as total from users'
                db.query(sqlTotal, function (error, among) {
                    if (error) {
                        console.log(error);
                    } else {
                        let total = among[0]['total'] // 总条数
                        res.send({
                            result: 1,
                            status: 200,
                            message: "success",
                            data: result,
                            paging: {
                                page_num: page_num,
                                page_size: page_size,
                                total: total
                            }
                        })
                    }
                })
            }
        })
    },
    // 删除用户
    del_user(req, res) {
        const sql = "delete from users where id=?"
        db.query(sql, req.body.id, (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "删除用户成功",
                })
            }
        })
    },
    // 修改用户
    update_user(req, res) {
        const sql = "update users set ? where id=?"
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "更新用户成功",
                })
            }
        })
    },

    // 获取全部应用
    list(req, res) {
        const sql = "select * from app"
        db.query(sql, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "获取列表成功",
                data: results
            })
        })
    },
    // 根据分类查询应用
    list_class(req, res) {
        const sql = "select * from app where class=?"
        db.query(sql, req.query.class, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "获取列表成功",
                data: results
            })
        })
    },
    // 根据 num 下载量从大到小排序
    hot_list(req, res) {
        const sql = "select * from app order by num desc"
        db.query(sql, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "获取列表成功",
                data: results
            })
        })
    },

    // 添加应用
    add(req, res) {
        const sql = "insert into app set ?"
        db.query(sql, req.body, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "添加成功",
            })
        })
    },
    // 删除应用
    delete(req, res) {
        const sql = "delete from app where id=?"
        db.query(sql, req.body.id, (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "删除成功",
                })
            }
        })
    },
    // 修改应用
    update(req, res) {
        const sql = "update app set ? where id=?"
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "更新成功",
                })
            }
        })
    },

    // 获取分类
    classify(req, res) {
        const sql = "select * from classify"
        db.query(sql, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "获取分类成功",
                data: results
            })
        })
    },
    // 添加分类
    addClassify(req, res) {
        console.log(req.body);
        const sql = "insert into classify set ?"
        db.query(sql, req.body, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "添加成功",
            })
        })
    },
    // 删除分类
    delClassify(req, res) {
        const sql = "delete from classify where id=?"
        db.query(sql, req.body.id, (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "删除成功",
                })
            }
        })
    },
    // 修改分类
    updateClassify(req, res) {
        const sql = "update classify set ? where id=?"
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "更新成功",
                })
            }
        })
    },

    // 网站设置
    set(req, res) {
        const sql = "select * from setting"
        db.query(sql, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "获取列表成功",
                data: results
            })
        })
    },
    // 修改网站信息
    setWebInfo(req, res) {
        const sql = "update setting set ? where id=?"
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "更新成功",
                })
            }
        })
    },

    // 获取轮播
    swiperList(req, res) {
        const sql = "select * from lunbo"
        db.query(sql, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "获取列表成功",
                data: results
            })
        })
    },
    // 添加轮播
    addSwiper(req, res) {
        console.log(req.body);
        const sql = "insert into lunbo set ?"
        db.query(sql, req.body, (err, results) => {
            if (err) return console.log(err.message);
            res.send({
                status: 200,
                msg: "添加成功",
            })
        })
    },
    // 删除轮播
    delSwiper(req, res) {
        const sql = "delete from lunbo where id=?"
        db.query(sql, req.body.id, (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "删除成功",
                })
            }
        })
    },
    // 修改轮播
    updateSwiper(req, res) {
        const sql = "update lunbo set ? where id=?"
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return console.log(err.message);
            if (results.affectedRows === 1) {
                res.send({
                    status: 200,
                    msg: "更新成功",
                })
            }
        })
    },

    // 分页查询
    allList(req, res) {
        const page_num = req.query.page_num
        const page_size = req.query.page_size
        const params = [(parseInt(page_num) - 1) * parseInt(page_size), parseInt(page_size)]
        var sql = "select * from app limit ?,?"
        db.query(sql, params, function (err, result) {
            if (err) {
                console.log('err', err.message)
                res.send({
                    code: 1,
                    message: '查询失败'
                })
            } else {
                let sqlTotal = 'select count(*) as total from app'
                db.query(sqlTotal, function (error, among) {
                    if (error) {
                        console.log(error);
                    } else {
                        let total = among[0]['total']
                        res.send({
                            result: 1,
                            status: 200,
                            message: "success",
                            data: result,
                            paging: {
                                page_num: page_num,
                                page_size: page_size,
                                total: total
                            }
                        })
                    }
                })
            }
        })
    }
}

export default data