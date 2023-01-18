import { Button, Result } from "antd-mobile";
import { SmileOutline } from "antd-mobile-icons";
import { BarcodeScanner } from "react-barcode-scanner";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();

  return (
    <div>
      {localStorage.getItem("user") ? (
        123
      ) : (
        <div>
          <Result
            icon={<SmileOutline />}
            status="info"
            title="请先登录"
            description="登录后才能添加药品哟~"
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

export default Add;
