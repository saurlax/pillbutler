import { NavBar, TabBar } from "antd-mobile";
import {
  AddSquareOutline,
  AppOutline,
  CompassOutline,
  HistogramOutline,
  LocationFill,
  SetOutline,
  ShopbagOutline,
  UserOutline,
} from "antd-mobile-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    {
      key: "",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "discover",
      title: "发现",
      icon: <CompassOutline />,
    },
    {
      key: "addpill",
      title: "添加药品",
      icon: <AddSquareOutline />,
    },
    {
      key: "statistics",
      title: "记录",
      icon: <HistogramOutline />,
    },
    {
      key: "me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];
  return (
    <div>
      <NavBar
        backArrow={false}
        style={{
          zIndex: "10000",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          color: "#ffffff",
          backgroundColor: "var(--adm-color-primary)",
        }}
      >
        药管管
      </NavBar>
      <div style={{ margin: "45px 0 50px 0" }}>
        <Outlet />
      </div>
      <TabBar
        activeKey={
          location.pathname == "" ? "" : location.pathname.split("/")[1]
        }
        onChange={(e) => {
          navigate(`/${e}`);
        }}
        style={{
          position: "fixed",
          zIndex: "10000",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "var(--adm-color-white)",
          borderTop: "solid 1px var(--adm-border-color)",
        }}
      >
        {tabs.map((tab) => {
            return <TabBar.Item {...tab} />;
          })}
      </TabBar>
    </div>
  );
}

export default Layout;
