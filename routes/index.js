var express = require('express');
var router = express.Router();
var Article = require('../model').Article;
router.get('/',function(req,res){
    //希望articles中的user属性从字符串转成对象 populate用来将对应的属性从ObjectId转成对应的对象
    Article.find({}).populate('user').exec(function(err,articles){
        //console.log(articles);
      /*  articles.forEach(function(article){
            User.findById(article.user,function(err,userObj){
                article.user = userObj;
            })
        });*/
        res.render('index',{title:'首页',articles});
    });
});
module.exports = router;