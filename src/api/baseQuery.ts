import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseUrl = "http://localhost:8080";

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
  