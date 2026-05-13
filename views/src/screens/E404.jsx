import { Button, NavBar, Result } from "antd-mobile";
import { useNavigate } from "react-router-dom";

function E404() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar
        style={{
          zIndex: "10000",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          color: "var(--adm-color-white)",
          backgroundColor: "var(--adm-color-primary)",
        }}
        back={null}
      >
        药管管
      </NavBar>
      <div style={{ marginTop: "45px" }}>
        <Result status="info" title="您请求的页面不存在" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="primary"
            style={{ width: "120px" }}
            onClick={() => {
              navigate("/");
            }}
          >
            返回主页
          </Button>
        </div>
      </div>
    </div>
  );
}

export default E404;
