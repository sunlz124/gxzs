import { SettingOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useState } from "react";

const MenuSetting: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      content={<SettingContent />}
      // title="Title"
      trigger="click"
      open={open}
      arrow={false}
      onOpenChange={(newOpen: boolean) => setOpen(newOpen)}
    >
      <div className=" pl-6 flex flex-row items-center text-sm h-10 cursor-pointer border-r border-r-slate-200">
        <SettingOutlined />
        <span className="pl-2">设置</span>
      </div>
    </Popover>
  );
};
const SettingContent = () => {
  const options = [
    {
      label: "全局自定义设置",
      click: async () => {},
    },
    { label: "全局自定义设置", click: () => console.log(2222) },
    { label: "全局" },
  ];
  return (
    <div className="flex flex-col p-0 items-start">
      {options.map((item, index) => (
        <Button
          color="default"
          variant="text"
          className="px-4"
          key={index}
          onClick={item.click && item.click}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
export default MenuSetting;
