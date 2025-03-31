import request from "@/api/axios.config";

interface TestParams {
  id: string;
}
export interface UserInfo {
  name: string;
  age: string;
}
export const test = (data: TestParams) =>
  request<TestParams, UserInfo>("/req", { data });

export const reqError = (data: TestParams) =>
  request<TestParams, UserInfo>("/reqError", { data });

// 查询食盐生产列表
export interface SaltProduceListResRow {
  id?: string;
  name?: string;
  personalName?: string;
  address?: string;
  produceAddress?: string;
  variety?: string;
  code?: string;
  number?: string;
  releaseDate?: string;
}
export type SaltProduceListParams = SaltProduceListResRow & {
  pageNum: number;
  pageSize: number;
};
interface SaltProduceResponse {
  totalSize: number;
  content: SaltProduceListResRow[];
}

// 查询食盐生产列表
export const getSaltProduceList = (
  data: SaltProduceListParams
): Promise<SaltProduceResponse> =>
  request("/api/saltProduce/findAllSaltProduce", { data });
//添加食盐生产
export const addSaltProduce = (data: SaltProduceListResRow) =>
  request<SaltProduceListResRow, any>("/api/saltProduce/addSaltProduce", {
    data,
    method: "POST",
  });
// 修改食盐生产
export const updateSaltProduce = (data: SaltProduceListResRow) =>
  request<SaltProduceListResRow, any>("/api/saltProduce/updateSaltProduce", {
    data,
    method: "POST",
  });
// 删除食盐
export const deleteSaltProduce = (id: string) =>
  request(`/api/saltProduce/deleteSaltProduce?id=${id}`);
// 导出食盐生产
export const exportSaltProduce = (data?: SaltProduceListParams) =>
  request("/api/saltProduce/exportSaltProduce", { data });

//打印食盐生产
export const printSaltProduce = (data?: SaltProduceListParams) =>
  request("/api/saltProduce/printSaltProduce", { data });

// 获取第二类监控化学品经营-使用许可证列表
export interface ChemicalManageListResRow {
  id?: string;
  certificateNo?: string;
  companyName?: string;
  legalPerson?: string;
  companyAddress?: string;
  validity?: string;
  scope?: string;
  issueDate?: string;
}
export type ChemicalManageListParams = ChemicalManageListResRow & {
  pageNum: number;
  pageSize: number;
};
interface ChemicalManageResponse {
  totalSize: number;
  content: ChemicalManageListResRow[];
}
export const getManageAndUseList = (
  data: ChemicalManageListParams
): Promise<ChemicalManageResponse> =>
  request("/api/Chemical/getManageAndUseList", { data });
// 添加第二类监控化学品经营-使用许可证
export const addManageAndUse = (data: ChemicalManageListResRow) =>
  request("/api/Chemical/addManageAndUse1", {
    data,
    method: "POST",
  });
// 修改第二类监控化学品经营-使用许可证
export const editManageAndUse = (data: ChemicalManageListResRow) =>
  request("/api/Chemical/editManageAndUse", {
    data,
    method: "PUT",
  });
