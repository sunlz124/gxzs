import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Modal } from "antd";
import {
  ChemicalManageListResRow,
  addManageAndUse,
  editManageAndUse,
} from "@/api";
import { useSetRecoilState } from "recoil";
import { pageLoadingState } from "@/state";
// import dayjs from "dayjs";

interface IProps {
  onFinish: () => void;
  formData?: ChemicalManageListResRow;
  onClose: () => void;
}
const AddForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [formLoading, setFormLoading] = useState(false);
  const setLoading = useSetRecoilState(pageLoadingState);
  useEffect(() => {
    if (props.formData) {
      // const { releaseDate } = props.formData;
      // const obj = {
      //   ...props.formData,
      //   releaseDate: dayjs(releaseDate),
      // };
      // console.log(1112, obj);
      // form.setFieldsValue(obj);
      // setIsModalOpen(true);
    }
  }, [props.formData]);
  // const [loading, setLoading] = useRecoilState(fullscreenLoading);
  return (
    <>
      <Modal
        title={props.formData ? "修改" : "新增"}
        open={isModalOpen}
        onOk={async () => {
          // setLoading(true);
          // setTimeout(() => {
          //   setLoading(false);
          // }, 2000);

          // return;
          const res: any = await form.validateFields();
          // const obj: ChemicalManageListResRow = {
          //   ...res,
          //   releaseDate: dayjs(res.releaseDate).format("YYYY-MM-DD"),
          //   id: props.formData?.id,
          // };
          const values: ChemicalManageListResRow = {
            ...res,
            validity: res.validity!.format("YYYY-MM-DD"),
          };
          setLoading(true);
          const request = props.formData?.id
            ? editManageAndUse
            : addManageAndUse;
          const result = await request(values);
          console.log(999, result);
          setLoading(false);
          message.success(`${props.formData?.id ? "修改" : "新增"}成功！`);
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
              label="证书编号	"
              name="certificateNo"
              rules={[{ required: true, message: "请输入证书编号!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="单位名称"
              name="companyName"
              rules={[{ required: true, message: "请输入单位名称!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="法定代表人	"
              name="legalPerson"
              rules={[{ required: true, message: "请输入法定代表人!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="单位地址"
              name="companyAddress"
              rules={[{ required: true, message: "请输入单位地址!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="有效期限"
              name="validity"
              rules={[{ required: true, message: "请输入有效期限!" }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="许可范围"
              name="scope"
              rules={[{ required: true, message: "请输入许可范围!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="发证日期"
              name="issueDate"
              rules={[{ required: true, message: "请输入发证日期!" }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            {/* <Form.Item
              label="发证日期	"
              name="releaseDate"
              rules={[{ required: true, message: "请输入发证年月日!" }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        新增
      </Button>
    </>
  );
};
export default AddForm;
