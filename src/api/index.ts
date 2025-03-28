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
