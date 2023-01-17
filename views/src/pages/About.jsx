import { Card } from 'antd-mobile'

function About() {
  return (
    <Card style={{ textAlign: 'center', wordBreak: 'break-all' }}>
      <h3>药管管@宝中科创</h3>
      <h4>第三方信息共享清单</h4>
      <p style={{ textAlign: 'left' }}>
        <div><b>SDK名称</b>：移动推送 TPNS SDK</div>
        <div><b>第三方名称</b>：深圳市腾讯计算机系统有限公司</div>
        <div><b>SDK用途</b>：在移动终端设备进行消息推送</div>
        <div><b>收集个人信息类型</b>：设备信息(手机型号，系统类型、系统版本等)用于标签化推送以及识别是否是真机、网络信息(网络类型)支持根据不同网络类型进行不同类型推送、账号绑定信息(根据您所选用的不同推送渠道，QQ号、微信Union ID、 手机号、邮箱等)用于根据账号信息进行推送。</div>
        <div><b>数据处理方式</b>：通过去标识化、加密传输及其他安全方式</div>
        <div><b>官网链接</b>：<a href='https://cloud.tencent.com/product/tpns'>https://cloud.tencent.com/product/tpns</a></div>
        <div><b>隐私政策链接</b>：<a href='https://privacy.qq.com/document/preview/8565a4a2d26e480187ed86b0cc81d727'>https://privacy.qq.com/document/preview/8565a4a2d26e480187ed86b0cc81d727</a></div>
      </p>
      <p>2022 © Saurlax. All rights reserved.</p>
    </Card>
  )
}

export default About