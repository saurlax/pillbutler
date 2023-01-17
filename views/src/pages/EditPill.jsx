import {
  Button,
  DatePickerView,
  Form,
  Input,
  Stepper,
  TextArea,
} from "antd-mobile";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const hours = new Array(24).fill(null).map((value, index) => {
  return (Array(2).join(0) + index).slice(-2);
});
const minutes = new Array(60).fill(null).map((value, index) => {
  return (Array(2).join(0) + index).slice(-2);
});

function EditPill() {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  let pill = state.pill;
  if (pill) {
    pill.shelfLife = new Date(pill?.shelfLife);
  }
  return (
    <Form
      footer={
        <Button color="primary" type="submit" block>
          保存
        </Button>
      }
      initialValues={pill}
      onFinish={async (value) => {
        let slot = (await loadData()).filter((box) => {
          return box._id == params.id;
        })[0].slots[params.index];
        slot.pill = {
          name: value.name,
          brand: value.brand,
          remark: value.remark,
          amount: value.amount,
          shelfLife: moment(value.shelfLife).format("yyyy/MM/DD hh:mm:ss"),
        };
        console.log(await pushData(params.id, slot, params.index));
        navigate(`/manage/${params.id}`);
      }}
    >
      <Form.Header>基本信息</Form.Header>
      <Form.Item name="name" label="药物名称" rules={[{ required: true }]}>
        <Input placeholder="请输入药物名称" />
      </Form.Item>
      <Form.Item name="brand" label="药物品牌">
        <Input placeholder="请输入药物品牌" />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <TextArea placeholder="请输入备注" />
      </Form.Item>
      <Form.Item name="amount" label="总量">
        <Stepper min={1} max={20} />
      </Form.Item>
      <Form.Item name="shelfLife" label="保质期至">
        <DatePickerView style={{ height: "120px" }} />
      </Form.Item>
    </Form>
  );
}

export default EditPill;
