import { Card } from "antd-mobile";

function About() {
  return (
    <Card style={{ textAlign: "center", wordBreak: "break-all" }}>
      <h3>药管管@宝中科创</h3>
      <div style={{ textAlign: "left", margin: "auto", maxWidth: "600px" }}>
        <p>药管管，视障人群患者口服药物伴侣。本项目需要配合硬件使用。</p>
        <div>
          <b>特色功能：</b>
        </div>
        <div>账号登录，多个账号可管理多个药盒；</div>
        <div>
          药盒管理，可分别设置每个药盒的药品名字、品牌、备注、数量、保质期；
        </div>
        <div>定时提醒，可设置每个药品每天服用的时间和用量；</div>
        <div>用药统计，可查看药品服用记录；</div>
        <div>定位和运动，可查看药盒位置和药盒计步数；</div>
        <div>发现与商场，可一键获取健康文章、购买药品。</div>
        <p>
          源代码请见<a href="https://github.com/saurlax/pillbutler">GitHub</a>。
        </p>
      </div>
      <p>Copyright © 2022-2023 Saurlax</p>
    </Card>
  );
}

export default About;
