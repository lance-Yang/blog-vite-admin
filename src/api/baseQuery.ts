import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { message } from "antd";

export const baseUrl = "http://localhost:8080";

type ResponseData = {
  code: number;
  data: any;
  message: string;
};

export const baseQuery = fetchBaseQuery({
  baseUrl,
  timeout: 1000,
  // 对所有的请求进行预处理
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("blogToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// 统一响应拦截器
export const InterceptorsResponse = (res: any) => {
  try {
    const msg = res.message;
    switch (res.code) {
      case 200:
        return res;
      case 401:
        message.error(msg);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject("error");
      case 500:
        message.error(msg);
        return Promise.reject(new Error(msg));
      default:
        message.error(msg);
        return Promise.reject("error");
    }
  } catch (error: any) {
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    return Promise.reject(error);
  }
};
