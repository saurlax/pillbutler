import { NavBar, List, Card, Result } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(async () => {
    setData(
      (await loadData()).filter((box) => {
        return box._id == params.id;
      })[0]
    );
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <Card
            style={{
              backgroundColor: "var(--adm-color-primary)",
              borderRadius: "0",
            }}
          >
            <div style={{ color: "var(--adm-color-white)", fontSize: "1rem" }}>
              {data?.name}
            </div>
            <div style={{ color: "var(--adm-color-light)" }}>
              {data?.version}
            </div>
          </Card>
          <List header="基础设置">
            <List.Item onClick={() => {}}>音量</List.Item>
          </List>
        </div>
      ) : null}
    </div>
  );
}

export default Settings;
