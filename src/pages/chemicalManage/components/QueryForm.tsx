import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { SaltProduceListResRow } from "@/api";

interface IProps {
  search: (params: SaltProduceListResRow) => void;
}
const QueryForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();

  return (
    <div className="w-full py-4">
      <Form
        layout={"inline"}
        form={form}
        onFinish={props.search}
        className="flex gap-4 flex-row items-center"
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="个人名称" name="personalName">
          <Input />
        </Form.Item>
        <Form.Item label="地址" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="生产地址" name="produceAddress">
          <Input />
        </Form.Item>
        <Form.Item label="品种" name="variety">
          <Input />
        </Form.Item>
        <Form.Item label="编码" name="code">
          <Input />
        </Form.Item>
        <Form.Item label="数量" name="number">
          <Input />
        </Form.Item>
        <Form.Item label="发证日期	" name="releaseDate">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="mr-2"
            onClick={() => form.resetFields()}
          >
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default QueryForm;
