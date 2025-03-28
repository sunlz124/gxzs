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
export const getSaltProduceList = (data: SaltProduceListParams) =>
  request<SaltProduceListParams, SaltProduceResponse>(
    "/api/saltProduce/findAllSaltProduce",
    { data }
  );
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
