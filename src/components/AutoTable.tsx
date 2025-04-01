import { Table } from "antd";
import { useEffect, useState } from "react";

interface IProps {
  loading: boolean;
  dataSource: any[] | undefined;
  columns: any[];
  pagination: any | undefined;
  onChange: any;
}

const AutoTable: React.FC<IProps> = (props) => {
  const [height, setHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    const handleResize = debounce(() => {
      const header = document.getElementById("page-header");
      const pageButton = document.getElementById("page-button");

      const headerH = header?.offsetHeight ?? 0;
      const pageButtonH = pageButton?.offsetHeight ?? 0;
      console.log("headerH:", headerH, "pageButtonH:", pageButtonH);
      setHeight(window.innerHeight - headerH - pageButtonH - 160);
    }, 300);
    handleResize();
    // 监听窗口变化
    window.addEventListener("resize", handleResize);

    // 组件卸载时清理监听
    return () => {
      console.log("组件被卸载了");
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const debounce = (fn: () => void, delay: number): (() => void) => {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  };
  return (
    <Table
      size="small"
      className="w-full h-full"
      loading={props.loading}
      dataSource={props.dataSource}
      columns={props.columns}
      rowKey={(record) => record.id!}
      pagination={props.pagination}
      onChange={props.onChange}
      scroll={{ x: "max-content", y: height }}
    />
  );
};
export default AutoTable;
