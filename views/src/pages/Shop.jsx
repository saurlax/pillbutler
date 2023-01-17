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
  const [drugs, setDrugs] = useState([]);
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [pill, setPill] = useState(null);

  useEffect(async () => {
    setData(await loadData());
    setDrugs((await axios.get(serverUrl + "/drug")).data);
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
        {drugs
          .filter((drug) => {
            return drug.name.includes(search);
          })
          .map((drug) => {
            return (
              <List.Item key={drug.name}>
                <Space>
                  <b>{drug.name}</b>
                  {drug.category ? (
                    <Tag color="#87d068" fill="outline">
                      {drug.category}
                    </Tag>
                  ) : null}
                </Space>
                <div
                  style={{
                    color: "var(--adm-color-weak)",
                    fontSize: "0.8rem",
                  }}
                >
                  {drug.remark}
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
                      ¥
                      {(isNaN(drug.price)
                        ? drug.price
                        : drug.price.friendly()) ?? "?"}
                    </span>
                    <span
                      style={{
                        color: "var(--adm-color-weak)",
                        fontSize: "0.8rem",
                      }}
                    >
                      /{drug.amount}个
                    </span>
                  </div>
                  <Button
                    size="small"
                    color="primary"
                    onClick={async () => {
                      if (!localStorage.getItem("user"))
                        return Toast.show("请先登录");
                      setPill(drug);
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
          console.log(v);
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
