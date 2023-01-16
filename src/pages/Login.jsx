import { Button, Card, Form, Input, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <Card
        style={{
          color: "var(--adm-color-white)",
          backgroundColor: "var(--adm-color-primary)",
          borderRadius: "0",
        }}
      >
        <div style={{ margin: "10px 0", textAlign: "center" }}>
          <div style={{ fontSize: "1.4rem", fontWeight: "blod" }}>药管管</div>
          <div>您身边的智能药盒</div>
        </div>
      </Card>
      <Form
        layout="horizontal"
        footer={
          <Button color="primary" block type="submit">
            登录
          </Button>
        }
        onFinish={async (value) => {
          const res = await axios.post(serverUrl + "/user/login", {
            username: value.username,
            password: CryptoJS.SHA256(value.password).toString(),
          });
          if (res.data._id) {
            localStorage.setItem("user", res.data._id);
            Toast.show({
              content: "登录成功",
            });
            location.href = "/";
          } else {
            Toast.show({
              content: "登录失败",
            });
          }
        }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, min: 1 }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, min: 6, max: 32 }]}
        >
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
