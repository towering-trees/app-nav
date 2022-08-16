import mysql from "mysql"

const db = mysql.createPool({
    host: "127.0.0.1", // 数据库地址
    user: "root", // 数据库用户名
    password: "root", // 数据库密码
    database: "app_nav", // 数据库名
    prot: 3306, // 数据库端口
})

export default db