// 导入postModel
const { Router } = require("express")
const postModel = require("../models/post")
router.post("/",async (req,res) =>{
    try {
        const newPost = await postModel.save(req.body);
        // console.log("保存文章",req.body);
        // 这样客户端就能收到新添加的文章json数据
        res.status(201).json(newPost);
    } catch (error) {
        // 打印错误并返回状态码
        console.error(error);
        res.status(500).send();
    }
})