import { pageLoadingState } from "@/state";
import { setRecoil } from "recoil-nexus";
import { message } from "antd";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  Method,
} from "axios";

// 创建一个全局 setter（手动控制 Recoil 状态）
// let setRecoilLoading: any;

// export const initializeRecoil = (aaa: any) => {
//   console.log(111, aaa);
//   // setRecoilLoading = set;
// };
// 定义接口返回数据的标准格式
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 创建自定义配置的 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 如果是 GET 请求，追加时间戳防止缓存
    if (config.method?.toUpperCase() === "GET") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error: AxiosError) => {
    console.log(1111, error);
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data;
    // 业务逻辑处理（根据你的后端接口调整）
    if (res.code === 200 || res.success) {
      return res.data;
    } else {
      handleError(res.code);

      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  (error: AxiosError) => {
    // fetch("http://192.168.0.110:30000/error", {
    //   method: "POST",
    //   body: JSON.stringify({ error }),
    // });
    // 对响应错误做点什么
    const status = error.response?.status as number;
    handleError(status);

    return Promise.reject(error);
  }
);

function handleError(errorCode: number) {
  const messageMap: Record<number, string> = {
    400: "请求错误",
    401: "未授权，请重新登录",
    403: "拒绝访问",
    404: "请求资源不存在",
    500: "服务错误",
    502: "网关错误",
    503: "服务不可用",
    504: "网关超时",
  };

  const msg = messageMap[errorCode] || `连接出错(${errorCode})`;
  setTimeout(() => {
    setRecoil(pageLoadingState, false);
    message.error(msg);
  }, 1000);
}

interface RequestOptions<T> {
  method?: Method;
  data?: T;
  config?: AxiosRequestConfig;
}

function request<T = unknown, R = unknown>(
  url: string,
  options: RequestOptions<T> = {}
): Promise<R> {
  const { method = "GET", data, config } = options;
  return service.request<T, R>({
    url,
    method,
    data: method?.toUpperCase() === "GET" ? undefined : data,
    params: method?.toUpperCase() === "GET" ? data : undefined,
    ...config,
  });
}

export default request;
