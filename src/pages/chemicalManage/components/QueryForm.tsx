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
        <Form.Item label="证书编号" name="certificateNo">
          <Input />
        </Form.Item>
        <Form.Item label="单位名称" name="companyName">
          <Input />
        </Form.Item>
        <Form.Item label="法定代表人" name="legalPerson">
          <Input />
        </Form.Item>
        <Form.Item label="单位地址" name="companyAddress">
          <Input />
        </Form.Item>
        <Form.Item label="有效期限" name="validity">
          <Input />
        </Form.Item>
        <Form.Item label="许可范围" name="scope">
          <Input />
        </Form.Item>
        <Form.Item label="数量" name="number">
          <Input />
        </Form.Item>
        <Form.Item label="发证日期	" name="issueDate">
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
