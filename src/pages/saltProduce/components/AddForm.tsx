import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Upload,
  UploadProps,
} from "antd";
import {
  SaltProduceListResRow,
  addSaltProduce,
  updateSaltProduce,
} from "@/api";
import dayjs from "dayjs";
import { useSetRecoilState } from "recoil";
import { pageLoadingState } from "@/state";

interface IProps {
  onFinish: () => void;
  formData?: SaltProduceListResRow;
  onClose: () => void;
}
const AddForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const setLoading = useSetRecoilState(pageLoadingState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (props.formData) {
      const { releaseDate } = props.formData;
      const obj = {
        ...props.formData,
        releaseDate: dayjs(releaseDate),
      };
      console.log(1112, obj);
      form.setFieldsValue(obj);
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
      setLoading(true);
      // if (info.file.status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setLoading(false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setLoading(false);
      }
    },
  };
  return (
    <>
      <Modal
        title={props.formData ? "修改" : "新增"}
        open={isModalOpen}
        onOk={async () => {
          const res: SaltProduceListResRow = await form.validateFields();
          const obj: SaltProduceListResRow = {
            ...res,
            releaseDate: dayjs(res.releaseDate).format("YYYY-MM-DD"),
            id: props.formData?.id,
          };
          console.log(222, obj);
          setLoading(true);
          const request = props.formData ? updateSaltProduce : addSaltProduce;
          const result = await request(obj);
          console.log(999, result);
          setLoading(false);
          message.success(`${props.formData ? "修改" : "新增"}成功！`);
          setIsModalOpen(false);
          props.onFinish();
        }}
        onCancel={() => {
          form.resetFields();
          props.onClose();
          setIsModalOpen(false);
        }}
        maskClosable={false}
      >
        <div className="w-full">
          <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: "请输入名称!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="个人名称"
              name="personalName"
              rules={[{ required: true, message: "请输入个人名称!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="地址"
              name="address"
              rules={[{ required: true, message: "请输入地址!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="生产地址"
              name="produceAddress"
              rules={[{ required: true, message: "请输入生产地址!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="品种"
              name="variety"
              rules={[{ required: true, message: "请输入品种!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="编码"
              name="code"
              rules={[{ required: true, message: "请输入编码!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="数量"
              name="number"
              rules={[{ required: true, message: "请输入数量!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="发证日期	"
              name="releaseDate"
              rules={[{ required: true, message: "请输入发证年月日!" }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Upload {...uploadProps}></Upload>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        新增
      </Button>
    </>
  );
};
export default AddForm;
