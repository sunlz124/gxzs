import {
  Button,
  Card,
  ConfigProvider,
  GetProp,
  message,
  Modal,
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
import { UploadOutlined } from "@ant-design/icons";
import DownloadButton from "@/components/DownloadButton";
import AutoTable from "@/components/AutoTable";

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
    { title: "名称", dataIndex: "name", width: 150, fixed: "left" },
    { title: "个人名称", dataIndex: "personalName", width: 150 },
    { title: "地址", dataIndex: "address", width: 280 },
    { title: "生产地址", dataIndex: "produceAddress", width: 280 },
    { title: "品种", dataIndex: "variety", width: 150 },
    { title: "编码", dataIndex: "code", width: 150 },
    { title: "数量", dataIndex: "number", width: 100 },
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
  const [queryParams, setQueryParams] = useState<SaltProduceListResRow>();
  const init = async () => {
    const params = {
      ...queryParams,
      pageNum: tableParams.pagination!.current,
      pageSize: tableParams.pagination!.pageSize,
    } as SaltProduceListParams;
    console.log(999, params);
    setLoading(true);
    const result = await getSaltProduceList(params);

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
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    queryParams,
  ]);
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
      <Card
        title={<QueryForm search={setQueryParams} />}
        className="w-full h-full"
      >
        <div className="w-full h-full">
          <div className="flex gap-2 flex-row items-center mb-3">
            <AddForm
              onFinish={() => init()}
              formData={row}
              onClose={() => setRow(undefined)}
            />
            <Button type="primary" icon={<UploadOutlined />}>
              导入
            </Button>
            <DownloadButton
              btnName="导出食盐生产表"
              url="/api/saltProduce/exportSaltProduce"
              params={queryParams}
            />
            <DownloadButton
              btnName="导出食盐生产PDF"
              url="/api/saltProduce/exportSaltProduce"
              params={queryParams}
            />
          </div>
          <AutoTable
            loading={loading}
            dataSource={data}
            columns={columns}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
        </div>
      </Card>
    </div>
  );
};

export default Index;
