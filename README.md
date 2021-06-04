# 关于expressapi
expressapi代码仓库用来共享小林在Youtube频道`小林方程式`中的nodejs express mysql和redis搭建api接口的课程代码。

# 如何使用
* 下载expressapi的代码至本地
* 如果本机没有安装mysql postgres, 请进入docker目录，按照README文档在docker上安装mysql和postgres
* 复制.env.template文件并重命名为.env
* 在.env里填入你的mysql, postgres数据库连接信息
* 运行 `npm install` 安装好所有依赖包
* 然后运行`node db/mysql.js`， `node db/mysqlpool.js`, `node db/pg.js`, `node db/pgpool.js`测试代码

# Youtue教程地址
https://youtu.be/TLJVwFPObUA
