import { List, Result } from "antd-mobile";
import { LocationFill, SmileOutline } from "antd-mobile-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-amap";
import { useParams } from "react-router-dom";

function FindBox() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [address, setAddress] = useState("加载中");

  useEffect(async () => {
    setData((await loadData())[0]);
    if (data?.position) {
      setAddress(
        (
          await axios.get(
            `https://restapi.amap.com/v3/geocode/regeo?location=${data.position.lng},${data.position.lat}&key=61d307feb6a54ac53cf915549f0e879a`
          )
        ).data.regeocode.formatted_address
      );
    }
  }, []);

  return (
    <div>
      {data?.position ? (
        <div>
          <div style={{ height: "400px" }}>
            <Map plugins={["Scale"]} center={data?.position} zoom={15}>
              <Marker position={data?.position}>
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
                setData((await updateData())[0]);
              }}
            >
              刷新
            </List.Item>
            <List.Item title="药盒所在位置">
              {address == "" ? "未知地点" : address}
            </List.Item>
            <List.Item
              title="导航去这里"
              onClick={() => {
                window.open(
                  `amapuri://route/plan/?sourceApplication=pillbutler&dlat=${data.position.lat}&dlon=${data.position.lng}&t=0`
                );
              }}
            >
              高德地图
            </List.Item>
          </List>
        </div>
      ) : (
        <Result
          icon={<SmileOutline />}
          status="success"
          title="暂时无法定位药盒"
          description="药盒还未发送定位信息"
        />
      )}
    </div>
  );
}

export default FindBox;
