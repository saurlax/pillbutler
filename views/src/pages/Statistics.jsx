import { Axis, Chart, Legend, Line, Point, Tooltip } from "@antv/f2";
import Canvas from "@antv/f2-react";
import {
  Button,
  Card,
  ProgressCircle,
  Result,
  Space,
  Steps,
} from "antd-mobile";
import { FireFill, SmileOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";

function Statistics() {
  const [data, setData] = useState(null);
  const [week, setWeek] = useState(0);
  useEffect(async () => {
    setData(await loadData());
  }, []);

  let datav = [
    { day: "周日", value: 0 },
    { day: "周一", value: 0 },
    { day: "周二", value: 0 },
    { day: "周三", value: 0 },
    { day: "周四", value: 0 },
    { day: "周五", value: 0 },
    { day: "周六", value: 0 },
  ];
  if (data) {
    data[0]?.slots?.forEach((slot) => {
      slot.alarm
        .filter((alarm) => {
          return alarm.enabled;
        })
        .forEach((alarm) => {
          alarm.period.forEach((p) => {
            datav[p].value += alarm.amount;
          });
        });
    });
  }

  return (
    <div>
      {localStorage.getItem("user") ? (
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
            style={{ padding: "12px", "--gap": "12px" }}
            block
            direction="vertical"
          >
            <Card title="用药情况">
              <Space block direction="vertical" style={{width:'100%'}}>
                <div style={{}}>周用药量统计</div>
                <Canvas
                  pixelRatio={window.devicePixelRatio}
                >
                  <Chart data={datav}>
                    <Legend />
                    <Axis
                      field="day"
                      tickCount={3}
                      style={{
                        label: { align: "between" },
                      }}
                    />
                    <Axis field="value" tickCount={5} />
                    <Line x="day" y="value" />
                    <Point x="day" y="value" />
                    <Tooltip />
                  </Chart>
                </Canvas>
                <Steps
                  direction="vertical"
                  current={week == 0 ? new Date().getDay() : -1}
                >
                  {data
                    ? new Array(7).fill(null).map((_null, day) => {
                        const date = new Date();
                        const dayCount = day - date.getDay() + week * 7;
                        let amount = new Array(
                          Object.keys(data[0]?.slots).length
                        ).fill(0);

                        // 暂时只显示第一个药盒的数据
                        Object.values(data[0]?.slots).forEach((slot, i) => {
                          Object.values(slot?.alarm)
                            .filter((alarm) => {
                              return (
                                alarm?.enabled && alarm?.period?.includes(day)
                              );
                            })
                            .forEach((alarm) => {
                              amount[i] += alarm?.amount;
                            });
                        });
                        let hit = `未服（${Object.values(data[0]?.slots)
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
                            title={new Date(
                              date.getTime() + dayCount * 86400000
                            ).format("yyyy年MM月dd日 D")}
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
                    percent={data[0].steps / 100}
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
                    <div>今日已行走{data[0].steps}步</div>
                    <div>距离{(data[0].steps * 0.00055).friendly()}公里</div>
                    <div>消耗{(data[0].steps * 0.00004).friendly()}千卡</div>
                  </Space>
                </Space>
              ) : null}
            </Card>
          </Space>
        </div>
      ) : (
        <Result
          icon={<SmileOutline />}
          status="info"
          title="请先登录"
          description="登录后才能查看健康记录哟~"
        />
      )}
    </div>
  );
}

export default Statistics;
