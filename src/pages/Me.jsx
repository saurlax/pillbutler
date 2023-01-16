import { Avatar, Button, Card, Dialog, Space, Switch } from "antd-mobile";
import { List } from "antd-mobile/es/components/list/list";
import { useNavigate } from "react-router-dom";

function Me() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  return (
    <div>
      <Card
        style={{
          backgroundColor: "var(--adm-color-primary)",
          borderRadius: "0",
        }}
      >
        <Space>
          <Avatar />
          <span style={{ color: "#ffffff", fontSize: "1rem" }}>
            {user ? "************" + user.slice(12) : "未登录"}
          </span>
        </Space>
      </Card>
      <List>
        <List.Item
          onClick={() => {
            navigate("/about");
          }}
        >
          关于药管管
        </List.Item>
        <List.Item
          extra={
            <Switch
              defaultChecked={localStorage.getItem("shopEntry") == "true"}
              onChange={(v) => {
                localStorage.setItem("shopEntry", v);
                location.reload();
              }}
            />
          }
        >
          商城入口
        </List.Item>
        {user ? (
          <>
            <List.Item
              onClick={() => {
                navigate("/statistics");
              }}
            >
              健康记录
            </List.Item>
            <List.Item>
              <Button
                block
                color="danger"
                onClick={() => {
                  Dialog.confirm({
                    content: "您真的要退出登录吗？",
                    onConfirm: async () => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("boxesData");
                      location.href = "/";
                    },
                  });
                }}
              >
                退出登录
              </Button>
            </List.Item>
          </>
        ) : (
          <></>
        )}
      </List>
    </div>
  );
}

export default Me;
