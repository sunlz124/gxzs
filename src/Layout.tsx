import { Menu, MenuProps } from "antd";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@/routes";
// import PageMenuBar from "@renderer/components/PageMenuBar";
import React from "react";

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
  return (
    <>
      {/* <PageMenuBar /> */}
      <div className="w-full h-full flex">
        {!whiteList.includes(location.pathname) && (
          <Menu
            defaultSelectedKeys={[location.pathname]}
            items={items}
            onClick={onClick}
            style={{ width: 220 }}
            // inlineCollapsed={true}
          />
        )}
        <div
          // className="w-full h-full"
          style={{ width: "calc(100% - 220px)" }}
        >
          {props.component}
        </div>
      </div>
    </>
  );
};
export default Layout;
