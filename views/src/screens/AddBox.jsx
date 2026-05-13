import { Button, Form, Input } from 'antd-mobile'

function NewBox() {
  return (
    <Form layout='horizontal' footer={<Button color='primary' block>添加</Button>}>
      <Form.Item name='id' label='药盒密钥' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  )
}

export default NewBox