import React from "react";
import { Button, DatePicker, Form, Input } from "antd";

const QueryForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="w-full py-4">
      <Form layout={"inline"} form={form}>
        <Form.Item label="身高">
          <Input />
        </Form.Item>
        <Form.Item label="年龄">
          <Input />
        </Form.Item>
        <Form.Item label="日期">
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary">搜索</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default QueryForm;
