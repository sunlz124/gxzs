import {
  Button,
  Card,
  ConfigProvider,
  GetProp,
  message,
  Modal,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import QueryForm from "./components/QueryForm";
import { SorterResult } from "antd/es/table/interface";
import AddForm from "./components/AddForm";
import {
  getSaltProduceList,
  SaltProduceListParams,
  SaltProduceListResRow,
  deleteSaltProduce,
} from "@/api/index";

const { confirm } = Modal;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const Index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [row, setRow] = useState<SaltProduceListResRow>();
  const columns: TableColumnsType<SaltProduceListResRow> = [
    {
      title: "序号",
      render: (_text: string, _record: any, index: number) => index + 1,
      fixed: "left",
      width: "80px",
    },
    { title: "名称", dataIndex: "name", width: 100 },
    { title: "个人名称", dataIndex: "personalName", width: 100 },
    { title: "地址", dataIndex: "address", width: 100 },
    { title: "生产地址", dataIndex: "produceAddress", width: 100 },
    { title: "品种", dataIndex: "variety", width: 100 },
    { title: "编码", dataIndex: "code", width: 200 },
    { title: "数量", dataIndex: "number", width: 200 },
    // { title: "年份", dataIndex: "year", width: 200 },
    // { title: "月份", dataIndex: "nmonth", width: 200 },
    { title: "发证日期	", dataIndex: "releaseDate" },
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
            <Button
              color="primary"
              variant="text"
              onClick={() => {
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
                confirm({
                  title: "警告",
                  content: "删除无法恢复，请确认是否继续？",
                  async onOk() {
                    console.log("OK");
                    await deleteSaltProduce(row.id!);
                    message.success(`删除成功！`);
                    init();
                  },
                  onCancel() {
                    console.log("Cancel");
                  },
                });
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

  const init = async () => {
    const params = {
      pageNum: tableParams.pagination!.current,
      pageSize: tableParams.pagination!.pageSize,
    } as SaltProduceListParams;

    setLoading(true);
    const result = await getSaltProduceList(params);
    // console.log(9999, result);

    setData(result.content);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: result.totalSize,
      },
    });
  };
  const [data, setData] = useState<SaltProduceListResRow[]>();
  useEffect(() => {
    init();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  const handleTableChange: TableProps<SaltProduceListResRow>["onChange"] = (
    pagination
  ) => {
    setTableParams({ pagination: { ...pagination } });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="w-full overflow-hidden ">
      <Card title={<QueryForm />} className="w-full h-full">
        <div className="w-full h-full aaaa">
          <AddForm
            onFinish={() => init()}
            formData={row}
            onClose={() => setRow(undefined)}
          />
          <Table<SaltProduceListResRow>
            className="w-full abc"
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey={(record) => record.id!}
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
