var express = require('express');
var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var session = require('express-session');//会话中间件
var MongoStore = require('connect-mongo')(session);//npm install connect-mongo --save
var bodyParser = require('body-parser');
var path = require('path');
/*global.inspect = require('util').inspect;*/
var app = express();
//当渲染模板的时候，没有指定后缀的时候自动添加此后缀来查找模板文件
app.set('view engine','html');
//指定模板的存放目录
app.set('views',path.join(__dirname,'views'));
//指定对什么类型的文件以何种方法来进行渲染
app.engine('.html',require('ejs').__express);
//静态文件中间件 指定静态文件存放的根目录的绝对路径
//  /lib/bootstrap/dist/css/bootstrap.css
app.use(express.static(path.join(__dirname,'public')));
//判断请求的URL是否是以/user开头，如果是的话则执行user中间件函数，如果不是的话，则直接跳过
//   /user/signin

//处理post请求的请求体，把查询字符串转成对象挂载到req.body
app.use(bodyParser.urlencoded({extended:true}));//不是静态文件都会走到这里//application/x-www-form-urlencoded
//app.user(bodyParser.json());//Content-Type application/json 这里是表单字符串，ajax和angular获取的需要使用json

//使用session中间件之后会有req.session属性
var config = require('./config');
app.use(session({
    secret:'zfpx',//加密cookies的秘钥
    cookie:{httpOnly:true},//httpOnly:true 客户端js无法读写cookie
    resave:true,//每次客户端访问服务器的时候都会重新保存一次新的会话对象
    saveUninitialized:true, //保存未使用过的session对象
    store:new MongoStore({
        url:config.dbUrl
    })
}));
app.use(function(req,res,next){
    //res.locals是真正渲染模板的对象 render会付给locals
    res.locals.success = req.session.success;
    res.locals.error = req.session.error;
    //把会话对象中的user属性赋值给locals.user属性
    res.locals.user = req.session.user;
    req.session.success = req.session.error = null;
    next();
});
app.use('/',index);
app.use('/user',user);
app.use('/article',article);
app.listen(9090);
