import React, { useEffect } from "react";
import { DatePicker, Form, Input, message, Modal } from "antd";
import {
  ChemicalManageListResRow,
  addManageAndUse,
  editManageAndUse,
} from "@/api";
import { useSetRecoilState } from "recoil";
import { pageLoadingState } from "@/state";
import dayjs from "dayjs";
// import dayjs from "dayjs";

interface IProps {
  open: boolean;
  onFinish: () => void;
  formData?: ChemicalManageListResRow;
  close: () => void;
}
const AddForm: React.FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const setLoading = useSetRecoilState(pageLoadingState);
  useEffect(() => {
    if (props.formData?.id) {
      const values = {
        ...props.formData,
        id: props.formData.id,
        issueDate: dayjs(props.formData.issueDate),
        validity: dayjs(props.formData.validity),
      };
      form.setFieldsValue(values);
    }
  }, []);
  // const [loading, setLoading] = useRecoilState(fullscreenLoading);
  return (
    <>
      <Modal
        title={props.formData ? "修改" : "新增"}
        open={props.open}
        onOk={async () => {
          const res: any = await form.validateFields();
          console.log(111, res);
          const values: ChemicalManageListResRow = {
            ...res,
            id: props.formData?.id,
            certificateNo: props.formData?.certificateNo,
            validity: res.validity!.format("YYYY-MM-DD"),
            issueDate: res.issueDate!.format("YYYY-MM-DD"),
          };
          setLoading(true);
          const request = props.formData?.id
            ? editManageAndUse
            : addManageAndUse;
          await request(values);
          setLoading(false);
          message.success(`${props.formData?.id ? "修改" : "新增"}成功！`);
          props.close();
          props.onFinish();
        }}
        onCancel={() => {
          props.close();
        }}
        afterClose={() => {
          form.resetFields();
        }}
        maskClosable={false}
      >
        <div className="w-full">
          <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            {/* <Form.Item label="证书编号	" name="certificateNo">
              <Input disabled={true} />
            </Form.Item> */}
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
    </>
  );
};
export default AddForm;
