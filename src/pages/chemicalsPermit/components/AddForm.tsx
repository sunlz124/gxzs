import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DataType } from "../index";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
interface IProps {
  onFinish: () => void;
  formData?: DataType;
  onClose: () => void;
}
const AddForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  useEffect(() => {
    if (props.formData) {
      setIsModalOpen(true);
    }
  }, [props.formData]);
  const uploadProps: UploadProps = {
    name: "file",
    action: `${import.meta.env.VITE_APP_BASE_API}/api/upload/single`,
    showUploadList: false,
    data: { name: "222" },
    onChange(info) {
      console.log(11, info);
      // console.log(22, info);
      setFormLoading(true);
      // if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setFormLoading(false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setFormLoading(false);
      }
    },
  };
  return (
    <div className="flex gap-3 flex-row items-center mb-3">
      <Spin spinning={formLoading} fullscreen />
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        新增
      </Button>
      <Button
        type="primary"
        onClick={() => {
          fetch("http://localhost:3030/api/upload/single");
        }}
      >
        新增1
      </Button>
      <Upload {...uploadProps}>
        <Button type="primary" icon={<UploadOutlined />}>
          导入
        </Button>
      </Upload>
      <Modal
        title="新增"
        open={isModalOpen}
        onOk={async () => {
          console.log(111, form);
          const res: FieldType = await form.validateFields();
          console.log(222, res);
          setFormLoading(true);
          setTimeout(() => {
            setFormLoading(false);
            setIsModalOpen(false);
            // console.log(112, props);
            message.success("添加成功！");
            props.onFinish();
          }, 1000);
        }}
        onCancel={() => {
          form.resetFields();
          props.onClose();
          setIsModalOpen(false);
        }}
        maskClosable={false}
      >
        <div className="w-full py-4">
          <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item
              label="证书编号"
              name="number"
              rules={[{ required: true, message: "请输入编号!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="单位名称"
              name="unitname"
              rules={[{ required: true, message: "请输入单位名称!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="法定代表人"
              name="legalPersonName"
              rules={[{ required: true, message: "请输入法定代表人!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="单位地址"
              name="address"
              rules={[{ required: true, message: "请输入单位地址!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="许可有效期"
              name="periodOfValidity"
              rules={[{ required: true, message: "请输入许可有效期!" }]}
            >
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item
              label="许可范围"
              name="range"
              rules={[{ required: true, message: "请输入许可范围!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="发证机关"
              name="licenceIssuingAuthority"
              rules={[{ required: true, message: "请输入发证机关!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="发证年月日"
              name="issueDate"
              rules={[{ required: true, message: "请输入发证年月日!" }]}
            >
              <DatePicker />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default AddForm;
