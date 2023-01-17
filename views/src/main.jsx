import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

window.serverUrl = "https://api.pillbutler.saurlax.com";

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    D: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][
      this.getDay()
    ],
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

Date.prototype.friendly = function () {
  let diff = Date.now() - this;
  if (diff >= 0) {
    if (diff < 60000) return "几秒钟前";
    if (diff < 3600000) return parseInt(diff / 60000) + "分钟前";
    if (diff < 86400000) return parseInt(diff / 3600000) + "小时前";
    if (diff < 172800000) return "昨天";
  } else {
    if (diff > -60000) return "几秒钟后";
    if (diff > -3600000) return parseInt(diff / 60000) + "分钟后";
    if (diff > -86400000) return parseInt(diff / 3600000) + "小时后";
    if (diff > -172800000) return "明天";
  }
  if (this.getYear() == new Date().getYear()) return this.format("MM-dd");
  return this.format("yyyy-MM-dd");
};

Number.prototype.friendly = function () {
  return this > 10000 ? (this / 10000).toFixed(1) + "w" : this.toFixed(1);
};

window.updateData = async () => {
  const boxes = await axios.get(
    `${serverUrl}/user/${localStorage.getItem("user")}/boxes`
  );
  let data = [];
  for (let i = 0; i < boxes.data.length; i++) {
    let box = await axios.get(serverUrl + "/box/" + boxes.data[i]);
    data.push(box.data);
  }
  localStorage.setItem("boxesData", JSON.stringify(data));

  console.log(boxes.data, data);
  return data;
};

window.loadData = async () => {
  let data = JSON.parse(localStorage.getItem("boxesData"));
  if (!data) {
    data = await updateData();
  }
  return data;
};

window.pushData = async (id, data, index) => {
  const res = await axios.put(
    serverUrl + "/box/" + id + (index ? `/${index}` : ""),
    data
  );
  await updateData();
  return res.data;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

updateData();