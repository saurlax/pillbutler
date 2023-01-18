# 药管管Pillbutler

![](https://img.shields.io/badge/Koa-grey)
![](https://img.shields.io/badge/MongoDB-green)
![](https://img.shields.io/badge/React-blue)
![](https://img.shields.io/badge/AntDesign-blue)

## 项目简介
药管管，视障人群患者口服药物伴侣。本项目需要配合硬件使用。

前后端分离项目，前端项目位于`views`文件夹内。

- 账号登录，多个账号可管理多个药盒
- 药盒管理，可分别设置每个药盒的药品名字、品牌、备注、数量、保质期
- 定时提醒，可设置每个药品每天服用的时间和用量
- 用药统计，可查看药品服用记录
- 定位和运动，可查看药盒位置和药盒计步数
- 发现与商场，可一键获取健康文章、购买药品

## 如何启动项目
1. 分别在根目录和`views`目录下运行`yarn`来安装所需依赖
2. 运行`yarn run build`来编译前端页面
3. 在根目录下添加`.env`文件，添加配置：
```properties
DB_URI=mongodb://localhost      // 这里改为实际要连接的数据库地址
PORT=3000                       // 项目运行端口
```
4. 运行`yarn start`启动项目