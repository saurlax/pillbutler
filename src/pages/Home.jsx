import { Button, Card, Grid, PullToRefresh, Result, Space } from "antd-mobile";
import { AddCircleOutline, SmileOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import BoxItem from "../components/BoxItem";
import box0 from "../../assets/images/box0.png";
import ygg from "../../assets/images/ygg.png";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [data, setData] = useState(null);

  useEffect(async () => {
    setData(await loadData());
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <div
            style={{
              position: "fixed",
              zIndex: "-1",
              top: "0",
              width: "100vw",
              height: "100vh",
              backgroundImage:
                "linear-gradient(to bottom, var(--adm-color-primary), var(--adm-color-primary), #f3f3f3, #f3f3f3, #f3f3f3)",
            }}
          ></div>
          <Card style={{ backgroundColor: "transparent", borderRadius: "0" }}>
            <div style={{ color: "var(--adm-color-white)" }}>
              <div>欢迎使用</div>
              <div>
                <span style={{ fontSize: "1.4rem" }}>药管管</span>v0.2.0.30
              </div>
            </div>
          </Card>
          <div>
            <PullToRefresh
              onRefresh={async () => {
                setData(await updateData());
              }}
            >
              <Grid columns={2} gap={8} style={{ padding: "15px" }}>
                {data?.map((box) => {
                  return (
                    <BoxItem
                      name={box.name}
                      image={box0}
                      key={box.name}
                      id={box._id}
                    />
                  );
                })}
                <BoxItem
                  name={
                    <Space align="center" style={{ "--gap": "3px" }}>
                      <AddCircleOutline />
                      添加药盒
                    </Space>
                  }
                  id="new"
                />
              </Grid>
            </PullToRefresh>
          </div>
        </div>
      ) : (
        <div>
          <Result
            icon={<SmileOutline />}
            status="info"
            title="请先登录"
            description="登录后才能查看您的药盒哟~"
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="primary"
              style={{ width: "120px" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              登录
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
