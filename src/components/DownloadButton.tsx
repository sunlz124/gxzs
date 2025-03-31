import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface IProps {
  url: string;
  btnName?: string;
}
const DownloadButton: React.FC<IProps> = (props) => {
  const exportFile = () => {
    // console.log(111, import.meta.env.PROD, import.meta.env.DEV);
    // const baseURL = import.meta.env.PROD
    //   ? location.origin
    //   : import.meta.env.VITE_APP_BASE_API;
    const url = import.meta.env.VITE_APP_BASE_API + props.url;
    console.log(111, url);
    const a = document.createElement("a");
    a.href = url;
    a.download = "download";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  return (
    <Button type="primary" icon={<DownloadOutlined />} onClick={exportFile}>
      {props.btnName ?? "导出"}
    </Button>
  );
};
export default DownloadButton;
