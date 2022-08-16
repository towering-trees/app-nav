import axios from 'axios'

// 请求根路径
const instance = axios.create({ baseURL: 'http://127.0.0.1:3007/api' })
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use((response) => {
    return response;
}, (error) => {
    // 处理错误响应
    return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    (res) => {
        if (res.status === 200) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    },
    // 请求失败
    (error) => {
        return Promise.reject(error)
    })

export default instance
