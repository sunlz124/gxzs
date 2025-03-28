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

export interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}
const Index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [row, setRow] = useState<DataType>();
  const columns: TableColumnsType<DataType> = [
    {
      title: "序号",
      render: (_text: string, _record: any, index: number) => index + 1,
    },
    {
      title: "姓名",
      dataIndex: "name",
      render: (name) => `${name.first} ${name.last}`,
      width: "20%",
    },
    {
      title: "性别",
      dataIndex: "gender",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "操作",
      fixed: "right",
      width: 100,
      render: (row) => (
        <div className="flex gap-2 items-center">
          <ConfigProvider componentSize={"small"}>
            <Button
              color="primary"
              variant="text"
              onClick={() => {
                console.log(111, row);
              }}
            >
              打印
            </Button>
            <Button
              color="primary"
              variant="text"
              onClick={() => {
                console.log(111, row);
                setRow(row);
              }}
            >
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
    <Card title={<QueryForm />}>
      <AddForm
        onFinish={() => init()}
        formData={row}
        onClose={() => setRow(undefined)}
      />
      <Table<DataType>
        loading={loading}
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.login.uuid}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default Index;
