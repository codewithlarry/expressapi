# 关于expressapi
expressapi代码仓库用来共享小林在Youtube频道`小林方程式`中的nodejs express mysql和redis搭建api接口的课程代码。

# 如何使安装
* 下载expressapi的代码至本地
* 如果本机没有安装mysql postgres, 请进入docker目录，按照README文档在docker上安装mysql和postgres
* 复制.env.template文件并重命名为.env
* 在.env里填入你的mysql, postgres数据库连接信息
* 运行 `npm install` 安装好所有依赖包

# 运行命令
## 数据库连接和连接池
### 命令
`node db/mysql.js`， `node db/mysqlpool.js`, `node db/pg.js`, `node db/pgpool.js`
### youtue视频
https://youtu.be/TLJVwFPObUA

## sequelize新建变更表和执行crud操作
`node db`
### youtue视频
https://youtu.be/YHbWPzW1hy8 

https://youtu.be/jnNU3I-iuv8


## 启动API服务
`node .` 或者 `node index.js`
### youtube视频
https://youtu.be/yQvGbocoWqE

## API错误处理
https://youtu.be/u3-WAGEn0W8







