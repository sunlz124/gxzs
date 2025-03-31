import { Menu, MenuProps, Spin } from "antd";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@/routes";
// import PageMenuBar from "@renderer/components/PageMenuBar";
import React from "react";
import MenuSetting from "./MenuSetting";
import { useRecoilValue } from "recoil";
import { pageLoadingState } from "@/state";

type MenuItem = Required<MenuProps>["items"][number];
const whiteList = ["*", "/", "/404", "/login"];
const Layout: React.FC<{ component: ReactNode }> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {}, [location.pathname]);
  const items: MenuItem[] = [];
  routes.map((item) => {
    const { path } = item;
    if (!whiteList.includes(path)) {
      items.push({ key: path, ...item, icon: null });
    }
  });
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (location.pathname === key) return;
    navigate(key);
  };
  const loading = useRecoilValue(pageLoadingState);
  return (
    <>
      <div className="relative z-9999">
        <Spin spinning={loading} fullscreen />
      </div>

      <div className="w-full h-full flex">
        {!whiteList.includes(location.pathname) && (
          <div
            className="layout-app-menu flex flex-col h-full"
            style={{ width: 220, height: "100vh" }}
          >
            <Menu
              defaultSelectedKeys={[location.pathname]}
              items={items}
              onClick={onClick}
              style={{ height: "calc(100vh - 40px)", overflowY: "auto" }}
              // inlineCollapsed={true}
            />
            <div className="flex flex-1 flex-col justify-center items-left">
              <MenuSetting />
            </div>
          </div>
        )}
        <div style={{ width: "calc(100% - 220px)" }}>{props.component}</div>
      </div>
    </>
  );
};
export default Layout;
