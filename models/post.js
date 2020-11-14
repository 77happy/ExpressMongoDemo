// 引入getConnection 方法，再把集合的名字传进去,他会返回一个async的函数
// 若未创建集合，mongodb会自动生成
const postCollection = require("../config/mongoDbConnection").getCollection("postCollection");


// 导出一个async的函数,接收的参数是要保存文章的对象
exports.save = async(post) =>{
    try {
        const col = await postCollection();
        //添加一条数据到数据库中
        const result = await col.insertOne(post);
        //返回result.ops的记录，此处只有一条，所以返回第一个就可以了
        return result.ops && result.ops[0];
    } catch (error) {
        throw "添加文章到数据库失败";
    }
}