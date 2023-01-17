const fs = require("fs");
const koa = require("koa");
const cors = require("koa-cors");
const router = require("koa-router");
const static = require("koa-static");
const bodyparser = require("koa-bodyparser");
const mongoose = require("mongoose");
const Box = require("./models/BoxModel");
const User = require("./models/UserModel");
const Drug = require("./models/DrugModel");

require("dotenv").config();
const app = new koa();
const route = new router();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URI);

route.post("/api/user/login", async (ctx) => {
  // 登录
  const body = ctx.request.body;
  ctx.body = await User.findOne({
    username: body.username,
    password: body.password,
  });
});
route.get("/api/user/:id/boxes", async (ctx) => {
  // 获取用户拥有的药盒
  const user = await User.findById(ctx.params.id);
  ctx.body = user.boxes;
});
route.get("/api/box/:id", async (ctx) => {
  // 获取药盒信息
  ctx.body = await Box.findById(ctx.params.id);
});
route.put("/api/box/:id", async (ctx) => {
  // 更新药盒信息
  let box = await Box.findOneAndUpdate(ctx.params.id, ctx.request.body, {
    new: true,
  });
  box.sequence++;
  box.slots = box.slots.map((slot) => {
    slot.alarm = slot.alarm.map((alarm) => {
      alarm.period = [...new Set(alarm.period)].sort();
      return alarm;
    });
    return slot;
  });
  ctx.body = await box.save();
});
route.put("/api/box/:id/:index", async (ctx) => {
  // 更新药盒指定药仓的信息
  let box = await Box.findById(ctx.params.id);
  box.slots[ctx.params.index] = {
    ...box.slots[ctx.params.index],
    ...ctx.request.body,
  };
  box.sequence++;
  box.slots = box.slots.map((slot) => {
    slot.alarm = slot.alarm.map((alarm) => {
      alarm.period = [...new Set(alarm.period)].sort();
      return alarm;
    });
    return slot;
  });
  ctx.body = await box.save();
});
route.get("/api/drug", async (ctx) => {
  // 获取药品列表
  ctx.body = await Drug.find();
});
route.get("/api/drug/:id", async (ctx) => {
  // 获取指定药品
  ctx.body = await Drug.findOne({ _id: ctx.params.id });
});

app.use(cors());
app.use(new bodyparser({ strict: false }));
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = e.message;
  }
});

app.use(route.routes()).use(route.allowedMethods());
app.use(static("public"));
app.use(async (ctx) => {
  console.log(ctx.body, ctx.code);
  if (!ctx.path.includes("/api") && ctx.body == null) {
    ctx.type = "html";
    ctx.body = fs.readFileSync("./public/index.html");
  }
});

process.on("uncaughtException", (e) => {
  console.error(e);
});

const port = process.env.PORT ?? 3000;

app.listen(port);
console.log(`Server started at http://localhost:${port}/`);
