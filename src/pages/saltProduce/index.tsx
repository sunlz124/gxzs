import {
  Button,
  Card,
  ConfigProvider,
  GetProp,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import QueryForm from "./components/QueryForm";
import { SorterResult } from "antd/es/table/interface";
import { AnyObject } from "antd/es/_util/type";
import AddForm from "./components/AddForm";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

interface DataType {
  id: string;
  name: string;
  personalName: string;
  address: string;
  produceAddress: string;
  variety: string;
  code: string;
  number: string;
  year: string;
  nmonth: string;
  day: string;
  login: {
    uuid: string;
  };
}
const Index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const columns: TableColumnsType<DataType> = [
    {
      title: "序号",
      render: (_text: string, _record: any, index: number) => index + 1,
      fixed: "left",
      width: "80px",
    },
    { title: "名称", dataIndex: "name", width: 100 },
    { title: "个人名称", dataIndex: "personalName", width: 100 },
    { title: "地址", dataIndex: "address", width: 500 },
    { title: "生产地址", dataIndex: "produceAddress", width: 100 },
    { title: "品种", dataIndex: "variety", width: 100 },
    { title: "编码", dataIndex: "code", width: 200 },
    { title: "数量", dataIndex: "number", width: 200 },
    { title: "年份", dataIndex: "year", width: 200 },
    { title: "月份", dataIndex: "nmonth", width: 200 },
    { title: "日期", dataIndex: "day" },
    {
      title: "操作",
      fixed: "right",
      width: "200px",
      render: (row) => (
        <div className="flex gap-1 items-center">
          <ConfigProvider componentSize={"small"}>
            <Button color="primary" variant="text">
              打印
            </Button>
            <Button color="primary" variant="text">
              修改
            </Button>
            <Button
              color="danger"
              variant="text"
              onClick={() => {
                console.log(111, row);
              }}
            >
              删除
            </Button>
          </ConfigProvider>
        </div>
      ),
    },
  ];
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const toURLSearchParams = <T extends AnyObject>(record: T) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(record)) {
      params.append(key, value);
    }
    return params;
  };
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  const params = toURLSearchParams(getRandomuserParams(tableParams));
  const init = async () => {
    setLoading(true);
    const res = await fetch(`https://randomuser.me/api?${params.toString()}`);
    const { results } = await res.json();

    setData(results);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: 200,
      },
    });
  };
  const [data, setData] = useState<DataType[]>();
  useEffect(() => {
    init();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  const handleTableChange: TableProps<DataType>["onChange"] = (pagination) => {
    setTableParams({ pagination: { ...pagination } });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="w-full overflow-hidden ">
      <Card title={<QueryForm />} className="w-full h-full">
        <div className="w-full h-full aaaa">
          <AddForm />
          <Table<DataType>
            className="w-full abc"
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey={(record) => record.login.uuid}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
            scroll={{ x: "max-content" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Index;
