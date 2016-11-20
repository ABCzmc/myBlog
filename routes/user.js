//创建一个处理用户相关路由的路由中间件
var express = require('express');
//当require是一个文件夹的时候,默认找index.js
var User = require('../model').User;
var util = require('util');
var multer = require('multer');//npm install multer --save
var upload = multer({dest:'public/'});
var auth = require('../auth');
//创建一个路由中间件的实例
var router = express.Router();
//它也是一个路由的容器，里面可以定义很多路由
//   /signin
router.get('/signup',auth.checkNotLogin,function(req,res){
    res.render('user/signup',{title:'用户注册'});
});
//处理提交的用户注册表单 username=zfpx&age=9{username:'zfpx',age:9}
router.post('/signup',auth.checkNotLogin,upload.single('avatar'),function(req,res){//upload.single('avatar')上传文件只有一个的时候可以用
   /* console.log(req.body);
    console.log(req.file);*/
    var user = req.body;//
    user.avatar = '/'+req.file.filename;
    User.findOne({username:user.username},function(err,doc){
        if(err){
            req.session.error = util.inspect(err);
            res.redirect('back');
        }else{
            if(doc){
                //code表示失败 ok表示成功 data代表数据
                //res.send({code:'fail',data:'此用户名已经被占用，请更换'});//前后端分离适用

                //跳回到上一个页面，从哪来，回哪去
                req.session.error = '此用户名已经被占用，请选择其它用名';
                res.redirect('back');//跳转页面
            }else{
                User.create(user,function(err,doc){
                    if(err){//数据库连接、数据类型。。。导致不成功
                        req.session.error = util.inspect(err);
                        res.redirect('back');
                    }else{
                        req.session.success = '恭喜你注册成功,欢迎登录';
                        res.redirect('/user/signin');//相对路径
                    }
                });
            }
        }
    })
});
router.get('/signin',auth.checkNotLogin,function(req,res){//登录
    res.render('user/signin',{title:'用户登录'});
});
router.post('/signin',auth.checkNotLogin,function(req,res){//处理用户登录
   var user =req.body;
    User.findOne(user,function(err,doc){//find返回的数组,没有返回[]，所以结果都是true，findOne返回对象
        if(err){
            req.session.error = util.inspect(err);
            res.redirect('back');
        }else{
            if(doc){
                req.session.success ='登录成功';
                req.session.user = doc;//doc是findOne的用户名密码
                res.redirect('/');
            }else{
                req.session.error ='用户名或密码不正确';
                res.redirect('back');
            }
        }
    })
});
router.get('/signout',auth.checkLogin,function(req,res){//退出
    req.session.user = null;
    req.session.success = '你已退出登录';
    res.redirect('/');
});
module.exports = router;

