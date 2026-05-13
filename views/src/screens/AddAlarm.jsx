import {
  Button,
  Form,
  PickerView,
  Selector,
  Stepper,
  Toast,
} from "antd-mobile";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const timeData = [
  new Array(24).fill(null).map((v, i) => {
    return { label: ("0" + i).slice(-2), value: i };
  }),
  new Array(60).fill(null).map((v, i) => {
    return { label: ("0" + i).slice(-2), value: i };
  }),
];
const periodData = [
  {
    label: "周日",
    value: 0,
  },
  {
    label: "周一",
    value: 1,
  },
  {
    label: "周二",
    value: 2,
  },
  {
    label: "周三",
    value: 3,
  },
  {
    label: "周四",
    value: 4,
  },
  {
    label: "周五",
    value: 5,
  },
  {
    label: "周六",
    value: 6,
  },
];

function AddAlarm(props) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Form
      footer={
        <Button color="primary" block type="submit">
          保存
        </Button>
      }
      onFinish={async (value) => {
        let slot = (await loadData()).filter((box) => {
          return box._id == params.id;
        })[0].slots[params.index];
        let alarm = slot.alarm;
        let i;
        for (i = 0; i < 100; i++) {
          if (!alarm[i]) {
            slot.alarm[i] = {
              time: moment(new Date(2000, 0, 1, value.time[0], value.time[1], 0)).format(
                "yyyy/MM/DD hh:mm:ss"
              ),
              period: value.period,
              amount: value.amount,
              enabled: true,
            };
            if (await pushData(params.id, slot, params.index)) {
              navigate(`/manage/${params.id}`);
              return;
            } else {
              Toast.show("设置失败");
            }
            break;
          }
          if (i == 99) {
            Toast.show("不能再添加新提醒啦~");
          }
        }
      }}
      initialValues={{
        time: [new Date().getHours(), new Date().getMinutes()],
        period: [],
        amount: 1,
      }}
    >
      <Form.Header>提醒时间</Form.Header>
      <Form.Item name="time" rules={[{ required: true }]}>
        <PickerView columns={timeData} style={{ height: "120px" }} />
      </Form.Item>
      <Form.Header>重复周期</Form.Header>
      <Form.Item name="period">
        <Selector options={periodData} multiple columns={4} />
      </Form.Item>
      <Form.Item name="amount" label="服用数量">
        <Stepper min={1} max={100} />
      </Form.Item>
    </Form>
  );
}

export default AddAlarm;
