# 药管管 Pillbutler

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

1. 运行`yarn`安装所需依赖
2. 运行`yarn run build`编译前端页面
3. 在根目录下添加`.env`文件，添加配置：

```properties
DB_URI=mongodb://localhost      // 这里改为实际要连接的数据库地址
PORT=3000                       // 项目运行端口
```

4. 运行`yarn start`启动项目

## APIs

自定义类型：

```js
const User = {
  _id: ObjectId,
  username: { type: String, required: true },
  password: { type: String, required: true },
  boxes: [mongoose.SchemaTypes.ObjectId], // 用户可管理的药盒
};

const Box = {
  _id: ObjectId,
  name: String,
  sequence: { type: Number, default: 0 }, // 药盒数据版本标识
  slots: [
    // 药仓
    {
      pill: {
        // 药品信息
        name: { type: String, required: true },
        brand: String, // 品牌
        remark: String, // 备注
        amount: { type: Number, min: 0 },
        shelfLife: String, // 保质期
      },
      alarm: [
        // 定时提醒
        {
          time: { type: String, required: true },
          period: [Number], // 重复周期 0=周日
          amount: { type: Number, required: true, min: 1 },
          enabled: { type: Boolean, default: false },
        },
      ],
    },
  ],
  electricity: Number, // 电量
  settings: {}, // 药盒特殊设置
  position: {
    // 定位信息
    lng: Number,
    lat: Number,
  },
  steps: { type: Number, default: 0, min: 0 }, // 步数
};

const Pill = {
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: String,
  remark: String,
  price: Number,
};
```

| 路径                | 方法 | 输入                 | 输出   | 备注                                   |
| ------------------- | ---- | -------------------- | ------ | -------------------------------------- |
| /api/user/login     | POST | {username, password} | User   | 登录（伪），返回用户可管理的药盒       |
| /api/user/:id/boxes | GET  | -                    | Box[]  | 返回用户可管理的药盒                   |
| /api/box/:id        | GET  | -                    | Box    | 返回药盒信息                           |
| /api/box/:id        | PUT  | Box                  | Box    | 更新药盒数据，返回更新后的药盒数据     |
| /api/box/:id/:index | PUT  | Box.slots[index]     | Box    | 更新指定药仓数据，返回更新后的药盒数据 |
| /api/pill           | GET  | -                    | Pill[] | 返回商城药品列表                       |
| /api/pill/:id       | GET  | -                    | Pill   | 返回指定药品信息                       |
