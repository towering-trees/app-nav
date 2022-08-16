# 应用导航项目（PC+手机端自适应）
本项目采用前后端分离模式，前端使用 vue 开发，后端使用 vue + express + mysql 开发  
所用技术：vue2 + vant + element + nodejs + mysql + axios 等  
<img src="https://i.ibb.co/KbdGjz7/1.jpg"/>  

## 目录说明
app-nav 文件夹：前端项目文件  
app-nav-admin 文件夹：后台管理系统  
app-nav-api 文件夹：api 服务端  
app-nav.sql 文件：数据库文件  

## api 服务端使用说明：
(1). 创建数据库，并上传数据库文件  
(2). app-nav-api/app.js 中修改端口，默认端口3007  
(3). app-nav-api/db/index.js 中修改数据库信息  
(4). 执行命令：npm i  
(5). 启动项目，执行命令：node app.js  

## 前端及后台管理使用说明：
注意：分别修改 app-nav/src/main.js 和 app-nav-admin/src/http/http.js 文件中的 api 请求根地址  
(1). 执行命令：npm i  
(2). 启动项目,执行命令：npm run serve  
(3). 编译打包：npm run build  
(4). 注意：管理员账号密码：admin 123456  

