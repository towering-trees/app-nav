import express from "express"
import cors from "cors"

import router from "./router/index.js"


const app = express()

// 全局中间件：用于解决跨域问题
app.use(cors())

// 解析 post 表单数据的中间件
app.use(express.urlencoded({ extended: false }))


app.use('/api', router)

// 这里设置端口号为 3007（默认 80 端口）
app.listen(3007, () => {
    console.log("server running at http://127.0.0.1:3007")
})