import {
  Button,
  CapsuleTabs,
  Card,
  List,
  ProgressCircle,
  Result,
  Space,
  Steps,
  Tag,
} from "antd-mobile";
import { FireFill, LocationFill, SmileOutline } from "antd-mobile-icons";
import moment from "moment";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-amap";

function Statistics() {
  const [data, setData] = useState(null);
  const [week, setWeek] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(async () => {
    setData(await loadData());
  }, []);

  return (
    <div>
      {localStorage.getItem("user") && data ? (
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
          <Space
            style={{
              padding: "12px",
              "--gap": "12px",
            }}
            block
            direction="vertical"
          >
            <CapsuleTabs
              onChange={setIndex}
              style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
            >
              {data.map((box, index) => {
                return (
                  <CapsuleTabs.Tab title={box.name} key={index}>
                    <Space wrap>
                      {box.slots.map((slot, i) => {
                        return slot ? (
                          <Tag>
                            {i + 1}号药仓：{slot.pill.name}*{slot.pill.amount}片
                          </Tag>
                        ) : null;
                      })}
                    </Space>
                  </CapsuleTabs.Tab>
                );
              })}
            </CapsuleTabs>
            <Card title="用药情况">
              <Space block direction="vertical" style={{ width: "100%" }}>
                <Steps
                  direction="vertical"
                  current={week == 0 ? new Date().getDay() : -1}
                >
                  {data
                    ? new Array(7).fill(null).map((_null, day) => {
                        const date = new Date();
                        const dayCount = day - date.getDay() + week * 7;
                        let amount = new Array(data[index]?.slots.length).fill(
                          0
                        );

                        data[index]?.slots.forEach((slot, i) => {
                          slot?.alarm
                            .filter((alarm) => {
                              return (
                                alarm?.enabled && alarm?.period?.includes(day)
                              );
                            })
                            .forEach((alarm) => {
                              amount[i] += alarm?.amount;
                            });
                        });
                        let hit = `未服（${data[index]?.slots
                          ?.map((slot, i) => {
                            if (amount[i] > 0)
                              return `${slot?.pill?.name}*${amount[i]}片`;
                          })
                          .filter((text) => {
                            return text != null;
                          })
                          .join(", ")}）`;
                        return (
                          <Steps.Step
                            title={moment(
                              date.getTime() + dayCount * 86400000
                            ).format("ll")}
                            description={
                              dayCount > 0
                                ? hit == "未服（）"
                                  ? "无需服用"
                                  : hit
                                : "已全部服用"
                            }
                            key={date.getTime() + dayCount * 86400000}
                            status={dayCount >= 0 ? "" : "finish"}
                          />
                        );
                      })
                    : null}
                </Steps>
                <Space block justify="around">
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => {
                      setWeek(week - 1);
                    }}
                  >
                    上一周
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setWeek(0);
                    }}
                    disabled={week == 0}
                  >
                    回到本周
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => {
                      setWeek(week + 1);
                    }}
                  >
                    下一周
                  </Button>
                </Space>
              </Space>
            </Card>
            <Card title="运动记录">
              {data ? (
                <Space block justify="center" style={{ "--gap": "32px" }}>
                  <ProgressCircle
                    style={{ "--track-width": "8px", "--size": "100px" }}
                    percent={data[index].steps / 100}
                  >
                    <FireFill
                      style={{
                        color: "var(--adm-color-primary)",
                        fontSize: "1.4rem",
                      }}
                    />
                    <div style={{ fontSize: "1rem", fontWeight: "bold" }}>
                      {data.steps}
                    </div>
                  </ProgressCircle>
                  <Space
                    style={{ height: "100%" }}
                    direction="vertical"
                    justify="center"
                  >
                    <div>今日已走{data[index].steps}步</div>
                    <div>
                      距离{(data[index].steps * 0.00055).toFixed(2)}公里
                    </div>
                    <div>
                      消耗{(data[index].steps * 0.00004).toFixed(2)}千卡
                    </div>
                  </Space>
                </Space>
              ) : null}
            </Card>
            <Card title="药盒定位">
              {data[index]?.position ? (
                <div>
                  <div style={{ height: "400px" }}>
                    <Map
                      plugins={["Scale"]}
                      center={data[index].position}
                      zoom={15}
                    >
                      <Marker position={data[index].position}>
                        <LocationFill
                          style={{
                            color: "var(--adm-color-danger)",
                            fontSize: "2.2rem",
                          }}
                        />
                      </Marker>
                    </Map>
                  </div>
                  <List>
                    <List.Item
                      onClick={async () => {
                        setData(await updateData());
                      }}
                    >
                      刷新
                    </List.Item>
                    <List.Item
                      title="高德地图"
                      onClick={() => {
                        window.open(
                          `amapuri://route/plan/?sourceApplication=pillbutler&dlat=${data[index].position.lat}&dlon=${data[index].position.lng}&t=0`
                        );
                      }}
                    >
                      导航去这里
                    </List.Item>
                  </List>
                </div>
              ) : (
                <Result
                  icon={<SmileOutline />}
                  status="success"
                  title="暂时无法定位药盒"
                  description="药盒未发送定位信息"
                />
              )}
            </Card>
          </Space>
        </div>
      ) : (
        <div>
          <Result
            icon={<SmileOutline />}
            status="info"
            title="请先登录"
            description="登录后才能查看记录哟~"
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

export default Statistics;
