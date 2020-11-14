// 1.引入express
const express = require('express')

// 2.实例化express
const app = express()

//4. 配置路由 传的值是路由的地址和回调函数
app.get("/",(req,res)=>{
    res.send("你好")
})
app.post("/",(req,res)=>{
    res.send("你好111")
})
//3.监听端口 表示以后要在3000端口访问express项目
app.listen(3000)