// 定义 API 响应格式
interface HttpResponse<T> {
  code: number; // 状态码
  message: string;
  data: T;
}

// 通用请求配置
interface RequestOptions<T> extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number>; // GET 请求参数
  body?: T; // POST 请求体
}

// API 基础 URL
const BASE_URL = import.meta.env.VITE_APP_BASE_API;

// **封装 Fetch 请求**
const request = <T = unknown, R = unknown>(
  url: string,
  options: RequestOptions<T> = {}
): Promise<R> => {
  return new Promise((resolve, reject) => {
    const { method = "GET", headers, params, body } = options;

    // **请求拦截器**
    const token = localStorage.getItem("token");
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    };

    // 处理 GET 请求的参数
    let fullUrl = `${BASE_URL}${url}`;
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      fullUrl += `?${queryString}`;
    }

    // 发送请求
    fetch(fullUrl, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((resData: HttpResponse<R>) => {
        if (resData.code !== 200) {
          return Promise.reject(resData.message || "请求失败");
        }
        resolve(resData.data);
      })
      .catch((error) => {
        console.error("请求错误:", error);
        reject(error);
      });
  });
};

export default request;
