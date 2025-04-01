import { DownloadOutlined } from "@ant-design/icons";
import request from "@/api/axios.config";
import { Button, message } from "antd";

interface IProps {
  url: string;
  btnName?: string;
  params?: any;
}
const DownloadButton: React.FC<IProps> = (props) => {
  const exportFile = async () => {
    const { license } = window as any;
    if (!license) {
      message.error("请在客户端进行操作！");
      return;
    }
    console.log(license);
    const saveDirectory = await license.openDirectoryDialog();
    if (!saveDirectory) {
      return;
    }
    const url = import.meta.env.VITE_APP_BASE_API + props.url;
    const params = { ...props.params, path: `${saveDirectory}/` };
    // console.log(url, params);
    // const url = await getUrl();
    const result = await request(url, { data: params });
    console.log(result);
    message.success(`下载成功！`);
  };
  return (
    <Button type="primary" icon={<DownloadOutlined />} onClick={exportFile}>
      {props.btnName ?? "导出"}
    </Button>
  );
};
export default DownloadButton;
