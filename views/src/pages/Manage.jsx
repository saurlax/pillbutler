import {
  Card,
  Space,
  JumboTabs,
  Tag,
  PullToRefresh,
  Result,
  Toast,
} from "antd-mobile";
import { SetOutline, SmileOutline } from "antd-mobile-icons";
import { List } from "antd-mobile/es/components/list/list";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlarmItem from "../components/AlarmItem";

function Manage() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(async () => {
    setData(
      (await loadData()).filter((box) => {
        return box._id == params.id;
      })[0]
    );
  }, []);

  return (
    <div>
      <Card
        style={{
          backgroundColor: "var(--adm-color-primary)",
          borderRadius: "0",
        }}
      >
        <Space direction="vertical" block>
          <div
            style={{
              color: "var(--adm-color-white)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "var(--adm-color-white)", fontSize: "1rem" }}>
              {data?.name}
            </span>
            <SetOutline
              style={{ fontSize: "1.2rem" }}
              onClick={() => {
                navigate(`/settings/${params.id}`);
              }}
            />
          </div>
          <Space block style={{ color: "var(--adm-color-white)" }}>
            <span>剩余电量{data?.electricity}%</span>
          </Space>
          <JumboTabs
            onChange={(key) => {
              setIndex(key);
            }}
            activeKey={index}
            style={{
              backgroundColor: "var(--adm-color-white)",
              borderRadius: "6px",
            }}
          >
            {data
              ? Object.keys(data?.slots).map((key) => {
                  const slot = data.slots[key];
                  return (
                    <JumboTabs.Tab
                      title={`${Number.parseInt(key) + 1}号药仓`}
                      description={slot?.pill?.name ?? "空"}
                      key={key}
                    >
                      <Space wrap>
                        <Tag color="primary">剩余{slot?.pill?.amount}片药</Tag>
                        <Tag>
                          {moment(slot?.pill?.shelfLife).calendar()}过期
                        </Tag>
                      </Space>
                    </JumboTabs.Tab>
                  );
                })
              : null}
          </JumboTabs>
        </Space>
      </Card>
      {index ? (
        <PullToRefresh
          onRefresh={async () => {
            setData(
              (await updateData()).filter((box) => {
                return box._id == params.id;
              })[0]
            );
          }}
        >
          <List header="定时提醒">
            {data?.slots[index]?.alarm
              ? Object.keys(data.slots[index].alarm).map((key) => {
                  const alarm = data.slots[index].alarm[key];
                  if (!alarm) return null;
                  return (
                    <AlarmItem
                      onChange={async (value) => {
                        let slot = data.slots[index];
                        slot.alarm[key].enabled = value;
                        setData(await pushData(params.id, slot, index));
                      }}
                      onDelete={async () => {
                        let slot = data.slots[index];
                        slot.alarm.splice(key, 1);
                        setData(await pushData(params.id, slot, index));
                      }}
                      amount={alarm.amount}
                      time={new Date(alarm.time)}
                      period={alarm.period}
                      enabled={alarm.enabled}
                      key={Math.random()}
                    />
                  );
                })
              : null}
            <List.Item
              onClick={() => {
                navigate(`/addalarm/${params.id}/${index}`);
              }}
            >
              添加提醒
            </List.Item>
          </List>
          <List header="药物管理">
            <List.Item
              onClick={() => {
                navigate(`/editpill/${params.id}/${index}`, {
                  state: { pill: data.slots[index].pill },
                });
              }}
            >
              修改药物
            </List.Item>
          </List>
        </PullToRefresh>
      ) : (
        <Result
          icon={<SmileOutline />}
          status="success"
          title="您还未选择一个药仓哟~"
          description="在上方选定一个药仓，即可对该药仓设置药物和定时提醒"
        />
      )}
    </div>
  );
}

export default Manage;
