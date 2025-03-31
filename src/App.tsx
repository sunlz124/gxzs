import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Layout from "@/layout/Layout";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

const App: React.FC = () => {
  const routing = useRoutes(routes);

  return (
    <RecoilRoot>
      <RecoilNexus />
      <ConfigProvider locale={zhCN}>
        <Layout component={routing} />
      </ConfigProvider>
    </RecoilRoot>
  );
};

export default App;
