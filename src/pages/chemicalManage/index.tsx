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
  getManageAndUseList,
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
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const columns: TableColumnsType<SaltProduceListResRow> = [
    {
      title: "序号",
      render: (_text: string, _record: any, index: number) => index + 1,
      fixed: "left",
      width: "80px",
    },
    {
      title: "证书编号",
      dataIndex: "certificateNo",
      width: 280,
      fixed: "left",
    },
    { title: "单位名称", dataIndex: "companyName", width: 150 },
    { title: "法定代表人", dataIndex: "legalPerson", width: 280 },
    { title: "单位地址", dataIndex: "companyAddress", width: 280 },
    { title: "有效期限", dataIndex: "validity", width: 150 },
    { title: "许可范围", dataIndex: "scope", width: 150 },
    { title: "发证日期", dataIndex: "issueDate", width: 200 },
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
                setIsAddOpen(true);
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
      pageSize: 20,
    },
  });
  const [queryParams, setQueryParams] = useState<SaltProduceListResRow>();
  const init = async () => {
    const params = {
      ...queryParams,
      pageNum: tableParams.pagination!.current,
      pageSize: tableParams.pagination!.pageSize,
    } as SaltProduceListParams;
    setLoading(true);
    const result = await getManageAndUseList(params);

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
    <Card
      className="w-full h-full"
      title={
        <div id="page-header">
          <QueryForm search={setQueryParams} />
        </div>
      }
    >
      <div className="w-full h-full overflow-hidden">
        <div className="flex gap-2 flex-row items-center mb-3" id="page-button">
          {isAddOpen && (
            <AddForm
              open={isAddOpen}
              onFinish={() => {
                init();
                setIsAddOpen(false);
              }}
              formData={row}
              close={() => {
                setRow(undefined);
                setIsAddOpen(false);
              }}
            />
          )}
          <Button type="primary" onClick={() => setIsAddOpen(true)}>
            新增
          </Button>
          <Button type="primary" icon={<UploadOutlined />}>
            导入
          </Button>
          <DownloadButton
            btnName="下载导入模板"
            url="/api/Chemical/exportManageAndUse"
          />
          <DownloadButton
            btnName="导出第二类监控化学品经营和使用许可证Excel"
            url="/api/Chemical/exportManageAndUse"
            params={queryParams}
          />
          <DownloadButton
            btnName="导出第二类监控化学品经营-使用许可证PDF"
            url="/api/Chemical/pdfManageAndUse"
          />
        </div>
        <AutoTable
          loading={loading}
          dataSource={data}
          columns={columns}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
        {/* <Table<SaltProduceListResRow>
          size="small"
          className="w-full h-full"
          loading={loading}
          dataSource={data}
          columns={columns}
          rowKey={(record) => record.id!}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          scroll={{ x: "max-content", y: pageTableHeight }}
        /> */}
      </div>
    </Card>
  );
};

export default Index;
