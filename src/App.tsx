import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Layout from "@/Layout";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

const App: React.FC = () => {
  const routing = useRoutes(routes);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout component={routing} />
    </ConfigProvider>
  );
};

export default App;
