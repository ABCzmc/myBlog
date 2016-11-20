//第一步引入操作mongodb数据库的模块
var mongoose = require('mongoose');
mongoose.Promise = Promise;
//连接数据库
var config = require('../config');
mongoose.connect(config.dbUrl);
//第三步定义用户的Schema 模型骨架
var UserSchema = new mongoose.Schema({
    avatar:String,
    username:String,//定义此集合的文件拥有username属性
    password:String//定义此集合的文件拥有password属性
},{collection:'user'});
//第四步 定义模型
var User = mongoose.model('User',UserSchema);//1参数模型名字，2，模型骨架
exports.User = User;

//标题title String
// 内容 content String
// 作者 user Object
// 发表时间 createAt Date
var ObjectId = mongoose.Schema.Types.ObjectId;
var ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,//定义此集合的文件拥有文件内容属性
    user:{type:ObjectId,ref:'User'},//user家的主键ID
    createAt:{type:String,default:new Date()}
},{collection:'article'});//如果没有指定集合名称，那么会默认是模型名字+=》小写+=》复数就是加s
var Article = mongoose.model('Article',ArticleSchema);
exports.Article =Article;