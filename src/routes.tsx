import { Navigate, RouteObject } from "react-router-dom";
import Home from "@/pages/home";
import Test from "@/pages/test";
import NotFound from "@/pages/NotFind";
import { AlignLeftOutlined, DiffOutlined } from "@ant-design/icons";
import ChemicalsPermit from "@/pages/chemicalsPermit";
import SaltWholesale from "@/pages/saltWholesale";
import SaltProduce from "@/pages/saltProduce";
import SaltProduceMultispecies from "@/pages/saltProduceMultispecies";
import ChemicalManage from "@/pages/chemicalManage";

export type CustomRouteObject = RouteObject & {
  path: string;
  label?: string;
  icon?: React.ReactNode;
};
const router: CustomRouteObject[] = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "*", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home />, label: "主页", icon: <DiffOutlined /> },
  { path: "/404", element: <NotFound />, label: "404" },
  {
    path: "/test",
    element: <Test />,
    label: "测试页",
    icon: <AlignLeftOutlined />,
  },
  {
    path: "/chemicalsPermit",
    element: <ChemicalsPermit />,
    label: "监控化学品生产特别许可证",
    icon: <AlignLeftOutlined />,
  },
  {
    path: "/saltWholesale",
    element: <SaltWholesale />,
    label: "食盐定点批发企业证书",
    icon: <AlignLeftOutlined />,
  },
  {
    path: "/saltProduce",
    element: <SaltProduce />,
    label: "食盐定点生产企业证书",
    icon: <AlignLeftOutlined />,
  },
  {
    path: "/saltProduceMultispecies",
    element: <SaltProduceMultispecies />,
    label: "食盐定点生产企业证书(多品种)",
    icon: <AlignLeftOutlined />,
  },
  {
    path: "/chemicalManage",
    element: <ChemicalManage />,
    label: "第二类监控化学品许可证",
    icon: <AlignLeftOutlined />,
  },
];
export default router;
