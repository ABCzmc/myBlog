##启动数据库
  mongod --dbpath=D:\mongdb\data
  D:\MongoDB\bin>mongo
## 1.初始化项目

### １.1. 在github上创建一个博客项目
### １.2. 下载到本地并用webstorm打开
### １.3.修改.gitignore文件，并添加以下配置项
.idea是webstorm的配置文件
lib会存放我们的前端框架，比如angular bootstrap jquery
```
.idea
lib
```

### １.4. 创建 .bowerrc 配置文件
指定使用bower 安装的框架和模块下载到哪个目录下
```
{
  "directory":"./public/lib"
}
```

### １.5.创建bower配置文件
`bower.json` 用来管理前端的依赖库
项目名或者说文件夹名称不能有中文或大写字母或其它特殊字符
```
npm install bower -g
bower init
bower install bootstrap --save
```


### １.6. 初始化项目配置文件
```
npm init -y
```

### 1.7 安装 node模块
```
npm install express body-parser express-session mongoose ejs --save
```


## 2. 设计路由

## 3. 用户注册

## 4. 上传头像

## 5. 实现会话

## 6. 持久化会话

## 7. 提示功能

## 8. 用户登录

## 9. 发表文章

## 10. 文章列表

## 11. 查看文章

## 12. 删除文章

## 13. 编辑文章

## 14. 搜索、排序和分页

## 15. 发布上线
