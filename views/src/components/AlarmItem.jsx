import { List, Space, SwipeAction, Switch } from 'antd-mobile'
import { useState } from 'react';

const daySource = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六'
]
function AlarmItem(props) {
  const [enabled, setEnabled] = useState(props.enabled);
  let period = props.period.map(day => { return daySource[day] });
  if (period.length >= 7) period = ['每天'];
  if (period.length == 0) period = ['一次'];

  return (
    <SwipeAction rightActions={[{ key: 'delete', text: '删除', color: 'danger' }]}
      onAction={(action => { action.key == 'delete' ? props.onDelete() : null })}>
      <List.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px' }}>
          <div>
            <Space style={{ color: 'var(--adm-color-black)', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {props.time?.format('hh:mm') ?? '未知'}
              <span style={{ fontSize: '1rem', color: 'var(--adm-color-weak)' }}>{props.amount}片</span>
            </Space>
            <div style={{ color: 'var(--adm-color-light)', fontSize: '0.8rem' }}>{period.join(', ')}</div>
          </div>
          <Switch checked={enabled} onChange={async (value) => {
            setEnabled(await props.onChange(value));
          }} />
        </div>
      </List.Item>
    </SwipeAction>
  )
}

export default AlarmItem