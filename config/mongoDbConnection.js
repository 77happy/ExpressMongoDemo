const { connect } = require("mongodb");

// 引入mongo的client实例 后面用它来连接数据库
const MongoClient = require("mongodb").MongoClient;

// 定义一个URL来保存MongoDB的连接地址
const url = "mongodb://localhost:27017";

//定义一个dbName变量来存放数据库的名字
const dbName = "myblog";

// _db用来存放连接到数据库后mongo client返回的数据库实例
// 要在选择集合的时候用到，这样定义在全局作用域里，可以复用它，节省销毁连接的时间
let _db = null;

// ansyc函数 用来连接到mongodb并选择到要操作的数据库
async function connectDb() {
    // 当_db没有值时，创建一个新的mongodb实例
    if (!_db) {
        try {
            //第二个参数是配置项目,Server Discover and Monitoring engine(服务发现和监控引擎)要过时了，避免警告
            const client = new MongoClient(url, { useUnifiedTopology: true });
            await client.connect();

            //传递数据库名字变量并将其赋给_db
            _db = await client.db(dbName)
        } catch (error) {
            throw "数据库连接出错";
        }
    };
    return _db;
}

//后面使用数据库时会使用到collection的增删改查的方法
exports.getCollection = collection => {
    // 在外城函数中保存collection实例，这样可以复用
    let col = null;

    //返回的是async函数，形成了一个闭包
    return async () => {
        if (!col) {
            try {
                //把获取的db方法保存为一个常量
                const db = await connectDb();
                // 调用把db.connection,把connection的名字传递进去，并把返回的connection保存到col中
                col = await db.collection(collection);
            } catch (error) {
                throw "选择 collection 出错"
            }
        }
        return col;
    }
}