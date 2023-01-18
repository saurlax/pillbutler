import {
  Button,
  CascadePicker,
  List,
  SearchBar,
  Space,
  Tag,
  Toast,
} from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Shop() {
  const [search, setSearch] = useState("");
  const [pills, setPills] = useState([]);
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [pill, setPill] = useState(null);

  useEffect(async () => {
    setData(await loadData());
    setPills((await axios.get(serverUrl + "/pill")).data);
  }, []);
  const options = data
    ? data.map((box) => {
        return {
          label: box.name,
          value: box._id,
          children: Object.keys(box.slots).map((key) => {
            return {
              label: `${Number.parseInt(key) + 1}号药仓（${
                box.slots[key]?.pill?.name ?? "空"
              }）`,
              value: key,
            };
          }),
        };
      })
    : [];
  return (
    <div>
      <div style={{ padding: "6px" }}>
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
          }}
          placeholder="搜索药品"
        />
      </div>
      <List>
        {pills
          .filter((pill) => {
            return pill.name.includes(search);
          })
          .map((pill) => {
            return (
              <List.Item key={pill.name}>
                <Space>
                  <b>{pill.name}</b>
                  {pill.category ? (
                    <Tag color="#87d068" fill="outline">
                      {pill.category}
                    </Tag>
                  ) : null}
                </Space>
                <div
                  style={{
                    color: "var(--adm-color-weak)",
                    fontSize: "0.8rem",
                  }}
                >
                  {pill.remark}
                </div>
                <Space
                  block
                  justify="between"
                  align="center"
                  style={{ marginTop: "6px" }}
                >
                  <div>
                    <span
                      style={{
                        color: "var(--adm-color-danger)",
                        fontWeight: "bolder",
                        fontSize: "1rem",
                      }}
                    >
                      ¥{(isNaN(pill.price) ? pill.price : pill.price) ?? "?"}
                    </span>
                    <span
                      style={{
                        color: "var(--adm-color-weak)",
                        fontSize: "0.8rem",
                      }}
                    >
                      /{pill.amount}个
                    </span>
                  </div>
                  <Button
                    size="small"
                    color="primary"
                    onClick={async () => {
                      if (!localStorage.getItem("user"))
                        return Toast.show("请先登录");
                      setPill(pill);
                      setVisible(true);
                    }}
                  >
                    添加到药盒
                  </Button>
                </Space>
              </List.Item>
            );
          })}
      </List>
      <CascadePicker
        title="选择药仓"
        visible={visible}
        options={options}
        onCancel={() => {
          setVisible(false);
        }}
        onConfirm={(v) => {
          navigate(`/editpill/${v[0]}/${v[1]}`, {
            state: {
              pill: {
                name: pill.name,
                remark: pill.remark,
                amount: pill.amount,
                shelfLife: new Date(Date.now() + 31536000000),
              },
            },
          });
        }}
      />
    </div>
  );
}

export default Shop;
